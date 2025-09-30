import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Documentation | ExoBengal',
  description: 'Complete documentation for ExoBengal Python package. Installation guides, API reference, tutorials, examples, and data reference for accessing and analyzing NASA exoplanet data.',
  keywords: ['ExoBengal documentation', 'Python package docs', 'API reference', 'exoplanet tutorials', 'NASA data API', 'machine learning', 'data science'],
  openGraph: {
    title: 'Documentation | ExoBengal',
    description: 'Complete documentation for ExoBengal Python package',
    url: 'https://exo-bengal.vercel.app/docs',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Documentation'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation | ExoBengal',
    description: 'Complete documentation for ExoBengal Python package',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function DocsRootLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs" />
      {children}
    </>
  )
}
