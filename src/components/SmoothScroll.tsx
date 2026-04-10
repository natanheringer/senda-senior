'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, wheelMultiplier: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
