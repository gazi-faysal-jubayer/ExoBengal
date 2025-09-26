'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useExplorerStore } from '@/lib/explorer-store'
import { BarChart3, Orbit, Map, TrendingUp, Maximize2 } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Three.js components to avoid SSR issues
const OrbitalSystemViewer = dynamic(() => import('./orbital-system-viewer'), {
  ssr: false,
  loading: () => <div className="h-96 bg-light-surface dark:bg-dark-surface animate-pulse clip-corner-cut" />
})

const StatisticalCharts = dynamic(() => import('./statistical-charts'), {
  ssr: false,
  loading: () => <div className="h-96 bg-light-surface dark:bg-dark-surface animate-pulse clip-corner-cut" />
})

const SkyMapViewer = dynamic(() => import('./sky-map-viewer'), {
  ssr: false,
  loading: () => <div className="h-96 bg-light-surface dark:bg-dark-surface animate-pulse clip-corner-cut" />
})

const ParameterCorrelations = dynamic(() => import('./parameter-correlations'), {
  ssr: false,
  loading: () => <div className="h-96 bg-light-surface dark:bg-dark-surface animate-pulse clip-corner-cut" />
})

type VisualizationType = '3d-orbital' | 'statistics' | 'sky-map' | 'correlations'

const visualizationTypes = [
  {
    id: '3d-orbital' as const,
    name: '3D Orbital Systems',
    icon: Orbit,
    description: 'Interactive 3D visualization of planetary systems',
  },
  {
    id: 'statistics' as const,
    name: 'Statistical Charts',
    icon: BarChart3,
    description: 'Discovery trends and parameter distributions',
  },
  {
    id: 'sky-map' as const,
    name: 'Sky Map',
    icon: Map,
    description: 'Celestial positions of exoplanets',
  },
  {
    id: 'correlations' as const,
    name: 'Parameter Correlations',
    icon: TrendingUp,
    description: 'Relationship between planetary parameters',
  },
]

export default function VisualizationPanels() {
  const loadRows = useExplorerStore(s => s.loadRows)
  useEffect(() => { loadRows() }, [loadRows])
  const [activeVisualization, setActiveVisualization] = useState<VisualizationType>('3d-orbital')

  const renderVisualization = () => {
    switch (activeVisualization) {
      case '3d-orbital':
        return <OrbitalSystemViewer />
      case 'statistics':
        return <StatisticalCharts />
      case 'sky-map':
        return <SkyMapViewer />
      case 'correlations':
        return <ParameterCorrelations />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Visualization Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visualizationTypes.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveVisualization(type.id)}
            className={`p-4 border text-left transition-all clip-corner-cut backdrop-blur-sm ${
              activeVisualization === type.id
                ? 'border-primary-dark-blue bg-primary-dark-blue/10 dark:bg-primary-dark-blue/20 shadow-lg'
                : 'border-light-border dark:border-dark-border hover:border-primary-light-blue hover:bg-light-hover dark:hover:bg-dark-hover'
            }`}
          >
            <type.icon className={`h-6 w-6 mb-2 ${
              activeVisualization === type.id
                ? 'text-primary-dark-blue'
                : 'text-light-text-secondary dark:text-dark-text-secondary'
            }`} />
            <h3 className={`font-medium mb-1 ${
              activeVisualization === type.id
                ? 'text-primary-dark-blue'
                : 'text-light-text-primary dark:text-dark-text-primary'
            }`}>
              {type.name}
            </h3>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              {type.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Visualization Container */}
      <motion.div
        key={activeVisualization}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
      >
        {/* Header */}
        <div className="p-4 border-b border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              {visualizationTypes.find(v => v.id === activeVisualization)?.name}
            </h3>
            <button
              className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-light-blue transition-colors"
              title="Open in fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Visualization Content */}
        <div className="p-4">
          {renderVisualization()}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4 text-center clip-corner-cut backdrop-blur-sm">
          <p className="text-2xl font-bold text-primary-dark-blue">5,565</p>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Confirmed Exoplanets
          </p>
        </div>
        <div className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4 text-center clip-corner-cut backdrop-blur-sm">
          <p className="text-2xl font-bold text-primary-dark-blue">4,140</p>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Planetary Systems
          </p>
        </div>
        <div className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4 text-center clip-corner-cut backdrop-blur-sm">
          <p className="text-2xl font-bold text-primary-dark-blue">15</p>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Detection Methods
          </p>
        </div>
      </div>
    </div>
  )
}
