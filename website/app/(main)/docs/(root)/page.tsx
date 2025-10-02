'use client'

import Link from 'next/link'
import { BookOpen, Download, Github, Rocket, Code, Star, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { CodeBlock } from '@/components/docs/code-block'
import TerminalCard from '@/components/docs/terminal-card'
import { trackExternalLink, trackDownload } from '@/lib/analytics'

const quickLinks = [
  {
    title: 'Quick Start',
    description: 'Get up and running with ExoBengal in minutes',
    href: '/docs/getting-started',
    icon: Rocket,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Installation',
    description: 'Python versions, dependencies, and setup',
    href: '/docs/installation',
    icon: Download,
    color: 'from-gray-500 to-slate-600',
  },
  {
    title: 'Python Library',
    description: 'DetectExoplanet and ExoParams API reference',
    href: '/docs/api/detect-exoplanet',
    icon: Code,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Model Artifacts',
    description: 'Pre-trained models, architectures, and performance',
    href: '/docs/models',
    icon: Star,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Tutorials & Learning',
    description: 'Step-by-step learning path with Jupyter notebooks',
    href: '/docs/tutorials',
    icon: BookOpen,
    color: 'from-orange-500 to-red-600',
  },
  {
    title: 'API Deployment',
    description: 'Cerebrium cloud API with live endpoints',
    href: '/docs/api',
    icon: Zap,
    color: 'from-teal-500 to-emerald-600',
  },
  {
    title: 'Data Reference',
    description: 'NASA Exoplanet Archive data format and features',
    href: '/docs/data-reference',
    icon: BookOpen,
    color: 'from-indigo-500 to-blue-600',
  },
  {
    title: 'Examples',
    description: 'Real-world use cases and code samples',
    href: '/docs/examples',
    icon: Code,
    color: 'from-pink-500 to-rose-600',
  },
]

const features = [
  {
    title: 'Four ML Models',
    description: 'Random Forest, CNN, k-Nearest Neighbors, and Decision Tree classifiers',
    icon: Star,
  },
  {
    title: 'Pre-trained Artifacts',
    description: 'Ready-to-use models trained on NASA Kepler mission data',
    icon: Download,
  },
  {
    title: 'ESI Calculation',
    description: 'Automatic Earth Similarity Index for habitability assessment',
    icon: Zap,
  },
  {
    title: 'Cloud API',
    description: 'Production-ready REST API deployed on Cerebrium',
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
              ExoBengal Documentation - ML-Powered Exoplanet Detection
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-3xl mx-auto">
              A comprehensive machine learning toolkit for exoplanet detection using NASA Kepler mission data. Train and deploy Random Forest, CNN, k-Nearest Neighbors, and Decision Tree models for planet classification.
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
                onClick={() => trackExternalLink('https://github.com/gazi-faysal-jubayer/ExoBengal', 'View on GitHub')}
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Link>
            </div>

            {/* Installation Command */}
            <div className="max-w-lg mx-auto">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4 text-center">
                Install via pip:
              </p>
              <TerminalCard command="pip install exobengal" />
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
              <CodeBlock language="python" code={`from exobengal import DetectExoplanet, ExoParams

# Initialize detector
detector = DetectExoplanet()

# Create Earth-like parameters
params = ExoParams(
    period=365.0, prad=1.0, teq=288.0,
    srad=1.0, slog_g=4.44, steff=5778,
    impact=0.1, duration=5.0, depth=100.0
)

# Make prediction
result = detector.random_forest(params)
print(f"Prediction: {result['prediction']}")
print(f"Probability: {result['probability']:.2%}")
print(f"ESI: {result['ESI']:.3f}")`} />
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
                <Link href="/docs/tutorials/training" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Training Models with Custom Hyperparameters
                </Link>
              </li>
              <li>
                <Link href="/docs/tutorials/prediction" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Making Predictions with Pre-trained Models
                </Link>
              </li>
              <li>
                <Link href="/docs/models" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Understanding Model Performance Metrics
                </Link>
              </li>
              <li>
                <Link href="/docs/tutorials" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Running Notebooks on Google Colab
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
                <Link href="/docs/api/detect-exoplanet" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  DetectExoplanet Class
                </Link>
              </li>
              <li>
                <Link href="/docs/api/exo-params" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  ExoParams Class
                </Link>
              </li>
              <li>
                <Link href="/docs/tutorials/training" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                  Model Training Methods
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
