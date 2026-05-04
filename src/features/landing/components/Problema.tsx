'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { BrandStar } from '@/features/landing/shared/BrandStar'
import { SCurveFragment } from '@/features/landing/shared/BrandDecorative'

const ITEMS = [
  {
    t: 'Informações espalhadas',
    d: 'Exames em uma gaveta, receitas em outra, contatos no celular de alguém. Na hora que importa, ninguém sabe onde está o que precisa.',
  },
  {
    t: 'Vontades não registradas',
    d: 'Quando não se conversa com calma, as decisões acabam sendo tomadas por quem está mais perto — e nem sempre da forma que a pessoa gostaria.',
  },
  {
    t: 'Um filho carrega tudo',
    d: 'Naturalmente, a responsabilidade recai sobre quem mora mais perto ou quem "sempre resolve". Com o tempo, isso esgota.',
  },
  {
    t: 'Cada um puxa para um lado',
    d: 'Sem um combinado prévio, irmãos discordam sobre o melhor caminho. Não por falta de amor, mas por falta de alinhamento.',
  },
]

export function Problema() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="problema" style={{
      padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 60px)',
      background: 'var(--color-green)', position: 'relative', overflow: 'hidden',
    }}>
      {/* S-curve decorativa grande — elemento da marca (design folder) */}
      <div style={{ position: 'absolute', top: '8%', left: '-12%', width: 'clamp(500px, 70vw, 900px)', zIndex: 0, opacity: 0.08, pointerEvents: 'none' }}>
        <SCurveFragment color="var(--color-cream)" />
      </div>
      <div style={{ position: 'absolute', bottom: '15%', right: '5%', zIndex: 0, opacity: 0.04 }}>
        <BrandStar size={200} color="var(--color-cream)" />
      </div>

      {/* Padrão caminho — S serpentino (identidade da marca) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.14,
          backgroundImage: "url('/brand/pattern-caminho-greenmono-dark.png')",
          backgroundSize: '960px auto',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: 64, alignItems: 'start' }} className="grid-pillar">
          <div style={{ position: 'sticky', top: 120 }}>
             <p className="label-premium" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>Visão a longo prazo</p>
             <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 500, lineHeight: 1.1, color: 'white', letterSpacing: '-0.02em', marginBottom: 0 }}>
               Sem roteiro, o cuidado se torna improviso.
             </h2>
             <div className="line-terracota" style={{ backgroundColor: 'var(--color-terracotta)' }} />
             <p style={{ fontSize: 'clamp(20.7px, 2.3vw, 25.3px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.78)', fontWeight: 400 }}>
               O papel de cuidador chega aos poucos, quase sem aviso. Quando a família não tem onde centralizar informações e combinar decisões, o desgaste se acumula em silêncio.
             </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: '20vh', paddingBottom: '20vh' }}>
            {ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35, margin: '-10% 0px -10% 0px' }}
                transition={{
                  duration: reducedMotion ? 0.25 : 0.62,
                  delay: reducedMotion ? 0 : i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  willChange: 'transform, opacity',
                  padding: '48px 0',
                  borderBottom: i < ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  position: 'relative',
                }}
              >
                  {/* Estrela decorativa por item */}
                  <div style={{ position: 'absolute', top: 24, right: 0, opacity: 0.06 }}>
                    <BrandStar size={80 + i * 20} color="white" />
                  </div>
                  <span style={{ position: 'absolute', top: 20, right: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(80px, 10vw, 140px)', fontWeight: 600, color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>0{i + 1}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'white', margin: '0 0 16px', lineHeight: 1.15, position: 'relative', zIndex: 1 }}>{item.t}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: 'clamp(19.55px, 2.07vw, 24.15px)', maxWidth: 480, position: 'relative', zIndex: 1 }}>{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
