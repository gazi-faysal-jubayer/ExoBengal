# ExoBengal Python Library

A machine learning library for exoplanet detection using NASA Kepler data. ExoBengal provides a unified interface for training and deploying multiple ML models (Random Forest, CNN, kNN, Decision Tree) on exoplanet transit data, designed for both research and educational purposes.

## Features

- 🤖 **Four ML algorithms**: Random Forest, CNN, k-Nearest Neighbors, Decision Tree
- 📦 **Pre-trained models** ready for immediate inference
- 🔧 **Simple Python API** with two main classes: `DetectExoplanet` and `ExoParams`
- 🎓 **Training capabilities** with customizable hyperparameters
- 🌍 **Earth Similarity Index (ESI)** calculation for habitability assessment
- 📊 **Built-in preprocessing** pipeline (imputation, scaling)
- 📈 **Comprehensive evaluation** metrics (classification reports, confusion matrices, AUC-ROC)
- 🗃️ **Integration** with NASA Exoplanet Archive cumulative tables

## Installation

### From PyPI (Recommended)
```bash
pip install exobengal
```

### From Source
```bash
git clone https://github.com/yourusername/ExoBengal.git
cd ExoBengal
pip install -r requirements.txt
```

### Development Mode
```bash
git clone https://github.com/yourusername/ExoBengal.git
cd ExoBengal
pip install -e .
```

### Prerequisites
- Python 3.8 or higher
- Required packages: numpy, pandas, matplotlib, seaborn, scikit-learn, joblib, tensorflow
- Note about TensorFlow: CPU version is sufficient for inference; GPU version recommended for training large datasets

### Verification
```python
import exobengal
print("ExoBengal installed successfully!")
print(f"Version: {exobengal.__version__}")
```

## Quick Start

```python
from exobengal import DetectExoplanet, ExoParams

# Initialize detector
detector = DetectExoplanet()

# Make a prediction using pre-trained Random Forest model
params = ExoParams(
    period=365.0,    # Orbital period in days
    prad=1.0,        # Planet radius in Earth radii
    teq=288.0,       # Equilibrium temperature in Kelvin
    srad=1.0,        # Stellar radius in Solar radii
    slog_g=4.44,     # Stellar surface gravity
    steff=5778,      # Stellar effective temperature
    impact=0.1,      # Impact parameter
    duration=5.0,    # Transit duration in hours
    depth=100.0      # Transit depth in ppm
)

result = detector.random_forest(params)
print(result)
# Output: {'prediction': 'Planet', 'probability': 0.95, 'ESI': 0.98}
```

## API Reference

### ExoParams Class

**Purpose**: Container class for exoplanet parameters used as input to ML models.

**Constructor**:
```python
ExoParams(
    period=None,      # Orbital period (days)
    prad=None,        # Planet radius (Earth radii)
    teq=None,         # Equilibrium temperature (Kelvin)
    srad=None,        # Stellar radius (Solar radii)
    slog_g=None,      # Stellar surface gravity log10(cm/s²)
    steff=None,       # Stellar effective temperature (Kelvin)
    impact=None,      # Impact parameter (0-1)
    duration=None,    # Transit duration (hours)
    depth=None        # Transit depth (ppm)
)
```

**All parameters are optional** - missing values will be imputed during prediction.

**Methods**:
- `to_feature_list()`: Converts parameters to a list in the correct order for model input

**Example**:
```python
from exobengal import ExoParams

# Create with all parameters
earth_like = ExoParams(
    period=365.0, prad=1.0, teq=288.0, srad=1.0,
    slog_g=4.44, steff=5778, impact=0.1, 
    duration=5.0, depth=100.0
)

# Create with partial parameters (others will be imputed)
partial = ExoParams(period=10.5, prad=2.3, teq=450.0)

# Convert to list
features = earth_like.to_feature_list()
print(features)  # [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
```

### DetectExoplanet Class

**Purpose**: Main interface for training and running exoplanet detection models.

**Constructor**:
```python
DetectExoplanet(
    rf_model_path="models/random_forest_classifier.pkl",
    dt_model_path="models/decision_tree_classifier.pkl",
    cnn_model_path="models/cnn_model.h5",
    knn_model_path="models/knn_model.pkl",
    scaler_path="models/scaler.pkl",
    imputer_path="models/imputer.pkl"
)
```

**All paths are optional** - defaults point to pre-trained models in the `models/` directory.

**Prediction Methods** (all return the same schema):
- `random_forest(input_data)`: Predict using Random Forest classifier
- `decision_tree(input_data)`: Predict using Decision Tree classifier
- `cnn(input_data)`: Predict using Convolutional Neural Network
- `knn(input_data)`: Predict using k-Nearest Neighbors classifier

