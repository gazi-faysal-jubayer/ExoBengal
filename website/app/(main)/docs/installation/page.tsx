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
          <p>ExoBengal requires Python 3.8 or higher. This guide covers multiple installation methods, prerequisites, verification steps, and troubleshooting for common issues.</p>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Prerequisites</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Python version:</strong> Python 3.8+ (3.9 or 3.10 recommended)</li>
            <li><strong>System requirements:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Minimum: 4GB RAM, dual-core CPU</li>
                <li>Recommended: 8GB RAM, quad-core CPU</li>
                <li>Disk space: ~500MB for models and data</li>
              </ul>
            </li>
            <li><strong>TensorFlow:</strong> TensorFlow will run on CPU by default. GPU support requires CUDA toolkit (optional).</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Installation Options</h2>
          
          <h3>Install from PyPI (Recommended)</h3>
          <CodeBlock language="bash" code={`pip install exobengal`} />
          <p>The simplest way to install ExoBengal with all dependencies.</p>

          <h3>Install from source</h3>
          <CodeBlock language="bash" code={`git clone https://github.com/gazi-faysal-jubayer/ExoBengal.git
cd ExoBengal
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -U pip
pip install -r requirements.txt`} />
          <p>Install from source for development or to access the latest features.</p>

          <h3>Development Mode</h3>
          <CodeBlock language="bash" code={`git clone https://github.com/gazi-faysal-jubayer/ExoBengal.git
cd ExoBengal
pip install -e .`} />
          <p>Install in editable mode for active development.</p>
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
          <p>Descriptions for each dependency:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>numpy:</strong> Numerical computing</li>
            <li><strong>pandas:</strong> Data manipulation</li>
            <li><strong>matplotlib:</strong> Plotting and visualizations</li>
            <li><strong>seaborn:</strong> Statistical visualizations</li>
            <li><strong>scikit-learn:</strong> ML algorithms (RF, kNN, Decision Tree)</li>
            <li><strong>joblib:</strong> Model serialization</li>
            <li><strong>tensorflow:</strong> Deep learning (CNN)</li>
          </ul>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <strong>Note:</strong> For Apple Silicon Macs, use: <code>pip install tensorflow-macos tensorflow-metal</code>
          </p>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Verification</h2>
          <p>Verify your installation with these steps:</p>
          
          <h3>1. Basic Import Test</h3>
          <CodeBlock language="bash" code={`python -c "import exobengal; print('exobengal OK')"`} />
          
          <h3>2. Version Check</h3>
          <CodeBlock language="python" code={`import exobengal
print(f"ExoBengal version: {exobengal.__version__}")`} />
          
          <h3>3. Model Loading Test</h3>
          <CodeBlock language="python" code={`from exobengal import DetectExoplanet
detector = DetectExoplanet()
detector.load_rf_model()
print("Models loaded successfully!")`} />
        </div>

        <div className="prose-docs space-y-4">
          <h2>Troubleshooting Installation</h2>
          <h3>Common Issues</h3>
          
          <h4>1. TensorFlow Installation Issues</h4>
          <p><strong>Problem:</strong> ModuleNotFoundError for tensorflow</p>
          <p><strong>Solution:</strong> <code>pip install tensorflow-cpu</code> (for CPU-only)</p>
          
          <h4>2. Model Files Not Found</h4>
          <p><strong>Problem:</strong> FileNotFoundError for model files</p>
          <p><strong>Solution:</strong> Download pre-trained models from repository or train your own</p>
          
          <h4>3. Import Errors</h4>
          <p><strong>Problem:</strong> Cannot import DetectExoplanet</p>
          <p><strong>Solution:</strong> Reinstall with <code>pip install --upgrade exobengal</code></p>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Virtual Environment Setup (Recommended)</h2>
          <p>Using a virtual environment prevents dependency conflicts and keeps your system clean.</p>
          
          <h3>Using venv</h3>
          <CodeBlock language="bash" code={`python -m venv exobengal_env
source exobengal_env/bin/activate  # Windows: exobengal_env\\Scripts\\activate
pip install exobengal`} />
          
          <h3>Using conda</h3>
          <CodeBlock language="bash" code={`conda create -n exobengal python=3.10
conda activate exobengal
pip install exobengal`} />
        </div>

        <PrevNext prev={{ title: 'Docs Home', href: '/docs' }} next={{ title: 'Python Library', href: '/docs/api/detect-exoplanet' }} />
      </div>
    </div>
  )
}



