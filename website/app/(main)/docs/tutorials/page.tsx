'use client'

import Link from 'next/link'
import { BookOpen, Download, Cloud, FileText } from 'lucide-react'

export default function TutorialsIndexPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">Tutorials & Learning</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">Comprehensive learning path with Jupyter notebooks covering the complete pipeline from installation through training to inference. Follow our step-by-step guides to master exoplanet detection with machine learning.</p>

        <div className="prose-docs space-y-4 mb-8">
          <h2 id="notebooks">Learning Path</h2>
          <p>Our tutorials are organized into progressive phases, each building on the previous one. Start with Phase 1 if you're new to ExoBengal, or jump to advanced topics if you're already familiar with the basics.</p>
          
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Phase 1: Getting Started</strong> (15-30 min) - Basic setup and first prediction</li>
            <li><strong>Phase 2: Understanding the Data</strong> (30-45 min) - Exoplanet parameters and their meanings</li>
            <li><strong>Phase 3: Training Your First Model</strong> (45-60 min) - Train Random Forest classifier</li>
            <li><strong>Phase 4: Exploring Different Algorithms</strong> (60-90 min) - Compare all four models</li>
            <li><strong>Phase 5: Hyperparameter Tuning</strong> (90-120 min) - Optimize model performance</li>
            <li><strong>Phase 6: Advanced Topics</strong> (120+ min) - Batch predictions, ensemble methods</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/docs/tutorials#notebooks" className="card p-6 hover:shadow-lg">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Available Notebooks</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">test.ipynb for local development and pip_test.ipynb for Google Colab with Drive integration</p>
          </Link>

          <Link href="/docs/tutorials/training" className="card p-6 hover:shadow-lg">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Training Models</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Train Random Forest, CNN, k-Nearest Neighbors, and Decision Tree models with custom hyperparameters on NASA data</p>
          </Link>

          <Link href="/docs/tutorials/prediction" className="card p-6 hover:shadow-lg">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Making Predictions</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Load pre-trained models and classify exoplanet candidates with probability scores and ESI calculation</p>
          </Link>

          <Link href="/docs/tutorials#running-locally" className="card p-6 hover:shadow-lg">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 mb-4">
              <Download className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Running Locally</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Set up Jupyter Lab/Notebook on your machine and run tutorials with local Python environment</p>
          </Link>

          <Link href="/docs/tutorials#running-colab" className="card p-6 hover:shadow-lg">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 mb-4">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Running on Colab</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Use Google Colab's free GPU for faster training with Drive mounting and pip installation</p>
          </Link>

          <Link href="/docs/notebook" className="card p-6 hover:shadow-lg">
            <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Notebook Walkthrough</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Cell-by-cell explanation of test.ipynb with expected outputs and interpretation</p>
          </Link>
        </div>

        <div className="prose-docs space-y-4 mb-8">
          <h2>Prerequisites</h2>
          <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-light-border dark:border-dark-border">
            <ul className="list-disc ml-6 space-y-2">
              <li>Python 3.8+ required</li>
              <li>Dependencies: numpy, pandas, matplotlib, seaborn, scikit-learn, joblib, tensorflow</li>
              <li>Data: NASA Exoplanet Archive cumulative table (cumulative.csv)</li>
              <li>Hardware: Minimum 4GB RAM, recommended 8GB RAM</li>
              <li>For Colab: Google account for Drive access</li>
            </ul>
          </div>
        </div>

        <div className="prose-docs space-y-4 mb-8">
          <h2>Quick Start</h2>
          
          <h3 id="running-locally">Local Setup</h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto mb-4">
            <code className="text-green-400">cd ExoBengal/tutorial<br/>jupyter lab<br/># Open test.ipynb</code>
          </div>

          <h3 id="running-colab">Google Colab</h3>
          <p>Click the "Open in Colab" badge in pip_test.ipynb, mount Google Drive when prompted, and run the pip install cell.</p>
        </div>

        <div className="prose-docs space-y-4 mb-8">
          <h2>What You'll Learn</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>How to set up ExoParams with exoplanet parameters</li>
            <li>Training workflows for all four ML models</li>
            <li>Making predictions with trained models</li>
            <li>Comparing model performance and outputs</li>
            <li>Understanding evaluation metrics (classification reports, confusion matrices, AUC-ROC)</li>
            <li>Calculating and interpreting Earth Similarity Index (ESI)</li>
            <li>Hyperparameter tuning for better accuracy</li>
            <li>Batch predictions and ensemble methods</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4 mb-8">
          <h2>Common Issues</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Data file not found:</strong> Ensure cumulative.csv is in data/ directory</li>
            <li><strong>TensorFlow installation issues:</strong> Use tensorflow-cpu for CPU-only</li>
            <li><strong>Memory errors:</strong> Reduce CNN batch size or use subset of data</li>
            <li><strong>Slow training:</strong> Enable GPU in Colab or reduce epochs</li>
            <li><strong>Import errors:</strong> Reinstall exobengal package</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Next Steps</h2>
          <p>After completing tutorials:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Explore the API Reference for detailed class documentation</li>
            <li>Read Model Artifacts documentation for architecture details</li>
            <li>Try the live Cerebrium API for production deployments</li>
            <li>Contribute to the project on GitHub</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


