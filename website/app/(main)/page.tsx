import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/hero-section'
import { StatsCounter } from '@/components/home/stats-counter'
import { FeaturedDiscoveries } from '@/components/home/featured-discoveries'
import { QuickSearch } from '@/components/home/quick-search'
import { GalaxyMapPreview } from '@/components/home/galaxy-map-preview'
import { NewsTicker } from '@/components/home/news-ticker'
import { NewsPreview } from '@/components/home/news-preview'
import { CTASection } from '@/components/home/cta-section'
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section'
import { PipInstallSection } from '@/components/home/pip-install-section'

export const metadata: Metadata = {
  title: 'Home | ExoBengal',
  description: 'Explore thousands of confirmed exoplanets from NASA\'s archive. Interactive visualizations, real-time data, machine learning predictions, and comprehensive Python package for exoplanet research.',
  keywords: ['exoplanets', 'NASA', 'astronomy', 'space exploration', 'exoplanet data', 'planetary science', 'Kepler', 'TESS', 'data visualization', 'machine learning', 'Python package'],
  openGraph: {
    title: 'Home | ExoBengal',
    description: 'Explore thousands of confirmed exoplanets with interactive visualizations and machine learning tools',
    url: 'https://exo-bengal.vercel.app/',
    siteName: 'ExoBengal',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal - NASA Exoplanet Data Explorer'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | ExoBengal',
    description: 'Explore thousands of confirmed exoplanets with interactive visualizations and machine learning tools',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/',
  }
}

export default function HomePage() {
  return (
    <>
      {/* New Horizon Hero Section */}
      <HorizonHero />
      
      {/* Pip Install Section */}
      
      
      {/* Original sections moved after the hero */}
      <div className="relative z-10 bg-light-background dark:bg-dark-background">
      <PipInstallSection />
        <StatsCounter />
        <FeaturedDiscoveries />
        <QuickSearch />
        <GalaxyMapPreview />
        <NewsTicker />
        <NewsPreview />
        <CTASection />
      </div>
    </>
  )
}

