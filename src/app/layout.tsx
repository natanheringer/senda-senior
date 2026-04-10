import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Senda Sênior — Planejamento & Assessoria Sênior',
  description: 'O Manual Prevent Care é o guia prático para famílias que querem organizar o cuidado dos pais idosos antes da urgência. Uma jornada de cuidado e independência.',
  keywords: 'cuidado preventivo idosos, planejamento familiar, manual prevent care, pais idosos, organização familiar, assessoria sênior',
  authors: [{ name: 'Senda Sênior' }],
  metadataBase: new URL('https://sendasenior.com.br'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-senda-senior.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Senda Sênior — Planejamento & Assessoria Sênior',
    description: 'Uma jornada de cuidado e independência. Organize cenários, documentos e diálogos respeitando a autonomia de quem você ama.',
    siteName: 'Senda Sênior',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/hero-elderly.png',
        width: 1200,
        height: 630,
        alt: 'Senda Sênior — Planejamento de Cuidado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senda Sênior — Planejamento & Assessoria Sênior',
    description: 'Guia prático para organização familiar e cuidado sênior preventivo.',
    images: ['/hero-elderly.png'],
  },
}

import { SmoothScroll } from '@/components/SmoothScroll'
import { EB_Garamond, DM_Sans } from 'next/font/google'

const ebGaramond = EB_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'],
  variable: '--serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${ebGaramond.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
