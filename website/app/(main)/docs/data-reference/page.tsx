'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { PrevNext } from '@/components/docs/prev-next'
import { Prose } from '@/components/docs/prose'

export default function DataReferencePage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <span>Data Reference</span>
        </div>

        <div className="prose-docs">
          <h1>Data Reference & Preprocessing</h1>
          <p>Dataset: <code>data/cumulative_2025.09.20_12.15.37.csv</code></p>
        </div>

        <div className="prose-docs space-y-4">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Columns used</h2>
          <ul className="list-disc ml-6 text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>koi_period (days)</li>
            <li>koi_prad (Earth radii)</li>
            <li>koi_teq (K)</li>
            <li>koi_srad (Solar radii)</li>
            <li>koi_slogg (log10 cm/s^2)</li>
            <li>koi_steff (K)</li>
            <li>koi_impact</li>
            <li>koi_duration (hours)</li>
            <li>koi_depth (ppm)</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Label mapping</h2>
          <ul className="list-disc ml-6 text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>CONFIRMED → 1</li>
            <li>CANDIDATE → 1</li>
            <li>FALSE POSITIVE → 0</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Preprocessing</h2>
          <ul className="list-disc ml-6 text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>SimpleImputer(mean) → <code>models/imputer.pkl</code></li>
            <li>StandardScaler → <code>models/scaler.pkl</code></li>
            <li>Train/test split: test_size=0.2, random_state=42</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">Train with a new CSV</h2>
          <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

m = DetectExoplanet()
m.train_random_forest(data_path="data/your_new_file.csv")`} />
        </div>
        <PrevNext prev={{ title: 'Getting Started', href: '/docs/getting-started' }} next={{ title: 'Models & Artifacts', href: '/docs/models' }} />
      </div>
    </div>
  )
}



