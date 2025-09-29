'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { Activity, Flame, Gauge, Mountain, Orbit, Star, Sun, Zap } from 'lucide-react'
import { formatNum } from './shared-utils'
import { NeonGlowBackground } from '@/components/ui/neon-glow-background'

interface StellarParametersProps {
  planet: ExplorerPlanetRow
}

export function StellarParameters({ planet }: StellarParametersProps) {
  // Primary stellar parameters
  const primaryParams = [
    {
      label: 'Effective Temperature',
      value: planet.st_teff,
      unit: 'K',
      icon: Flame,
      uncertainty: 'st_tefferr1' in planet ? planet.st_tefferr1 : null,
      description: 'Surface temperature of the star'
    },
    {
      label: 'Stellar Radius',
      value: planet.st_rad,
      unit: 'R☉',
      icon: Sun,
      uncertainty: 'st_raderr1' in planet ? planet.st_raderr1 : null,
      description: 'Radius relative to the Sun'
    },
    {
      label: 'Stellar Mass',
      value: planet.st_mass,
      unit: 'M☉',
      icon: Mountain,
      uncertainty: 'st_masserr1' in planet ? planet.st_masserr1 : null,
      description: 'Mass relative to the Sun'
    },
    {
      label: 'Surface Gravity',
      value: 'st_logg' in planet ? planet.st_logg : null,
      unit: 'log g',
      icon: Gauge,
      uncertainty: 'st_loggerr1' in planet ? planet.st_loggerr1 : null,
      description: 'Logarithm of surface gravity'
    },
  ]

  // Secondary stellar parameters
  const secondaryParams = []
  
  if ('st_met' in planet && planet.st_met !== null && planet.st_met !== undefined) {
    secondaryParams.push({
      label: 'Metallicity [Fe/H]',
      value: planet.st_met,
      unit: 'dex',
      uncertainty: 'st_meterr1' in planet ? planet.st_meterr1 : null
    })
  }
  
  if ('st_lum' in planet && planet.st_lum) {
    secondaryParams.push({
      label: 'Luminosity',
      value: planet.st_lum,
      unit: 'log(L☉)',
      uncertainty: 'st_lumerr1' in planet ? planet.st_lumerr1 : null
    })
  }
  
  if ('st_age' in planet && planet.st_age) {
    secondaryParams.push({
      label: 'Stellar Age',
      value: planet.st_age,
      unit: 'Gyr',
      uncertainty: 'st_ageerr1' in planet ? planet.st_ageerr1 : null
    })
  }
  
  if ('st_vsin' in planet && planet.st_vsin) {
    secondaryParams.push({
      label: 'Rotation Velocity',
      value: planet.st_vsin,
      unit: 'km/s',
      uncertainty: 'st_vsinerr1' in planet ? planet.st_vsinerr1 : null
    })
  }
  
  if ('st_rotp' in planet && planet.st_rotp) {
    secondaryParams.push({
      label: 'Rotation Period',
      value: planet.st_rotp,
      unit: 'days',
      uncertainty: 'st_rotperr1' in planet ? planet.st_rotperr1 : null
    })
  }

  // Derive spectral type from temperature if available
  const getSpectralType = (teff: number | null | undefined) => {
    if (!teff) return 'Unknown'
    if (teff > 30000) return 'O-type (Blue supergiant)'
    if (teff > 10000) return 'B-type (Blue-white)'
    if (teff > 7500) return 'A-type (White)'
    if (teff > 6000) return 'F-type (Yellow-white)'
    if (teff > 5200) return 'G-type (Yellow, Sun-like)'
    if (teff > 3700) return 'K-type (Orange)'
    if (teff > 2400) return 'M-type (Red dwarf)'
    return 'L/T/Y-type (Brown dwarf)'
  }

  const spectralType = getSpectralType(planet.st_teff)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <NeonGlowBackground className="absolute inset-0" />
      <div className="relative z-10 p-6">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Stellar Parameters
        </h2>

        {/* Spectral Type Banner */}
        <div className="bg-gradient-to-r from-primary-dark-blue/20 to-primary-light-blue/20 p-4 rounded-lg mb-6 flex items-center gap-3">
          <Star className="h-6 w-6 text-primary-light-blue" />
          <div>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Spectral Classification
            </p>
            <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
              {spectralType}
            </p>
          </div>
        </div>

        {/* Primary Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {primaryParams.map((param, index) => {
            const Icon = param.icon
            return (
              <div
                key={index}
                className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-primary-light-blue" />
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {param.label}
                  </span>
                </div>
                <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                  {param.value !== null && param.value !== undefined ? (
                    <>
                      {formatNum(param.value)} {param.unit}
                      {param.uncertainty && (
                        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary ml-2">
                          ± {formatNum(param.uncertainty)}
                        </span>
                      )}
                    </>
                  ) : (
                    'Not Available'
                  )}
                </p>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                  {param.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Secondary Parameters */}
        {secondaryParams.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
              Additional Stellar Properties
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {secondaryParams.map((param, index) => (
                <div
                  key={index}
                  className="bg-light-surface/50 dark:bg-dark-surface/50 p-3 rounded-md"
                >
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary block mb-1">
                    {param.label}
                  </span>
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {formatNum(param.value)} {param.unit}
                    {param.uncertainty && (
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-1">
                        ± {formatNum(param.uncertainty)}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Activity Indicators */}
        <div className="p-4 bg-light-surface/50 dark:bg-dark-surface/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-primary-light-blue" />
            <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
              Stellar Activity & Evolution
            </h3>
          </div>
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
            Stellar parameters help determine the evolutionary stage and habitability potential of the system.
            {planet.st_age && planet.st_age > 1 && (
              <span className="block mt-1">
                This {planet.st_age.toFixed(1)} Gyr old star is {planet.st_age > 4.5 ? 'older' : 'younger'} than our Sun.
              </span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  )
}


