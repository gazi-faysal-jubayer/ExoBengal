import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Getting Started | ExoBengal',
  description: 'Learn how to install and use ExoBengal Python package in minutes. Step-by-step guide for installation, importing, creating detectors, making predictions, and training models.',
  keywords: ['ExoBengal tutorial', 'getting started', 'Python installation', 'pip install', 'exoplanet detection', 'machine learning tutorial'],
  openGraph: {
    title: 'Getting Started | ExoBengal',
    description: 'Learn how to install and use ExoBengal Python package in minutes',
    url: 'https://exo-bengal.vercel.app/docs/getting-started',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Getting Started with ExoBengal'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Getting Started | ExoBengal',
    description: 'Learn how to install and use ExoBengal Python package in minutes',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/getting-started',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function GettingStartedLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/getting-started" />
      {children}
    </>
  )
}
