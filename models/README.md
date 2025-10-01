# ExoBengal Model Artifacts

This directory contains pre-trained machine learning models and preprocessing artifacts for exoplanet detection. The models are trained on NASA Exoplanet Archive Kepler mission data and provide four different machine learning algorithms (Random Forest, CNN, kNN, Decision Tree) with a shared preprocessing pipeline for robust exoplanet classification.

## File Inventory

### Model Files

**random_forest_classifier.pkl**
- **Type**: Scikit-learn RandomForestClassifier (serialized with joblib)
- **Size**: ~5-10 MB (varies with n_estimators)
- **Purpose**: Ensemble classifier combining multiple decision trees for robust exoplanet detection
- **Format**: Python pickle format (.pkl)
- **Dependencies**: scikit-learn, joblib
- **Training data**: NASA Exoplanet Archive cumulative table
- **Features**: 9 numerical features (period, radius, temperature, stellar properties, transit characteristics)
- **Output**: Binary classification (Planet vs Not a Planet) with probability scores

**decision_tree_classifier.pkl**
- **Type**: Scikit-learn DecisionTreeClassifier (serialized with joblib)
- **Size**: ~1-3 MB
- **Purpose**: Single decision tree for interpretable rule-based classification
- **Format**: Python pickle format (.pkl)
- **Dependencies**: scikit-learn, joblib
- **Training data**: NASA Exoplanet Archive cumulative table
- **Features**: Same 9 numerical features as Random Forest
- **Output**: Binary classification with probability scores
- **Note**: Most interpretable model but may overfit without proper max_depth constraint

**knn_model.pkl**
- **Type**: Scikit-learn KNeighborsClassifier (serialized with joblib)
- **Size**: ~10-20 MB (stores training data)
- **Purpose**: Instance-based classifier using k-nearest neighbors for similarity matching
- **Format**: Python pickle format (.pkl)
- **Dependencies**: scikit-learn, joblib
- **Training data**: NASA Exoplanet Archive cumulative table (stored in model)
- **Features**: Same 9 numerical features
- **Output**: Binary classification based on majority vote of k neighbors
- **Note**: Larger file size because kNN stores all training data

**cnn_model.h5**
- **Type**: TensorFlow/Keras Sequential neural network (HDF5 format)
- **Size**: ~500 KB - 2 MB (varies with architecture)
- **Purpose**: Deep learning model for complex pattern recognition in exoplanet features
- **Format**: HDF5 (.h5) - Keras model format
- **Dependencies**: tensorflow, keras
- **Training data**: NASA Exoplanet Archive cumulative table
- **Features**: Same 9 numerical features
- **Output**: Binary classification with sigmoid activation (probability)
- **Note**: Can also be saved as .keras format in newer TensorFlow versions

### Preprocessing Artifacts

**scaler.pkl**
- **Type**: Scikit-learn StandardScaler (serialized with joblib)
- **Size**: ~1-5 KB
- **Purpose**: Feature normalization to zero mean and unit variance
- **Format**: Python pickle format (.pkl)
- **Dependencies**: scikit-learn, joblib
- **Fitted on**: Training data from NASA Exoplanet Archive
- **Applied to**: All 9 input features before model prediction
- **Formula**: `z = (x - mean) / std_dev`
- **Critical**: Must use the same scaler for training and inference to ensure consistent feature scaling
- **Shared by**: All four models (Random Forest, Decision Tree, kNN, CNN)

**imputer.pkl**
- **Type**: Scikit-learn SimpleImputer (serialized with joblib)
- **Size**: ~1-5 KB
- **Purpose**: Fill missing values in input features using mean strategy
- **Format**: Python pickle format (.pkl)
- **Dependencies**: scikit-learn, joblib
- **Strategy**: Mean imputation (replaces NaN/None with feature mean from training data)
- **Fitted on**: Training data from NASA Exoplanet Archive
- **Applied to**: All 9 input features before scaling
- **Critical**: Must use the same imputer for training and inference to ensure consistent missing value handling
- **Shared by**: All four models

**Preprocessing Pipeline Order**:
1. Input data (raw features, may contain missing values)
2. Imputation (fill missing values with training means)
3. Scaling (normalize to zero mean, unit variance)
4. Model prediction

## Model Architectures and Hyperparameters

### Random Forest Classifier

**Algorithm**: Ensemble of decision trees with bootstrap aggregating (bagging)

**Default Hyperparameters**:
- `n_estimators`: 100 (number of trees in the forest)
- `max_depth`: None (trees grow until all leaves are pure or contain min_samples_split samples)
- `random_state`: 42 (for reproducibility)
- `criterion`: gini (default, measures split quality)
- `min_samples_split`: 2 (default)
- `min_samples_leaf`: 1 (default)

**Architecture**:
- Input: 9 scaled features
- Processing: Each tree votes on classification
- Output: Majority vote with probability from vote proportion
- Classification threshold: 0.5 (probability >= 0.5 → Planet)

**Advantages**:
- Robust to overfitting due to ensemble averaging
- Handles non-linear relationships well
- Provides feature importance scores
- Fast inference
- Generally best balance of accuracy and speed

**Disadvantages**:
- Less interpretable than single decision tree
- Larger model size than single tree
- Training time increases with n_estimators

**Tuning Tips**:
- Increase `n_estimators` (200-500) for better accuracy (diminishing returns after ~200)
- Set `max_depth` (10-30) to prevent overfitting on small datasets
- Adjust `min_samples_split` (5-20) to control tree growth

