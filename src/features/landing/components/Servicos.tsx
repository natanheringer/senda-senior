'use client'

import { MessageCircle, FolderOpen, Users, Phone } from 'lucide-react'
import { Reveal } from '@/design'

const SERVICOS = [
  {
    icon: <MessageCircle size={28} strokeWidth={1.5} />,
    titulo: 'Consultoria Individual e Familiar',
    descricao:
      'Acompanhamento personalizado para mapear a situação atual da família e construir um plano de cuidado sob medida.',
  },
  {
    icon: <FolderOpen size={28} strokeWidth={1.5} />,
    titulo: 'Documentação Formalizada',
    descricao:
      'Organização e formalização dos documentos essenciais com orientação jurídica e administrativa.',
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    titulo: 'Mediação de Conversas Difíceis',
    descricao:
      'Facilitamos diálogos sobre saúde, finanças e decisões futuras respeitando a autonomia de todos.',
  },
]

export function Servicos() {
  return (
    <section id="servicos" style={{
      padding: 'clamp(100px, 12vw, 180px) clamp(20px, 4vw, 60px)',
      background: 'var(--color-cream-mid)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="label-premium" style={{ marginBottom: 20 }}>Além do manual</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 500, lineHeight: 1.1, color: 'var(--color-ink)',
            marginBottom: 'clamp(60px, 8vw, 100px)', letterSpacing: '-0.02em', maxWidth: 560,
          }}>
            Serviços para quem quer ir além.
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {SERVICOS.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{
                padding: 'clamp(36px, 5vw, 56px) 0',
                borderTop: '1px solid rgba(42,37,32,0.08)',
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(24px, 3vw, 40px)',
                alignItems: 'start',
              }} className="grid-pillar">
                <span style={{
                  color: 'var(--color-green)', opacity: 0.5, marginTop: 6,
                }}>{s.icon}</span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 500,
                    color: 'var(--color-ink)', marginBottom: 12, lineHeight: 1.2,
                  }}>{s.titulo}</h3>
                  <p style={{
                    fontSize: 'clamp(17px, 1.8vw, 20px)', lineHeight: 1.7, color: 'var(--color-ink-sub)',
                    fontWeight: 400, maxWidth: 520,
                  }}>{s.descricao}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 80px)' }}>
            <a href="#contato" id="servicos-cta" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1.5px solid var(--color-terracotta)', color: 'var(--color-terracotta)',
              padding: '16px 36px', borderRadius: 8,
              fontSize: 16, fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.3s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-terracotta)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-terracotta)' }}
            >
              <Phone size={16} strokeWidth={2} />
              Entre em contato
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
