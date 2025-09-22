'use client'

import Link from 'next/link'

export default function ApiIndexPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <div className="prose-docs">
          <h1>API Reference</h1>
          <p>Overview of the public API. Choose a section below.</p>
        </div>

        <ul className="prose-docs list-disc ml-6 mt-6 space-y-2">
          <li>
            <Link href="/docs/api/detect-exoplanet" className="underline">DetectExoplanet</Link> — Train and run RandomForest, CNN, and kNN models.
          </li>
          <li>
            <Link href="/docs/api/exo-params" className="underline">ExoParams</Link> — Named input container for model features.
          </li>
          <li>
            <Link href="/docs/api/utils" className="underline">Utilities</Link> — ESI and common helpers.
          </li>
        </ul>
      </div>
    </div>
  )
}


