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
          <p>The models/ directory contains pre-trained machine learning models and preprocessing artifacts for exoplanet detection. All models are trained on NASA Exoplanet Archive Kepler mission data.</p>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Model Artifacts</h2>
          
          <h3 id="random-forest">1. Random Forest Classifier</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>File:</strong> random_forest_classifier.pkl</li>
            <li><strong>Type:</strong> Scikit-learn RandomForestClassifier</li>
            <li><strong>Size:</strong> ~5-10 MB</li>
            <li><strong>Description:</strong> Ensemble classifier combining multiple decision trees for robust predictions</li>
            <li><strong>Performance:</strong> ~90% accuracy, AUC-ROC 0.94-0.96</li>
          </ul>

          <h3 id="decision-tree">2. Decision Tree Classifier</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>File:</strong> decision_tree_classifier.pkl</li>
            <li><strong>Type:</strong> Scikit-learn DecisionTreeClassifier</li>
            <li><strong>Size:</strong> ~1-3 MB</li>
            <li><strong>Description:</strong> Single decision tree for interpretable rule-based classification</li>
            <li><strong>Performance:</strong> ~85% accuracy, AUC-ROC 0.88-0.91</li>
          </ul>

          <h3 id="cnn">3. CNN Model</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>File:</strong> cnn_model.h5</li>
            <li><strong>Type:</strong> TensorFlow/Keras Sequential neural network</li>
            <li><strong>Size:</strong> ~500 KB - 2 MB</li>
            <li><strong>Description:</strong> Deep learning model with dense layers and dropout regularization</li>
            <li><strong>Architecture:</strong> Input(9) → Dense(64) → Dropout(0.3) → Dense(32) → Dropout(0.3) → Dense(16) → Dropout(0.3) → Output(1)</li>
            <li><strong>Performance:</strong> ~89% accuracy, AUC-ROC 0.92-0.95</li>
          </ul>

          <h3 id="knn">4. k-Nearest Neighbors</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>File:</strong> knn_model.pkl</li>
            <li><strong>Type:</strong> Scikit-learn KNeighborsClassifier</li>
            <li><strong>Size:</strong> ~10-20 MB (stores training data)</li>
            <li><strong>Description:</strong> Instance-based classifier using k=5 nearest neighbors</li>
            <li><strong>Performance:</strong> ~87% accuracy, AUC-ROC 0.90-0.93</li>
          </ul>

          <h3>5. Standard Scaler</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>File:</strong> scaler.pkl</li>
            <li><strong>Type:</strong> Scikit-learn StandardScaler</li>
            <li><strong>Size:</strong> ~1-5 KB</li>
            <li><strong>Description:</strong> Feature normalization to zero mean and unit variance</li>
            <li><strong>Critical:</strong> Must use the same scaler for training and inference</li>
          </ul>

          <h3>6. Simple Imputer</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>File:</strong> imputer.pkl</li>
            <li><strong>Type:</strong> Scikit-learn SimpleImputer</li>
            <li><strong>Size:</strong> ~1-5 KB</li>
            <li><strong>Description:</strong> Fill missing values using mean strategy</li>
            <li><strong>Critical:</strong> Must use the same imputer for training and inference</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Model Architectures & Hyperparameters</h2>
          
          <h3>Random Forest</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>n_estimators:</strong> 100</li>
            <li><strong>max_depth:</strong> None</li>
            <li><strong>threshold:</strong> 0.5</li>
          </ul>

          <h3>CNN</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>hidden_layers:</strong> [64,32,16]</li>
            <li><strong>dropout:</strong> 0.3</li>
            <li><strong>epochs:</strong> 50</li>
            <li><strong>threshold:</strong> 0.6</li>
          </ul>

          <h3>kNN</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>n_neighbors:</strong> 5</li>
            <li><strong>metric:</strong> euclidean</li>
            <li><strong>threshold:</strong> 0.6</li>
          </ul>

          <h3>Decision Tree</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>max_depth:</strong> 10</li>
            <li><strong>criterion:</strong> gini</li>
            <li><strong>threshold:</strong> 0.6</li>
          </ul>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Performance Comparison</h2>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-light-border dark:border-dark-border">
              <thead className="bg-light-surface dark:bg-dark-surface">
                <tr>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Model</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Accuracy</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">AUC-ROC</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Training Time</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Inference Speed</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Random Forest</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">~90%</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">0.94-0.96</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Medium (1-2 min)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Fast</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Production, general use</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">CNN</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">~89%</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">0.92-0.95</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Slow (5-15 min CPU)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Fast</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Complex patterns, research</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">kNN</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">~87%</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">0.90-0.93</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Fast (instant)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Slow</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Quick prototyping</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Decision Tree</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">~85%</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">0.88-0.91</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Fast (10-20 sec)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Fast</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Education, interpretability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="prose-docs space-y-4">
          <h2>Prediction (auto-load)</h2>
          <p>Models are loaded automatically on first prediction. The detector checks if the model is loaded and calls the corresponding load method if needed.</p>
          <CodeBlock language="python" code={`from exobengal import DetectExoplanet

detector = DetectExoplanet()
sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
print(detector.random_forest(sample))`} />
          
          <h3>Explicit Pre-loading</h3>
          <CodeBlock language="python" code={`from exobengal import DetectExoplanet

detector = DetectExoplanet()
detector.load_rf_model()  # Pre-load for faster predictions

# Now predictions are faster
result = detector.random_forest([365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0])
print(result)`} />
        </div>

        <div className="prose-docs space-y-4">
          <h2>Retraining</h2>
          <p>Each train_* method overwrites its model file and updates scaler.pkl and imputer.pkl. Always backup existing models before retraining.</p>
          
          <h3>Important Notes</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Each <code>train_*</code> overwrites its model and writes <code>scaler.pkl</code> and <code>imputer.pkl</code></li>
            <li>Always backup existing models before retraining: <code>cp -r models/ models_backup/</code></li>
            <li>Training automatically handles data loading, preprocessing, splitting (80/20), and evaluation</li>
            <li>Outputs include classification report, confusion matrix, and AUC-ROC score</li>
          </ul>

          <h3>Retraining Example</h3>
          <CodeBlock language="python" code={`from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Retrain Random Forest with custom hyperparameters
detector.train_random_forest(
    data_path="data/cumulative.csv",
    n_estimators=200,
    max_depth=20
)`} />
        </div>

        <div className="prose-docs space-y-4">
          <h2>Loading Custom Models</h2>
          <p>You can specify custom model paths when initializing the detector:</p>
          <CodeBlock language="python" code={`from exobengal import DetectExoplanet

detector = DetectExoplanet(
    rf_model_path="/path/to/my_rf_model.pkl",
    scaler_path="/path/to/my_scaler.pkl",
    imputer_path="/path/to/my_imputer.pkl"
)`} />
        </div>

        <div className="prose-docs space-y-4">
          <h2>Troubleshooting</h2>
          <h3>Common Issues</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Model file not found:</strong> Train models first or download from repository</li>
            <li><strong>TensorFlow warnings:</strong> Safe to ignore or install tensorflow-cpu</li>
            <li><strong>Inconsistent predictions:</strong> Ensure same scaler/imputer used for training and inference</li>
          </ul>
        </div>

        <PrevNext prev={{ title: 'Data Reference', href: '/docs/data-reference' }} next={{ title: 'Tutorials', href: '/docs/tutorials' }} />
      </div>
    </div>
  )
}



