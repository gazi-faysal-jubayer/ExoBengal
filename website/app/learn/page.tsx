'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Telescope, Lightbulb, GraduationCap, ArrowRight, Play } from 'lucide-react'

const learningModules = [
  {
    title: 'Exoplanet Basics',
    description: 'Learn the fundamentals of exoplanets and how they\'re different from planets in our solar system',
    href: '/learn/basics',
    icon: BookOpen,
    level: 'Beginner',
    duration: '30 min',
    topics: ['What are exoplanets?', 'Planet types', 'Size comparisons', 'Orbital mechanics'],
  },
  {
    title: 'Detection Methods',
    description: 'Understand how astronomers discover planets orbiting distant stars',
    href: '/learn/methods',
    icon: Telescope,
    level: 'Intermediate',
    duration: '45 min',
    topics: ['Transit photometry', 'Radial velocity', 'Direct imaging', 'Microlensing'],
  },
  {
    title: 'Space Missions',
    description: 'Explore the spacecraft and telescopes hunting for exoplanets',
    href: '/learn/missions',
    icon: GraduationCap,
    level: 'Intermediate',
    duration: '40 min',
    topics: ['Kepler mission', 'TESS', 'James Webb', 'Future missions'],
  },
  {
    title: 'Habitability',
    description: 'Discover what makes a planet potentially habitable for life',
    href: '/learn/habitability',
    icon: Lightbulb,
    level: 'Advanced',
    duration: '50 min',
    topics: ['Habitable zone', 'Atmosphere', 'Biosignatures', 'Earth analogs'],
  },
]

const interactiveTools = [
  {
    title: 'Transit Simulator',
    description: 'See how planets block starlight as they pass in front of their host stars',
    href: '/learn/simulators/transit',
  },
  {
    title: 'Habitable Zone Calculator',
    description: 'Calculate the habitable zone around different types of stars',
    href: '/learn/calculators/habitable-zone',
  },
  {
    title: 'Planet Formation Game',
    description: 'Build your own planetary system and see what kinds of worlds form',
    href: '/learn/games/planet-formation',
  },
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            Learn About Exoplanets
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Discover the fascinating world of planets beyond our solar system through interactive lessons, 
            simulations, and educational resources designed for learners of all levels.
          </p>
        </motion.div>

        {/* Learning Modules */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary text-center mb-12">
            Learning Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {learningModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={module.href} className="block h-full">
                  <div className="card p-6 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary-light-blue/10 rounded-lg">
                        <module.icon className="h-6 w-6 text-primary-dark-blue" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs px-2 py-1 bg-primary-dark-blue text-white rounded-full">
                          {module.level}
                        </span>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                          {module.duration}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                      {module.title}
                    </h3>

                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                      {module.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        Topics covered:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {module.topics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-light-surface dark:bg-dark-surface rounded text-light-text-secondary dark:text-dark-text-secondary"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center text-primary-dark-blue dark:text-primary-light-blue group-hover:gap-3 transition-all">
                      <Play className="h-4 w-4" />
                      <span className="font-medium ml-2">Start Learning</span>
                      <ArrowRight className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary text-center mb-12">
            Interactive Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {interactiveTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Link href={tool.href} className="block">
                  <div className="card p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Ready to Explore Real Data?
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Put your knowledge to work by exploring actual exoplanet discoveries from NASA&apos;s archive.
            </p>
            <Link
              href="/explorer"
              className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
            >
              <Telescope className="h-5 w-5" />
              Start Exploring
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
