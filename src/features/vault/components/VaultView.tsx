'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search, Trash2, Files as FilesIcon } from 'lucide-react'
import { VaultUploader } from './VaultUploader'
import { VaultFileCard } from './VaultFileCard'
import type { VaultCategory, VaultFile, VaultQuota } from '@/features/vault/types'

interface Props {
  quota: VaultQuota
  categories: VaultCategory[]
  files: VaultFile[]
  trashedFiles: VaultFile[]
  userEmail: string
}

export function VaultView({ quota, categories, files, trashedFiles, userEmail }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [showTrash, setShowTrash] = useState(false)

  const trashedCount = trashedFiles.length

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const base = showTrash ? trashedFiles : files
    return base.filter((f) => {
      if (!showTrash && activeSlug && f.category?.slug !== activeSlug) return false
      if (q && !f.displayName.toLowerCase().includes(q)) return false
      return true
    })
  }, [files, trashedFiles, showTrash, activeSlug, search])

  const systemCats = categories.filter((c) => c.type === 'system')

  const countsBySlug = useMemo(() => {
    const m = new Map<string, number>()
    for (const f of files) {
      if (f.category?.slug) {
        m.set(f.category.slug, (m.get(f.category.slug) ?? 0) + 1)
      }
    }
    return m
  }, [files])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)' }}>
      <header
        style={{
          background: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link
            href="/dashboard"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 20,
              color: 'var(--color-ink)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Senda Sênior
          </Link>
          <nav style={{ display: 'flex', gap: 20 }}>
            <Link
              href="/dashboard"
              style={{
                fontSize: 14,
                color: 'var(--color-ink-soft)',
                textDecoration: 'none',
              }}
            >
              Dashboard
            </Link>
            <span
              style={{
                fontSize: 14,
                color: 'var(--color-ink)',
                fontWeight: 600,
              }}
            >
              Cofre
            </span>
          </nav>
        </div>
        <span style={{ fontSize: 13, color: 'var(--color-ink-soft)' }}>
          {userEmail}
        </span>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <h1
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 34,
                color: 'var(--color-ink)',
                marginBottom: 6,
                letterSpacing: '-0.02em',
              }}
            >
              Cofre
            </h1>
            <p style={{ fontSize: 14, color: 'var(--color-ink-soft)' }}>
              Seus documentos organizados e seguros em um só lugar.
            </p>
          </div>
          <QuotaWidget quota={quota} />
        </div>

        <section style={{ marginBottom: 32 }}>
          <VaultUploader />
        </section>

        <section
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <CategoryChip
            label="Todos"
            count={files.filter((f) => !f.deletedAt).length}
            active={activeSlug === null && !showTrash}
            onClick={() => { setActiveSlug(null); setShowTrash(false) }}
            color="var(--color-ink)"
            icon={<FilesIcon size={13} />}
          />
          {systemCats.map((c) => (
            <CategoryChip
              key={c.id}
              label={c.label}
              count={countsBySlug.get(c.slug) ?? 0}
              active={activeSlug === c.slug && !showTrash}
              onClick={() => { setActiveSlug(c.slug); setShowTrash(false) }}
              color={c.color ?? '#999'}
            />
          ))}
          {trashedCount > 0 && (
            <CategoryChip
              label="Lixeira"
              count={trashedCount}
              active={showTrash}
              onClick={() => { setShowTrash((v) => !v); setActiveSlug(null) }}
              color="#B91C1C"
              icon={<Trash2 size={13} />}
            />
          )}
        </section>

        <section style={{ marginBottom: 24 }}>
          <div style={{ position: 'relative', maxWidth: 420 }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-ink-soft)',
              }}
            />
            <input
              id="vault-search"
              name="q"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome..."
              autoComplete="off"
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.12)',
                fontSize: 14,
                fontFamily: 'var(--font-sans)',
                background: 'white',
                outline: 'none',
                color: 'var(--color-ink)',
              }}
            />
          </div>
        </section>

        <section>
          {filtered.length === 0 ? (
            <EmptyState isFiltered={activeSlug !== null || search.trim().length > 0 || showTrash} />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              {filtered.map((f) => (
                <VaultFileCard key={f.id} file={f} categories={categories} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function QuotaWidget({ quota }: { quota: VaultQuota }) {
  const usedMb = (quota.usedBytes / (1024 * 1024)).toFixed(1)
  const limitMb = (quota.limitBytes / (1024 * 1024)).toFixed(0)
  const pct = quota.usedPercentage
  const warn = pct >= 80

  return (
    <div style={{ minWidth: 220 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: 'var(--color-ink-soft)',
          marginBottom: 6,
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span>{quota.fileCount} arquivo(s)</span>
        <span>
          {usedMb} / {limitMb} MB
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: 'rgba(0,0,0,0.08)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min(100, pct)}%`,
            height: '100%',
            background: warn ? '#B91C1C' : 'var(--color-green)',
            transition: 'width 0.3s',
          }}
        />
      </div>
    </div>
  )
}

function CategoryChip({
  label, count, active, onClick, color, icon,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
  color: string
  icon?: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        borderRadius: 20,
        border: `1.5px solid ${active ? color : 'rgba(0,0,0,0.08)'}`,
        background: active ? color : 'white',
        color: active ? 'white' : 'var(--color-ink)',
        fontSize: 13,
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {icon}
      {label}
      <span
        style={{
          fontSize: 11,
          padding: '1px 6px',
          borderRadius: 8,
          background: active ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
          color: active ? 'white' : 'var(--color-ink-soft)',
          fontWeight: 600,
        }}
      >
        {count}
      </span>
    </button>
  )
}

function EmptyState({ isFiltered }: { isFiltered: boolean }) {
  return (
    <div
      style={{
        padding: '60px 24px',
        textAlign: 'center',
        background: 'white',
        borderRadius: 12,
        border: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <FilesIcon size={32} color="var(--color-ink-soft)" style={{ marginBottom: 12 }} />
      <p style={{
        fontFamily: 'var(--serif)',
        fontSize: 17,
        color: 'var(--color-ink)',
        marginBottom: 6,
      }}>
        {isFiltered ? 'Nenhum arquivo encontrado' : 'Seu cofre está vazio'}
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-ink-soft)', maxWidth: 420, margin: '0 auto' }}>
        {isFiltered
          ? 'Tente ajustar os filtros ou a busca.'
          : 'Arraste documentos para a área acima — eles serão organizados automaticamente.'}
      </p>
    </div>
  )
}
