'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export default function TrainingTutorialPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <Link href="/docs/tutorials" className="hover:underline">Tutorials</Link>
          <span>/</span>
          <span>Training</span>
        </div>

        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Training Models</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">Train the three bundled classifiers using the dataset in <code>data/</code>.</p>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">RandomForest</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
detector.train_random_forest(data_path="data/cumulative_2025.09.20_12.15.37.csv")`} />
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">CNN</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
detector.train_cnn(data_path="data/cumulative_2025.09.20_12.15.37.csv")`} />
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">kNN</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
detector.train_knn(data_path="data/cumulative_2025.09.20_12.15.37.csv")`} />
        </div>
      </div>
    </div>
  )
}