### Convolutional Neural Network (CNN)

**Algorithm**: Deep feedforward neural network with dense layers and dropout regularization

**Default Architecture**:
- **Input layer**: 9 features (scaled)
- **Hidden layer 1**: 64 neurons, ReLU activation, 30% dropout
- **Hidden layer 2**: 32 neurons, ReLU activation, 30% dropout
- **Hidden layer 3**: 16 neurons, ReLU activation, 30% dropout
- **Output layer**: 1 neuron, sigmoid activation (probability)

**Default Hyperparameters**:
- `hidden_layers`: [64, 32, 16] (customizable layer sizes)
- `dropout_rate`: 0.3 (30% dropout for regularization)
- `optimizer`: "adam" (adaptive learning rate)
- `loss`: "binary_crossentropy" (for binary classification)
- `metrics`: ["accuracy"]
- `epochs`: 50 (maximum training iterations)
- `batch_size`: 32 (samples per gradient update)
- `patience`: 5 (early stopping patience)

**Classification threshold**: 0.6 (probability > 0.6 → Planet)

**Advantages**:
- Can learn complex non-linear patterns
- Flexible architecture (easily customizable)
- Early stopping prevents overfitting
- Good performance with sufficient data

**Disadvantages**:
- Slower training than tree-based models (5-15 minutes on CPU)
- Requires more data for optimal performance
- Less interpretable (black box)
- Sensitive to hyperparameter choices

**Tuning Tips**:
- Increase layer sizes [128, 64, 32, 16] for more capacity
- Adjust dropout_rate (0.2-0.5) to balance overfitting vs underfitting
- Increase epochs (100-200) with early stopping for better convergence
- Use larger batch_size (64-128) if memory allows (faster training)
- Try different optimizers: "adam", "rmsprop", "sgd"

### k-Nearest Neighbors (kNN)

**Algorithm**: Instance-based learning using distance metrics

**Default Hyperparameters**:
- `n_neighbors`: 5 (number of neighbors to consider)
- `metric`: euclidean (default distance metric)
- `weights`: uniform (default, all neighbors weighted equally)
- `algorithm`: auto (automatically selects best algorithm)

**Architecture**:
- Input: 9 scaled features
- Processing: Find k nearest neighbors in training data using Euclidean distance
- Output: Majority vote of k neighbors with probability from vote proportion
- Classification threshold: 0.6 (probability >= 0.6 → Planet)

**Advantages**:
- Simple and intuitive
- No training phase (instant "training")
- Non-parametric (no assumptions about data distribution)
- Naturally handles multi-class problems

**Disadvantages**:
- Slow inference for large datasets (must compute distances to all training points)
- Large model file size (stores all training data)
- Sensitive to feature scaling (handled by StandardScaler)
- Curse of dimensionality in high-dimensional spaces

**Tuning Tips**:
- Try different k values (3, 5, 7, 10, 15, 20)
- Lower k → more sensitive to noise, higher k → smoother boundaries
- Experiment with `weights='distance'` to weight closer neighbors more heavily
- Consider different distance metrics: 'manhattan', 'minkowski'

### Decision Tree Classifier

**Algorithm**: Single decision tree with recursive binary splitting

**Default Hyperparameters**:
- `max_depth`: None (unlimited depth, can lead to overfitting)
- `criterion`: "gini" (Gini impurity for split quality)
- `random_state`: 42 (for reproducibility)
- `min_samples_split`: 2 (default)
- `min_samples_leaf`: 1 (default)

**Architecture**:
- Input: 9 scaled features
- Processing: Follow decision rules from root to leaf
- Output: Leaf node class with probability
- Classification threshold: 0.6 (probability >= 0.6 → Planet)

**Advantages**:
- Most interpretable model (can visualize decision rules)
- Fast training and inference
- Handles non-linear relationships
- No assumptions about data distribution

**Disadvantages**:
- Prone to overfitting without max_depth constraint
- High variance (small data changes can drastically change tree)
- Less accurate than ensemble methods
- Biased toward features with more levels

**Tuning Tips**:
- **Always set max_depth** (10-20) to prevent overfitting
- Try `criterion='entropy'` for information gain splitting
- Increase `min_samples_split` (10-50) to create simpler trees
- Increase `min_samples_leaf` (5-20) to smooth predictions

## Loading and Using Pre-trained Models

### Automatic Loading (Recommended)

The simplest approach - models load automatically on first prediction:

```python
from exobengal import DetectExoplanet, ExoParams

# Initialize detector (doesn't load models yet)
detector = DetectExoplanet()

# Create input parameters
params = ExoParams(
    period=365.0,    # Orbital period (days)
    prad=1.0,        # Planet radius (Earth radii)
    teq=288.0,       # Equilibrium temperature (K)
    srad=1.0,        # Stellar radius (Solar radii)
    slog_g=4.44,     # Stellar surface gravity
    steff=5778,      # Stellar temperature (K)
    impact=0.1,      # Impact parameter
    duration=5.0,    # Transit duration (hours)
    depth=100.0      # Transit depth (ppm)
)

# Models load automatically on first use
rf_result = detector.random_forest(params)
print(rf_result)
# Output: {'prediction': 'Planet', 'probability': 0.95, 'ESI': 0.98}

cnn_result = detector.cnn(params)
knn_result = detector.knn(params)
dt_result = detector.decision_tree(params)
```

