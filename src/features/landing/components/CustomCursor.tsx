'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [hoveredText, setHoveredText] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY })
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const text =
        target.getAttribute('data-cursor') ||
        target.closest('[data-cursor]')?.getAttribute('data-cursor')
      setHoveredText(text || null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={{ x: mousePos.x, y: mousePos.y, scale: hoveredText ? 1 : 0.2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--color-terracotta)',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hoveredText ? 0.95 : 0,
          boxShadow: '0 8px 32px rgba(181,114,74,0.4)',
          transition: 'opacity 0.2s',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: 4,
          }}
        >
          {hoveredText}
        </span>
      </div>
    </motion.div>
  )
}
