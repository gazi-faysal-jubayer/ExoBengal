'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useExplorerStore } from '@/lib/explorer-store'
import { BarChart3, Orbit, Map, TrendingUp, Maximize2, Star, Globe, Satellite } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Three.js components to avoid SSR issues
const OrbitalSystemViewer = dynamic(() => import('./orbital-system-viewer'), {
  ssr: false,
  loading: () => <div className="h-96 loading-glass clip-corner-cut rounded-xl" />
})

const StatisticalCharts = dynamic(() => import('./statistical-charts'), {
  ssr: false,
  loading: () => <div className="h-96 loading-glass clip-corner-cut rounded-xl" />
})

const SkyMapViewer = dynamic(() => import('./sky-map-viewer'), {
  ssr: false,
  loading: () => <div className="h-96 loading-glass clip-corner-cut rounded-xl" />
})

const ParameterCorrelations = dynamic(() => import('./parameter-correlations'), {
  ssr: false,
  loading: () => <div className="h-96 loading-glass clip-corner-cut rounded-xl" />
})

type VisualizationType = '3d-orbital' | 'statistics' | 'sky-map' | 'correlations'

const visualizationTypes = [
  {
    id: '3d-orbital' as const,
    name: '3D Orbital Systems',
    icon: Orbit,
    description: 'Interactive 3D visualization of planetary systems',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 'statistics' as const,
    name: 'Statistical Charts',
    icon: BarChart3,
    description: 'Discovery trends and parameter distributions',
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: 'sky-map' as const,
    name: 'Sky Map',
    icon: Map,
    description: 'Celestial positions of exoplanets',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 'correlations' as const,
    name: 'Parameter Correlations',
    icon: TrendingUp,
    description: 'Relationship between planetary parameters',
    gradient: 'from-pink-500/20 to-rose-500/20',
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
    <div className="space-y-8">
      {/* Visualization Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {visualizationTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveVisualization(type.id)}
            className={`visualization-selector-glass p-6 text-left transition-all clip-corner-cut hover-scale-glass ${
              activeVisualization === type.id ? 'active' : ''
            }`}
            data-target-cursor="true"
          >
            <div className="relative">
              {/* Icon with gradient background */}
              <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${type.gradient} backdrop-blur-sm`}>
                <type.icon className={`h-6 w-6 transition-colors ${
                  activeVisualization === type.id
                    ? 'text-primary-dark-blue dark:text-primary-light-blue'
                    : 'text-light-text-secondary dark:text-dark-text-secondary'
                }`} />
              </div>
              
              {/* Active indicator */}
              {activeVisualization === type.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 w-3 h-3 bg-primary-light-blue rounded-full ring-2 ring-white/50 animate-pulse"
                />
              )}
            </div>

            <h3 className={`font-semibold mb-2 transition-colors ${
              activeVisualization === type.id
                ? 'text-primary-dark-blue dark:text-primary-light-blue'
                : 'text-light-text-primary dark:text-dark-text-primary'
            }`}>
              {type.name}
            </h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              {type.description}
            </p>
          </motion.button>
        ))}
      </motion.div>

      {/* Visualization Container */}
      <motion.div
        key={activeVisualization}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="visualization-container-glass overflow-hidden clip-corner-cut rounded-2xl"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-light-border/50 dark:border-dark-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-dark-blue/10 to-primary-light-blue/10 backdrop-blur-sm">
                {visualizationTypes.find(v => v.id === activeVisualization)?.icon && 
                  React.createElement(visualizationTypes.find(v => v.id === activeVisualization)!.icon, { 
                    className: "h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue" 
                  })
                }
              </div>
              <div>
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                  {visualizationTypes.find(v => v.id === activeVisualization)?.name}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {visualizationTypes.find(v => v.id === activeVisualization)?.description}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-lg filter-toggle-glass text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-light-blue transition-colors"
              title="Open in fullscreen"
            >
              <Maximize2 className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Visualization Content */}
        <div className="p-6">
          <motion.div
            key={activeVisualization}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="visualization-fade"
          >
            {renderVisualization()}
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { 
            value: '5,565', 
            label: 'Confirmed Exoplanets', 
            icon: Globe, 
            gradient: 'from-blue-500/20 to-cyan-500/20',
            color: 'text-blue-600 dark:text-blue-400'
          },
          { 
            value: '4,140', 
            label: 'Planetary Systems', 
            icon: Star, 
            gradient: 'from-purple-500/20 to-pink-500/20',
            color: 'text-purple-600 dark:text-purple-400'
          },
          { 
            value: '15', 
            label: 'Detection Methods', 
            icon: Satellite, 
            gradient: 'from-green-500/20 to-teal-500/20',
            color: 'text-green-600 dark:text-green-400'
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="stats-card-glass p-6 text-center clip-corner-cut rounded-xl hover-scale-glass"
          >
            <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${stat.gradient} backdrop-blur-sm`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <motion.p 
              className={`text-3xl font-bold mb-2 stats-glow ${stat.color}`}
              whileHover={{ scale: 1.05 }}
            >
              {stat.value}
            </motion.p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
