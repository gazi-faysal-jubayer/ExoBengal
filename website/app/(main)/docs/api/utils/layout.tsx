import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Utility Functions | ExoBengal',
  description: 'API documentation for ExoBengal utility functions. Calculate Earth Similarity Index (ESI) and other helper functions for exoplanet analysis.',
  keywords: ['utility functions', 'ESI', 'Earth Similarity Index', 'helper functions', 'exoplanet calculations'],
  openGraph: {
    title: 'Utility Functions | ExoBengal',
    description: 'API documentation for ExoBengal utility functions',
    url: 'https://exo-bengal.vercel.app/docs/api/utils',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Utility Functions'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utility Functions | ExoBengal',
    description: 'API documentation for ExoBengal utility functions',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/api/utils',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function UtilsLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/api/utils" />
      {children}
    </>
  )
}
