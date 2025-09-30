import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Examples | ExoBengal',
  description: 'Real-world examples and use cases for ExoBengal Python package. Code samples, practical applications, and implementation patterns for exoplanet data analysis.',
  keywords: ['code examples', 'use cases', 'practical examples', 'implementation', 'sample code', 'exoplanet analysis examples'],
  openGraph: {
    title: 'Examples | ExoBengal',
    description: 'Real-world examples and use cases for ExoBengal',
    url: 'https://exo-bengal.vercel.app/docs/examples',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Code Examples'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Examples | ExoBengal',
    description: 'Real-world examples and use cases for ExoBengal',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/examples',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function ExamplesLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/examples" />
      {children}
    </>
  )
}
