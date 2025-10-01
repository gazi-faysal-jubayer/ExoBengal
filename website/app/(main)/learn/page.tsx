'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, TrendingUp, Award, Target, CheckCircle2, Clock } from 'lucide-react'
import { learningModules } from '@/lib/learn-modules'
import ModuleCard from '@/components/learn/module-card'
import { useLearnProgressStore } from '@/lib/learn-progress-store'
import { useEffect } from 'react'

export default function LearnPage() {
  const { getOverallProgress, loadProgress, isLoaded } = useLearnProgressStore()
  const overallProgress = getOverallProgress()

  // Load progress on mount
  useEffect(() => {
    if (!isLoaded) {
      loadProgress()
    }
  }, [isLoaded, loadProgress])

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <header>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-primary-dark-blue/20 to-primary-light-blue/20 backdrop-blur-sm">
                <BookOpen className="h-12 w-12 text-primary-dark-blue dark:text-primary-light-blue" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Learning Modules
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
              Master exoplanet science through structured learning modules. Each module covers essential topics with interactive content, videos, and comprehensive explanations.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary-light-blue to-transparent mx-auto mt-6"></div>
          </motion.div>
        </header>

        {/* Progress Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card p-6 mb-12 max-w-4xl mx-auto"
        >
            {/* Header with Icon */}
            <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary-dark-blue dark:text-primary-light-blue" />
              Your Learning Progress
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-light-surface dark:bg-dark-surface rounded-full h-4 mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-dark-blue to-primary-light-blue transition-all duration-500 ease-out"
                style={{ width: `${overallProgress.completionPercentage}%` }}
                aria-label={`Learning progress: ${overallProgress.completionPercentage}% complete`}
              />
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {/* Total Modules */}
              <div className="text-center p-3 bg-light-surface dark:bg-dark-surface rounded-lg">
                <div className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue">
                  {overallProgress.totalModules}
                </div>
                <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Total Modules
                </div>
              </div>

              {/* Completed */}
              <div className="text-center p-3 bg-light-surface dark:bg-dark-surface rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {overallProgress.completedCount}
                </div>
                <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Completed
                </div>
              </div>

              {/* In Progress */}
              <div className="text-center p-3 bg-light-surface dark:bg-dark-surface rounded-lg">
                <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {overallProgress.inProgressCount}
                </div>
                <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  In Progress
                </div>
              </div>

              {/* Completion % */}
              <div className="text-center p-3 bg-light-surface dark:bg-dark-surface rounded-lg">
                <Award className="h-6 w-6 text-primary-dark-blue dark:text-primary-light-blue mx-auto mb-1" />
                <div className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue">
                  {overallProgress.completionPercentage}%
                </div>
                <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Complete
                </div>
              </div>
            </div>

            {/* Motivational Message */}
            <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">
              {overallProgress.completionPercentage === 0 && "Start your exoplanet learning journey today! Choose any module above to begin."}
              {overallProgress.completionPercentage > 0 && overallProgress.completionPercentage < 25 && "Great start! Keep exploring to unlock more knowledge about exoplanets."}
              {overallProgress.completionPercentage >= 25 && overallProgress.completionPercentage < 50 && "You're making excellent progress! You're a quarter of the way there."}
              {overallProgress.completionPercentage >= 50 && overallProgress.completionPercentage < 75 && "Halfway there! You're becoming an exoplanet expert."}
              {overallProgress.completionPercentage >= 75 && overallProgress.completionPercentage < 100 && "Almost done! Just one more module to complete your journey."}
              {overallProgress.completionPercentage === 100 && "🎉 Congratulations! You've completed all learning modules. You're now an exoplanet expert!"}
            </p>
          </motion.div>

        {/* Module Grid Section */}
        <section aria-label="Learning modules">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {learningModules.map((module, index) => (
                <ModuleCard key={module.id} module={module} index={index} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Choose any module above to begin learning. Each module is self-contained and can be completed at your own pace.
            </p>
            <Link
              href="/explorer"
              className="text-primary-dark-blue dark:text-primary-light-blue hover:underline inline-flex items-center gap-2 mt-4"
            >
              Or explore real exoplanet data →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/*
============================================
EXISTING CONTENT PRESERVED FOR MIGRATION
============================================
The content below will be migrated to individual module pages:
- /learn/exoplanet-basics
- /learn/detection-methods
- /learn/space-missions
- /learn/habitability

DO NOT DELETE - This content will be used in the next phase.

EXOPLANET BASICS SECTION:
- What are exoplanets?
- Planet Types (Gas Giants, Neptunian Planets, Super-Earths, Terrestrial Planets)
- Size Comparisons
- Orbital Mechanics

DETECTION METHODS SECTION:
- Transit Photometry
- Radial Velocity (Doppler Spectroscopy)
- Direct Imaging
- Gravitational Microlensing

SPACE MISSIONS SECTION:
- Kepler Mission (2009–2018)
- TESS – Transiting Exoplanet Survey Satellite (2018–Present)
- James Webb Space Telescope (JWST, 2021–Present)
- Future Missions (Nancy Grace Roman, ARIEL, PLATO)

HABITABILITY SECTION:
- Habitable Zone
- Atmosphere
- Biosignatures
- Earth Analog

DETAILED CONTENT INCLUDES:
- Video embeds for each section
- Interactive cards and visualizations
- Comprehensive explanations
- Scientific terminology and concepts
- Educational resources and references
============================================
*/
