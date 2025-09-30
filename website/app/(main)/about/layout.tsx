import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | ExoBengal',
  description: 'Meet Team ExoBengal - passionate researchers, developers, and educators dedicated to making exoplanet science accessible through innovative technology and open-source collaboration.',
  keywords: ['ExoBengal team', 'exoplanet research', 'open source', 'astronomy education', 'space science team', 'NASA data'],
  openGraph: {
    title: 'About | ExoBengal',
    description: 'Meet the team behind ExoBengal - making exoplanet science accessible to everyone',
    url: 'https://exo-bengal.vercel.app/about',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Team ExoBengal'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | ExoBengal',
    description: 'Meet the team behind ExoBengal - making exoplanet science accessible to everyone',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/about',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function AboutLayout({ children }: LayoutProps) {
  return <>{children}</>
}
