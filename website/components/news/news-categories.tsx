'use client'

import { motion } from 'framer-motion'
import { 
  Telescope, 
  Satellite, 
  Globe, 
  Zap, 
  Lightbulb,
  Microscope,
  Calculator,
  BookOpen
} from 'lucide-react'
import { type NewsItem } from '@/lib/news-api'

interface NewsCategoriesProps {
  news: NewsItem[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
  className?: string
}

export function NewsCategories({ 
  news, 
  selectedCategory, 
  onCategorySelect, 
  className = '' 
}: NewsCategoriesProps) {
  const categories = [
    {
      id: 'all',
      name: 'All News',
      icon: Globe,
      color: 'from-slate-500 to-slate-600',
      description: 'All exoplanet and astronomy news'
    },
    {
      id: 'exoplanet',
      name: 'Exoplanets',
      icon: Telescope,
      color: 'from-primary-dark-blue to-primary-light-blue',
      description: 'New world discoveries and characterization'
    },
    {
      id: 'discovery',
      name: 'Discoveries',
      icon: Lightbulb,
      color: 'from-primary-reddish-orange to-yellow-500',
      description: 'Breakthrough findings and observations'
    },
    {
      id: 'astronomy',
      name: 'Astronomy',
      icon: Satellite,
      color: 'from-primary-light-blue to-primary-cyan',
      description: 'General astronomy and space science'
    },
    {
      id: 'space',
      name: 'Space Tech',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      description: 'Mission updates and technology'
    },
    {
      id: 'research',
      name: 'Research',
      icon: Microscope,
      color: 'from-green-500 to-emerald-600',
      description: 'Scientific studies and analysis'
    },
    {
      id: 'data',
      name: 'Data Science',
      icon: Calculator,
      color: 'from-orange-500 to-red-500',
      description: 'Data analysis and computational methods'
    },
    {
      id: 'education',
      name: 'Education',
      icon: BookOpen,
      color: 'from-indigo-500 to-blue-600',
      description: 'Educational content and outreach'
    }
  ]

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return news.length
    return news.filter(item => item.category === categoryId).length
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 ${className}`}>
      {categories.map((category, index) => {
        const count = getCategoryCount(category.id)
        const isSelected = selectedCategory === category.id
        const IconComponent = category.icon

        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onCategorySelect(category.id)}
            className={`group relative p-4 transition-all duration-300 clip-corner-cut ${
              isSelected
                ? 'ring-2 ring-primary-light-blue shadow-lg scale-105'
                : 'hover:scale-105 hover:shadow-md'
            }`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} clip-corner-cut transition-opacity ${
              isSelected ? 'opacity-20' : 'opacity-10 group-hover:opacity-15'
            }`} />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 transition-colors ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary group-hover:bg-white/10'
              }`}>
                <IconComponent className="h-5 w-5" />
              </div>
              
              <h3 className={`text-xs font-medium mb-1 transition-colors ${
                isSelected 
                  ? 'text-primary-dark-blue dark:text-primary-light-blue' 
                  : 'text-light-text-primary dark:text-dark-text-primary'
              }`}>
                {category.name}
              </h3>
              
              <div className={`text-xs transition-colors ${
                isSelected 
                  ? 'text-primary-dark-blue/80 dark:text-primary-light-blue/80' 
                  : 'text-light-text-secondary dark:text-dark-text-secondary'
              }`}>
                {count} {count === 1 ? 'article' : 'articles'}
              </div>
            </div>

            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                layoutId="categorySelection"
                className="absolute inset-0 rounded-xl border-2 border-primary-light-blue"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark-card text-dark-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
              {category.description}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
