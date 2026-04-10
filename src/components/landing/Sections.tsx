'use client'

import NextImage from 'next/image'
import { MessageCircle, FolderOpen, Users, Phone, BookOpen } from 'lucide-react'
import { Reveal } from './Reveal'
import { noiseSVG } from './shared'

export function QuemSomos() {
  const fundadoras = [
    {
      nome: 'Luciana M. Moura',
      formacao: 'Advogada · Pós-graduada em Direito Empresarial e Contratos (UniCEUB) · Pedagoga · Pós-graduada em Psicopedagogia (UniDF)',
      frase: 'Combina rigor jurídico com sensibilidade pedagógica para transformar processos complexos em caminhos claros e humanos.',
    },
    {
      nome: 'Julianne Q. Pimentel',
      formacao: 'Administradora · Pós-graduada em Economia Criativa e Inovação Digital (UniCEUB)',
      frase: 'Traz estrutura, visão sistêmica e inovação para organizar processos familiares com eficiência e cuidado.',
    },
  ]

  return (
    <section id="sobre" style={{
      padding: 'clamp(100px, 12vw, 180px) clamp(20px, 4vw, 60px)',
      background: 'var(--terracotta-pale, #F0E0D0)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="label-premium" style={{ marginBottom: 20 }}>Quem somos</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 500, lineHeight: 1.1, color: 'var(--text)',
            marginBottom: 24, letterSpacing: '-0.02em', maxWidth: 700,
          }}>
            Nascemos da convicção de que o cuidado merece preparo, não improviso.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{
            fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.75, color: 'var(--text-sub)',
            maxWidth: 640, marginBottom: 'clamp(60px, 8vw, 100px)', fontWeight: 400,
          }}>
            Não tratamos o envelhecimento como problema. Tratamos como uma fase da vida que, com organização e respeito, pode ser vivida com dignidade — por todos da família.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {fundadoras.map((f, i) => (
            <Reveal key={i} delay={0.1 + i * 0.15}>
              <div style={{
                padding: 'clamp(40px, 5vw, 64px) 0',
                borderTop: '1px solid rgba(42,37,32,0.1)',
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(24px, 4vw, 48px)',
                alignItems: 'start',
              }} className="grid-pillar">
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: 'clamp(60px, 8vw, 96px)',
                  fontWeight: 500, color: 'var(--green)', opacity: 0.12, lineHeight: 0.85,
                }}>
                  {f.nome[0]}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 500,
                    color: 'var(--text)', marginBottom: 12, lineHeight: 1.15,
                  }}>{f.nome}</h3>
                  <p style={{
                    fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.65, color: 'var(--text-muted)',
                    marginBottom: 20, fontWeight: 500, letterSpacing: '0.02em',
                  }}>{f.formacao}</p>
                  <p style={{
                    fontFamily: 'var(--serif)', fontStyle: 'italic',
                    fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.6, color: 'var(--text-sub)',
                  }}>{f.frase}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Servicos() {
  const servicos = [
    {
      icon: <MessageCircle size={28} strokeWidth={1.5} />,
      titulo: 'Consultoria Individual e Familiar',
      descricao: 'Acompanhamento personalizado para mapear a situação atual da família e construir um plano de cuidado sob medida.',
    },
    {
      icon: <FolderOpen size={28} strokeWidth={1.5} />,
      titulo: 'Documentação Formalizada',
      descricao: 'Organização e formalização dos documentos essenciais com orientação jurídica e administrativa.',
    },
    {
      icon: <Users size={28} strokeWidth={1.5} />,
      titulo: 'Mediação de Conversas Difíceis',
      descricao: 'Facilitamos diálogos sobre saúde, finanças e decisões futuras respeitando a autonomia de todos.',
    },
  ]

  return (
    <section id="servicos" style={{
      padding: 'clamp(100px, 12vw, 180px) clamp(20px, 4vw, 60px)',
      background: 'var(--cream-mid)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="label-premium" style={{ marginBottom: 20 }}>Além do manual</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 500, lineHeight: 1.1, color: 'var(--text)',
            marginBottom: 'clamp(60px, 8vw, 100px)', letterSpacing: '-0.02em', maxWidth: 560,
          }}>
            Serviços para quem quer ir além.
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {servicos.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{
                padding: 'clamp(36px, 5vw, 56px) 0',
                borderTop: '1px solid rgba(42,37,32,0.08)',
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(24px, 3vw, 40px)',
                alignItems: 'start',
              }} className="grid-pillar">
                <span style={{
                  color: 'var(--green)', opacity: 0.5, marginTop: 6,
                }}>{s.icon}</span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 500,
                    color: 'var(--text)', marginBottom: 12, lineHeight: 1.2,
                  }}>{s.titulo}</h3>
                  <p style={{
                    fontSize: 'clamp(17px, 1.8vw, 20px)', lineHeight: 1.7, color: 'var(--text-sub)',
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
              border: '1.5px solid var(--terracotta)', color: 'var(--terracotta)',
              padding: '16px 36px', borderRadius: 8,
              fontSize: 16, fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--terracotta)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--terracotta)' }}
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

export function CTAFinal() {
  return (
    <section id="contato" style={{
      padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px)',
      background: 'var(--green)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: noiseSVG, pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: 800, margin: '0 auto', textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)', marginBottom: 28,
          }}>O primeiro passo</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 500, lineHeight: 1.1, color: 'white',
            marginBottom: 28, letterSpacing: '-0.02em',
          }}>
            O primeiro passo é simples.<br />O manual te acompanha no resto.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{
            fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)',
            marginBottom: 48, maxWidth: 560, margin: '0 auto 48px',
            fontWeight: 400,
          }}>
            O melhor momento para organizar o cuidado é enquanto todos estão bem. A tranquilidade do amanhã começa com uma conversa hoje.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/login" id="final-cta-buy" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', color: 'var(--terracotta)',
              padding: '17px 40px', borderRadius: 12,
              fontSize: 16, fontWeight: 700, textDecoration: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              <BookOpen size={18} strokeWidth={2} />
              Adquirir o Manual Prevent Care
            </a>
            <a href="mailto:contato@sendasenior.com.br" id="final-cta-email" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1.5px solid rgba(255,255,255,0.4)', color: 'white',
              padding: '17px 36px', borderRadius: 12,
              fontSize: 16, fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.3s',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.07)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              <Phone size={18} strokeWidth={2} />
              Falar com a equipe
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.38)',
            marginTop: 32, fontStyle: 'italic',
          }}>
            contato@sendasenior.com.br
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const cols = [
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

  return (
    <footer style={{
      padding: '64px clamp(20px, 4vw, 60px) 32px',
      background: 'var(--dark)', color: 'white',
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
        {cols.map((col, i) => (
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
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
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
