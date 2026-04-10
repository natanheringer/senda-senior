'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'O Manual', href: '#manual' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 clamp(20px, 4vw, 60px)', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(245,239,230,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.04)' : '1px solid transparent',
        transition: 'all 0.5s ease',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Image
            src="/logo-senda-senior.png"
            alt="Senda Sênior"
            width={120}
            height={40}
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontSize: 14, fontWeight: 600, color: 'var(--text-sub)',
              textDecoration: 'none', transition: 'color 0.4s',
              letterSpacing: '0.01em',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}
            >{label}</a>
          ))}
          
          <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.1)', margin: '0 8px' }} />
          
          <a href="/login" style={{
            fontSize: 14, fontWeight: 600, color: 'var(--green)',
            textDecoration: 'none', padding: '10px 16px',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >Área do Cliente</a>
          
          <a href="/login" id="header-cta" style={{
            fontSize: 14, fontWeight: 600, color: 'white',
            background: 'var(--terracotta)', padding: '11px 24px',
            borderRadius: 8, textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 2px 12px rgba(181,114,74,0.18)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--terracotta-dark)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--terracotta)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >Adquirir Manual</a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--green)', padding: 8,
          }}
        >
          {menuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu" style={{ display: 'flex' }}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text)',
            }}
          >
            <X size={28} strokeWidth={2} />
          </button>
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}
            >{label}</a>
          ))}
          <a href="#manual" onClick={() => setMenuOpen(false)} style={{
            fontSize: 17, fontWeight: 600, color: 'white', background: 'var(--terracotta)',
            padding: '16px 48px', borderRadius: 10, textDecoration: 'none',
            marginTop: 16,
          }}>Adquirir Manual</a>
        </div>
      )}
    </>
  )
}
