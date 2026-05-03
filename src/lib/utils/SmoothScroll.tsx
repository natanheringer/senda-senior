'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

/**
 * Wrapper Lenis com configuração padrão da marca:
 *   - lerp suave (0.1)
 *   - duração editorial (1.5s)
 *   - sensibilidade do scroll levemente acima do default
 *
 * Mantido em `lib/utils/` por ser cross-cutting (não pertence a
 * nenhuma feature específica).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2.2, wheelMultiplier: 0.85 }}>
      {children}
    </ReactLenis>
  )
}
