'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Orbit, Thermometer, Ruler, Weight, Clock, ExternalLink, Heart, Share2 } from 'lucide-react'

interface DetailViewProps {
  planetId: string
  onClose: () => void
}

// Sample planet data - in production this would come from API
const planetData = {
  '1': {
    name: 'Kepler-452b',
    nickname: 'Earth\'s Cousin',
    description: 'Kepler-452b is an exoplanet orbiting within the habitable zone of the Sun-like star Kepler-452, located about 1,400 light-years from Earth in the constellation Cygnus.',
    discovered: '2015-07-23',
    discoveryMethod: 'Transit',
    telescope: 'Kepler Space Telescope',
    artistConception: '/images/kepler-452b.jpg',
    physicalProperties: {
      radius: { value: 1.6, unit: 'R⊕', uncertainty: '±0.2' },
      mass: { value: 5.0, unit: 'M⊕', uncertainty: '±1.0', estimated: true },
      density: { value: 5.0, unit: 'g/cm³', uncertainty: '±1.0', estimated: true },
      temperature: { value: 265, unit: 'K', uncertainty: '±15' },
      gravity: { value: 1.94, unit: 'g', uncertainty: '±0.4', estimated: true },
    },
    orbitalCharacteristics: {
      period: { value: 384.843, unit: 'days', uncertainty: '±0.007' },
      semiMajorAxis: { value: 1.046, unit: 'AU', uncertainty: '±0.014' },
      eccentricity: { value: 0.097, unit: '', uncertainty: '±0.06' },
      inclination: { value: 89.806, unit: '°', uncertainty: '±0.2' },
    },
    hostStar: {
      name: 'Kepler-452',
      type: 'G2V',
      mass: { value: 1.04, unit: 'M☉', uncertainty: '±0.05' },
      radius: { value: 1.11, unit: 'R☉', uncertainty: '±0.09' },
      temperature: { value: 5757, unit: 'K', uncertainty: '±85' },
      age: { value: 6.0, unit: 'Gyr', uncertainty: '±2.0' },
      metallicity: { value: 0.21, unit: '[Fe/H]', uncertainty: '±0.05' },
    },
    habitability: {
      inHabitableZone: true,
      earthSimilarityIndex: 0.83,
      potentialForLiquidWater: 'High',
      atmosphereModel: 'Uncertain - potentially thick atmosphere',
      biosignaturePotential: 'Moderate',
    },
    location: {
      constellation: 'Cygnus',
      ra: '19h 44m 00.89s',
      dec: '+41° 53\' 20.4"',
      distance: { value: 1400, unit: 'ly', uncertainty: '±100' },
    },
    references: [
      {
        title: 'Kepler-452b: A Possibly Rocky Planet in the Habitable Zone',
        authors: 'Jenkins et al.',
        journal: 'The Astronomical Journal',
        year: 2015,
        link: 'https://iopscience.iop.org/article/10.1088/0004-6256/150/2/56'
      }
    ]
  }
}

export function DetailView({ planetId, onClose }: DetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'physical' | 'orbital' | 'host-star' | 'habitability' | 'references'>('overview')
  const [isFavorite, setIsFavorite] = useState(false)

  const planet = planetData[planetId as keyof typeof planetData]

  if (!planet) {
    return null
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Star },
    { id: 'physical' as const, label: 'Physical', icon: Ruler },
    { id: 'orbital' as const, label: 'Orbital', icon: Orbit },
    { id: 'host-star' as const, label: 'Host Star', icon: Star },
    { id: 'habitability' as const, label: 'Habitability', icon: Thermometer },
    { id: 'references' as const, label: 'References', icon: ExternalLink },
  ]

  const formatValue = (value: any) => {
    if (typeof value === 'object' && value.value !== undefined) {
      return `${value.value}${value.unit ? ` ${value.unit}` : ''}${value.uncertainty ? ` ${value.uncertainty}` : ''}${value.estimated ? ' (est.)' : ''}`
    }
    return value
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Artist Conception */}
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg">Artist&apos;s Conception</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Discovery Story</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {planet.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Discovery Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Date:</span>
                    <span>{planet.discovered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Method:</span>
                    <span>{planet.discoveryMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Telescope:</span>
                    <span>{planet.telescope}</span>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <h4 className="font-medium mb-2">Quick Facts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Radius:</span>
                    <span>{formatValue(planet.physicalProperties.radius)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Period:</span>
                    <span>{formatValue(planet.orbitalCharacteristics.period)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Distance:</span>
                    <span>{formatValue(planet.location.distance)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'physical':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Physical Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(planet.physicalProperties).map(([key, value]) => (
                <div key={key} className="card p-4">
                  <h4 className="font-medium capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h4>
                  <p className="text-xl font-bold text-primary-dark-blue">{formatValue(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'orbital':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Orbital Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(planet.orbitalCharacteristics).map(([key, value]) => (
                <div key={key} className="card p-4">
                  <h4 className="font-medium capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h4>
                  <p className="text-xl font-bold text-primary-dark-blue">{formatValue(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'host-star':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Host Star: {planet.hostStar.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(planet.hostStar).filter(([key]) => key !== 'name').map(([key, value]) => (
                <div key={key} className="card p-4">
                  <h4 className="font-medium capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h4>
                  <p className="text-xl font-bold text-primary-dark-blue">{formatValue(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'habitability':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Habitability Assessment</h3>
            <div className="space-y-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2">Habitable Zone Status</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${planet.habitability.inHabitableZone ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{planet.habitability.inHabitableZone ? 'Within Habitable Zone' : 'Outside Habitable Zone'}</span>
                </div>
              </div>
              
              <div className="card p-4">
                <h4 className="font-medium mb-2">Earth Similarity Index</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-light-border dark:bg-dark-border rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${planet.habitability.earthSimilarityIndex * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold">{(planet.habitability.earthSimilarityIndex * 100).toFixed(0)}%</span>
                </div>
              </div>

              {Object.entries(planet.habitability).filter(([key]) => !['inHabitableZone', 'earthSimilarityIndex'].includes(key)).map(([key, value]) => (
                <div key={key} className="card p-4">
                  <h4 className="font-medium capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'references':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scientific References</h3>
            <div className="space-y-4">
              {planet.references.map((ref, index) => (
                <div key={index} className="card p-4">
                  <h4 className="font-medium mb-2">{ref.title}</h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                    {ref.authors} ({ref.year}) - {ref.journal}
                  </p>
                  <a 
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm flex items-center gap-1"
                  >
                    View Paper <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-light-card dark:bg-dark-card rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                  {planet.name}
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {planet.nickname}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-md transition-colors ${
                    isFavorite 
                      ? 'text-semantic-warning' 
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-semantic-warning'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-light-border dark:border-dark-border">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-dark-blue text-primary-dark-blue dark:text-primary-light-blue'
                      : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {renderTabContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
