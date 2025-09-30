import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'ExoParams Class | ExoBengal',
  description: 'API documentation for ExoParams class. Named input container for model features including orbital period, radius, temperature, and stellar parameters.',
  keywords: ['ExoParams', 'input parameters', 'model features', 'exoplanet parameters', 'data structure'],
  openGraph: {
    title: 'ExoParams Class | ExoBengal',
    description: 'API documentation for ExoParams class',
    url: 'https://exo-bengal.vercel.app/docs/api/exo-params',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoParams API Documentation'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExoParams Class | ExoBengal',
    description: 'API documentation for ExoParams class',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/api/exo-params',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function ExoParamsLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/api/exo-params" />
      {children}
    </>
  )
}
