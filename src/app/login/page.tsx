'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { AuthBrandPanel } from '@/features/auth'

function safePostAuthPath(): string {
  const p = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)
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
            // Erro vindo de ?error= (callback Supabase); precisa de efeito porque a URL só existe no cliente.
            // eslint-disable-next-line react-hooks/set-state-in-effect -- sync one-time from query into form state
            setError(decodeURIComponent(e).replaceAll('+', ' '))
            window.history.replaceState(null, '', '/login')
        }
    }, [])

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        if (mode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) {
                setError(error.message)
            } else {
                // Navegação completa: garante que os cookies de sessão vão no próximo
                // request; `router.push` (SPA) pode deixar o RSC do /dashboard sem sessão.
                window.location.assign(safePostAuthPath())
                return
            }
        } else if (mode === 'reset') {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: authCallbackUrl('/update-password'),
            })
            if (error) {
                setError(error.message)
            } else {
                setSuccess('Email de recuperação enviado! Verifique sua caixa de entrada.')
                setTimeout(() => setMode('login'), 3000)
            }
        } else {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: authCallbackUrl('/dashboard'),
                },
            })
            if (error) {
                setError(error.message)
            } else if (data.session) {
                window.location.assign(safePostAuthPath())
                return
            } else {
                setSuccess('Conta criada! Verifique seu email para confirmar.')
                setTimeout(() => setMode('login'), 3000)
            }
        }

        setLoading(false)
    }

    const titles: Record<string, string> = {
        login: 'Bem-vindo de volta.',
        register: 'Crie sua conta.',
        reset: 'Recuperar senha.',
    }
    const subtitles: Record<string, string> = {
        login: 'Entre para continuar organizando o que importa.',
        register: 'Comece a organizar sua vida — no seu tempo.',
        reset: 'Enviaremos um link para seu email.',
    }
    const buttonLabels: Record<string, string> = {
        login: 'Entrar',
        register: 'Criar conta',
        reset: 'Enviar link',
    }

    return (
        <div className="auth-wrapper" style={{
            minHeight: '100vh', display: 'flex',
            background: 'var(--cream)',
        }}>
            <AuthBrandPanel
                photoSrc="/brand/photos/prancheta-7.png"
                objectPosition="20% 42%"
            >
                <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 48 }}>
                    <NextImage
                        src="/brand/logo-14.png"
                        alt="Senda Sênior"
                        width={280}
                        height={98}
                        priority
                        style={{
                            height: 44,
                            width: 'auto',
                            objectFit: 'contain',
                            filter: 'brightness(0) invert(1)',
                        }}
                    />
                </Link>

                <h2 style={{
                    fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 3.5vw, 48px)',
                    fontWeight: 600, lineHeight: 1.15, color: 'white',
                    letterSpacing: '-0.02em', marginBottom: 24,
                }}>
                    Suas decisões.<br />Seu futuro.
                </h2>
                <p style={{
                    fontSize: 16, lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.72)', maxWidth: 340,
                }}>
                    O ecossistema que organiza o jurídico, o financeiro e a saúde
                    da sua vida — com carinho, clareza e autonomia.
                </p>

                <div style={{
                    marginTop: 48, padding: '24px 28px',
                    background: 'rgba(255,255,255,0.1)', borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.12)',
                }}>
                    <p style={{
                        fontFamily: 'var(--serif)', fontStyle: 'italic',
                        fontSize: 15, lineHeight: 1.65,
                        color: 'rgba(255,255,255,0.78)', marginBottom: 12,
                    }}>
                        &ldquo;Organizei tudo com carinho. Meus filhos sabem que está tudo certo — e ficam tranquilos.&rdquo;
                    </p>
                    <span style={{
                        fontSize: 12, fontWeight: 600,
                        color: 'rgba(255,255,255,0.45)', letterSpacing: 1,
                    }}>HELENA SILVEIRA · 72 ANOS</span>
                </div>
            </AuthBrandPanel>

            {/* Painel do formulário — textura leve (caminho + estrelas) */}
            <div className="auth-panel-right" style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(40px, 5vw, 80px)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div
                    aria-hidden
                    style={{
                        position: 'absolute', inset: 0,
                        opacity: 0.07,
                        backgroundImage: "url('/brand/pattern-caminho-greenmono-claro.png')",
                        backgroundSize: '720px auto',
                        backgroundRepeat: 'repeat',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    aria-hidden
                    style={{
                        position: 'absolute',
                        top: '-5%',
                        right: '-8%',
                        width: 'min(55vw, 320px)',
                        height: 'min(55vw, 320px)',
                        opacity: 0.16,
                        backgroundImage: "url('/brand/star-scatter-decoration.jpg')",
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top right',
                        pointerEvents: 'none',
                    }}
                />
                <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
                    <img
                        src="/brand/icons/heart-hand-outline-18.svg"
                        alt=""
                        width={22}
                        height={22}
                        style={{ display: 'block', marginBottom: 14, opacity: 0.45 }}
                    />
                    <h1 style={{
                        fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3vw, 38px)',
                        fontWeight: 600, letterSpacing: '-0.02em',
                        color: 'var(--text)', marginBottom: 8,
                    }}>
                        {titles[mode]}
                    </h1>
                    <p style={{
                        fontSize: 16, color: 'var(--brown-light)',
                        marginBottom: 40, lineHeight: 1.6, fontWeight: 500,
                    }}>
                        {subtitles[mode]}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{
                                display: 'block', fontSize: 15, fontWeight: 600,
                                color: 'var(--text-sub)', marginBottom: 8,
                                letterSpacing: '0.02em',
                            }}>Email</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%', padding: '14px 16px',
                                    fontSize: 15, fontFamily: 'var(--sans)',
                                    border: '1.5px solid var(--cream-mid)',
                                    borderRadius: 10, background: 'var(--warm-white)',
                                    color: 'var(--text)', outline: 'none',
                                    transition: 'border-color 0.3s, box-shadow 0.3s',
                                }}
                                onFocus={e => {
                                    e.currentTarget.style.borderColor = 'var(--terracotta)'
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(181,114,74,0.15)'
                                }}
                                onBlur={e => {
                                    e.currentTarget.style.borderColor = 'var(--cream-mid)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            />
                        </div>

                        {mode !== 'reset' && (
                            <div style={{ marginBottom: 8 }}>
                                <label style={{
                                    display: 'block', fontSize: 13, fontWeight: 600,
                                    color: 'var(--text-sub)', marginBottom: 8,
                                    letterSpacing: '0.02em',
                                }}>Senha</label>
                                <input
                                    id="login-password"
                                    name="password"
                                    type="password"
                                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    style={{
                                        width: '100%', padding: '16px 18px',
                                        fontSize: 16, fontFamily: 'var(--sans)',
                                        border: '1.5px solid var(--cream-mid)',
                                        borderRadius: 10, background: 'var(--warm-white)',
                                        color: 'var(--text)', outline: 'none',
                                        transition: 'border-color 0.3s, box-shadow 0.3s',
                                    }}
                                    onFocus={e => {
                                        e.currentTarget.style.borderColor = 'var(--terracotta)'
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(181,114,74,0.15)'
                                    }}
                                    onBlur={e => {
                                        e.currentTarget.style.borderColor = 'var(--cream-mid)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                />
                            </div>
                        )}

                        {mode === 'login' && (
                            <div style={{ textAlign: 'right', marginBottom: 24 }}>
                                <button
                                    type="button"
                                    onClick={() => { setMode('reset'); setError(''); setSuccess('') }}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontSize: 15, color: 'var(--terracotta)', fontWeight: 600,
                                        fontFamily: 'var(--sans)', textDecoration: 'underline',
                                    }}
                                >Esqueceu a senha?</button>
                            </div>
                        )}

                        {mode !== 'login' && <div style={{ height: 16 }} />}

                        {error && (
                            <div style={{
                                padding: '12px 16px', borderRadius: 10, marginBottom: 20,
                                background: '#FEF2F2', border: '1px solid #FECACA',
                                fontSize: 15, color: '#B91C1C', lineHeight: 1.5,
                            }}>{error}</div>
                        )}

                        {success && (
                            <div style={{
                                padding: '12px 16px', borderRadius: 10, marginBottom: 20,
                                background: 'var(--green-muted)', border: '1px solid var(--green-light)',
                                fontSize: 15, color: 'var(--green-dark)', lineHeight: 1.5,
                            }}>{success}</div>
                        )}

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '18px 24px',
                                fontSize: 16, fontWeight: 600, fontFamily: 'var(--sans)',
                                background: loading ? 'var(--terracotta-light)' : 'var(--terracotta)',
                                color: 'white', border: 'none', borderRadius: 10,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 20px rgba(181,114,74,0.28)',
                                letterSpacing: '0.01em',
                            }}
                            onMouseEnter={e => {
                                if (!loading) e.currentTarget.style.background = 'var(--terracotta-dark)'
                            }}
                            onMouseLeave={e => {
                                if (!loading) e.currentTarget.style.background = 'var(--terracotta)'
                            }}
                        >
                            {loading ? 'Aguarde...' : buttonLabels[mode]}
                        </button>
                    </form>

                    <div style={{
                        marginTop: 32, textAlign: 'center',
                        fontSize: 15, color: 'var(--text-muted)',
                    }}>
                        {mode === 'login' ? (
                            <>
                                Não tem conta?{' '}
                                <button
                                    onClick={() => { setMode('register'); setError(''); setSuccess('') }}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: 'var(--terracotta)', fontWeight: 700, fontSize: 15,
                                        fontFamily: 'var(--sans)', textDecoration: 'underline',
                                    }}
                                >Criar uma</button>
                            </>
                        ) : (
                            <>
                                Já tem conta?{' '}
                                <button
                                    onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: 'var(--terracotta)', fontWeight: 700, fontSize: 15,
                                        fontFamily: 'var(--sans)', textDecoration: 'underline',
                                    }}
                                >Entrar</button>
                            </>
                        )}
                    </div>

                    <p style={{
                        marginTop: 48, fontSize: 13, textAlign: 'center',
                        color: 'var(--text-muted)', lineHeight: 1.6,
                    }}>
                        Ao continuar, você concorda com nossos{' '}
                        <a href="#" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>Termos</a>
                        {' '}e{' '}
                        <a href="#" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>Política de Privacidade</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}

