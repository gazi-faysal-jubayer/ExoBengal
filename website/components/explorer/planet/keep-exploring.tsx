'use client'

import { ArrowRight, Search, BookOpen, Newspaper, BarChart3 } from 'lucide-react'

interface ExploreCardProps {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}

function ExploreCard({ href, icon, title, description, gradient }: ExploreCardProps) {
  return (
    <a
      href={href}
      className={`group relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 clip-corner-cut backdrop-blur-sm transition-all duration-300 hover:border-primary-light-blue/30 hover:scale-[1.02] hover:shadow-lg block`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 clip-corner-cut ${gradient}`}></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary-dark-blue/10 dark:bg-primary-light-blue/10 text-primary-dark-blue dark:text-primary-light-blue group-hover:bg-primary-dark-blue/20 dark:group-hover:bg-primary-light-blue/20 transition-colors duration-300">
            {icon}
          </div>
          <ArrowRight className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-dark-blue dark:group-hover:text-primary-light-blue group-hover:translate-x-1 transition-all duration-300" />
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2 group-hover:text-primary-dark-blue dark:group-hover:text-primary-light-blue transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  )
}

export function KeepExploring() {
  const exploreCards = [
    {
      href: '/explorer',
      icon: <Search className="h-6 w-6" />,
      title: 'Explore More Exoplanets',
      description: 'Discover thousands of confirmed exoplanets in our comprehensive database. Filter by size, discovery method, or host star properties.',
      gradient: 'bg-gradient-to-br from-blue-500 to-purple-600'
    },
    {
      href: '/learn',
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Learn About Exoplanets',
      description: 'Dive deep into the science of exoplanet discovery and characterization. Understand detection methods, habitability, and more.',
      gradient: 'bg-gradient-to-br from-green-500 to-teal-600'
    },
    {
      href: '/news',
      icon: <Newspaper className="h-6 w-6" />,
      title: 'Latest Discoveries',
      description: 'Stay updated with the newest exoplanet discoveries and breakthroughs in astronomical research from around the world.',
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
    {
      href: '/visualizations',
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Interactive Visualizations',
      description: 'Explore exoplanet data through interactive charts, 3D models, and statistical analyses. Visualize trends and patterns.',
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600'
    }
  ]
  
  return (
    <div className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3">
          Keep Exploring
        </h2>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
          Continue your journey through the cosmos with related content and tools
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {exploreCards.map((card, index) => (
          <ExploreCard
            key={index}
            href={card.href}
            icon={card.icon}
            title={card.title}
            description={card.description}
            gradient={card.gradient}
          />
        ))}
      </div>
      
      {/* Additional resources */}
      <div className="bg-gradient-to-r from-primary-dark-blue/10 via-primary-light-blue/5 to-primary-dark-blue/10 dark:from-primary-light-blue/10 dark:via-primary-dark-blue/5 dark:to-primary-light-blue/10 rounded-lg p-6 border border-primary-dark-blue/20 dark:border-primary-light-blue/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
              Explore the Universe with ExoBengal
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
              Our platform provides comprehensive tools for exploring exoplanets, from raw data analysis to interactive visualizations. 
              Join thousands of astronomers, researchers, and space enthusiasts in discovering the wonders of distant worlds.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/api-access"
                className="btn-secondary text-sm"
              >
                API Access
              </a>
              <a
                href="/docs"
                className="btn-outline text-sm"
              >
                Documentation
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-dark-blue/20 dark:bg-primary-light-blue/20 mb-4">
              <Search className="h-10 w-10 text-primary-dark-blue dark:text-primary-light-blue" />
            </div>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Over <span className="font-bold text-primary-dark-blue dark:text-primary-light-blue">5,000+</span> confirmed exoplanets
            </p>
          </div>
        </div>
      </div>
      
      {/* Quick navigation */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <a
          href="/explorer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-dark-blue text-white rounded-lg hover:bg-primary-dark-blue/90 dark:bg-primary-light-blue dark:text-dark-background dark:hover:bg-primary-light-blue/90 transition-colors duration-200"
        >
          <ArrowRight className="h-4 w-4" />
          Back to Explorer
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover border border-light-border dark:border-dark-border transition-colors duration-200"
        >
          Home
        </a>
      </div>
    </div>
  )
}

