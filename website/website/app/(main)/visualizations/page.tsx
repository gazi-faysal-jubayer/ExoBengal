'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BarChart3, Globe, Orbit, TrendingUp, ArrowRight } from 'lucide-react'

const visualizations = [
  {
    title: '3D Orbital Systems',
    description: 'Interactive 3D visualization of planetary systems with accurate orbital mechanics',
    href: '/visualizations/3d-systems',
    icon: Orbit,
    color: 'from-blue-500 to-cyan-600',
    features: ['Real-time orbital animation', 'Multi-planet systems', 'Zoom and pan controls'],
  },
  {
    title: 'Statistical Charts',
    description: 'Comprehensive statistical analysis of exoplanet discovery trends',
    href: '/visualizations/statistics',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-600',
    features: ['Discovery timeline', 'Mass-radius diagrams', 'Method comparisons'],
  },
  {
    title: 'Sky Map',
    description: 'Celestial map showing exoplanet positions in the night sky',
    href: '/visualizations/sky-map',
    icon: Globe,
    color: 'from-green-500 to-emerald-600',
    features: ['Constellation overlays', 'Discovery density', 'Interactive tooltips'],
  },
  {
    title: 'Parameter Correlations',
    description: 'Explore relationships between planetary and stellar parameters',
    href: '/visualizations/correlations',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
    features: ['Correlation matrices', 'Scatter plots', 'Trend analysis'],
  },
]

export default function VisualizationsPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            Data Visualizations
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Explore NASA&apos;s exoplanet data through interactive visualizations that reveal patterns, 
            trends, and discoveries in our understanding of worlds beyond our solar system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {visualizations.map((viz, index) => (
            <motion.div
              key={viz.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={viz.href} className="block h-full">
                <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${viz.color} mb-6`}>
                    <viz.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                    {viz.title}
                  </h3>

                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    {viz.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {viz.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <span className="w-2 h-2 bg-primary-light-blue rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center text-primary-dark-blue dark:text-primary-light-blue group-hover:gap-3 transition-all">
                    <span className="font-medium">Explore</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
            Looking for more advanced analysis tools?
          </p>
          <Link
            href="/explorer"
            className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
          >
            Open Data Explorer
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
