'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, RotateCcw, Save } from 'lucide-react'
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

const defaultFilters: FilterState = {
  discoveryMethod: [],
  yearRange: [1992, new Date().getFullYear()],
  radiusRange: [0, 10],
  massRange: [0, 50],
  temperatureRange: [0, 3000],
  hostStarType: [],
  disposition: [],
  habitable: null,
}

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

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
          Filters
        </h3>
        <div className="flex items-center gap-2">
          <LiquidButton
            onClick={saveFilters}
            size="icon"
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-light-blue cursor-target"
            title="Save filters"
          >
            <Save className="h-4 w-4" />
          </LiquidButton>
          <LiquidButton
            onClick={resetFilters}
            size="icon"
            className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-semantic-warning cursor-target"
            title="Reset filters"
          >
            <RotateCcw className="h-4 w-4" />
          </LiquidButton>
        </div>
      </div>

      {/* Discovery Method */}
      <div className="space-y-3">
        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
          Discovery Method
        </h4>
        <div className="space-y-2">
          {discoveryMethods.map(method => (
            <label key={method} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.discoveryMethod.includes(method)}
                onChange={() => toggleArrayFilter('discoveryMethod', method)}
                className="rounded border-light-border dark:border-dark-border"
              />
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {method}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Year Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
          Discovery Year
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.yearRange[0]}
              onChange={(e) => updateFilter('yearRange', [
                Number(e.target.value),
                filters.yearRange[1]
              ])}
              min={1992}
              max={new Date().getFullYear()}
              className="input-base text-sm w-20"
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
              className="input-base text-sm w-20"
            />
          </div>
          <input
            type="range"
            min={1992}
            max={new Date().getFullYear()}
            value={filters.yearRange[0]}
            onChange={(e) => updateFilter('yearRange', [
              Number(e.target.value),
              filters.yearRange[1]
            ])}
            className="w-full"
          />
        </div>
      </div>

      {/* Planet Radius */}
      <div className="space-y-3">
        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
          Planet Radius (Earth Radii)
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.radiusRange[0]}
              onChange={(e) => updateFilter('radiusRange', [
                Number(e.target.value),
                filters.radiusRange[1]
              ])}
              step={0.1}
              min={0}
              className="input-base text-sm w-20"
            />
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              to
            </span>
            <input
              type="number"
              value={filters.radiusRange[1]}
              onChange={(e) => updateFilter('radiusRange', [
                filters.radiusRange[0],
                Number(e.target.value)
              ])}
              step={0.1}
              min={0}
              className="input-base text-sm w-20"
            />
          </div>
        </div>
      </div>

      {/* Planet Mass */}
      <div className="space-y-3">
        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
          Planet Mass (Earth Masses)
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.massRange[0]}
              onChange={(e) => updateFilter('massRange', [
                Number(e.target.value),
                filters.massRange[1]
              ])}
              step={0.1}
              min={0}
              className="input-base text-sm w-20"
            />
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              to
            </span>
            <input
              type="number"
              value={filters.massRange[1]}
              onChange={(e) => updateFilter('massRange', [
                filters.massRange[0],
                Number(e.target.value)
              ])}
              step={0.1}
              min={0}
              className="input-base text-sm w-20"
            />
          </div>
        </div>
      </div>

      {/* Host Star Type */}
      <div className="space-y-3">
        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
          Host Star Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {starTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleArrayFilter('hostStarType', type)}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                filters.hostStarType.includes(type)
                  ? 'bg-primary-dark-blue text-white border-primary-dark-blue'
                  : 'border-light-border dark:border-dark-border hover:bg-light-hover dark:hover:bg-dark-hover'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Disposition */}
      <div className="space-y-3">
        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
          Disposition
        </h4>
        <div className="space-y-2">
          {dispositions.map(disposition => (
            <label key={disposition} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.disposition.includes(disposition)}
                onChange={() => toggleArrayFilter('disposition', disposition)}
                className="rounded border-light-border dark:border-dark-border"
              />
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {disposition}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Habitability */}
      <div className="space-y-3">
        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
          Habitability
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="habitable"
              checked={filters.habitable === true}
              onChange={() => updateFilter('habitable', true)}
              className="border-light-border dark:border-dark-border"
            />
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              In Habitable Zone
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="habitable"
              checked={filters.habitable === false}
              onChange={() => updateFilter('habitable', false)}
              className="border-light-border dark:border-dark-border"
            />
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Not in Habitable Zone
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="habitable"
              checked={filters.habitable === null}
              onChange={() => updateFilter('habitable', null)}
              className="border-light-border dark:border-dark-border"
            />
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              All
            </span>
          </label>
        </div>
      </div>

      {/* Apply Filters Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary cursor-target"
        onClick={() => {
          setStoreFilters(filters as unknown as ExplorerFilters)
        }}
      >
        Apply Filters
      </motion.button>
    </div>
  )
}