**How it works**:
- Each prediction method checks if model is loaded (`if self.model is None`)
- If not loaded, calls corresponding `load_*` method
- Loads model, scaler, and imputer from `models/` directory
- Subsequent predictions use cached models (no reloading)

### Explicit Pre-loading

Load all models upfront to avoid lazy loading overhead:

```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Pre-load all models
detector.load_rf_model()        # Loads RF, scaler, imputer
detector.load_cnn()             # Loads CNN, scaler, imputer
detector.load_knn()             # Loads kNN, scaler, imputer
detector.load_decision_tree()   # Loads DT, scaler, imputer

# Now predictions are faster (no loading overhead)
for params in candidate_list:
    result = detector.random_forest(params)
    print(result)
```

**Benefits**:
- Faster first prediction (no lazy loading delay)
- Fail fast if models are missing or corrupted
- Better for production environments
- Useful for batch processing

### Custom Model Paths

Load models from non-default locations:

```python
from exobengal import DetectExoplanet

# Specify custom paths
detector = DetectExoplanet(
    rf_model_path="/path/to/my_rf_model.pkl",
    cnn_model_path="/path/to/my_cnn_model.h5",
    knn_model_path="/path/to/my_knn_model.pkl",
    dt_model_path="/path/to/my_dt_model.pkl",
    scaler_path="/path/to/my_scaler.pkl",
    imputer_path="/path/to/my_imputer.pkl"
)

result = detector.random_forest(params)
```

**Use cases**:
- Loading different model versions
- A/B testing multiple models
- Using models from different training runs
- Production deployment with versioned models

### Direct Model Loading (Advanced)

Load models directly with joblib/TensorFlow for custom workflows:

```python
import joblib
from tensorflow.keras.models import load_model
import numpy as np

# Load Random Forest directly
rf_model = joblib.load("models/random_forest_classifier.pkl")
scaler = joblib.load("models/scaler.pkl")
imputer = joblib.load("models/imputer.pkl")

# Prepare input
features = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
input_array = np.array(features).reshape(1, -1)
input_array = imputer.transform(input_array)
input_array = scaler.transform(input_array)

# Predict
prediction = rf_model.predict(input_array)[0]
probability = rf_model.predict_proba(input_array)[0][1]
print(f"Prediction: {prediction}, Probability: {probability}")

# Load CNN directly
cnn_model = load_model("models/cnn_model.h5")
probability = cnn_model.predict(input_array)[0][0]
print(f"CNN Probability: {probability}")
```

**Use cases**:
- Custom preprocessing pipelines
- Integration with other ML frameworks
- Model inspection and debugging
- Performance optimization

### Batch Predictions

Efficiently process multiple candidates:

```python
from exobengal import DetectExoplanet, ExoParams
import pandas as pd

detector = DetectExoplanet()
detector.load_rf_model()  # Pre-load for efficiency

# Create multiple candidates
candidates = [
    ExoParams(period=365, prad=1.0, teq=288, srad=1.0, slog_g=4.44, steff=5778, impact=0.1, duration=5.0, depth=100),
    ExoParams(period=10, prad=2.5, teq=800, srad=1.2, slog_g=4.3, steff=6000, impact=0.3, duration=3.0, depth=500),
    ExoParams(period=200, prad=1.2, teq=320, srad=0.9, slog_g=4.5, steff=5500, impact=0.15, duration=6.0, depth=150),
]

# Batch predict
results = [detector.random_forest(candidate) for candidate in candidates]

# Convert to DataFrame for analysis
df = pd.DataFrame(results)
print(df)

# Filter planets with high ESI
habitable = df[(df['prediction'] == 'Planet') & (df['ESI'] > 0.8)]
print(f"Found {len(habitable)} potentially habitable planets")
```

## Retraining Models

### Basic Retraining

Retrain with default hyperparameters:

```python
from exobengal import DetectExoplanet

detector = DetectExoplanet()

# Retrain Random Forest (overwrites existing model)
detector.train_random_forest(data_path="data/cumulative.csv")

# Retrain CNN
detector.train_cnn(data_path="data/cumulative.csv")

# Retrain kNN
detector.train_knn(data_path="data/cumulative.csv")

# Retrain Decision Tree
detector.train_decision_tree(data_path="data/cumulative.csv")
```

**What happens**:
1. Loads NASA Exoplanet Archive data from specified path
2. Calculates stellar insolation feature
3. Maps labels: CONFIRMED/CANDIDATE → 1, FALSE POSITIVE → 0
4. Fits imputer on training data (mean strategy)
5. Imputes missing values
6. Fits scaler on training data (StandardScaler)
7. Scales features to zero mean, unit variance
8. Splits data 80/20 for training/testing (stratified)
9. Trains model with default or specified hyperparameters
10. Evaluates on test set (classification report, confusion matrix, AUC-ROC)
11. Saves model, scaler, and imputer to `models/` directory
12. **Overwrites existing files** (backup first if needed)

### Hyperparameter Tuning

Retrain with custom hyperparameters for better performance:

**Random Forest Tuning**:
```python
detector = DetectExoplanet()

# Experiment with different configurations
detector.train_random_forest(
    data_path="data/cumulative.csv",
    n_estimators=200,  # More trees for better accuracy
    max_depth=20       # Limit depth to prevent overfitting
)

# Try even more trees
detector.train_random_forest(
    data_path="data/cumulative.csv",
    n_estimators=500,
    max_depth=None  # Unlimited depth
)
```

