'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [hover, setHover] = useState(false)

  function handleLogout() {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.refresh()
      router.push('/login')
    })
  }

  return (
    <button
      id="dashboard-logout"
      onClick={handleLogout}
      disabled={isPending}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'rgba(185,28,28,0.15)' : 'rgba(185,28,28,0.08)',
        border: '1.5px solid',
        borderColor: hover ? '#B91C1C' : 'rgba(185,28,28,0.15)',
        borderRadius: 8,
        padding: '10px 20px',
        fontSize: 14,
        fontWeight: 600,
        color: '#B91C1C',
        cursor: isPending ? 'wait' : 'pointer',
        opacity: isPending ? 0.6 : 1,
        fontFamily: 'var(--font-sans)',
        transition: 'all 0.3s',
      }}
    >
      {isPending ? 'Saindo...' : 'Sair'}
    </button>
  )
}
