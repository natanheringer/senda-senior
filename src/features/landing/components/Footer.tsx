'use client'

import NextImage from 'next/image'
import { BrandStar } from '@/features/landing/shared/BrandStar'

const COLUMNS = [
  {
    title: 'Senda Sênior',
    links: ['O Manual', 'Consultoria', 'Sobre nós', 'Contato'],
  },
  {
    title: 'Legal',
    links: ['Privacidade', 'Termos', 'LGPD'],
  },
  {
    title: 'Contato',
    links: ['contato@sendasenior.com.br'],
  },
]

export function Footer() {
  return (
    <footer style={{
      padding: 'clamp(88px, 10vw, 120px) 0 clamp(40px, 5vw, 52px)',
      background: 'var(--footer-surface)', color: 'white',
      position: 'relative', overflow: 'hidden',
    }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 110% 50% at 50% -8%, rgba(255,255,255,0.06) 0%, transparent 42%)',
          pointerEvents: 'none',
        }}
      />
      {/* Padrão estrela sutil — design folder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: "url('/brand/pattern-estrela-greenmono-dark.png')",
          backgroundSize: '800px auto',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Estrela decorativa */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.03, zIndex: 0 }}>
        <BrandStar size={200} color="white" />
      </div>

      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(17px, 2vw, 22px)',
          textAlign: 'center',
          color: 'rgba(245,240,232,0.82)',
          maxWidth: 560,
          margin: '0 auto clamp(52px, 6vw, 72px)',
          lineHeight: 1.5,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Planejar é um gesto de amor. Estamos aqui para te ajudar.
      </p>

      <div className="grid-footer landing-max" style={{
        margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'start',
        flexWrap: 'wrap', gap: 'clamp(40px, 5vw, 56px)', marginBottom: 52,
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ maxWidth: 280 }}>
          <NextImage
            src="/brand/logo-11.png"
            alt="Senda Sênior"
            width={320}
            height={96}
            style={{ height: 56, width: 'auto', objectFit: 'contain', marginBottom: 16, filter: 'brightness(0) invert(1) saturate(0)' }}
          />
          <p style={{
            fontSize: 15, color: 'rgba(245,240,232,0.44)', lineHeight: 1.75,
          }}>
            Planejamento & Assessoria Sênior.<br />
            Cuidado com propósito. Autonomia com dignidade.
          </p>
        </div>
        {COLUMNS.map((col, i) => (
          <div key={i}>
            <h4 style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: 'rgba(245,240,232,0.32)',
              marginBottom: 18,
            }}>{col.title}</h4>
            {col.links.map((link, j) => (
              <a key={j} href={link.includes('@') ? `mailto:${link}` : '#'} className="footer-link-hover" style={{
                display: 'block', fontSize: 14, color: 'rgba(245,240,232,0.48)',
                textDecoration: 'none', marginBottom: 12,
                transition: 'color 0.3s',
              }}>{link}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="landing-max" style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingTop: 28, fontSize: 13,
        color: 'rgba(245,240,232,0.38)',
        margin: '0 auto',
        position: 'relative', zIndex: 1,
      }}>
        © 2026 Senda Sênior. Todos os direitos reservados. · sendasenior.com.br
      </div>
    </footer>
  )
}
