'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { Scale, Heart, ShieldCheck, FilePlus, Stethoscope, UserPlus, Lock, Shield, ClipboardList, Sparkles } from 'lucide-react'
import { ChecklistGamificado } from '@/components/ChecklistGamificado'

// ─── Dashboard cards data ───
const pilares = [
    {
        icon: <Scale size={28} strokeWidth={1.5} />,
        label: 'Jurídico',
        title: 'Documentos e Procurações',
        desc: 'Testamento, diretivas antecipadas e procurações organizadas e seguras.',
        color: '#2D5F4F',
        bg: 'linear-gradient(135deg, #E8F0EB 0%, #D4E5DB 100%)',
    },
    {
        icon: <Heart size={28} strokeWidth={1.5} />,
        label: 'Saúde',
        title: 'Histórico Médico',
        desc: 'Exames, medicamentos e médicos centralizados — para você e quem você ama.',
        color: '#6B5B4E',
        bg: 'linear-gradient(135deg, #F5EFE6 0%, #EDE5D8 100%)',
    },
    {
        icon: <ShieldCheck size={28} strokeWidth={1.5} />,
        label: 'Proteção',
        title: 'Rede de Confiança',
        desc: 'Família, cuidadores e profissionais — com acesso controlado por você.',
        color: '#2D5F4F',
        bg: 'linear-gradient(135deg, #F0F5F2 0%, #E0EBE5 100%)',
    },
]

