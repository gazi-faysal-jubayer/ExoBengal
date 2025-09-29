'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { Camera, Star, Sun, Telescope } from 'lucide-react'

interface PhotometryGridProps {
  planet: ExplorerPlanetRow
}

export function PhotometryGrid({ planet }: PhotometryGridProps) {
  // Check for available photometric data
  const photometricData = []
  
  // Stellar magnitude (if available)
  if ('st_vmag' in planet && planet.st_vmag) {
    photometricData.push({
      band: 'V',
      survey: 'Johnson',
      magnitude: planet.st_vmag,
      uncertainty: 'st_vmagerr' in planet ? planet.st_vmagerr : null,
      icon: Star
    })
  }
  
  if ('st_bmag' in planet && planet.st_bmag) {
    photometricData.push({
      band: 'B',
      survey: 'Johnson',
      magnitude: planet.st_bmag,
      uncertainty: 'st_bmagerr' in planet ? planet.st_bmagerr : null,
      icon: Star
    })
  }
  
  if ('st_jmag' in planet && planet.st_jmag) {
    photometricData.push({
      band: 'J',
      survey: '2MASS',
      magnitude: planet.st_jmag,
      uncertainty: 'st_jmagerr' in planet ? planet.st_jmagerr : null,
      icon: Telescope
    })
  }
  
  if ('st_hmag' in planet && planet.st_hmag) {
    photometricData.push({
      band: 'H',
      survey: '2MASS',
      magnitude: planet.st_hmag,
      uncertainty: 'st_hmagerr' in planet ? planet.st_hmagerr : null,
      icon: Telescope
    })
  }
  
  if ('st_kmag' in planet && planet.st_kmag) {
    photometricData.push({
      band: 'K',
      survey: '2MASS',
      magnitude: planet.st_kmag,
      uncertainty: 'st_kmagerr' in planet ? planet.st_kmagerr : null,
      icon: Telescope
    })
  }

  // Placeholder data for common surveys when not available
  const placeholderSurveys = [
    { survey: 'TESS', band: 'T', status: 'Check MAST', icon: Camera },
    { survey: 'Gaia', band: 'G', status: 'Check Gaia DR3', icon: Sun },
    { survey: 'WISE', band: 'W1-W4', status: 'Check IRSA', icon: Telescope },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Photometry
        </h2>

        {photometricData.length > 0 ? (
          <>
            {/* Available Photometry */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {photometricData.map((data, index) => {
                const Icon = data.icon
                return (
                  <div
                    key={index}
                    className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-primary-light-blue" />
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {data.survey}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                      {data.band} = {data.magnitude.toFixed(3)}
                    </p>
                    {data.uncertainty && (
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        ± {data.uncertainty.toFixed(3)}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Additional Survey Links */}
            <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
              Additional Photometric Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {placeholderSurveys.map((survey, index) => {
                const Icon = survey.icon
                return (
                  <div
                    key={index}
                    className="bg-light-surface/50 dark:bg-dark-surface/50 p-3 rounded-md flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                      <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
                        {survey.survey} ({survey.band})
                      </span>
                    </div>
                    <span className="text-xs text-primary-light-blue">
                      {survey.status}
                    </span>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            {/* No photometry available - show guidance */}
            <div className="bg-light-surface/50 dark:bg-dark-surface/50 p-6 rounded-lg">
              <Camera className="h-8 w-8 text-primary-light-blue mx-auto mb-3" />
              <p className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-4">
                Limited photometric data available in current dataset
              </p>
              
              <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">
                External Photometry Resources:
              </h3>
              
              <div className="space-y-2">
                {[
                  { name: 'TESS Input Catalog', desc: 'TESS magnitudes and stellar parameters' },
                  { name: 'Gaia DR3', desc: 'G, BP, RP magnitudes with high precision' },
                  { name: '2MASS Point Source Catalog', desc: 'Near-infrared J, H, K magnitudes' },
                  { name: 'WISE All-Sky Catalog', desc: 'Mid-infrared W1-W4 magnitudes' },
                  { name: 'Pan-STARRS', desc: 'grizy optical magnitudes' },
                ].map((resource, index) => (
                  <div key={index} className="p-3 bg-light-surface dark:bg-dark-surface rounded-md">
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {resource.name}
                    </p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {resource.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Color Index Information */}
        {photometricData.length >= 2 && (
          <div className="mt-6 p-4 bg-light-surface/50 dark:bg-dark-surface/50 rounded-lg">
            <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Color Indices
            </h3>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Color indices can be calculated from available magnitudes to determine stellar properties
              and identify the spectral type of the host star.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