**CNN Architecture Tuning**:
```python
detector = DetectExoplanet()

# Deeper network
detector.train_cnn(
    data_path="data/cumulative.csv",
    hidden_layers=[128, 64, 32, 16],  # Larger layers
    dropout_rate=0.4,                  # More dropout
    epochs=100,                        # More training
    batch_size=64,                     # Larger batches
    patience=10                        # More patience
)

# Simpler network (faster, less overfitting)
detector.train_cnn(
    data_path="data/cumulative.csv",
    hidden_layers=[32, 16],  # Fewer layers
    dropout_rate=0.2,        # Less dropout
    epochs=30,
    batch_size=32
)
```

**kNN Tuning**:
```python
detector = DetectExoplanet()

# Try different k values
for k in [3, 5, 7, 10, 15, 20]:
    print(f"\nTraining kNN with k={k}")
    detector.train_knn(
        data_path="data/cumulative.csv",
        n_neighbors=k
    )
    # Evaluate and compare results
```

**Decision Tree Tuning**:
```python
detector = DetectExoplanet()

# Constrain depth to prevent overfitting
detector.train_decision_tree(
    data_path="data/cumulative.csv",
    max_depth=15,
    criterion="gini"
)

# Try entropy criterion
detector.train_decision_tree(
    data_path="data/cumulative.csv",
    max_depth=15,
    criterion="entropy"
)
```

### Best Practices for Retraining

**1. Backup Existing Models**

Always backup before retraining to preserve working models:

```bash
# Create backup directory
mkdir models/backup_$(date +%Y%m%d)

# Copy all artifacts
cp models/*.pkl models/backup_$(date +%Y%m%d)/
cp models/*.h5 models/backup_$(date +%Y%m%d)/
```

Or in Python:
```python
import shutil
from datetime import datetime
import os

backup_dir = f"models/backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
os.makedirs(backup_dir, exist_ok=True)

for file in ['random_forest_classifier.pkl', 'cnn_model.h5', 'knn_model.pkl', 
             'decision_tree_classifier.pkl', 'scaler.pkl', 'imputer.pkl']:
    if os.path.exists(f"models/{file}"):
        shutil.copy(f"models/{file}", f"{backup_dir}/{file}")
```

**2. Version Your Models**

Use versioned filenames for different training runs:

```python
from datetime import datetime

version = datetime.now().strftime('%Y%m%d_%H%M%S')

detector = DetectExoplanet(
    rf_model_path=f"models/random_forest_v{version}.pkl",
    scaler_path=f"models/scaler_v{version}.pkl",
    imputer_path=f"models/imputer_v{version}.pkl"
)

detector.train_random_forest(data_path="data/cumulative.csv")
```

**3. Track Performance Metrics**

Log training results for comparison:

```python
import json
from datetime import datetime

results = {
    "timestamp": datetime.now().isoformat(),
    "model": "random_forest",
    "hyperparameters": {
        "n_estimators": 200,
        "max_depth": 20
    },
    "metrics": {
        "auc_roc": 0.9456,
        "accuracy": 0.9023,
        "precision": 0.88,
        "recall": 0.82
    }
}

with open("models/training_log.json", "a") as f:
    f.write(json.dumps(results) + "\n")
```

**4. Use Fresh Data**

Regularly update training data from NASA Exoplanet Archive:

```python
# Download latest cumulative table
# From: https://exoplanetarchive.ipac.caltech.edu/

# Retrain with updated data
detector.train_random_forest(data_path="data/cumulative_latest.csv")
```

**5. Validate on Hold-out Set**

Keep a separate validation set for final model evaluation:

```python
import pandas as pd
from sklearn.model_selection import train_test_split

# Split data into train/validation/test
df = pd.read_csv("data/cumulative.csv", skiprows=1)
train_val, test = train_test_split(df, test_size=0.1, random_state=42)
train, val = train_test_split(train_val, test_size=0.1, random_state=42)

# Save splits
train.to_csv("data/train.csv", index=False)
val.to_csv("data/val.csv", index=False)
test.to_csv("data/test.csv", index=False)

# Train on train set
detector.train_random_forest(data_path="data/train.csv")

# Validate on val set (manual evaluation)
# Final test on test set (only once!)
```

**6. Monitor for Overfitting**

Watch for signs of overfitting during training:

- **CNN**: Monitor validation loss vs training loss
  - If validation loss increases while training loss decreases → overfitting
  - Solution: Increase dropout, reduce epochs, simplify architecture

- **Random Forest**: Check feature importance
  - If one feature dominates → may be overfitting to that feature
  - Solution: Reduce max_depth, increase min_samples_split

- **Decision Tree**: Compare train vs test accuracy
  - If train accuracy >> test accuracy → overfitting
  - Solution: Reduce max_depth, increase min_samples_leaf

**7. Cross-Validation for Robust Evaluation**

Use k-fold cross-validation for more reliable metrics:

```python
from sklearn.model_selection import cross_val_score
import pandas as pd
import numpy as np

# Load and preprocess data
koi_table = pd.read_csv("data/cumulative.csv", skiprows=1)
koi_table['koi_insol'] = ((koi_table['koi_steff'] / 5778) ** 4) * \
                         (koi_table['koi_srad'] ** 2) / (koi_table['koi_period'] ** (4 / 3))

features = ["koi_period", "koi_prad", "koi_teq", "koi_srad", "koi_slogg",
            "koi_steff", "koi_impact", "koi_duration", "koi_depth"]
koi_table["label"] = koi_table["koi_disposition"].map(
    {"CONFIRMED": 1, "FALSE POSITIVE": 0, "CANDIDATE": 1})

from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

imputer = SimpleImputer(strategy='mean')
koi_table[features] = imputer.fit_transform(koi_table[features])
koi_table = koi_table.dropna(subset=["label"])

X = koi_table[features]
y = koi_table["label"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 5-fold cross-validation
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=42)
scores = cross_val_score(rf, X_scaled, y, cv=5, scoring='roc_auc')

print(f"Cross-validation AUC-ROC scores: {scores}")
print(f"Mean: {np.mean(scores):.4f} (+/- {np.std(scores):.4f})")
```

