import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Prediction Tutorial | ExoBengal',
  description: 'Learn how to make exoplanet predictions using ExoBengal machine learning models. Step-by-step guide for using RandomForest, CNN, and kNN classifiers.',
  keywords: ['prediction tutorial', 'machine learning prediction', 'exoplanet classification', 'model inference', 'RandomForest prediction'],
  openGraph: {
    title: 'Prediction Tutorial | ExoBengal',
    description: 'Learn how to make exoplanet predictions using machine learning models',
    url: 'https://exo-bengal.vercel.app/docs/tutorials/prediction',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Prediction Tutorial'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prediction Tutorial | ExoBengal',
    description: 'Learn how to make exoplanet predictions using machine learning models',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/tutorials/prediction',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function PredictionTutorialLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/tutorials/prediction" />
      {children}
    </>
  )
}
