'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { Fingerprint, Hash, Tag } from 'lucide-react'
import { BackgroundBeams } from '@/components/ui/background-beams'

interface TargetIdentifiersProps {
  planet: ExplorerPlanetRow
}

export function TargetIdentifiers({ planet }: TargetIdentifiersProps) {
  // Extract identifiers from various possible fields in the data
  const identifiers = [
    { label: 'Planet Name', value: planet.pl_name, icon: Tag },
    { label: 'Host Star', value: planet.hostname, icon: Hash },
    { label: 'Discovery Facility', value: planet.disc_facility || planet.disc_telescope, icon: Fingerprint },
  ]

  // Additional identifiers that might be present in the data
  const additionalIdentifiers = []
  
  // Check for TIC ID (TESS Input Catalog)
  if ('tic_id' in planet && planet.tic_id) {
    additionalIdentifiers.push({ label: 'TIC ID', value: planet.tic_id })
  }
  
  // Check for TOI ID (TESS Object of Interest)
  if ('toi_id' in planet && planet.toi_id) {
    additionalIdentifiers.push({ label: 'TOI ID', value: planet.toi_id })
  }
  
  // Check for KOI ID (Kepler Object of Interest)
  if ('koi_id' in planet && planet.koi_id) {
    additionalIdentifiers.push({ label: 'KOI ID', value: planet.koi_id })
  }
  
  // Check for KIC ID (Kepler Input Catalog)
  if ('kic_id' in planet && planet.kic_id) {
    additionalIdentifiers.push({ label: 'KIC ID', value: planet.kic_id })
  }
  
  // Check for 2MASS ID
  if ('2mass_id' in planet && planet['2mass_id']) {
    additionalIdentifiers.push({ label: '2MASS ID', value: planet['2mass_id'] })
  }
  
  // Check for Gaia DR3 ID
  if ('gaia_id' in planet && planet.gaia_id) {
    additionalIdentifiers.push({ label: 'Gaia DR3 ID', value: planet.gaia_id })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <BackgroundBeams className="absolute inset-0 opacity-55 dark:opacity-65" />
      <div className="relative z-10 p-6">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Target Identifiers
        </h2>

        {/* Primary Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {identifiers.map((id, index) => {
            const Icon = id.icon
            return (
              <div
                key={index}
                className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-primary-light-blue" />
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {id.label}
                  </span>
                </div>
                <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                  {id.value || 'Not Available'}
                </p>
              </div>
            )
          })}
        </div>

        {/* Additional Catalog Identifiers */}
        {additionalIdentifiers.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
              Catalog Cross-References
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {additionalIdentifiers.map((id, index) => (
                <div
                  key={index}
                  className="bg-light-surface/50 dark:bg-dark-surface/50 p-3 rounded-md"
                >
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary block mb-1">
                    {id.label}
                  </span>
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {id.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Note about missing identifiers */}
        {additionalIdentifiers.length === 0 && (
          <div className="mt-4 p-4 bg-light-surface/50 dark:bg-dark-surface/50 rounded-lg">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Additional catalog identifiers (TIC, TOI, KOI, Gaia, etc.) may be available in external databases.
              Cross-reference this target using the coordinates or host star name for more complete identification.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}