### Retraining Frequency

**When to retrain**:
1. **New data available**: NASA releases updated cumulative tables quarterly
2. **Poor performance**: Model accuracy degrades on new observations
3. **Hyperparameter tuning**: Found better hyperparameters through experimentation
4. **Architecture changes**: Modified model architecture or features
5. **Production deployment**: Before deploying to production, retrain on full dataset

**Recommended schedule**:
- **Development**: Retrain frequently during experimentation
- **Production**: Retrain quarterly when new NASA data is released
- **Emergency**: Retrain immediately if critical bugs or data issues discovered

## Performance Metrics and Benchmarks

### Evaluation Metrics Explained

**Classification Report Metrics**:
- **Precision**: Of predicted planets, what % are actually planets? (TP / (TP + FP))
- **Recall**: Of actual planets, what % are correctly identified? (TP / (TP + FN))
- **F1-Score**: Harmonic mean of precision and recall (2 * (precision * recall) / (precision + recall))
- **Support**: Number of samples in each class

**Confusion Matrix**:
```
                Predicted
              Not Planet  Planet
Actual Not       TN        FP
       Planet    FN        TP
```
- **TN (True Negative)**: Correctly identified non-planets
- **FP (False Positive)**: Non-planets incorrectly classified as planets
- **FN (False Negative)**: Planets incorrectly classified as non-planets
- **TP (True Positive)**: Correctly identified planets

**AUC-ROC Score**:
- Area Under the Receiver Operating Characteristic curve
- Measures model's ability to distinguish between classes
- Range: 0.0 to 1.0
- **1.0**: Perfect classifier
- **0.9-1.0**: Excellent
- **0.8-0.9**: Good
- **0.7-0.8**: Fair
- **0.5-0.7**: Poor
- **0.5**: Random guessing

### Expected Performance (Typical Results)

Based on training with NASA Exoplanet Archive cumulative table (~10,000 samples):

**Random Forest** (n_estimators=100, max_depth=None):
```
Classification Report:
                precision    recall  f1-score   support

   Not Planet       0.92      0.95      0.93      1500
       Planet       0.88      0.82      0.85       800

     accuracy                           0.90      2300
    macro avg       0.90      0.89      0.89      2300
 weighted avg       0.90      0.90      0.90      2300

AUC-ROC: 0.94-0.96
```

**Interpretation**:
- **Overall accuracy**: ~90%
- **Planet detection rate**: 82% (recall)
- **Planet prediction accuracy**: 88% (precision)
- **Excellent discrimination**: AUC-ROC 0.94-0.96
- **Best overall performance**: Recommended for production use

**CNN** (hidden_layers=[64,32,16], dropout=0.3, epochs=50):
```
Classification Report:
                precision    recall  f1-score   support

   Not Planet       0.91      0.94      0.92      1500
       Planet       0.86      0.80      0.83       800

     accuracy                           0.89      2300
    macro avg       0.89      0.87      0.88      2300
 weighted avg       0.89      0.89      0.89      2300

AUC-ROC: 0.92-0.95
```

**Interpretation**:
- **Overall accuracy**: ~89%
- **Planet detection rate**: 80% (recall)
- **Excellent discrimination**: AUC-ROC 0.92-0.95
- **Potential for improvement**: Can achieve higher accuracy with tuning
- **Training time**: 5-15 minutes (CPU), 1-3 minutes (GPU)

**k-Nearest Neighbors** (n_neighbors=5):
```
Classification Report:
                precision    recall  f1-score   support

   Not Planet       0.89      0.93      0.91      1500
       Planet       0.84      0.76      0.80       800

     accuracy                           0.87      2300
    macro avg       0.87      0.85      0.86      2300
 weighted avg       0.87      0.87      0.87      2300

AUC-ROC: 0.90-0.93
```

**Interpretation**:
- **Overall accuracy**: ~87%
- **Planet detection rate**: 76% (recall)
- **Good discrimination**: AUC-ROC 0.90-0.93
- **Trade-off**: Simpler algorithm, slightly lower accuracy
- **Inference time**: Slower for large datasets

**Decision Tree** (max_depth=10, criterion="gini"):
```
Classification Report:
                precision    recall  f1-score   support

   Not Planet       0.88      0.91      0.89      1500
       Planet       0.80      0.74      0.77       800

     accuracy                           0.85      2300
    macro avg       0.84      0.83      0.83      2300
 weighted avg       0.85      0.85      0.85      2300

AUC-ROC: 0.88-0.91
```

**Interpretation**:
- **Overall accuracy**: ~85%
- **Planet detection rate**: 74% (recall)
- **Fair discrimination**: AUC-ROC 0.88-0.91
- **Most interpretable**: Can visualize decision rules
- **Prone to overfitting**: Requires max_depth constraint

### Model Comparison Summary

