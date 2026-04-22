'use client'

import { useEffect, useRef } from 'react'

/**
 * Parallax leve vinculado ao scroll do viewport. Aplica translateY
 * proporcional ao deslocamento vertical do elemento em relação ao
 * centro da tela. Mantenha `speed` baixo (0.03–0.1) — o guia §6 pede
 * movimento sutil.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.08) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handle = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translateY(${center * speed}px)`
    }

    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [speed])

  return ref
}
