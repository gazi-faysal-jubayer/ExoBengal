import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'DetectExoplanet Class | ExoBengal',
  description: 'API documentation for DetectExoplanet class. Train and run RandomForest, CNN, and kNN models for exoplanet detection and classification.',
  keywords: ['DetectExoplanet', 'machine learning', 'RandomForest', 'CNN', 'kNN', 'exoplanet classification', 'model training'],
  openGraph: {
    title: 'DetectExoplanet Class | ExoBengal',
    description: 'API documentation for DetectExoplanet class',
    url: 'https://exo-bengal.vercel.app/docs/api/detect-exoplanet',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'DetectExoplanet API Documentation'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DetectExoplanet Class | ExoBengal',
    description: 'API documentation for DetectExoplanet class',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/api/detect-exoplanet',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function DetectExoplanetLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/api/detect-exoplanet" />
      {children}
    </>
  )
}
