'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  Loader2
} from 'lucide-react'
import { loadExoplanetsFromCSV, type ExplorerPlanetRow } from '@/lib/csv-loader'
import { useExplorerStore, selectFilteredRows } from '@/lib/explorer-store'
import { planetNameToSlug } from '@/lib/planet-utils'
import { useRouter } from 'next/navigation'
import { CheckBox } from '@/components/ui/checkbox'
import { SmartCombobox } from '@/components/ui/smart-combo-box'
import { trackEvent, trackDownload } from '@/lib/analytics'

// Convert CSV data to table format
const convertNASAData = (nasaData: ExplorerPlanetRow[]) => {
  return nasaData.map((planet, index) => ({
    id: index.toString(),
    pl_name: planet.pl_name || 'Unknown',
    hostname: planet.hostname || 'Unknown',
    discoverymethod: planet.discoverymethod || 'Unknown',
    disc_year: planet.disc_year || 0,
    disc_telescope: planet.disc_telescope || planet.disc_facility || 'Unknown',
    pl_orbper: planet.pl_orbper || 0,
    pl_orbsmax: planet.pl_orbsmax || 0,
    pl_rade: planet.pl_rade || 0,
    pl_radj: planet.pl_radj || 0,
    pl_masse: planet.pl_masse || 0,
    pl_massj: planet.pl_massj || 0,
    pl_orbeccen: planet.pl_orbeccen || 0,
    pl_orbincl: planet.pl_orbincl || 0,
    st_rad: planet.st_rad || 0,
    st_mass: planet.st_mass || 0,
    ra: planet.ra || 0,
    dec: planet.dec || 0,
    distance: planet.sy_dist || 0,
    reference: 'NASA Exoplanet Archive',
    pl_facility: planet.disc_facility || 'Unknown',
    soltype: (planet as any).soltype || '—',
    favorite: false,
  }))
}

// Fallback sample data
const fallbackData = [
  {
    id: '1',
    pl_name: 'Kepler-452b',
    hostname: 'Kepler-452',
    tic_id: 'TIC 281541555',
    discoverymethod: 'Transit',
    disc_year: 2015,
    disc_telescope: 'Kepler',
    pl_facility: 'Kepler',
    soltype: 'Published',
    pl_orbper: 384.843,
    pl_orbsmax: 1.046,
    pl_rade: 1.6,
    pl_radj: 0.143,
    pl_masse: 5.0,
    pl_massj: 0.016,
    pl_orbeccen: 0.097,
    pl_orbincl: 89.806,
    st_rad: 1.11,
    st_mass: 1.04,
    ra: 291.756,
    dec: 44.277,
    distance: 1400,
    favorite: false,
  },
  {
    id: '2',
    pl_name: 'Proxima Centauri b',
    hostname: 'Proxima Centauri',
    tic_id: 'TIC 388857263',
    discoverymethod: 'Radial Velocity',
    disc_year: 2016,
    disc_telescope: 'ESO 3.6m',
    pl_facility: 'ESO 3.6m',
    soltype: 'Published',
    pl_orbper: 11.186,
    pl_orbsmax: 0.0485,
    pl_rade: 1.17,
    pl_radj: 0.104,
    pl_masse: 1.17,
    pl_massj: 0.004,
    pl_orbeccen: 0.109,
    pl_orbincl: 90.0,
    st_rad: 0.154,
    st_mass: 0.122,
    ra: 217.429,
    dec: -62.679,
    distance: 4.24,
    favorite: true,
  },
  // Add more sample data...
]

interface Column {
  key: keyof typeof fallbackData[0]
  label: string
  sortable: boolean
  unit?: string
  width?: string
}

const columns: Column[] = [
  { key: 'pl_name', label: 'Planet Name', sortable: true, width: 'w-48' },
  { key: 'hostname', label: 'Host Star', sortable: true, width: 'w-40' },
  { key: 'discoverymethod', label: 'Method', sortable: true, width: 'w-32' },
  { key: 'disc_year', label: 'Year', sortable: true, width: 'w-20' },
  { key: 'pl_orbper', label: 'Period', sortable: true, unit: 'days', width: 'w-24' },
  { key: 'pl_facility', label: 'Discovery Facility', sortable: true, width: 'w-40' },
  { key: 'soltype', label: 'Solution Type', sortable: true, width: 'w-28' },
  { key: 'distance', label: 'Distance', sortable: true, unit: 'ly', width: 'w-28' },
]

