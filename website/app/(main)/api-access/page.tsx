'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, Key, Database, Shield, ArrowRight, Copy, ExternalLink } from 'lucide-react'

const endpoints = [
  {
    path: '/health_check',
    method: 'POST',
    description: 'Health check endpoint to verify API status and deployment health',
    params: [],
  },
  {
    path: '/get_model_info',
    method: 'POST',
    description: 'Information about available models, input parameters, and deployment configuration',
    params: [],
  },
  {
    path: '/predict',
    method: 'POST',
    description: 'Single exoplanet prediction using ML models with Earth Similarity Index calculation',
    params: ['period', 'prad', 'teq', 'srad', 'slog_g', 'steff', 'impact', 'duration', 'depth', 'models'],
  },
  {
    path: '/init',
    method: 'POST',
    description: 'Manual model initialization for faster subsequent requests',
    params: [],
  },
]

const codeExamples = {
  python: `import requests

url = "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/predict"
headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
data = {
    "item": {
        "period": 365.0,
        "prad": 1.0,
        "teq": 288.0,
        "srad": 1.0,
        "slog_g": 4.44,
        "steff": 5778.0,
        "impact": 0.1,
        "duration": 5.0,
        "depth": 100.0,
        "models": ["random_forest", "cnn"]
    }
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(f"Run ID: {result['run_id']}")
print(f"ESI: {result['result']['esi']}")
print(f"Predictions: {result['result']['predictions']}")`,

  curl: `curl -X POST https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/predict \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{
    "item": {
      "period": 365.0,
      "prad": 1.0,
      "teq": 288.0,
      "srad": 1.0,
      "slog_g": 4.44,
      "steff": 5778.0,
      "impact": 0.1,
      "duration": 5.0,
      "depth": 100.0
    }
  }'`,

  javascript: `const response = await fetch('https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    item: {
      period: 365.0,
      prad: 1.0,
      teq: 288.0,
      srad: 1.0,
      slog_g: 4.44,
      steff: 5778,
      impact: 0.1,
      duration: 5.0,
      depth: 100.0,
      models: ["random_forest", "cnn"]
    }
  })
});

const data = await response.json();
console.log('Run ID:', data.run_id);
console.log('Predictions:', data.result.predictions);`,
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
            Access ExoBengal&apos;s machine learning models deployed on Cerebrium Cloud Platform. 
            Use Random Forest, CNN, KNN, and Decision Tree models to predict exoplanet characteristics and calculate Earth Similarity Index with auto-scaling and high availability.
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
                1. Simple Authentication
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Include Content-Type and Accept headers in your requests for proper API communication
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
              href="https://docs.cerebrium.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
            >
              View Cerebrium Docs
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            API Endpoints
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-6">
            Base URL: <code className="px-2 py-1 bg-light-surface dark:bg-dark-surface rounded font-mono">https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/</code>
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
                      <span className="px-2 py-1 text-xs font-mono rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
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

                {endpoint.params.length > 0 && (
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
                    {endpoint.path === '/predict' && (
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                        Note: Request body must include an 'item' object with all parameters
                      </p>
                    )}
                  </div>
                )}
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

        {/* Response Format */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Response Format
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                Cerebrium API Response Structure
              </h3>
              <button className="p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded transition-colors" data-target-cursor="true">
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-green-400 overflow-x-auto">
              <code>{`{
  "run_id": "c514a61a-34f4-9cb7-bba8-a11679c5e2d5",
  "result": {
    "predictions": {
      "random_forest": {
        "prediction": {
          "prediction": "Not a Planet",
          "probability": 0.452
        },
        "model_type": "Random Forest"
      },
      "knn": {
        "prediction": {
          "prediction": "Planet",
          "probability": 1,
          "ESI": 0.021
        },
        "model_type": "Knn"
      }
    },
    "esi": 1,
    "input_data": {...},
    "models_executed": ["random_forest", "decision_tree", "knn", "cnn"],
    "status": "success"
  },
  "run_time_ms": 7866.67
}`}</code>
            </pre>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 p-4 bg-light-surface dark:bg-dark-surface rounded-lg"
          >
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              The API returns a <code className="px-1 py-0.5 bg-light-background dark:bg-dark-background rounded text-xs">run_id</code> for tracking, 
              a <code className="px-1 py-0.5 bg-light-background dark:bg-dark-background rounded text-xs">result</code> object with predictions from each model, 
              calculated Earth Similarity Index (ESI), and execution time in milliseconds.
            </p>
          </motion.div>
        </section>

        {/* Error Handling */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Error Handling
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-200">
                  Missing Parameters
                </h3>
                <button className="p-2 hover:bg-red-100 dark:hover:bg-red-800/30 rounded transition-colors" data-target-cursor="true">
                  <Copy className="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-red-400 overflow-x-auto">
                <code>{`{
  "error": "Missing required fields: ['period', 'prad']",
  "status": "error"
}`}</code>
              </pre>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Invalid Model
                </h3>
                <button className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-800/30 rounded transition-colors" data-target-cursor="true">
                  <Copy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-yellow-400 overflow-x-auto">
                <code>{`{
  "error": "Invalid model(s): ['invalid_model']. Available models: ['random_forest', 'decision_tree', 'knn', 'cnn']",
  "status": "error"
}`}</code>
              </pre>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                  Model Execution Error
                </h3>
                <button className="p-2 hover:bg-orange-100 dark:hover:bg-orange-800/30 rounded transition-colors" data-target-cursor="true">
                  <Copy className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-orange-400 overflow-x-auto">
                <code>{`{
  "predictions": {
    "random_forest": {
      "error": "Model execution failed: [error details]",
      "model_type": "Random Forest"
    }
  },
  "status": "success"
}`}</code>
              </pre>
            </motion.div>
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

        {/* Deployment Configuration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Deployment Configuration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6"
            >
              <Code className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                Hardware Specifications
              </h3>
              <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                <li>• <strong>CPU:</strong> 2.0 cores</li>
                <li>• <strong>Memory:</strong> 4.0 GB</li>
                <li>• <strong>Compute:</strong> CPU (AWS)</li>
                <li>• <strong>Python:</strong> 3.10</li>
                <li>• <strong>Base Image:</strong> python:3.10-bookworm</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6"
            >
              <Database className="h-8 w-8 mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                Auto-scaling Settings
              </h3>
              <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                <li>• <strong>Min Replicas:</strong> 0 (scales to zero when idle)</li>
                <li>• <strong>Max Replicas:</strong> 3</li>
                <li>• <strong>Cooldown:</strong> 10 seconds</li>
                <li>• <strong>Concurrency:</strong> 1 request per replica</li>
                <li>• <strong>Metric:</strong> Concurrency utilization</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6"
          >
            <Shield className="h-8 w-8 mb-4 text-primary-dark-blue" />
            <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Model Files
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-3 bg-light-surface dark:bg-dark-surface rounded">
                <code className="text-sm text-primary-dark-blue dark:text-primary-light-blue">random_forest_classifier.pkl</code>
              </div>
              <div className="p-3 bg-light-surface dark:bg-dark-surface rounded">
                <code className="text-sm text-primary-dark-blue dark:text-primary-light-blue">decision_tree_classifier.pkl</code>
              </div>
              <div className="p-3 bg-light-surface dark:bg-dark-surface rounded">
                <code className="text-sm text-primary-dark-blue dark:text-primary-light-blue">cnn_model.h5</code>
              </div>
              <div className="p-3 bg-light-surface dark:bg-dark-surface rounded">
                <code className="text-sm text-primary-dark-blue dark:text-primary-light-blue">knn_model.pkl</code>
              </div>
              <div className="p-3 bg-light-surface dark:bg-dark-surface rounded">
                <code className="text-sm text-primary-dark-blue dark:text-primary-light-blue">scaler.pkl</code>
              </div>
              <div className="p-3 bg-light-surface dark:bg-dark-surface rounded">
                <code className="text-sm text-primary-dark-blue dark:text-primary-light-blue">imputer.pkl</code>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Performance */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-2">~10-15s</div>
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Cold Start
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Model loading time for idle replicas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-2">~100-500ms</div>
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Warm Response
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Response time for active replicas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-2">99.9%</div>
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Availability
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Uptime on Cerebrium platform
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary-dark-blue dark:text-primary-light-blue mb-2">3</div>
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                Concurrent Requests
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Maximum concurrent requests
              </p>
            </motion.div>
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
                    href="https://docs.cerebrium.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline"
                  >
                    Cerebrium Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="https://pypi.org/project/exobengal/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline"
                  >
                    ExoBengal Package (PyPI)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://exoplanetarchive.ipac.caltech.edu/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline"
                  >
                    NASA Exoplanet Archive
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
