import {
  CustomCursor,
  Header,
  Hero,
  Problema,
  FasesCuidado,
  Pilares,
  ManualSection,
  ParaQuem,
  Depoimento,
  QuemSomos,
  Servicos,
  CTAFinal,
  Footer,
} from '@/features/landing'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Problema />
        <FasesCuidado />
        <Pilares />
        <ManualSection />
        <ParaQuem />
        <Depoimento />
        <QuemSomos />
        <Servicos />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
