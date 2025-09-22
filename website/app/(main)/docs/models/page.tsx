'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { Prose } from '@/components/docs/prose'
import { PrevNext } from '@/components/docs/prev-next'

export default function ModelsDocsPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <span>Models</span>
        </div>

        <div className="prose-docs">
          <h1>Models & Artifacts</h1>
          <p>Directory: <code>models/</code></p>
        </div>

        <div className="prose-docs space-y-2">
          <ul className="list-disc ml-6 text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>random_forest_classifier.pkl — RandomForestClassifier</li>
            <li>cnn_model.h5 — Keras dense model</li>
            <li>knn_model.pkl — KNeighborsClassifier</li>
            <li>scaler.pkl — StandardScaler</li>
            <li>imputer.pkl — SimpleImputer</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Prediction (auto-load)</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

m = DetectExoplanet()
print(m.random_forest([365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]))`} />
        </div>

        <div className="prose-docs space-y-4">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Retraining behavior</h2>
          <ul className="list-disc ml-6 text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>Each <code>train_*</code> overwrites its model and writes <code>scaler.pkl</code> and <code>imputer.pkl</code>.</li>
            <li>Move or rename artifacts beforehand if you want to keep previous versions.</li>
          </ul>
        </div>
        <PrevNext prev={{ title: 'Data Reference', href: '/docs/data-reference' }} next={{ title: 'API Reference', href: '/docs/api' }} />
      </div>
    </div>
  )
}



