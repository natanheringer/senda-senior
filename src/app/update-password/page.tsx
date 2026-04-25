'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { AuthBrandPanel } from '@/features/auth'
import { Lock, ShieldCheck, KeyRound, CheckCircle } from 'lucide-react'

// função para atualizar a senha do usuário
export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const supabase = useMemo(() => createBrowserClient(), [])

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        setError('')

        if (password !== confirm) {
            setError('As senhas não coincidem.')
            return
        }

        setLoading(true)

        const { error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setTimeout(() => {
                window.location.assign('/dashboard')
            }, 2000)
        }
    }

    return (
        <div className="auth-wrapper" style={{
            minHeight: '100vh', display: 'flex',
            background: 'var(--cream)',
        }}>
            <AuthBrandPanel
                photoSrc="/brand/card-elder-window.png"
                objectPosition="28% 38%"
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
                    Sua segurança<br />é prioridade.
                </h2>
                <p style={{
                    fontSize: 16, lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.72)', maxWidth: 340,
                }}>
                    Use uma senha forte e única. Recomendamos combinar letras maiúsculas,
                    minúsculas, números e símbolos.
                </p>

                <div style={{
                    marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16,
                }}>
                    {[
                        { icon: <Lock size={16} strokeWidth={1.8} />, text: 'Criptografia ponta a ponta' },
                        { icon: <ShieldCheck size={16} strokeWidth={1.8} />, text: 'Conformidade com LGPD' },
                        { icon: <KeyRound size={16} strokeWidth={1.8} />, text: 'Seus dados, suas regras' },
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '12px 16px', borderRadius: 10,
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <span style={{
                                fontSize: 16, color: 'rgba(255,255,255,0.55)',
                            }}>{item.icon}</span>
                            <span style={{
                                fontSize: 15, color: 'rgba(255,255,255,0.78)', fontWeight: 500,
                            }}>{item.text}</span>
                        </div>
                    ))}
                </div>
            </AuthBrandPanel>

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
                    {success ? (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: '50%',
                                background: 'var(--green-muted)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: 28, margin: '0 auto 24px',
                            }}><CheckCircle size={28} strokeWidth={2} /></div>
                            <h1 style={{
                                fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 600,
                                color: 'var(--text)', marginBottom: 12,
                            }}>Senha atualizada!</h1>
                            <p style={{
                                fontSize: 15, color: 'var(--brown-light)', lineHeight: 1.6,
                            }}>Redirecionando para o painel...</p>
                        </div>
                    ) : (
                        <>
                            <div style={{
                                width: 52, height: 52, borderRadius: 14,
                                background: 'var(--green-muted)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: 24, marginBottom: 28,
                            }}><KeyRound size={24} strokeWidth={1.5} /></div>
                            <h1 style={{
                                fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3vw, 38px)',
                                fontWeight: 600, letterSpacing: '-0.02em',
                                color: 'var(--text)', marginBottom: 8,
                            }}>Nova senha</h1>
                            <p style={{
                                fontSize: 16, color: 'var(--brown-light)',
                                marginBottom: 40, lineHeight: 1.6, fontWeight: 500,
                            }}>
                                Escolha uma senha segura para sua conta.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{
                                        display: 'block', fontSize: 15, fontWeight: 600,
                                        color: 'var(--text-sub)', marginBottom: 8,
                                        letterSpacing: '0.02em',
                                    }}>Nova senha</label>
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        type="password"
                                        autoComplete="new-password"
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

                                <div style={{ marginBottom: 28 }}>
                                    <label style={{
                                        display: 'block', fontSize: 15, fontWeight: 600,
                                        color: 'var(--text-sub)', marginBottom: 8,
                                        letterSpacing: '0.02em',
                                    }}>Confirmar senha</label>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Repita a senha"
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
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

                                {error && (
                                    <div style={{
                                        padding: '12px 16px', borderRadius: 10, marginBottom: 20,
                                        background: '#FEF2F2', border: '1px solid #FECACA',
                                        fontSize: 15, color: '#B91C1C', lineHeight: 1.5,
                                    }}>{error}</div>
                                )}

                                <button
                                    id="update-password-submit"
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
                                    {loading ? 'Aguarde...' : 'Atualizar senha'}
                                </button>
                            </form>

                            <div style={{
                                marginTop: 32, textAlign: 'center',
                            }}>
                                <Link href="/login" style={{
                                    fontSize: 15, color: 'var(--terracotta)', fontWeight: 600,
                                    textDecoration: 'underline',
                                }}>← Voltar para o login</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

