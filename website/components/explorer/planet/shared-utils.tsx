import type { ExplorerPlanetRow } from '@/lib/csv-loader'

// Utility functions extracted from DetailView for use across planet components

export function stripHtml(input?: string): string {
  if (!input) return ''
  return input.replace(/<[^>]*>/g, '').trim()
}

export function extractAtUrl(ref?: string): string | null {
  if (!ref) return null
  const hrefMatch = ref.match(/href\s*=\s*['"]?([^'">\s]+)['"]?/i)
  if (hrefMatch && hrefMatch[1]) return `${hrefMatch[1]}`
  const urlMatch = ref.match(/https?:\/\/[^\s'">]+/i)
  if (urlMatch && urlMatch[0]) return `${urlMatch[0]}`
  return null
}

export function formatNum(n?: number, unit?: string) {
  if (n === undefined || n === null) return '—'
  return `${n}${unit ? ` ${unit}` : ''}`
}

export function formatValue(value: any) {
  if (typeof value === 'object' && value.value !== undefined) {
    return `${value.value}${value.unit ? ` ${value.unit}` : ''}${value.uncertainty ? ` ${value.uncertainty}` : ''}${value.estimated ? ' (est.)' : ''}`
  }
  return value
}

// Helper function to determine planet type based on radius
export function getPlanetType(planet: ExplorerPlanetRow): string {
  const radius = planet.pl_rade
  const mass = planet.pl_masse
  
  if (!radius) return 'Unknown'
  
  if (radius < 1.25) {
    return 'Terrestrial'
  } else if (radius < 2.0) {
    return 'Super Earth'
  } else if (radius < 6.0) {
    return 'Mini Neptune'
  } else if (radius < 14.0) {
    return 'Neptune-size'
  } else {
    return 'Jupiter-size'
  }
}

// Helper function to calculate habitability indicator
export function getHabitabilityIndicator(planet: ExplorerPlanetRow): {
  status: 'potentially-habitable' | 'too-hot' | 'too-cold' | 'unknown'
  description: string
} {
  const semiMajorAxis = planet.pl_orbsmax
  const starTeff = planet.st_teff
  
  if (!semiMajorAxis || !starTeff) {
    return {
      status: 'unknown',
      description: 'Insufficient data to determine habitability'
    }
  }
  
  // Simple habitability calculation based on effective temperature
  // This is a very basic approximation
  const habZoneInner = Math.sqrt(starTeff / 5778) * 0.95
  const habZoneOuter = Math.sqrt(starTeff / 5778) * 1.37
  
  if (semiMajorAxis >= habZoneInner && semiMajorAxis <= habZoneOuter) {
    return {
      status: 'potentially-habitable',
      description: 'Within the estimated habitable zone'
    }
  } else if (semiMajorAxis < habZoneInner) {
    return {
      status: 'too-hot',
      description: 'Too close to star - likely too hot for liquid water'
    }
  } else {
    return {
      status: 'too-cold',
      description: 'Too far from star - likely too cold for liquid water'
    }
  }
}

// Helper function to format discovery date
export function formatDiscoveryDate(planet: ExplorerPlanetRow): string {
  if (planet.disc_pubdate) {
    return planet.disc_pubdate
  } else if (planet.disc_year) {
    return String(planet.disc_year)
  }
  return 'Unknown'
}

// Helper function to get discovery facility display name
export function getDiscoveryFacility(planet: ExplorerPlanetRow): string {
  return planet.disc_telescope || planet.disc_facility || 'Unknown'
}
