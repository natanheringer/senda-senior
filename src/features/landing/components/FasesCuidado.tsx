'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { Reveal } from '@/design'
import { BrandStar } from '@/features/landing/shared/BrandStar'

const fases = [
  {
    numero: '01',
    titulo: 'Prevent Care',
    subtitulo: 'Diálogo e Estratégia',
    tema: 'var(--color-green)',
    resumo: 'O momento exato de organizar papéis, vontades e o ambiente.',
    texto:
      'Nesta fase, seus pais estão ativos e as conversas sobre amanhã parecem prematuras. Não são. É aqui que o controle da família é pleno para adaptar a casa e registrar vontades com inteligência, garantindo envelhecer com independência.',
    pattern: '/brand/pattern-estrela-greenmono-dark.png',
  },
  {
    numero: '02',
    titulo: 'Care',
    subtitulo: 'Manutenção e Transição',
    tema: 'var(--color-terracotta)',
    resumo: 'Pequenos declínios não precisam ser crises se há planejamento.',
    texto:
      'Pequenas perdas de autonomia surgem. Alguém já precisa acompanhar rotinas. Como prepararam a Fase 01, este momento acontece sem sustos. As adaptações do dia a dia obedecem ao que já foi combinado previamente, mantendo a paz em casa.',
    pattern: '/brand/pattern-caminho-greenmono-dark.png',
  },
  {
    numero: '03',
    titulo: 'Immediate Care',
    subtitulo: 'Decisões e Crises',
    tema: 'var(--color-ink)',
    resumo: 'Agindo na urgência suportados pela fundação que vocês criaram.',
    texto:
      'A dependência severa ou crise de saúde é irreversível. Todas as decisões são frágeis. Neste ponto, não estar organizado causa conflito na família. Com o Manual pronto, filhos não brigam por burocracia, dedicam-se apenas a dar amor ao invés de apagarem incêndios.',
    pattern: '/brand/pattern-abstrato-vt-escuro.png',
  },
]

