'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Info } from 'lucide-react'

const checklistPadrao = [
  { id: 1, text: 'Reunir documentos em uma pasta', done: false },
  { id: 2, text: 'Lista de medicamentos e horários', done: false },
  { id: 3, text: 'Contatos de emergência no celular', done: false },
  { id: 4, text: 'Agendar check-up preventivo anualmente', done: false },
  { id: 5, text: 'Revisar segurança da casa e remover tapetes', done: false },
  { id: 6, text: 'Iniciar diálogos de procuração e diretivas', done: false }
]

export function ChecklistGamificado() {
  const [items, setItems] = useState(checklistPadrao)

  const toggleItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item))
  }

  // Ordenar itens via cópia rasa
  const sortedItems = [...items].sort((a, b) => {
    if (a.done === b.done) return a.id - b.id
    return a.done ? 1 : -1
  })

  const progress = Math.round((items.filter(i => i.done).length / items.length) * 100)

  return (
    <div style={{
      background: 'var(--warm-white)', padding: 32, borderRadius: 16,
      border: '1px solid rgba(45,95,79,0.08)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
      display: 'flex', flexDirection: 'column', height: '100%', minHeight: 480
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, color: 'var(--text)' }}>
          Checklist Prevent Care
        </h3>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', background: 'var(--green-muted)', padding: '6px 12px', borderRadius: 20 }}>
          {progress}% Prontidão
        </span>
      </div>

      <div style={{ background: 'var(--cream)', height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 32 }}>
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${progress}%` }} 
          transition={{ duration: 0.5, type: 'spring', damping: 20 }}
          style={{ background: 'var(--terracotta)', height: '100%', borderRadius: 3 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <AnimatePresence initial={false}>
          {sortedItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: item.done ? 0.45 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                background: item.done ? 'var(--cream)' : 'white', borderRadius: 12,
                border: '1px solid', borderColor: item.done ? 'transparent' : 'rgba(0,0,0,0.05)',
                cursor: 'pointer', boxShadow: item.done ? 'none' : '0 2px 8px rgba(0,0,0,0.02)'
              }}
              onClick={() => toggleItem(item.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{
                minWidth: 24, height: 24, borderRadius: 6, border: '2px solid',
                borderColor: item.done ? 'var(--terracotta)' : 'var(--green-light)',
                background: item.done ? 'var(--terracotta)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                <AnimatePresence>
                  {item.done && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check size={14} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span style={{
                 fontSize: 15, fontWeight: item.done ? 400 : 500, color: 'var(--text)',
                 textDecoration: item.done ? 'line-through' : 'none', transition: 'all 0.3s'
              }}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {progress === 100 && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 24, padding: '16px 20px', background: 'var(--green-muted)', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Info size={20} color="var(--green)" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: 'var(--green-dark)', fontWeight: 600 }}>Caminho livre! Você tirou a carga da preocupação dos ombros.</p>
         </motion.div>
      )}
    </div>
  )
}
