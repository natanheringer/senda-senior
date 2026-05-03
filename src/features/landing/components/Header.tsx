'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Hook do Framer Motion para ler o scroll vertical da página
  const { scrollY } = useScroll()
  
  // Mapeia o scroll de 0px a 250px para uma opacidade de 1 até 0
  const headerOpacity = useTransform(scrollY, [0, 250], [1, 0])
  
  // Evita que o header "invisível" bloqueie cliques em elementos abaixo dele
  const pointerEvents = useTransform(scrollY, [200, 250], ['auto', 'none'])

  return (
    <>
      {/* Spacer para empurrar o conteúdo pra baixo já que o header agora é fixed */}
      <div style={{ height: 80, background: 'var(--color-terracotta-light)' }} />
      
      <motion.header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 80, // Navbar mais fina
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 56px)',
          background: 'var(--color-terracotta-light)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          opacity: headerOpacity,
          pointerEvents: pointerEvents as any,
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
              width: 'clamp(140px, 20vw, 180px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0) opacity(0.85)', // Dark logo
            }}
          />
        </Link>

        <nav
          className="nav-desktop"
          style={{ display: 'flex', alignItems: 'center', gap: 32 }}
        >
          {[
            { label: 'Sobre', href: '#sobre' },
            { label: 'Manuais', href: '#manual' },
            { label: 'Features', href: '#features', hasDropdown: true },
            { label: 'Serviços', href: '#servicos' },
            { label: 'Contato', href: '#contato' },
          ].map(({ label, href, hasDropdown }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--color-ink)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'opacity 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {label}
              {hasDropdown && <ChevronDown size={14} strokeWidth={2} opacity={0.6} />}
            </a>
          ))}
        </nav>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href="#login"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--color-ink)',
              background: 'transparent',
              border: '1px solid rgba(42, 37, 32, 0.4)',
              padding: '10px 24px',
              borderRadius: 30, // pill shape
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.background = 'rgba(42, 37, 32, 0.05)'
              e.currentTarget.style.borderColor = 'var(--color-ink)'
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(42, 37, 32, 0.4)'
            }}
          >
            Login
          </a>

          <a
            href="#area-cliente"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--color-ink)',
              background: 'var(--color-terracotta)', // darker base for the patterned button
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              padding: '10px 24px',
              borderRadius: 30, // pill shape
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Área do Cliente
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>

        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-ink)',
            padding: 8,
          }}
        >
          {menuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </motion.header>

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
            { label: 'Sobre', href: '#sobre' },
            { label: 'Manuais', href: '#manual' },
            { label: 'Features', href: '#features' },
            { label: 'Serviços', href: '#servicos' },
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16, width: '100%', padding: '0 32px' }}>
             <a
              href="#login"
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 16, fontWeight: 600, color: 'var(--color-ink)',
                border: '1px solid rgba(42, 37, 32, 0.4)',
                padding: '14px 0', borderRadius: 30, textDecoration: 'none', textAlign: 'center'
              }}
            >
              Login
            </a>
            <a
              href="#area-cliente"
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 16, fontWeight: 600, color: 'var(--color-ink)',
                background: 'var(--color-terracotta)',
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '4px 4px',
                padding: '14px 0', borderRadius: 30, textDecoration: 'none', textAlign: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              Área do Cliente <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
