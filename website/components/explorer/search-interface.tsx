'use client'

import { useState, useCallback, createContext, useContext, useEffect } from 'react'
import { Search, X, Clock, Mic, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useExplorerStore } from '@/lib/explorer-store'
import { TerminalSearchInput } from '@/components/ui/terminal-search-input'

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
  }, [])

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
    }
  }, [setFilters, filters])

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-4">
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
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-md text-slate-400 hover:text-primary-light-blue transition-colors"
              aria-label="Voice search"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-md text-slate-400 hover:text-primary-reddish-orange transition-colors"
              aria-label="AI assistant"
            >
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && (query.length > 0 || true) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg z-50 backdrop-blur-sm"
            >
              <div className="p-4 space-y-4">
                {/* Quick Suggestions */}
                {query.length > 0 && filteredSuggestions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Suggestions
                    </h4>
                    <div className="space-y-1">
                      {filteredSuggestions.slice(0, 5).map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setQuery(suggestion)
                            handleSearch(suggestion)
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors text-sm rounded-md"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Searches */}
                <div>
                  <h4 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Recent Searches
                  </h4>
                  <div className="space-y-1">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => {
                          setQuery(search)
                          handleSearch(search)
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-md"
                      >
                        {search}
                      </button>
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
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
          Quick filters:
        </span>
        {quickFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => addFilter(filter.value)}
            disabled={selectedFilters.includes(filter.value)}
            className="px-3 py-1 text-xs border border-light-border dark:border-dark-border hover:bg-light-hover dark:hover:bg-dark-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
            Active filters:
          </span>
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-1 px-3 py-1 bg-primary-dark-blue text-white text-xs rounded-full"
            >
              <span>{filter.split(':')[0]}</span>
              <button
                onClick={() => removeFilter(filter)}
                className="hover:bg-primary-very-dark-blue rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${filter} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setSelectedFilters([])
              setFilters({ ...filters, disposition: [], yearRange: [1992, new Date().getFullYear()], radiusRange: [0, 100] })
            }}
            className="text-xs text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
