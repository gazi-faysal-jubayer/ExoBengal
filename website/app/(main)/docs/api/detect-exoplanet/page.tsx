'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export default function DetectExoplanetApiPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <Link href="/docs/api" className="hover:underline">API</Link>
          <span>/</span>
          <span>DetectExoplanet</span>
        </div>

        <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">DetectExoplanet</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-3xl">
          High-level interface for training and using exoplanet classifiers. Wraps RandomForest, CNN and kNN
          models and provides a consistent prediction output that includes predicted label, probability, and
          Earth Similarity Index (ESI) when applicable.
        </p>

        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Import</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet`} />
        </div>

        <div className="space-y-8">
          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Constructor</h3>
            <CodeBlock language="python" code={`DetectExoplanet(
  rf_model_path="../models/random_forest_classifier.pkl",
  cnn_model_path="../models/cnn_model.h5",
  knn_model_path="../models/knn_model.pkl",
  scaler_path="../models/scaler.pkl",
)`} />
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-3">
              All paths default to the repository's <code>models/</code> directory and are created if missing.
            </p>
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Training</h3>
            <ul className="list-disc ml-6 text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-2">
              <li><code>train_random_forest(data_path)</code> – grid-searches a RandomForest and persists the best model. Prints classification report, confusion matrix, AUC.</li>
              <li><code>train_cnn(data_path)</code> – trains a small dense CNN on scaled features, saves the model and the <code>StandardScaler</code>.</li>
              <li><code>train_knn(data_path)</code> – trains a kNN classifier on scaled features, saves the model and scaler.</li>
            </ul>
            <div className="mt-4">
              <CodeBlock language="python" code={`detector = DetectExoplanet()
detector.train_random_forest(data_path="data/cumulative_2025.09.20_12.15.37.csv")
detector.train_cnn()
detector.train_knn()`} />
            </div>
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Inference</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">All predictors return the same dict schema:</p>
            <CodeBlock language="json" code={`{
  "prediction": "Planet" | "Not a Planet",
  "probability": 0.87,
  "ESI": 0.76
}`} />
            <div className="mt-4">
              <CodeBlock language="python" code={`sample = [koi_period, koi_prad, koi_teq, koi_srad, koi_slogg, koi_steff, koi_impact, koi_duration, koi_depth]

detector = DetectExoplanet()
rf_result = detector.random_forest(sample)
cnn_result = detector.cnn(sample)
knn_result = detector.knn(sample)`} />
            </div>
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Utilities</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
              <code>calculate_esi(koi_prad, koi_teq)</code> computes a simple Earth Similarity Index based on radius and equilibrium temperature.
            </p>
            <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet
detector = DetectExoplanet()
esi = detector.calculate_esi(koi_prad=1.05, koi_teq=290)`} />
          </section>
        </div>
      </div>
    </div>
  )
}


