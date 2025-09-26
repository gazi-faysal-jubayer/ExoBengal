'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Clock, Globe, Rocket, Satellite, Telescope, Star, Atom, Beaker, Microscope, BookOpen, BarChart3, Search, Rss } from 'lucide-react'
import { fetchAllExoplanetNews, getCachedNews, isCacheFresh, type NewsItem } from '@/lib/news-api'
import Link from 'next/link'

export function NewsPreview() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        // Try cached news first
        if (isCacheFresh()) {
          const cached = getCachedNews()
          if (cached.length > 0) {
            setNews(cached.slice(0, 6))
            setIsLoading(false)
            return
          }
        }

        // Fetch fresh news
        const freshNews = await fetchAllExoplanetNews()
        setNews(freshNews.slice(0, 6))
      } catch (error) {
        console.error('Failed to load news preview:', error)
        const cached = getCachedNews()
        setNews(cached.slice(0, 6))
      } finally {
        setIsLoading(false)
      }
    }

    loadNews()
  }, [])

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

  return (
    <section className="py-24 bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Exoplanet News
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Stay updated with the newest discoveries, missions, and research in exoplanet science from leading space agencies and institutions.
            </p>
          </motion.div>
        </div>

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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-primary-light-blue">{getSourceIcon(article.source)}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary-light-blue transition-colors line-clamp-2">
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
                      Read
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* CTA to full news page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-3"
          >
            View All News
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
