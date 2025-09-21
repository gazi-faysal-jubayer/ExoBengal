'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, Key, Database, Shield, ArrowRight, Copy, ExternalLink } from 'lucide-react'

const endpoints = [
  {
    path: '/api/exoplanets',
    method: 'GET',
    description: 'Get exoplanet data with filtering and pagination',
    params: ['search', 'method', 'year_min', 'year_max', 'radius_min', 'radius_max', 'limit', 'offset'],
  },
  {
    path: '/api/exoplanets/{id}',
    method: 'GET',
    description: 'Get detailed information about a specific exoplanet',
    params: ['id (required)'],
  },
  {
    path: '/api/stats',
    method: 'GET',
    description: 'Get statistical summaries and aggregated data',
    params: ['category', 'format'],
  },
  {
    path: '/api/search',
    method: 'POST',
    description: 'Advanced search with natural language queries',
    params: ['natural_language_query', 'filters', 'sort_options'],
  },
]

const codeExamples = {
  javascript: `// Fetch Earth-like exoplanets
const response = await fetch('/api/exoplanets?radius_min=0.8&radius_max=1.2&habitable_zone=true');
const data = await response.json();
console.log(\`Found \${data.total} Earth-like planets\`);`,
  
  python: `import requests

# Fetch recent discoveries
url = "https://yoursite.com/api/exoplanets"
params = {
    "year_min": 2020,
    "limit": 50
}
response = requests.get(url, params=params)
data = response.json()
print(f"Found {data['total']} recent discoveries")`,

  curl: `# Get exoplanet statistics
curl -X GET "https://yoursite.com/api/stats?category=overview" \\
     -H "Accept: application/json"`,
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
            API Access
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Access NASA&apos;s exoplanet data programmatically through our RESTful API. 
            Build applications, conduct research, or integrate exoplanet data into your projects.
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
                1. Get API Key
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Sign up for a free API key to access enhanced rate limits and analytics
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
                Use our RESTful endpoints to query exoplanet data in JSON format
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
            <Link
              href="/signup"
              className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
            >
              Get Free API Key
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
            API Endpoints
          </h2>

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
                  <button className="p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded transition-colors">
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

        {/* Rate Limits & Guidelines */}
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
                Rate Limits
              </h3>
              <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                <li>• Free tier: 1,000 requests/hour</li>
                <li>• With API key: 10,000 requests/hour</li>
                <li>• Premium: Unlimited requests</li>
                <li>• Bulk downloads available</li>
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
                  <Link href="/docs/api" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                    Complete API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/examples" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                    More Code Examples
                  </Link>
                </li>
                <li>
                  <Link href="/playground" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                    API Playground
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">
                    Developer Support
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
