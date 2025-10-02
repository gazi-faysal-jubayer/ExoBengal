'use client'

import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'
import { Prose } from '@/components/docs/prose'
import { PrevNext } from '@/components/docs/prev-next'

export default function ApiIndexPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <Link href="/docs" className="hover:underline">Docs</Link>
          <span>/</span>
          <span>API Deployment</span>
        </div>

        <div className="prose-docs">
          <h1>ExoBengal API - Cerebrium Deployment</h1>
          <p>A production-ready machine learning API for exoplanet detection deployed on Cerebrium cloud platform.</p>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg my-6">
            <h3 className="text-green-800 dark:text-green-200 mb-2">🚀 Live API Endpoint</h3>
            <code className="text-green-700 dark:text-green-300 text-lg font-mono">https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/</code>
            <p className="text-green-700 dark:text-green-300 text-sm mt-2">✅ Live and operational</p>
          </div>

          <h2>Overview</h2>
          <p>ExoBengal API provides serverless ML inference with automatic scaling, making it easy to serve exoplanet detection models to users worldwide.</p>

          <h2>Features</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Multiple ML Models</strong>: Random Forest, Decision Tree, KNN, and CNN</li>
            <li><strong>Earth Similarity Index</strong>: Automatic ESI calculation for planet predictions</li>
            <li><strong>Auto-scaling</strong>: Scales from 0-3 replicas based on demand</li>
            <li><strong>Fast Response</strong>: 10-second cooldown for quick scaling</li>
            <li><strong>Error Resilience</strong>: Continues with other models if one fails</li>
            <li><strong>Model Selection</strong>: Choose specific models or run all</li>
          </ul>

          <h2>Available Models</h2>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-light-border dark:border-dark-border">
              <thead className="bg-light-surface dark:bg-dark-surface">
                <tr>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Model</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Type</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>random_forest</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Ensemble Learning</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Random Forest Classifier for robust predictions</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>decision_tree</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Tree-based Learning</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Decision Tree for interpretable results</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>knn</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Instance-based Learning</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">KNN with ESI calculation</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>cnn</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Deep Learning</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">CNN for complex pattern recognition</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="api-endpoints">API Endpoints</h2>
          <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-light-border dark:border-dark-border my-6">
            <h3>Base URL</h3>
            <code className="text-light-accent dark:text-dark-accent">https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/</code>
          </div>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-light-border dark:border-dark-border">
              <thead className="bg-light-surface dark:bg-dark-surface">
                <tr>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Endpoint</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Method</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/predict</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>POST</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Main prediction endpoint</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/health_check</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>POST</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Health status check</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/get_model_info</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>POST</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Get model information</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>/init</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>POST</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Initialize models manually</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="usage-examples">Usage Examples</h2>

          <h3>1. Health Check</h3>
          <CodeBlock language="bash" code={`curl -X POST "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/health_check" \\
  -H "Content-Type: application/json" \\
  -d '{}'`} />

          <h3>2. Get Model Information</h3>
          <CodeBlock language="bash" code={`curl -X POST "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/get_model_info" \\
  -H "Content-Type: application/json" \\
  -d '{}'`} />

          <h3>3. Predict with All Models</h3>
          <CodeBlock language="bash" code={`curl -X POST "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/predict" \\
  -H "Content-Type: application/json" \\
  -d '{
    "period": 365.0,
    "prad": 1.0,
    "teq": 288.0,
    "srad": 1.0,
    "slog_g": 4.44,
    "steff": 5778.0,
    "impact": 0.1,
    "duration": 5.0,
    "depth": 100.0
  }'`} />

          <h3>4. Predict with Specific Models</h3>
          <CodeBlock language="bash" code={`curl -X POST "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/predict" \\
  -H "Content-Type: application/json" \\
  -d '{
    "period": 365.0,
    "prad": 1.0,
    "teq": 288.0,
    "srad": 1.0,
    "slog_g": 4.44,
    "steff": 5778.0,
    "impact": 0.1,
    "duration": 5.0,
    "depth": 100.0,
    "models": ["random_forest", "cnn"]
  }'`} />

          <h3>5. Python Request Examples</h3>
          <CodeBlock language="python" code={`import requests
import json

# API Configuration
BASE_URL = "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api"
HEADERS = {"Content-Type": "application/json"}

def check_health():
    """Check API health status"""
    response = requests.post(f"{BASE_URL}/health_check", headers=HEADERS, json={})
    return response.json()

def get_model_info():
    """Get information about available models"""
    response = requests.post(f"{BASE_URL}/get_model_info", headers=HEADERS, json={})
    return response.json()

def predict_all_models(planet_data):
    """Make prediction with all models"""
    response = requests.post(f"{BASE_URL}/predict", headers=HEADERS, json=planet_data)
    return response.json()

def predict_specific_models(planet_data, models):
    """Make prediction with specific models"""
    planet_data["models"] = models
    response = requests.post(f"{BASE_URL}/predict", headers=HEADERS, json=planet_data)
    return response.json()

# Example usage
if __name__ == "__main__":
    # Earth-like planet data
    earth_data = {
        "period": 365.0,
        "prad": 1.0,
        "teq": 288.0,
        "srad": 1.0,
        "slog_g": 4.44,
        "steff": 5778.0,
        "impact": 0.1,
        "duration": 5.0,
        "depth": 100.0
    }
    
    # Check health
    health = check_health()
    print("Health:", health)
    
    # Get model info
    models = get_model_info()
    print("Models:", models)
    
    # Predict with all models
    result = predict_all_models(earth_data)
    print("All models prediction:", result)
    
    # Predict with specific models
    specific_result = predict_specific_models(earth_data, ["random_forest", "cnn"])
    print("Specific models prediction:", specific_result)`} />

          <h3>6. JavaScript Request Examples</h3>
          <CodeBlock language="js" code={`// API Configuration
const BASE_URL = "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api";
const HEADERS = {"Content-Type": "application/json"};

async function checkHealth() {
    const response = await fetch(\`\${BASE_URL}/health_check\`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({})
    });
    return await response.json();
}

async function getModelInfo() {
    const response = await fetch(\`\${BASE_URL}/get_model_info\`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({})
    });
    return await response.json();
}

async function predictAllModels(planetData) {
    const response = await fetch(\`\${BASE_URL}/predict\`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(planetData)
    });
    return await response.json();
}

async function predictSpecificModels(planetData, models) {
    const data = {...planetData, models};
    const response = await fetch(\`\${BASE_URL}/predict\`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function runExamples() {
    // Earth-like planet data
    const earthData = {
        period: 365.0,
        prad: 1.0,
        teq: 288.0,
        srad: 1.0,
        slog_g: 4.44,
        steff: 5778.0,
        impact: 0.1,
        duration: 5.0,
        depth: 100.0
    };
    
    try {
        // Check health
        const health = await checkHealth();
        console.log("Health:", health);
        
        // Get model info
        const models = await getModelInfo();
        console.log("Models:", models);
        
        // Predict with all models
        const result = await predictAllModels(earthData);
        console.log("All models prediction:", result);
        
        // Predict with specific models
        const specificResult = await predictSpecificModels(earthData, ["random_forest", "cnn"]);
        console.log("Specific models prediction:", specificResult);
        
    } catch (error) {
        console.error("Error:", error);
    }
}

// Run examples
runExamples();

// Export for Node.js modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkHealth,
        getModelInfo,
        predictAllModels,
        predictSpecificModels
    };
}`} />

          <h2>Hot Jupiter Detection Example</h2>
          <p>Hot Jupiters are gas giant planets that orbit very close to their host stars, typically with orbital periods of 1-10 days and high equilibrium temperatures. Here's how to detect them using the ExoBengal API:</p>

          <h3>Python Example</h3>
          <CodeBlock language="python" code={`import requests
import json

# API Configuration
BASE_URL = "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api"
HEADERS = {"Content-Type": "application/json"}

def detect_hot_jupiter():
    """Detect a Hot Jupiter using typical parameters"""
    # Hot Jupiter characteristics:
    # - Short orbital period (1-10 days)
    # - Large radius (8-15 Earth radii)
    # - High equilibrium temperature (1000-2000K)
    # - Close to star (small stellar radius)
    
    hot_jupiter_data = {
        "period": 3.5,        # 3.5 days orbital period
        "prad": 11.0,         # 11 Earth radii (Jupiter-like)
        "teq": 1500.0,        # 1500K equilibrium temperature
        "srad": 1.2,          # Stellar radius
        "slog_g": 4.5,         # Stellar surface gravity
        "steff": 6000,        # Stellar temperature
        "impact": 0.3,        # Impact parameter
        "duration": 2.5,      # Transit duration (hours)
        "depth": 5000.0       # Deep transit (ppm)
    }
    
    response = requests.post(f"{BASE_URL}/predict", headers=HEADERS, json=hot_jupiter_data)
    result = response.json()
    
    print("Hot Jupiter Detection Results:")
    print(f"Status: {result.get('status', 'unknown')}")
    
    if 'result' in result:
        for model, prediction in result['result'].items():
            if model != 'ESI':
                print(f"{model}: {'Exoplanet' if prediction['prediction'] == 1 else 'Not Exoplanet'} (confidence: {prediction['probability']:.2%})")
        
        if 'ESI' in result['result']:
            print(f"Earth Similarity Index: {result['result']['ESI']:.3f}")
    
    return result

# Run the detection
if __name__ == "__main__":
    result = detect_hot_jupiter()`} />

          <h3>JavaScript Example</h3>
          <CodeBlock language="js" code={`// Hot Jupiter Detection with JavaScript
const BASE_URL = "https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api";

async function detectHotJupiter() {
    // Hot Jupiter characteristics
    const hotJupiterData = {
        period: 3.5,        // 3.5 days orbital period
        prad: 11.0,         // 11 Earth radii (Jupiter-like)
        teq: 1500.0,        // 1500K equilibrium temperature
        srad: 1.2,          // Stellar radius
        slog_g: 4.5,        // Stellar surface gravity
        steff: 6000,        // Stellar temperature
        impact: 0.3,        // Impact parameter
        duration: 2.5,      // Transit duration (hours)
        depth: 5000.0       // Deep transit (ppm)
    };
    
    try {
        const response = await fetch(\`\${BASE_URL}/predict\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hotJupiterData)
        });
        
        const result = await response.json();
        
        console.log("Hot Jupiter Detection Results:");
        console.log(\`Status: \${result.status || 'unknown'}\`);
        
        if (result.result) {
            Object.entries(result.result).forEach(([model, prediction]) => {
                if (model !== 'ESI') {
                    const classification = prediction.prediction === 1 ? 'Exoplanet' : 'Not Exoplanet';
                    console.log(\`\${model}: \${classification} (confidence: \${(prediction.probability * 100).toFixed(2)}%)\`);
                }
            });
            
            if (result.result.ESI) {
                console.log(\`Earth Similarity Index: \${result.result.ESI.toFixed(3)}\`);
            }
        }
        
        return result;
        
    } catch (error) {
        console.error("Error detecting Hot Jupiter:", error);
        throw error;
    }
}

// Run the detection
detectHotJupiter()
    .then(result => console.log("Detection completed:", result))
    .catch(error => console.error("Detection failed:", error));`} />

          <h3>Understanding Hot Jupiter Parameters</h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-light-border dark:border-dark-border">
              <thead className="bg-light-surface dark:bg-dark-surface">
                <tr>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Parameter</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Hot Jupiter Value</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>period</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">1-10 days</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Very short orbital period due to proximity to star</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>prad</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">8-15 Earth radii</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Gas giant size, similar to Jupiter</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>teq</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">1000-2000K</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">High temperature from stellar proximity</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>depth</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">1000-10000 ppm</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Deep transit due to large planet size</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>duration</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">1-5 hours</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Short transit duration due to fast orbit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg my-6">
            <h4 className="text-yellow-800 dark:text-yellow-200 mb-2">🌡️ Hot Jupiter Characteristics</h4>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
              <li>• Orbital periods typically 1-10 days (vs. Earth's 365 days)</li>
              <li>• Equilibrium temperatures often exceed 1000K due to stellar proximity</li>
              <li>• Gas giant composition with radii 8-15 times Earth's radius</li>
              <li>• Deep transit signals (1000-10000 ppm) due to large size</li>
              <li>• Short transit durations due to high orbital velocity</li>
            </ul>
          </div>

          <h2>Input Parameters</h2>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-light-border dark:border-dark-border">
              <thead className="bg-light-surface dark:bg-dark-surface">
                <tr>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Parameter</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Type</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Required</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Description</th>
                  <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>period</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Orbital period (days)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">365.0</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>prad</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Planet radius (Earth radii)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">1.0</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>teq</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Equilibrium temperature (Kelvin)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">288.0</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>srad</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Stellar radius (solar radii)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">1.0</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>slog_g</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Stellar surface gravity (log scale)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">4.44</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>steff</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Stellar effective temperature (Kelvin)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">5778.0</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>impact</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Impact parameter</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">0.1</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>duration</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Transit duration (hours)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">5.0</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>depth</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">float</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Required</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Transit depth (ppm)</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">100.0</td>
                </tr>
                <tr>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2"><code>models</code></td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">array</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Optional</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">Specific models to run</td>
                  <td className="border border-light-border dark:border-dark-border px-4 py-2">["random_forest", "cnn"]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <strong>Available Model Options:</strong> 'random_forest', 'decision_tree', 'knn', 'cnn'
          </p>

          <h2>Response Format</h2>
          <h3>Successful Prediction Response</h3>
          <CodeBlock language="json" code={`{
  "run_id": "abc123-def456-ghi789",
  "result": {
    "random_forest": {
      "prediction": 1,
      "probability": 0.95
    },
    "decision_tree": {
      "prediction": 1,
      "probability": 0.88
    },
    "knn": {
      "prediction": 1,
      "probability": 0.92
    },
    "cnn": {
      "prediction": 1,
      "probability": 0.89
    },
    "ESI": 0.987
  },
  "input_data": {
    "period": 365.0,
    "prad": 1.0,
    "teq": 288.0,
    "srad": 1.0,
    "slog_g": 4.44,
    "steff": 5778.0,
    "impact": 0.1,
    "duration": 5.0,
    "depth": 100.0
  },
  "models_executed": ["random_forest", "decision_tree", "knn", "cnn"],
  "status": "success",
  "run_time_ms": 245
}`} />

          <h3>ESI Calculation</h3>
          <p>The Earth Similarity Index (ESI) provides a measure of how Earth-like an exoplanet is:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Range:</strong> 0.0 to 1.0</li>
            <li><strong>1.0:</strong> Perfect Earth-like conditions</li>
            <li><strong>0.0:</strong> Completely unlike Earth</li>
            <li><strong>Formula:</strong> Based on planet radius and equilibrium temperature</li>
          </ul>

          <h2 id="error-handling">Error Handling</h2>
          <h3>Missing Parameters Error</h3>
          <CodeBlock language="json" code={`{
  "error": "Missing required parameters",
  "details": "The following parameters are required: period, prad, teq, srad, slog_g, steff, impact, duration, depth",
  "status": "error"
}`} />

          <h3>Invalid Model Error</h3>
          <CodeBlock language="json" code={`{
  "error": "Invalid model specified",
  "details": "Model 'invalid_model' not found. Available models: random_forest, decision_tree, knn, cnn",
  "status": "error"
}`} />

          <h3>Model Execution Error</h3>
          <CodeBlock language="json" code={`{
  "error": "Model execution failed",
  "details": "Random Forest model failed to execute: Model file not found",
  "status": "error",
  "failed_models": ["random_forest"]
}`} />

          <h3>Initialization Error</h3>
          <CodeBlock language="json" code={`{
  "error": "Model initialization failed",
  "details": "Unable to load model files from storage",
  "status": "error"
}`} />

          <h2>Deployment Configuration</h2>
          <h3>Hardware Specifications</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>CPU:</strong> 2.0 cores</li>
            <li><strong>Memory:</strong> 4.0 GB</li>
            <li><strong>Compute:</strong> CPU (AWS)</li>
            <li><strong>Python:</strong> 3.10</li>
            <li><strong>Base Image:</strong> python:3.10-bookworm</li>
          </ul>

          <h3>Auto-scaling Settings</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Min Replicas:</strong> 0 (scales to zero when idle)</li>
            <li><strong>Max Replicas:</strong> 3</li>
            <li><strong>Cooldown:</strong> 10 seconds</li>
            <li><strong>Concurrency:</strong> 1 request per replica</li>
            <li><strong>Metric:</strong> Concurrency utilization</li>
          </ul>

          <h3>Model Files</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Random Forest Classifier (.pkl)</li>
            <li>Decision Tree Classifier (.pkl)</li>
            <li>CNN Model (.h5)</li>
            <li>KNN Model (.pkl)</li>
            <li>Feature Scaler (.pkl)</li>
            <li>Data Imputer (.pkl)</li>
          </ul>

          <h2>Performance</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Cold Start:</strong> ~10-15 seconds (model loading)</li>
            <li><strong>Warm Response:</strong> ~100-500ms</li>
            <li><strong>Scaling:</strong> Automatic based on traffic</li>
            <li><strong>Availability:</strong> 99.9% uptime on Cerebrium</li>
            <li><strong>Throughput:</strong> Up to 3 concurrent requests (max replicas)</li>
          </ul>

          <h2>Common Issues</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Missing Parameters:</strong> Ensure all required fields are included</li>
            <li><strong>Invalid Models:</strong> Check model names in the models array</li>
            <li><strong>Cold Start Delays:</strong> First request after idle period takes longer</li>
            <li><strong>Type Errors:</strong> Ensure numeric values are properly formatted</li>
          </ul>

          <h2>Use Cases</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Exoplanet Research:</strong> Classify newly discovered celestial objects</li>
            <li><strong>Educational Tools:</strong> Demonstrate ML in astronomy</li>
            <li><strong>Space Missions:</strong> Quick assessment of potential targets</li>
            <li><strong>Comparative Analysis:</strong> Test different detection algorithms</li>
            <li><strong>Habitability Studies:</strong> Use ESI calculations for astrobiology</li>
          </ul>

          <h2>Additional Resources</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><a href="https://pypi.org/project/exobengal/" target="_blank" rel="noopener noreferrer" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">ExoBengal Package</a> - Python library on PyPI</li>
            <li><a href="https://docs.cerebrium.ai" target="_blank" rel="noopener noreferrer" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">Cerebrium Documentation</a> - Cloud platform docs</li>
            <li><a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noopener noreferrer" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">NASA Exoplanet Archive</a> - Source of training data</li>
            <li><a href="https://www.nasa.gov/mission_pages/kepler/main/index.html" target="_blank" rel="noopener noreferrer" className="text-primary-dark-blue dark:text-primary-light-blue hover:underline">Kepler Space Telescope</a> - Data source for model training</li>
        </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mt-8">
            <h3 className="text-blue-800 dark:text-blue-200 mb-2">🚀 Start exploring the universe with ExoBengal API!</h3>
            <p className="text-blue-700 dark:text-blue-300">Deployed with love on Cerebrium Cloud Platform</p>
          </div>
        </div>

        <PrevNext prev={{ title: 'Model Artifacts', href: '/docs/models' }} next={{ title: 'Python Library', href: '/docs/api/detect-exoplanet' }} />
      </div>
    </div>
  )
}