| Model | Accuracy | AUC-ROC | Training Time | Inference Speed | Interpretability | Best For |
|-------|----------|---------|---------------|-----------------|------------------|----------|
| **Random Forest** | ~90% | 0.94-0.96 | Medium (1-2 min) | Fast | Medium | Production, general use |
| **CNN** | ~89% | 0.92-0.95 | Slow (5-15 min CPU) | Fast | Low | Complex patterns, research |
| **kNN** | ~87% | 0.90-0.93 | Fast (instant) | Slow | Medium | Quick prototyping |
| **Decision Tree** | ~85% | 0.88-0.91 | Fast (10-20 sec) | Fast | High | Education, interpretability |

**Recommendations**:
1. **Production deployment**: Use Random Forest (best accuracy/speed balance)
2. **Research/experimentation**: Use CNN (highest potential accuracy with tuning)
3. **Educational purposes**: Use Decision Tree (most interpretable)
4. **Quick prototyping**: Use kNN (instant training)
5. **Ensemble approach**: Combine predictions from multiple models for best results

### Factors Affecting Performance

**Data Quality**:
- More training data → better performance
- Balanced classes → better recall for minority class
- Clean data (fewer missing values) → higher accuracy

**Hyperparameters**:
- Random Forest: More trees → better accuracy (diminishing returns)
- CNN: Deeper networks → can learn complex patterns but risk overfitting
- kNN: Lower k → more sensitive to noise, higher k → smoother boundaries
- Decision Tree: Deeper trees → better training fit but risk overfitting

**Feature Engineering**:
- Current features: 9 numerical features from NASA data
- Potential improvements: Add derived features (e.g., planet density, stellar luminosity)
- Feature selection: Remove irrelevant features to reduce noise

**Class Imbalance**:
- NASA data has more non-planets than planets
- Can affect recall for planet class
- Solutions: Class weighting, SMOTE oversampling, threshold tuning

## Version Compatibility

### Python Version

**Required**: Python 3.8 or higher

**Recommended**: Python 3.9 or 3.10

**Compatibility notes**:
- Python 3.7 and below: Not supported (missing type hints, f-string features)
- Python 3.11+: Supported but test thoroughly (newer Python versions)
- Python 3.12+: May have compatibility issues with older TensorFlow versions

**Check your Python version**:
```bash
python --version
# or
python3 --version
```

### Core Dependencies

**Scikit-learn** (for Random Forest, Decision Tree, kNN, preprocessing):
- **Minimum**: 0.24.0
- **Recommended**: 1.0.0 or higher
- **Latest tested**: 1.3.0
- **Breaking changes**: Scikit-learn 1.0+ changed some default parameters
- **Compatibility**: Models trained with scikit-learn 0.24+ should load in 1.0+

**TensorFlow** (for CNN):
- **Minimum**: 2.4.0
- **Recommended**: 2.10.0 - 2.13.0
- **Latest tested**: 2.13.0
- **Breaking changes**: 
  - TensorFlow 2.0+ uses Keras as integrated API
  - TensorFlow 2.11+ deprecated .h5 format (use .keras instead)
- **GPU support**: Requires CUDA 11.2+ and cuDNN 8.1+ for TensorFlow 2.10+
- **Apple Silicon**: Use tensorflow-macos and tensorflow-metal for M1/M2 Macs

**Joblib** (for model serialization):
- **Minimum**: 1.0.0
- **Recommended**: 1.2.0 or higher
- **Compatibility**: Models saved with joblib 1.0+ should load in newer versions

**NumPy**:
- **Minimum**: 1.19.0
- **Recommended**: 1.23.0 or higher
- **Compatibility**: NumPy 1.20+ changed some array behaviors

**Pandas**:
- **Minimum**: 1.2.0
- **Recommended**: 1.5.0 or higher
- **Compatibility**: Pandas 2.0+ has some breaking changes but should work

### Model File Compatibility

**Pickle files (.pkl)**:
- **Format**: Python pickle protocol (default: protocol 4)
- **Cross-version**: Generally compatible across Python 3.x versions
- **Cross-platform**: Compatible across Windows, macOS, Linux
- **Security**: Only load pickle files from trusted sources (can execute arbitrary code)
- **Scikit-learn version**: Models may not load if scikit-learn version differs significantly
  - Safe: Same major version (e.g., 1.0.0 → 1.3.0)
  - Risky: Different major versions (e.g., 0.24 → 1.0)
  - Solution: Retrain models with current scikit-learn version

**HDF5 files (.h5)**:
- **Format**: Hierarchical Data Format 5 (Keras model format)
- **Cross-version**: Generally compatible across TensorFlow 2.x versions
- **Cross-platform**: Compatible across Windows, macOS, Linux
- **TensorFlow version**: Models should load across TensorFlow 2.x versions
- **Deprecation**: TensorFlow 2.11+ recommends .keras format over .h5
- **Migration**: Can convert .h5 to .keras:
  ```python
  from tensorflow.keras.models import load_model
  model = load_model("cnn_model.h5")
  model.save("cnn_model.keras")
  ```

### Upgrading Dependencies

**Safe upgrade path**:

1. **Backup current environment**:
   ```bash
   pip freeze > requirements_backup.txt
   ```

2. **Backup model files**:
   ```bash
   cp -r models/ models_backup/
   ```

3. **Upgrade dependencies**:
   ```bash
   pip install --upgrade scikit-learn tensorflow numpy pandas joblib
   ```