**Input**: Can be either:
- `ExoParams` object
- List of 9 floats in order: [period, prad, teq, srad, slog_g, steff, impact, duration, depth]

**Output Schema**:
```python
{
    "prediction": "Planet" | "Not a Planet",
    "probability": float,  # 0.0 to 1.0
    "ESI": float           # Only present if prediction is "Planet"
}
```

**Training Methods**:
- `train_random_forest(data_path, n_estimators=100, max_depth=None)`
- `train_decision_tree(data_path, max_depth=None, criterion="gini")`
- `train_cnn(data_path, hidden_layers=[64,32,16], dropout_rate=0.3, optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"], epochs=50, batch_size=32, patience=5)`
- `train_knn(data_path, n_neighbors=5)`

**Model Loading Methods** (automatically called if needed):
- `load_rf_model()`: Load Random Forest model and preprocessing artifacts
- `load_decision_tree()`: Load Decision Tree model and preprocessing artifacts
- `load_cnn()`: Load CNN model and preprocessing artifacts
- `load_knn()`: Load kNN model and preprocessing artifacts

**Utility Methods**:
- `calculate_esi(koi_prad, koi_teq)`: Calculate Earth Similarity Index

## Training Examples

### Training Random Forest
```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Train with default hyperparameters
detector.train_random_forest(
    data_path="data/cumulative.csv"
)

# Train with custom hyperparameters
detector.train_random_forest(
    data_path="data/cumulative.csv",
    n_estimators=200,  # Number of trees
    max_depth=20       # Maximum tree depth
)

# Outputs:
# - Classification report (precision, recall, F1-score)
# - Confusion matrix heatmap
# - AUC-ROC score
# - Saves model to models/random_forest_classifier.pkl
# - Saves scaler to models/scaler.pkl
# - Saves imputer to models/imputer.pkl
```

### Training CNN
```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Train with default architecture
detector.train_cnn(
    data_path="data/cumulative.csv"
)

# Train with custom architecture
detector.train_cnn(
    data_path="data/cumulative.csv",
    hidden_layers=[128, 64, 32, 16],  # Custom layer sizes
    dropout_rate=0.4,                  # Dropout for regularization
    optimizer="adam",
    loss="binary_crossentropy",
    epochs=100,
    batch_size=64,
    patience=10  # Early stopping patience
)

# Features:
# - Early stopping to prevent overfitting
# - Model checkpointing (saves best model)
# - Validation on 20% test split
# - Saves model to models/cnn_model.h5
```

### Training k-Nearest Neighbors
```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Train with default k=5
detector.train_knn(
    data_path="data/cumulative.csv"
)

# Train with custom k
detector.train_knn(
    data_path="data/cumulative.csv",
    n_neighbors=10  # Number of neighbors to consider
)

# Outputs:
# - Classification report
# - Confusion matrix heatmap
# - AUC-ROC score
# - Saves model to models/knn_model.pkl
```

### Training Decision Tree
```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Train with custom hyperparameters
detector.train_decision_tree(
    data_path="data/cumulative.csv",
    max_depth=15,
    criterion="gini"  # or "entropy"
)

# Outputs:
# - Classification report
# - Confusion matrix heatmap
# - AUC-ROC score
# - Saves model to models/decision_tree_classifier.pkl
```

**Note**: All training methods automatically:
- Load data from NASA Exoplanet Archive format
- Calculate stellar insolation (koi_insol)
- Impute missing values using mean strategy
- Scale features using StandardScaler
- Split data 80/20 for training/testing
- Save preprocessing artifacts for consistent inference

## Inference Examples

### Using Pre-trained Models
```python
from exobengal import DetectExoplanet, ExoParams

detector = DetectExoplanet()

# Example 1: Earth-like planet
earth_params = ExoParams(
    period=365.0, prad=1.0, teq=288.0, srad=1.0,
    slog_g=4.44, steff=5778, impact=0.1,
    duration=5.0, depth=100.0
)

result = detector.random_forest(earth_params)
print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['probability']:.2%}")
if 'ESI' in result:
    print(f"Earth Similarity Index: {result['ESI']}")

# Example 2: Hot Jupiter
hot_jupiter = ExoParams(
    period=3.5, prad=11.0, teq=1500.0, srad=1.2,
    slog_g=4.5, steff=6000, impact=0.3,
    duration=2.5, depth=5000.0
)

result = detector.cnn(hot_jupiter)
print(result)
```

