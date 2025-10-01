import type { LucideIcon } from 'lucide-react'
import { Globe, Telescope, Satellite, LifeBuoy } from 'lucide-react'

/**
 * Difficulty levels for learning modules
 */
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'

/**
 * Interface defining the structure of a learning module
 */
export interface LearningModule {
  /** Unique identifier for the module */
  id: string
  /** Display name of the module */
  title: string
  /** URL-safe identifier for routing */
  slug: string
  /** Brief overview of what the module covers (2-3 sentences) */
  description: string
  /** Learning level difficulty */
  difficulty: DifficultyLevel
  /** Estimated time to complete the module */
  duration: string
  /** Array of key topics covered in the module */
  topics: string[]
  /** Lucide React icon component for the module */
  icon: LucideIcon
  /** Tailwind color class for the icon background */
  color: string
}

/**
 * Array containing all available learning modules
 */
export const learningModules: LearningModule[] = [
  {
    id: '1',
    title: 'Exoplanet Basics',
    slug: 'exoplanet-basics',
    description: 'Learn the fundamental concepts of exoplanets, including what they are, different planet types, size comparisons with Earth, and basic orbital mechanics that govern planetary systems.',
    difficulty: 'Beginner',
    duration: '30 min',
    topics: ['What are Exoplanets', 'Planet Types', 'Size Comparisons', 'Orbital Mechanics'],
    icon: Globe,
    color: 'bg-green-500',
  },
  {
    id: '2',
    title: 'Detection Methods',
    slug: 'detection-methods',
    description: 'Explore the various techniques astronomers use to discover exoplanets, from transit photometry and radial velocity measurements to direct imaging and gravitational microlensing.',
    difficulty: 'Intermediate',
    duration: '45 min',
    topics: ['Transit Photometry', 'Radial Velocity', 'Direct Imaging', 'Microlensing'],
    icon: Telescope,
    color: 'bg-purple-500',
  },
  {
    id: '3',
    title: 'Space Missions',
    slug: 'space-missions',
    description: 'Discover the groundbreaking space missions that have revolutionized exoplanet science, including Kepler, TESS, James Webb Space Telescope, and upcoming missions.',
    difficulty: 'Intermediate',
    duration: '40 min',
    topics: ['Kepler Mission', 'TESS', 'James Webb', 'Future Missions'],
    icon: Satellite,
    color: 'bg-blue-500',
  },
  {
    id: '4',
    title: 'Habitability',
    slug: 'habitability',
    description: 'Dive deep into the science of planetary habitability, exploring habitable zones, atmospheric composition, biosignatures, and the search for Earth-like worlds.',
    difficulty: 'Advanced',
    duration: '50 min',
    topics: ['Habitable Zone', 'Atmospheres', 'Biosignatures', 'Earth Analogs'],
    icon: LifeBuoy,
    color: 'bg-orange-500',
  },
]

/**
 * Helper function to find a learning module by its slug
 * @param slug - The URL-safe identifier of the module
 * @returns The learning module if found, undefined otherwise
 */
export function getModuleBySlug(slug: string): LearningModule | undefined {
  return learningModules.find(module => module.slug === slug)
}

/**
 * Helper function to get appropriate Tailwind color classes for difficulty badges
 * @param difficulty - The difficulty level of the module
 * @returns Tailwind color classes for styling difficulty badges
 */
export function getModuleDifficultyColor(difficulty: DifficultyLevel): string {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30'
    case 'Intermediate':
      return 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30'
    case 'Advanced':
      return 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30'
    default:
      return 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30'
  }
}
