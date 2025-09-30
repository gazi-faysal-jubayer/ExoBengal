import type { Metadata } from 'next'
import { generateArticleSchema, jsonLdScriptProps } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Learn | ExoBengal',
  description: 'Learn about exoplanets through comprehensive lessons covering fundamentals, detection methods (transit, radial velocity, direct imaging), space missions (Kepler, TESS, JWST), and habitability science. Educational videos and interactive content.',
  keywords: ['exoplanet education', 'astronomy lessons', 'transit method', 'radial velocity', 'habitable zone', 'Kepler mission', 'TESS', 'James Webb', 'planet detection', 'space education', 'biosignatures'],
  openGraph: {
    title: 'Learn About Exoplanets | ExoBengal',
    description: 'Comprehensive lessons on exoplanet science, detection methods, and habitability',
    url: 'https://exo-bengal.vercel.app/learn',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Learn About Exoplanets'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn About Exoplanets | ExoBengal',
    description: 'Comprehensive lessons on exoplanet science, detection methods, and habitability',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/learn',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function LearnLayout({ children }: LayoutProps) {
  // Generate Article schema for educational content
  const articleSchema = generateArticleSchema(
    'Learn About Exoplanets',
    'Comprehensive educational content covering exoplanet fundamentals, detection methods (transit, radial velocity, direct imaging, microlensing), space missions (Kepler, TESS, JWST), and habitability science including biosignatures and Earth analogs',
    'https://exo-bengal.vercel.app/learn',
    '2024-01-01',
    new Date().toISOString().split('T')[0]
  )

  return (
    <>
      {/* Article/Educational structured data for SEO */}
      <script {...jsonLdScriptProps(articleSchema)} />
      {children}
    </>
  )
}
