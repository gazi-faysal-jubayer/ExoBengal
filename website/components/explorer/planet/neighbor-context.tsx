'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { AlertTriangle, Circle, Eye, Grid, Info, MapPin, Telescope } from 'lucide-react'

interface NeighborContextProps {
  planet: ExplorerPlanetRow
}

export function NeighborContext({ planet }: NeighborContextProps) {
  // Mock neighbor data (in a real app, this would come from a proper catalog query)
  const mockNeighbors = [
    {
      name: 'Field Star 1',
      separation: 15.2,
      magnitude: 18.5,
      deltaMag: 6.2,
      contamination: 'Low'
    },
    {
      name: 'Field Star 2', 
      separation: 42.8,
      magnitude: 16.3,
      deltaMag: 4.0,
      contamination: 'Negligible'
    }
  ]

  // Stellar density estimation based on galactic coordinates
  const estimateStellarDensity = () => {
    if (!planet.ra || !planet.dec) return 'Unknown'
    
    // Very simplified density estimation
    const galacticLat = Math.abs(planet.dec)
    if (galacticLat < 10) return 'High (near galactic plane)'
    if (galacticLat < 30) return 'Moderate'
    return 'Low (high galactic latitude)'
  }

  const stellarDensity = estimateStellarDensity()

  // Contamination assessment
  const contaminationFactors = [
    {
      factor: 'Aperture Size',
      description: 'TESS: 21" pixels may include multiple stars',
      impact: 'Medium',
      icon: Circle
    },
    {
      factor: 'Stellar Crowding',
      description: `Field density: ${stellarDensity}`,
      impact: stellarDensity.includes('High') ? 'High' : 'Low',
      icon: Grid
    },
    {
      factor: 'Background Sources',
      description: 'Check for galaxies or nebulae in field',
      impact: 'Variable',
      icon: Telescope
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Neighbor Context & Contamination
        </h2>

        {/* Contamination Warning */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                Contamination Assessment Required
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-200">
                Transit and radial velocity measurements can be affected by nearby stars. 
                Always verify the isolation of the target star for accurate planet parameters.
              </p>
            </div>
          </div>
        </div>

        {/* Known Neighbors */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
            Nearby Sources (within 1 arcmin)
          </h3>
          
          {mockNeighbors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-light-border dark:border-dark-border">
                    <th className="text-left p-2 text-light-text-secondary dark:text-dark-text-secondary">Source</th>
                    <th className="text-left p-2 text-light-text-secondary dark:text-dark-text-secondary">Separation</th>
                    <th className="text-left p-2 text-light-text-secondary dark:text-dark-text-secondary">Magnitude</th>
                    <th className="text-left p-2 text-light-text-secondary dark:text-dark-text-secondary">ΔMag</th>
                    <th className="text-left p-2 text-light-text-secondary dark:text-dark-text-secondary">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {mockNeighbors.map((neighbor, index) => (
                    <tr key={index} className="border-b border-light-border/50 dark:border-dark-border/50">
                      <td className="p-2 text-light-text-primary dark:text-dark-text-primary">{neighbor.name}</td>
                      <td className="p-2">{neighbor.separation}"</td>
                      <td className="p-2">{neighbor.magnitude}</td>
                      <td className="p-2">{neighbor.deltaMag}</td>
                      <td className="p-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          neighbor.contamination === 'Low' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : neighbor.contamination === 'Negligible'
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                        }`}>
                          {neighbor.contamination}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-light-surface/50 dark:bg-dark-surface/50 p-4 rounded-lg text-center">
              <MapPin className="h-6 w-6 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-2" />
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                No detailed neighbor catalog available. Check external databases for field analysis.
              </p>
            </div>
          )}
        </div>

        {/* Contamination Factors */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
            Contamination Factors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {contaminationFactors.map((factor, index) => {
              const Icon = factor.icon
              return (
                <div key={index} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-primary-light-blue" />
                    <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {factor.factor}
                    </span>
                  </div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">
                    {factor.description}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Impact:</span>
                    <span className={`text-xs font-medium ${
                      factor.impact === 'High' 
                        ? 'text-red-600 dark:text-red-400'
                        : factor.impact === 'Medium'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {factor.impact}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Resources for Neighbor Analysis */}
        <div className="p-4 bg-light-surface/50 dark:bg-dark-surface/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-primary-light-blue" />
            <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
              Tools for Neighbor Analysis
            </h3>
          </div>
          <ul className="text-xs text-light-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>• <span className="font-medium">Gaia DR3:</span> High-precision positions and proper motions</li>
            <li>• <span className="font-medium">TESS TPF:</span> Target Pixel Files show all flux sources</li>
            <li>• <span className="font-medium">High-resolution imaging:</span> Speckle, AO, or HST observations</li>
            <li>• <span className="font-medium">Centroid analysis:</span> Check for position shifts during transit</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
