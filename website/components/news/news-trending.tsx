'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, ExternalLink, Flame } from 'lucide-react'
import { type NewsItem } from '@/lib/news-api'
import Link from 'next/link'

interface NewsTrendingProps {
  news: NewsItem[]
  className?: string
}

export function NewsTrending({ news, className = '' }: NewsTrendingProps) {
  const [trendingNews, setTrendingNews] = useState<NewsItem[]>([])

  useEffect(() => {
    // Simple trending algorithm based on recency and category
    const scored = news.map(item => {
      const hoursAgo = (Date.now() - new Date(item.publishedAt).getTime()) / (1000 * 60 * 60)
      let score = 0
      
      // Recency score (more recent = higher score)
      if (hoursAgo < 6) score += 10
      else if (hoursAgo < 24) score += 5
      else if (hoursAgo < 72) score += 2
      
      // Category importance
      if (item.category === 'discovery') score += 8
      else if (item.category === 'exoplanet') score += 6
      else if (item.category === 'astronomy') score += 4
      
      // Source credibility
      if (item.source === 'NASA') score += 5
      else if (item.source === 'ESA') score += 4
      else score += 2
      
      return { ...item, trendingScore: score }
    })

    const trending = scored
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 5)
    
    setTrendingNews(trending)
  }, [news])

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
      case 'nasa': return '🚀'
      case 'esa': return '🛰️'
      case 'space.com': return '🌌'
      case 'universe today': return '⭐'
      case 'nasa astrobiology': return '🧬'
      default: return '📡'
    }
  }

  if (trendingNews.length === 0) return null

  return (
    <div className={`card ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="h-5 w-5 text-primary-reddish-orange" />
          <h3 className="text-lg font-semibold">Trending Now</h3>
          <TrendingUp className="h-4 w-4 text-primary-reddish-orange" />
        </div>

        <div className="space-y-4">
          {trendingNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-dark-blue to-primary-light-blue flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{getSourceIcon(article.source)}</span>
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {article.source}
                      </span>
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary-light-blue transition-colors mb-2">
                      {article.title}
                    </h4>
                    
                    {article.description && (
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
                        {article.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <ExternalLink className="h-3 w-3 text-light-text-secondary dark:text-dark-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border">
          <Link
            href="/news"
            className="text-sm text-primary-dark-blue dark:text-primary-light-blue hover:underline flex items-center gap-1"
          >
            View all news
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
