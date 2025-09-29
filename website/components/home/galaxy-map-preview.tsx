'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'

export function GalaxyMapPreview() {

  return (
    <section className="py-16 bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Interactive Galaxy Map
            </h2>
            <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
              Explore exoplanets in their celestial positions
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="card p-4 overflow-hidden card-hover">
              {/* NASA Eyes Container */}
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <iframe
                  src="https://eyes.nasa.gov/apps/exo/"
                  title="NASA Eyes on Exoplanets - Interactive Galaxy Map"
                  className="w-full h-full border-0"
                  loading="eager"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  style={{ width: '100%', height: '100%' }}
                />
                
                {/* Controls Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link
                    href="/visualizations"
                    className="p-2 bg-dark-card/80 backdrop-blur-sm rounded-md text-white hover:bg-dark-card transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <Link href="/visualizations" className="btn-primary inline-flex items-center gap-2">
                Explore Full Visualization
                <Maximize2 className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

