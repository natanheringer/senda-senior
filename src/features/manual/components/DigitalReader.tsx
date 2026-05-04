'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X, Eye, EyeOff, Compass } from 'lucide-react'
import Link from 'next/link'
import { manualChapters } from '@/features/manual/data'

export interface DigitalReaderProps {
  initialChapterSlug: string
}

export function DigitalReader({ initialChapterSlug }: DigitalReaderProps) {
  const currentChapterIndex = manualChapters.findIndex((c) => c.slug === initialChapterSlug)
  const chapter = manualChapters[currentChapterIndex] || manualChapters[0]

  const [focusMode, setFocusMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--color-cream)' }}>

      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 340 : 0, opacity: sidebarOpen ? 1 : 0 }}
        style={{
           overflow: 'hidden', zIndex: 50, borderRight: '1px solid rgba(0,0,0,0.05)',
           background: 'rgba(254,252,249,0.7)', backdropFilter: 'blur(30px)',
        }}
      >
         <div style={{ padding: 32, width: 340, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--color-green)', marginBottom: 48, flexShrink: 0 }}>
               <Compass size={24} strokeWidth={1.5} />
               <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 20.7 }}>Senda Sênior</span>
            </Link>

            <p className="label-premium" style={{ color: 'var(--color-ink-muted)', marginBottom: 24, flexShrink: 0 }}>Índice Temático</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', paddingBottom: 64 }}>
               {manualChapters.map((ch) => (
                 <Link key={ch.slug} href={`/manual/${ch.slug}`} style={{ textDecoration: 'none' }}>
                   <motion.div
                     style={{
                       padding: '16px', borderRadius: 12,
                       background: ch.slug === chapter.slug ? 'var(--color-green)' : 'transparent',
                       color: ch.slug === chapter.slug ? 'white' : 'var(--color-ink-sub)',
                       fontWeight: ch.slug === chapter.slug ? 600 : 500, fontSize: 17.25, transition: 'all 0.2s',
                       border: ch.slug === chapter.slug ? 'none' : '1px solid transparent',
                       boxShadow: ch.slug === chapter.slug ? '0 8px 24px rgba(45,95,79,0.15)' : 'none',
                     }}
                     whileHover={{
                       background: ch.slug === chapter.slug ? 'var(--color-green)' : 'rgba(45,95,79,0.03)',
                       borderColor: ch.slug === chapter.slug ? 'transparent' : 'rgba(0,0,0,0.05)',
                     }}
                   >
                     {ch.title}
                   </motion.div>
                 </Link>
               ))}
            </div>
         </div>
      </motion.aside>

      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', height: '100vh', opacity: focusMode && sidebarOpen ? 0.3 : 1, transition: 'opacity 0.4s' }}>

        <motion.header
          animate={{ y: focusMode ? -100 : 0, opacity: focusMode ? 0 : 1 }}
          style={{
             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
             padding: '24px clamp(20px, 4vw, 40px)', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 40,
             background: 'linear-gradient(to bottom, var(--color-cream) 10%, transparent)',
             pointerEvents: focusMode ? 'none' : 'auto',
          }}
        >
           <button
             onClick={() => setSidebarOpen(!sidebarOpen)}
             style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'white', border: '1px solid rgba(0,0,0,0.05)', padding: '12px 24px', borderRadius: 30, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', color: 'var(--color-ink)', fontWeight: 600, transition: 'all 0.2s' }}
           >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              {sidebarOpen ? 'Fechar Índice' : 'Sumário Completo'}
           </button>

           <button
             onClick={() => { setFocusMode(true); setSidebarOpen(false) }}
             style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--color-green)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 30, cursor: 'pointer', boxShadow: '0 8px 24px rgba(45,95,79,0.2)', fontWeight: 600, transition: 'all 0.2s' }}
           >
              <EyeOff size={18} />
              Modo Foco
           </button>
        </motion.header>

        <motion.div
           style={{ position: 'fixed', top: 0, left: sidebarOpen ? 340 : 0, right: 0, height: 4, background: 'var(--color-terracotta)', scaleX, originX: 0, zIndex: 100, transition: 'left 0.3s' }}
        />

        <div ref={containerRef} style={{ flex: 1, overflowY: 'auto', padding: '160px clamp(20px, 4vw, 40px) 120px', scrollBehavior: 'smooth' }}>

           <AnimatePresence>
             {focusMode && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setFocusMode(false)}
                  style={{ position: 'fixed', bottom: 40, right: 40, background: 'white', color: 'var(--color-green)', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 16px 48px rgba(0,0,0,0.1)', zIndex: 60 }}
                >
                   <Eye size={24} />
                </motion.button>
             )}
           </AnimatePresence>

           <article style={{ maxWidth: 740, margin: '0 auto', opacity: sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 1000 ? 0.3 : 1, transition: 'opacity 0.3s' }} onClick={() => sidebarOpen && window.innerWidth < 1000 && setSidebarOpen(false)}>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <p className="label-premium" style={{ marginBottom: 20 }}>{chapter.subtitle}</p>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, color: 'var(--color-ink)', lineHeight: 1.05, marginBottom: 0, letterSpacing: '-0.02em' }}>{chapter.title}</h1>
                <div className="line-terracota" style={{ marginBottom: 80 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                   {chapter.content.map((paragraph, idx) => {
                     const isHighlight = paragraph.startsWith('### ')
                     if (isHighlight) {
                       return (
                         <motion.h2
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-20% 0px' }}
                            style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--color-green)', fontWeight: 600, marginTop: 48, paddingBottom: 16, borderBottom: '1.5px solid rgba(45,95,79,0.15)' }}
                         >
                            {paragraph.replace('### ', '')}
                         </motion.h2>
                       )
                     }

                     const isImportant = paragraph.startsWith('**')
                     const isBullet = paragraph.startsWith('•')

                     return (
                       <motion.p
                         key={idx}
                         initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }}
                         style={{
                            fontSize: 24.15, lineHeight: 1.85, color: isImportant ? 'var(--color-ink)' : 'rgba(42,37,41,0.88)',
                            fontWeight: isImportant ? 500 : 400,
                            paddingLeft: isBullet ? 24 : 0,
                            background: isImportant ? 'white' : 'transparent',
                            padding: isImportant ? '32px 40px' : (isBullet ? '0 0 0 24px' : '0'),
                            borderRadius: isImportant ? 16 : 0,
                            boxShadow: isImportant ? '0 12px 48px rgba(0,0,0,0.03)' : 'none',
                            border: isImportant ? '1px solid rgba(0,0,0,0.04)' : 'none',
                         }}
                         >
                          {paragraph.split(/\*\*(.*?)\*\*/g).map((part, pi) =>
                            pi % 2 === 1 ? <strong key={pi}>{part}</strong> : part,
                          )}
                        </motion.p>
                     )
                   })}
                </div>
              </motion.div>

              <div style={{ marginTop: 120, paddingTop: 64, borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', gap: 24, flexDirection: 'row' }}>
                 {currentChapterIndex > 0 ? (
                    <Link href={`/manual/${manualChapters[currentChapterIndex - 1].slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, padding: 32, background: 'rgba(0,0,0,0.02)', borderRadius: 12 }}>
                       <span className="label-premium" style={{ color: 'var(--color-ink-muted)' }}>Capítulo Anterior</span>
                       <span style={{ fontFamily: 'var(--font-serif)', fontSize: 27.6, color: 'var(--color-ink)', fontWeight: 500 }}>{manualChapters[currentChapterIndex - 1].title}</span>
                    </Link>
                 ) : <div style={{ flex: 1 }} />}

                 {currentChapterIndex < manualChapters.length - 1 ? (
                    <Link href={`/manual/${manualChapters[currentChapterIndex + 1].slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, padding: 32, background: 'var(--color-green)', borderRadius: 12, textAlign: 'right' }}>
                       <span className="label-premium" style={{ color: 'rgba(255,255,255,0.6)' }}>Próxima Etapa</span>
                       <span style={{ fontFamily: 'var(--font-serif)', fontSize: 27.6, color: 'white', fontWeight: 500 }}>{manualChapters[currentChapterIndex + 1].title}</span>
                    </Link>
                 ) : <div style={{ flex: 1 }} />}
              </div>
           </article>
        </div>
      </div>
    </div>
  )
}
