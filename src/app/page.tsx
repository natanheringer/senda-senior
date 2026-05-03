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
      <main>
        {/* 1. Hero — mockup mãe: creme | foto + S */}
        <Hero />

        {/* 2. Faixa verde — foto | manifesto + watermark S */}
        <Manifesto />

        {/* 3. Sobre / fundadoras — faixa creme (respiro entre herói e verde) */}
        <FundadorasStrip />

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
