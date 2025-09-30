import type { Metadata } from 'next'
import BreadcrumbSchema from '@/components/docs/breadcrumb-schema'

export const metadata: Metadata = {
  title: 'Installation | ExoBengal',
  description: 'Installation guide for ExoBengal Python package. Requirements, dependencies, pip installation, and setup instructions for Python 3.8+.',
  keywords: ['ExoBengal installation', 'Python setup', 'pip install exobengal', 'dependencies', 'requirements', 'TensorFlow', 'scikit-learn'],
  openGraph: {
    title: 'Installation | ExoBengal',
    description: 'Installation guide for ExoBengal Python package',
    url: 'https://exo-bengal.vercel.app/docs/installation',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Installation Guide'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Installation | ExoBengal',
    description: 'Installation guide for ExoBengal Python package',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/docs/installation',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function InstallationLayout({ children }: LayoutProps) {
  return (
    <>
      {/* Breadcrumb structured data for SEO */}
      <BreadcrumbSchema pathname="/docs/installation" />
      {children}
    </>
  )
}
