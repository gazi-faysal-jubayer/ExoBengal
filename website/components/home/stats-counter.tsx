'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Stat {
  label: string
  value: number
  suffix?: string
  decimals?: number
}

const stats: Stat[] = [
  { label: 'Confirmed Exoplanets', value: 5565, suffix: '+' },
  { label: 'Planetary Systems', value: 4140, suffix: '+' },
  { label: 'NASA Missions', value: 15, suffix: '' },
  { label: 'Years of Data', value: 32, suffix: '' },
]

function AnimatedCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const increment = value / (duration / 16) // 60 FPS

      let currentCount = 0
      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="py-16 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Exploring the Cosmos by the Numbers
          </h2>
          <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Real-time statistics from NASA&apos;s Exoplanet Archive
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="card p-6 hover:shadow-lg transition-shadow duration-200 h-full">
                <p className="text-4xl font-bold text-primary-dark-blue mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {stat.label}
                </p>
                <div className="mt-4 h-1 w-full bg-gradient-to-r from-primary-dark-blue to-primary-light-blue rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

