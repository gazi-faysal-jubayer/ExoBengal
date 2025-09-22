'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { PrevNext } from '@/components/docs/prev-next'

export default function UtilitiesApiPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <Link href="/docs/api" className="hover:underline">API</Link>
          <span>/</span>
          <span>Utilities</span>
        </div>

        <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">Utilities</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-3xl">
          Helper functions available on the detector.
        </p>

        <div className="space-y-8">
          <section className="card p-6">
            <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">calculate_esi</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">Compute an Earth Similarity Index from radius and equilibrium temperature for quick screening.</p>
            <CodeBlock language="python" code={`from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
esi = detector.calculate_esi(koi_prad=1.05, koi_teq=290)
print(esi)  # 0..1`} />
          </section>

          <PrevNext prev={{ title: 'ExoParams', href: '/docs/api/exo-params' }} next={{ title: 'API Index', href: '/docs/api' }} />
        </div>
      </div>
    </div>
  )
}



