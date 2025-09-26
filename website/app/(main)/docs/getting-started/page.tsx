'use client'

import Link from 'next/link'
import { ChevronRight, Terminal, CheckCircle, ExternalLink } from 'lucide-react'
import { CodeBlock } from '@/components/docs/code-block'
import { PrevNext } from '@/components/docs/prev-next'
import TerminalCard from '@/components/docs/terminal-card'

const steps = [
  {
    title: 'Installation',
    content: `Install ExoBengal using pip:`,
    code: `pip install exobengal`,
    note: 'Requires Python 3.8 or higher'
  },
  {
    title: 'Import the Package',
    content: `Import DetectExoplanet in your Python script:`,
    code: `from exobengal.exobengal import DetectExoplanet`,
  },
  {
    title: 'Create a Detector',
    content: `Initialize the detector (paths default to repository models/):`,
    code: `detector = DetectExoplanet()`,
  },
  {
    title: 'Make a Prediction',
    content: `Use the saved RandomForest model to classify a sample:`,
    code: `sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]\nprint(detector.random_forest(sample))`,
  },
  {
    title: 'Compute ESI',
    content: `Calculate Earth Similarity Index for a candidate planet:`,
    code: `print(detector.calculate_esi(koi_prad=1.05, koi_teq=290))`,
  },
  {
    title: 'Train Models',
    content: `Optionally retrain the bundled models:`,
    code: `detector.train_random_forest("data/cumulative_2025.09.20_12.15.37.csv")\n# detector.train_cnn()\n# detector.train_knn()`,
  }
]

const requirements = [
  'Python 3.8+',
  'numpy',
  'pandas',
  'matplotlib',
  'seaborn',
  'scikit-learn',
  'joblib',
  'tensorflow',
]

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-8">
          <Link href="/docs" className="hover:text-light-text-primary dark:hover:text-dark-text-primary">
            Documentation
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>Getting Started</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="prose-docs">
              <h1>Getting Started with ExoBengal</h1>
              <p>Learn how to install and use ExoBengal to explore NASA&apos;s exoplanet data in just a few minutes.</p>

              {steps.map((step, index) => (
                <div key={index} className="space-y-3">
                  <h2>{index + 1}. {step.title}</h2>
                  <p>{step.content}</p>
                  {step.code && (
                    index === 0 ? (
                      <TerminalCard command={step.code} />
                    ) : (
                      <CodeBlock language="python" code={step.code} />
                    )
                  )}
                  {step.note && (
                    <p className="text-sm text-semantic-info mt-1 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {step.note}
                    </p>
                  )}
                </div>
              ))}

              <h2>What&apos;s Next?</h2>
              <p>Continue with tutorials or jump to the API reference:</p>
              <ul>
                <li><Link className="underline" href="/docs/tutorials">Follow Tutorials</Link></li>
                <li><Link className="underline" href="/docs/api">API Reference</Link></li>
              </ul>
            </div>
            <PrevNext prev={{ title: 'Installation', href: '/docs/installation' }} next={{ title: 'API Reference', href: '/docs/api' }} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Requirements */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                Requirements
              </h3>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/docs/tutorials/basic-search"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm"
                  >
                    Basic Search Tutorial
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/docs/examples"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm"
                  >
                    Code Examples
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/docs/api/client"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm"
                  >
                    NASAClient API
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://github.com/gazi-faysal-jubayer/ExoBengal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm flex items-center gap-1"
                  >
                    GitHub Repository
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                If you run into any issues, here are some resources:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link 
                    href="/docs/troubleshooting"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline"
                  >
                    Troubleshooting Guide
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://github.com/gazi-faysal-jubayer/ExoBengal/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-dark-blue dark:text-primary-light-blue hover:underline flex items-center gap-1"
                  >
                    Report Issues
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <span className="text-primary-dark-blue dark:text-primary-light-blue">
                    Ask the AI Assistant (bottom right)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
