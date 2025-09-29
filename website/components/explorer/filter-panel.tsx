'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RotateCcw, Save, ChevronDown, ChevronUp, Telescope, Globe, Star, Tag, Filter } from 'lucide-react'
import { useExplorerStore, type ExplorerFilters } from '@/lib/explorer-store'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

interface FilterState {
  discoveryMethod: string[]
  yearRange: [number, number]
  radiusRange: [number, number]
  massRange: [number, number]
  temperatureRange: [number, number]
  hostStarType: string[]
  disposition: string[]
  habitable: boolean | null
}

// Import the canonical defaults from the store
const getCanonicalDefaults = () => {
  const storeDefaults = {
    discoveryMethod: [],
    yearRange: [1992, new Date().getFullYear()],
    radiusRange: [0, 100],
    massRange: [0, 10000],
    disposition: [],
  }
  return {
    ...storeDefaults,
    temperatureRange: [0, 3000],
    hostStarType: [],
    habitable: null,
  }
}

const defaultFilters: FilterState = getCanonicalDefaults()

const discoveryMethods = [
  'Transit',
  'Radial Velocity',
  'Microlensing',
  'Direct Imaging',
  'Astrometry',
  'Transit Timing Variations',
  'Orbital Brightness Modulation',
]

const starTypes = ['M', 'K', 'G', 'F', 'A', 'B', 'O']

const dispositions = [
  'Confirmed',
  'Candidate',
  'False Positive',
  'Controversial',
]

