'use client'

import { useState } from 'react'
import { SearchInterface } from '@/components/explorer/search-interface'
import { DataTable } from '@/components/explorer/data-table'
import VisualizationPanels from '@/components/explorer/visualization-panels'
import { DetailView } from '@/components/explorer/detail-view'
import { FilterPanel } from '@/components/explorer/filter-panel'
import { motion } from 'framer-motion'
import { Filter, Grid, BarChart3 } from 'lucide-react'

export default function ExplorerPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'visualizations'>('table')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Exoplanet Explorer
          </h1>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Discover and analyze thousands of confirmed exoplanets from NASA&apos;s archive
          </p>
        </motion.div>

        {/* Search Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <SearchInterface />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          {/* View Mode Toggle */}
          <div className="flex items-center bg-light-surface dark:bg-dark-surface rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                viewMode === 'table'
                  ? 'bg-primary-dark-blue text-white'
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <Grid className="h-4 w-4" />
              Table View
            </button>
            <button
              onClick={() => setViewMode('visualizations')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                viewMode === 'visualizations'
                  ? 'bg-primary-dark-blue text-white'
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Visualizations
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
              showFilters
                ? 'bg-primary-dark-blue text-white'
                : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <FilterPanel />
            </motion.div>
          )}

          {/* Main View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}
          >
            {viewMode === 'table' ? (
              <DataTable onPlanetSelect={setSelectedPlanet} />
            ) : (
              <VisualizationPanels />
            )}
          </motion.div>
        </div>

        {/* Detail View Modal */}
        {selectedPlanet && (
          <DetailView
            planetId={selectedPlanet}
            onClose={() => setSelectedPlanet(null)}
          />
        )}
      </div>
    </div>
  )
}
