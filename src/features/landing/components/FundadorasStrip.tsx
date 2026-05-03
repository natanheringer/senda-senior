'use client'

import { Reveal } from '@/design'
import { Map, Users, BookOpen, HeartHandshake } from 'lucide-react'

const CARDS = [
  {
    icon: Map,
    title: 'Planejamento preventivo',
    desc: 'Antecipação de necessidades para evitar crises',
    bg: 'var(--color-terracotta-light)',
  },
  {
    icon: Users,
    title: 'Assessoria personalizada',
    desc: 'Orientação adaptada à realidade da sua família',
    bg: 'var(--color-gold-light)',
  },
  {
    icon: BookOpen,
    title: 'Manuais práticos por fase',
    desc: 'Guias claros para cada momento da jornada',
    bg: 'var(--color-gold-light)',
  },
  {
    icon: HeartHandshake,
    title: 'Consultoria individual',
    desc: 'Suporte direto para decisões complexas',
    bg: 'var(--color-terracotta-light)',
  },
]

export function FundadorasStrip() {
  return (
    <section
      id="sobre"
      style={{
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 100px)',
      }}
    >
      <div
        className="landing-max"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(48px, 6vw, 80px)',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}
        // Reaproveitando a classe utilitária do responsivo para empilhar no mobile
        className="grid-pillar"
      >
        {/* Lado Esquerdo: Texto */}
        <div style={{ maxWidth: 520 }}>
          <Reveal>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta)',
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
                color: 'var(--color-ink)',
                marginBottom: 32,
                textWrap: 'balance',
              }}
            >
              Nascemos<br />
              de quem<br />
              viveu na pele.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.3vw, 16px)',
                lineHeight: 1.6,
                color: 'var(--color-ink-sub)',
                marginBottom: 24,
              }}
            >
              A Senda Sênior é uma empresa de planejamento e assessoria para o envelhecimento familiar. Fundada por Luciana e Julianne — duas mulheres que viveram pessoalmente os desafios de cuidar de mães idosas — oferecemos orientação estruturada para famílias em qualquer fase do cuidado.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.3vw, 16px)',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'var(--color-ink)',
              }}
            >
              Não somos cuidadores. Não somos clínica.<br />
              Somos a bússola que orienta o caminho.
            </p>
          </Reveal>
        </div>

        {/* Lado Direito: Grid de Cards 2x2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}
        >
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <div
                  style={{
                    background: card.bg,
                    borderRadius: 16,
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-ink)',
                      marginBottom: 8,
                    }}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'var(--color-ink)',
                        lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                        marginBottom: 10,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13,
                        lineHeight: 1.45,
                        color: 'var(--color-ink-sub)',
                        opacity: 0.9,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
