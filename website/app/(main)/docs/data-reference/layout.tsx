import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Data Reference | ExoBengal',
  description: 'Complete data reference for ExoBengal. Dataset columns, labels, preprocessing steps, and data format specifications for NASA exoplanet archive.',
  keywords: ['data reference', 'dataset columns', 'data format', 'preprocessing', 'NASA archive', 'CSV format', 'data schema'],
  openGraph: {
    title: 'Data Reference | ExoBengal',
    description: 'Complete data reference for ExoBengal dataset',
    url: 'https://exo-bengal.vercel.app/docs/data-reference',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Data Reference'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Reference | ExoBengal',
    description: 'Complete data reference for ExoBengal dataset',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/data-reference',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function DataReferenceLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/data-reference" />
      {children}
    </>
  )
}