### Using List Input
```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Input as list: [period, prad, teq, srad, slog_g, steff, impact, duration, depth]
sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]

result = detector.knn(sample)
print(result)
```

### Handling Missing Data
```python
from exobengal import ExoParams, DetectExoplanet

detector = DetectExoplanet()

# Partial data - missing values will be imputed
partial_data = ExoParams(
    period=10.5,
    prad=2.3,
    teq=450.0
    # Other parameters will be imputed using mean values
)

result = detector.random_forest(partial_data)
print(result)
```

### Comparing Multiple Models
```python
from exobengal import DetectExoplanet, ExoParams

detector = DetectExoplanet()

params = ExoParams(
    period=100.0, prad=1.5, teq=350.0, srad=0.9,
    slog_g=4.5, steff=5500, impact=0.2,
    duration=4.0, depth=200.0
)

print("Random Forest:", detector.random_forest(params))
print("CNN:", detector.cnn(params))
print("kNN:", detector.knn(params))
print("Decision Tree:", detector.decision_tree(params))
```

## Model-Specific Usage Patterns

### Random Forest
**Best for**: General-purpose classification with good interpretability

**Characteristics**:
- Ensemble method combining multiple decision trees
- Robust to overfitting
- Provides feature importance
- Fast inference
- Default threshold: 0.5 for binary classification

**When to use**:
- When you need reliable predictions with minimal tuning
- When feature importance is valuable
- When training time is not critical

**Example**:
```python
detector = DetectExoplanet()
result = detector.random_forest(params)
```

### Convolutional Neural Network (CNN)
**Best for**: Complex pattern recognition in feature space

**Characteristics**:
- Deep learning architecture with dense layers
- Can learn non-linear relationships
- Requires more training data
- Slower training, fast inference
- Uses 0.6 threshold for classification

**When to use**:
- When you have large training datasets
- When you need to capture complex feature interactions
- When you can afford longer training times

**Example**:
```python
detector = DetectExoplanet()
result = detector.cnn(params)
```

### k-Nearest Neighbors (kNN)
**Best for**: Instance-based learning and similarity matching

**Characteristics**:
- Non-parametric method
- No explicit training phase
- Predictions based on k nearest neighbors
- Sensitive to feature scaling (handled automatically)
- Uses 0.6 threshold for classification

**When to use**:
- When you want a simple, interpretable model
- When training data is representative
- When you need quick model updates

**Example**:
```python
detector = DetectExoplanet()
result = detector.knn(params)
```

### Decision Tree
**Best for**: Interpretable rule-based classification

**Characteristics**:
- Single tree structure
- Highly interpretable
- Can overfit without pruning
- Fast training and inference
- Uses 0.6 threshold for classification

**When to use**:
- When you need maximum interpretability
- When you want to understand decision rules
- For educational purposes

**Example**:
```python
detector = DetectExoplanet()
result = detector.decision_tree(params)
```

## ESI Calculation Utility

The Earth Similarity Index (ESI) measures how similar a planet is to Earth based on radius and temperature.

### Standalone Usage
```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Calculate ESI for a planet
esi = detector.calculate_esi(
    koi_prad=1.1,   # Planet radius in Earth radii
    koi_teq=280.0   # Equilibrium temperature in Kelvin
)

print(f"ESI: {esi}")
# Output: ESI: 0.95

# Interpretation:
# ESI = 1.0: Identical to Earth
# ESI > 0.8: Potentially habitable
# ESI < 0.5: Very different from Earth
```

### Automatic ESI in Predictions
```python
from exobengal import DetectExoplanet, ExoParams

detector = DetectExoplanet()

params = ExoParams(
    period=365.0, prad=1.0, teq=288.0, srad=1.0,
    slog_g=4.44, steff=5778, impact=0.1,
    duration=5.0, depth=100.0
)

result = detector.random_forest(params)

# ESI is automatically calculated for planets
if result['prediction'] == 'Planet':
    print(f"This planet has an ESI of {result['ESI']}")
```

### ESI Formula
The ESI is calculated as:
```
radius_score = 1 - |prad - 1.0| / (prad + 1.0)
temp_score = 1 - |teq - 288| / (teq + 288)
ESI = sqrt(radius_score * temp_score)
```

Where:
- `prad` is planet radius in Earth radii (Earth = 1.0)
- `teq` is equilibrium temperature in Kelvin (Earth ≈ 288K)

## Advanced Topics

### Custom Model Paths
```python
from exobengal import DetectExoplanet

# Use custom model locations
detector = DetectExoplanet(
    rf_model_path="/path/to/my_rf_model.pkl",
    cnn_model_path="/path/to/my_cnn_model.h5",
    scaler_path="/path/to/my_scaler.pkl",
    imputer_path="/path/to/my_imputer.pkl"
)

result = detector.random_forest(params)
```

