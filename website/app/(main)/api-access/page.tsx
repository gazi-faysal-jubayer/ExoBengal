'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, Key, Database, Shield, ArrowRight, Copy, ExternalLink } from 'lucide-react'

const endpoints = [
  {
    path: '/',
    method: 'GET',
    description: 'Root endpoint with API information',
    params: [],
  },
  {
    path: '/health',
    method: 'GET',
    description: 'Health check endpoint to verify API status',
    params: [],
  },
  {
    path: '/models/info',
    method: 'GET',
    description: 'Information about available models and input parameters',
    params: [],
  },
  {
    path: '/predict',
    method: 'POST',
    description: 'Single exoplanet prediction using ML models',
    params: ['period', 'prad', 'teq', 'srad', 'slog_g', 'steff', 'impact', 'duration', 'depth', 'models'],
  },
  {
    path: '/predict/batch',
    method: 'POST',
    description: 'Batch predictions for multiple exoplanet samples',
    params: ['sample1', 'sample2', '...', 'models'],
  },
  {
    path: '/docs',
    method: 'GET',
    description: 'Interactive API documentation (Swagger UI)',
    params: [],
  },
]

const codeExamples = {
  python: `import requests

# Single prediction
url = "http://localhost:8000/predict"
data = {
    "period": 365.0,
    "prad": 1.0,
    "teq": 288.0,
    "srad": 1.0,
    "slog_g": 4.44,
    "steff": 5778,
    "impact": 0.1,
    "duration": 5.0,
    "depth": 100.0,
    "models": ["random_forest", "cnn"]
}

response = requests.post(url, json=data)
result = response.json()
print(f"ESI: {result['esi']}")
print(f"Random Forest Prediction: {result['random_forest']['prediction']}")`,

  curl: `curl -X POST "http://localhost:8000/predict" \\
     -H "Content-Type: application/json" \\
     -d '{
       "period": 365.0,
       "prad": 1.0,
       "teq": 288.0,
       "srad": 1.0,
       "slog_g": 4.44,
       "steff": 5778,
       "impact": 0.1,
       "duration": 5.0,
       "depth": 100.0
     }'`,

  javascript: `const response = await fetch('http://localhost:8000/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    period: 365.0,
    prad: 1.0,
    teq: 288.0,
    srad: 1.0,
    slog_g: 4.44,
    steff: 5778,
    impact: 0.1,
    duration: 5.0,
    depth: 100.0,
    models: ["random_forest"]
  })
});

const data = await response.json();
console.log('Prediction:', data);`,
}

export default function APIAccessPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            ExoBengal API Access
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Access ExoBengal&apos;s machine learning models for exoplanet detection and analysis. 
            Use Random Forest, CNN, KNN, and Decision Tree models to predict exoplanet characteristics and calculate Earth Similarity Index.
          </p>
        </motion.div>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Quick Start
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6 text-center"
            >
              <Key className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                1. No Authentication Required
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Free and open access to all API endpoints for research and development
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6 text-center"
            >
              <Code className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                2. Make Requests
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Use RESTful endpoints to predict exoplanet characteristics using ML models
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6 text-center"
            >
              <Database className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                3. Build Apps
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Create visualizations, analysis tools, or educational applications
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
            >
              View Interactive Docs
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            API Endpoints
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-6">
            Base URL: <code className="px-2 py-1 bg-light-surface dark:bg-dark-surface rounded font-mono">http://localhost:8000</code>
          </p>

          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-mono rounded ${
                        endpoint.method === 'GET' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-lg font-mono text-primary-dark-blue dark:text-primary-light-blue">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      {endpoint.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Parameters:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {endpoint.params.map((param) => (
                      <span
                        key={param}
                        className="px-2 py-1 text-xs bg-light-surface dark:bg-dark-surface rounded font-mono"
                      >
                        {param}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Code Examples
          </h2>

          <div className="space-y-6">
            {Object.entries(codeExamples).map(([language, code], index) => (
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
                  <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary capitalize">
                    {language}
                  </h3>
                  <button className="p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded transition-colors" data-target-cursor="true">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 text-green-400 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Available Models */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Available Models
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6"
            >
              <Code className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Random Forest
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Ensemble learning method using multiple decision trees
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6"
            >
              <Code className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Decision Tree
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Tree-based learning algorithm for classification
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6"
            >
              <Code className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                K-Nearest Neighbors (KNN)
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Instance-based learning algorithm
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-6"
            >
              <Code className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Convolutional Neural Network (CNN)
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Deep learning model for pattern recognition
              </p>
            </motion.div>
          </div>
        </section>

        {/* Input Parameters */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Input Parameters
          </h2>
          
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-surface dark:bg-dark-surface">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-dark-border">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">period</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Orbital period (days)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">365.25</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">prad</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Planet radius (Earth radii)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">1.0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">teq</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Equilibrium temperature (Kelvin)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">288.0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">srad</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Stellar radius (solar radii)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">1.0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">slog_g</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Stellar surface gravity (log scale)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">4.44</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">steff</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Stellar effective temperature (Kelvin)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">5778</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">impact</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Impact parameter</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">0.0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">duration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Transit duration (hours)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">13.0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-dark-blue dark:text-primary-light-blue">depth</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">float</td>
                    <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">Transit depth (parts per million)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">84.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* API Features & Resources */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-6"
            >
              <Shield className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                API Features
              </h3>
              <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                <li>• Multiple ML Models (Random Forest, Decision Tree, KNN, CNN)</li>
                <li>• Earth Similarity Index (ESI) calculation</li>
                <li>• Batch processing support</li>
                <li>• Model selection options</li>
                <li>• Automatic OpenAPI documentation</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card p-6"
            >
              <ExternalLink className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="http://localhost:8000/docs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline"
                  >
                    Interactive API Docs (Swagger UI)
                  </a>
                </li>
                <li>
                  <a 
                    href="http://localhost:8000/redoc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline"
                  >
                    ReDoc Documentation
                  </a>
                </li>
                <li>
                  <Link href="/docs/models" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                    Model Information
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
