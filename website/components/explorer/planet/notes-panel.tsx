'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Edit2, 
  FileText, 
  Plus, 
  Save, 
  Search, 
  Trash2, 
  X,
  Tag,
  Filter,
  Download,
  Share2
} from 'lucide-react'
import { useExplorerStore } from '@/lib/explorer-store'

interface NotesPanelProps {
  planetName: string
}

export function NotesPanel({ planetName }: NotesPanelProps) {
  const { notesByPlanet, addNote, updateNote, deleteNote } = useExplorerStore()
  const planetNotes = notesByPlanet[planetName] || []
  
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')
  const [noteCategory, setNoteCategory] = useState<'observation' | 'analysis' | 'question' | 'general'>('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  // Categories for notes
  const categories = [
    { value: 'general', label: 'General', color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' },
    { value: 'observation', label: 'Observation', color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' },
    { value: 'analysis', label: 'Analysis', color: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' },
    { value: 'question', label: 'Question', color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' }
  ]

  // Filter notes based on search and category
  const filteredNotes = planetNotes.filter(note => {
    const matchesSearch = note.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || note.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote(planetName, noteText, noteCategory)
      setNoteText('')
      setIsAddingNote(false)
      setNoteCategory('general')
    }
  }

  const handleUpdateNote = (noteId: string) => {
    if (noteText.trim()) {
      updateNote(planetName, noteId, noteText, noteCategory)
      setNoteText('')
      setEditingNoteId(null)
      setNoteCategory('general')
    }
  }

  const startEditingNote = (note: any) => {
    setEditingNoteId(note.id)
    setNoteText(note.text)
    setNoteCategory(note.category || 'general')
  }

  const exportNotes = () => {
    const notesData = {
      planet: planetName,
      exportDate: new Date().toISOString(),
      notes: planetNotes
    }
    const blob = new Blob([JSON.stringify(notesData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${planetName.replace(/\s+/g, '_')}_notes.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareNotes = () => {
    if (navigator.share) {
      const notesText = planetNotes.map(note => 
        `[${note.category || 'general'}] ${note.text}\n${new Date(note.timestamp).toLocaleString()}`
      ).join('\n\n')
      
      navigator.share({
        title: `Notes for ${planetName}`,
        text: notesText
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Research Notes
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={shareNotes}
              className="p-2 hover:bg-light-surface dark:hover:bg-dark-surface rounded-md transition-colors"
              title="Share notes"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={exportNotes}
              className="p-2 hover:bg-light-surface dark:hover:bg-dark-surface rounded-md transition-colors"
              title="Export notes"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsAddingNote(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-dark-blue text-white rounded-md hover:bg-primary-dark-blue/90 transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              Add Note
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-3 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-light-blue"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-light-blue"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Add/Edit Note Form */}
        <AnimatePresence>
          {(isAddingNote || editingNoteId) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
                <div className="mb-3">
                  <label className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1 block">
                    Category
                  </label>
                  <div className="flex gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.value}
                        onClick={() => setNoteCategory(cat.value as any)}
                        className={`px-3 py-1 rounded-md text-xs transition-colors ${
                          noteCategory === cat.value 
                            ? cat.color 
                            : 'bg-light-surface dark:bg-dark-surface hover:bg-light-hover dark:hover:bg-dark-hover'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Enter your note here..."
                  className="w-full p-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-light-blue"
                  rows={4}
                  autoFocus
                />
                
                <div className="flex items-center justify-end gap-2 mt-3">
                  <button
                    onClick={() => {
                      setIsAddingNote(false)
                      setEditingNoteId(null)
                      setNoteText('')
                      setNoteCategory('general')
                    }}
                    className="px-3 py-1.5 text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => editingNoteId ? handleUpdateNote(editingNoteId) : handleAddNote()}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary-dark-blue text-white rounded-md hover:bg-primary-dark-blue/90 transition-colors text-sm"
                  >
                    <Save className="h-4 w-4" />
                    {editingNoteId ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes List */}
        <div className="space-y-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => {
              const category = categories.find(cat => cat.value === note.category) || categories[0]
              
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-md text-xs ${category.color}`}>
                        {category.label}
                      </span>
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(note.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEditingNote(note)}
                        className="p-1 hover:bg-light-hover dark:hover:bg-dark-hover rounded transition-colors"
                        title="Edit note"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(planetName, note.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-light-text-primary dark:text-dark-text-primary whitespace-pre-wrap">
                    {note.text}
                  </p>
                </motion.div>
              )
            })
          ) : (
            <div className="text-center py-8">
              <FileText className="h-8 w-8 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-3" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {searchQuery || filterCategory !== 'all' 
                  ? 'No notes match your search criteria' 
                  : 'No notes yet. Click "Add Note" to start documenting your research!'}
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {planetNotes.length > 0 && (
          <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary">
              <span>{planetNotes.length} total notes</span>
              <div className="flex gap-3">
                {categories.map(cat => {
                  const count = planetNotes.filter(n => n.category === cat.value).length
                  return count > 0 ? (
                    <span key={cat.value}>
                      {count} {cat.label.toLowerCase()}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
