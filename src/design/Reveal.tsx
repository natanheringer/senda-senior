'use client'

import type { ReactNode } from 'react'

/**
 * Scroll-reveal padrão da marca: fade + 24px de baixo para cima,
 * 800ms, ease editorial (guia §6). `delay` empilha para criar
 * cascata em listas de elementos.
 *
 *   <Reveal>...</Reveal>
 *   <Reveal delay={0.12}>...</Reveal>
 */

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
  className,
}: RevealProps) {
  return <div className={className}>{children}</div>
}
