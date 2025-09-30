import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Models | ExoBengal',
  description: 'Documentation for ExoBengal machine learning models. Model artifacts, loading behavior, retraining procedures, and performance metrics for RandomForest, CNN, and kNN classifiers.',
  keywords: ['machine learning models', 'RandomForest', 'CNN', 'kNN', 'model training', 'model artifacts', 'retraining', 'classification'],
  openGraph: {
    title: 'Models | ExoBengal',
    description: 'Documentation for ExoBengal machine learning models',
    url: 'https://exo-bengal.vercel.app/docs/models',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Machine Learning Models'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Models | ExoBengal',
    description: 'Documentation for ExoBengal machine learning models',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/models',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function ModelsLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/models" />
      {children}
    </>
  )
}
