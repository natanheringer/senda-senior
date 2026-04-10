'use client'

import NextImage from 'next/image'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login')
    const router = useRouter()

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
                router.push('/dashboard')
            }
        } else if (mode === 'reset') {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            })
            if (error) {
                setError(error.message)
            } else {
                setSuccess('Email de recuperação enviado! Verifique sua caixa de entrada.')
                setTimeout(() => setMode('login'), 3000)
            }
        } else {
            const { error } = await supabase.auth.signUp({ email, password })
            if (error) {
                setError(error.message)
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
            {/* Left decorative panel */}
            <div className="auth-panel-left" style={{
                flex: '0 0 45%', position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: 'clamp(40px, 5vw, 80px)',
            }}>
                {/* Background image */}
                <NextImage
                    src="/login-panel.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    priority
                    sizes="45vw"
                    style={{
                        objectFit: 'cover', objectPosition: 'center',
                        display: 'block',
                    }}
                />
                {/* Green overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(30,74,59,0.82)',
                    pointerEvents: 'none',
                }} />
                {/* Grain texture */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                }} />
                {/* Bottom gradient for depth */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(160deg, transparent 30%, rgba(0,0,0,0.2) 100%)',
                    pointerEvents: 'none',
                }} />

                <div className="auth-panel-content" style={{ position: 'relative', zIndex: 1, maxWidth: 420 }}>
                    <a href="/" style={{
                        fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600,
                        color: 'white', textDecoration: 'none', display: 'inline-block',
                        marginBottom: 64, letterSpacing: '-0.02em',
                    }}>Send Senior</a>

                    <h2 style={{
                        fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 3.5vw, 48px)',
                        fontWeight: 600, lineHeight: 1.15, color: 'white',
                        letterSpacing: '-0.02em', marginBottom: 24,
                    }}>
                        Suas decisões.<br />Seu futuro.
                    </h2>
                    <p style={{
                        fontSize: 16, lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.6)', maxWidth: 340,
                    }}>
                        O ecossistema que organiza o jurídico, o financeiro e a saúde
                        da sua vida — com carinho, clareza e autonomia.
                    </p>

                    <div style={{
                        marginTop: 64, padding: '24px 28px',
                        background: 'rgba(255,255,255,0.08)', borderRadius: 14,
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                        <p style={{
                            fontFamily: 'var(--serif)', fontStyle: 'italic',
                            fontSize: 14, lineHeight: 1.65,
                            color: 'rgba(255,255,255,0.7)', marginBottom: 12,
                        }}>
                            "Organizei tudo com carinho. Meus filhos sabem que está tudo certo — e ficam tranquilos."
                        </p>
                        <span style={{
                            fontSize: 12, fontWeight: 600,
                            color: 'rgba(255,255,255,0.4)', letterSpacing: 1,
                        }}>HELENA SILVEIRA · 72 ANOS</span>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="auth-panel-right" style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(40px, 5vw, 80px)',
            }}>
                <div style={{ width: '100%', maxWidth: 400 }}>
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
                                type="email"
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
                                    e.currentTarget.style.borderColor = 'var(--green)'
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,95,79,0.1)'
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
                                    type="password"
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
                                        e.currentTarget.style.borderColor = 'var(--green)'
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,95,79,0.1)'
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
                                        fontSize: 15, color: 'var(--green)', fontWeight: 600,
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
                                background: loading ? 'var(--brown-light)' : 'var(--green)',
                                color: 'white', border: 'none', borderRadius: 10,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 16px rgba(45,95,79,0.2)',
                                letterSpacing: '0.01em',
                            }}
                            onMouseEnter={e => {
                                if (!loading) e.currentTarget.style.background = 'var(--green-dark)'
                            }}
                            onMouseLeave={e => {
                                if (!loading) e.currentTarget.style.background = 'var(--green)'
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
                                        color: 'var(--green)', fontWeight: 700, fontSize: 15,
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
                                        color: 'var(--green)', fontWeight: 700, fontSize: 15,
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
                        <a href="#" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Termos</a>
                        {' '}e{' '}
                        <a href="#" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Política de Privacidade</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}