'use client'

import { create } from 'zustand'
import { loadExoplanetsFromCSV, type ExplorerPlanetRow } from '@/lib/csv-loader'
import { planetNameToSlug, normalizeSlug } from '@/lib/planet-utils'

// Interface for loading callbacks to integrate with global LoadingContext
export interface LoadingCallbacks {
  onStart?: () => void
  onFinish?: () => void
}

export type Disposition = 'Confirmed' | 'Candidate' | 'False Positive' | 'Controversial'

export interface ExplorerFilters {
  discoveryMethod: string[]
  yearRange: [number, number]
  radiusRange: [number, number]
  massRange: [number, number]
  disposition: Disposition[]
  habitable: boolean | null
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
  notesByPlanet?: Record<string, Array<{
    id: string
    text: string
    category: 'observation' | 'analysis' | 'question' | 'general'
    timestamp: string
  }>>

  // actions
  loadRows: (path?: string, callbacks?: LoadingCallbacks) => Promise<void>
  setSearchQuery: (q: string) => void
  setFilters: (f: ExplorerFilters) => void
  setSelectedPlanetName: (name: string | null) => void

  // notes actions
  addNote: (planetName: string, text: string, category?: 'observation' | 'analysis' | 'question' | 'general') => void
  updateNote: (planetName: string, noteId: string, text: string, category?: 'observation' | 'analysis' | 'question' | 'general') => void
  deleteNote: (planetName: string, noteId: string) => void

  // slug-based lookup methods
  getPlanetBySlug: (slug: string) => ExplorerPlanetRow | undefined
  getPlanetBySlugUnfiltered: (slug: string) => ExplorerPlanetRow | undefined
  getPlanetSlug: (planetName: string) => string
}

const defaultFilters: ExplorerFilters = {
  discoveryMethod: [],
  yearRange: [1992, new Date().getFullYear()],
  radiusRange: [0, 100],
  massRange: [0, 10000],
  disposition: [],
  habitable: null,
}

// Promise cache for request deduplication
const loadingPromises: Map<string, Promise<ExplorerPlanetRow[]>> = new Map()

export const useExplorerStore = create<ExplorerState>((set, get) => ({
  rows: [],
  isLoaded: false,
  isLoading: false,
  error: null,

  searchQuery: '',
  filters: defaultFilters,
  selectedPlanetName: null,
  notesByPlanet: {},

  loadRows: async (path = '/PS_2025.09.12_22.39.25.csv', callbacks) => {
    // Extract callbacks with defaults
    const { onStart, onFinish } = callbacks || {}
    
    // Check if already loaded - skip if data is already loaded
    if (get().isLoaded) return
    
    // Check promise cache for deduplication - this must come before isLoading check
    if (loadingPromises.has(path)) {
      // An identical request is already in-flight
      onStart?.()
      try {
        const rows = await loadingPromises.get(path)!
        set({ rows, isLoaded: true })
      } finally {
        onFinish?.()
      }
      return
    }
    
    // Check if already loading - skip if a different request is in progress
    if (get().isLoading) return
    
    // Start new loading operation
    set({ isLoading: true, error: null })
    onStart?.()
    
    // Create and cache the fetch promise
    const fetchPromise = loadExoplanetsFromCSV(path)
    loadingPromises.set(path, fetchPromise)
    
    try {
      // Await the promise with error handling
      const rows = await fetchPromise
      set({ rows, isLoaded: true })
    } catch (e: any) {
      set({ error: e?.message || 'Failed to load CSV' })
      console.error('Failed to load CSV:', e)
    } finally {
      // Critical cleanup - always runs
      set({ isLoading: false })
      onFinish?.()
      loadingPromises.delete(path)
    }
  },
  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilters: (f) => set({ filters: f }),
  setSelectedPlanetName: (name) => set({ selectedPlanetName: name }),

  addNote: (planetName, text, category = 'general') => {
    const key = 'exobengal.notes'
    const current = get().notesByPlanet || JSON.parse(typeof localStorage !== 'undefined' ? (localStorage.getItem(key) || '{}') : '{}')
    const updated = { ...current }
    const list = Array.isArray(updated[planetName]) ? updated[planetName] : []
    
    const newNote = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      category,
      timestamp: new Date().toISOString()
    }
    
    updated[planetName] = [...list, newNote]
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(updated)) } catch {}
    set({ notesByPlanet: updated })
  },
  updateNote: (planetName, noteId, text, category = 'general') => {
    const key = 'exobengal.notes'
    const current = get().notesByPlanet || JSON.parse(typeof localStorage !== 'undefined' ? (localStorage.getItem(key) || '{}') : '{}')
    const updated = { ...current }
    const list = Array.isArray(updated[planetName]) ? updated[planetName] : []
    
    const noteIndex = list.findIndex(note => note.id === noteId)
    if (noteIndex >= 0) {
      list[noteIndex] = {
        ...list[noteIndex],
        text,
        category,
        timestamp: new Date().toISOString()
      }
      updated[planetName] = [...list]
      try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(updated)) } catch {}
      set({ notesByPlanet: updated })
    }
  },
  deleteNote: (planetName, noteId) => {
    const key = 'exobengal.notes'
    const current = get().notesByPlanet || JSON.parse(typeof localStorage !== 'undefined' ? (localStorage.getItem(key) || '{}') : '{}')
    const list = Array.isArray(current[planetName]) ? current[planetName] : []
    const updatedList = list.filter(note => note.id !== noteId)
    const updated = { ...current, [planetName]: updatedList }
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(updated)) } catch {}
    set({ notesByPlanet: updated })
  },

  getPlanetBySlug: (slug) => {
    const filteredRows = selectFilteredRows(get())
    
    // Normalize the incoming slug to handle mixed-case or slightly malformed slugs
    const normalizedSlug = normalizeSlug(slug)
    
    // If normalization results in an empty string, the slug is truly invalid
    if (!normalizedSlug) {
      return undefined
    }
    
    // Find planet by comparing normalized slug against planetNameToSlug for each row
    const planet = filteredRows.find(r => {
      if (!r.pl_name) return false
      const planetSlug = planetNameToSlug(r.pl_name)
      return planetSlug === normalizedSlug
    })
    
    return planet
  },

  getPlanetBySlugUnfiltered: (slug) => {
    const { rows } = get()
    
    // Normalize the incoming slug to handle mixed-case or slightly malformed slugs
    const normalizedSlug = normalizeSlug(slug)
    
    // If normalization results in an empty string, the slug is truly invalid
    if (!normalizedSlug) {
      return undefined
    }
    
    // Find planet by comparing normalized slug against planetNameToSlug for each row
    const planet = rows.find(r => {
      if (!r.pl_name) return false
      const planetSlug = planetNameToSlug(r.pl_name)
      return planetSlug === normalizedSlug
    })
    
    return planet
  },

  getPlanetSlug: (planetName) => {
    return planetNameToSlug(planetName)
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
    if (filters.habitable !== null) {
      const semiMajorAxis = r.pl_orbsmax
      const starTeff = r.st_teff
      
      if (semiMajorAxis && starTeff) {
        // Simple habitability calculation based on effective temperature
        const habZoneInner = Math.sqrt(starTeff / 5778) * 0.95
        const habZoneOuter = Math.sqrt(starTeff / 5778) * 1.37
        const isHabitable = semiMajorAxis >= habZoneInner && semiMajorAxis <= habZoneOuter
        
        if (filters.habitable !== isHabitable) return false
      } else {
        // If we can't determine habitability and filter requires it, exclude
        if (filters.habitable === true) return false
      }
    }
    return true
  })
}


