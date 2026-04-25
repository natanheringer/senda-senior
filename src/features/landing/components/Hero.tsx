'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { StarCluster } from '@/features/landing/shared/BrandStar'

/**
 * Hero mockup mãe: faixa creme (copy) | foto mãe e filha + legenda cream (asset PNG).
 */
export function Hero() {
  return (
    <section
      className="hero-mockup-split"
      style={{
        minHeight: 'min(92vh, 920px)',
        paddingTop: 70,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--color-cream)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Coluna esquerda — creme, editorial ── */}
      <div
        className="hero-mockup-copy"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 6vw, 100px) clamp(24px, 4vw, 72px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: "url('/brand/pattern-estrela-greenmono-claro.png')",
            backgroundSize: '820px auto',
            backgroundRepeat: 'repeat',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'min(40%, 120px)',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(42,37,32,0.035) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        <div style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <StarCluster
              size={32}
              style={{ opacity: 0.8 }}
            />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px, 4.8vw, 68px)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              marginBottom: 24,
            }}
          >
            Planejar hoje é proteger o{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-terracotta)' }}>amanhã.</em>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(17px, 1.65vw, 20px)',
              lineHeight: 1.75,
              color: 'var(--color-ink-sub)',
              maxWidth: 440,
              marginBottom: 36,
            }}
          >
            Uma jornada de cuidado e independência. Organize cenários, documentos e diálogos — com calma, com amor, antes da urgência.
          </p>

          <Link
            href="#manual"
            className="btn-terracotta-hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'flex-start',
              background: 'var(--color-terracotta)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(181,114,74,0.35)',
            }}
          >
            Conhecer o Manual
            <ArrowRight size={18} strokeWidth={1.75} />
          </Link>
        </div>
      </div>

      {/* ── Coluna direita — foto + marca S ── */}
      <div
        className="hero-mockup-photo"
        style={{
          position: 'relative',
          minHeight: 360,
          background: 'var(--color-green-dark)',
          zIndex: 2,
          boxShadow: '-20px 0 56px rgba(42,37,32,0.09)',
        }}
      >
        <NextImage
          src="/brand/photos/hero-mae-filha.jpg"
          alt="Mãe e filha a planear com calma em casa, caderno e caneta"
          fill
          priority
          sizes="50vw"
          style={{
            objectFit: 'cover',
            objectPosition: '55% 42%',
          }}
        />
        {/* Leitura do cream sobre a fotografia: escurece canto inferior esquerdo */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'radial-gradient(ellipse 85% 70% at 0% 100%, rgba(22, 26, 22, 0.55) 0%, transparent 58%), linear-gradient(90deg, rgba(32, 38, 30, 0.35) 0%, rgba(32, 38, 30, 0.08) 40%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 'clamp(20px, 4.5vw, 44px)',
            bottom: 'clamp(22px, 4.5vw, 48px)',
            zIndex: 2,
            maxWidth: 'min(90%, 400px)',
            pointerEvents: 'none',
          }}
        >
            <NextImage
              src="/brand/hero-planejar-legenda.png"
              alt="Planejar hoje é proteger o amanhã. Logotipo Senda Sênior."
              width={640}
              height={720}
              sizes="(max-width: 768px) 45vw, 400px"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.35))',
              }}
            />
        </div>
      </div>
    </section>
  )
}
