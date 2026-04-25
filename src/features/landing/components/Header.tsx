'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

/** Faixa verde fixa — mockup mãe (nav branca + CTA terracota). */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let frame = 0
    let last = false
    const h = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const next = window.scrollY > 24
        if (next !== last) { last = next; setScrolled(next) }
        frame = 0
      })
    }
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => { if (frame) window.cancelAnimationFrame(frame); window.removeEventListener('scroll', h) }
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 56px)',
          background: 'var(--header-surface)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 32px rgba(0,0,0,0.1)' : 'none',
          transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <NextImage
            src="/brand/logo-14.png"
            alt="Senda Sênior"
            width={400}
            height={140}
            priority
            style={{
              width: 'clamp(200px, 25vw, 280px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </Link>

        <nav
          className="nav-desktop"
          style={{ display: 'flex', alignItems: 'center', gap: 36 }}
        >
          {[
            { label: 'O Manual', href: '#manual' },
            { label: 'Sobre nós', href: '#sobre' },
            { label: 'Contato', href: '#contato' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.88)',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.88)' }}
            >
              {label}
            </a>
          ))}

          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />

          <a
            href="#contato"
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'white',
              background: 'var(--color-terracotta)',
              padding: '11px 28px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-terracotta-dark)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-terracotta)' }}
          >
            Fale conosco
          </a>
        </nav>

        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            padding: 8,
          }}
        >
          {menuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </header>

      {menuOpen && (
        <div
          className="mobile-menu"
          style={{ display: 'flex' }}
          onClick={() => setMenuOpen(false)}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink)' }}
          >
            <X size={26} strokeWidth={1.5} />
          </button>
          {[
            { label: 'O Manual', href: '#manual' },
            { label: 'Sobre nós', href: '#sobre' },
            { label: 'Contato', href: '#contato' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-ink)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: 16, fontWeight: 700, color: 'white',
              background: 'var(--color-terracotta)',
              padding: '16px 40px', borderRadius: 10, textDecoration: 'none', marginTop: 8,
            }}
          >
            Fale conosco
          </a>
        </div>
      )}
    </>
  )
}