export function FasesCuidado() {
  const [activeFase, setActiveFase] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()
  const springTransition = {
    type: 'spring' as const,
    stiffness: 220,
    damping: 26,
    mass: 0.9,
  }
  const cardTransition = reducedMotion
    ? { duration: 0.2 }
    : springTransition

  return (
    <section id="fases-cuidado" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--color-cream)', padding: '60px clamp(20px, 4vw, 60px) 40px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <BrandStar size={18} color="var(--color-terracotta)" />
            <BrandStar size={24} color="var(--color-gold)" />
            <BrandStar size={16} color="var(--color-gold-light)" />
            <p className="label-premium" style={{ marginLeft: 4, opacity: 0.85 }}>A Jornada Prevent Care</p>
          </div>
        </Reveal>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, color: 'var(--color-ink)', marginBottom: 0, letterSpacing: '-0.02em' }}>As 3 Fases do Cuidado</h2>
          <div className="line-terracota" style={{ margin: '24px auto 0' }} />
        </Reveal>
      </div>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
        {fases.map((item, i) => (
           <motion.div
             key={i} layoutId={`fase-card-${i}`} onClick={() => setActiveFase(i)}
             style={{
               flex: '1 1 300px',
               background: item.tema, padding: 'clamp(40px, 6vw, 80px) clamp(24px, 4vw, 64px)',
               cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 24,
               position: 'relative', overflow: 'hidden',
               borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
               willChange: 'transform, opacity',
             }}
             whileHover={reducedMotion ? undefined : { y: -4, scale: 1.01 }}
             transition={cardTransition}
           >
             {/* Padrão da marca — visível, não fantasma */}
             <div
               style={{
                 position: 'absolute',
                 inset: 0,
                 opacity: 0.18,
                 backgroundImage: `url('${item.pattern}')`,
                 backgroundSize: '600px auto',
                 backgroundRepeat: 'repeat',
                 mixBlendMode: 'overlay',
                 pointerEvents: 'none',
               }}
             />
             {/* Cluster de estrelas coloridas — canto superior direito */}
             <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', opacity: 0.55 }}>
               <div style={{ display: 'flex', gap: 4 }}>
                 <BrandStar size={18} color="var(--color-gold)" />
                 <BrandStar size={26} color="var(--color-cream)" />
               </div>
               <div style={{ display: 'flex', gap: 4 }}>
                 <BrandStar size={22} color="var(--color-gold-light)" />
                 <BrandStar size={16} color="var(--color-cream)" />
               </div>
             </div>

             <span style={{ position: 'absolute', top: -40, right: -20, fontFamily: 'var(--font-serif)', fontSize: 'clamp(180px, 20vw, 360px)', lineHeight: 0.8, fontWeight: 600, color: 'rgba(255,255,255,0.04)' }}>{item.numero}</span>
             <div style={{ position: 'relative', zIndex: 1 }}>
               <span className="label-premium" style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: 3, display: 'block', marginBottom: 24 }}>FASE {item.numero}</span>
               <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4vw, 64px)', color: 'white', fontWeight: 500, margin: '0 0 16px', lineHeight: 1.05 }}>{item.titulo}</h3>
               <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.5vw, 22px)', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', marginBottom: 32 }}>{item.subtitulo}</p>
               <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(18px, 1.2vw, 20px)', lineHeight: 1.6, fontWeight: 400 }}>{item.resumo}</p>
             </div>

             <div style={{ marginTop: 'auto', paddingTop: 64, display: 'flex', alignItems: 'center', gap: 10, color: 'white', fontSize: 13, fontWeight: 700, position: 'relative', zIndex: 1 }}>
                EXPANDIR FASE <ArrowRight size={16} />
             </div>
           </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeFase !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0.2 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vw, 60px)' }}
            onClick={() => setActiveFase(null)}
          >
            <motion.div
              layoutId={`fase-card-${activeFase}`}
              initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.99 }}
              transition={reducedMotion ? { duration: 0.2 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: fases[activeFase].tema, color: 'white',
                padding: 'clamp(40px, 8vw, 100px) clamp(32px, 6vw, 80px)',
                borderRadius: 24, maxWidth: 1200, width: '100%', minHeight: 'clamp(600px, 80vh, 900px)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.2)', cursor: 'default',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
                {/* Padrão da marca no modal expandido */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.06,
                    backgroundImage: `url('${fases[activeFase].pattern}')`,
                    backgroundSize: '800px auto',
                    backgroundRepeat: 'repeat',
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                  }}
                />
                {/* Estrela decorativa no modal */}
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', opacity: 0.04 }}>
                  <BrandStar size={600} color="white" />
                </div>

                <span style={{ position: 'absolute', top: -40, right: -20, fontFamily: 'var(--font-serif)', fontSize: 'clamp(300px, 35vw, 500px)', lineHeight: 0.8, fontWeight: 600, color: 'rgba(255,255,255,0.04)' }}>{fases[activeFase].numero}</span>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
                   <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'block' }}>Entendendo a Fase {fases[activeFase].numero}</span>
                   <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 80px)', color: 'white', fontWeight: 500, margin: '0 0 16px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>{fases[activeFase].titulo}</h3>
                   <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(20px, 2vw, 24px)', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginBottom: 56 }}>{fases[activeFase].subtitulo}</p>

                   <p style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', lineHeight: 1.6, color: 'white', fontWeight: 400, paddingBottom: 56 }}>{fases[activeFase].texto}</p>

                   <div style={{ marginTop: 'auto', paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                      <button onClick={() => setActiveFase(null)} style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', padding: '16px 0', fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10 }}>
                         <X size={20} /> Fechar
                      </button>

                      {activeFase < 2 && (
                         <button onClick={() => setActiveFase(activeFase + 1)} className="btn-white-lift-strong" style={{ background: 'white', color: fases[activeFase].tema, padding: '20px 40px', borderRadius: 12, fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', display: 'flex', alignItems: 'center', gap: 12 }}>
                            Explorar Fase {fases[activeFase + 1].numero} <ArrowRight size={20} />
                         </button>
                      )}
                   </div>
                </div>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  )
}
