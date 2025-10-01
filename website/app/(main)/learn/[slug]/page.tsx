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
        Exoplanets, or extrasolar planets, are planets that orbit stars other than our Sun. 
        These distant worlds have captured the imagination of scientists and the public alike, 
        offering glimpses into the incredible diversity of planetary systems throughout our galaxy.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        The discovery of the first confirmed exoplanet in 1995 marked a revolutionary moment in astronomy, 
        proving that our Solar System is not unique and opening up endless possibilities for finding 
        other worlds that might harbor life.
      </p>
      <VideoEmbed 
        videoId="yJgXLtXwHGY" 
        title="What is an Exoplanet? - NASA Science" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Planet Types
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Gas Giants
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Massive planets composed primarily of hydrogen and helium, similar to Jupiter and Saturn. 
            These worlds often orbit close to their stars, creating "hot Jupiters."
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Neptunian Planets
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Ice giants with thick atmospheres of hydrogen and helium, but with significant amounts 
            of water, methane, and ammonia ices in their interiors.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Super-Earths
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Rocky planets larger than Earth but smaller than Neptune. These worlds may have 
            thick atmospheres and could potentially be habitable.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Terrestrial Planets
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Rocky worlds similar to Earth, Mars, Venus, and Mercury. These are prime candidates 
            for habitability studies.
          </p>
        </div>
      </div>
      <VideoEmbed 
        videoId="bDoh_cOy4_w" 
        title="Planet Classification - Exoplanet Types" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Size Comparisons
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Understanding the relative sizes of exoplanets helps us categorize them and understand 
        their potential characteristics. Size is one of the most fundamental properties that 
        determines a planet's nature and habitability potential.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Radius vs Mass
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            A planet's radius tells us about its physical size, while mass reveals its density 
            and composition. Together, these measurements help classify planets into different types.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Earth Units
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Scientists often express exoplanet sizes in Earth units - for example, a planet 
            with 2 Earth radii or 5 Earth masses. This makes comparisons intuitive and meaningful.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Size Categories
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            From tiny Mercury-sized worlds to massive gas giants larger than Jupiter, 
            exoplanets span an incredible range of sizes, each with unique characteristics 
            and formation histories.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Habitability Implications
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Size affects a planet's ability to retain an atmosphere, generate magnetic fields, 
            and maintain geological activity - all factors crucial for potential habitability.
          </p>
        </div>
      </div>
      <VideoEmbed 
        videoId="G_1UQdlU5Yw" 
        title="Exoplanet Size Comparisons" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Orbital Mechanics
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Understanding how exoplanets move around their stars is crucial for determining their 
        potential habitability and characteristics. Orbital parameters tell us about a planet's 
        temperature, seasons, and stability.
      </p>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Orbital Period
          </h4>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            How long it takes for a planet to complete one orbit around its star.
          </p>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Semi-Major Axis
          </h4>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            The average distance between the planet and its star.
          </p>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg">
          <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Eccentricity
          </h4>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            How elliptical (non-circular) the planet's orbit is.
          </p>
        </div>
      </div>
      <VideoEmbed 
        videoId="G_1UQdlU5Yw" 
        title="Orbital Mechanics of Exoplanets" 
      />
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
        The transit method detects exoplanets by measuring the slight dimming of a star when 
        a planet passes in front of it. This technique has been incredibly successful, 
        discovering thousands of exoplanets.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        By analyzing the light curve - the graph of brightness over time - scientists can 
        determine the planet's size, orbital period, and even some atmospheric properties.
      </p>
      <VideoEmbed 
        videoId="bDoh_cOy4_w" 
        title="Transit Method Explained" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Radial Velocity (Doppler Spectroscopy)
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        This method detects the tiny wobble of a star caused by the gravitational pull of 
        an orbiting planet. As the planet orbits, it causes the star to move slightly toward 
        and away from us.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        By measuring the Doppler shift in the star's light, astronomers can determine the 
        planet's mass and orbital characteristics.
      </p>
      <VideoEmbed 
        videoId="v6ihVeEoUdo" 
        title="Radial Velocity Method" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Direct Imaging
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        The most challenging method involves directly photographing exoplanets. This requires 
        blocking out the overwhelming light from the parent star using specialized instruments 
        called coronagraphs.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Direct imaging works best for young, massive planets that are far from their stars 
        and still glowing from their formation heat.
      </p>
      <VideoEmbed 
        videoId="yJgXLtXwHGY" 
        title="Direct Imaging of Exoplanets" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Gravitational Microlensing
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        This method uses Einstein's theory of general relativity. When a star with a planet 
        passes in front of a more distant star, the planet's gravity can cause additional 
        magnification of the background star's light.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Microlensing is particularly good at finding planets at distances similar to Earth's 
        distance from the Sun, and it can detect very low-mass planets.
      </p>
      <VideoEmbed 
        videoId="bDoh_cOy4_w" 
        title="Gravitational Microlensing" 
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
        NASA's Kepler Space Telescope revolutionized our understanding of exoplanets by 
        conducting the first space-based survey of planets in our galaxy. It stared at 
        a single patch of sky for four years, monitoring over 150,000 stars.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Kepler discovered over 2,600 confirmed exoplanets and thousands more candidates, 
        revealing that planets are common throughout the galaxy and that Earth-sized planets 
        in the habitable zone are abundant.
      </p>
      <VideoEmbed 
        videoId="G_1UQdlU5Yw" 
        title="Kepler Mission Highlights" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        TESS - Transiting Exoplanet Survey Satellite (2018-Present)
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        TESS is conducting an all-sky survey to discover thousands of exoplanets around 
        the nearest and brightest stars. Unlike Kepler, TESS observes the entire sky in 
        sectors, spending about a month on each sector.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        This approach allows TESS to find planets around stars bright enough for detailed 
        follow-up observations with ground-based telescopes and future space missions.
      </p>
      <VideoEmbed 
        videoId="v6ihVeEoUdo" 
        title="TESS Mission Overview" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        James Webb Space Telescope (2021-Present)
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        The James Webb Space Telescope is transforming our ability to study exoplanet 
        atmospheres. Its infrared capabilities allow it to detect the chemical composition 
        of planetary atmospheres through transmission spectroscopy.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        JWST has already made groundbreaking discoveries, detecting water, carbon dioxide, 
        and other molecules in exoplanet atmospheres, bringing us closer to finding signs 
        of life beyond Earth.
      </p>
      <VideoEmbed 
        videoId="v6ihVeEoUdo" 
        title="JWST and Exoplanets" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Future Missions
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Nancy Grace Roman Space Telescope
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Will use microlensing to discover thousands of exoplanets, including those 
            in the habitable zones of their stars.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            ARIEL Mission
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            The Atmospheric Remote-sensing Infrared Exoplanet Large-survey will study 
            the atmospheres of 1,000 exoplanets.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            PLATO Mission
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            PLAnetary Transits and Oscillations will search for Earth-like planets 
            around Sun-like stars.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Habitable Worlds Observatory
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            A future NASA mission designed to directly image and characterize 
            potentially habitable exoplanets.
          </p>
        </div>
      </div>
      <VideoEmbed 
        videoId="yJgXLtXwHGY" 
        title="Future of Exoplanet Exploration" 
      />
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
        The habitable zone, often called the "Goldilocks zone," is the region around a star 
        where liquid water could exist on a planet's surface. This zone depends on the star's 
        temperature and luminosity.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        However, habitability is more complex than just being in the right distance. Factors 
        like atmospheric composition, magnetic fields, and geological activity also play crucial roles.
      </p>
      <VideoEmbed 
        videoId="bDoh_cOy4_w" 
        title="Habitable Zone Explained" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Atmospheric Composition
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        A planet's atmosphere is crucial for habitability. It regulates temperature, protects 
        from harmful radiation, and provides the chemical environment necessary for life.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Greenhouse Effect
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Atmospheric gases like carbon dioxide and water vapor trap heat, 
            keeping planets warm enough for liquid water.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Atmospheric Escape
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Planets can lose their atmospheres over time due to stellar winds 
            and radiation, especially if they lack magnetic fields.
          </p>
        </div>
      </div>
      <VideoEmbed 
        videoId="v6ihVeEoUdo" 
        title="Exoplanet Atmospheres" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Biosignatures
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Biosignatures are chemical or physical signs that could indicate the presence of life. 
        These include gases like oxygen, methane, and nitrous oxide that are produced by 
        biological processes on Earth.
      </p>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        However, detecting biosignatures is challenging because many can also be produced 
        by non-biological processes, leading to false positives.
      </p>
      <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
          Key Biosignatures to Look For:
        </h4>
        <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Oxygen (O₂) - Produced by photosynthesis
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Methane (CH₄) - Can indicate biological activity
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Nitrous Oxide (N₂O) - Strong biosignature
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Dimethyl Sulfide (DMS) - Marine life indicator
          </li>
        </ul>
      </div>
      <VideoEmbed 
        videoId="yJgXLtXwHGY" 
        title="Search for Biosignatures" 
      />
    </section>

    <section className="card p-8 mb-8">
      <h2 className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-6">
        Earth Analogs
      </h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
        Scientists are particularly interested in finding Earth-like planets - worlds similar 
        in size, composition, and orbital characteristics to our own planet.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            Proxima Centauri b
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            The closest known exoplanet to Earth, located just 4.2 light-years away. 
            It's in the habitable zone of a red dwarf star.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
            TRAPPIST-1 System
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Seven Earth-sized planets orbiting a cool red dwarf star, with three 
            in the habitable zone.
          </p>
        </div>
      </div>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Finding true Earth twins remains challenging because we need planets that are not 
        only the right size and temperature, but also have the right atmospheric composition, 
        magnetic field, and geological activity to support life as we know it.
      </p>
      <VideoEmbed 
        videoId="bDoh_cOy4_w" 
        title="Earth-like Exoplanets" 
      />
    </section>
  </>
)
