'use client'

/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'

/* ─── Article card data ─────────────────────────────────────────────── */

const ARTIGOS = [
  {
    icon: '/icons/brand/msgs.svg',
    title: 'Como conversar com seus pais sobre o futuro sem que ninguém fuja da mesa',
    subtitle: 'Roteiro para iniciar conversas difíceis.',
    href: '#',
    bg: '#8B9E7A',
    titleColor: '#1e2e1e',
    subtitleColor: 'rgba(30, 46, 30, 0.6)',
    ctaColor: '#1e2e1e',
  },
  {
    icon: '/icons/brand/file-content.svg',
    title: '5 documentos que toda família deveria ter prontos antes dos 70 anos dos pais',
    subtitle: 'Organização jurídica e financeira para evitar urgências.',
    href: '#',
    bg: '#EDCE90',
    titleColor: '#6B3A18',
    subtitleColor: 'rgba(107, 58, 24, 0.65)',
    ctaColor: 'var(--color-terracotta)',
  },
  {
    icon: '/icons/brand/roadmap.svg',
    title: 'Em qual fase de cuidado sua família está?',
    subtitle: 'Identifique sinais e entenda o momento atual do envelhecimento.',
    href: '#',
    bg: '#EDE8DC',
    titleColor: '#2a2520',
    subtitleColor: 'rgba(42, 37, 32, 0.55)',
    ctaColor: '#2a2520',
  },
]

/* ─── Brand lineart icon — neutral white-translucent bg works on all card colors ─ */

function ArticleIcon({ src }: { src: string }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 12,
        background: 'rgba(255, 255, 255, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        flexShrink: 0,
      }}
    >
      {/* 24px display — viewBox 18×18 scales stroke to ~1.33px effective */}
      <img src={src} width={24} height={24} alt="" aria-hidden />
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export function Conteudo() {
  return (
    <section
      id="conteudo"
      style={{
        background: 'var(--color-green-dark)',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(20px, 5vw, 64px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 4vw, 48px)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 232, 0.5)',
              marginBottom: 16,
            }}
          >
            Conteúdo
          </p>

          {/* Italic serif — explicitly shown in reference */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.12,
              color: 'var(--color-cream)',
              letterSpacing: '-0.02em',
              maxWidth: 800,
              margin: '0 auto',
              textWrap: 'balance',
            }}
          >
            Orientações para conversas que ninguém sabe como começar.
          </h2>
        </div>

        {/* ── 3-column grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(12px, 1.5vw, 18px)',
          }}
        >
          {ARTIGOS.map((a, i) => (
            <div
              key={i}
              style={{
                background: a.bg,
                borderRadius: 20,
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Icon — unique per article */}
              <ArticleIcon src={a.icon} />

              {/* Title */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1.3vw, 17px)',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: a.titleColor,
                  marginBottom: 10,
                  flex: 1,
                }}
              >
                {a.title}
              </p>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  color: a.subtitleColor,
                  lineHeight: 1.5,
                  marginBottom: 22,
                }}
              >
                {a.subtitle}
              </p>

              {/* CTA */}
              <Link
                href={a.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: a.ctaColor,
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                Ler artigo →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
