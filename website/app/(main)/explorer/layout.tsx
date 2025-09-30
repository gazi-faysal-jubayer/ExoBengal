import type { Metadata } from 'next'
import { generateDatasetSchema, jsonLdScriptProps } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Explorer | ExoBengal',
  description: 'Discover and analyze thousands of confirmed exoplanets from NASA\'s archive. Advanced filtering, interactive visualizations, statistical charts, and detailed planet data from Kepler, TESS, and other missions.',
  keywords: ['exoplanet explorer', 'NASA exoplanet archive', 'planet search', 'exoplanet data', 'Kepler planets', 'TESS discoveries', 'planet visualization', 'astronomical data'],
  openGraph: {
    title: 'Exoplanet Explorer | ExoBengal',
    description: 'Discover and analyze thousands of confirmed exoplanets from NASA\'s archive',
    url: 'https://exo-bengal.vercel.app/explorer',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal Exoplanet Explorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exoplanet Explorer | ExoBengal',
    description: 'Discover and analyze thousands of confirmed exoplanets from NASA\'s archive',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/explorer',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function ExplorerLayout({ children }: LayoutProps) {
  // Generate Dataset schema for NASA Exoplanet Archive
  const datasetSchema = generateDatasetSchema(
    'NASA Exoplanet Archive',
    'Comprehensive database of confirmed exoplanets from NASA with orbital parameters, stellar characteristics, and discovery information',
    'https://exo-bengal.vercel.app/explorer'
  )

  return (
    <>
      {/* Dataset structured data for SEO */}
      <script {...jsonLdScriptProps(datasetSchema)} />
      {children}
    </>
  )
}
