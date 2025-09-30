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
  nasaUrl: string
}

const featuredDiscoveries: Discovery[] = [
  {
    id: '1',
    name: 'HIP 65426 b',
    description: 'A massive gas giant planet directly imaged around a young A-type star, providing insights into planetary formation.',
    discoveryDate: '2017',
    method: 'Direct Imaging',
    distance: '385 light-years',
    imageUrl: '/images/exoplanet-1.jpg',
    highlights: ['Directly imaged exoplanet', 'Massive gas giant', 'Young planetary system'],
    nasaUrl: 'https://eyes.nasa.gov/apps/exo/#/planet/HIP_65426_b',
  },
  {
    id: '2',
    name: 'Kepler-22 b',
    description: 'The first confirmed exoplanet in the habitable zone of a Sun-like star, opening new possibilities for life.',
    discoveryDate: '2011',
    method: 'Transit',
    distance: '600 light-years',
    imageUrl: '/images/exoplanet-2.jpg',
    highlights: ['First habitable zone planet', '2.4x Earth radius', '290-day orbital period'],
    nasaUrl: 'https://eyes.nasa.gov/apps/exo/#/planet/Kepler-22_b',
  },
  {
    id: '3',
    name: 'GJ 15 A b',
    description: 'A super-Earth orbiting one of the nearest stars to our solar system, making it an ideal target for study.',
    discoveryDate: '2014',
    method: 'Radial Velocity',
    distance: '11.6 light-years',
    imageUrl: '/images/exoplanet-3.jpg',
    highlights: ['One of the closest exoplanets', 'Super-Earth mass', 'Short orbital period'],
    nasaUrl: 'https://eyes.nasa.gov/apps/exo/#/planet/GJ_15_A_b',
  },
  {
    id: '4',
    name: '55 Cancri e',
    description: 'A super-Earth with extreme conditions, featuring a surface that may be covered in lava oceans.',
    discoveryDate: '2004',
    method: 'Radial Velocity',
    distance: '41 light-years',
    imageUrl: '/images/exoplanet-4.jpg',
    highlights: ['Lava world', 'Diamond planet candidate', 'Extremely hot surface'],
    nasaUrl: 'https://eyes.nasa.gov/apps/exo/#/planet/55_Cnc_e',
  },
  {
    id: '5',
    name: 'PSR B1257+12 b',
    description: 'The first confirmed exoplanet ever discovered, orbiting a pulsar and opening the door to exoplanet science.',
    discoveryDate: '1992',
    method: 'Pulsar Timing',
    distance: '2,300 light-years',
    imageUrl: '/images/exoplanet-5.jpg',
    highlights: ['First exoplanet discovered', 'Pulsar system', 'Revolutionary discovery'],
    nasaUrl: 'https://eyes.nasa.gov/apps/exo/#/planet/PSR_B1257+12_b',
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
                {/* NASA Visualization Section */}
                <div className="lg:w-1/2 h-64 lg:h-auto relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
                  <div className="relative h-full w-full">
                    <iframe
                      src={currentDiscovery.nasaUrl}
                      title={`NASA Eyes on Exoplanets - ${currentDiscovery.name}`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      style={{ width: '100%', height: '100%' }}
                    />
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/explorer?planet=${currentDiscovery.name}`}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      Learn More
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={currentDiscovery.nasaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <Telescope className="h-4 w-4" />
                      NASA Visualization
                    </a>
                  </div>
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
              data-target-cursor="true"
            >
              <ChevronLeft className="h-6 w-6 text-light-text-primary dark:text-dark-text-primary" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12">
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Next discovery"
              data-target-cursor="true"
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

