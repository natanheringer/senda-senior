'use client'

import type { ReactNode } from 'react'
import NextImage from 'next/image'
import { MessageCircle, FolderOpen, ShieldCheck, Users } from 'lucide-react'
import { Reveal } from '@/design'

export const pilaresData = [
  {
    icon: <MessageCircle size={32} strokeWidth={1.5} />,
    label: 'Comunicação',
    title: 'Conversas que constroem, não que assustam.',
    text: 'Você sabe que precisa conversar sobre o futuro dos seus pais — mas não sabe como começar sem gerar drama. O manual ensina a abrir esses diálogos com respeito, no tempo certo, de um jeito que une a família em vez de dividi-la.',
    image: '/pilar-protecao.png',
    imageAlt: 'Família sentada junta, conversa leve, luz natural',
  },
  {
    icon: <FolderOpen size={32} strokeWidth={1.5} />,
    label: 'Organização',
    title: 'Tudo no lugar, antes que alguém precise procurar.',
    text: 'Documentos pessoais, exames, medicamentos, finanças, contatos de emergência — tudo centralizado e acessível. Porque a organização hoje evita o desespero de amanhã.',
    image: '/pilar-juridico.png',
    imageAlt: 'Mãos organizando documentos em mesa, pasta com papéis',
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    label: 'Proteção',
    title: 'Decisões tomadas com calma têm mais valor — inclusive legal.',
    text: 'Formalizar escolhas enquanto há plena autonomia protege toda a família. Não é sobre controlar o idoso — é sobre preservar sua autonomia por muito mais tempo, da maneira que ele mesmo escolheu.',
    image: '/pilar-saude.jpg',
    imageAlt: 'Idoso(a) assinando documento com familiar ao lado',
  },
  {
    icon: <Users size={32} strokeWidth={1.5} />,
    label: 'Rede de Apoio',
    title: 'Ninguém cuida sozinho.',
    text: 'Mapear quem faz parte da rede de cuidado — família, amigos, vizinhos, profissionais de saúde — faz toda a diferença em um momento de necessidade. O manual te ajuda a estruturar essa rede antes que ela seja urgente.',
    image: '/pilar-rede-apoio.png',
    imageAlt: 'Grupo familiar e profissional de saúde em ambiente acolhedor',
  },
]

interface PilarProps {
  label: string
  title: string
  text: string
  index: number
  image?: string
  imageAlt: string
  icon: ReactNode
}

function PilarSection({ label, title, text, index, image, imageAlt, icon }: PilarProps) {
  const isEven = index % 2 === 0
  return (
    <div style={{
      padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px)',
      background: isEven ? 'var(--color-cream)' : 'var(--color-cream)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 100px)', alignItems: 'center',
        direction: isEven ? 'ltr' : 'rtl',
      }} className="grid-pillar">
        <div style={{ direction: 'ltr' }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              marginBottom: 24,
            }}>
              <span style={{ color: 'var(--color-green)', opacity: 0.7 }}>{icon}</span>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
                letterSpacing: 3, textTransform: 'uppercase',
                color: 'var(--color-green)', opacity: 0.7,
              }}>{label}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 3.8vw, 52px)',
              fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.02em',
              color: 'var(--color-ink)', marginBottom: 28, maxWidth: 500,
            }}>{title}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{
              fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.75, color: 'var(--color-ink-sub)',
              maxWidth: 480, fontWeight: 400,
            }}>{text}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div style={{ direction: 'ltr' }}>
            <div style={{
              aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden',
              background: image ? 'none' : `linear-gradient(${135 + index * 30}deg, var(--color-green-muted), var(--color-cream-mid))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {image ? (
                <NextImage
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover', objectPosition: 'center',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 16, padding: 32, textAlign: 'center',
                }}>
                  <span style={{ color: 'var(--color-green)', opacity: 0.25 }}>
                    {icon}
                  </span>
                  <p style={{
                    fontSize: 13, color: 'var(--color-ink-muted)', opacity: 0.6,
                    fontStyle: 'italic', maxWidth: 240, lineHeight: 1.5,
                  }}>{imageAlt}</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export function Pilares() {
  return (
    <div id="metodo" style={{ scrollMarginTop: 72 }}>
      {pilaresData.map((p, i) => (
        <PilarSection key={i} index={i} {...p} />
      ))}
    </div>
  )
}
