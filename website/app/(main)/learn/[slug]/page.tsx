'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft, Clock, BookOpen, CheckCircle2, PlayCircle, CheckCircle } from 'lucide-react'
import { getModuleBySlug, getModuleDifficultyColor, LearningModule } from '@/lib/learn-modules'
import { useLearnProgressStore } from '@/lib/learn-progress-store'

// VideoEmbed Helper Component
const VideoEmbed = ({ videoId, title }: { videoId: string; title: string }) => (
  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
    />
  </div>
)

export default function ModulePage() {
  const { slug } = useParams() as { slug: string }
  const module = getModuleBySlug(slug)
  const { markModuleInProgress, markModuleCompleted, getModuleProgress, loadProgress, isLoaded } = useLearnProgressStore()
  const [isMarkedComplete, setIsMarkedComplete] = useState(false)

  // Load progress and auto-track
  useEffect(() => {
    if (!isLoaded) {
      loadProgress()
    }
    
    if (module && isLoaded) {
      // Automatically mark as in-progress when user visits the page
      const progress = getModuleProgress(module.id)
      if (progress.status === 'not-started') {
        markModuleInProgress(module.id)
      }
    }
  }, [module, isLoaded, loadProgress, markModuleInProgress, getModuleProgress])

  // Get current progress
  const moduleProgress = module ? getModuleProgress(module.id) : null
  const isCompleted = moduleProgress?.status === 'completed'

  // Mark complete handler
  const handleMarkComplete = () => {
    if (module) {
      markModuleCompleted(module.id)
      setIsMarkedComplete(true)
      
      // Reset the success message after 3 seconds
      setTimeout(() => {
        setIsMarkedComplete(false)
      }, 3000)
    }
  }

  // Not Found State
  if (!module) {
    return (
      <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-4">Module Not Found</h2>
          <p className="text-light-text-tertiary dark:text-dark-text-tertiary mb-8">
            The learning module '{slug}' could not be found.
          </p>
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-dark-blue dark:bg-primary-light-blue text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Modules
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <li>
              <Link href="/" className="hover:text-primary-dark-blue dark:hover:text-primary-light-blue">
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4" />
            <li>
              <Link href="/learn" className="hover:text-primary-dark-blue dark:hover:text-primary-light-blue">
                Learn
              </Link>
            </li>
            <ChevronRight className="h-4 w-4" />
            <li className="text-light-text-primary dark:text-dark-text-primary font-medium">
              {module.title}
            </li>
          </ol>
        </nav>

        {/* Back to Modules Link */}
        <Link 
          href="/learn" 
          className="inline-flex items-center gap-2 text-primary-dark-blue dark:text-primary-light-blue hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Modules
        </Link>

        {/* Module Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8 mb-8"
        >
          <div className={`${module.color} rounded-full p-4 w-fit mb-4`}>
            {module.icon && <module.icon className="h-10 w-10 text-white" />}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            {module.title}
          </h1>
          
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-6">
            {module.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-light-text-tertiary dark:text-dark-text-tertiary mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getModuleDifficultyColor(module.difficulty)}`}>
              {module.difficulty}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {module.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {module.topics.length} Topics
            </div>
          </div>
          
          {/* Completion Badge */}
          {isCompleted && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30 rounded-full text-sm font-semibold">
              <CheckCircle className="h-4 w-4" />
              Completed
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">
              Topics Covered:
            </p>
            <div className="flex flex-wrap gap-2">
              {module.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {module.slug === 'exoplanet-basics' && (
            <ExoplanetBasicsContent />
          )}
          {module.slug === 'detection-methods' && (
            <DetectionMethodsContent />
          )}
          {module.slug === 'space-missions' && (
            <SpaceMissionsContent />
          )}
          {module.slug === 'habitability' && (
            <HabitabilityContent />
          )}
        </motion.div>

        {/* Mark as Complete Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="card p-8 mb-8"
        >
          {!isCompleted ? (
            <>
              <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4 text-center">
                Finished this module?
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center">
                Mark this module as complete to track your progress and celebrate your achievement!
              </p>
              <button
                onClick={handleMarkComplete}
                className="w-full md:w-auto mx-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 font-semibold text-lg"
                aria-label="Mark this module as complete"
              >
                <CheckCircle className="h-5 w-5" />
                Mark as Complete
              </button>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                Module Completed! 🎉
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Great job! You've completed this module. Continue your learning journey with other modules.
              </p>
              {isMarkedComplete && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
                >
                  ✓ Progress saved! Your achievement has been recorded.
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="card p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Ready for the Next Module?
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
            Continue your journey through the fascinating world of exoplanets with our other learning modules.
          </p>
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-dark-blue dark:bg-primary-light-blue text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <BookOpen className="h-4 w-4" />
            Explore All Modules
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// Content Components for each module
const ExoplanetBasicsContent = () => (
  <>
    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        What are Exoplanets?
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        An exoplanet (extrasolar planet) is any planet that orbits a star outside our solar system. 
        These worlds come in many forms — some may resemble Earth, while others are completely alien, 
        with extreme temperatures, strange compositions, or unusual orbits.
      </p>
      {/* Source: https://science.nasa.gov/resource/video-what-is-an-exoplanet/ */}
      <VideoEmbed 
        videoId="0ZOhJe_7GrE" 
        title="What is an Exoplanet? - NASA Science" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Planet Types
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Scientists classify exoplanets into different types based on their size, composition, and temperature:
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Gas Giants
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Large planets like Jupiter and Saturn, mostly hydrogen and helium.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Neptunian Planets
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Similar to Neptune or Uranus, with thick atmospheres and icy cores.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Super-Earths
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Bigger than Earth but smaller than Neptune, possibly rocky and potentially habitable.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Terrestrial Planets
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Rocky worlds like Earth or Mars, sometimes found in the "habitable zone."
          </p>
        </div>
      </div>
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Size Comparisons
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Exoplanets vary enormously in size:
      </p>
      <ul className="space-y-3 mb-6 text-light-text-secondary dark:text-dark-text-secondary">
        <li className="flex items-start gap-3">
          <span className="text-primary-dark-blue dark:text-primary-light-blue mt-1">●</span>
          <span>Some are smaller than Mercury, barely detectable.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-primary-dark-blue dark:text-primary-light-blue mt-1">●</span>
          <span>Others are "Hot Jupiters," so large and close to their stars that they dwarf Earth many times over.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-primary-dark-blue dark:text-primary-light-blue mt-1">●</span>
          <span>Scientists often use Earth-radius (R⊕) and Jupiter-radius (R♃) units to compare sizes and understand their nature.</span>
        </li>
      </ul>
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Orbital Mechanics
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Every exoplanet follows an orbit around its star, defined by key parameters:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Orbital Period (P)
          </h4>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            How long it takes to complete one revolution.
          </p>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Semi-Major Axis (a)
          </h4>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Average distance from the star.
          </p>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Eccentricity (e)
          </h4>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            How circular or stretched the orbit is.
          </p>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Inclination (i)
          </h4>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Tilt of the orbit as seen from Earth.
          </p>
        </div>
      </div>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        These orbital properties are crucial for detecting exoplanets (via transit, radial velocity, etc.) 
        and for predicting whether a planet could sustain life.
      </p>
    </section>
  </>
)

const DetectionMethodsContent = () => (
  <>
    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Transit Photometry
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        This is the most widely used method. When a planet passes in front of its host star 
        (as seen from Earth), it blocks a tiny fraction of the star's light. This creates a small, 
        regular dip in brightness called a transit.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        By carefully measuring these dips, astronomers can determine the planet's size, orbital period, 
        and even hints about its atmosphere. NASA's Kepler and TESS missions primarily use this method.
      </p>
      {/* Source: https://science.nasa.gov/resource/exoplanet-detection-transit-method/ */}
      <VideoEmbed 
        videoId="vka0W8tn4EU" 
        title="Transit Photometry: How We Detect Exoplanets" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Radial Velocity (Doppler Spectroscopy)
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        As a planet orbits its star, the star itself also wobbles slightly due to gravitational pull. 
        This wobble causes the star's light spectrum to shift — towards blue when it moves toward us, 
        and towards red when it moves away. This effect is called the Doppler shift.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        By studying these shifts, scientists can estimate the planet's mass and orbital characteristics. 
        This method confirmed some of the very first exoplanets.
      </p>
      {/* Source: https://science.nasa.gov/resource/exoplanet-detection-radial-velocity-method/ */}
      <VideoEmbed 
        videoId="rN7uuqLKv0I" 
        title="Radial Velocity Method: Detecting Exoplanets Through Stellar Wobble" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Direct Imaging
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Normally, stars are millions of times brighter than their planets, making planets invisible. 
        But with advanced telescopes and special instruments that block starlight, astronomers can 
        sometimes directly capture images of exoplanets.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        This method works best for large planets far from their stars, and it allows scientists to 
        study the atmospheres, colors, and even weather patterns of those worlds.
      </p>
      {/* Source: https://science.nasa.gov/resource/the-search-for-alien-earths-how-coronagraphs-find-hidden-planets/ */}
      <VideoEmbed 
        videoId="dcuxxeEfuOA" 
        title="Direct Imaging: Photographing Exoplanets" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Gravitational Microlensing
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        When a planet and its host star pass in front of a distant background star, their gravity 
        bends and magnifies the background star's light — like a natural cosmic magnifying glass. 
        If a planet is present, it creates a small but detectable extra signal in the magnification pattern.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        This method can find planets that are too far away or too small for other techniques, 
        even those thousands of light-years from Earth.
      </p>
      {/* Source: https://science.nasa.gov/resource/exoplanet-detection-microlensing-method/ */}
      <VideoEmbed 
        videoId="_aZZt8dM-_0" 
        title="Gravitational Microlensing: Finding Distant Exoplanets" 
      />
    </section>
  </>
)

const SpaceMissionsContent = () => (
  <>
    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Kepler Mission (2009-2018)
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Kepler was NASA's first dedicated planet-hunting telescope. It monitored over 150,000 stars 
        continuously and looked for tiny dips in brightness caused by transiting planets.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Kepler alone confirmed more than 2,600 exoplanets and showed that planets are common in our galaxy.
      </p>
      {/* Source: https://science.nasa.gov/resource/kepler-end-of-flight-documentary/ */}
      <VideoEmbed 
        videoId="G_zcEgx1IgQ" 
        title="Kepler Mission: Discovering Thousands of Exoplanets" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        TESS - Transiting Exoplanet Survey Satellite (2018-Present)
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        TESS is Kepler's successor. Instead of staring at one patch of sky, TESS surveys the entire sky, 
        focusing on the brightest and nearest stars.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        It discovers planets that are close enough for detailed follow-up studies with larger telescopes. 
        TESS has already identified thousands of candidates and continues to expand our catalog.
      </p>
      {/* Source: https://svs.gsfc.nasa.gov/12850/ */}
      <VideoEmbed 
        videoId="L837XwH4nqE" 
        title="TESS: NASA's All-Sky Exoplanet Survey" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        James Webb Space Telescope (2021-Present)
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        JWST is not just a discovery machine but a characterization powerhouse. It studies exoplanet 
        atmospheres by analyzing starlight passing through them during transits.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        With its infrared vision, JWST can detect molecules like water vapor, carbon dioxide, methane, 
        and search for signs of habitability on distant worlds.
      </p>
      {/* Source: https://science.nasa.gov/asset/webb/how-do-we-learn-about-a-planets-atmosphere/ */}
      <VideoEmbed 
        videoId="6VqG3Jazrfs" 
        title="James Webb Space Telescope: Studying Exoplanet Atmospheres" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Future Missions
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Several upcoming missions aim to push exoplanet science further:
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Nancy Grace Roman Space Telescope (NASA, 2027+)
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Will use microlensing to find planets, including free-floating ones.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            ESA's ARIEL (2029)
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Dedicated to studying exoplanet atmospheres in detail.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            PLATO (2026, ESA)
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Will focus on finding Earth-like planets in the habitable zone.
          </p>
        </div>
      </div>
    </section>
  </>
)

const HabitabilityContent = () => (
  <>
    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        The Habitable Zone
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        The habitable zone, often called the "Goldilocks Zone," is the distance from a star where 
        conditions may allow liquid water to exist on the surface of a planet. Water is essential 
        for life as we know it, so planets in this zone are considered prime candidates for habitability.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        If a planet is too close to its star, its water would boil away due to extreme heat; if it is 
        too far, the water would freeze solid. The exact size of a star's habitable zone depends on the 
        star's temperature and brightness — small, cool stars have much tighter zones, while larger, 
        hotter stars have zones much farther out. Studying exoplanets inside this region helps astronomers 
        focus their search for worlds that could potentially host life.
      </p>
      {/* Source: https://science.nasa.gov/resource/video-what-is-the-habitable-zone/ */}
      <VideoEmbed 
        videoId="J04YN9azln8" 
        title="The Habitable Zone: Where Life Could Exist" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Atmospheric Composition
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        A planet's atmosphere is its protective blanket of gases, and it plays a critical role in 
        determining whether life can survive there. Atmospheres regulate temperature by trapping heat 
        (the greenhouse effect), shield surfaces from harmful radiation, and create conditions for 
        weather and climate. For Earth, oxygen and nitrogen dominate, with smaller amounts of carbon 
        dioxide and water vapor.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        When we study exoplanets, scientists look for atmospheric compositions through techniques like 
        transit spectroscopy — analyzing starlight that passes through a planet's atmosphere. Detecting 
        gases such as oxygen, methane, or water vapor could be important clues to life-supporting conditions. 
        Without an atmosphere, planets are often barren, airless, and exposed to harsh radiation.
      </p>
      {/* Source: NASA video explaining greenhouse effect, atmospheric escape, and spectroscopy */}
      <VideoEmbed 
        videoId="WSDxtH0o7zk" 
        title="Exoplanet Atmospheres: Key to Finding Life" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Biosignatures
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Biosignatures are scientific clues that point toward the possibility of life. They can be chemical, 
        such as unusual levels of oxygen, methane, or ozone in an atmosphere; physical, like patterns in 
        surface reflectivity; or even indirect, such as seasonal changes in gas levels.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        What makes biosignatures powerful is that they cannot easily be explained by non-living processes. 
        For example, oxygen on Earth is constantly replenished by plants through photosynthesis. If large 
        amounts of oxygen were detected on an exoplanet, scientists would consider it a strong biosignature. 
        However, care must be taken — some geological processes can mimic biosignatures, so astronomers look 
        for multiple overlapping signs to strengthen the case.
      </p>
      {/* Source: https://science.nasa.gov/exoplanets/ */}
      <VideoEmbed 
        videoId="QlvzCGR90_Q" 
        title="Biosignatures: Searching for Signs of Life on Exoplanets" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Earth Analogs
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        An Earth analog is an exoplanet that is strikingly similar to Earth in size, mass, temperature, 
        and orbital distance from its star. These are the planets most often highlighted in the media as 
        "second Earths." To measure this, astronomers use tools like the Earth Similarity Index (ESI), 
        which compares exoplanets to Earth on parameters such as radius, density, and surface temperature.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Earth analogs are particularly exciting because they offer the best chance of hosting life as we 
        know it. Famous examples include Kepler-452b and Proxima Centauri b. While no perfect twin of Earth 
        has been confirmed yet, the ongoing search continues to bring us closer to finding a true Earth-like world.
      </p>
    </section>
  </>
)
