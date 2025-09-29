'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { Eye, ExternalLink, Maximize2, Play } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NASAEyesCardProps {
  planet: ExplorerPlanetRow
}

// Extract the NASA Eyes URL generation function from ExternalLinks
const generateNASAEyesUrl = (planetName: string) => {
  // Convert planet name to NASA Eyes format (replace spaces with underscores)
  const formattedName = planetName.replace(/\s+/g, '_')
  return `https://eyes.nasa.gov/apps/exo/#/planet/${encodeURIComponent(formattedName)}`
}

export function NASAEyesCard({ planet }: NASAEyesCardProps) {
  const nasaEyesUrl = generateNASAEyesUrl(planet.pl_name)
  const [showIframe, setShowIframe] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      {/* Header with NASA Eyes branding */}
      <div className="p-4 border-b border-light-border/50 dark:border-dark-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-dark-blue/10 dark:bg-primary-light-blue/10 rounded-lg">
              <Eye className="h-5 w-5 text-primary-dark-blue dark:text-primary-light-blue" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                NASA Eyes on Exoplanets
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Interactive 3D Visualization
              </p>
            </div>
          </div>
          <a
            href={nasaEyesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-2 bg-primary-dark-blue/10 dark:bg-primary-light-blue/10 text-primary-dark-blue dark:text-primary-light-blue rounded-lg hover:bg-primary-dark-blue/20 dark:hover:bg-primary-light-blue/20 transition-colors text-sm"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="hidden sm:inline">Open Fullscreen</span>
            <ExternalLink className="h-3 w-3 opacity-75 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      {/* NASA Eyes Visualization Area */}
      <div className="relative">
        <div className="h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-lg overflow-hidden flex items-center justify-center">
          {showIframe ? (
            <>
              <iframe
                src={nasaEyesUrl}
                title={`NASA Eyes on Exoplanets - ${planet.pl_name}`}
                className={`w-full h-full border-0 transition-opacity duration-500 ${iframeLoaded && !iframeError ? 'opacity-100' : 'opacity-0'}`}
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
                style={{ width: '100%', height: '100%' }}
              />
              {(!iframeLoaded || iframeError) && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
                  {iframeError ? (
                    <div className="text-center p-6">
                      <Eye className="h-16 w-16 text-red-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-white mb-2">
                        Embedding Restricted
                      </h4>
                      <p className="text-gray-300 mb-6 max-w-md">
                        NASA Eyes doesn't allow embedding. Click below to explore {planet.pl_name} in a new window.
                      </p>
                      <a
                        href={nasaEyesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue text-white font-medium rounded-lg hover:from-primary-dark-blue/90 hover:to-primary-light-blue/90 transition-all duration-300 hover:shadow-lg"
                      >
                        <Eye className="h-5 w-5" />
                        <span>Open NASA Eyes</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-white">Loading NASA Eyes...</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-8">
              {/* Space-themed preview */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20 animate-pulse"></div>
                </div>
                <div className="relative z-10">
                  <Eye className="h-20 w-20 text-white mx-auto mb-4" />
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-white mb-4">
                Explore {planet.pl_name} in 3D
              </h4>
              <p className="text-gray-300 mb-6 max-w-lg">
                Journey through space with NASA's interactive visualization. See {planet.pl_name} up close, 
                compare its size to Earth, and experience its unique characteristics in stunning detail.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowIframe(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue text-white font-semibold rounded-lg hover:from-primary-dark-blue/90 hover:to-primary-light-blue/90 transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg"
                >
                  <Play className="h-6 w-6" />
                  <span>Launch Visualization</span>
                </button>
                
                <div className="text-sm text-gray-400">
                  Or{' '}
                  <a
                    href={nasaEyesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light-blue hover:underline inline-flex items-center gap-1"
                  >
                    open in new tab
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Brief description and NASA attribution */}
      <div className="p-4 bg-light-surface/30 dark:bg-dark-surface/30">
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
          Explore <span className="font-medium text-light-text-primary dark:text-dark-text-primary">{planet.pl_name}</span> in 
          stunning 3D. Navigate through space, compare sizes, and discover what makes this exoplanet unique.
        </p>
        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">
          Powered by NASA's Jet Propulsion Laboratory
        </p>
      </div>
    </motion.div>
  )
}
