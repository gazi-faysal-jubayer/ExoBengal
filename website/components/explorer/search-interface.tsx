'use client'

import { useState, useCallback, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useExplorerStore } from '@/lib/explorer-store'
import { planetNameToSlug } from '@/lib/planet-utils'
import { SmartCombobox } from '@/components/ui/smart-combo-box'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const searchSuggestions = [
  { id: 'kepler-452b', label: 'Kepler-452b', group: 'Popular Planets' },
  { id: 'proxima-centauri-b', label: 'Proxima Centauri b', group: 'Popular Planets' },
  { id: 'trappist-1e', label: 'TRAPPIST-1e', group: 'Popular Planets' },
  { id: 'toi-715-b', label: 'TOI-715 b', group: 'Popular Planets' },
  { id: 'hd-209458-b', label: 'HD 209458 b', group: 'Popular Planets' },
  { id: 'gliese-667cc', label: 'Gliese 667Cc', group: 'Popular Planets' },
]

const recentSearches = [
  { id: 'earth-like', label: 'Earth-like planets', group: 'Recent' },
  { id: 'hot-jupiters', label: 'Hot Jupiters', group: 'Recent' },
  { id: 'transit', label: 'Transit method', group: 'Recent' },
  { id: 'habitable', label: 'Habitable zone', group: 'Recent' },
]

const quickFilters = [
  { label: 'Confirmed', value: 'disposition:confirmed' },
  { label: 'Recent (2023-2024)', value: 'year:2023-2024' },
  { label: 'Earth-size', value: 'radius:0.8-1.2' },
  { label: 'Habitable Zone', value: 'habitable:true' },
]

export function SearchInterface() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const router = useRouter()
  const setSearchQuery = useExplorerStore(s => s.setSearchQuery)
  const loadRows = useExplorerStore(s => s.loadRows)
  const setFilters = useExplorerStore(s => s.setFilters)
  const filters = useExplorerStore(s => s.filters)

  useEffect(() => {
    loadRows()
  }, [loadRows])

  const handlePlanetSelect = useCallback((value: string | string[] | null) => {
    const planetId = typeof value === 'string' ? value : null
    setSelectedPlanet(planetId)
    
    if (planetId) {
      const planet = [...searchSuggestions, ...recentSearches].find(p => p.id === planetId)
      if (planet) {
        // Navigate to planet page
        const slug = planetNameToSlug(planet.label)
        router.push(`/explorer/planet/${slug}`)
      }
    } else {
      // Clear search
      setSearchQuery('')
    }
  }, [router, setSearchQuery])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [setSearchQuery])

  const addFilter = useCallback((filter: string) => {
    if (selectedFilters.includes(filter)) return
    setSelectedFilters(prev => [...prev, filter])
    if (filter.startsWith('disposition:')) {
      const disp = filter.split(':')[1]
      const mapped = disp.charAt(0).toUpperCase() + disp.slice(1)
      setFilters({ ...filters, disposition: [mapped as any] })
    } else if (filter.startsWith('year:')) {
      const range = filter.split(':')[1]
      const [min, max] = range.split('-').map(n => parseInt(n, 10))
      if (!Number.isNaN(min) && !Number.isNaN(max)) setFilters({ ...filters, yearRange: [min, max] })
    } else if (filter.startsWith('radius:')) {
      const range = filter.split(':')[1]
      const [min, max] = range.split('-').map(n => parseFloat(n))
      if (Number.isFinite(min) && Number.isFinite(max)) setFilters({ ...filters, radiusRange: [min, max] })
    } else if (filter.startsWith('habitable:')) {
      const habitableValue = filter.split(':')[1]
      if (habitableValue === 'true') {
        setFilters({ ...filters, habitable: true })
      }
    }
  }, [selectedFilters, setFilters, filters])

  const removeFilter = useCallback((filter: string) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter))
    if (filter.startsWith('disposition:')) {
      setFilters({ ...filters, disposition: [] })
    } else if (filter.startsWith('year:')) {
      setFilters({ ...filters, yearRange: [1992, new Date().getFullYear()] })
    } else if (filter.startsWith('radius:')) {
      setFilters({ ...filters, radiusRange: [0, 100] })
    } else if (filter.startsWith('habitable:')) {
      setFilters({ ...filters, habitable: null })
    }
  }, [setFilters, filters])

  const allOptions = [...searchSuggestions, ...recentSearches]

  return (
    <div className="search-interface-glass p-6 rounded-xl space-y-6 search-entrance relative z-[10000]">
      {/* Main Search Bar with SmartCombobox */}
      <div className="relative">
        <SmartCombobox
          placeholder="Search exoplanets by name, type, or properties..."
          options={allOptions}
          value={selectedPlanet}
          onValueChange={handlePlanetSelect}
          clearable
          header={<span className="font-semibold text-light-text-primary dark:text-dark-text-primary">Search Exoplanets</span>}
          footer={<span className="text-light-text-secondary dark:text-dark-text-secondary">Press Enter to select, Escape to close</span>}
          emptyState={<span className="text-light-text-secondary dark:text-dark-text-secondary">No exoplanets found. Try a different search term.</span>}
          maxHeight={350}
          className="w-full"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary search-focus">
          Quick filters:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <motion.div
              key={filter.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <LiquidButton
                onClick={() => addFilter(filter.value)}
                disabled={selectedFilters.includes(filter.value)}
                variant="outline"
                size="sm"
                className="quick-filter-glass px-4 py-2 text-xs rounded-full cursor-target font-medium"
              >
                {filter.label}
              </LiquidButton>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary search-focus">
            Active filters:
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter, index) => (
              <motion.div
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="active-filter-badge flex items-center gap-2 px-4 py-2 text-white text-xs rounded-full"
              >
                <span className="font-medium">{filter.split(':')[0]}</span>
                <LiquidButton
                  onClick={() => removeFilter(filter)}
                  size="icon"
                  className="cursor-target hover:bg-primary-very-dark-blue rounded-full p-1 transition-all duration-200 hover:scale-110"
                  aria-label={`Remove ${filter} filter`}
                >
                  <X className="h-3 w-3" />
                </LiquidButton>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: selectedFilters.length * 0.05 }}
            >
              <LiquidButton
                onClick={() => {
                  setSelectedFilters([])
                  setFilters({ ...filters, disposition: [], yearRange: [1992, new Date().getFullYear()], radiusRange: [0, 100], habitable: null })
                }}
                variant="ghost"
                size="sm"
                className="quick-filter-glass px-4 py-2 text-xs rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                Clear all
              </LiquidButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
