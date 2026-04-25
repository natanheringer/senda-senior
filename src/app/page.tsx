import { connection } from 'next/server'
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

export const dynamic = 'force-dynamic'

export default async function Home() {
  await connection()

  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />
      <main>
        {/* 1. Hero — mockup mãe: creme | foto + S */}
        <Hero />

        {/* 2. Sobre / fundadoras — faixa creme (respiro entre herói e verde) */}
        <FundadorasStrip />

        {/* 3. Faixa verde — foto | manifesto + watermark S */}
        <Manifesto />

        {/* 4. Recurso em destaque — manual / guias */}
        <ManualSection />

        {/* 5. Depoimento */}
        <Depoimento />

        {/* 6. CTA final — conversa (sem repetir manifesto) */}
        <CTAFinal />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
