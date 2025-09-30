import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Training Tutorial | ExoBengal',
  description: 'Learn how to train and retrain ExoBengal machine learning models. Step-by-step guide for training RandomForest, CNN, and kNN classifiers on custom datasets.',
  keywords: ['training tutorial', 'model training', 'retrain models', 'custom dataset', 'machine learning training', 'model optimization'],
  openGraph: {
    title: 'Training Tutorial | ExoBengal',
    description: 'Learn how to train ExoBengal machine learning models',
    url: 'https://exo-bengal.vercel.app/docs/tutorials/training',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Training Tutorial'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Training Tutorial | ExoBengal',
    description: 'Learn how to train ExoBengal machine learning models',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/tutorials/training',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function TrainingTutorialLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/tutorials/training" />
      {children}
    </>
  )
}
