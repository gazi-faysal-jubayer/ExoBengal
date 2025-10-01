'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'

interface NASAEyesCardProps {
  planet: ExplorerPlanetRow
}

// Extract the NASA Eyes URL generation function from ExternalLinks
const generateNASAEyesUrl = (planetName: string) => {
  // Convert planet name to NASA Eyes format (replace spaces with underscores)
  const formattedName = planetName.replace(/\s+/g, '_')
  return `https://eyes.nasa.gov/apps/exo/#/planet/${encodeURIComponent(formattedName)}`
}

export function NASAEyesCard({ planet }: NASAEyesCardProps) {
  const nasaEyesUrl = generateNASAEyesUrl(planet.pl_name)

  return (
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-light-border dark:border-dark-border">
        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
          NASA Eyes on Exoplanets
        </h3>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Interactive 3D visualization of {planet.pl_name}
        </p>
      </div>
      
      <div className="h-[500px]">
        <iframe
          src={nasaEyesUrl}
          title={`NASA Eyes on Exoplanets - ${planet.pl_name}`}
          className="w-full h-full border-0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>
      
      <div className="p-3 bg-light-surface/50 dark:bg-dark-surface/50">
        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">
          Powered by NASA's Jet Propulsion Laboratory
        </p>
      </div>
    </div>
  )
}