### Batch Predictions
```python
from exobengal import DetectExoplanet, ExoParams
import pandas as pd

detector = DetectExoplanet()

# Load multiple candidates
candidates = [
    ExoParams(period=365, prad=1.0, teq=288, srad=1.0, slog_g=4.44, steff=5778, impact=0.1, duration=5.0, depth=100),
    ExoParams(period=10, prad=2.5, teq=800, srad=1.2, slog_g=4.3, steff=6000, impact=0.3, duration=3.0, depth=500),
    ExoParams(period=200, prad=1.2, teq=320, srad=0.9, slog_g=4.5, steff=5500, impact=0.15, duration=6.0, depth=150),
]

# Predict for all candidates
results = [detector.random_forest(candidate) for candidate in candidates]

# Convert to DataFrame for analysis
df = pd.DataFrame(results)
print(df)
```

### Model Comparison and Ensemble
```python
from exobengal import DetectExoplanet, ExoParams
import numpy as np

detector = DetectExoplanet()

params = ExoParams(
    period=100, prad=1.5, teq=350, srad=0.9,
    slog_g=4.5, steff=5500, impact=0.2,
    duration=4.0, depth=200
)

# Get predictions from all models
rf_result = detector.random_forest(params)
cnn_result = detector.cnn(params)
knn_result = detector.knn(params)
dt_result = detector.decision_tree(params)

# Ensemble voting
probabilities = [
    rf_result['probability'],
    cnn_result['probability'],
    knn_result['probability'],
    dt_result['probability']
]

avg_probability = np.mean(probabilities)
ensemble_prediction = "Planet" if avg_probability > 0.5 else "Not a Planet"

print(f"Ensemble Prediction: {ensemble_prediction}")
print(f"Average Probability: {avg_probability:.2%}")
print(f"Model Agreement: {sum(1 for p in probabilities if p > 0.5)}/4 models")
```

### Explicit Model Loading
```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Pre-load models to avoid lazy loading during inference
detector.load_rf_model()
detector.load_cnn()
detector.load_knn()
detector.load_decision_tree()

# Now predictions will be faster (no loading overhead)
result = detector.random_forest(params)
```

## Troubleshooting

### Issue: "Model file not found"
**Problem**: Pre-trained model files are missing from the `models/` directory.

**Solution**:
```python
# Option 1: Train your own models
from exobengal import DetectExoplanet

detector = DetectExoplanet()
detector.train_random_forest(data_path="data/cumulative.csv")

# Option 2: Download pre-trained models from the repository
# Ensure models/ directory contains:
# - random_forest_classifier.pkl
# - decision_tree_classifier.pkl
# - cnn_model.h5
# - knn_model.pkl
# - scaler.pkl
# - imputer.pkl

# Option 3: Specify custom paths
detector = DetectExoplanet(
    rf_model_path="/path/to/your/model.pkl",
    scaler_path="/path/to/your/scaler.pkl",
    imputer_path="/path/to/your/imputer.pkl"
)
```

### Issue: TensorFlow warnings or errors
**Problem**: TensorFlow version compatibility or GPU-related warnings.

**Solution**:
```bash
# For CPU-only inference (recommended for most users)
pip install tensorflow-cpu

# For GPU support (requires CUDA)
pip install tensorflow-gpu

# Suppress TensorFlow warnings in code
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # 0=all, 1=info, 2=warning, 3=error

import tensorflow as tf
tf.get_logger().setLevel('ERROR')
```

### Issue: "ValueError: Input contains NaN"
**Problem**: Input data has missing values that aren't being handled properly.

**Solution**:
```python
from exobengal import ExoParams, DetectExoplanet

# Use None for missing values (will be imputed automatically)
params = ExoParams(
    period=100.0,
    prad=None,  # Missing - will be imputed
    teq=350.0,
    srad=None,  # Missing - will be imputed
    slog_g=4.5,
    steff=5500,
    impact=0.2,
    duration=4.0,
    depth=200.0
)

detector = DetectExoplanet()
result = detector.random_forest(params)  # Works correctly
```

### Issue: Memory errors during training
**Problem**: Large dataset causes out-of-memory errors.

**Solution**:
```python
from exobengal import DetectExoplanet
import pandas as pd

# Option 1: Use a subset of data
df = pd.read_csv("data/cumulative.csv", skiprows=1)
df_sample = df.sample(frac=0.5, random_state=42)  # Use 50% of data
df_sample.to_csv("data/cumulative_sample.csv", index=False)

detector = DetectExoplanet()
detector.train_random_forest(data_path="data/cumulative_sample.csv")

# Option 2: Reduce CNN batch size
detector.train_cnn(
    data_path="data/cumulative.csv",
    batch_size=16,  # Smaller batch size
    epochs=30
)
```