const acoes = [
    { icon: <FilePlus size={22} strokeWidth={1.5} />, title: 'Novo documento', desc: 'Adicionar procuração ou diretiva' },
    { icon: <Stethoscope size={22} strokeWidth={1.5} />, title: 'Registrar consulta', desc: 'Adicionar exame ou consulta' },
    { icon: <UserPlus size={22} strokeWidth={1.5} />, title: 'Convidar pessoa', desc: 'Adicionar à rede de confiança' },
    { icon: <Lock size={22} strokeWidth={1.5} />, title: 'Configurar acessos', desc: 'Gerenciar permissões' },
]

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [hoveredAction, setHoveredAction] = useState<number | null>(null)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) {
                router.push('/login')
            } else {
                setUser(user)
            }
            setLoading(false)
        })
    }, [router])

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    const firstName = user?.email?.split('@')[0] || 'Usuário'

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'var(--cream)',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        border: '3px solid var(--green-muted)',
                        borderTopColor: 'var(--green)',
                        animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 16px',
                    }} />
                    <p style={{
                        fontFamily: 'var(--serif)', fontSize: 16,
                        color: 'var(--text-muted)', fontStyle: 'italic',
                    }}>Carregando...</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
            {/* Header */}
            <header className="dash-header" style={{
                position: 'sticky', top: 0, zIndex: 50,
                padding: '0 clamp(20px, 4vw, 48px)', height: 72,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(245,239,230,0.92)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
            }}>
                <a href="/" style={{
                    fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600,
                    color: 'var(--green)', textDecoration: 'none', letterSpacing: '-0.02em',
                }}>Send Senior</a>

                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '8px 16px', borderRadius: 10,
                        background: 'rgba(45,95,79,0.06)',
                    }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'var(--green)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, fontWeight: 700, color: 'white',
                        }}>{firstName[0]?.toUpperCase()}</div>
                        <span className="dash-header-email" style={{
                            fontSize: 15, fontWeight: 500, color: 'var(--text-sub)',
                        }}>{user?.email}</span>
                    </div>
                    <button
                        id="dashboard-logout"
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(185,28,28,0.08)', border: '1.5px solid rgba(185,28,28,0.15)',
                            borderRadius: 8, padding: '10px 20px',
                            fontSize: 14, fontWeight: 600, color: '#B91C1C',
                            cursor: 'pointer', fontFamily: 'var(--sans)',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(185,28,28,0.15)'
                            e.currentTarget.style.borderColor = '#B91C1C'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(185,28,28,0.08)'
                            e.currentTarget.style.borderColor = 'rgba(185,28,28,0.15)'
                        }}
                    >Sair</button>
                </div>
            </header>

            {/* Main content */}
            <main style={{
                maxWidth: 1100, margin: '0 auto',
                padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)',
            }}>
                {/* Welcome */}
                <div style={{ marginBottom: 56 }}>
                    <p style={{
                        fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600,
                        letterSpacing: 2, textTransform: 'uppercase',
                        color: 'var(--green)', marginBottom: 12, opacity: 0.7,
                    }}>Painel</p>
                    <h1 style={{
                        fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 42px)',
                        fontWeight: 600, letterSpacing: '-0.02em',
                        color: 'var(--text)', marginBottom: 8, lineHeight: 1.2,
                    }}>
                        Olá, {firstName}.
                    </h1>
                    <p style={{
                        fontSize: 17, color: 'var(--brown-light)', lineHeight: 1.6, fontWeight: 500,
                    }}>
                        Continue organizando o que importa. Tudo sob seu controle.
                    </p>
                </div>

                {/* Pillar cards */}
                <div className="grid-pillar" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 24, marginBottom: 56,
                }}>
                    {pilares.map((p, i) => (
                        <div
                            key={i}
                            id={`card-${p.label.toLowerCase()}`}
                            style={{
                                padding: 32, borderRadius: 16,
                                background: p.bg,
                                border: '1px solid rgba(0,0,0,0.04)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                                transform: hoveredCard === i ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hoveredCard === i
                                    ? '0 16px 48px rgba(0,0,0,0.1)'
                                    : '0 2px 12px rgba(0,0,0,0.03)',
                            }}
                            onMouseEnter={() => setHoveredCard(i)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <span style={{
                                display: 'block', fontSize: 32, marginBottom: 20,
                                opacity: 0.7,
                            }}>{p.icon}</span>
                            <p style={{
                                fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700,
                                letterSpacing: 2, textTransform: 'uppercase',
                                color: p.color, marginBottom: 8, opacity: 0.6,
                            }}>{p.label}</p>
                            <h3 style={{
                                fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600,
                                color: 'var(--text)', marginBottom: 8,
                                letterSpacing: '-0.01em',
                            }}>{p.title}</h3>
                            <p style={{
                                fontSize: 15, lineHeight: 1.6, color: 'var(--text-sub)', fontWeight: 500,
                            }}>{p.desc}</p>
                            <div style={{
                                marginTop: 20, display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 15, fontWeight: 600, color: p.color,
                            }}>
                                Acessar
                                <span style={{
                                    transition: 'transform 0.3s',
                                    transform: hoveredCard === i ? 'translateX(4px)' : 'translateX(0)',
                                    display: 'inline-block',
                                }}>→</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick actions */}
                <div style={{ marginBottom: 56 }}>
                    <h2 style={{
                        fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600,
                        color: 'var(--text)', marginBottom: 24,
                        letterSpacing: '-0.01em',
                    }}>Ações rápidas</h2>
                    <div className="grid-actions" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 16,
                    }}>
                        {acoes.map((a, i) => (
                            <button
                                key={i}
                                id={`action-${i}`}
                                style={{
                                    padding: '20px 24px', borderRadius: 14,
                                    background: hoveredAction === i ? 'var(--warm-white)' : 'rgba(254,252,249,0.6)',
                                    border: '1.5px solid',
                                    borderColor: hoveredAction === i ? 'var(--green-light)' : 'rgba(0,0,0,0.04)',
                                    cursor: 'pointer', textAlign: 'left',
                                    transition: 'all 0.3s',
                                    transform: hoveredAction === i ? 'translateY(-2px)' : 'translateY(0)',
                                    boxShadow: hoveredAction === i ? '0 8px 24px rgba(0,0,0,0.06)' : 'none',
                                }}
                                onMouseEnter={() => setHoveredAction(i)}
                                onMouseLeave={() => setHoveredAction(null)}
                            >
                                <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{a.icon}</span>
                                <p style={{
                                    fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 700,
                                    color: 'var(--text)', marginBottom: 4,
                                }}>{a.title}</p>
                                <p style={{
                                    fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.4, fontWeight: 500,
                                }}>{a.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status / Info section */}
                <div className="grid-status" style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
                }}>
                    {/* Security status */}
                    <div style={{
                        padding: 32, borderRadius: 16,
                        background: 'var(--warm-white)',
                        border: '1px solid rgba(0,0,0,0.04)',
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: 'var(--green-muted)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: 18,
                            }}><Shield size={20} strokeWidth={1.8} /></div>
                            <h3 style={{
                                fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600,
                                color: 'var(--text)',
                            }}>Segurança</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[
                                { label: 'Criptografia', status: 'Ativa', ok: true },
                                { label: 'Autenticação', status: 'Verificada', ok: true },
                                { label: 'LGPD', status: 'Em conformidade', ok: true },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '12px 16px', borderRadius: 10,
                                    background: 'rgba(45,95,79,0.03)',
                                }}>
                                    <span style={{ fontSize: 15, color: 'var(--text-sub)', fontWeight: 500 }}>{item.label}</span>
                                    <span style={{
                                        fontSize: 14, fontWeight: 600,
                                        color: item.ok ? 'var(--green)' : 'var(--brown)',
                                        display: 'flex', alignItems: 'center', gap: 6,
                                    }}>
                                        <span style={{
                                            width: 10, height: 10, borderRadius: '50%',
                                            background: item.ok ? '#22C55E' : '#EAB308',
                                            display: 'inline-block',
                                        }} />
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checklist */}
                    <ChecklistGamificado />
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                padding: '32px clamp(20px, 4vw, 48px)',
                borderTop: '1px solid rgba(0,0,0,0.04)',
                textAlign: 'center',
            }}>
                <p style={{
                    fontSize: 13, color: 'var(--text-muted)',
                }}>© 2026 Send Senior. Seus dados estão protegidos por criptografia ponta a ponta.</p>
            </footer>
        </div>
    )
}