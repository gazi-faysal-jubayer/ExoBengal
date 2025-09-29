'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { Calendar, Camera, Clock, Database, Eye, Telescope } from 'lucide-react'
import { BackgroundBeams } from '@/components/ui/background-beams'

interface ObservationCoverageProps {
  planet: ExplorerPlanetRow
}

export function ObservationCoverage({ planet }: ObservationCoverageProps) {
  // Extract observation information from available data
  const discoveryInfo = {
    year: planet.disc_year,
    method: planet.discoverymethod,
    facility: planet.disc_facility || planet.disc_telescope,
    reference: planet.disc_refname || 'NASA Exoplanet Archive'
  }

  // Mock TESS sector data (in a real app, this would come from the API)
  const tessInfo = {
    observed: planet.disc_facility?.includes('TESS') || planet.discoverymethod === 'Transit',
    sectors: planet.disc_facility?.includes('TESS') ? '1, 27, 28, 54, 55' : null,
    dataQuality: 'SPOC 2-min cadence',
    pipelineVersion: 'spoc-5.0'
  }

  // Additional observation campaigns
  const observationCampaigns = [
    {
      mission: 'TESS',
      status: tessInfo.observed ? 'Observed' : 'Check MAST',
      icon: Telescope,
      details: tessInfo.sectors ? `Sectors: ${tessInfo.sectors}` : 'Search MAST portal'
    },
    {
      mission: 'Kepler/K2',
      status: planet.disc_facility?.includes('Kepler') ? 'Observed' : 'Not in field',
      icon: Camera,
      details: planet.disc_facility?.includes('Kepler') ? 'Primary mission' : 'Check archive'
    },
    {
      mission: 'Spitzer',
      status: 'Check IRSA',
      icon: Eye,
      details: 'Infrared observations'
    },
    {
      mission: 'HST',
      status: 'Check MAST',
      icon: Camera,
      details: 'High-resolution imaging'
    }
  ]

  // Generate observation timeline
  const currentYear = new Date().getFullYear()
  const yearsSinceDiscovery = planet.disc_year ? currentYear - planet.disc_year : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <BackgroundBeams className="absolute inset-0 opacity-55 dark:opacity-65" />
      <div className="relative z-10 p-6">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          Observation Coverage
        </h2>

        {/* Discovery Information */}
        <div className="bg-gradient-to-r from-primary-dark-blue/10 to-primary-light-blue/10 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary-light-blue" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Discovery
                </span>
              </div>
              <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                {discoveryInfo.year || 'Unknown'} - {discoveryInfo.method || 'Unknown method'}
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                {discoveryInfo.facility || 'Unknown facility'}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary-light-blue" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Follow-up Period
                </span>
              </div>
              <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                {yearsSinceDiscovery} years
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Since discovery announcement
              </p>
            </div>
          </div>
        </div>

        {/* Mission Coverage Grid */}
        <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
          Space Mission Coverage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {observationCampaigns.map((campaign, index) => {
            const Icon = campaign.icon
            return (
              <div
                key={index}
                className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary-light-blue" />
                    <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                      {campaign.mission}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    campaign.status === 'Observed' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {campaign.details}
                </p>
              </div>
            )
          })}
        </div>

        {/* TESS Specific Information */}
        {tessInfo.observed && tessInfo.sectors && (
          <div className="bg-light-surface/50 dark:bg-dark-surface/50 p-4 rounded-lg mb-6">
            <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              TESS Observation Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Sectors:</span>
                <span className="ml-2 text-light-text-primary dark:text-dark-text-primary">{tessInfo.sectors}</span>
              </div>
              <div>
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Data Products:</span>
                <span className="ml-2 text-light-text-primary dark:text-dark-text-primary">{tessInfo.dataQuality}</span>
              </div>
            </div>
          </div>
        )}

        {/* Data Access Links */}
        <div className="border-t border-light-border dark:border-dark-border pt-4">
          <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
            Access Observation Data
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'MAST Portal', icon: Database },
              { name: 'ExoFOP-TESS', icon: Telescope },
              { name: 'Light Curves', icon: Camera },
              { name: 'DVT Reports', icon: Eye }
            ].map((link, index) => (
              <button
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-light-surface dark:bg-dark-surface rounded-md hover:bg-light-hover dark:hover:bg-dark-hover transition-colors text-sm"
              >
                <link.icon className="h-3 w-3" />
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}