export function FilterPanel() {
  const storeFilters = useExplorerStore(s => s.filters)
  const setStoreFilters = useExplorerStore(s => s.setFilters)
  const [filters, setFilters] = useState<FilterState>({ ...defaultFilters, ...storeFilters })
  
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    discovery: true,
    physical: true,
    stellar: true,
    classification: true,
  })

  useEffect(() => {
    setFilters(prev => ({ ...prev, ...storeFilters }))
  }, [storeFilters])

  const updateFilter = <T extends keyof FilterState>(
    key: T,
    value: FilterState[T]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = <T extends string>(
    key: keyof FilterState,
    value: T
  ) => {
    const currentArray = filters[key] as T[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray as FilterState[typeof key])
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
    setStoreFilters(defaultFilters as unknown as ExplorerFilters)
  }

  const saveFilters = () => {
    // Save to localStorage or user preferences
    localStorage.setItem('exoplanet-filters', JSON.stringify(filters))
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const applyPreset = (preset: 'habitable' | 'recent' | 'large') => {
    switch (preset) {
      case 'habitable':
        setFilters(prev => ({ ...prev, habitable: true, temperatureRange: [175, 315] }))
        break
      case 'recent':
        setFilters(prev => ({ ...prev, yearRange: [2020, new Date().getFullYear()] }))
        break
      case 'large':
        setFilters(prev => ({ ...prev, radiusRange: [4, 50], massRange: [10, 500] }))
        break
    }
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.discoveryMethod.length > 0) count++
    if (filters.yearRange[0] !== defaultFilters.yearRange[0] || filters.yearRange[1] !== defaultFilters.yearRange[1]) count++
    if (filters.radiusRange[0] !== defaultFilters.radiusRange[0] || filters.radiusRange[1] !== defaultFilters.radiusRange[1]) count++
    if (filters.massRange[0] !== defaultFilters.massRange[0] || filters.massRange[1] !== defaultFilters.massRange[1]) count++
    if (filters.temperatureRange[0] !== defaultFilters.temperatureRange[0] || filters.temperatureRange[1] !== defaultFilters.temperatureRange[1]) count++
    if (filters.hostStarType.length > 0) count++
    if (filters.disposition.length > 0) count++
    if (filters.habitable !== null) count++
    return count
  }

  return (
    <div className="filter-panel-glass glass-panel p-6 space-y-6 rounded-lg">
      {/* Header with enhanced styling */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-dark-blue/20 to-primary-light-blue/20 border border-primary-light-blue/30">
            <Filter className="h-5 w-5 text-primary-light-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              Filters
            </h3>
            {getActiveFilterCount() > 0 && (
              <span className="filter-badge inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-light-blue/20 text-primary-dark-blue dark:text-primary-light-blue border border-primary-light-blue/30">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LiquidButton
            onClick={saveFilters}
            size="icon"
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-light-blue cursor-target glass-hover"
            title="Save filters"
          >
            <Save className="h-4 w-4" />
          </LiquidButton>
          <LiquidButton
            onClick={resetFilters}
            size="icon"
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-semantic-warning cursor-target glass-hover"
            title="Reset filters"
          >
            <RotateCcw className="h-4 w-4" />
          </LiquidButton>
        </div>
      </div>

      {/* Quick Preset Filters */}
      <div className="filter-section p-4 rounded-lg border border-light-border dark:border-dark-border bg-gradient-to-br from-white/50 to-white/30 dark:from-dark-surface/50 dark:to-dark-surface/30">
        <h4 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-primary-light-blue" />
          Quick Presets
        </h4>
        <div className="flex flex-wrap gap-2">
          <LiquidButton
            onClick={() => applyPreset('habitable')}
            size="sm"
            className="filter-preset-button text-xs px-3 py-1"
          >
            Habitable Zone
          </LiquidButton>
          <LiquidButton
            onClick={() => applyPreset('recent')}
            size="sm"
            className="filter-preset-button text-xs px-3 py-1"
          >
            Recent Discoveries
          </LiquidButton>
          <LiquidButton
            onClick={() => applyPreset('large')}
            size="sm"
            className="filter-preset-button text-xs px-3 py-1"
          >
            Large Planets
          </LiquidButton>
        </div>
      </div>

      {/* Discovery Parameters Section */}
      <div className="filter-section">
        <button
          onClick={() => toggleSection('discovery')}
          className="section-header w-full flex items-center justify-between p-4 rounded-lg border border-light-border dark:border-dark-border bg-gradient-to-br from-white/50 to-white/30 dark:from-dark-surface/50 dark:to-dark-surface/30 hover:from-white/60 hover:to-white/40 dark:hover:from-dark-surface/60 dark:hover:to-dark-surface/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <Telescope className="h-5 w-5 text-primary-light-blue" />
            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
              Discovery Parameters
            </h4>
            {(filters.discoveryMethod.length > 0 || filters.yearRange[0] !== defaultFilters.yearRange[0] || filters.yearRange[1] !== defaultFilters.yearRange[1]) && (
              <span className="filter-badge px-2 py-1 rounded-full text-xs font-medium bg-primary-light-blue/20 text-primary-dark-blue dark:text-primary-light-blue border border-primary-light-blue/30">
                {filters.discoveryMethod.length + (filters.yearRange[0] !== defaultFilters.yearRange[0] || filters.yearRange[1] !== defaultFilters.yearRange[1] ? 1 : 0)}
              </span>
            )}
          </div>
          {expandedSections.discovery ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        <AnimatePresence>
          {expandedSections.discovery && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="section-content overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {/* Discovery Method */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Discovery Method
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {discoveryMethods.map(method => (
                      <label key={method} className="glass-checkbox flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-white/20 dark:hover:bg-dark-surface/20 transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.discoveryMethod.includes(method)}
                          onChange={() => toggleArrayFilter('discoveryMethod', method)}
                          className="w-4 h-4 rounded border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 text-primary-dark-blue focus:ring-2 focus:ring-primary-light-blue/50"
                        />
                        <span className={`text-sm transition-colors ${filters.discoveryMethod.includes(method) ? 'text-primary-dark-blue dark:text-primary-light-blue font-medium filter-active' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
                          {method}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Discovery Year Range */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Discovery Year
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={filters.yearRange[0]}
                        onChange={(e) => updateFilter('yearRange', [
                          Number(e.target.value),
                          filters.yearRange[1]
                        ])}
                        min={1992}
                        max={new Date().getFullYear()}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        to
                      </span>
                      <input
                        type="number"
                        value={filters.yearRange[1]}
                        onChange={(e) => updateFilter('yearRange', [
                          filters.yearRange[0],
                          Number(e.target.value)
                        ])}
                        min={1992}
                        max={new Date().getFullYear()}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={1992}
                        max={new Date().getFullYear()}
                        value={filters.yearRange[0]}
                        onChange={(e) => updateFilter('yearRange', [
                          Number(e.target.value),
                          filters.yearRange[1]
                        ])}
                        className="glass-range-slider w-full h-2 bg-gradient-to-r from-primary-dark-blue/20 to-primary-light-blue/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="range-indicator absolute top-0 left-0 h-2 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue rounded-lg pointer-events-none" 
                           style={{ width: `${((filters.yearRange[0] - 1992) / (new Date().getFullYear() - 1992)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Physical Properties Section */}
      <div className="filter-section">
        <button
          onClick={() => toggleSection('physical')}
          className="section-header w-full flex items-center justify-between p-4 rounded-lg border border-light-border dark:border-dark-border bg-gradient-to-br from-white/50 to-white/30 dark:from-dark-surface/50 dark:to-dark-surface/30 hover:from-white/60 hover:to-white/40 dark:hover:from-dark-surface/60 dark:hover:to-dark-surface/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary-light-blue" />
            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
              Physical Properties
            </h4>
            {((filters.radiusRange[0] !== defaultFilters.radiusRange[0] || filters.radiusRange[1] !== defaultFilters.radiusRange[1]) || 
              (filters.massRange[0] !== defaultFilters.massRange[0] || filters.massRange[1] !== defaultFilters.massRange[1]) ||
              (filters.temperatureRange[0] !== defaultFilters.temperatureRange[0] || filters.temperatureRange[1] !== defaultFilters.temperatureRange[1])) && (
              <span className="filter-badge px-2 py-1 rounded-full text-xs font-medium bg-primary-light-blue/20 text-primary-dark-blue dark:text-primary-light-blue border border-primary-light-blue/30">
                {[
                  filters.radiusRange[0] !== defaultFilters.radiusRange[0] || filters.radiusRange[1] !== defaultFilters.radiusRange[1],
                  filters.massRange[0] !== defaultFilters.massRange[0] || filters.massRange[1] !== defaultFilters.massRange[1],
                  filters.temperatureRange[0] !== defaultFilters.temperatureRange[0] || filters.temperatureRange[1] !== defaultFilters.temperatureRange[1]
                ].filter(Boolean).length}
              </span>
            )}
          </div>
          {expandedSections.physical ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        <AnimatePresence>
          {expandedSections.physical && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="section-content overflow-hidden"
            >
              <div className="p-4 space-y-6">
                {/* Planet Radius */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Planet Radius (Earth Radii)
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={filters.radiusRange[0]}
                        onChange={(e) => updateFilter('radiusRange', [
                          Number(e.target.value),
                          filters.radiusRange[1]
                        ])}
                        step={0.1}
                        min={0}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">to</span>
                      <input
                        type="number"
                        value={filters.radiusRange[1]}
                        onChange={(e) => updateFilter('radiusRange', [
                          filters.radiusRange[0],
                          Number(e.target.value)
                        ])}
                        step={0.1}
                        min={0}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={filters.radiusRange[1]}
                        onChange={(e) => updateFilter('radiusRange', [
                          filters.radiusRange[0],
                          Number(e.target.value)
                        ])}
                        className="glass-range-slider w-full h-2 bg-gradient-to-r from-primary-dark-blue/20 to-primary-light-blue/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="range-indicator absolute top-0 left-0 h-2 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue rounded-lg pointer-events-none filter-glow" 
                           style={{ width: `${(filters.radiusRange[1] / 100) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Planet Mass */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Planet Mass (Earth Masses)
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={filters.massRange[0]}
                        onChange={(e) => updateFilter('massRange', [
                          Number(e.target.value),
                          filters.massRange[1]
                        ])}
                        step={0.1}
                        min={0}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">to</span>
                      <input
                        type="number"
                        value={filters.massRange[1]}
                        onChange={(e) => updateFilter('massRange', [
                          filters.massRange[0],
                          Number(e.target.value)
                        ])}
                        step={0.1}
                        min={0}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={0}
                        max={10000}
                        step={0.1}
                        value={filters.massRange[1]}
                        onChange={(e) => updateFilter('massRange', [
                          filters.massRange[0],
                          Number(e.target.value)
                        ])}
                        className="glass-range-slider w-full h-2 bg-gradient-to-r from-primary-dark-blue/20 to-primary-light-blue/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="range-indicator absolute top-0 left-0 h-2 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue rounded-lg pointer-events-none filter-glow" 
                           style={{ width: `${(filters.massRange[1] / 10000) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Temperature Range */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Temperature (Kelvin)
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={filters.temperatureRange[0]}
                        onChange={(e) => updateFilter('temperatureRange', [
                          Number(e.target.value),
                          filters.temperatureRange[1]
                        ])}
                        min={0}
                        max={3000}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">to</span>
                      <input
                        type="number"
                        value={filters.temperatureRange[1]}
                        onChange={(e) => updateFilter('temperatureRange', [
                          filters.temperatureRange[0],
                          Number(e.target.value)
                        ])}
                        min={0}
                        max={3000}
                        className="glass-number-input flex-1 px-3 py-2 text-sm rounded-md border border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 focus:ring-2 focus:ring-primary-light-blue/50 focus:border-primary-light-blue"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={0}
                        max={3000}
                        value={filters.temperatureRange[1]}
                        onChange={(e) => updateFilter('temperatureRange', [
                          filters.temperatureRange[0],
                          Number(e.target.value)
                        ])}
                        className="glass-range-slider w-full h-2 bg-gradient-to-r from-primary-dark-blue/20 to-primary-light-blue/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="range-indicator absolute top-0 left-0 h-2 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue rounded-lg pointer-events-none filter-glow" 
                           style={{ width: `${(filters.temperatureRange[1] / 3000) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stellar Properties Section */}
      <div className="filter-section">
        <button
          onClick={() => toggleSection('stellar')}
          className="section-header w-full flex items-center justify-between p-4 rounded-lg border border-light-border dark:border-dark-border bg-gradient-to-br from-white/50 to-white/30 dark:from-dark-surface/50 dark:to-dark-surface/30 hover:from-white/60 hover:to-white/40 dark:hover:from-dark-surface/60 dark:hover:to-dark-surface/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-primary-light-blue" />
            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
              Stellar Properties
            </h4>
            {filters.hostStarType.length > 0 && (
              <span className="filter-badge px-2 py-1 rounded-full text-xs font-medium bg-primary-light-blue/20 text-primary-dark-blue dark:text-primary-light-blue border border-primary-light-blue/30">
                {filters.hostStarType.length}
              </span>
            )}
          </div>
          {expandedSections.stellar ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        <AnimatePresence>
          {expandedSections.stellar && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="section-content overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {/* Host Star Type */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Host Star Type
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {starTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => toggleArrayFilter('hostStarType', type)}
                        className={`glass-radio px-4 py-2 text-sm rounded-md border transition-all duration-300 ${
                          filters.hostStarType.includes(type)
                            ? 'bg-gradient-to-br from-primary-dark-blue to-primary-light-blue text-white border-primary-light-blue shadow-lg filter-active filter-glow'
                            : 'border-light-border dark:border-dark-border hover:bg-white/30 dark:hover:bg-dark-surface/30 hover:border-primary-light-blue/50 bg-white/20 dark:bg-dark-surface/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Classification Section */}
      <div className="filter-section">
        <button
          onClick={() => toggleSection('classification')}
          className="section-header w-full flex items-center justify-between p-4 rounded-lg border border-light-border dark:border-dark-border bg-gradient-to-br from-white/50 to-white/30 dark:from-dark-surface/50 dark:to-dark-surface/30 hover:from-white/60 hover:to-white/40 dark:hover:from-dark-surface/60 dark:hover:to-dark-surface/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <Tag className="h-5 w-5 text-primary-light-blue" />
            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
              Classification
            </h4>
            {(filters.disposition.length > 0 || filters.habitable !== null) && (
              <span className="filter-badge px-2 py-1 rounded-full text-xs font-medium bg-primary-light-blue/20 text-primary-dark-blue dark:text-primary-light-blue border border-primary-light-blue/30">
                {filters.disposition.length + (filters.habitable !== null ? 1 : 0)}
              </span>
            )}
          </div>
          {expandedSections.classification ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        <AnimatePresence>
          {expandedSections.classification && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="section-content overflow-hidden"
            >
              <div className="p-4 space-y-6">
                {/* Disposition */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Disposition
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {dispositions.map(disposition => (
                      <label key={disposition} className="glass-checkbox flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-white/20 dark:hover:bg-dark-surface/20 transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.disposition.includes(disposition)}
                          onChange={() => toggleArrayFilter('disposition', disposition)}
                          className="w-4 h-4 rounded border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 text-primary-dark-blue focus:ring-2 focus:ring-primary-light-blue/50"
                        />
                        <span className={`text-sm transition-colors ${filters.disposition.includes(disposition) ? 'text-primary-dark-blue dark:text-primary-light-blue font-medium filter-active' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
                          {disposition}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Habitability */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Habitability
                  </h5>
                  <div className="space-y-2">
                    {[
                      { value: true, label: 'In Habitable Zone' },
                      { value: false, label: 'Not in Habitable Zone' },
                      { value: null, label: 'All' }
                    ].map(({ value, label }) => (
                      <label key={String(value)} className="glass-radio flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-white/20 dark:hover:bg-dark-surface/20 transition-all duration-300 border border-light-border/50 dark:border-dark-border/50">
                        <input
                          type="radio"
                          name="habitable"
                          checked={filters.habitable === value}
                          onChange={() => updateFilter('habitable', value)}
                          className="w-4 h-4 border-light-border dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 text-primary-dark-blue focus:ring-2 focus:ring-primary-light-blue/50"
                        />
                        <span className={`text-sm transition-colors ${filters.habitable === value ? 'text-primary-dark-blue dark:text-primary-light-blue font-medium filter-active' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Apply Filters Button */}
      <div className="pt-4 border-t border-light-border/50 dark:border-dark-border/50">
        <LiquidButton
          onClick={() => {
            setStoreFilters(filters as unknown as ExplorerFilters)
          }}
          className="w-full bg-gradient-to-r from-primary-dark-blue to-primary-light-blue text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 filter-hover"
          size="lg"
        >
          <Filter className="h-5 w-5 mr-2" />
          Apply Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
              {getActiveFilterCount()}
            </span>
          )}
        </LiquidButton>
      </div>
    </div>
  )
}
