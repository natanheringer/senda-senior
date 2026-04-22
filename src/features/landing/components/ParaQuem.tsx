'use client'

import { Reveal } from '@/design'
import { noiseSVG } from '@/features/landing/shared/noise'

const PROFILES = [
  'Para quem percebeu que seus pais estão envelhecendo e quer se preparar com calma.',
  'Para famílias que preferem decidir juntas, antes que a urgência decida por elas.',
  'Para quem sente que está deixando de ser filho para virar cuidador — e não sabe por onde começar.',
  'Para quem quer organizar o cuidado sem tirar a autonomia de quem ama.',
]

export function ParaQuem() {
  return (
    <section style={{
      padding: 'clamp(100px, 12vw, 180px) clamp(20px, 4vw, 60px)',
      background: 'var(--color-cream)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <Reveal>
            <p className="label-premium" style={{ marginBottom: 24 }}>Para quem é</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.5vw, 56px)',
              fontWeight: 500, lineHeight: 1.1, color: 'var(--color-ink)',
              letterSpacing: '-0.02em', maxWidth: 600, marginBottom: 0,
            }}>
              Reconheceu algum desses momentos?
            </h2>
            <div className="line-terracota" />
          </Reveal>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PROFILES.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <div style={{
                padding: 'clamp(32px, 4vw, 48px) 0',
                borderBottom: i < PROFILES.length - 1 ? '1px solid rgba(42,37,32,0.08)' : 'none',
                display: 'flex', alignItems: 'baseline', gap: 'clamp(20px, 3vw, 40px)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 5vw, 64px)',
                  fontWeight: 500, color: 'var(--color-green)', opacity: 0.15, lineHeight: 1,
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.4,
                  color: 'var(--color-ink)', fontWeight: 400,
                }}>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Depoimento() {
  return (
    <div style={{
      padding: 'clamp(100px, 12vw, 180px) clamp(20px, 4vw, 60px)',
      background: 'var(--color-green)', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: noiseSVG, pointerEvents: 'none',
      }} />
      <Reveal>
        <blockquote style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 48px)',
          fontWeight: 400, fontStyle: 'italic', lineHeight: 1.35,
          color: 'white', maxWidth: 800, margin: '0 auto',
          letterSpacing: '-0.01em', position: 'relative', zIndex: 1,
        }}>
          &ldquo;O manual me deu clareza e coragem para conversar com minha mãe sobre o futuro dela — com respeito, sem drama, no jeito certo.&rdquo;
        </blockquote>
      </Reveal>
      <Reveal delay={0.2}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
          color: 'rgba(255,255,255,0.45)', marginTop: 32, position: 'relative', zIndex: 1,
          letterSpacing: 1.5,
        }}>
          LEITORA · FILHA DE MÃE COM 74 ANOS · BRASÍLIA
        </p>
      </Reveal>
    </div>
  )
}
