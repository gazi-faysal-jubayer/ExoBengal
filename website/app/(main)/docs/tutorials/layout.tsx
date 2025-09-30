import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Tutorials | ExoBengal',
  description: 'Step-by-step tutorials for ExoBengal Python package. Learn prediction, training, data analysis, and visualization techniques for exoplanet research.',
  keywords: ['tutorials', 'step-by-step guide', 'learning resources', 'training tutorial', 'prediction tutorial', 'exoplanet tutorials'],
  openGraph: {
    title: 'Tutorials | ExoBengal',
    description: 'Step-by-step tutorials for ExoBengal Python package',
    url: 'https://exo-bengal.vercel.app/docs/tutorials',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Tutorials'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutorials | ExoBengal',
    description: 'Step-by-step tutorials for ExoBengal Python package',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/tutorials',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function TutorialsLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/tutorials" />
      {children}
    </>
  )
}
