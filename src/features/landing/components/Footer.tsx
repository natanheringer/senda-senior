'use client'

import NextImage from 'next/image'
import { Linkedin, Facebook, Dribbble, Twitter } from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────────────────── */

const NAV_COLUMNS = [
  {
    title: 'EXPLORE',
    links: [
      { label: 'Sobre nós', href: '#sobre' },
      { label: 'Manuais', href: '#manuais' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Conteúdo', href: '#conteudo' },
    ],
  },
  {
    title: 'CONTATO',
    links: [
      { label: 'E-mail', href: 'mailto:contato@sendasenior.com.br' },
      { label: 'WhatsApp', href: 'https://wa.me/' }, // TODO: add real number
      { label: 'Agendar Conversa', href: '#contato' },
      { label: 'Instagram', href: '#' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Termos de Serviço', href: '#termos' },
      { label: 'Política de Privacidade', href: '#privacidade' },
      { label: 'Política de Cookies', href: '#cookies' },
      { label: 'Tratamento de Dados (LGPD)', href: '#lgpd' },
    ],
  },
]

const SOCIALS = [
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Dribbble, href: '#', label: 'Dribbble' },
  { Icon: Twitter, href: '#', label: 'X / Twitter' },
]

/* ─── Color tokens (dark ink on gold background) ─────────────────────── */
const INK = '#2a2520'
const INK_MUTED = 'rgba(42, 37, 32, 0.58)'
const INK_LABEL = 'rgba(42, 37, 32, 0.38)'
const BG = '#EDCE90'

/* ─── Footer ──────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer
      style={{
        background: BG,
        color: INK,
        padding: 'clamp(52px, 7vw, 72px) clamp(24px, 5vw, 80px) 0',
        position: 'relative',
      }}
    >
      {/* ── Main grid: logo | explore | contato | legal | newsletter ── */}
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr repeat(3, auto) 1.2fr',
          gap: 'clamp(28px, 4vw, 56px)',
          alignItems: 'start',
          paddingBottom: 'clamp(40px, 5vw, 60px)',
        }}
      >
        {/* Logo + tagline */}
        <div>
          <NextImage
            src="/brand/logo-11.png"
            alt="Senda Sênior"
            width={200}
            height={60}
            style={{
              height: 44,
              width: 'auto',
              objectFit: 'contain',
              marginBottom: 14,
              // No filter: logo shows in its natural dark color on gold background
            }}
          />
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              color: INK_MUTED,
              fontFamily: 'var(--font-sans)',
            }}
          >
            O cuidado que começa<br />antes da urgência.
          </p>
        </div>

        {/* Nav columns */}
        {NAV_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: INK_LABEL,
                marginBottom: 20,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {col.title}
            </h4>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: 'block',
                  fontSize: 13,
                  color: INK_MUTED,
                  textDecoration: 'none',
                  marginBottom: 12,
                  fontFamily: 'var(--font-sans)',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}

        {/* Newsletter + social icons */}
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: INK,
              fontFamily: 'var(--font-sans)',
              marginBottom: 14,
            }}
          >
            Inscreva-se no nosso Newsletter
          </p>

          {/* Input pill with integrated button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.55)',
              borderRadius: 100,
              border: '1px solid rgba(42, 37, 32, 0.14)',
              overflow: 'hidden',
              marginBottom: 20,
            }}
          >
            <input
              type="email"
              id="newsletter-email"
              name="email"
              placeholder="Enter Email address"
              aria-label="Email para newsletter"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                padding: '10px 16px',
                fontSize: 13,
                color: INK,
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--color-terracotta)',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 100,
                margin: 3,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                whiteSpace: 'nowrap',
              }}
            >
              Enviar →
            </button>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: 'rgba(42, 37, 32, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: INK,
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                <Icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          borderTop: '1px solid rgba(42, 37, 32, 0.16)',
          padding: '18px 0 22px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          color: INK_MUTED,
          fontFamily: 'var(--font-sans)',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#termos" style={{ color: INK_MUTED, textDecoration: 'none' }}>
            Termos de Serviço
          </a>
          <a href="#privacidade" style={{ color: INK_MUTED, textDecoration: 'none' }}>
            Política de Privacidade
          </a>
        </div>
        <span>© 2025 Senda Sênior. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
