import { ReactNode } from 'react'

export const metadata = {
  title: 'Manual Prevent Care - Leitura Interativa',
  description: 'Acesse os capítulos do E-book de maneira fluida e dinâmica, sem distrações com nosso Modo Foco.',
}

export default function ManualLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
         body { overflow: hidden; } /* Para que a rolagem aconteça somente dentro do leitor do framer motion, sem barras duplas do lenis caso conflitem. O Lenis roda global, mas aqui seguramos a tela na div base. */
      `}</style>
      <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex' }}>
         {children}
      </div>
    </>
  )
}
