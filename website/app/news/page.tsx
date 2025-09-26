'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Calendar, 
  Globe, 
  ExternalLink, 
  Clock, 
  Bookmark, 
  BookmarkCheck,
  Rss,
  TrendingUp,
  Star,
  Grid,
  List,
  ChevronDown,
  RefreshCw
} from 'lucide-react'
import { fetchAllExoplanetNews, getCachedNews, setCachedNews, isCacheFresh, type NewsItem } from '@/lib/news-api'
import { NewsCategories } from '@/components/news/news-categories'
import { NewsTrending } from '@/components/news/news-trending'
import Link from 'next/link'
import Image from 'next/image'

interface NewsFilters {
  search: string
  category: string
  source: string
  dateRange: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [filters, setFilters] = useState<NewsFilters>({
    search: '',
    category: 'all',
    source: 'all',
    dateRange: 'all'
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [bookmarkedNews, setBookmarkedNews] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Load bookmarks from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookmarked-news')
      setBookmarkedNews(saved ? JSON.parse(saved) : [])
    }
  }, [])

  // Load news on component mount
  useEffect(() => {
    loadNews(false)
  }, [])

  // Filter news based on filters
  useEffect(() => {
    let filtered = news

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.source.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    // Source filter
    if (filters.source !== 'all') {
      filtered = filtered.filter(item => item.source.toLowerCase() === filters.source.toLowerCase())
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date()
      let cutoffDate: Date

      switch (filters.dateRange) {
        case 'today':
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          cutoffDate = new Date(0)
      }

      filtered = filtered.filter(item => new Date(item.publishedAt) >= cutoffDate)
    }

    setFilteredNews(filtered)
  }, [news, filters])

  const loadNews = async (force = false) => {
    if (force) setIsRefreshing(true)
    else setIsLoading(true)

    try {
      // Try cached news first unless forcing refresh
      if (!force && isCacheFresh()) {
        const cached = getCachedNews()
        if (cached.length > 0) {
          setNews(cached)
          setIsLoading(false)
          return
        }
      }

      // Fetch fresh news
      const freshNews = await fetchAllExoplanetNews()
      if (freshNews.length > 0) {
        setNews(freshNews)
        setCachedNews(freshNews)
      } else {
        // Fallback to cached news
        const cached = getCachedNews()
        setNews(cached)
      }
    } catch (error) {
      console.error('Failed to load news:', error)
      const cached = getCachedNews()
      setNews(cached)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const toggleBookmark = (newsId: string) => {
    const newBookmarks = bookmarkedNews.includes(newsId)
      ? bookmarkedNews.filter(id => id !== newsId)
      : [...bookmarkedNews, newsId]
    
    setBookmarkedNews(newBookmarks)
    localStorage.setItem('bookmarked-news', JSON.stringify(newBookmarks))
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks}w ago`
  }

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'nasa': return '🚀'
      case 'nasa apod': return '🌠'
      case 'esa': return '🛰️'
      case 'space.com': return '🌌'
      case 'universe today': return '⭐'
      case 'nasa astrobiology': return '🧬'
      case 'phys.org': return '⚗️'
      case 'science news': return '🔬'
      case 'astronomy magazine': return '🌟'
      case 'scientific american': return '📊'
      case 'new scientist': return '🔍'
      default: return '📡'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exoplanet': return 'bg-primary-dark-blue/10 text-primary-dark-blue border-primary-dark-blue/20'
      case 'discovery': return 'bg-primary-reddish-orange/10 text-primary-reddish-orange border-primary-reddish-orange/20'
      case 'astronomy': return 'bg-primary-light-blue/10 text-primary-light-blue border-primary-light-blue/20'
      case 'space': return 'bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20'
      default: return 'bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border'
    }
  }

  const uniqueSources = useMemo(() => {
    const sources = Array.from(new Set(news.map(item => item.source)))
    return sources.sort()
  }, [news])

  const uniqueCategories = useMemo(() => {
    const categories = Array.from(new Set(news.map(item => item.category)))
    return categories.sort()
  }, [news])

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-dark-blue via-primary-light-blue to-primary-cyan text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Rss className="h-8 w-8" />
              <h1 className="text-4xl md:text-5xl font-bold">Exoplanet News</h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Stay up-to-date with the latest discoveries, research, and missions in exoplanet science from NASA, ESA, and leading astronomy publications.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>{news.length} articles</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{uniqueSources.length} sources</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{bookmarkedNews.length} bookmarked</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="sticky top-16 z-40 bg-light-card/95 dark:bg-dark-card/95 backdrop-blur-md border-b border-light-border dark:border-dark-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 input-base"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2 lg:hidden"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Filters */}
            <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="input-base"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              {/* Source Filter */}
              <select
                value={filters.source}
                onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                className="input-base"
              >
                <option value="all">All Sources</option>
                {uniqueSources.map(source => (
                  <option key={source} value={source.toLowerCase()}>
                    {source}
                  </option>
                ))}
              </select>

              {/* Date Range Filter */}
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="input-base"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
              </select>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-dark-blue text-white' 
                    : 'text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary'
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-dark-blue text-white' 
                    : 'text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary'
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => loadNews(true)}
                disabled={isRefreshing}
                className="p-2 rounded-md text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                aria-label="Refresh news"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <NewsCategories
          news={news}
          selectedCategory={filters.category}
          onCategorySelect={(category) => setFilters(prev => ({ ...prev, category }))}
          className="mb-8"
        />
      </section>

      {/* News Content */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-light-surface dark:bg-dark-surface rounded mb-4" />
                  <div className="h-20 bg-light-surface dark:bg-dark-surface rounded mb-4" />
                  <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto mb-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            <AnimatePresence>
              {filteredNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`card group hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex gap-6' : ''
                  }`}
                >
                  {/* Image placeholder for list view */}
                  {viewMode === 'list' && (
                    <div className="w-48 h-32 bg-gradient-to-br from-primary-dark-blue to-primary-light-blue rounded-lg flex-shrink-0" />
                  )}

                  <div className="p-6 flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getSourceIcon(article.source)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleBookmark(article.id)}
                        className="p-1 rounded hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                        aria-label={bookmarkedNews.includes(article.id) ? 'Remove bookmark' : 'Add bookmark'}
                      >
                        {bookmarkedNews.includes(article.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-primary-reddish-orange" />
                        ) : (
                          <Bookmark className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                        )}
                      </button>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary-light-blue transition-colors">
                      {article.title}
                    </h3>
                    
                    {article.description && (
                      <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4 line-clamp-3">
                        {article.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {article.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                      </div>
                      
                      <Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm"
                      >
                        Read more
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <NewsTrending news={news} />
              
              {/* Quick Stats */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total Articles</span>
                    <span className="font-medium">{news.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Filtered Results</span>
                    <span className="font-medium">{filteredNews.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Sources</span>
                    <span className="font-medium">{uniqueSources.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Bookmarked</span>
                    <span className="font-medium">{bookmarkedNews.length}</span>
                  </div>
                </div>
              </div>

              {/* Recent Sources */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">News Sources</h3>
                <div className="space-y-2">
                  {uniqueSources.map(source => (
                    <div key={source} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getSourceIcon(source)}</span>
                        <span className="text-sm">{source}</span>
                      </div>
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {news.filter(item => item.source === source).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
