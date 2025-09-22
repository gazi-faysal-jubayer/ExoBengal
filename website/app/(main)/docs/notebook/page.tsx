'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { Prose } from '@/components/docs/prose'

export default function NotebookDocsPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <span>Notebook</span>
        </div>

        <div className="prose-docs">
          <h1>Notebook Walkthrough</h1>
          <p>File: <code>test.ipynb</code></p>
        </div>

        <div className="card p-6 space-y-4 card-hover">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Setup</h2>
          <CodeBlock language="python" code={`import exobengal as ex
params = ex.ExoParams()
params.depth = 0.01
params.period = 3.0
params.duration = 2.0 / 24.0
params.impact = 0.2
params.prad = 0.9
params.slog_g = 4.5
params.teq = 900
params.steff = 5500`} />
        </div>

        <div className="card p-6 space-y-4 card-hover">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Train and predict</h2>
          <CodeBlock language="python" code={`detect = ex.DetectExoplanet()
detect.train_cnn()
detect.cnn(params)

new_detect = ex.DetectExoplanet()
new_detect.train_random_forest()
new_detect.random_forest(params)`} />
        </div>

        <div className="card p-6 space-y-2 card-hover">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Notes & warnings</h2>
          <ul className="list-disc ml-6 text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>TensorFlow may show GPU/oneDNN notices on CPU-only machines.</li>
            <li>Saving as <code>.h5</code> may show a deprecation notice; behavior is correct.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}



