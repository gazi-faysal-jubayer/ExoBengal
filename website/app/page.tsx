import { HeroSection } from '@/components/home/hero-section'
import { StatsCounter } from '@/components/home/stats-counter'
import { FeaturedDiscoveries } from '@/components/home/featured-discoveries'
import { QuickSearch } from '@/components/home/quick-search'
import { GalaxyMapPreview } from '@/components/home/galaxy-map-preview'
import { NewsTicker } from '@/components/home/news-ticker'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <FeaturedDiscoveries />
      <QuickSearch />
      <GalaxyMapPreview />
      <NewsTicker />
      <CTASection />
    </>
  )
}

