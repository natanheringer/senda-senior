'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/design'
import { BrandClusterImage, BrandSealCardImage } from '@/features/landing/shared/BrandStar'

/**
 * Faixa verde mockup mãe: foto à esquerda | bloco verde com manifesto,
 * watermark S e CTA "Sobre nós".
 */
export function Manifesto() {
  return (
    <section
      id="manifesto-verde"
      className="manifesto-mockup-split"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--color-green-dark)',
        overflow: 'hidden',
      }}
    >
      <div
        className="manifesto-mockup-photo"
        style={{
          position: 'relative',
          minHeight: 420,
          boxShadow: 'inset -28px 0 48px -12px rgba(0,0,0,0.14)',
        }}
      >
        <NextImage
          src="/brand/photos/prancheta-10.png"
          alt="Consultoria e planejamento familiar Senda Sênior"
          fill
          sizes="50vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>

      <div
        className="manifesto-mockup-green"
        style={{
          position: 'relative',
          padding: 'clamp(64px, 9vw, 112px) clamp(28px, 4vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 420,
          background: [
            'radial-gradient(ellipse 95% 75% at 88% 18%, rgba(255,255,255,0.07) 0%, transparent 52%)',
            'radial-gradient(ellipse 70% 55% at 12% 92%, rgba(0,0,0,0.16) 0%, transparent 55%)',
            'linear-gradient(168deg, color-mix(in srgb, var(--color-green-dark) 88%, white 12%) 0%, var(--color-green-dark) 42%, color-mix(in srgb, var(--color-green-dark) 92%, black 8%) 100%)',
          ].join(', '),
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.22,
            backgroundImage: "url('/brand/pattern-estrela-greenmono-dark.png')",
            backgroundSize: '720px auto',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'soft-light',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '-8%',
            bottom: '-12%',
            zIndex: 0,
            opacity: 0.12,
            pointerEvents: 'none',
          }}
        >
          <NextImage
            src="/brand/mark-symbol-dark.png"
            alt=""
            width={420}
            height={420}
            style={{
              width: 'min(52vw, 380px)',
              height: 'auto',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ marginBottom: 20 }}>
              <BrandClusterImage
                widthPx={130}
                style={{
                  opacity: 0.95,
                  width: 'clamp(108px, 14vw, 150px)',
                  height: 'auto',
                }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4.2vw, 56px)',
                fontWeight: 500,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.96)',
                marginBottom: 28,
              }}
            >
              Cuidar, antes da necessidade, é um ato de{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>amor.</em>
              <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 12, marginTop: 4 }}>
                <BrandSealCardImage widthPx={48} />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 1.5vw, 18px)',
                lineHeight: 1.75,
                color: 'rgba(245,240,232,0.72)',
                maxWidth: 460,
                marginBottom: 36,
              }}
            >
              A maioria das famílias só organiza o cuidado depois do susto. Fazemos o caminho inverso: método, documentos e diálogo — antes da urgência.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="#sobre"
              className="btn-terracotta-hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--color-terracotta)',
                color: 'white',
                padding: '15px 32px',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Sobre nós
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
