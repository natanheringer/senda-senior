'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Lock, ShieldCheck, KeyRound, CheckCircle } from 'lucide-react'

// função para atualizar a senha do usuário
export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const router = useRouter()

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
            setTimeout(() => router.push('/dashboard'), 2000)
        }
    }

    return (
        <div className="auth-wrapper" style={{
            minHeight: '100vh', display: 'flex',
            background: 'var(--cream)',
        }}>
            {/* Painel Decorativo Esquerdo */}
            <div className="auth-panel-left" style={{
                flex: '0 0 45%', position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: 'clamp(40px, 5vw, 80px)',
            }}>
                {/* Imagem de fundo... */}
                <Image
                    src="/password-panel.png"
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
                {/* Overlay verde */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(30,74,59,0.82)',
                    pointerEvents: 'none',
                }} />
                {/* Textura granulada */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                }} />
                {/* Gradiente inferior para profundidade */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(160deg, transparent 30%, rgba(0,0,0,0.2) 100%)',
                    pointerEvents: 'none',
                }} />

                {/* div com o texto do painel */}
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
                        Sua segurança<br />é prioridade.
                    </h2>
                    <p style={{
                        fontSize: 16, lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.6)', maxWidth: 340,
                    }}>
                        Use uma senha forte e única. Recomendamos combinar letras maiúsculas,
                        minúsculas, números e símbolos.
                    </p>

                    <div style={{
                        marginTop: 64, display: 'flex', flexDirection: 'column', gap: 16,
                    }}>
                        {[
                            { icon: <Lock size={16} strokeWidth={1.8} />, text: 'Criptografia ponta a ponta' },
                            { icon: <ShieldCheck size={16} strokeWidth={1.8} />, text: 'Conformidade com LGPD' },
                            { icon: <KeyRound size={16} strokeWidth={1.8} />, text: 'Seus dados, suas regras' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '12px 16px', borderRadius: 10,
                                background: 'rgba(255,255,255,0.06)',
                            }}>
                                <span style={{
                                    fontSize: 16, color: 'rgba(255,255,255,0.5)',
                                }}>{item.icon}</span>
                                <span style={{
                                    fontSize: 15, color: 'rgba(255,255,255,0.65)', fontWeight: 500,
                                }}>{item.text}</span>
                            </div>
                        ))}
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

                                <div style={{ marginBottom: 28 }}>
                                    <label style={{
                                        display: 'block', fontSize: 15, fontWeight: 600,
                                        color: 'var(--text-sub)', marginBottom: 8,
                                        letterSpacing: '0.02em',
                                    }}>Confirmar senha</label>
                                    <input
                                        id="confirm-password"
                                        type="password"
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
                                            e.currentTarget.style.borderColor = 'var(--green)'
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,95,79,0.1)'
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
                                    {loading ? 'Aguarde...' : 'Atualizar senha'}
                                </button>
                            </form>

                            <div style={{
                                marginTop: 32, textAlign: 'center',
                            }}>
                                <a href="/login" style={{
                                    fontSize: 15, color: 'var(--green)', fontWeight: 600,
                                    textDecoration: 'underline',
                                }}>← Voltar para o login</a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}