'use client'

import { useState } from 'react'
import { SearchInterface } from '@/components/explorer/search-interface'
import { DataTable } from '@/components/explorer/data-table'
import VisualizationPanels from '@/components/explorer/visualization-panels'
import { FilterPanel } from '@/components/explorer/filter-panel'
import { motion } from 'framer-motion'
import { Filter, Grid, BarChart3, Sparkles, Telescope } from 'lucide-react'

export default function ExplorerPage() {
  const [viewMode, setViewMode] = useState<'table' | 'visualizations'>('table')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="explorer-page-glass">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="explorer-header-glass rounded-2xl p-8 mb-8 clip-corner-cut explorer-entrance"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary-dark-blue/20 to-primary-light-blue/20 backdrop-blur-sm">
              <Telescope className="h-8 w-8 text-primary-dark-blue dark:text-primary-light-blue" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Exoplanet Explorer
              </h1>
              <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                <Sparkles className="h-4 w-4" />
                <span className="text-lg">
                  Discover and analyze thousands of confirmed exoplanets from NASA&apos;s archive
                </span>
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-primary-light-blue/30 to-transparent"></div>
        </motion.div>

        {/* Search Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8 relative z-[10000]"
        >
          <SearchInterface />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-wrap items-center gap-6 mb-8"
        >
          {/* View Mode Toggle */}
          <div className="view-mode-toggle-glass rounded-xl p-1.5 clip-corner-cut">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('table')}
                className={`toggle-button-glass flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium toggle-transition ${
                  viewMode === 'table' ? 'active' : ''
                }`}
                data-target-cursor="true"
              >
                <Grid className="h-4 w-4" />
                <span>Table View</span>
              </button>
              <button
                onClick={() => setViewMode('visualizations')}
                className={`toggle-button-glass flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium toggle-transition ${
                  viewMode === 'visualizations' ? 'active' : ''
                }`}
                data-target-cursor="true"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Visualizations</span>
              </button>
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle-glass flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium clip-corner-cut hover-scale-glass ${
              showFilters ? 'active' : ''
            }`}
            data-target-cursor="true"
          >
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
            {showFilters && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 rounded-full bg-primary-light-blue animate-pulse"
              />
            )}
          </button>

          {/* Filter Status Indicator */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-dark-blue/20 to-primary-light-blue/20 backdrop-blur-sm border border-primary-light-blue/30"
            >
              <span className="text-xs font-medium text-primary-dark-blue dark:text-primary-light-blue">
                Filters Active
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className={`explorer-grid-glass rounded-2xl p-4 transition-all duration-500 ${
          showFilters ? 'grid grid-cols-1 lg:grid-cols-4 gap-8' : 'grid grid-cols-1 gap-8'
        }`}>
          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-1"
            >
              <FilterPanel />
            </motion.div>
          )}

          {/* Main View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={`transition-all duration-500 ${
              showFilters ? 'lg:col-span-3' : 'lg:col-span-1'
            }`}
          >
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="visualization-fade"
            >
              {viewMode === 'table' ? (
                <DataTable />
              ) : (
                <VisualizationPanels />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary-light-blue/20 to-primary-cyan/10 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 80, repeat: Infinity, ease: "linear" },
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-primary-dark-blue/15 to-primary-very-dark-blue/10 blur-3xl"
          />
        </div>
      </div>
    </div>
  )
}
