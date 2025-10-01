'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import type { LearningModule } from '@/lib/learn-modules'
import { getModuleDifficultyColor } from '@/lib/learn-modules'
import { useLearnProgressStore, type ModuleStatus } from '@/lib/learn-progress-store'

/**
 * Props interface for the ModuleCard component
 */
interface ModuleCardProps {
  /** The learning module data object */
  module: LearningModule
  /** Optional index for staggered animation delays */
  index?: number
}

/**
 * Reusable React component that renders a learning module card with glass-morphism styling
 * Follows the design pattern from the reference image with difficulty badges, topic pills, and hover effects
 */
export default function ModuleCard({ module, index = 0 }: ModuleCardProps) {
  const { getModuleProgress, loadProgress, isLoaded } = useLearnProgressStore()
  const moduleProgress = getModuleProgress(module.id)
  const status = moduleProgress.status

  // Load progress on mount
  useEffect(() => {
    if (!isLoaded) {
      loadProgress()
    }
  }, [isLoaded, loadProgress])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`card card-hover p-6 flex flex-col h-full ${status === 'completed' ? 'border-2 border-green-500/30' : ''}`}
    >
      {/* Card Header Section */}
      <div className="flex flex-col">
        {/* Module Icon */}
        <div className={`${module.color} p-4 rounded-full w-fit mb-4`}>
          <module.icon className="h-8 w-8 text-white" />
        </div>

        {/* Badges Container */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Difficulty Badge */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getModuleDifficultyColor(
              module.difficulty
            )}`}
          >
            {module.difficulty}
          </span>

          {/* Progress Badge */}
          {status === 'completed' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </span>
          )}
          {status === 'in-progress' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
              <Clock className="h-3 w-3" />
              In Progress
            </span>
          )}
        </div>
      </div>

      {/* Card Content Section */}
      <div className="flex flex-col flex-grow">
        {/* Module Title */}
        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3">
          {module.title}
        </h3>

        {/* Module Description */}
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 flex-grow">
          {module.description}
        </p>

        {/* Duration Indicator */}
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
          <Clock className="h-4 w-4" />
          <span>{module.duration}</span>
        </div>

        {/* Topics Section */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Topics Covered:
          </div>
          <div className="flex flex-wrap gap-2">
            {module.topics.map((topic, topicIndex) => (
              <span
                key={topicIndex}
                className="px-3 py-1 text-xs rounded-full bg-primary-light-blue/20 text-primary-dark-blue dark:bg-primary-dark-blue/30 dark:text-primary-light-blue border border-primary-light-blue/30 dark:border-primary-dark-blue/50"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Button */}
      <Link
        href={`/learn/${module.slug}`}
        className="btn-primary w-full flex items-center justify-center gap-2 mt-auto"
        aria-label={`${status === 'completed' ? 'Review' : status === 'in-progress' ? 'Continue' : 'Start learning'} ${module.title}`}
      >
        {status === 'completed' ? 'Review Module' : status === 'in-progress' ? 'Continue Learning' : 'Start Learning'}
        {status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </Link>
    </motion.div>
  )
}
