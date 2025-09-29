'use client'

import { Globe, Calendar, Telescope, Scale, Orbit, Timer, TrendingUp } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ExplorerPlanetRow } from '@/lib/csv-loader'
import { formatNum, getPlanetType, formatDiscoveryDate, getDiscoveryFacility } from './shared-utils'

interface KeyFactsGridProps {
  planet: ExplorerPlanetRow
}

interface FactCardProps {
  icon: ReactNode
  label: string
  value: string
  subtitle?: string
  highlight?: boolean
}

function FactCard({ icon, label, value, subtitle, highlight = false }: FactCardProps) {
  return (
    <div className={`relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 clip-corner-cut backdrop-blur-sm transition-all duration-200 hover:border-primary-light-blue/30 ${
      highlight ? 'ring-1 ring-primary-dark-blue/20 dark:ring-primary-light-blue/20' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary-dark-blue/10 dark:bg-primary-light-blue/10 text-primary-dark-blue dark:text-primary-light-blue">
          {icon}
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2 uppercase tracking-wide">
        {label}
      </h3>
      
      <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
        {value}
      </p>
      
      {subtitle && (
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function KeyFactsGrid({ planet }: KeyFactsGridProps) {
  const planetType = getPlanetType(planet)
  const discoveryDate = formatDiscoveryDate(planet)
  const discoveryFacility = getDiscoveryFacility(planet)
  
  // Helper function to format large numbers
  const formatLargeNumber = (num?: number, unit?: string): string => {
    if (!num || isNaN(num)) return '—'
    
    if (num < 0.001) {
      return `${(num * 1000).toFixed(3)} m${unit || ''}`
    } else if (num < 1) {
      return `${(num * 1000).toFixed(1)} m${unit || ''}`
    } else if (num > 1000) {
      return `${(num / 1000).toFixed(2)} k${unit || ''}`
    }
    
    return formatNum(num, unit)
  }
  
  // Calculate some derived values
  const earthRadii = planet.pl_rade
  const earthMasses = planet.pl_masse
  const period = planet.pl_orbper
  const semiMajorAxis = planet.pl_orbsmax
  const eccentricity = planet.pl_orbeccen
  
  const facts = [
    {
      icon: <Globe className="h-5 w-5" />,
      label: 'Planet Radius',
      value: earthRadii ? `${earthRadii.toFixed(3)}` : '—',
      subtitle: earthRadii ? 'Earth radii (R⊕)' : 'Data not available',
      highlight: true
    },
    {
      icon: <Scale className="h-5 w-5" />,
      label: 'Planet Type',
      value: planetType,
      subtitle: earthRadii && earthMasses ? 
        `Based on radius and mass ratios` : 
        'Classification based on available data'
    },
    {
      icon: <Telescope className="h-5 w-5" />,
      label: 'Discovery Method',
      value: planet.discoverymethod || 'Unknown',
      subtitle: discoveryFacility !== 'Unknown' ? `via ${discoveryFacility}` : undefined
    },
    {
      icon: <Scale className="h-5 w-5" />,
      label: 'Planet Mass',
      value: earthMasses ? `${earthMasses.toFixed(3)}` : '—',
      subtitle: earthMasses ? 'Earth masses (M⊕)' : 'Data not available'
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: 'Discovery Date',
      value: discoveryDate,
      subtitle: planet.disc_pubdate ? 'Publication date' : planet.disc_year ? 'Discovery year' : 'Date unknown'
    },
    {
      icon: <Orbit className="h-5 w-5" />,
      label: 'Orbital Radius',
      value: semiMajorAxis ? `${semiMajorAxis.toFixed(4)}` : '—',
      subtitle: semiMajorAxis ? 'Astronomical Units (AU)' : 'Data not available'
    },
    {
      icon: <Timer className="h-5 w-5" />,
      label: 'Orbital Period',
      value: period ? (
        period < 1 ? 
          `${(period * 24).toFixed(1)} hours` : 
          period < 365 ? 
            `${period.toFixed(1)} days` : 
            `${(period / 365.25).toFixed(2)} years`
      ) : '—',
      subtitle: period ? 'Time to complete one orbit' : 'Data not available'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: 'Eccentricity',
      value: eccentricity !== undefined && eccentricity !== null ? 
        eccentricity.toFixed(4) : '—',
      subtitle: eccentricity !== undefined && eccentricity !== null ? 
        (eccentricity === 0 ? 'Perfectly circular orbit' : 
         eccentricity < 0.1 ? 'Nearly circular orbit' :
         eccentricity < 0.5 ? 'Moderately elliptical orbit' :
         'Highly elliptical orbit') : 'Data not available'
    }
  ]
  
  return (
    <div className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3">
          Key Facts
        </h2>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
          Essential properties and characteristics of {planet.pl_name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {facts.map((fact, index) => (
          <FactCard
            key={index}
            icon={fact.icon}
            label={fact.label}
            value={fact.value}
            subtitle={fact.subtitle}
            highlight={fact.highlight}
          />
        ))}
      </div>
      
      {/* Additional context */}
      <div className="mt-8 p-6 bg-light-surface/30 dark:bg-dark-surface/30 rounded-lg border border-light-border dark:border-dark-border">
        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
          About These Measurements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <div>
            <p className="mb-2">
              <strong className="text-light-text-primary dark:text-dark-text-primary">Earth Radii (R⊕):</strong> 
              {' '}Comparison to Earth's radius (6,371 km). Values greater than 1 indicate larger planets.
            </p>
            <p>
              <strong className="text-light-text-primary dark:text-dark-text-primary">Earth Masses (M⊕):</strong> 
              {' '}Comparison to Earth's mass. Used to determine planet density and composition.
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong className="text-light-text-primary dark:text-dark-text-primary">Astronomical Units (AU):</strong> 
              {' '}Distance measurement where 1 AU = Earth-Sun distance (~150 million km).
            </p>
            <p>
              <strong className="text-light-text-primary dark:text-dark-text-primary">Eccentricity:</strong> 
              {' '}Measure of orbital shape. 0 = perfect circle, closer to 1 = more elliptical.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
