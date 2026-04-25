'use client'

import NextImage from 'next/image'
import { Reveal } from '@/design'
import { BrandClusterImage } from '@/features/landing/shared/BrandStar'
import { SCurveFragment, QuoteMark } from '@/features/landing/shared/BrandDecorative'

const FUNDADORAS = [
  {
    nome: 'Luciana M. Moura',
    titulo: 'Advogada · Pedagoga · Psicopedagoga',
    essencia: 'Transforma processos jurídicos complexos em caminhos humanos e claros.',
    foto: '/brand/photos/founder-luciana.jpg',
  },
  {
    nome: 'Julianne Q. Pimentel',
    titulo: 'Administradora · Economia Criativa · Inovação Digital',
    essencia: 'Organiza processos familiares com visão sistêmica e cuidado real.',
    foto: '/brand/photos/founder-julianne.jpg',
  },
]

const AVATAR = 180

/** Faixa editorial — Quem está por trás da Senda Sênior */
export function FundadorasStrip() {
  return (
    <section
      id="sobre"
      style={{
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(96px, 12vw, 160px) 0',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/brand/pattern-estrela-greenmono-claro.png')",
          backgroundSize: '820px auto',
          backgroundRepeat: 'repeat',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />

      {/* S-curve watermark — right side, large, faint */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-8%',
        width: 'clamp(300px, 40vw, 520px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <SCurveFragment color="var(--color-green)" style={{ opacity: 0.06 }} />
      </div>

      <div
        className="landing-max"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1120,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* ─── Section Opener ────────────────────────────── */}
        <Reveal>
          <div style={{
            marginBottom: 'clamp(52px, 7vw, 72px)',
          }}>
            {/* Editorial opening statement */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
                color: 'var(--color-ink)',
                marginBottom: 'clamp(24px, 3vw, 36px)',
                textWrap: 'balance',
                maxWidth: '18em',
              }}
            >
              <strong style={{ fontWeight: 600 }}>Seus pais estão bem.</strong>{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-terracotta)', fontWeight: 500 }}>
                Este é o melhor momento para planejar
              </em>
              {' '}— com calma, antes da urgência.
            </p>

            {/* Section label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              paddingBottom: 'clamp(20px, 2.5vw, 28px)',
              borderBottom: '2px solid rgba(42,37,32,0.08)',
            }}>
              <BrandClusterImage
                widthPx={48}
                style={{
                  width: 'clamp(40px, 5vw, 56px)',
                  height: 'auto',
                  opacity: 0.7,
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(13px, 1.2vw, 16px)',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-terracotta)',
                  lineHeight: 1.45,
                }}
              >
                Quem está por trás da Senda Sênior
              </p>
            </div>
          </div>
        </Reveal>

        {/* ─── Fundadoras Grid ───────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(48px, 7vw, 80px)',
            alignItems: 'start',
          }}
          className="grid-pillar"
        >
          {FUNDADORAS.map((f, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <article
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 'clamp(20px, 2.5vw, 28px)',
                }}
                className="fundadora-card"
              >
                {/* Avatar */}
                <div
                  style={{
                    width: AVATAR,
                    height: AVATAR,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '3px solid rgba(74,94,74,0.25)',
                    boxShadow: '0 16px 40px rgba(42,37,32,0.14)',
                    position: 'relative',
                  }}
                >
                  <NextImage
                    src={f.foto}
                    alt={f.nome}
                    fill
                    sizes={`${AVATAR}px`}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                </div>

                {/* Info */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(26px, 2.8vw, 36px)',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      marginBottom: 'clamp(8px, 1vw, 14px)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {f.nome}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(14px, 1.2vw, 17px)',
                      fontWeight: 600,
                      color: 'var(--color-green)',
                      letterSpacing: '0.02em',
                      lineHeight: 1.5,
                      marginBottom: 'clamp(14px, 1.5vw, 20px)',
                    }}
                  >
                    {f.titulo}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(17px, 1.6vw, 21px)',
                      fontWeight: 400,
                      color: 'var(--color-ink)',
                      lineHeight: 1.55,
                      opacity: 0.88,
                      maxWidth: '28em',
                    }}
                  >
                    {f.essencia}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ─── Closing Quote ─────────────────────────────── */}
        <Reveal delay={0.24}>
          <div
            style={{
              marginTop: 'clamp(60px, 8vw, 96px)',
              paddingTop: 'clamp(40px, 5vw, 60px)',
              borderTop: '2px solid rgba(42,37,32,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 24px)',
              position: 'relative',
            }}
            className="fundadora-quote"
          >
            <QuoteMark style={{ opacity: 0.8 }} />
            <blockquote
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                fontWeight: 400,
                color: 'var(--color-terracotta)',
                lineHeight: 1.4,
                letterSpacing: '-0.015em',
                maxWidth: '28em',
                textWrap: 'balance',
              }}
            >
              &ldquo;Somos especialistas em transformar incerteza em planejamento estruturado.&rdquo;
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
