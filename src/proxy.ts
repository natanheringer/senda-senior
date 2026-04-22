import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from '@/config/env'
import { checkRateLimit } from '@/lib/server/rate-limit'

/**
 * ─── Proxy (Next.js 16) ────────────────────────────────────────────
 *
 * Responsabilidades, em ordem:
 *   1. Rate limit (distribuído via Upstash se configurado).
 *   2. Geração de nonce + headers de segurança (CSP apertado em prod).
 *   3. Sincronização da sessão Supabase via cookies.
 *   4. Enforcement de rotas protegidas.
 *   5. Injeção de `x-pathname` e `x-nonce` para Server Components.
 *
 * Ordem importa — não reordenar sem revisar os pontos 3 e 4.
 * ───────────────────────────────────────────────────────────────────
 */

const IS_PROD = process.env.NODE_ENV === 'production'

function extractIp(request: NextRequest): string {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function pickBucket(pathname: string): 'global' | 'auth' | 'upload' {
  if (pathname.startsWith('/api/vault/upload')) return 'upload'
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/update-password') ||
    pathname.startsWith('/auth')
  ) {
    return 'auth'
  }
  return 'global'
}

function generateNonce(): string {
  // Mesmo algoritmo sugerido em nextjs.org/docs/app/guides/content-security-policy
  return Buffer.from(crypto.randomUUID()).toString('base64')
}

function buildCSP(nonce: string): string {
  // Em produção: strict-dynamic + nonce. Com nonce presente, `unsafe-inline` em
  // script-src é ignorado; scripts inline do Next exigem o nonce (via request CSP).
  // Em dev: Next dev injeta scripts inline + HMR e precisa de `unsafe-eval`.
  const scriptSrc = IS_PROD
    ? `'self' 'nonce-${nonce}' 'strict-dynamic' https:`
    : `'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-scripts.com`
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net https://p.typekit.net",
    "font-src 'self' https://fonts.gstatic.com https://use.typekit.net data:",
    "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://p.typekit.net",
    "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co https://vercel.live https://use.typekit.net https://p.typekit.net",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ')
}

function applySecurityHeaders(response: NextResponse, csp: string) {
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  )
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  )
}

const PROTECTED_PREFIXES = ['/dashboard', '/update-password', '/vault'] as const
const AUTH_PREFIXES = ['/login'] as const

function matchesPrefix(pathname: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => pathname.startsWith(prefix))
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const nonce = generateNonce()
  const csp = buildCSP(nonce)

  // ─── 1. rate limit ────────────────────────────────────────────────
  const rl = await checkRateLimit(extractIp(request), pickBucket(pathname))
  if (!rl.success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((rl.reset - Date.now()) / 1000).toString(),
        'X-RateLimit-Remaining': rl.remaining.toString(),
        'X-RateLimit-Mode': rl.mode,
      },
    })
  }

  // ─── 2. forward headers ──────────────────────────────────────────
  // O Next.js lê `Content-Security-Policy` na *request* para extrair o nonce e
  // aplicar nos scripts de framework; só mandar no response deixa o HTML sem match.
  const forwardedHeaders = new Headers(request.headers)
  forwardedHeaders.set('x-pathname', pathname)
  forwardedHeaders.set('x-nonce', nonce)
  forwardedHeaders.set('Content-Security-Policy', csp)

  let response = NextResponse.next({ request: { headers: forwardedHeaders } })
  applySecurityHeaders(response, csp)

  // ─── 3. sessão supabase ──────────────────────────────────────────
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({
            request: { headers: forwardedHeaders },
          })
          applySecurityHeaders(response, csp)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              secure: IS_PROD,
              sameSite: 'lax',
              path: '/',
            }),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ─── 4. enforcement ──────────────────────────────────────────────
  if (!user && matchesPrefix(pathname, PROTECTED_PREFIXES)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (user && matchesPrefix(pathname, AUTH_PREFIXES)) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
