import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// ─── Rate Limiting (in-memory) ───
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 100

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

export async function proxy(request: NextRequest) {
  // 1. Rate Limiting com extração de IP robusta
  const ip = 
    request.headers.get('x-real-ip') || 
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
    'unknown'
    
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', { status: 429, headers: { 'Retry-After': '60' } })
  }

  let response = NextResponse.next({ request })

  // 2. Security Headers (CSP) - Unificado
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in",
    "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co https://vercel.live",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ')

  const setSecurityHeaders = (res: NextResponse) => {
    res.headers.set('Content-Security-Policy', csp)
    res.headers.set('X-Content-Type-Options', 'nosniff')
    res.headers.set('X-Frame-Options', 'DENY')
    res.headers.set('X-XSS-Protection', '1; mode=block')
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }

  setSecurityHeaders(response)

  // 3. Supabase Auth com persistência segura de cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          setSecurityHeaders(response)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, { 
              ...options, 
              httpOnly: true, 
              secure: true, 
              sameSite: 'lax',
              path: '/', // Garante consistência em todas as rotas
            })
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // Proteção de rotas sensíveis e lógica de redirecionamento segura
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/manual') || pathname.startsWith('/update-password')
  const isAuthRoute = pathname.startsWith('/login')

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Opcional: Adicionar redirect back param aqui se desejar
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute) {
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