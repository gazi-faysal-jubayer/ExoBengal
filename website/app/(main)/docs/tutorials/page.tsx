'use client'

import Link from 'next/link'

export default function TutorialsIndexPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">Tutorials</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">Step-by-step guides to common workflows with ExoBengal.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/docs/tutorials/training" className="card p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Train Models</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">RandomForest, CNN, and kNN training using provided dataset.</p>
          </Link>
          <Link href="/docs/tutorials/prediction" className="card p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Make Predictions</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Load saved models and classify new samples.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


