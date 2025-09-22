'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { Prose } from '@/components/docs/prose'
import { PrevNext } from '@/components/docs/prev-next'

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <span>Installation</span>
        </div>

        <div className="prose-docs">
          <h1>Installation & Requirements</h1>
          <p>Python 3.8+ is required.</p>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Install from source</h2>
          <CodeBlock language="bash" code={`git clone https://github.com/gazi-faysal-jubayer/ExoBengal.git
cd ExoBengal
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -U pip
pip install -r requirements.txt`} />
        </div>

        <div className="prose-docs space-y-4">
          <h2>Dependencies</h2>
          <CodeBlock language="bash" code={`numpy
pandas
matplotlib
seaborn
scikit-learn
joblib
tensorflow`} />
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">TensorFlow will run on CPU if no GPU is available.</p>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Verify install</h2>
          <CodeBlock language="bash" code={`python -c "import exobengal; print('exobengal OK')"`} />
        </div>

        <PrevNext prev={{ title: 'Docs Home', href: '/docs' }} next={{ title: 'Getting Started', href: '/docs/getting-started' }} />
      </div>
    </div>
  )
}



