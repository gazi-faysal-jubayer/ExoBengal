import { HeroSection } from '@/components/home/hero-section'
import { StatsCounter } from '@/components/home/stats-counter'
import { FeaturedDiscoveries } from '@/components/home/featured-discoveries'
import { QuickSearch } from '@/components/home/quick-search'
import { GalaxyMapPreview } from '@/components/home/galaxy-map-preview'
import { NewsTicker } from '@/components/home/news-ticker'
import { NewsPreview } from '@/components/home/news-preview'
import { CTASection } from '@/components/home/cta-section'
import Hero from '@/components/home/hero'

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <HeroSection /> */}
      <StatsCounter />
      <FeaturedDiscoveries />
      <QuickSearch />
      <GalaxyMapPreview />
      <NewsTicker />
      <NewsPreview />
      <CTASection />
    </>
  )
}

