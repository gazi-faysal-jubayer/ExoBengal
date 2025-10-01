'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export default function ApiIndexPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <div className="prose-docs">
          <h1>ExoBengal REST API</h1>
          <p>A FastAPI-based REST API for exoplanet detection and analysis using machine learning models.</p>
          
          <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-light-border dark:border-dark-border my-6">
            <h3>Base URL</h3>
            <code className="text-light-accent dark:text-dark-accent">http://localhost:8000</code>
          </div>

          <h2>Features</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Multiple ML Models</strong>: Support for Random Forest, Decision Tree, KNN, and CNN models</li>
            <li><strong>Earth Similarity Index (ESI)</strong>: Calculate how similar an exoplanet is to Earth</li>
            <li><strong>Batch Processing</strong>: Analyze multiple exoplanets in a single request</li>
            <li><strong>Model Selection</strong>: Choose specific models to run or execute all available models</li>
            <li><strong>RESTful API</strong>: Clean, documented endpoints with automatic OpenAPI documentation</li>
          </ul>

          <h2>Interactive Documentation</h2>
          <p>Explore the API interactively using these documentation interfaces:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Swagger UI</strong>: <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="text-light-accent dark:text-dark-accent underline">http://localhost:8000/docs</a></li>
            <li><strong>ReDoc</strong>: <a href="http://localhost:8000/redoc" target="_blank" rel="noopener noreferrer" className="text-light-accent dark:text-dark-accent underline">http://localhost:8000/redoc</a></li>
          </ul>

          <h2>Endpoints Overview</h2>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-light-border dark:border-dark-border">
              <thead className="bg-light-surface dark:bg-dark-surface">
                <tr>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Method</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Endpoint</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>GET</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Root endpoint with API information</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>GET</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/health</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Health check endpoint</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>GET</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/docs</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Interactive API documentation (Swagger UI)</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>GET</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/models/info</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Information about available models</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>POST</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/predict</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Single exoplanet prediction</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>POST</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/predict/batch</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Batch predictions</td>
                </tr>
              </tbody>
            </table>
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
    </div>
  )
}


