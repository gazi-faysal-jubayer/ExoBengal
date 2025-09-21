'use client'

import Link from 'next/link'
import { ChevronRight, Terminal, CheckCircle, ExternalLink } from 'lucide-react'
import { CodeBlock } from '@/components/docs/code-block'

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
  'NumPy >= 1.19.0',
  'Pandas >= 1.3.0',
  'Matplotlib >= 3.3.0',
  'Requests >= 2.25.0',
  'Astropy >= 4.2.0 (optional)',
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
            <div>
              <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                Getting Started with ExoBengal
              </h1>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                Learn how to install and use ExoBengal to explore NASA&apos;s exoplanet data in just a few minutes.
              </p>
            </div>

            {/* Installation Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-dark-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                        {step.title}
                      </h2>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                        {step.content}
                      </p>
                      
                      {step.code && (
                        <CodeBlock language={index === 0 ? 'bash' : 'python'} code={step.code} />
                      )}
                      
                      {step.note && (
                        <p className="text-sm text-semantic-info mt-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          {step.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Steps */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                What&apos;s Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/docs/tutorials"
                  className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Terminal className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                        Follow Tutorials
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Step-by-step guides for common tasks
                      </p>
                    </div>
                  </div>
                </Link>

                <Link 
                  href="/docs/api"
                  className="p-4 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                        API Reference
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Complete documentation of all functions
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
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
