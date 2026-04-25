'use client'

import NextImage from 'next/image'
import { Reveal } from '@/design'
import { BrandStar } from '@/features/landing/shared/BrandStar'

/* ─────────────────────────────────────────────────────────────────────
   BRAND BEAT 1 — Star Cluster (after Hero)
   Spirit: Prancheta 4 — dark green, 4 stars colored gold/terracotta/cream
   Purpose: visual decompression + brand identity punch after the hero
──────────────────────────────────────────────────────────────────────*/
export function BrandBeatStars() {
  return (
    <section
      className="brand-beat"
      style={{
        background: 'var(--color-green-dark)',
        padding: 'clamp(60px, 8vw, 96px) clamp(20px, 4vw, 60px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle star pattern at low opacity behind */}
      <div className="beat-pattern-star" style={{ opacity: 0.06 }} />

      <Reveal>
        {/* 4-star cluster — Prancheta 4 colors, large scale */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            width: 'fit-content',
          }}
        >
          <BrandStar size={72} color="var(--color-terracotta)" />
          <BrandStar size={96} color="var(--color-gold)" />
          <BrandStar size={88} color="var(--color-gold-light)" />
          <BrandStar size={64} color="var(--color-cream)" />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.38)',
            textAlign: 'center',
          }}
        >
          Planejamento & Assessoria Sênior
        </p>
      </Reveal>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   BRAND BEAT 2 — Full Pattern (between Problema and FasesCuidado)
   Spirit: Prancheta 6/9 — star tessellation or dense S-caminho
   Purpose: visual reset between two dark sections
──────────────────────────────────────────────────────────────────────*/
export function BrandBeatPattern() {
  return (
    <section
      className="brand-beat"
      style={{
        background: 'var(--color-green)',
        minHeight: 'clamp(200px, 22vw, 340px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Prancheta 6 energy — star tessellation at high opacity */}
      <NextImage
        src="/brand/photos/prancheta-6.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.55,
          mixBlendMode: 'luminosity',
        }}
      />

      {/* Centered seal over the pattern */}
      <Reveal>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <NextImage
            src="/brand/photos/card-template.png"
            alt="Senda Sênior"
            width={160}
            height={160}
            style={{
              width: 100,
              height: 100,
              objectFit: 'contain',
              opacity: 0.7,
              filter: 'brightness(2) saturate(0)',
            }}
          />
        </div>
      </Reveal>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   BRAND BEAT 3 — Terracotta S-Path (between Pilares and Manual)
   Spirit: Prancheta 7 — terracotta bg, huge gold S-caminho fills the panel
   Purpose: bold brand graphic between the method and the product
──────────────────────────────────────────────────────────────────────*/
export function BrandBeatSPath() {
  return (
    <section
      className="brand-beat"
      style={{
        background: 'var(--color-terracotta)',
        minHeight: 'clamp(280px, 28vw, 420px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Prancheta 7 — the S-path graphic fills the section */}
      <NextImage
        src="/brand/photos/prancheta-7.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.65,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Optional centered quote over the S graphic */}
      <Reveal>
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 clamp(20px, 4vw, 60px)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.88)',
              maxWidth: 480,
              lineHeight: 1.5,
              textShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}
          >
            &ldquo;O caminho começa antes da necessidade.&rdquo;
          </p>
        </div>
      </Reveal>
    </section>
  )
}
