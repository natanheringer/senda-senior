'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal padrão da marca: fade + 24px de baixo para cima,
 * 800ms, ease editorial (guia §6). `delay` empilha para criar
 * cascata em listas de elementos.
 *
 *   <Reveal>...</Reveal>
 *   <Reveal delay={0.12}>...</Reveal>
 */

const EASE_SENDA = [0.22, 1, 0.36, 1] as const

export interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  distance?: number
}

export function Reveal({
  children,
  delay = 0,
  className,
  distance = 18,
}: RevealProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform, opacity' }}
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : distance,
        scale: reducedMotion ? 1 : 0.985,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -52px 0px', amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0.28 : 0.62,
        delay,
        ease: EASE_SENDA,
      }}
    >
      {children}
    </motion.div>
  )
}
