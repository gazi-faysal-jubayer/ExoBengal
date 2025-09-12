'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Orbit, Thermometer, Ruler, Weight, Clock, ExternalLink, Heart, Share2 } from 'lucide-react'
import { useExplorerStore } from '@/lib/explorer-store'

interface DetailViewProps {
  planetId: string
  onClose: () => void
}

function formatNum(n?: number, unit?: string) {
  if (n === undefined || n === null) return '—'
  return `${n}${unit ? ` ${unit}` : ''}`
}

export function DetailView({ planetId, onClose }: DetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'physical' | 'orbital' | 'host-star' | 'habitability' | 'references'>('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const rows = useExplorerStore(s => s.rows)
  const planet = useMemo(() => rows.find(r => r.pl_name === planetId), [rows, planetId])

  if (!planet) {
    return null
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Star },
    { id: 'physical' as const, label: 'Physical', icon: Ruler },
    { id: 'orbital' as const, label: 'Orbital', icon: Orbit },
    { id: 'host-star' as const, label: 'Host Star', icon: Star },
    { id: 'habitability' as const, label: 'Habitability', icon: Thermometer },
    { id: 'references' as const, label: 'References', icon: ExternalLink },
  ]

  const formatValue = (value: any) => {
    if (typeof value === 'object' && value.value !== undefined) {
      return `${value.value}${value.unit ? ` ${value.unit}` : ''}${value.uncertainty ? ` ${value.uncertainty}` : ''}${value.estimated ? ' (est.)' : ''}`
    }
    return value
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Artist Conception */}
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg">Artist&apos;s Conception</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Discovery Story</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {planet.disc_refname || 'Discovered and cataloged in the NASA Exoplanet Archive.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Discovery Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Date:</span>
                    <span>{planet.disc_pubdate || (planet.disc_year ? String(planet.disc_year) : '—')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Method:</span>
                    <span>{planet.discoverymethod || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Telescope:</span>
                    <span>{planet.disc_telescope || planet.disc_facility || '—'}</span>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <h4 className="font-medium mb-2">Quick Facts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Radius:</span>
                    <span>{formatNum(planet.pl_rade, 'R⊕')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Period:</span>
                    <span>{formatNum(planet.pl_orbper, 'days')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Distance:</span>
                    <span>{formatNum(planet.sy_dist, 'pc')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'physical':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Physical Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4"><h4 className="font-medium mb-2">Radius</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_rade, 'R⊕')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Mass</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_masse, 'M⊕')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Radius (Jupiter)</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_radj, 'R♃')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Mass (Jupiter)</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_massj, 'M♃')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Equilibrium Temp</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum((planet as any).pl_eqt, 'K')}</p></div>
            </div>
          </div>
        )

      case 'orbital':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Orbital Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4"><h4 className="font-medium mb-2">Period</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbper, 'days')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Semi-Major Axis</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbsmax, 'AU')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Eccentricity</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbeccen)}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Inclination</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbincl, '°')}</p></div>
            </div>
          </div>
        )

      case 'host-star':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Host Star: {planet.hostname}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4"><h4 className="font-medium mb-2">Stellar Radius</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.st_rad, 'R☉')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Stellar Mass</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.st_mass, 'M☉')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Effective Temperature</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.st_teff, 'K')}</p></div>
            </div>
          </div>
        )

      case 'habitability':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Habitability Assessment</h3>
            <div className="space-y-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2">Habitable Zone Status</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gray-500`}></div>
                  <span>Not available from CSV</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'references':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scientific References</h3>
            <div className="space-y-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2">Reference</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                  {planet.disc_refname || '—'}
                </p>
                {planet.disc_refname && (
                  <a 
                    href="#"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm flex items-center gap-1"
                  >
                    Open Reference <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-light-card dark:bg-dark-card rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                  {planet.pl_name}
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {planet.hostname}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-md transition-colors ${
                    isFavorite 
                      ? 'text-semantic-warning' 
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-semantic-warning'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-light-border dark:border-dark-border">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-dark-blue text-primary-dark-blue dark:text-primary-light-blue'
                      : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {renderTabContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
