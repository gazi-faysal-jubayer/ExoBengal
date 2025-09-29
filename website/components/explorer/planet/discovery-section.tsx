'use client'

import { ExternalLink, Calendar, Telescope, MapPin, FileText, Award } from 'lucide-react'
import type { ExplorerPlanetRow } from '@/lib/csv-loader'
import { stripHtml, extractAtUrl, formatDiscoveryDate, getDiscoveryFacility } from './shared-utils'

interface DiscoverySectionProps {
  planet: ExplorerPlanetRow
}

export function DiscoverySection({ planet }: DiscoverySectionProps) {
  const discoveryDate = formatDiscoveryDate(planet)
  const discoveryFacility = getDiscoveryFacility(planet)
  const referenceUrl = extractAtUrl(planet.disc_refname)
  const cleanReference = stripHtml(planet.disc_refname)
  
  // Create a discovery narrative
  const createDiscoveryNarrative = (planet: ExplorerPlanetRow): string => {
    const method = planet.discoverymethod || 'an unspecified method'
    const year = planet.disc_year ? `in ${planet.disc_year}` : 'recently'
    const facility = planet.disc_facility || planet.disc_telescope
    const instrument = (planet as any).disc_instrument
    
    let narrative = `The discovery of ${planet.pl_name} represents a significant contribution to our understanding of exoplanetary systems. `
    
    narrative += `This ${planet.pl_rade ? (planet.pl_rade > 2 ? 'large' : planet.pl_rade < 1 ? 'small' : 'Earth-sized') : ''} exoplanet was detected ${year} using ${method}.`
    
    if (facility && facility !== 'Unknown') {
      narrative += ` The discovery was made using observations from ${facility}`
      if (instrument) {
        narrative += ` with the ${instrument} instrument`
      }
      narrative += '.'
    }
    
    if (planet.discoverymethod) {
      switch (planet.discoverymethod.toLowerCase()) {
        case 'transit':
        case 'transits':
          narrative += ` The transit method detects the slight dimming of the host star as the planet passes in front of it, providing valuable information about the planet's size and orbital characteristics.`
          break
        case 'radial velocity':
          narrative += ` The radial velocity method detects the gravitational influence of the planet on its host star, causing the star to 'wobble' slightly and revealing the planet's presence through Doppler shifts in the star's spectrum.`
          break
        case 'microlensing':
          narrative += ` Gravitational microlensing occurs when the planet and its star pass in front of a background star, creating a temporary magnification effect that reveals the planet's presence.`
          break
        case 'direct imaging':
          narrative += ` Direct imaging involves capturing actual light from the planet itself, a challenging technique that requires advanced coronagraph technology to block out the overwhelming light from the host star.`
          break
        case 'timing':
          narrative += ` The timing method detects planets by observing variations in the timing of periodic events, such as pulsar pulses or eclipses in binary star systems.`
          break
        default:
          narrative += ` This detection method has contributed valuable data to the growing catalog of known exoplanets.`
      }
    }
    
    if (planet.sy_dist) {
      const lightYears = planet.sy_dist * 3.26
      narrative += ` Located approximately ${lightYears.toFixed(1)} light-years from Earth, this discovery expands our knowledge of planetary systems in our cosmic neighborhood.`
    }
    
    return narrative
  }
  
  const narrative = createDiscoveryNarrative(planet)
  
  return (
    <div className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3">
          Discovery Story
        </h2>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
          How {planet.pl_name} was found and what makes this discovery significant
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main narrative */}
        <div className="lg:col-span-2">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 clip-corner-cut backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              The Discovery
            </h3>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {narrative}
              </p>
            </div>
            
            {/* Scientific reference */}
            {cleanReference && (
              <div className="mt-6 p-4 bg-light-surface/30 dark:bg-dark-surface/30 rounded-lg border border-light-border/50 dark:border-dark-border/50">
                <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Scientific Reference
                </h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
                  {cleanReference}
                </p>
                {referenceUrl && (
                  <button
                    onClick={() => window.open(referenceUrl, '_blank', 'noopener,noreferrer')}
                    className="btn-secondary text-sm inline-flex items-center gap-2"
                  >
                    Read Full Paper <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Discovery details sidebar */}
        <div className="space-y-6">
          {/* Key discovery facts */}
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 clip-corner-cut backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Discovery Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Date</p>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {discoveryDate}
                    {planet.disc_pubdate && planet.disc_year && planet.disc_pubdate !== String(planet.disc_year) && (
                      <span className="block text-xs opacity-75">Published: {planet.disc_pubdate}</span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Telescope className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Method</p>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {planet.discoverymethod || 'Unknown'}
                  </p>
                </div>
              </div>
              
              {discoveryFacility !== 'Unknown' && (
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Facility</p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {discoveryFacility}
                    </p>
                  </div>
                </div>
              )}
              
              {(planet as any).disc_instrument && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Instrument</p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {(planet as any).disc_instrument}
                    </p>
                  </div>
                </div>
              )}
              
              {planet.disc_locale && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Location</p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {planet.disc_locale}
                    </p>
                  </div>
                </div>
              )}
              
              {(planet as any).soltype && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Solution Type</p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {(planet as any).soltype}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Discovery method explanation */}
          {planet.discoverymethod && (
            <div className="bg-light-surface/30 dark:bg-dark-surface/30 p-4 rounded-lg border border-light-border dark:border-dark-border">
              <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                About {planet.discoverymethod}
              </h4>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {planet.discoverymethod.toLowerCase() === 'transit' || planet.discoverymethod.toLowerCase() === 'transits' ?
                  'The transit method detects planets by measuring the periodic dimming of a star as a planet passes in front of it. This technique can determine the planet\'s size, orbital period, and sometimes atmospheric composition.' :
                planet.discoverymethod.toLowerCase() === 'radial velocity' ?
                  'Radial velocity measurements detect the gravitational tug of an orbiting planet on its star, causing the star to wobble slightly. This wobble creates a Doppler shift in the star\'s light that can be measured with high precision.' :
                planet.discoverymethod.toLowerCase() === 'microlensing' ?
                  'Gravitational microlensing occurs when a planet and its star pass in front of a more distant star, causing the background star\'s light to be magnified in a characteristic way that reveals the planet\'s presence.' :
                planet.discoverymethod.toLowerCase() === 'direct imaging' ?
                  'Direct imaging involves capturing actual light from the planet itself, typically using advanced coronagraph technology to block the overwhelming glare from the host star.' :
                  'Each detection method provides unique insights into planetary systems and contributes to our understanding of how planets form and evolve.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

