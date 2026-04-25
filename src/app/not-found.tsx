import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        background: 'var(--color-cream)',
        color: 'var(--color-ink)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <p className="label-premium" style={{ marginBottom: 12 }}>
          Página não encontrada
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(34px, 5vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          Este caminho não existe.
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--color-ink-sub)',
            marginBottom: 28,
          }}
        >
          Volte para a página inicial para continuar sua navegação.
        </p>
        <Link
          href="/"
          className="btn-terracotta-hover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: 'var(--color-terracotta)',
            color: 'white',
            padding: '14px 24px',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 4px 20px rgba(181,114,74,0.25)',
          }}
        >
          Ir para a Home
        </Link>
      </div>
    </main>
  )
}
