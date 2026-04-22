'use client'

import { Reveal } from '@/design'

const FUNDADORAS = [
  {
    nome: 'Luciana M. Moura',
    formacao:
      'Advogada · Pós-graduada em Direito Empresarial e Contratos (UniCEUB) · Pedagoga · Pós-graduada em Psicopedagogia (UniDF)',
    frase:
      'Combina rigor jurídico com sensibilidade pedagógica para transformar processos complexos em caminhos claros e humanos.',
  },
  {
    nome: 'Julianne Q. Pimentel',
    formacao:
      'Administradora · Pós-graduada em Economia Criativa e Inovação Digital (UniCEUB)',
    frase:
      'Traz estrutura, visão sistêmica e inovação para organizar processos familiares com eficiência e cuidado.',
  },
]

export function QuemSomos() {
  return (
    <section id="sobre" style={{
      padding: 'clamp(100px, 12vw, 180px) clamp(20px, 4vw, 60px)',
      background: 'var(--color-terracotta-pale)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="label-premium" style={{ marginBottom: 20 }}>Quem somos</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 500, lineHeight: 1.1, color: 'var(--color-ink)',
            marginBottom: 24, letterSpacing: '-0.02em', maxWidth: 700,
          }}>
            Nascemos da convicção de que o cuidado merece preparo, não improviso.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{
            fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.75, color: 'var(--color-ink-sub)',
            maxWidth: 640, marginBottom: 'clamp(60px, 8vw, 100px)', fontWeight: 400,
          }}>
            Não tratamos o envelhecimento como problema. Tratamos como uma fase da vida que, com organização e respeito, pode ser vivida com dignidade — por todos da família.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {FUNDADORAS.map((f, i) => (
            <Reveal key={i} delay={0.1 + i * 0.15}>
              <div style={{
                padding: 'clamp(40px, 5vw, 64px) 0',
                borderTop: '1px solid rgba(42,37,32,0.1)',
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(24px, 4vw, 48px)',
                alignItems: 'start',
              }} className="grid-pillar">
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'clamp(60px, 8vw, 96px)',
                  fontWeight: 500, color: 'var(--color-green)', opacity: 0.12, lineHeight: 0.85,
                }}>
                  {f.nome[0]}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 500,
                    color: 'var(--color-ink)', marginBottom: 12, lineHeight: 1.15,
                  }}>{f.nome}</h3>
                  <p style={{
                    fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.65, color: 'var(--color-ink-muted)',
                    marginBottom: 20, fontWeight: 500, letterSpacing: '0.02em',
                  }}>{f.formacao}</p>
                  <p style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                    fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.6, color: 'var(--color-ink-sub)',
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
