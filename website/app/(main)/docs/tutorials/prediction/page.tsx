'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export default function PredictionTutorialPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <Link href="/docs/tutorials" className="hover:underline">Tutorials</Link>
          <span>/</span>
          <span>Prediction</span>
        </div>

        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Making Predictions</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">Load trained models and classify new samples.</p>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">RandomForest</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
print(detector.random_forest(sample))`} />
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">CNN</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
print(detector.cnn(sample))`} />
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">kNN</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
print(detector.knn(sample))`} />
        </div>
      </div>
    </div>
  )
}


