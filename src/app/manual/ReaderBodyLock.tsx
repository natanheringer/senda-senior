'use client'

import { useEffect } from 'react'

/**
 * Aplica `body.reader-locked` enquanto o leitor está montado e o remove
 * ao desmontar — evita que o overflow:hidden "vaze" para outras rotas
 * quando o usuário navega via client-side transitions.
 */
export function ReaderBodyLock() {
  useEffect(() => {
    document.body.classList.add('reader-locked')
    return () => {
      document.body.classList.remove('reader-locked')
    }
  }, [])

  return null
}
