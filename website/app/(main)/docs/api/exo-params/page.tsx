'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { PrevNext } from '@/components/docs/prev-next'

export default function ExoParamsApiPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <Link href="/docs/api" className="hover:underline">API</Link>
          <span>/</span>
          <span>ExoParams</span>
        </div>

        <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">ExoParams</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-3xl">
          Convenience container for model input features in a clear, named form. Missing values can be left as
          <code> None</code>; they will be imputed before prediction/training.
        </p>

        <div className="space-y-8">
          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Import</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-3">Bring in the <code>ExoParams</code> container when you want named, self-documenting inputs.</p>
            <CodeBlock language="python" code={`from exobengal.exobengal import ExoParams`} />
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Constructor</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-3">All fields are optional; <code>None</code> will be imputed and scaled during preprocessing.</p>
            <CodeBlock language="python" code={`ExoParams(
  period=None,   # koi_period (days)
  prad=None,     # koi_prad (Earth radii)
  teq=None,      # koi_teq (K)
  srad=None,     # koi_srad (Solar radii)
  slog_g=None,   # koi_slogg (log10 cm/s^2)
  steff=None,    # koi_steff (K)
  impact=None,   # koi_impact
  duration=None, # koi_duration (hours)
  depth=None,    # koi_depth (ppm)
)`} />
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Usage</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-3">This form improves clarity and reduces ordering mistakes compared to raw lists.</p>
            <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet, ExoParams

params = ExoParams(period=365.0, prad=1.0, teq=288.0, srad=1.0, slog_g=4.44, steff=5778, impact=0.1, duration=5.0, depth=100.0)
detector = DetectExoplanet()
result = detector.random_forest(params)`} />
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Feature Order</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              The underlying models expect features in this exact order when passing a list:
            </p>
            <CodeBlock language="python" code={`[period, prad, teq, srad, slog_g, steff, impact, duration, depth]`} />
          </section>

          <PrevNext prev={{ title: 'DetectExoplanet', href: '/docs/api/detect-exoplanet' }} next={{ title: 'Utilities', href: '/docs/api/utils' }} />
        </div>
      </div>
    </div>
  )
}



