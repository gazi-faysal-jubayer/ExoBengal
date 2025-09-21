'use client'

import Link from 'next/link'

export default function ApiIndexPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
          API Reference
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
          ExoBengal Python package public API overview. Select a section below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/docs/api/detect-exoplanet" className="card p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">DetectExoplanet</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Train and run RandomForest, CNN, and kNN models for exoplanet classification.</p>
          </Link>

          <Link href="/docs/api/utils" className="card p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Utilities</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">ESI calculation and common helpers.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


