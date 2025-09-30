import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Access | ExoBengal',
  description: 'Access NASA exoplanet data programmatically through our RESTful API. Free API keys, comprehensive documentation, code examples in Python and JavaScript, and developer resources for building exoplanet applications.',
  keywords: ['exoplanet API', 'NASA data API', 'REST API', 'developer tools', 'API documentation', 'exoplanet data access', 'astronomy API', 'space data'],
  openGraph: {
    title: 'API Access | ExoBengal',
    description: 'Access NASA exoplanet data programmatically through our RESTful API',
    url: 'https://exo-bengal.vercel.app/api-access',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal API Access'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Access | ExoBengal',
    description: 'Access NASA exoplanet data programmatically through our RESTful API',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/api-access',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function ApiAccessLayout({ children }: LayoutProps) {
  return <>{children}</>
}
