import { HeroSection } from '@/components/home/hero-section'
import { StatsCounter } from '@/components/home/stats-counter'
import { FeaturedDiscoveries } from '@/components/home/featured-discoveries'
import { QuickSearch } from '@/components/home/quick-search'
import { GalaxyMapPreview } from '@/components/home/galaxy-map-preview'
import { NewsTicker } from '@/components/home/news-ticker'
import { NewsPreview } from '@/components/home/news-preview'
import { CTASection } from '@/components/home/cta-section'
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section'

export default function HomePage() {
  return (
    <>
      {/* New Horizon Hero Section */}
      <HorizonHero />
      
      {/* Original sections moved after the hero */}
      <div className="relative z-10 bg-light-background dark:bg-dark-background">
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

