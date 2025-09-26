'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Telescope, Users, Sparkles } from 'lucide-react'

const ctaCards = [
  {
    title: 'Explore the Data',
    description: 'Dive into NASA\'s comprehensive exoplanet archive with advanced search and filtering.',
    icon: Telescope,
    href: '/explorer',
    color: 'from-primary-dark-blue to-primary-light-blue',
  },
  {
    title: 'Use the Python Package',
    description: 'Access exoplanet data programmatically with our powerful Python library.',
    icon: Code,
    href: '/docs',
    color: 'from-primary-light-blue to-primary-cyan',
  },
  {
    title: 'Join the Community',
    description: 'Connect with researchers and enthusiasts exploring the cosmos together.',
    icon: Users,
    href: 'https://github.com/gazi-faysal-jubayer/ExoBengal',
    external: true,
    color: 'from-primary-cyan to-semantic-info',
  },
]

export function CTASection() {
  return (
    <section className="py-16 bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Ready to Explore the Universe?
          </h2>
          <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Choose your path to discover the wonders of exoplanets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ctaCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                className="block h-full"
              >
                <div className="card p-8 h-full card-hover relative overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.color} mb-4`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    {card.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-primary-dark-blue dark:text-primary-light-blue">
                    <span className="text-sm font-medium">Get Started</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* AI Assistant CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-reddish-orange to-semantic-warning text-white rounded-full shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">AI Assistant Available</span>
          </div>
          <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Our AI-powered chatbot is ready to help you explore exoplanet data, answer questions, 
            and generate code examples. Look for the chat icon in the bottom right corner!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

