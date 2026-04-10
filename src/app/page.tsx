'use client'

import { CustomCursor } from '@/components/landing/CustomCursor'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Problema } from '@/components/landing/Problema'
import { FasesCuidado } from '@/components/landing/FasesCuidado'
import { Pilares } from '@/components/landing/Pilares'
import { ManualSection } from '@/components/landing/ManualSection'
import { ParaQuem, Depoimento } from '@/components/landing/ParaQuem'
import { QuemSomos, Servicos, CTAFinal, Footer } from '@/components/landing/Sections'

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
