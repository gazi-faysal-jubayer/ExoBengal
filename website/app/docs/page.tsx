import Link from 'next/link'
import { BookOpen, Download, Github, Rocket, Code, Star, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const quickLinks = [
  {
    title: 'Quick Start',
    description: 'Get up and running with ExoBengal in minutes',
    href: '/docs/getting-started',
    icon: Rocket,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'API Reference',
    description: 'Complete documentation of all functions and classes',
    href: '/docs/api',
    icon: Code,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides for common tasks',
    href: '/docs/tutorials',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Examples',
    description: 'Real-world examples and use cases',
    href: '/docs/examples',
    icon: Star,
    color: 'from-orange-500 to-red-600',
  },
]

const features = [
  {
    title: 'Easy Data Access',
    description: 'Simple Python interface to NASA Exoplanet Archive',
    icon: Download,
  },
  {
    title: 'Rich Filtering',
    description: 'Advanced filtering and search capabilities',
    icon: Zap,
  },
  {
    title: 'Visualization Tools',
    description: 'Built-in plotting and visualization functions',
    icon: Star,
  },
  {
    title: 'Open Source',
    description: 'MIT licensed and community driven',
    icon: Users,
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              ExoBengal Documentation
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-3xl mx-auto">
              A powerful Python package for accessing, analyzing, and visualizing NASA exoplanet data.
              Build amazing discoveries with our comprehensive toolkit.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/docs/getting-started"
                className="btn-primary px-8 py-3 text-lg font-semibold flex items-center gap-2"
              >
                <Rocket className="h-5 w-5" />
                Get Started
              </Link>
              <Link
                href="https://github.com/gazi-faysal-jubayer/ExoBengal"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-3 text-lg font-semibold flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Link>
            </div>

            {/* Installation Command */}
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 max-w-lg mx-auto">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                Install via pip:
              </p>
              <code className="text-primary-dark-blue dark:text-primary-light-blue font-mono">
                pip install exobengal
              </code>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {quickLinks.map((link, index) => (
            <Link
              key={link.title}
              href={link.href}
              className="group block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="card p-6 h-full hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${link.color} mb-4`}>
                  <link.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                  {link.title}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                  {link.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-light-text-primary dark:text-dark-text-primary mb-12">
            Why Choose ExoBengal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex p-4 bg-primary-light-blue/10 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-primary-dark-blue" />
                </div>
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-light-text-primary dark:text-dark-text-primary mb-8">
            Quick Example
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 font-mono text-sm">
{`# Import the ExoBengal package
import exobengal as exo

# Create a client to access NASA data
client = exo.NASAClient()

# Search for Earth-like planets
earth_like = client.search(
    radius_min=0.8,
    radius_max=1.2,
    habitable_zone=True,
    confirmed=True
)

# Get detailed information
for planet in earth_like[:5]:
    print(f"{planet.name}: {planet.radius:.2f} R⊕")
    
# Create visualizations
exo.plot.mass_radius_diagram(earth_like)
exo.plot.discovery_timeline(earth_like)`}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Popular Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Popular Tutorials
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/tutorials/basic-search" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Basic Exoplanet Search and Filtering
                </Link>
              </li>
              <li>
                <Link href="/docs/tutorials/visualizations" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Creating Beautiful Visualizations
                </Link>
              </li>
              <li>
                <Link href="/docs/tutorials/statistical-analysis" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Statistical Analysis of Planet Populations
                </Link>
              </li>
              <li>
                <Link href="/docs/tutorials/machine-learning" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Machine Learning Applications
                </Link>
              </li>
            </ul>
          </div>

          <div className="card p-8">
            <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              API Reference
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/api/client" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  NASAClient - Main interface
                </Link>
              </li>
              <li>
                <Link href="/docs/api/search" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Search and Filtering Methods
                </Link>
              </li>
              <li>
                <Link href="/docs/api/plotting" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Plotting and Visualization
                </Link>
              </li>
              <li>
                <Link href="/docs/api/utils" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Utility Functions
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
