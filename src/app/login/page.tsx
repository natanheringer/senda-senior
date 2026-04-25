'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { AuthBrandPanel, AuthFormPanel } from '@/features/auth'
import { Button, Field } from '@/design'

function safePostAuthPath(): string {
  const p = new URLSearchParams(
    typeof window === 'undefined' ? '' : window.location.search,
  )
  const next = p.get('next')
  if (next && next.startsWith('/') && !next.startsWith('//')) {
    return next
  }
  return '/dashboard'
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login')
  const supabase = useMemo(() => createBrowserClient(), [])

  const authCallbackUrl = (nextPath: string) => {
    if (typeof window === 'undefined') return ''
    const next = nextPath.startsWith('/') ? nextPath : `/${nextPath}`
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
  }

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const e = p.get('error')
    if (e) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from callback querystring
      setError(decodeURIComponent(e).replaceAll('+', ' '))
      window.history.replaceState(null, '', '/login')
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        setError(signInError.message)
      } else {
        window.location.assign(safePostAuthPath())
        return
      }
    } else if (mode === 'reset') {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: authCallbackUrl('/update-password'),
        },
      )
      if (resetError) {
        setError(resetError.message)
      } else {
        setSuccess(
          'Email de recuperação enviado. Verifique sua caixa de entrada.',
        )
        window.setTimeout(() => setMode('login'), 3000)
      }
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: authCallbackUrl('/dashboard'),
        },
      })
      if (signUpError) {
        setError(signUpError.message)
      } else if (data.session) {
        window.location.assign(safePostAuthPath())
        return
      } else {
        setSuccess('Conta criada. Verifique seu email para confirmar.')
        window.setTimeout(() => setMode('login'), 3000)
      }
    }

    setLoading(false)
  }

  const titles = {
    login: 'Bem-vindo de volta.',
    register: 'Crie sua conta.',
    reset: 'Recuperar senha.',
  } as const

  const subtitles = {
    login: 'Entre para continuar organizando o que importa.',
    register: 'Comece a organizar sua vida no seu tempo.',
    reset: 'Enviaremos um link para seu email.',
  } as const

  const buttonLabels = {
    login: 'Entrar',
    register: 'Criar conta',
    reset: 'Enviar link',
  } as const

  return (
    <div className="auth-wrapper flex min-h-screen bg-cream">
      <AuthBrandPanel
        photoSrc="/brand/photos/prancheta-7.png"
        objectPosition="20% 42%"
      >
        <Link href="/" className="mb-12 inline-block no-underline">
          <NextImage
            src="/brand/logo-14.png"
            alt="Senda Sênior"
            width={280}
            height={98}
            priority
            className="h-11 w-auto object-contain [filter:brightness(0)_invert(1)]"
          />
        </Link>

        <h2 className="mb-6 font-serif text-[clamp(32px,3.5vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
          Suas decisões.
          <br />
          Seu futuro.
        </h2>
        <p className="max-w-[340px] text-base leading-[1.7] text-white/70">
          O ecossistema que organiza o jurídico, o financeiro e a saúde da sua
          vida com carinho, clareza e autonomia.
        </p>

        <div className="mt-12 rounded-[14px] border border-white/12 bg-white/10 px-7 py-6">
          <p className="mb-3 font-serif text-[15px] italic leading-[1.65] text-white/80">
            &ldquo;Organizei tudo com carinho. Meus filhos sabem que está tudo
            certo e ficam tranquilos.&rdquo;
          </p>
          <span className="text-xs font-semibold tracking-[0.08em] text-white/45">
            HELENA SILVEIRA · 72 ANOS
          </span>
        </div>
      </AuthBrandPanel>

      <AuthFormPanel>
        <NextImage
          src="/brand/icons/heart-hand-outline-18.svg"
          alt=""
          width={22}
          height={22}
          className="mb-3.5 block opacity-45"
        />

        <h1 className="mb-2 font-serif text-[clamp(28px,3vw,38px)] font-semibold tracking-[-0.02em] text-ink">
          {titles[mode]}
        </h1>
        <p className="mb-10 text-base font-medium leading-[1.6] text-terracotta-light">
          {subtitles[mode]}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {mode !== 'reset' && (
            <Field
              id="login-password"
              name="password"
              type="password"
              autoComplete={
                mode === 'register' ? 'new-password' : 'current-password'
              }
              placeholder="Mínimo 6 caracteres"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mb-2"
            />
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setMode('reset')
                  setError('')
                  setSuccess('')
                }}
                className="text-[15px] font-semibold text-terracotta underline underline-offset-2"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          {error && (
            <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[15px] leading-[1.5] text-[#B91C1C]">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-[10px] border border-green-light bg-green-muted px-4 py-3 text-[15px] leading-[1.5] text-green-dark">
              {success}
            </div>
          )}

          <Button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Aguarde...' : buttonLabels[mode]}
          </Button>
        </form>

        <div className="mt-8 text-center text-[15px] text-ink-muted">
          {mode === 'login' ? (
            <>
              Não tem conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register')
                  setError('')
                  setSuccess('')
                }}
                className="font-bold text-terracotta underline underline-offset-2"
              >
                Criar uma
              </button>
            </>
          ) : (
            <>
              Já tem conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setError('')
                  setSuccess('')
                }}
                className="font-bold text-terracotta underline underline-offset-2"
              >
                Entrar
              </button>
            </>
          )}
        </div>

        <p className="mt-12 text-center text-[13px] leading-[1.6] text-ink-muted">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="text-terracotta underline underline-offset-2">
            Termos
          </a>{' '}
          e{' '}
          <a href="#" className="text-terracotta underline underline-offset-2">
            Política de Privacidade
          </a>
          .
        </p>
      </AuthFormPanel>
    </div>
  )
}
