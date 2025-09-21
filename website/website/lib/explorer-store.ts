'use client'

import { create } from 'zustand'
import { loadExoplanetsFromCSV, type ExplorerPlanetRow } from '@/lib/csv-loader'

export type Disposition = 'Confirmed' | 'Candidate' | 'False Positive' | 'Controversial'

export interface ExplorerFilters {
  discoveryMethod: string[]
  yearRange: [number, number]
  radiusRange: [number, number]
  massRange: [number, number]
  disposition: Disposition[]
}

export interface ExplorerState {
  rows: ExplorerPlanetRow[]
  isLoaded: boolean
  isLoading: boolean
  error: string | null

  searchQuery: string
  filters: ExplorerFilters
  selectedPlanetName: string | null

  // notes keyed by planet name
  notesByPlanet?: Record<string, string[]>

  // actions
  loadRows: (path?: string) => Promise<void>
  setSearchQuery: (q: string) => void
  setFilters: (f: ExplorerFilters) => void
  setSelectedPlanetName: (name: string | null) => void

  // notes actions
  addNote: (planetName: string, note: string) => void
  deleteNote: (planetName: string, index: number) => void
}

const defaultFilters: ExplorerFilters = {
  discoveryMethod: [],
  yearRange: [1992, new Date().getFullYear()],
  radiusRange: [0, 100],
  massRange: [0, 10000],
  disposition: [],
}

export const useExplorerStore = create<ExplorerState>((set, get) => ({
  rows: [],
  isLoaded: false,
  isLoading: false,
  error: null,

  searchQuery: '',
  filters: defaultFilters,
  selectedPlanetName: null,
  notesByPlanet: undefined,

  loadRows: async (path = '/PS_2025.09.12_22.39.25.csv') => {
    if (get().isLoaded || get().isLoading) return
    set({ isLoading: true, error: null })
    try {
      const rows = await loadExoplanetsFromCSV(path)
      set({ rows, isLoaded: true })
    } catch (e: any) {
      set({ error: e?.message || 'Failed to load CSV' })
    } finally {
      set({ isLoading: false })
    }
  },
  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilters: (f) => set({ filters: f }),
  setSelectedPlanetName: (name) => set({ selectedPlanetName: name }),

  addNote: (planetName, note) => {
    const key = 'exobengal.notes'
    const current = get().notesByPlanet || JSON.parse(typeof localStorage !== 'undefined' ? (localStorage.getItem(key) || '{}') : '{}')
    const updated = { ...current }
    const list = Array.isArray(updated[planetName]) ? updated[planetName] : []
    updated[planetName] = [...list, note]
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(updated)) } catch {}
    set({ notesByPlanet: updated })
  },
  deleteNote: (planetName, index) => {
    const key = 'exobengal.notes'
    const current = get().notesByPlanet || JSON.parse(typeof localStorage !== 'undefined' ? (localStorage.getItem(key) || '{}') : '{}')
    const list = Array.isArray(current[planetName]) ? current[planetName] : []
    const updatedList = list.filter((_, i) => i !== index)
    const updated = { ...current, [planetName]: updatedList }
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(updated)) } catch {}
    set({ notesByPlanet: updated })
  },
}))

// Selector helper to derive filtered rows
export function selectFilteredRows(state: ExplorerState): ExplorerPlanetRow[] {
  const { rows, searchQuery, filters } = state
  const q = searchQuery.trim().toLowerCase()
  return rows.filter(r => {
    if (q) {
      const hay = `${r.pl_name || ''} ${r.hostname || ''}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (filters.discoveryMethod.length > 0) {
      if (!r.discoverymethod || !filters.discoveryMethod.includes(r.discoverymethod)) return false
    }
    if (filters.disposition.length > 0) {
      const disp = r.default_flag === 1 ? 'Confirmed' : 'Candidate'
      if (!filters.disposition.includes(disp as Disposition)) return false
    }
    if (filters.yearRange) {
      const y = r.disc_year
      if (typeof y === 'number') {
        if (y < filters.yearRange[0] || y > filters.yearRange[1]) return false
      }
    }
    if (filters.radiusRange) {
      const rr = r.pl_rade
      if (typeof rr === 'number') {
        if (rr < filters.radiusRange[0] || rr > filters.radiusRange[1]) return false
      }
    }
    if (filters.massRange) {
      const mm = r.pl_masse
      if (typeof mm === 'number') {
        if (mm < filters.massRange[0] || mm > filters.massRange[1]) return false
      }
    }
    return true
  })
}


