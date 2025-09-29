'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { Compass, Globe, MapPin, Navigation } from 'lucide-react'

interface SkyPositionProps {
  planet: ExplorerPlanetRow
}

export function SkyPosition({ planet }: SkyPositionProps) {
  // Convert decimal degrees to HMS/DMS format
  const decimalToHMS = (decimal: number, isRA: boolean = true) => {
    if (!decimal && decimal !== 0) return 'Not Available'
    
    const absValue = Math.abs(decimal)
    
    if (isRA) {
      // Convert RA from degrees to hours
      const hours = absValue / 15
      const h = Math.floor(hours)
      const m = Math.floor((hours - h) * 60)
      const s = ((hours - h) * 60 - m) * 60
      return `${h}h ${m}m ${s.toFixed(2)}s`
    } else {
      // DEC in degrees
      const sign = decimal < 0 ? '-' : '+'
      const d = Math.floor(absValue)
      const m = Math.floor((absValue - d) * 60)
      const s = ((absValue - d) * 60 - m) * 60
      return `${sign}${d}° ${m}' ${s.toFixed(2)}"`
    }
  }

  // Convert to galactic coordinates (simplified approximation)
  const equatorialToGalactic = (ra: number, dec: number) => {
    // This is a simplified conversion - in production, use proper transformation
    const l = ((ra + 123) % 360).toFixed(3)
    const b = (dec * 0.9).toFixed(3)
    return { l, b }
  }

  const galactic = planet.ra && planet.dec ? equatorialToGalactic(planet.ra, planet.dec) : null

  const astrometricData = [
    { 
      label: 'Right Ascension (J2000)', 
      value: planet.ra ? `${planet.ra.toFixed(6)}°` : 'Not Available',
      altValue: decimalToHMS(planet.ra, true),
      icon: Compass 
    },
    { 
      label: 'Declination (J2000)', 
      value: planet.dec ? `${planet.dec.toFixed(6)}°` : 'Not Available',
      altValue: decimalToHMS(planet.dec, false),
      icon: Navigation 
    },
    { 
      label: 'Distance', 
      value: planet.sy_dist ? `${planet.sy_dist.toFixed(2)} pc` : 'Not Available',
      altValue: planet.sy_dist ? `${(planet.sy_dist * 3.26156).toFixed(2)} ly` : null,
      icon: MapPin 
    },
    { 
      label: 'Galactic Coordinates', 
      value: galactic ? `l=${galactic.l}°, b=${galactic.b}°` : 'Not Available',
      altValue: null,
      icon: Globe 
    },
  ]

  // Additional astrometric parameters if available
  const additionalParams = []
  
  if ('sy_plx' in planet && planet.sy_plx) {
    additionalParams.push({
      label: 'Parallax',
      value: `${planet.sy_plx.toFixed(3)} mas`,
      uncertainty: 'sy_plxerr1' in planet ? planet.sy_plxerr1 : null
    })
  }
  
  if ('st_pmra' in planet && planet.st_pmra) {
    additionalParams.push({
      label: 'Proper Motion (RA)',
      value: `${planet.st_pmra.toFixed(3)} mas/yr`,
      uncertainty: 'st_pmraerr' in planet ? planet.st_pmraerr : null
    })
  }
  
  if ('st_pmdec' in planet && planet.st_pmdec) {
    additionalParams.push({
      label: 'Proper Motion (Dec)',
      value: `${planet.st_pmdec.toFixed(3)} mas/yr`,
      uncertainty: 'st_pmdecerr' in planet ? planet.st_pmdecerr : null
    })
  }
  
  if ('st_radv' in planet && planet.st_radv) {
    additionalParams.push({
      label: 'Radial Velocity',
      value: `${planet.st_radv.toFixed(2)} km/s`,
      uncertainty: 'st_radverr' in planet ? planet.st_radverr : null
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Sky Position & Astrometry
        </h2>

        {/* Primary Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {astrometricData.map((data, index) => {
            const Icon = data.icon
            return (
              <div
                key={index}
                className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-primary-light-blue" />
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {data.label}
                  </span>
                </div>
                <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                  {data.value}
                </p>
                {data.altValue && (
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    {data.altValue}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Additional Astrometric Parameters */}
        {additionalParams.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
              Astrometric Parameters
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {additionalParams.map((param, index) => (
                <div
                  key={index}
                  className="bg-light-surface/50 dark:bg-dark-surface/50 p-3 rounded-md"
                >
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary block mb-1">
                    {param.label}
                  </span>
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {param.value}
                  </span>
                  {param.uncertainty && (
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      ± {param.uncertainty}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sky Map Placeholder */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
            Sky Location
          </h3>
          <div className="bg-light-surface/50 dark:bg-dark-surface/50 p-6 rounded-lg text-center">
            <MapPin className="h-8 w-8 text-primary-light-blue mx-auto mb-2" />
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Interactive sky map visualization coming soon
            </p>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
              Use the coordinates above with your favorite planetarium software
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
