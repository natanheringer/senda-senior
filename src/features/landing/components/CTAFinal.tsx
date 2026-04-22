'use client'

import { BookOpen, Phone } from 'lucide-react'
import { Reveal } from '@/design'
import { noiseSVG } from '@/features/landing/shared/noise'

export function CTAFinal() {
  return (
    <section id="contato" style={{
      padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px)',
      background: 'var(--color-green)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: noiseSVG, pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: 800, margin: '0 auto', textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)', marginBottom: 28,
          }}>O primeiro passo</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 500, lineHeight: 1.1, color: 'white',
            marginBottom: 28, letterSpacing: '-0.02em',
          }}>
            O primeiro passo é simples.<br />O manual te acompanha no resto.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{
            fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)',
            marginBottom: 48, maxWidth: 560, margin: '0 auto 48px',
            fontWeight: 400,
          }}>
            O melhor momento para organizar o cuidado é enquanto todos estão bem. A tranquilidade do amanhã começa com uma conversa hoje.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/login" id="final-cta-buy" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', color: 'var(--color-terracotta)',
              padding: '17px 40px', borderRadius: 12,
              fontSize: 16, fontWeight: 700, textDecoration: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              <BookOpen size={18} strokeWidth={2} />
              Adquirir o Manual Prevent Care
            </a>
            <a href="mailto:contato@sendasenior.com.br" id="final-cta-email" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1.5px solid rgba(255,255,255,0.4)', color: 'white',
              padding: '17px 36px', borderRadius: 12,
              fontSize: 16, fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.3s',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.07)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              <Phone size={18} strokeWidth={2} />
              Falar com a equipe
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.38)',
            marginTop: 32, fontStyle: 'italic',
          }}>
            contato@sendasenior.com.br
          </p>
        </Reveal>
      </div>
    </section>
  )
}
