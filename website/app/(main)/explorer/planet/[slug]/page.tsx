'use client'

// Dynamic metadata is generated in layout.tsx using generateMetadata()

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useExplorerStore } from '@/lib/explorer-store'
import type { ExplorerPlanetRow } from '@/lib/csv-loader'
import { PlanetHero } from '@/components/explorer/planet/planet-hero'
import { KeyFactsGrid } from '@/components/explorer/planet/key-facts-grid'
import { ArtistConception } from '@/components/explorer/planet/artist-conception'
import { DiscoverySection } from '@/components/explorer/planet/discovery-section'
import { KeepExploring } from '@/components/explorer/planet/keep-exploring'
import { TargetIdentifiers } from '@/components/explorer/planet/target-identifiers'
import { SkyPosition } from '@/components/explorer/planet/sky-position'
import { PhotometryGrid } from '@/components/explorer/planet/photometry-grid'
import { StellarParameters } from '@/components/explorer/planet/stellar-parameters'
import { ObservationCoverage } from '@/components/explorer/planet/observation-coverage'
import { ExternalLinks } from '@/components/explorer/planet/external-links'
import { NeighborContext } from '@/components/explorer/planet/neighbor-context'
import { NotesPanel } from '@/components/explorer/planet/notes-panel'
import { NASAEyesCard } from '@/components/explorer/planet/nasa-eyes-card'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Info, 
  Map, 
  Camera, 
  Star, 
  Eye, 
  Link, 
  Users, 
  FileText,
  Telescope,
  Activity
} from 'lucide-react'
import dynamic from 'next/dynamic'

const OrbitalSystemViewer = dynamic(() => import('@/components/explorer/orbital-system-viewer'), { ssr: false })

interface PlanetPageProps {
  params: {
    slug: string
  }
}

export default function PlanetPage({ params }: PlanetPageProps) {
  const { slug } = useParams() as { slug: string }
  const { loadRows, getPlanetBySlugUnfiltered, isLoaded, isLoading, error } = useExplorerStore()
  const [planet, setPlanet] = useState<ExplorerPlanetRow | undefined>(undefined)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const initializePage = async () => {
      // Ensure data is loaded
      if (!isLoaded && !isLoading) {
        await loadRows()
      }
      
      // Once data is loaded, try to find the planet
      if (isLoaded) {
        const foundPlanet = getPlanetBySlugUnfiltered(slug)
        if (foundPlanet) {
          setPlanet(foundPlanet)
          setNotFound(false)
        } else {
          setPlanet(undefined)
          setNotFound(true)
        }
      }
    }

    initializePage()
  }, [slug, isLoaded, isLoading, loadRows, getPlanetBySlugUnfiltered])


  // Loading state
  if (isLoading || (!isLoaded && !error)) {
    return (
      <div className="min-h-screen bg-light-background dark:bg-dark-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark-blue mx-auto mb-4"></div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Loading exoplanet data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-light-background dark:bg-dark-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-semantic-error mb-4">Error Loading Data</h1>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">{error}</p>
              <a 
                href="/explorer" 
                className="inline-flex items-center px-6 py-3 bg-primary-dark-blue text-white rounded-lg hover:bg-primary-dark-blue/90 transition-colors mt-4"
              >
                Return to Explorer
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not found state
  if (notFound || !planet) {
    return (
      <div className="min-h-screen bg-light-background dark:bg-dark-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">404</h1>
              <h2 className="text-2xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-4">Planet Not Found</h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                The exoplanet with slug "{slug}" could not be found in our database.
              </p>
              <a 
                href="/explorer" 
                className="inline-flex items-center px-6 py-3 bg-primary-dark-blue text-white rounded-lg hover:bg-primary-dark-blue/90 transition-colors"
              >
                Return to Explorer
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main planet page content - ExoFOP-style layout
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="border-b border-light-border dark:border-dark-border">
          <PlanetHero planet={planet} />
        </section>

        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="py-8">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2 mb-8 bg-light-surface dark:bg-dark-surface p-1 rounded-lg">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="stellar" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Stellar</span>
            </TabsTrigger>
            <TabsTrigger value="observations" className="flex items-center gap-2">
              <Telescope className="h-4 w-4" />
              <span className="hidden sm:inline">Observations</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quick Facts */}
              <KeyFactsGrid planet={planet} />
              
              {/* Target Identifiers */}
              <TargetIdentifiers planet={planet} />
              
              {/* Interactive Visualizations */}
              <div>
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                  Interactive Visualizations
                </h3>
                
                {/* NASA Eyes - Full Width at Top */}
                <div className="mb-8">
                  <NASAEyesCard planet={planet} />
                </div>
                
                {/* Orbital System and Artist's Conception */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-light-text-primary dark:text-dark-text-primary mb-4">
                      Orbital System
                    </h4>
                    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
                      <OrbitalSystemViewer hostName={planet.hostname} />
                    </div>
                  </div>
                  <ArtistConception planet={planet} />
                </div>
              </div>
              
              {/* Discovery Information */}
              <DiscoverySection planet={planet} />
            </motion.div>
          </TabsContent>

          {/* Stellar Properties Tab */}
          <TabsContent value="stellar" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StellarParameters planet={planet} />
              <SkyPosition planet={planet} />
              <PhotometryGrid planet={planet} />
            </motion.div>
          </TabsContent>

          {/* Observations Tab */}
          <TabsContent value="observations" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ObservationCoverage planet={planet} />
              <NeighborContext planet={planet} />
              <ExternalLinks planet={planet} />
            </motion.div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced visualization with better controls */}
              <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                    Interactive System Analysis
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    Explore the {planet.hostname || planet.pl_name} system with enhanced controls and real-time orbital data
                  </p>
                  <div className="h-[600px]">
                    <OrbitalSystemViewer hostName={planet.hostname} />
                  </div>
                </div>
              </div>
              
              {/* Additional Analysis Tools Placeholder */}
              <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  Comparative Analysis
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Advanced analysis tools and comparisons with other exoplanets coming soon.
                </p>
              </div>
            </motion.div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NotesPanel planetName={planet.pl_name} />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Keep Exploring Section - Always visible */}
        <section className="border-t border-light-border dark:border-dark-border pt-12 pb-16">
          <KeepExploring />
        </section>
      </div>
    </div>
  )
}