export function DataTable() {
  const store = useExplorerStore(s => s)
  const router = useRouter()
  const [sortColumn, setSortColumn] = useState<string>('pl_name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch NASA data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        await store.loadRows('/PS_2025.09.12_22.39.25.csv')
        const exoplanets = selectFilteredRows(store)
        
        const convertedData = convertNASAData(exoplanets)
        setData(convertedData)
        
        console.log(`Loaded ${convertedData.length} exoplanets from CSV`)
      } catch (err) {
        console.error('Failed to load NASA data:', err)
        setError('Failed to load data from NASA API. Using fallback data.')
        setData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Re-apply filters when store changes
  useEffect(() => {
    if (!store.isLoaded) return
    const exo = selectFilteredRows(store)
    const converted = convertNASAData(exo)
    setData(converted)
    setCurrentPage(1)
  }, [store.searchQuery, store.filters, store.rows, store.isLoaded])

  const handleSort = useCallback((columnKey: string) => {
    const newDirection = sortColumn === columnKey 
      ? (sortDirection === 'asc' ? 'desc' : 'asc')
      : 'asc'
    
    // Track sort interaction
    trackEvent('sort_table', {
      column: columnKey,
      direction: newDirection,
      row_count: data.length
    })
    
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }, [sortColumn, sortDirection, data.length])

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })
    
    const startIndex = (currentPage - 1) * pageSize
    return sorted.slice(startIndex, startIndex + pageSize)
  }, [data, sortColumn, sortDirection, currentPage, pageSize])

  const toggleRowSelection = useCallback((id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    // In production, this would update the database
    console.log('Toggle favorite for planet:', id)
  }, [])

  const handlePlanetClick = useCallback((planetName: string) => {
    // Navigate to dedicated planet page
    const slug = planetNameToSlug(planetName)
    router.push(`/explorer/planet/${slug}`)
  }, [router])

  const formatValue = (value: any, unit?: string) => {
    if (value === null || value === undefined) return '—'
    if (typeof value === 'number') {
      return `${value.toFixed(3)}${unit ? ` ${unit}` : ''}`
    }
    return value
  }

  if (loading) {
    return (
      <div className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm">
        <div className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-light-blue" />
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Loading exoplanet data from NASA Archive...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card data-table-card" role="table" aria-label="Exoplanet data table">
      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-semantic-warning/10 border-b border-semantic-warning/20" role="alert">
          <p className="text-semantic-warning text-sm">{error}</p>
        </div>
      )}

      {/* Header Controls with Glass Panel */}
      <div className="glass-panel p-4 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary" id="table-heading">
              Exoplanets ({data.length.toLocaleString()})
            </h3>
            {selectedRows.length > 0 && (
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary selection-glow">
                {selectedRows.length} selected
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="btn-secondary text-sm flex items-center gap-2" 
              data-target-cursor="true" 
              aria-label="Export exoplanet data"
              onClick={() => {
                // Track the export event
                trackDownload(
                  `exoplanets-export-${new Date().toISOString().split('T')[0]}.csv`,
                  'csv'
                )
                
                // Also track as a generic event with more context
                trackEvent('export_data', {
                  format: 'csv',
                  row_count: data.length,
                  selected_rows: selectedRows.length,
                  has_filters: (() => {
                    const currentYear = new Date().getFullYear()
                    const defaultYearRange: [number, number] = [1992, currentYear]
                    const defaultRadiusRange: [number, number] = [0, 100]
                    const defaultMassRange: [number, number] = [0, 10000]
                    
                    // Check if any filter differs from its default state
                    return (
                      store.filters.discoveryMethod.length > 0 ||
                      store.filters.disposition.length > 0 ||
                      store.filters.habitable !== null ||
                      store.filters.yearRange[0] !== defaultYearRange[0] ||
                      store.filters.yearRange[1] !== defaultYearRange[1] ||
                      store.filters.radiusRange[0] !== defaultRadiusRange[0] ||
                      store.filters.radiusRange[1] !== defaultRadiusRange[1] ||
                      store.filters.massRange[0] !== defaultMassRange[0] ||
                      store.filters.massRange[1] !== defaultMassRange[1]
                    )
                  })()
                })
                
                // TODO: Implement actual CSV export functionality
                console.log('Export CSV clicked - implement download logic')
              }}
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button 
              className="btn-secondary text-sm flex items-center gap-2" 
              aria-label="Filter table columns"
              onClick={() => {
                // Track column filter interaction
                trackEvent('open_column_filter', {
                  total_columns: columns.length,
                  row_count: data.length,
                  current_sort: sortColumn,
                  sort_direction: sortDirection
                })
                
                // TODO: Implement column filter UI
                console.log('Column Filter clicked - implement filter UI')
              }}
            >
              <Filter className="h-4 w-4" />
              Column Filter
            </button>
          </div>
        </div>
      </div>

      {/* Column Headers with Glass Effects */}
      <div className="column-header-glass p-4 border-b border-light-border dark:border-dark-border">
        <div className="grid grid-cols-10 gap-4 items-center">
          <div className="col-span-1 flex items-center justify-center">
            <CheckBox
              checked={selectedRows.length === sortedData.length && sortedData.length > 0}
              onClick={() => {
                if (selectedRows.length === sortedData.length) {
                  setSelectedRows([])
                } else {
                  setSelectedRows(sortedData.map(row => row.id))
                }
              }}
              size={20}
              color="#82b2d7"
            />
          </div>
          {columns.map((column, index) => (
            <div
              key={column.key as string}
              className={`${index < 2 ? 'col-span-2' : 'col-span-1'} flex items-center`}
            >
              {column.sortable ? (
                <button
                  onClick={() => handleSort(column.key as string)}
                  className={`flex items-center gap-1 transition-all duration-300 group ${
                    sortColumn === column.key 
                      ? 'text-primary-light-blue sort-indicator-active' 
                      : 'hover:text-primary-light-blue'
                  }`}
                >
                  <span className="font-medium text-sm">{column.label}</span>
                  <div className="flex flex-col">
                    {sortColumn === column.key ? (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="h-4 w-4 opacity-0 group-hover:opacity-70 transition-opacity" />
                    )}
                  </div>
                </button>
              ) : (
                <span className="font-medium text-sm">{column.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card-Based Row Layout */}
      <div className="p-4 space-y-3">
        {sortedData.map((row, index) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`row-card card-hover data-table-hover ${
              selectedRows.includes(row.id) ? 'selection-glow' : ''
            }`}
          >
            <div className="p-4">
              <div className="grid grid-cols-10 gap-4 items-center">
                {/* Selection Checkbox */}
                <div className="col-span-1 flex items-center justify-center">
                  <CheckBox
                    checked={selectedRows.includes(row.id)}
                    onClick={() => toggleRowSelection(row.id)}
                    size={18}
                    color="#82b2d7"
                  />
                </div>

                {/* Planet Name - Prominent */}
                <div className="col-span-2">
                  <button
                    onClick={() => handlePlanetClick(row.pl_name)}
                    className="text-left group"
                  >
                    <div className="font-semibold text-primary-dark-blue dark:text-primary-light-blue group-hover:underline transition-all duration-300">
                      {row.pl_name}
                    </div>
                  </button>
                </div>

                {/* Host Star */}
                <div className="col-span-2">
                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {row.hostname}
                  </div>
                </div>

                {/* Discovery Method */}
                <div className="col-span-1">
                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {row.discoverymethod}
                  </div>
                </div>

                {/* Discovery Year */}
                <div className="col-span-1">
                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {row.disc_year || '—'}
                  </div>
                </div>

                {/* Orbital Period */}
                <div className="col-span-1">
                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {formatValue(row.pl_orbper, 'days')}
                  </div>
                </div>

                {/* Discovery Facility */}
                <div className="col-span-1">
                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {row.pl_facility || '—'}
                  </div>
                </div>

                {/* Solution Type */}
                <div className="col-span-1">
                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {row.soltype || '—'}
                  </div>
                </div>

                {/* Distance */}
                <div className="col-span-1">
                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {formatValue(row.distance, 'ly')}
                  </div>
                </div>


              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      <div className="data-table-pagination glass-panel p-4 border-t border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data.length)} of {data.length} results
            </span>
        <SmartCombobox
          placeholder="Items per page"
          value={pageSize.toString()}
          onValueChange={(val) => setPageSize(Number(val))}
          options={[
            { id: '25', label: '25 per page' },
            { id: '50', label: '50 per page' },
            { id: '100', label: '100 per page' }
          ]}
          clearable={false}
          direction="up"
          className="w-40"
        />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary px-3">
              Page {currentPage} of {Math.ceil(data.length / pageSize)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(data.length / pageSize), prev + 1))}
              disabled={currentPage >= Math.ceil(data.length / pageSize)}
              className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
