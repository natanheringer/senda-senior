import { NextResponse, type NextRequest } from 'next/server'

export const IS_PROD = process.env.NODE_ENV === 'production'
export type CSPMode = 'public-static' | 'strict-nonce'

export function extractIp(request: NextRequest): string {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

export function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString('base64')
}

function buildSharedCSPDirectives(): string[] {
  return [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net https://p.typekit.net",
    "font-src 'self' https://fonts.gstatic.com https://use.typekit.net data:",
    "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://p.typekit.net",
    "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co https://vercel.live https://use.typekit.net https://p.typekit.net",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ]
}

export function buildCSP(nonce: string, mode: CSPMode): string {
  const shared = buildSharedCSPDirectives()

  if (mode === 'public-static') {
    const scriptSrc = IS_PROD
      ? "'self' 'unsafe-inline' https:"
      : "'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-scripts.com"

    return ["script-src " + scriptSrc, ...shared].join('; ')
  }

  const scriptSrc = IS_PROD
    ? `'self' 'nonce-${nonce}' 'strict-dynamic' https:`
    : `'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-scripts.com`

  return [`script-src ${scriptSrc}`, ...shared].join('; ')
}

export function createForwardedHeaders(
  request: NextRequest,
  pathname: string,
  nonce: string,
  csp: string,
  mode: CSPMode,
): Headers {
  const forwardedHeaders = new Headers(request.headers)
  forwardedHeaders.set('x-pathname', pathname)
  forwardedHeaders.set('x-nonce', nonce)
  forwardedHeaders.set('x-csp-mode', mode)
  forwardedHeaders.set('Content-Security-Policy', csp)
  return forwardedHeaders
}

export function applySecurityHeaders(response: NextResponse, csp: string): void {
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

export function createSecuredNextResponse(
  forwardedHeaders: Headers,
  csp: string,
): NextResponse {
  const response = NextResponse.next({ request: { headers: forwardedHeaders } })
  applySecurityHeaders(response, csp)
  return response
}
