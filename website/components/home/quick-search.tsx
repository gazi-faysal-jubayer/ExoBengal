'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Filter, TrendingUp, Star, Orbit, Zap } from 'lucide-react'

const quickFilters = [
  { label: 'Earth-like Planets', icon: Orbit, query: 'radius:0.8-1.2' },
  { label: 'Hot Jupiters', icon: Zap, query: 'temperature:>1000' },
  { label: 'Recent Discoveries', icon: TrendingUp, query: 'year:2023-2024' },
  { label: 'Habitable Zone', icon: Star, query: 'habitable:true' },
]

export function QuickSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explorer?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleQuickFilter = (query: string) => {
    router.push(`/explorer?filter=${encodeURIComponent(query)}`)
  }

  return (
    <section className="py-16 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Start Your Exploration
            </h2>
            <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
              Search through thousands of exoplanets or use our quick filters
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by planet name, star system, or characteristics..."
                className="w-full pl-12 pr-4 py-4 text-lg input-base rounded-full shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary rounded-full px-6 py-2"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickFilters.map((filter) => (
              <motion.button
                key={filter.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickFilter(filter.query)}
                className="card p-6 text-center card-hover group"
              >
                <filter.icon className="h-8 w-8 mx-auto mb-3 text-primary-light-blue group-hover:text-primary-dark-blue transition-colors" />
                <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                  {filter.label}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Advanced Search Link */}
          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/explorer')}
              className="inline-flex items-center gap-2 text-primary-dark-blue hover:text-primary-light-blue transition-colors"
            >
              <Filter className="h-4 w-4" />
              Advanced Search & Filters
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

