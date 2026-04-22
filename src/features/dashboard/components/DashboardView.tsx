'use client'

import Link from 'next/link'
import { useState, type CSSProperties, type ReactNode } from 'react'
import {
  Scale,
  Heart,
  ShieldCheck,
  FolderOpen,
  Stethoscope,
  UserPlus,
  Lock,
  Shield,
} from 'lucide-react'
import { Checklist } from './Checklist'
import { LogoutButton } from './LogoutButton'
import type { ChecklistItem } from '@/features/dashboard/types'

interface Pilar {
  icon: ReactNode
  label: string
  title: string
  desc: string
  color: string
  bg: string
}

const PILARES: Pilar[] = [
  {
    icon: <Scale size={28} strokeWidth={1.5} />,
    label: 'Jurídico',
    title: 'Documentos e Procurações',
    desc: 'Testamento, diretivas antecipadas e procurações organizadas e seguras.',
    color: 'var(--color-green)',
    bg: 'linear-gradient(135deg, #E8F0EB 0%, #D4E5DB 100%)',
  },
  {
    icon: <Heart size={28} strokeWidth={1.5} />,
    label: 'Saúde',
    title: 'Histórico Médico',
    desc: 'Exames, medicamentos e médicos centralizados — para você e quem você ama.',
    color: 'var(--color-brown)',
    bg: 'linear-gradient(135deg, #F5EFE6 0%, #EDE5D8 100%)',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    label: 'Proteção',
    title: 'Rede de Confiança',
    desc: 'Família, cuidadores e profissionais — com acesso controlado por você.',
    color: 'var(--color-green)',
    bg: 'linear-gradient(135deg, #F0F5F2 0%, #E0EBE5 100%)',
  },
]

const ACOES: Array<{ icon: ReactNode; title: string; desc: string; href?: string }> = [
  { icon: <FolderOpen size={22} strokeWidth={1.5} />, title: 'Abrir cofre', desc: 'Seus documentos organizados automaticamente', href: '/vault' },
  { icon: <Stethoscope size={22} strokeWidth={1.5} />, title: 'Registrar consulta', desc: 'Adicionar exame ou consulta' },
  { icon: <UserPlus size={22} strokeWidth={1.5} />, title: 'Convidar pessoa', desc: 'Adicionar à rede de confiança' },
  { icon: <Lock size={22} strokeWidth={1.5} />, title: 'Configurar acessos', desc: 'Gerenciar permissões' },
]

interface DashboardViewProps {
  userEmail: string
  firstName: string
  initialChecklist: ChecklistItem[]
}

export function DashboardView({ userEmail, firstName, initialChecklist }: DashboardViewProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredAction, setHoveredAction] = useState<number | null>(null)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)' }}>
      <header
        className="dash-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '0 clamp(20px, 4vw, 48px)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(245,239,230,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--color-green)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          Senda Sênior
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 16px',
              borderRadius: 10,
              background: 'rgba(45,95,79,0.06)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--color-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: 'white',
              }}
            >
              {firstName[0]?.toUpperCase()}
            </div>
            <span
              className="dash-header-email"
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--color-ink-sub)',
              }}
            >
              {userEmail}
            </span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)',
        }}
      >
        <div style={{ marginBottom: 56 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-green)',
              marginBottom: 12,
              opacity: 0.7,
            }}
          >
            Painel
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            Olá, {firstName}.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: 'var(--color-brown-light)',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Continue organizando o que importa. Tudo sob seu controle.
          </p>
        </div>

        <div
          className="grid-pillar"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            marginBottom: 56,
          }}
        >
          {PILARES.map((p, i) => (
            <div
              key={p.label}
              id={`card-${p.label.toLowerCase()}`}
              style={{
                padding: 32,
                borderRadius: 16,
                background: p.bg,
                border: '1px solid rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.4s var(--ease-senda)',
                transform: hoveredCard === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow:
                  hoveredCard === i
                    ? '0 16px 48px rgba(0,0,0,0.1)'
                    : '0 2px 12px rgba(0,0,0,0.03)',
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <span style={{ display: 'block', fontSize: 32, marginBottom: 20, opacity: 0.7 }}>
                {p.icon}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: p.color,
                  marginBottom: 8,
                  opacity: 0.6,
                }}
              >
                {p.label}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--color-ink-sub)',
                  fontWeight: 500,
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  marginTop: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 600,
                  color: p.color,
                }}
              >
                Acessar
                <span
                  style={{
                    transition: 'transform 0.3s',
                    transform: hoveredCard === i ? 'translateX(4px)' : 'translateX(0)',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              fontWeight: 600,
              color: 'var(--color-ink)',
              marginBottom: 24,
              letterSpacing: '-0.01em',
            }}
          >
            Ações rápidas
          </h2>
          <div
            className="grid-actions"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
          >
            {ACOES.map((a, i) => {
              const inner = (
                <>
                  <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{a.icon}</span>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'var(--color-ink)',
                      marginBottom: 4,
                    }}
                  >
                    {a.title}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--color-ink-muted)',
                      lineHeight: 1.4,
                      fontWeight: 500,
                    }}
                  >
                    {a.desc}
                  </p>
                </>
              )

              const boxStyle: CSSProperties = {
                padding: '20px 24px',
                borderRadius: 14,
                background:
                  hoveredAction === i ? 'var(--color-warm-white)' : 'rgba(254,252,249,0.6)',
                border: '1.5px solid',
                borderColor:
                  hoveredAction === i ? 'var(--color-green-light)' : 'rgba(0,0,0,0.04)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s',
                transform: hoveredAction === i ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredAction === i ? '0 8px 24px rgba(0,0,0,0.06)' : 'none',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
              }

              if (a.href) {
                return (
                  <Link
                    key={a.title}
                    href={a.href}
                    id={`action-${i}`}
                    style={boxStyle}
                    onMouseEnter={() => setHoveredAction(i)}
                    onMouseLeave={() => setHoveredAction(null)}
                  >
                    {inner}
                  </Link>
                )
              }
              return (
                <button
                  key={a.title}
                  id={`action-${i}`}
                  style={boxStyle}
                  onMouseEnter={() => setHoveredAction(i)}
                  onMouseLeave={() => setHoveredAction(null)}
                >
                  {inner}
                </button>
              )
            })}
          </div>
        </div>

        <div
          className="grid-status"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        >
          <div
            style={{
              padding: 32,
              borderRadius: 16,
              background: 'var(--color-warm-white)',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--color-green-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                <Shield size={20} strokeWidth={1.8} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                }}
              >
                Segurança
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Criptografia', status: 'Ativa', ok: true },
                { label: 'Autenticação', status: 'Verificada', ok: true },
                { label: 'LGPD', status: 'Em conformidade', ok: true },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: 'rgba(45,95,79,0.03)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      color: 'var(--color-ink-sub)',
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: item.ok ? 'var(--color-green)' : 'var(--color-brown)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: item.ok ? '#22C55E' : '#EAB308',
                        display: 'inline-block',
                      }}
                    />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Checklist initialItems={initialChecklist} />
        </div>
      </main>

      <footer
        style={{
          padding: '32px clamp(20px, 4vw, 48px)',
          borderTop: '1px solid rgba(0,0,0,0.04)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>
          © 2026 Senda Sênior. Seus dados estão protegidos por criptografia ponta a ponta.
        </p>
      </footer>
    </div>
  )
}
