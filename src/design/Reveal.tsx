'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal padrão da marca: fade + 24px de baixo para cima,
 * 800ms, ease editorial (guia §6). `delay` empilha para criar
 * cascata em listas de elementos.
 *
 *   <Reveal>...</Reveal>
 *   <Reveal delay={0.12}>...</Reveal>
 */

const EASE_SENDA = [0.25, 0.46, 0.45, 0.94] as const

export interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE_SENDA }}
    >
      {children}
    </motion.div>
  )
}
