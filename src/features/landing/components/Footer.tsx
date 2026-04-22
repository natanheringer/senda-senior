'use client'

import NextImage from 'next/image'

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
      padding: '64px clamp(20px, 4vw, 60px) 32px',
      background: 'var(--color-ink)', color: 'white',
    }}>
      <div className="grid-footer" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'start',
        flexWrap: 'wrap', gap: 40, marginBottom: 48,
      }}>
        <div style={{ maxWidth: 260 }}>
          <NextImage
            src="/logo-senda-senior.png"
            alt="Senda Sênior"
            width={120}
            height={48}
            style={{ height: 48, width: 'auto', objectFit: 'contain', marginBottom: 16, filter: 'brightness(1.8) saturate(0.5)' }}
          />
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7,
          }}>
            Planejamento & Assessoria Sênior.<br />
            Cuidado com propósito. Autonomia com dignidade.
          </p>
        </div>
        {COLUMNS.map((col, i) => (
          <div key={i}>
            <h4 style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
              marginBottom: 16,
            }}>{col.title}</h4>
            {col.links.map((link, j) => (
              <a key={j} href={link.includes('@') ? `mailto:${link}` : '#'} style={{
                display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none', marginBottom: 10,
                transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{link}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 20, fontSize: 13,
        color: 'rgba(255,255,255,0.22)',
        maxWidth: 1200, margin: '0 auto',
      }}>
        © 2026 Senda Sênior. Todos os direitos reservados. · sendasenior.com.br
      </div>
    </footer>
  )
}
