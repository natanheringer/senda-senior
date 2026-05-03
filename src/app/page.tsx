import {
  CustomCursor,
  Header,
  Hero,
  FundadorasStrip,
  Manifesto,
  ManualSection,
  Depoimento,
  CTAFinal,
  Footer,
} from '@/features/landing'
import { SmoothScroll } from '@/lib/utils/SmoothScroll'

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />
      <main className="relative bg-[var(--color-cream)]">
        {/* 1. Hero — sticky bottom para deixar rolar um pouco mais e mostrar se for longa */}
        <div className="sticky bottom-0 z-0 w-full min-h-screen flex flex-col justify-start">
          <Hero />
        </div>

        {/* 2. Faixa verde — sobe e empilha */}
        <div className="sticky top-0 z-10 w-full bg-[var(--color-green-dark)] shadow-[0_-20px_50px_rgba(0,0,0,0.25)]">
          <Manifesto />
        </div>

        {/* 3. Sobre / fundadoras — sobe e empilha */}
        <div className="sticky top-0 z-20 w-full bg-[var(--color-cream)] shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
          <FundadorasStrip />
        </div>

        {/* 4. Manual Section — gerencia seu próprio sticky + 300vh internamente */}
        <div className="relative z-30 w-full">
          <ManualSection />
        </div>

        {/* 5. Depoimento */}
        <div className="relative z-40 w-full bg-[var(--color-green-dark)] shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
          <Depoimento />
        </div>

        {/* 6. CTA final */}
        <div className="relative z-50 w-full bg-[var(--color-cream)] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <CTAFinal />
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
