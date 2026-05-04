'use client'

import { useEffect, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'

export interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'default'
  loading?: boolean
}

/**
 * Diálogo de confirmação reutilizável. Usa `<dialog>` nativo para
 * ganhar focus trap + Escape key gratuitamente.
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default',
  loading = false,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleClose = () => onClose()
    el.addEventListener('close', handleClose)
    return () => el.removeEventListener('close', handleClose)
  }, [onClose])

  const danger = variant === 'danger'

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      style={{
        padding: 0,
        border: 'none',
        borderRadius: 14,
        maxWidth: 440,
        width: '90vw',
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      }}
    >
      <div style={{ padding: 28, background: 'white', borderRadius: 14 }}>
        <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
          {danger && (
            <div
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 20,
                background: 'rgba(185,28,28,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={20} color="#B91C1C" />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 19,
                color: 'var(--color-ink)',
                marginBottom: description ? 6 : 0,
                lineHeight: 1.3,
              }}
            >
              {title}
            </h2>
            {description && (
              <p
                style={{
                  fontSize: 16.1,
                  color: 'var(--color-ink-muted)',
                  lineHeight: 1.5,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '9px 18px',
              borderRadius: 8,
              border: '1.5px solid rgba(0,0,0,0.1)',
              background: 'white',
              color: 'var(--color-ink)',
              fontSize: 16.1,
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: '9px 18px',
              borderRadius: 8,
              border: 'none',
              background: danger ? '#B91C1C' : 'var(--color-green)',
              color: 'white',
              fontSize: 16.1,
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Processando…' : confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.45);
        }
      `}</style>
    </dialog>
  )
}
