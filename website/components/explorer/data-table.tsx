'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Download, 
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  Star
} from 'lucide-react'

// Sample data - in production, this would come from API
const sampleData = [
  {
    id: '1',
    pl_name: 'Kepler-452b',
    hostname: 'Kepler-452',
    tic_id: 'TIC 281541555',
    discoverymethod: 'Transit',
    disc_year: 2015,
    disc_telescope: 'Kepler',
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
  key: keyof typeof sampleData[0]
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
  { key: 'pl_rade', label: 'Radius', sortable: true, unit: 'R⊕', width: 'w-24' },
  { key: 'pl_masse', label: 'Mass', sortable: true, unit: 'M⊕', width: 'w-24' },
  { key: 'distance', label: 'Distance', sortable: true, unit: 'ly', width: 'w-28' },
]

interface DataTableProps {
  onPlanetSelect: (planetId: string) => void
}

export function DataTable({ onPlanetSelect }: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<string>('pl_name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const handleSort = useCallback((columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }, [sortColumn])

  const sortedData = useMemo(() => {
    const sorted = [...sampleData].sort((a, b) => {
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
  }, [sortColumn, sortDirection, currentPage, pageSize])

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

  const formatValue = (value: any, unit?: string) => {
    if (value === null || value === undefined) return '—'
    if (typeof value === 'number') {
      return `${value.toFixed(3)}${unit ? ` ${unit}` : ''}`
    }
    return value
  }

  return (
    <div className="card overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              Exoplanets ({sampleData.length.toLocaleString()})
            </h3>
            {selectedRows.length > 0 && (
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {selectedRows.length} selected
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-secondary text-sm flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="btn-secondary text-sm flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Column Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-light-surface dark:bg-dark-surface">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-light-border dark:border-dark-border"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(sortedData.map(row => row.id))
                    } else {
                      setSelectedRows([])
                    }
                  }}
                />
              </th>
              <th className="w-8 p-3"></th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`p-3 text-left ${column.width || 'w-auto'}`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-1 hover:text-primary-light-blue transition-colors group"
                    >
                      <span className="font-medium text-sm">{column.label}</span>
                      <div className="flex flex-col">
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </div>
                    </button>
                  ) : (
                    <span className="font-medium text-sm">{column.label}</span>
                  )}
                </th>
              ))}
              <th className="w-12 p-3"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-light-border dark:border-dark-border hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                    className="rounded border-light-border dark:border-dark-border"
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleFavorite(row.id)}
                    className={`transition-colors ${
                      row.favorite 
                        ? 'text-semantic-warning' 
                        : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-semantic-warning'
                    }`}
                  >
                    <Star className={`h-4 w-4 ${row.favorite ? 'fill-current' : ''}`} />
                  </button>
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="p-3">
                    {column.key === 'pl_name' ? (
                      <button
                        onClick={() => onPlanetSelect(row.id)}
                        className="text-primary-dark-blue dark:text-primary-light-blue hover:underline font-medium"
                      >
                        {row[column.key]}
                      </button>
                    ) : (
                      <span className="text-sm">
                        {formatValue(row[column.key], column.unit)}
                      </span>
                    )}
                  </td>
                ))}
                <td className="p-3">
                  <button
                    onClick={() => onPlanetSelect(row.id)}
                    className="p-1 rounded hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                    aria-label="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sampleData.length)} of {sampleData.length} results
            </span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="text-sm input-base py-1"
            >
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
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
              Page {currentPage} of {Math.ceil(sampleData.length / pageSize)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(sampleData.length / pageSize), prev + 1))}
              disabled={currentPage >= Math.ceil(sampleData.length / pageSize)}
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
