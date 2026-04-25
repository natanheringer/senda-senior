'use client'

import { BookOpen, Phone } from 'lucide-react'
import { Reveal } from '@/design'
import { BrandClusterImage, BrandSealCardImage, Prancheta8CardImage } from '@/features/landing/shared/BrandStar'

/** Fechamento: copy + arte Prancheta 8 (sem fundo) — mockup editorial. */
export function CTAFinal() {
  return (
    <section
      id="contato"
      style={{
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(88px, 11vw, 136px) 0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/brand/pattern-estrela-greenmono-claro.png')",
          backgroundSize: '820px auto',
          backgroundRepeat: 'repeat',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      />

      <div
        className="landing-max grid-pillar"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 72px)',
          alignItems: 'center',
        }}
      >
        <div>
          <Reveal>
            <BrandClusterImage
              widthPx={130}
              style={{
                marginBottom: 24,
                width: 'clamp(108px, 14vw, 160px)',
                height: 'auto',
              }}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 500,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                marginBottom: 24,
                maxWidth: 520,
              }}
            >
              Vamos conversar sobre o que realmente{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-terracotta)' }}>importa.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(17px, 1.75vw, 20px)',
                lineHeight: 1.75,
                color: 'var(--color-ink-sub)',
                maxWidth: 480,
                marginBottom: 36,
              }}
            >
              O manual é o primeiro passo. Se quiser apoio da equipe ou tirar dúvidas, estamos à disposição.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a
                href="/login"
                id="final-cta-buy"
                className="btn-terracotta-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--color-terracotta)',
                  color: 'white',
                  padding: '17px 40px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(181,114,74,0.25)',
                }}
              >
                <BookOpen size={20} strokeWidth={1.5} />
                Adquirir o Manual
              </a>
              <a
                href="mailto:contato@sendasenior.com.br"
                id="final-cta-email"
                className="btn-outline-terracotta-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  border: '1.5px solid var(--color-terracotta)',
                  color: 'var(--color-terracotta)',
                  padding: '17px 36px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: 'transparent',
                }}
              >
                <Phone size={20} strokeWidth={1.5} />
                Falar com a equipe
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p style={{ fontSize: 15, color: 'var(--color-ink-muted)', marginTop: 24, fontWeight: 500 }}>
              contato@sendasenior.com.br
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div style={{ marginTop: 36 }}>
              <BrandSealCardImage widthPx={64} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Prancheta8CardImage
              widthPx={380}
              style={{
                filter: 'drop-shadow(0 20px 48px rgba(42,37,32,0.1))',
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
