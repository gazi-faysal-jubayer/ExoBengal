'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Clock, Globe, Rss, ChevronLeft, ChevronRight, Pause, Play, Rocket, Satellite, Telescope, Star, Atom, Beaker, Microscope, BookOpen, BarChart3, Search } from 'lucide-react'
import { fetchAllExoplanetNews, getCachedNews, setCachedNews, isCacheFresh, type NewsItem } from '@/lib/news-api'
import Link from 'next/link'

interface NewsBarProps {
  className?: string
  compact?: boolean
}

export function NewsBar({ className = '', compact = false }: NewsBarProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Load news on component mount
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true)
      
      // Try to use cached news first
      if (isCacheFresh()) {
        const cached = getCachedNews()
        if (cached.length > 0) {
          setNews(cached)
          setIsLoading(false)
          return
        }
      }

      // Fetch fresh news
      try {
        const freshNews = await fetchAllExoplanetNews()
        if (freshNews.length > 0) {
          setNews(freshNews)
          setCachedNews(freshNews)
        } else {
          // Fallback to cached news even if stale
          const cached = getCachedNews()
          setNews(cached)
        }
      } catch (error) {
        console.error('Failed to load news:', error)
        // Use cached news as fallback
        const cached = getCachedNews()
        setNews(cached)
      } finally {
        setIsLoading(false)
      }
    }

    loadNews()
  }, [])

  // Auto-advance news items
  useEffect(() => {
    if (!isPlaying || news.length <= 1) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length)
    }, 8000) // 8 seconds per item

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, news.length])

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % news.length)
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + news.length) % news.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'nasa': return <Rocket className="h-4 w-4" />
      case 'nasa apod': return <Star className="h-4 w-4" />
      case 'esa': return <Satellite className="h-4 w-4" />
      case 'space.com': return <Telescope className="h-4 w-4" />
      case 'universe today': return <Star className="h-4 w-4" />
      case 'nasa astrobiology': return <Atom className="h-4 w-4" />
      case 'phys.org': return <Beaker className="h-4 w-4" />
      case 'science news': return <Microscope className="h-4 w-4" />
      case 'astronomy magazine': return <BookOpen className="h-4 w-4" />
      case 'scientific american': return <BarChart3 className="h-4 w-4" />
      case 'new scientist': return <Search className="h-4 w-4" />
      default: return <Rss className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exoplanet': return 'bg-primary-dark-blue/10 text-primary-dark-blue'
      case 'discovery': return 'bg-primary-reddish-orange/10 text-primary-reddish-orange'
      case 'astronomy': return 'bg-primary-light-blue/10 text-primary-light-blue'
      case 'space': return 'bg-primary-cyan/10 text-primary-cyan'
      default: return 'bg-light-surface dark:bg-dark-surface'
    }
  }

  if (isLoading) {
    return (
      <div className={`border-b border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card ${className}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center ${compact ? 'py-2' : 'py-3'}`}>
            <div className="flex items-center gap-2 text-primary-dark-blue dark:text-primary-light-blue">
              <Rss className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Loading latest exoplanet news...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (news.length === 0) {
    return null
  }

  const currentNews = news[currentIndex]

  return (
    <div className={`border-b border-light-border dark:border-dark-border bg-gradient-to-r from-light-card via-light-surface to-light-card dark:from-dark-card dark:via-dark-surface dark:to-dark-card ${className}`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between ${compact ? 'py-2' : 'py-3'}`}>
          {/* News Content */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Live indicator */}
            <div className="flex items-center gap-2 text-primary-dark-blue dark:text-primary-light-blue flex-shrink-0">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary-reddish-orange rounded-full animate-pulse" />
                <Rss className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium hidden sm:block">Live News</span>
            </div>

            {/* News item */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                {/* Source and category */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-primary-light-blue">{getSourceIcon(currentNews.source)}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentNews.category)}`}>
                    {currentNews.category}
                  </span>
                </div>

                {/* Title and meta */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={currentNews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 hover:text-primary-light-blue transition-colors"
                  >
                    <h3 className="text-sm font-medium truncate group-hover:text-primary-light-blue">
                      {currentNews.title}
                    </h3>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                  
                  <div className="flex items-center gap-3 text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {currentNews.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(currentNews.publishedAt)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-1">
              {news.slice(0, Math.min(5, news.length)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-primary-dark-blue dark:bg-primary-light-blue'
                      : 'bg-light-border dark:bg-dark-border hover:bg-light-text-secondary'
                  }`}
                  aria-label={`Go to news item ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={goToPrevious}
                className="p-1 rounded hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                aria-label="Previous news"
                disabled={news.length <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-1 rounded hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                aria-label={isPlaying ? 'Pause auto-advance' : 'Resume auto-advance'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              
              <button
                onClick={goToNext}
                className="p-1 rounded hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                aria-label="Next news"
                disabled={news.length <= 1}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Count indicator */}
            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary hidden md:block">
              {currentIndex + 1} of {news.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
