'use client'

import { Heart, Share2, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { ExplorerPlanetRow } from '@/lib/csv-loader'
import { stripHtml, getPlanetType } from './shared-utils'

interface PlanetHeroProps {
  planet: ExplorerPlanetRow
}

export function PlanetHero({ planet }: PlanetHeroProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  const planetType = getPlanetType(planet)
  
  // Generate a compelling overview based on available data
  const generateOverview = (planet: ExplorerPlanetRow): string => {
    const type = getPlanetType(planet)
    const method = planet.discoverymethod || 'an unknown method'
    const year = planet.disc_year ? `in ${planet.disc_year}` : 'recently'
    const host = planet.hostname || 'an unknown star'
    const facility = planet.disc_facility || planet.disc_telescope
    
    let overview = `${planet.pl_name} is ${type === 'Unknown' ? 'an exoplanet' : `a ${type.toLowerCase()} exoplanet`} discovered ${year} using ${method}`
    
    if (facility) {
      overview += ` by the ${facility}`
    }
    
    overview += `. This fascinating world orbits ${host}`
    
    if (planet.pl_orbper) {
      const period = planet.pl_orbper
      if (period < 1) {
        overview += ` in just ${(period * 24).toFixed(1)} hours`
      } else if (period < 365) {
        overview += ` every ${period.toFixed(1)} days`
      } else {
        overview += ` every ${(period / 365.25).toFixed(1)} years`
      }
    }
    
    if (planet.sy_dist) {
      overview += `, located approximately ${planet.sy_dist.toFixed(1)} parsecs (${(planet.sy_dist * 3.26).toFixed(1)} light-years) from Earth`
    }
    
    overview += '.'
    
    // Add radius information if available
    if (planet.pl_rade) {
      if (planet.pl_rade < 1) {
        overview += ` With a radius of ${planet.pl_rade.toFixed(2)} Earth radii, this world is smaller than our home planet.`
      } else if (planet.pl_rade > 1) {
        overview += ` This ${type.toLowerCase()} has a radius of ${planet.pl_rade.toFixed(2)} Earth radii, making it ${planet.pl_rade > 2 ? 'significantly' : 'moderately'} larger than Earth.`
      }
    }
    
    // Add mass information if available
    if (planet.pl_masse) {
      overview += ` Its mass is approximately ${planet.pl_masse.toFixed(2)} Earth masses.`
    }
    
    // Add temperature or stellar information
    if (planet.st_teff) {
      const temp = planet.st_teff
      if (temp < 3700) {
        overview += ` The host star is a cool red dwarf with a surface temperature of ${temp.toFixed(0)} K.`
      } else if (temp < 5200) {
        overview += ` The host star is an orange dwarf star with a surface temperature of ${temp.toFixed(0)} K.`
      } else if (temp < 6000) {
        overview += ` The host star is similar to our Sun, with a surface temperature of ${temp.toFixed(0)} K.`
      } else {
        overview += ` The host star is hotter than our Sun, with a surface temperature of ${temp.toFixed(0)} K.`
      }
    }
    
    return overview
  }
  
  const overview = generateOverview(planet)
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${planet.pl_name} - ExoBengal`,
          text: `Discover ${planet.pl_name}, a fascinating exoplanet in the ${planet.hostname} system.`,
          url: window.location.href,
        })
      } catch (err) {
        // Fall back to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fall back to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }
  
  return (
    <div className="relative overflow-hidden pl-6 pr-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark-blue/20 via-primary-light-blue/10 to-transparent"></div>
      
      <div className="relative z-10 py-12 md:py-16 pl-4 ml-2">
        {/* Breadcrumb navigation */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <li>
              <a 
                href="/explorer" 
                className="hover:text-primary-dark-blue dark:hover:text-primary-light-blue transition-colors"
              >
                Explorer
              </a>
            </li>
            <ChevronRight className="h-4 w-4" />
            <li>
              <a 
                href="/explorer" 
                className="hover:text-primary-dark-blue dark:hover:text-primary-light-blue transition-colors"
              >
                Planets
              </a>
            </li>
            <ChevronRight className="h-4 w-4" />
            <li className="text-light-text-primary dark:text-dark-text-primary font-medium">
              {planet.pl_name}
            </li>
          </ol>
        </nav>
        
        {/* Main hero content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex-1">
            {/* Planet name and host star */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3 leading-tight">
                {planet.pl_name}
              </h1>
              
              {planet.hostname && (
                <p className="text-xl md:text-2xl text-primary-dark-blue dark:text-primary-light-blue font-medium">
                  {planet.hostname} System
                </p>
              )}
              
              <div className="flex items-center gap-4 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-dark-blue/10 dark:bg-primary-light-blue/10 text-primary-dark-blue dark:text-primary-light-blue border border-primary-dark-blue/20 dark:border-primary-light-blue/20">
                  {planetType}
                </span>
                
                {planet.discoverymethod && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-light-surface/50 dark:bg-dark-surface/50 text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border">
                    {planet.discoverymethod}
                  </span>
                )}
              </div>
            </div>
            
            {/* Overview paragraph */}
            <div className="mb-8">
              <p className="text-lg md:text-xl leading-relaxed text-light-text-secondary dark:text-dark-text-secondary max-w-4xl">
                {overview}
              </p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3 lg:flex-col lg:items-end">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-lg transition-all duration-200 ${
                isFavorite 
                  ? 'bg-semantic-warning/10 text-semantic-warning border border-semantic-warning/30' 
                  : 'bg-light-surface/50 dark:bg-dark-surface/50 text-light-text-secondary dark:text-dark-text-secondary hover:text-semantic-warning hover:bg-semantic-warning/5 border border-light-border dark:border-dark-border hover:border-semantic-warning/30'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-3 rounded-lg bg-light-surface/50 dark:bg-dark-surface/50 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover border border-light-border dark:border-dark-border transition-all duration-200"
              title="Share this planet"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