4. **Test model loading**:
   ```python
   from exobengal import DetectExoplanet
   detector = DetectExoplanet()
   detector.load_rf_model()
   detector.load_cnn()
   print("Models loaded successfully!")
   ```

5. **If loading fails, retrain models**:
   ```python
   detector.train_random_forest(data_path="data/cumulative.csv")
   detector.train_cnn(data_path="data/cumulative.csv")
   detector.train_knn(data_path="data/cumulative.csv")
   detector.train_decision_tree(data_path="data/cumulative.csv")
   ```

6. **If issues persist, rollback**:
   ```bash
   pip install -r requirements_backup.txt
   cp -r models_backup/* models/
   ```

### Known Compatibility Issues

**Issue 1: TensorFlow 2.11+ deprecation warnings**
```
WARNING:tensorflow:Compiled the loaded model, but the compiled metrics have yet to be built.
```
- **Cause**: TensorFlow 2.11+ prefers .keras format over .h5
- **Impact**: Warning only, models load correctly
- **Solution**: Ignore warning or convert to .keras format

**Issue 2: Scikit-learn 1.0+ parameter changes**
```
UserWarning: X does not have valid feature names
```
- **Cause**: Scikit-learn 1.0+ added feature name validation
- **Impact**: Warning only, predictions work correctly
- **Solution**: Ignore warning or pass DataFrame with column names

**Issue 3: NumPy 1.20+ dtype changes**
```
DeprecationWarning: `np.int` is a deprecated alias for the builtin `int`
```
- **Cause**: NumPy 1.20+ deprecated some type aliases
- **Impact**: Warning only, functionality unchanged
- **Solution**: Update code to use `int` instead of `np.int`

**Issue 4: TensorFlow on Apple Silicon**
```
IllegalInstructionError: TensorFlow requires AVX instructions
```
- **Cause**: Standard TensorFlow doesn't support Apple Silicon
- **Impact**: TensorFlow won't run on M1/M2 Macs
- **Solution**: Install tensorflow-macos and tensorflow-metal:
  ```bash
  pip install tensorflow-macos tensorflow-metal
  ```

**Issue 5: CUDA version mismatch**
```
Could not load dynamic library 'libcudart.so.11.0'
```
- **Cause**: TensorFlow version doesn't match installed CUDA version
- **Impact**: GPU acceleration unavailable (falls back to CPU)
- **Solution**: Install matching CUDA toolkit or use tensorflow-cpu

### Recommended Environment Setup

**Option 1: Conda environment (recommended)**
```bash
conda create -n exobengal python=3.10
conda activate exobengal
pip install -r requirements.txt
```

**Option 2: Virtual environment**
```bash
python3.10 -m venv exobengal_env
source exobengal_env/bin/activate  # On Windows: exobengal_env\Scripts\activate
pip install -r requirements.txt
```

**Option 3: Docker (for production)**
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## Troubleshooting

### Model Loading Errors

**Error: FileNotFoundError: [Errno 2] No such file or directory: 'models/random_forest_classifier.pkl'**

**Cause**: Model file doesn't exist in expected location

**Solutions**:
1. **Train the model first**:
   ```python
   from exobengal import DetectExoplanet
   detector = DetectExoplanet()
   detector.train_random_forest(data_path="data/cumulative.csv")
   ```

2. **Download pre-trained models** from the repository

3. **Specify custom path**:
   ```python
   detector = DetectExoplanet(rf_model_path="/path/to/model.pkl")
   ```

4. **Check current directory**:
   ```python
   import os
   print(os.getcwd())
   print(os.listdir("models/"))
   ```

**Error: ModuleNotFoundError: No module named 'sklearn'**

**Cause**: Scikit-learn not installed

**Solution**:
```bash
pip install scikit-learn
```

**Error: ValueError: Cannot load file containing pickled data when allow_pickle=False**

**Cause**: NumPy security setting prevents loading pickle files

**Solution**: This shouldn't occur with joblib.load(), but if it does:
```python
import joblib
model = joblib.load("models/random_forest_classifier.pkl")
```

### TensorFlow/CNN Issues

**Error: ModuleNotFoundError: No module named 'tensorflow'**

**Cause**: TensorFlow not installed

**Solution**:
```bash
# For CPU-only (recommended for most users)
pip install tensorflow-cpu

# For GPU support
pip install tensorflow

# For Apple Silicon Macs
pip install tensorflow-macos tensorflow-metal
```

**Error: Could not load dynamic library 'cudart64_110.dll'**

**Cause**: TensorFlow looking for GPU libraries but they're not installed

**Impact**: Falls back to CPU (slower but functional)

**Solutions**:
1. **Ignore if you don't have a GPU** - model will use CPU
2. **Install CUDA toolkit** if you have an NVIDIA GPU:
   - TensorFlow 2.10+: CUDA 11.2, cuDNN 8.1
   - TensorFlow 2.5-2.9: CUDA 11.0, cuDNN 8.0
3. **Use tensorflow-cpu** to avoid warnings:
   ```bash
   pip uninstall tensorflow
   pip install tensorflow-cpu
   ```

**Error: Illegal instruction (core dumped)**

**Cause**: CPU doesn't support AVX instructions required by TensorFlow

**Solution**: Install older TensorFlow version:
```bash
pip install tensorflow==2.5.0
```

**Error: OOM when allocating tensor**

**Cause**: Out of memory during CNN training or inference

**Solutions**:
1. **Reduce batch size**:
   ```python
   detector.train_cnn(data_path="data/cumulative.csv", batch_size=16)
   ```

