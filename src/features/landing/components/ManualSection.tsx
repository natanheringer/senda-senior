'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle } from 'lucide-react'
import { Reveal } from '@/design'

const BENEFITS = [
  'Documentos de Saúde e Finanças',
  'Cronogramas Práticos de Ação',
  'Revisão do Ambiente do Lar',
]

const GUIAS = [
  {
    num: '01',
    title: 'PREVENT CARE',
    color: 'var(--color-green)',
    content:
      'Construa a fundação de confiança: Diálogos estratégicos, organização de papéis e diretrizes antes de qualquer declínio acontecer.',
  },
  {
    num: '02',
    title: 'CARE',
    color: 'var(--color-terracotta)',
    content:
      'A fase de transição: Como manejar perdas leves de autonomia e implementar cuidados sem gerar atrito ou crises.',
  },
  {
    num: '03',
    title: 'IMMEDIATE CARE',
    color: 'var(--color-ink)',
    content:
      'Ação na urgência: Suporte prático para tomadas de decisão críticas baseadas no plano estabelecido anteriormente.',
  },
]

export function ManualSection() {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null)

  return (
    <section id="manual" style={{
      padding: 'clamp(100px, 12vw, 160px) clamp(20px, 4vw, 60px)',
      background: 'var(--color-cream-mid)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: 'clamp(60px, 8vw, 100px)' }}>
        <Reveal>
          <p className="label-premium" style={{ marginBottom: 20 }}>O Produto</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 500, lineHeight: 1.1, color: 'var(--color-ink)',
            marginBottom: 20, letterSpacing: '-0.02em',
          }}>
            Guias Prevent Care
          </h2>
          <div className="line-terracota" style={{ margin: '24px auto 0' }} />
        </Reveal>
      </div>

      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'minmax(350px, 1.5fr) 1fr',
        gap: 'clamp(30px, 5vw, 80px)', alignItems: 'center',
      }} className="grid-pillar">

        <Reveal delay={0.15}>
          <div style={{
            display: 'flex', gap: 12, height: 'clamp(400px, 50vh, 560px)',
            width: '100%', position: 'relative',
          }} onMouseLeave={() => setHoveredBook(null)}>
            {GUIAS.map((guia, i) => {
              const isHovered = hoveredBook === i
              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredBook(i)}
                  animate={{
                    flex: hoveredBook === null ? 1 : isHovered ? 4.5 : 0.4,
                    filter: hoveredBook === null || isHovered ? 'brightness(1)' : 'brightness(0.6)',
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: guia.color, borderRadius: 4,
                    overflow: 'hidden', cursor: 'pointer', position: 'relative',
                    boxShadow: isHovered ? '0 24px 60px rgba(0,0,0,0.2)' : '0 12px 30px rgba(0,0,0,0.1)',
                    display: 'flex', flexDirection: 'column', padding: '32px 24px',
                    justifyContent: 'space-between',
                    borderLeft: '4px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <motion.div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, display: 'block' }}>VOL {guia.num}</span>
                  </motion.div>

                  <motion.div
                    style={{ whiteSpace: isHovered ? 'normal' : 'nowrap', originX: 0, originY: 1 }}
                    animate={{
                      rotate: hoveredBook === null ? -90 : isHovered ? 0 : -90,
                      opacity: isHovered ? 1 : 0.8,
                      y: hoveredBook === null ? -100 : isHovered ? 0 : -80,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-serif)', fontSize: isHovered ? 'clamp(32px, 3.5vw, 48px)' : 24,
                      fontWeight: 500, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1,
                      marginBottom: isHovered ? 16 : 0,
                    }}>
                      {guia.title}
                    </h3>

                    {isHovered && (
                       <motion.p
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.4, delay: 0.2 }}
                         style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.5, maxWidth: 320 }}
                       >
                         {guia.content}
                       </motion.p>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <p style={{
              fontSize: 'clamp(20px, 2vw, 24px)', lineHeight: 1.5, color: 'var(--color-ink-sub)',
              marginBottom: 32, fontWeight: 400,
            }}>
              A biblioteca essencial para estruturar o longo prazo cuidando do que importa hoje.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="label-premium" style={{ marginBottom: 16 }}>Destaques</p>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={0.25 + i * 0.08}>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  fontSize: 16, lineHeight: 1.5, color: 'var(--color-ink-sub)', fontWeight: 400,
                }}>
                  <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--color-green)', flexShrink: 0, marginTop: 2 }} />
                  {b}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.6}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="/login" id="manual-buy-btn" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: 'var(--color-terracotta)', color: 'white',
                padding: '18px 40px', borderRadius: 8, maxWidth: 320,
                fontSize: 16, fontWeight: 700, textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(181,114,74,0.25)',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-terracotta-dark)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-terracotta)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <BookOpen size={18} strokeWidth={2} />
                Adquirir Coleção Completa
              </a>
              <span style={{ fontSize: 13, color: 'var(--color-ink-muted)', fontStyle: 'italic', paddingLeft: 8 }}>
                Ver condições na plataforma Hotmart
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
