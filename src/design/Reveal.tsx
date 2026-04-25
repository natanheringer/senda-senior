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
  /**
   * `inview` (padrão): entra com scroll — ruim acima da dobra se o JS for bloqueado
   * ou o observer não dispare; o bloco fica com opacity:0.
   * `mount`: anima no mount; adequado a hero/headers — fica visível com ou sem
   * IntersectionObserver.
   */
  variant?: 'inview' | 'mount'
}

export function Reveal({
  children,
  delay = 0,
  className,
  distance = 18,
  variant = 'inview',
}: RevealProps) {
  const reducedMotion = useReducedMotion()

  const from = {
    opacity: 0,
    y: reducedMotion ? 0 : distance,
    scale: reducedMotion ? 1 : 0.985,
  }
  const to = { opacity: 1, y: 0, scale: 1 }
  const transition = {
    duration: reducedMotion ? 0.28 : 0.62,
    delay,
    ease: EASE_SENDA,
  } as const

  if (variant === 'mount') {
    return (
      <motion.div
        className={className}
        style={{ willChange: 'transform, opacity' }}
        initial={from}
        animate={to}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform, opacity' }}
      initial={from}
      whileInView={to}
      viewport={{ once: true, margin: '0px 0px -52px 0px', amount: 0.2 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
