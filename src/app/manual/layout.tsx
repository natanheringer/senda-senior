import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ReaderBodyLock } from './ReaderBodyLock'

export const metadata: Metadata = {
  title: 'Manual Prevent Care — Leitura Interativa',
  description:
    'Acesse os capítulos do Manual Prevent Care de maneira fluida e sem distrações, com Modo Foco.',
}

export default function ManualLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReaderBodyLock />
      <div
        style={{
          background: 'var(--color-cream)',
          minHeight: '100vh',
          display: 'flex',
        }}
      >
        {children}
      </div>
    </>
  )
}
