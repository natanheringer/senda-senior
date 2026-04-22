'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { Compass } from 'lucide-react'
import { Reveal } from '@/design'
import { noiseSVG } from '@/features/landing/shared/noise'
import { useParallax } from '@/features/landing/shared/useParallax'

export function Hero() {
  const imgRef = useParallax(0.03)

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div ref={imgRef} style={{ position: 'absolute', inset: '-10% 0', zIndex: 0 }}>
        <NextImage
          src="/hero-elderly.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="filter-premium"
          style={{
            objectFit: 'cover', objectPosition: 'center right',
            display: 'block',
          }}
        />
      </div>

      <div style={{ position: 'absolute', top: '-30%', right: '-15%', zIndex: 1, opacity: 0.05 }}>
         <Compass size={1200} strokeWidth={1.5} color="var(--color-green)" style={{ animation: 'spin 120s linear infinite' }} />
      </div>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.93) 35%, rgba(245,240,232,0.65) 58%, rgba(245,240,232,0.1) 80%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(245,240,232,0.6) 0%, transparent 40%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025, zIndex: 2,
        backgroundImage: noiseSVG,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 3,
        padding: '140px clamp(20px, 4vw, 60px) 100px',
      }}>
        <div style={{ maxWidth: 580 }}>
          <Reveal>
            <div className="label-premium" style={{ marginBottom: 28, opacity: 0.85 }}>
              Planejamento & Assessoria Sênior
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 5vw, 68px)',
              fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em',
              color: 'var(--color-ink)', marginBottom: 0,
            }}>
              Senda Sênior: <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-green)' }}>Uma Jornada de Cuidado e Independência.</em>
            </h1>
            <div className="line-terracota" />
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px, 1.8vw, 21px)',
              fontWeight: 400, lineHeight: 1.65, color: 'var(--color-ink-sub)',
              maxWidth: 480, marginBottom: 16,
            }}>
              Mais do que apenas um guia, um caminho para um envelhecimento mais tranquilo e conectado. Simplificamos a organização familiar para que você possa focar no que realmente importa: estar presente.
            </p>
          </Reveal>
          <Reveal delay={0.42}>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(15px, 1.4vw, 18px)',
              fontStyle: 'italic', color: 'var(--color-terracotta-light)',
              maxWidth: 420, marginBottom: 48, lineHeight: 1.6,
            }}>
              &ldquo;Cada toque é natural e acolhedor.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <div className="hero-buttons" style={{ display: 'flex', gap: 16 }}>
              <Link href="/manual/apresentacao" id="hero-cta-primary" data-cursor="Ler Agora" style={{
                background: 'var(--color-terracotta)', color: 'white',
                padding: '17px 36px', borderRadius: 10,
                fontSize: 16, fontWeight: 700, textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(181,114,74,0.25)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-terracotta-dark)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-terracotta)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >Conhecer o Manual</Link>
              <a href="#contato" id="hero-cta-secondary" data-cursor="Contato" style={{
                background: 'rgba(255,255,255,0.65)', color: 'var(--color-green)',
                padding: '17px 36px', borderRadius: 10,
                fontSize: 16, fontWeight: 600, textDecoration: 'none',
                border: '1.5px solid var(--color-green)', transition: 'all 0.3s',
                backdropFilter: 'blur(8px)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.65)' }}
              >Falar Conosco</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.7}>
          <div className="hero-testimonial" style={{
            position: 'absolute', bottom: 100, right: 'clamp(20px, 4vw, 60px)',
            background: 'rgba(254,252,249,0.86)', backdropFilter: 'blur(24px)',
            padding: '20px 26px', borderRadius: 16, maxWidth: 290,
            boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
            border: '1px solid rgba(255,255,255,0.6)',
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              color: 'var(--color-green)', marginBottom: 10, letterSpacing: '0.02em',
            }}>
              ✦ A fundação do cuidado
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink-sub)',
            }}>
              &ldquo;Decisões tomadas com calma sempre protegem melhor do que decisões tomadas na pressa.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
