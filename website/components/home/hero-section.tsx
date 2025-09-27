'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Telescope } from 'lucide-react'

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ['Explore', 'Discover', 'Visualize', 'Analyze']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-light-background to-light-surface dark:from-dark-background dark:to-dark-surface">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-dark-blue/10 to-primary-light-blue/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-gradient inline-block"
                >
                  {words[currentWordIndex]}
                </motion.span>{' '}
                the Universe
              </span>
              <span className="block mt-2 text-light-text-primary dark:text-dark-text-primary">
                of Exoplanets
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Dive into NASA&apos;s comprehensive exoplanet archive with our interactive visualization platform. 
              Discover thousands of worlds beyond our solar system through stunning visualizations and AI-powered insights.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/explorer"
                className="group btn-primary px-8 py-3 text-lg font-semibold flex items-center gap-2 cursor-target"
              >
                <Telescope className="h-5 w-5" />
                Start Exploring
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/docs/getting-started"
                className="btn-secondary px-8 py-3 text-lg font-semibold flex items-center gap-2 cursor-target"
              >
                <Sparkles className="h-5 w-5" />
                View Documentation
              </Link>
            </div>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-primary-dark-blue">5,000+</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Confirmed Exoplanets</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-primary-dark-blue">Real-time</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">NASA Data Updates</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-primary-dark-blue">AI-Powered</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Smart Assistant</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-light-blue opacity-10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-cyan opacity-10 blur-3xl" />
    </section>
  )
}