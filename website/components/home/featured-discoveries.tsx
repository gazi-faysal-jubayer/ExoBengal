'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Telescope, Orbit } from 'lucide-react'

interface Discovery {
  id: string
  name: string
  description: string
  discoveryDate: string
  method: string
  distance: string
  imageUrl: string
  highlights: string[]
}

const featuredDiscoveries: Discovery[] = [
  {
    id: '1',
    name: 'TOI-5205 b',
    description: 'A gas giant planet orbiting an M-dwarf star, challenging our understanding of planetary formation.',
    discoveryDate: '2023',
    method: 'Transit',
    distance: '280 light-years',
    imageUrl: '/images/exoplanet-1.jpg',
    highlights: ['Unusually large for its host star', 'Nearly as big as Jupiter', 'Orbits every 1.6 days'],
  },
  {
    id: '2',
    name: 'LP 890-9 c',
    description: 'A potentially habitable super-Earth in the habitable zone of a nearby red dwarf star.',
    discoveryDate: '2022',
    method: 'Transit',
    distance: '105 light-years',
    imageUrl: '/images/exoplanet-2.jpg',
    highlights: ['In the habitable zone', '40% larger than Earth', 'Potential for liquid water'],
  },
  {
    id: '3',
    name: 'WASP-193b',
    description: 'An extremely low-density planet, likened to cosmic cotton candy.',
    discoveryDate: '2023',
    method: 'Transit',
    distance: '1,200 light-years',
    imageUrl: '/images/exoplanet-3.jpg',
    highlights: ['50% larger than Jupiter', 'Only 14% of Jupiter\'s mass', 'Density similar to cotton candy'],
  },
]

export function FeaturedDiscoveries() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredDiscoveries.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredDiscoveries.length) % featuredDiscoveries.length)
  }

  const currentDiscovery = featuredDiscoveries[currentIndex]

  return (
    <section className="py-16 bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Featured Discoveries
          </h2>
          <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Recent groundbreaking exoplanet discoveries that expand our cosmic horizons
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDiscovery.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="card p-0 lg:flex card-hover"
              >
                {/* Image Section */}
                <div className="lg:w-1/2 h-64 lg:h-auto relative bg-gradient-to-br from-primary-dark-blue to-primary-light-blue">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Orbit className="h-32 w-32 text-white/20 animate-spin-slow" />
                  </div>
                  {/* Placeholder for actual image */}
                  <div className="relative h-full flex items-center justify-center">
                    <p className="text-white text-xl font-semibold">Artist&apos;s Conception</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                    {currentDiscovery.name}
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    {currentDiscovery.description}
                  </p>

                  {/* Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary-light-blue" />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {currentDiscovery.discoveryDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Telescope className="h-4 w-4 text-primary-light-blue" />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {currentDiscovery.method}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Orbit className="h-4 w-4 text-primary-light-blue" />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {currentDiscovery.distance}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-1">
                      {currentDiscovery.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-light-text-secondary dark:text-dark-text-secondary flex items-start">
                          <span className="text-primary-light-blue mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/explorer?planet=${currentDiscovery.name}`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-12">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Previous discovery"
            >
              <ChevronLeft className="h-6 w-6 text-light-text-primary dark:text-dark-text-primary" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12">
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Next discovery"
            >
              <ChevronRight className="h-6 w-6 text-light-text-primary dark:text-dark-text-primary" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {featuredDiscoveries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary-dark-blue'
                    : 'w-2 bg-light-border dark:bg-dark-border'
                }`}
                aria-label={`Go to discovery ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

