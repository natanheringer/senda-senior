'use client'

import { Reveal } from '@/design'
import { ArrowRight } from 'lucide-react'

const FASES = [
  {
    fase: 'FASE 1',
    title: 'Prevent Care',
    subtitle: 'Seus pais ainda são autônomos.',
    desc: 'É hora de planejar — não de esperar.',
    bg: 'var(--color-green-pale)',
    accentColor: 'var(--color-green-dark)',
    textColor: 'var(--color-ink)',
    iconColor: 'var(--color-green-dark)',
  },
  {
    fase: 'FASE 2',
    title: 'Care',
    subtitle: 'Os primeiros sinais apareceram.',
    desc: 'É hora de organizar — não de improvisar.',
    bg: 'var(--color-gold-light)',
    accentColor: 'var(--color-terracotta)',
    textColor: 'var(--color-ink)',
    iconColor: 'var(--color-terracotta)',
  },
  {
    fase: 'FASE 3',
    title: 'Immediate Care',
    subtitle: 'O cuidado é urgente',
    desc: 'É hora de agir — não de desesperar.',
    bg: 'var(--color-terracotta-light)',
    accentColor: 'var(--color-cream)',
    textColor: 'var(--color-cream)',
    iconColor: 'var(--color-ink)',
  },
]

export function ManualSection() {
  return (
    <section id="manual" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top Part - Dark Green */}
      <div
        style={{
          background: 'var(--color-green)',
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 100px)',
        }}
      >
        <div
          className="landing-max grid-pillar"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(48px, 6vw, 80px)',
            alignItems: 'start',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          {/* Left: Titles */}
          <div>
            <Reveal>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-light)',
                  marginBottom: 24,
                }}
              >
                Sobre nós
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(42px, 5vw, 68px)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-cream)',
                  textWrap: 'balance',
                }}
              >
                As 3 Etapas<br />
                do Cuidado.
              </h2>
            </Reveal>
          </div>

          {/* Right: Paragraphs */}
          <div style={{ paddingTop: 12 }}>
            <Reveal delay={0.12}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  lineHeight: 1.6,
                  color: 'rgba(245,240,232,0.85)',
                  marginBottom: 32,
                  maxWidth: 520,
                }}
              >
                A Senda Sênior é uma empresa de planejamento e assessoria para o envelhecimento familiar. Fundada por Luciana e Julianne — duas mulheres que viveram pessoalmente os desafios de cuidar de mães idosas — oferecemos orientação estruturada para famílias em qualquer fase do cuidado.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: 'var(--color-cream)',
                  maxWidth: 520,
                }}
              >
                Não somos cuidadores. Não somos clínica.<br />
                Somos a bússola que orienta o caminho.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom Part - 3 Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          width: '100%',
        }}
      >
        {FASES.map((fase, i) => (
          <div
            key={i}
            style={{
              background: fase.bg,
              padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Reveal delay={i * 0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Icon Placeholder */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: fase.iconColor,
                    marginBottom: 32,
                  }}
                />

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: fase.accentColor,
                    marginBottom: 16,
                    opacity: 0.85,
                  }}
                >
                  {fase.fase}
                </p>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(28px, 2.5vw, 36px)',
                    fontWeight: 500,
                    color: fase.accentColor,
                    marginBottom: 24,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {fase.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(14px, 1.1vw, 15px)',
                    color: fase.textColor,
                    marginBottom: 40,
                    opacity: 0.9,
                  }}
                >
                  {fase.subtitle}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(14px, 1.1vw, 15px)',
                    fontWeight: 700,
                    color: fase.textColor,
                    marginBottom: 32,
                  }}
                >
                  {fase.desc}
                </p>

                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'transparent',
                    border: 'none',
                    color: fase.accentColor,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    opacity: 0.8,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                >
                  Ver checklist <ArrowRight size={16} strokeWidth={2} />
                </button>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}