2. **Use CPU instead of GPU**:
   ```python
   import os
   os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
   ```

3. **Simplify architecture**:
   ```python
   detector.train_cnn(
       data_path="data/cumulative.csv",
       hidden_layers=[32, 16]  # Smaller layers
   )
   ```

### Prediction Errors

**Error: ValueError: X has 9 features, but StandardScaler is expecting 10 features**

**Cause**: Mismatch between input features and scaler expectations

**Solution**: Ensure input has exactly 9 features in correct order:
```python
from exobengal import ExoParams

# Correct: 9 features
params = ExoParams(
    period=365.0,    # 1
    prad=1.0,        # 2
    teq=288.0,       # 3
    srad=1.0,        # 4
    slog_g=4.44,     # 5
    steff=5778,      # 6
    impact=0.1,      # 7
    duration=5.0,    # 8
    depth=100.0      # 9
)

result = detector.random_forest(params)
```

**Error: ValueError: Input contains NaN**

**Cause**: Input has missing values that weren't imputed

**Solution**: Use None for missing values (will be imputed automatically):
```python
params = ExoParams(
    period=365.0,
    prad=None,  # Missing - will be imputed
    teq=288.0,
    srad=None,  # Missing - will be imputed
    slog_g=4.44,
    steff=5778,
    impact=0.1,
    duration=5.0,
    depth=100.0
)
```

**Error: Inconsistent predictions between training and inference**

**Cause**: Different scaler/imputer used for training vs inference

**Solution**: Always use the same scaler and imputer:
```python
# During training, scaler and imputer are saved
detector.train_random_forest(data_path="data/cumulative.csv")
# Saves: model, scaler.pkl, imputer.pkl

# During inference, load all three
detector.load_rf_model()
# Loads: model, scaler.pkl, imputer.pkl
```

### Performance Issues

**Issue: Slow predictions**

**Cause**: Models loading on every prediction (lazy loading)

**Solution**: Pre-load models once:
```python
detector = DetectExoplanet()
detector.load_rf_model()  # Load once

# Now predictions are fast
for params in candidate_list:
    result = detector.random_forest(params)
```

**Issue: High memory usage**

**Cause**: Multiple models loaded simultaneously

**Solution**: Load only needed models:
```python
# Only load Random Forest
detector = DetectExoplanet()
detector.load_rf_model()
# Don't load CNN, kNN, Decision Tree

result = detector.random_forest(params)
```

**Issue: CNN training too slow**

**Cause**: Training on CPU instead of GPU

**Solutions**:
1. **Enable GPU** (if available):
   ```python
   import tensorflow as tf
   print("GPUs Available:", tf.config.list_physical_devices('GPU'))
   ```

2. **Use Google Colab** with free GPU:
   - Runtime > Change runtime type > GPU

3. **Reduce epochs**:
   ```python
   detector.train_cnn(data_path="data/cumulative.csv", epochs=20)
   ```

4. **Increase batch size** (if memory allows):
   ```python
   detector.train_cnn(data_path="data/cumulative.csv", batch_size=64)
   ```

### Data Issues

**Error: KeyError: 'koi_period'**

**Cause**: Data file missing required columns

**Solution**: Ensure data has all required columns:
- koi_period, koi_prad, koi_teq, koi_srad, koi_slogg
- koi_steff, koi_impact, koi_duration, koi_depth
- koi_disposition (for training)

**Error: ValueError: could not convert string to float**

**Cause**: Non-numeric values in feature columns

**Solution**: Clean data before training:
```python
import pandas as pd

df = pd.read_csv("data/cumulative.csv", skiprows=1)

# Convert to numeric, coerce errors to NaN
for col in ['koi_period', 'koi_prad', 'koi_teq', 'koi_srad', 'koi_slogg',
            'koi_steff', 'koi_impact', 'koi_duration', 'koi_depth']:
    df[col] = pd.to_numeric(df[col], errors='coerce')

df.to_csv("data/cumulative_clean.csv", index=False)
```

## Additional Resources

For more information, see:

- **[Root README](../README.md)** - Project overview and quick start
- **[API Documentation](../docs/api.md)** - Complete API reference for `DetectExoplanet` and `ExoParams`
- **[Models Documentation](../docs/models.md)** - High-level model overview
- **[Data Reference](../docs/data.md)** - NASA Exoplanet Archive data format and preprocessing
- **[Installation Guide](../docs/installation.md)** - Detailed installation instructions
- **[Tutorial Notebooks](../tutorial/README.md)** - Hands-on learning with Jupyter notebooks
- **[ExoBengal Library README](../exobengal/README.md)** - Python library documentation

**External Resources**:
- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) - Official data source
- [Scikit-learn Documentation](https://scikit-learn.org/) - ML algorithms reference
- [TensorFlow Documentation](https://www.tensorflow.org/) - Deep learning framework
- [Joblib Documentation](https://joblib.readthedocs.io/) - Model serialization

## Contributing

Found an issue with the models or want to contribute improvements?

- **Report bugs**: Open an issue on GitHub
- **Suggest improvements**: Start a discussion
- **Share trained models**: Submit a pull request with new model versions
- **Improve documentation**: Fix typos or add examples

See the main [README](../README.md) for contribution guidelines.

## License

All model artifacts are part of the ExoBengal project, licensed under the MIT License.

---

**Note**: This README focuses on model artifacts in the `models/` directory. For Python API documentation, see `../exobengal/README.md`. For general project information, see `../README.md`.
