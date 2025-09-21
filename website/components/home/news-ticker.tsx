'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ExternalLink, Newspaper } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  date: string
  source: string
  link: string
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'JWST Discovers Methane in Exoplanet Atmosphere',
    date: '2024-01-15',
    source: 'NASA',
    link: 'https://exoplanets.nasa.gov',
  },
  {
    id: '2',
    title: 'New Earth-sized Planet Found in Habitable Zone',
    date: '2024-01-12',
    source: 'ESA',
    link: 'https://www.esa.int',
  },
  {
    id: '3',
    title: 'TESS Mission Confirms 5,000th Exoplanet',
    date: '2024-01-10',
    source: 'MIT',
    link: 'https://tess.mit.edu',
  },
  {
    id: '4',
    title: 'First Rocky Planet Discovered Around White Dwarf',
    date: '2024-01-08',
    source: 'Nature',
    link: 'https://www.nature.com',
  },
]

export function NewsTicker() {
  return (
    <section className="py-8 bg-light-surface dark:bg-dark-surface overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary-reddish-orange" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-text-primary dark:text-dark-text-primary">
              Latest News
            </h3>
          </div>
          <div className="h-px flex-1 bg-light-border dark:bg-dark-border" />
        </div>

        {/* News Ticker */}
        <div className="relative">
          <motion.div
            className="flex gap-8"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {/* Duplicate news items for seamless loop */}
            {[...newsItems, ...newsItems].map((item, index) => (
              <Link
                key={`${item.id}-${index}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 group"
              >
                <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <div className="flex items-center gap-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="h-4 w-px bg-light-border dark:bg-dark-border" />
                  <p className="text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-primary-light-blue transition-colors">
                    {item.title}
                  </p>
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    ({item.source})
                  </span>
                  <ExternalLink className="h-3 w-3 text-light-text-secondary dark:text-dark-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

