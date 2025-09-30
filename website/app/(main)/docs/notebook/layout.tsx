import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Jupyter Notebook | ExoBengal',
  description: 'Walkthrough of ExoBengal test.ipynb Jupyter notebook. Interactive examples, outputs, visualizations, and step-by-step analysis of exoplanet data.',
  keywords: ['Jupyter notebook', 'test.ipynb', 'interactive examples', 'data analysis', 'Python notebook', 'exoplanet analysis'],
  openGraph: {
    title: 'Jupyter Notebook | ExoBengal',
    description: 'Walkthrough of ExoBengal Jupyter notebook examples',
    url: 'https://exo-bengal.vercel.app/docs/notebook',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Jupyter Notebook'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jupyter Notebook | ExoBengal',
    description: 'Walkthrough of ExoBengal Jupyter notebook examples',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/notebook',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function NotebookLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/notebook" />
      {children}
    </>
  )
}
