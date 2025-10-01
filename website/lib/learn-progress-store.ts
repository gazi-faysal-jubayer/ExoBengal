'use client'

import { create } from 'zustand'
import { learningModules } from '@/lib/learn-modules'

/**
 * Status of a learning module
 */
export type ModuleStatus = 'not-started' | 'in-progress' | 'completed'

/**
 * Progress tracking data for a learning module
 */
export interface ModuleProgress {
  /** Module ID matching the module.id from learningModules */
  moduleId: string
  /** Current status of the module */
  status: ModuleStatus
  /** ISO timestamp of last access */
  lastAccessed: string
  /** ISO timestamp when module was completed (null if not completed) */
  completedAt: string | null
  /** ISO timestamp when module was first accessed (null if not started) */
  startedAt: string | null
}

/**
 * State interface for the learn progress store
 */
export interface LearnProgressState {
  /** Progress data keyed by moduleId */
  progress: Record<string, ModuleProgress>
  /** Whether data has been loaded from localStorage */
  isLoaded: boolean

  // Actions
  /** Load progress from localStorage on initialization */
  loadProgress: () => void
  /** Mark a module as in-progress */
  markModuleInProgress: (moduleId: string) => void
  /** Mark a module as completed */
  markModuleCompleted: (moduleId: string) => void
  /** Reset a module to not-started */
  resetModuleProgress: (moduleId: string) => void
  /** Get progress for a specific module */
  getModuleProgress: (moduleId: string) => ModuleProgress
  /** Calculate overall completion statistics */
  getOverallProgress: () => {
    totalModules: number
    completedCount: number
    inProgressCount: number
    notStartedCount: number
    completionPercentage: number
  }
}

/**
 * Helper function to save progress to localStorage
 */
function saveProgressToLocalStorage(progress: Record<string, ModuleProgress>): void {
  if (typeof localStorage === 'undefined') return
  
  try {
    localStorage.setItem('exobengal.learn.progress', JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error)
  }
}

/**
 * Helper function to load progress from localStorage
 */
function loadProgressFromLocalStorage(): Record<string, ModuleProgress> {
  if (typeof localStorage === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem('exobengal.learn.progress')
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Failed to load progress from localStorage:', error)
    return {}
  }
}

export const useLearnProgressStore = create<LearnProgressState>((set, get) => ({
  progress: {},
  isLoaded: false,

  loadProgress: () => {
    const progress = loadProgressFromLocalStorage()
    set({ progress, isLoaded: true })
  },

  markModuleInProgress: (moduleId: string) => {
    const currentProgress = get().progress
    const existing = currentProgress[moduleId]
    
    // Don't change status if already completed
    if (existing?.status === 'completed') return
    
    const now = new Date().toISOString()
    const updated = {
      ...currentProgress,
      [moduleId]: {
        moduleId,
        status: 'in-progress' as ModuleStatus,
        lastAccessed: now,
        completedAt: existing?.completedAt || null,
        startedAt: existing?.startedAt || now,
      }
    }
    
    saveProgressToLocalStorage(updated)
    set({ progress: updated })
  },

  markModuleCompleted: (moduleId: string) => {
    const currentProgress = get().progress
    const existing = currentProgress[moduleId]
    const now = new Date().toISOString()
    
    const updated = {
      ...currentProgress,
      [moduleId]: {
        moduleId,
        status: 'completed' as ModuleStatus,
        lastAccessed: now,
        completedAt: now,
        startedAt: existing?.startedAt || now,
      }
    }
    
    saveProgressToLocalStorage(updated)
    set({ progress: updated })
  },

  resetModuleProgress: (moduleId: string) => {
    const currentProgress = get().progress
    const updated = { ...currentProgress }
    delete updated[moduleId]
    
    saveProgressToLocalStorage(updated)
    set({ progress: updated })
  },

  getModuleProgress: (moduleId: string): ModuleProgress => {
    const progress = get().progress
    return progress[moduleId] || {
      moduleId,
      status: 'not-started',
      lastAccessed: '',
      completedAt: null,
      startedAt: null,
    }
  },

  getOverallProgress: () => {
    const progress = get().progress
    const totalModules = learningModules.length
    let completedCount = 0
    let inProgressCount = 0
    let notStartedCount = 0

    learningModules.forEach(module => {
      const moduleProgress = progress[module.id]
      if (!moduleProgress) {
        notStartedCount++
      } else {
        switch (moduleProgress.status) {
          case 'completed':
            completedCount++
            break
          case 'in-progress':
            inProgressCount++
            break
          case 'not-started':
            notStartedCount++
            break
        }
      }
    })

    const completionPercentage = totalModules > 0 
      ? Math.round((completedCount / totalModules) * 100 * 10) / 10 
      : 0

    return {
      totalModules,
      completedCount,
      inProgressCount,
      notStartedCount,
      completionPercentage,
    }
  },
}))

// Auto-load progress when store is created
if (typeof window !== 'undefined') {
  useLearnProgressStore.getState().loadProgress()
}
