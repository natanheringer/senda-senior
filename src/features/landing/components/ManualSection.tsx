'use client'

import { motion, useReducedMotion } from 'framer-motion'
import NextImage from 'next/image'
import { Reveal } from '@/design'
import { BrandStar, StarCluster } from '@/features/landing/shared/BrandStar'
import { CompassRose, StarScatter } from '@/features/landing/shared/BrandDecorative'

const GUIAS = [
  {
    num: '01',
    title: 'Prevent Care',
    subtitle: 'Planejamento Preventivo',
    color: 'var(--color-green)',
    content:
      'Construa a fundação de confiança: diálogos estratégicos, organização de papéis e diretrizes antes de qualquer declínio acontecer.',
    pattern: '/brand/pattern-estrela-greenmono-dark.png',
  },
  {
    num: '02',
    title: 'Care',
    subtitle: 'Cuidado em Transição',
    color: 'var(--color-terracotta)',
    content:
      'A fase de transição: como manejar perdas leves de autonomia e implementar cuidados sem gerar atrito ou crises.',
    pattern: '/brand/pattern-caminho-greenmono-dark.png',
  },
  {
    num: '03',
    title: 'Immediate Care',
    subtitle: 'Decisão na Urgência',
    color: 'var(--color-ink)',
    content:
      'Ação na urgência: suporte prático para tomadas de decisão críticas baseadas no plano estabelecido anteriormente.',
    pattern: '/brand/pattern-abstrato-vt-escuro.png',
  },
]

export function ManualSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="manual" style={{
      padding: 'clamp(80px, 10vw, 140px) 0',
      background: 'var(--color-cream-mid)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.045,
          backgroundImage: "url('/brand/pattern-estrela-greenmono-claro.png')",
          backgroundSize: '900px auto',
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
        }}
      />

      <div className="landing-max" style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── HERO: Book + Headline ────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr minmax(280px, 0.85fr)',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
            marginBottom: 'clamp(64px, 9vw, 112px)',
          }}
          className="grid-pillar"
        >
          {/* Left: Text */}
          <div>
            <Reveal>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 'clamp(20px, 2.5vw, 28px)',
              }}>
                <StarCluster size={28} style={{ opacity: 0.6 }} />
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(12px, 1.1vw, 14px)',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-terracotta)',
                }}>
                  Recurso em destaque
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(36px, 4.8vw, 64px)',
                fontWeight: 500,
                lineHeight: 1.08,
                color: 'var(--color-ink)',
                letterSpacing: '-0.025em',
                marginBottom: 'clamp(20px, 2.5vw, 28px)',
                textWrap: 'balance',
              }}>
                Um guia moderno sobre{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--color-terracotta)' }}>afeto.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                lineHeight: 1.6,
                color: 'var(--color-ink-sub)',
                fontWeight: 400,
                maxWidth: 520,
                marginBottom: 'clamp(28px, 3.5vw, 40px)',
              }}>
                Baixe gratuitamente nosso e‑book e tenha conversas mais leves e conscientes
                com quem você ama.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href="/login"
                className="btn-terracotta-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--color-terracotta)',
                  color: 'white',
                  padding: '16px 36px',
                  borderRadius: 10,
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 20px rgba(181,114,74,0.25)',
                  letterSpacing: '0.01em',
                }}
              >
                Baixar guia gratuito
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </Reveal>
          </div>

          {/* Right: Book Cover */}
          <Reveal delay={0.12}>
            <div style={{
              position: 'relative',
              maxWidth: 420,
              marginLeft: 'auto',
            }}>
              {/* Compass Rose watermark behind the book */}
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-25%',
                width: '120%',
                height: '120%',
                opacity: 0.25,
                pointerEvents: 'none',
                zIndex: 0,
              }}>
                <CompassRose color="var(--color-green-dark)" secondaryColor="var(--color-terracotta)" />
              </div>

              <motion.div
                initial={false}
                whileHover={reducedMotion ? undefined : { y: -6, rotateZ: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 24px 64px rgba(42,37,32,0.18), 0 8px 20px rgba(42,37,32,0.08)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <NextImage
                  src="/brand/card-guia-afeto.png"
                  alt="Guia Prevent Care — Um guia moderno sobre afeto"
                  width={1001}
                  height={1351}
                  sizes="(max-width: 768px) 80vw, 380px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* ─── COLEÇÃO: 3 Volumes Empilhados ──────────────────── */}
        <Reveal delay={0.08}>
          <div style={{
            marginBottom: 'clamp(32px, 4vw, 48px)',
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(12px, 1vw, 14px)',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-green)',
              marginBottom: 12,
            }}>
              Coleção Prevent Care
            </p>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 500,
              lineHeight: 1.15,
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}>
              Três volumes.{' '}
              <span style={{ color: 'var(--color-ink-muted)', fontWeight: 400 }}>
                Um caminho completo.
              </span>
            </h3>
          </div>
        </Reveal>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(16px, 2vw, 20px)',
        }}>
          {GUIAS.map((guia, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <motion.div
                initial={false}
                whileHover={reducedMotion ? undefined : { y: -3, x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                style={{
                  background: guia.color,
                  borderRadius: 14,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
                  cursor: 'default',
                }}
              >
                {/* Pattern overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.06,
                    backgroundImage: `url('${guia.pattern}')`,
                    backgroundSize: '500px auto',
                    backgroundRepeat: 'repeat',
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                  }}
                />
                {/* Decorative star */}
                <div style={{
                  position: 'absolute',
                  bottom: -30,
                  right: -30,
                  opacity: 0.06,
                  pointerEvents: 'none',
                }}>
                  <BrandStar size={160} color="white" />
                </div>

                {/* Content */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 'clamp(20px, 3vw, 40px)',
                    alignItems: 'center',
                    padding: 'clamp(24px, 3vw, 36px) clamp(24px, 3vw, 40px)',
                  }}
                  className="guia-card-inner"
                >
                  {/* Left: Number + Title */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'clamp(12px, 1.5vw, 20px)',
                    minWidth: 'clamp(200px, 28vw, 340px)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(11px, 0.9vw, 13px)',
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.55)',
                      letterSpacing: '0.2em',
                      flexShrink: 0,
                    }}>
                      VOL {guia.num}
                    </span>
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(22px, 2.4vw, 32px)',
                        fontWeight: 500,
                        color: 'white',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        marginBottom: 4,
                      }}>
                        {guia.title}
                      </h4>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(11px, 0.85vw, 13px)',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.5)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {guia.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Right: Description */}
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(15px, 1.25vw, 17px)',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.82)',
                    maxWidth: 580,
                  }}>
                    {guia.content}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* ─── CTA final ──────────────────────────────────── */}
        <Reveal delay={0.36}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            marginTop: 'clamp(40px, 5vw, 60px)',
            paddingTop: 'clamp(28px, 3.5vw, 40px)',
            borderTop: '1px solid rgba(42,37,32,0.1)',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                color: 'var(--color-ink-sub)',
                lineHeight: 1.5,
              }}>
                Disponível gratuitamente na plataforma Hotmart.
              </p>
            </div>
            <a
              href="/login"
              className="btn-terracotta-hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--color-green)',
                color: 'white',
                padding: '14px 32px',
                borderRadius: 10,
                fontSize: 'clamp(14px, 1.1vw, 16px)',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 4px 16px rgba(74,94,74,0.2)',
                letterSpacing: '0.02em',
              }}
            >
              Adquirir Coleção Completa
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
