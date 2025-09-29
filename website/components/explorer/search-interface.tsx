'use client'

import { useState, useCallback, createContext, useContext, useEffect } from 'react'
import { Search, X, Clock, Mic, Sparkles, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useExplorerStore } from '@/lib/explorer-store'
import { planetNameToSlug } from '@/lib/planet-utils'
import { TerminalSearchInput } from '@/components/ui/terminal-search-input'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const searchSuggestions = [
  'Kepler-452b',
  'Proxima Centauri b',
  'TRAPPIST-1e',
  'TOI-715 b',
  'HD 209458 b',
  'Gliese 667Cc',
]

const recentSearches = [
  'Earth-like planets',
  'Hot Jupiters',
  'Transit method',
  'Habitable zone',
]

const quickFilters = [
  { label: 'Confirmed', value: 'disposition:confirmed' },
  { label: 'Recent (2023-2024)', value: 'year:2023-2024' },
  { label: 'Earth-size', value: 'radius:0.8-1.2' },
  { label: 'Habitable Zone', value: 'habitable:true' },
]

export function SearchInterface() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const router = useRouter()
  const setSearchQuery = useExplorerStore(s => s.setSearchQuery)
  const loadRows = useExplorerStore(s => s.loadRows)
  const setFilters = useExplorerStore(s => s.setFilters)
  const filters = useExplorerStore(s => s.filters)

  useEffect(() => {
    loadRows()
  }, [loadRows])

  const handleSearch = useCallback((searchQuery: string) => {
    setSearchQuery(searchQuery)
    setShowSuggestions(false)
  }, [setSearchQuery])

  const handlePlanetClick = useCallback((planetName: string) => {
    // Navigate to dedicated planet page
    const slug = planetNameToSlug(planetName)
    router.push(`/explorer/planet/${slug}`)
    setShowSuggestions(false)
  }, [router])

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

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="search-interface-glass p-6 rounded-xl space-y-6 search-entrance">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <TerminalSearchInput
            value={query}
            onChange={(val) => {
              setQuery(val)
              setSearchQuery(val)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(query)
            }}
            placeholder="search exoplanets by name, type, or properties..."
            user="explorer"
            host="nasa"
            dir="/data"
            className="w-full"
          />
          
          {/* Voice Search & AI Assistant */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <LiquidButton
              type="button"
              size="icon"
              className="cursor-target p-2.5 rounded-lg text-slate-400 hover:text-primary-light-blue transition-all duration-300 hover:scale-110 hover:shadow-lg animate-pulse"
              aria-label="Voice search"
            >
              <Mic className="h-4 w-4" />
            </LiquidButton>
            <LiquidButton
              type="button"
              size="icon"
              className="cursor-target p-2.5 rounded-lg text-slate-400 hover:text-primary-reddish-orange transition-all duration-300 hover:scale-110 hover:shadow-lg animate-pulse"
              aria-label="AI assistant"
            >
              <Sparkles className="h-4 w-4" />
            </LiquidButton>
          </div>
        </div>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && (query.length > 0 || true) && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="suggestion-dropdown-glass absolute top-full left-0 right-0 mt-3 rounded-xl shadow-2xl z-50 suggestion-slide"
            >
              <div className="p-6 space-y-5">
                {/* Quick Suggestions */}
                {query.length > 0 && filteredSuggestions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 search-focus">
                      Suggestions
                    </h4>
                    <div className="space-y-2">
                      {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                        <motion.div
                          key={suggestion}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <LiquidButton
                            onClick={() => handlePlanetClick(suggestion)}
                            variant="ghost"
                            size="sm"
                            className="suggestion-item-glass w-full text-left px-4 py-3 text-sm rounded-lg justify-start cursor-target"
                          >
                            <ExternalLink className="h-3 w-3 mr-2 opacity-60" />
                            {suggestion}
                          </LiquidButton>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Searches */}
                <div>
                  <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 flex items-center gap-2 search-focus">
                    <Clock className="h-4 w-4 text-primary-light-blue drop-shadow-sm" />
                    Recent Searches
                  </h4>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <motion.div
                        key={search}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + filteredSuggestions.length) * 0.1 }}
                      >
                        <LiquidButton
                          onClick={() => {
                            setQuery(search)
                            handleSearch(search)
                          }}
                          variant="ghost"
                          size="sm"
                          className="suggestion-item-glass w-full text-left px-4 py-3 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-lg justify-start cursor-target"
                        >
                          <Search className="h-3 w-3 mr-2 opacity-50" />
                          {search}
                        </LiquidButton>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close */}
        {showSuggestions && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowSuggestions(false)}
          />
        )}
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
