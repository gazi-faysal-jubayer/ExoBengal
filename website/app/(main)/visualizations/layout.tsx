import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visualizations | ExoBengal',
  description: 'Explore exoplanets in 3D with NASA Eyes on Exoplanets. Interactive visualization of confirmed planets, their orbits, host stars, and relative positions in our galaxy.',
  keywords: ['exoplanet visualization', 'NASA Eyes', '3D planets', 'interactive astronomy', 'planet orbits', 'space visualization', 'astronomical visualization'],
  openGraph: {
    title: 'Exoplanet Visualizations | ExoBengal',
    description: 'Explore exoplanets in 3D with NASA Eyes on Exoplanets',
    url: 'https://exo-bengal.vercel.app/visualizations',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Exoplanet 3D Visualizations'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exoplanet Visualizations | ExoBengal',
    description: 'Explore exoplanets in 3D with NASA Eyes on Exoplanets',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/visualizations',
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function VisualizationsLayout({ children }: LayoutProps) {
  return <>{children}</>
}