### Issue: Poor prediction accuracy
**Problem**: Model predictions don't match expectations.

**Solution**:
```python
# 1. Ensure you're using the correct feature order
# Order: [period, prad, teq, srad, slog_g, steff, impact, duration, depth]

# 2. Retrain with more data or different hyperparameters
detector = DetectExoplanet()
detector.train_random_forest(
    data_path="data/cumulative.csv",
    n_estimators=200,  # More trees
    max_depth=20       # Deeper trees
)

# 3. Try different models
rf_result = detector.random_forest(params)
cnn_result = detector.cnn(params)
knn_result = detector.knn(params)

# Compare results
print(f"RF: {rf_result['probability']:.2f}")
print(f"CNN: {cnn_result['probability']:.2f}")
print(f"kNN: {knn_result['probability']:.2f}")
```

### Issue: Slow inference
**Problem**: Predictions take too long.

**Solution**:
```python
from exobengal import DetectExoplanet

# Pre-load all models once
detector = DetectExoplanet()
detector.load_rf_model()  # Load once

# Now make multiple predictions quickly
for params in candidate_list:
    result = detector.random_forest(params)  # Fast
    print(result)

# For CNN, ensure TensorFlow is optimized
import tensorflow as tf
tf.config.threading.set_intra_op_parallelism_threads(4)
tf.config.threading.set_inter_op_parallelism_threads(4)
```

### Issue: Inconsistent results between training and inference
**Problem**: Model behaves differently after reloading.

**Solution**:
```python
# Ensure scaler and imputer are saved and loaded correctly
detector = DetectExoplanet()

# During training, artifacts are automatically saved
detector.train_random_forest(data_path="data/cumulative.csv")
# Saves: model, scaler, imputer

# During inference, load all artifacts
detector.load_rf_model()  # Loads: model, scaler, imputer

# Verify artifacts are loaded
assert detector.model is not None
assert detector.scaler is not None
assert detector.imputer is not None
```

## Dependencies

The exobengal library requires the following packages:

```
numpy          # Numerical computing
pandas         # Data manipulation
matplotlib     # Plotting (for training visualizations)
seaborn        # Statistical visualizations
scikit-learn   # Machine learning algorithms (RF, kNN, Decision Tree)
joblib         # Model serialization
tensorflow     # Deep learning (CNN)
```

Install all dependencies:
```bash
pip install numpy pandas matplotlib seaborn scikit-learn joblib tensorflow
```

Or use the requirements file from the repository root:
```bash
pip install -r requirements.txt
```

## Data Format

The library expects NASA Exoplanet Archive cumulative table format with the following columns:

**Required columns**:
- `koi_period`: Orbital period (days)
- `koi_prad`: Planet radius (Earth radii)
- `koi_teq`: Equilibrium temperature (Kelvin)
- `koi_srad`: Stellar radius (Solar radii)
- `koi_slogg`: Stellar surface gravity log10(cm/s²)
- `koi_steff`: Stellar effective temperature (Kelvin)
- `koi_impact`: Impact parameter
- `koi_duration`: Transit duration (hours)
- `koi_depth`: Transit depth (ppm)
- `koi_disposition`: Label ("CONFIRMED", "FALSE POSITIVE", "CANDIDATE")

**Calculated features**:
- `koi_insol`: Stellar insolation (calculated automatically during training)

Download data from: https://exoplanetarchive.ipac.caltech.edu/

## Links to Documentation

For more detailed information, see:

- **[Installation Guide](../docs/installation.md)** - Detailed installation instructions and environment setup
- **[API Reference](../docs/api.md)** - Complete API documentation
- **[Data Reference](../docs/data.md)** - NASA Exoplanet Archive data format and preprocessing
- **[Models Documentation](../docs/models.md)** - Model architectures, hyperparameters, and performance metrics
- **[Notebook Walkthrough](../docs/notebook.md)** - Interactive tutorials and examples
- **[Tutorial Notebooks](../tutorial/)** - Hands-on Jupyter notebooks for learning
- **[Root README](../README.md)** - Project overview and quick start

## Contributing

Contributions are welcome! If you find bugs or have feature requests, please open an issue on GitHub.

## License

This library is part of the ExoBengal project, licensed under the MIT License.

---

**Note**: This README focuses on the Python library API. For web interface documentation, see the main project README.
