'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useExplorerStore } from '@/lib/explorer-store'
import { BarChart3, Star, Globe, Satellite, Info, BookOpen, TrendingUp, Target } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import statistical charts
const StatisticalCharts = dynamic(() => import('./statistical-charts'), {
  ssr: false,
  loading: () => <div className="h-96 loading-glass clip-corner-cut rounded-xl" />
})

export default function VisualizationPanels() {
  const loadRows = useExplorerStore(s => s.loadRows)
  useEffect(() => { loadRows() }, [loadRows])

  return (
    <div className="space-y-8">
      {/* Statistical Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="visualization-container-glass overflow-hidden clip-corner-cut rounded-2xl"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-light-border/50 dark:border-dark-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-dark-blue/10 to-primary-light-blue/10 backdrop-blur-sm">
              <BarChart3 className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                Statistical Analysis
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Discovery trends and parameter distributions
              </p>
            </div>
          </div>
        </div>

        {/* Statistical Charts Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="visualization-fade"
          >
            <StatisticalCharts />
          </motion.div>
        </div>
      </motion.div>

      {/* Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* About Exoplanets */}
        <div className="info-card-glass p-6 clip-corner-cut rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              About Exoplanets
            </h3>
          </div>
          <div className="space-y-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <p>
              Exoplanets are planets that orbit stars outside our solar system. Since the first confirmed discovery in 1992, 
              astronomers have identified thousands of these distant worlds using various detection methods.
            </p>
            <p>
              The most common detection methods include the transit method (measuring dimming when a planet passes in front of its star) 
              and the radial velocity method (detecting the star's wobble caused by an orbiting planet's gravity).
            </p>
            <p>
              These discoveries have revolutionized our understanding of planetary formation and the potential for life beyond Earth.
            </p>
          </div>
        </div>

        {/* Data Sources */}
        <div className="info-card-glass p-6 clip-corner-cut rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              Data Sources
            </h3>
          </div>
          <div className="space-y-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <p>
              Our exoplanet database is compiled from NASA's Exoplanet Archive, which aggregates data from multiple space missions 
              and ground-based observatories worldwide.
            </p>
            <p>
              Key missions contributing data include Kepler, TESS, Hubble Space Telescope, and various ground-based surveys 
              that have expanded our knowledge of planetary systems.
            </p>
            <p>
              The data includes planetary parameters, stellar properties, discovery methods, and observational details for each confirmed exoplanet.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { 
            value: '5,565', 
            label: 'Confirmed Exoplanets', 
            icon: Globe, 
            gradient: 'from-blue-500/20 to-cyan-500/20',
            color: 'text-blue-600 dark:text-blue-400'
          },
          { 
            value: '4,140', 
            label: 'Planetary Systems', 
            icon: Star, 
            gradient: 'from-purple-500/20 to-pink-500/20',
            color: 'text-purple-600 dark:text-purple-400'
          },
          { 
            value: '15', 
            label: 'Detection Methods', 
            icon: Satellite, 
            gradient: 'from-green-500/20 to-teal-500/20',
            color: 'text-green-600 dark:text-green-400'
          },
          { 
            value: '1992', 
            label: 'First Discovery', 
            icon: Target, 
            gradient: 'from-orange-500/20 to-red-500/20',
            color: 'text-orange-600 dark:text-orange-400'
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="stats-card-glass p-6 text-center clip-corner-cut rounded-xl hover-scale-glass"
          >
            <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${stat.gradient} backdrop-blur-sm`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <motion.p 
              className={`text-3xl font-bold mb-2 stats-glow ${stat.color}`}
              whileHover={{ scale: 1.05 }}
            >
              {stat.value}
            </motion.p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="info-card-glass p-6 clip-corner-cut rounded-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
            Understanding the Data
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <div>
            <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Key Parameters</h4>
            <ul className="space-y-1">
              <li>• <strong>Orbital Period:</strong> Time for one complete orbit</li>
              <li>• <strong>Semi-major Axis:</strong> Average distance from star</li>
              <li>• <strong>Planet Radius:</strong> Size compared to Earth</li>
              <li>• <strong>Equilibrium Temperature:</strong> Surface temperature estimate</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Discovery Methods</h4>
            <ul className="space-y-1">
              <li>• <strong>Transit:</strong> Planet passes in front of star</li>
              <li>• <strong>Radial Velocity:</strong> Star wobbles due to planet's gravity</li>
              <li>• <strong>Direct Imaging:</strong> Direct observation of planet</li>
              <li>• <strong>Microlensing:</strong> Gravitational lensing effects</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
