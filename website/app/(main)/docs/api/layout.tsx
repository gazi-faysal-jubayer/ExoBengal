import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'API Reference | ExoBengal',
  description: 'Complete API reference for ExoBengal Python package. DetectExoplanet class, ExoParams, utility functions, model training, and inference methods.',
  keywords: ['ExoBengal API', 'Python API reference', 'DetectExoplanet', 'ExoParams', 'API documentation', 'function reference'],
  openGraph: {
    title: 'API Reference | ExoBengal',
    description: 'Complete API reference for ExoBengal Python package',
    url: 'https://exo-bengal.vercel.app/docs/api',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal API Reference'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Reference | ExoBengal',
    description: 'Complete API reference for ExoBengal Python package',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/api',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function ApiLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/api" />
      {children}
    </>
  )
}
