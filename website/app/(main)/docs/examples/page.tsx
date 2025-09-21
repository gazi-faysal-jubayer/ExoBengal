'use client'

import { CodeBlock } from '@/components/docs/code-block'

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">Examples</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">Copy-pasteable snippets using the ExoBengal package.</p>

        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Predict with pretrained RandomForest</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
print(detector.random_forest(sample))`} />
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Train and save kNN</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
detector.train_knn(data_path="data/cumulative_2025.09.20_12.15.37.csv")`} />
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Compute ESI</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
print(detector.calculate_esi(1.05, 290))`} />
        </div>
      </div>
    </div>
  )
}


