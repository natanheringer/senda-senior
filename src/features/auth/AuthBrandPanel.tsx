'use client'

import type { ReactNode } from 'react'
import NextImage from 'next/image'

const GRAIN_DATA_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

type AuthBrandPanelProps = {
  children: ReactNode
  /** Fotografia editorial — ex.: prancheta-7 ou card-elder-window */
  photoSrc: string
  /** Foco da imagem (cover) */
  objectPosition?: string
}

/**
 * Painel esquerdo das páginas de auth: foto de marca, overlay verde abstrato,
 * padrão caminho, estrelas, selo CARD — alinhado a `public/brand/`.
 */
export function AuthBrandPanel({ children, photoSrc, objectPosition = '22% 45%' }: AuthBrandPanelProps) {
  return (
    <div
      className="auth-panel-left"
      style={{
        flex: '0 0 45%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(40px, 5vw, 80px)',
      }}
    >
      <NextImage
        src={photoSrc}
        alt=""
        aria-hidden
        fill
        priority
        sizes="45vw"
        style={{
          objectFit: 'cover',
          objectPosition,
          zIndex: 0,
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(100deg, rgba(16, 22, 18, 0.82) 0%, rgba(16, 22, 18, 0.48) 45%, rgba(16, 22, 18, 0.12) 75%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <NextImage
          src="/brand/green-abstract-overlay.jpg"
          alt=""
          aria-hidden
          fill
          sizes="45vw"
          style={{
            objectFit: 'cover',
            opacity: 0.44,
            mixBlendMode: 'soft-light',
          }}
        />
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          opacity: 0.1,
          backgroundImage: "url('/brand/pattern-caminho-greenmono-claro.png')",
          backgroundSize: '520px auto',
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          opacity: 0.05,
          backgroundImage: GRAIN_DATA_URL,
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          background: 'linear-gradient(160deg, transparent 22%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: '2%',
          bottom: '4%',
          zIndex: 6,
          width: 'clamp(96px, 20vw, 200px)',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      >
        <NextImage
          src="/brand/star-scatter-decoration.jpg"
          alt=""
          width={512}
          height={512}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '7%',
          top: '10%',
          zIndex: 6,
          width: 'clamp(56px, 9vw, 84px)',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 8px 22px rgba(0,0,0,0.3))',
        }}
      >
        <NextImage
          src="/brand/CARD-removebg-preview.png"
          alt=""
          width={220}
          height={280}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div
        className="auth-panel-content"
        style={{ position: 'relative', zIndex: 10, maxWidth: 420 }}
      >
        {children}
      </div>
    </div>
  )
}
