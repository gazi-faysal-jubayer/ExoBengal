# ExoBengal Tutorial Notebooks

Welcome to the ExoBengal tutorial notebooks! These hands-on Jupyter notebooks are designed to teach you exoplanet detection using machine learning. Whether you're a beginner in machine learning or an experienced researcher, these tutorials will guide you through the complete pipeline from data loading through training to prediction.

These educational tools demonstrate the full workflow of exoplanet detection with ML, helping you understand ML workflows, compare different algorithms, and interpret results. The tutorials cover everything from installation through advanced topics, making them ideal for beginners learning exoplanet detection with machine learning.

## Available Notebooks

### test.ipynb - Local Development Notebook

**Purpose**: Comprehensive training and prediction workflow for local Python environments

**What you'll learn**:
- Setting up `ExoParams` with exoplanet parameters
- Training all four ML models (CNN, Random Forest, kNN, Decision Tree)
- Making predictions with trained models
- Comparing model performance and outputs
- Understanding evaluation metrics (classification reports, confusion matrices, AUC-ROC)

**Best for**: 
- Local development environments
- Users with Python already installed
- Those who want to experiment with model hyperparameters
- Researchers needing reproducible local workflows

**Key features**:
- Trains CNN with 50 epochs and early stopping
- Trains Random Forest with 100 estimators
- Trains kNN with 5 neighbors
- Trains Decision Tree with max depth of 10
- Demonstrates predictions for all models
- Shows ESI calculation for planet candidates

### pip_test.ipynb - Google Colab Notebook

**Purpose**: Cloud-based tutorial with pip installation and Google Drive integration

**What you'll learn**:
- Installing exobengal via pip in Colab
- Mounting Google Drive for data access
- Training models on cloud infrastructure
- Making predictions in a cloud environment
- Saving and loading models from Drive

**Best for**:
- Users without local Python setup
- Quick experimentation without installation
- Learning on any device with a browser
- Sharing notebooks with collaborators

**Key features**:
- Includes Google Colab badge for one-click opening
- Demonstrates Drive mounting for data access
- Full pip installation workflow
- Same training and prediction examples as `test.ipynb`
- Cloud-friendly file paths

**Open in Colab**: The notebook includes a Colab badge for direct access - just click to open in Google Colab!

## Prerequisites

### Python Version
- Python 3.8 or higher required
- Python 3.9 or 3.10 recommended for best compatibility

### Required Dependencies
```
numpy          # Numerical computing
pandas         # Data manipulation
matplotlib     # Plotting and visualizations
seaborn        # Statistical visualizations
scikit-learn   # ML algorithms (RF, kNN, Decision Tree)
joblib         # Model serialization
tensorflow     # Deep learning (CNN)
jupyter        # Notebook environment (for local use)
```

### Data Requirements
- NASA Exoplanet Archive cumulative table (`cumulative.csv`)
- Should be placed in `data/` directory relative to notebook location
- Download from: https://exoplanetarchive.ipac.caltech.edu/
- File size: ~5-10 MB
- Contains ~10,000 Kepler Object of Interest (KOI) records

### Hardware Requirements
- **Minimum**: 4GB RAM, dual-core CPU
- **Recommended**: 8GB RAM, quad-core CPU
- **GPU**: Optional for CNN training (speeds up training 5-10x)
- **Disk space**: ~500MB for models and data

### Environment Setup
For local development:
```bash
# Clone repository
git clone https://github.com/yourusername/ExoBengal.git
cd ExoBengal

# Install dependencies
pip install -r requirements.txt

# Install Jupyter
pip install jupyter jupyterlab

# Verify installation
python -c "import exobengal; print('ExoBengal ready!')"
```

For Google Colab:
- No setup required! Just open the notebook and run the pip install cell

## Step-by-Step Learning Path

### Phase 1: Getting Started (15-30 minutes)
**Goal**: Understand the basics and run your first prediction

**Steps**:
1. **Choose your environment**: Local (`test.ipynb`) or Colab (`pip_test.ipynb`)
2. **Open the notebook**: Launch Jupyter Lab/Notebook or open in Colab
3. **Run the import cell**: Import the exobengal library
4. **Examine ExoParams**: Understand the 9 exoplanet parameters
5. **Create sample parameters**: Use the provided Earth-like example
6. **Load a pre-trained model**: Initialize `DetectExoplanet`
7. **Make your first prediction**: Run a Random Forest prediction
8. **Interpret the output**: Understand prediction, probability, and ESI

**Expected outcome**: Successfully make a prediction and understand the output format

### Phase 2: Understanding the Data (30-45 minutes)
**Goal**: Learn about exoplanet parameters and their significance

**Steps**:
1. **Review the 9 input features**: Period, radius, temperature, stellar properties, transit characteristics
2. **Understand physical meanings**: What each parameter represents in astronomy
3. **Explore parameter ranges**: Typical values for different planet types (Earth-like, Hot Jupiters, Super-Earths)
4. **Experiment with values**: Modify `ExoParams` and observe prediction changes
5. **Learn about ESI**: Earth Similarity Index calculation and interpretation

**Key concepts**:
- **koi_period**: Orbital period (Earth = 365 days, Hot Jupiter = 1-10 days)
- **koi_prad**: Planet radius (Earth = 1.0, Jupiter = 11.2)
- **koi_teq**: Equilibrium temperature (Earth ≈ 288K, Venus ≈ 737K)
- **koi_srad**: Stellar radius (Sun = 1.0)
- **koi_slogg**: Stellar surface gravity (Sun ≈ 4.44)
- **koi_steff**: Stellar temperature (Sun = 5778K)
- **koi_impact**: Impact parameter (0 = center crossing, 1 = grazing)
- **koi_duration**: Transit duration in hours
- **koi_depth**: Transit depth in parts per million (ppm)

**Expected outcome**: Understand what each parameter means and how to set realistic values

### Phase 3: Training Your First Model (45-60 minutes)
**Goal**: Train a Random Forest classifier and understand the training process

**Steps**:
1. **Locate the training cell**: Find the Random Forest training section
2. **Understand the data path**: Ensure `cumulative.csv` is accessible
3. **Run the training cell**: Execute `train_random_forest()`
4. **Observe training output**: Watch the progress and metrics
5. **Analyze the classification report**: Precision, recall, F1-score for each class
6. **Examine the confusion matrix**: True positives, false positives, etc.
7. **Review AUC-ROC score**: Model's ability to distinguish classes
8. **Make predictions**: Use the newly trained model

**Training outputs explained**:
- **Classification Report**: Shows precision (accuracy of positive predictions), recall (coverage of actual positives), and F1-score (harmonic mean)
- **Confusion Matrix**: Visual heatmap showing prediction accuracy
- **AUC-ROC Score**: Area Under Curve (1.0 = perfect, 0.5 = random)

**Expected outcome**: Successfully train a Random Forest model and interpret evaluation metrics

### Phase 4: Exploring Different Algorithms (60-90 minutes)
**Goal**: Train and compare all four ML algorithms

**Steps**:
1. **Train CNN**: Run the CNN training cell (takes longest, 5-15 minutes)
2. **Train kNN**: Run the k-Nearest Neighbors training cell
3. **Train Decision Tree**: Run the Decision Tree training cell
4. **Compare training times**: Note which models train fastest
5. **Compare accuracy metrics**: Which model has highest AUC-ROC?
6. **Compare predictions**: Run same input through all models
7. **Analyze differences**: Why do models give different probabilities?
8. **Understand trade-offs**: Speed vs accuracy, interpretability vs performance

**Model comparison insights**:
- **Random Forest**: Usually best balance of accuracy and speed
- **CNN**: May achieve highest accuracy with enough data and tuning
- **kNN**: Simple and interpretable, but slower for large datasets
- **Decision Tree**: Most interpretable, but prone to overfitting

**Expected outcome**: Understand strengths and weaknesses of each algorithm

### Phase 5: Hyperparameter Tuning (90-120 minutes)
**Goal**: Experiment with model hyperparameters to improve performance

**Steps**:
1. **Modify Random Forest parameters**: Try different `n_estimators` (50, 100, 200) and `max_depth` (10, 20, None)
2. **Adjust CNN architecture**: Experiment with `hidden_layers` sizes and `dropout_rate`
3. **Tune kNN neighbors**: Test different `n_neighbors` values (3, 5, 10, 20)
4. **Optimize Decision Tree**: Adjust `max_depth` and `criterion` (gini vs entropy)
5. **Compare results**: Track how changes affect AUC-ROC and accuracy
6. **Find optimal settings**: Identify best hyperparameters for your use case

**Hyperparameter tips**:
- **Random Forest n_estimators**: More trees = better accuracy but slower training (diminishing returns after 200)
- **CNN hidden_layers**: Deeper networks can learn complex patterns but risk overfitting
- **kNN n_neighbors**: Lower k = more sensitive to noise, higher k = smoother boundaries
- **Decision Tree max_depth**: Deeper trees fit training data better but may overfit

**Expected outcome**: Improve model performance through systematic hyperparameter tuning

### Phase 6: Advanced Topics (120+ minutes)
**Goal**: Master advanced techniques and workflows

**Steps**:
1. **Batch predictions**: Process multiple candidates efficiently
2. **Model ensemble**: Combine predictions from multiple models
3. **Custom data**: Train on your own exoplanet datasets
4. **Feature importance**: Analyze which parameters matter most
5. **Cross-validation**: Implement k-fold validation for robust evaluation
6. **Model persistence**: Save and load models for production use
7. **API integration**: Connect notebooks to the exobengal-api

**Expected outcome**: Apply advanced ML techniques to exoplanet detection

## Detailed Notebook Explanations

### test.ipynb Walkthrough

**Cell 1: Imports**
```python
import exobengal as ex
```
- Imports the exobengal library with alias `ex`
- Enables access to `ExoParams` and `DetectExoplanet` classes
- May show TensorFlow warnings (safe to ignore)

**Cell 2: Parameter Setup**
```python
params = ex.ExoParams()
params.depth = 0.01
params.period = 3.0
# ... etc
```
- Creates an `ExoParams` object to hold exoplanet parameters
- Sets 9 parameters describing the planet and its host star
- This example represents a hot, small planet with short orbital period
- **Focus**: Understanding parameter meanings and realistic value ranges

**Cell 3: CNN Training**
```python
detect_1 = ex.DetectExoplanet()
detect_1.train_cnn(data_path="/content/drive/MyDrive/cumulative.csv")
```
- Initializes a `DetectExoplanet` object
- Trains a Convolutional Neural Network on NASA data
- Training takes 5-15 minutes depending on hardware
- Outputs epoch-by-epoch progress with loss and accuracy
- Implements early stopping to prevent overfitting
- Saves model to `models/cnn_model.h5`
- **Focus**: Understanding deep learning training process and convergence

**Cell 4: CNN Prediction**
```python
detect_1.cnn(params)
```
- Makes a prediction using the trained CNN
- Returns dict with `prediction`, `probability`, and `ESI`
- Probability > 0.6 classified as "Planet"
- **Focus**: Interpreting model outputs and confidence levels

**Cell 5: Random Forest Training**
```python
detect_2 = ex.DetectExoplanet()
detect_2.train_random_forest(
    data_path="/content/drive/MyDrive/cumulative.csv",
    n_estimators=100,
    max_depth=10
)
```
- Creates a new detector instance
- Trains Random Forest with 100 trees and max depth of 10
- Faster training than CNN (typically 30-60 seconds)
- Displays classification report and confusion matrix
- Shows AUC-ROC curve visualization
- **Focus**: Understanding ensemble methods and their advantages

**Cell 6: Random Forest Prediction**
```python
detect_2.random_forest(params)
```
- Predicts using Random Forest classifier
- Threshold of 0.5 for binary classification
- Often provides different probability than CNN
- **Focus**: Comparing predictions across different algorithms

**Cell 7: kNN Training**
```python
detect_3 = ex.DetectExoplanet()
detect_3.train_knn(
    data_path="/content/drive/MyDrive/cumulative.csv",
    n_neighbors=5
)
```
- Trains k-Nearest Neighbors with k=5
- No explicit training phase (lazy learning)
- Fast "training" (just stores data)
- **Focus**: Understanding instance-based learning

**Cell 8: kNN Prediction**
```python
detect_3.knn(params)
```
- Finds 5 nearest neighbors in feature space
- Predicts based on majority vote
- Threshold of 0.6 for classification
- **Focus**: Understanding similarity-based classification

**Cell 9: Decision Tree Training**
```python
detect_4 = ex.DetectExoplanet()
detect_4.train_decision_tree(
    data_path="/content/drive/MyDrive/cumulative.csv",
    max_depth=10,
    criterion="gini"
)
```
- Trains a single decision tree
- Max depth limits tree complexity
- Gini criterion measures split quality
- Very fast training
- **Focus**: Understanding rule-based classification

**Cell 10: Decision Tree Prediction**
```python
detect_4.decision_tree(params)
```
- Follows decision rules to classify
- Most interpretable model
- Threshold of 0.6 for classification
- **Focus**: Understanding transparent decision-making

### pip_test.ipynb Walkthrough

Highlight differences from `test.ipynb`:

**Additional Cell: Colab Badge**
- Markdown cell with "Open in Colab" badge
- Provides one-click access to notebook
- Automatically sets up Colab environment

**Additional Cell: Drive Mounting**
```python
from google.colab import drive
drive.mount('/content/drive')
```
- Mounts Google Drive to access data files
- Prompts for Google account authorization
- Makes Drive files accessible at `/content/drive/MyDrive/`
- **Focus**: Understanding cloud storage integration

**Additional Cell: Pip Installation**
```python
!pip install exobengal
```
- Installs exobengal package from PyPI
- Downloads all dependencies automatically
- Takes 1-2 minutes
- **Focus**: Understanding package installation in cloud environments

**Modified Data Paths**
- All data paths use `/content/drive/MyDrive/cumulative.csv`
- Assumes data file is in root of Google Drive
- Can be adjusted to any Drive location

**Otherwise identical to test.ipynb** in terms of training and prediction workflows

## Running Notebooks Locally

### Installation
```bash
# Navigate to ExoBengal directory
cd ExoBengal

# Install dependencies
pip install -r requirements.txt

# Install Jupyter (if not already installed)
pip install jupyter jupyterlab
```

### Launching Jupyter

**Option 1: Jupyter Notebook (Classic Interface)**
```bash
cd tutorial
jupyter notebook
```
- Opens browser at http://localhost:8888
- Click on `test.ipynb` to open
- Classic interface, familiar to most users

**Option 2: Jupyter Lab (Modern Interface)**
```bash
cd tutorial
jupyter lab
```
- Opens browser at http://localhost:8888/lab
- Modern interface with file browser and multiple tabs
- Recommended for advanced users

**Option 3: VS Code**
- Open `test.ipynb` in VS Code
- Requires Jupyter extension
- Integrated debugging and IntelliSense
- Best for development workflows

### Running Cells

**Keyboard shortcuts**:
- `Shift + Enter`: Run current cell and move to next
- `Ctrl + Enter`: Run current cell and stay
- `Alt + Enter`: Run current cell and insert new cell below
- `A`: Insert cell above (in command mode)
- `B`: Insert cell below (in command mode)
- `DD`: Delete cell (in command mode)

**Best practices**:
1. **Run cells in order**: Notebooks are sequential, don't skip cells
2. **Wait for completion**: Training cells take time, don't interrupt
3. **Check outputs**: Verify each cell produces expected output
4. **Save frequently**: Use `Ctrl + S` or File > Save
5. **Restart kernel if needed**: Kernel > Restart & Clear Output

### Data Setup

Ensure data file is in the correct location:
```bash
ExoBengal/
├── data/
│   └── cumulative.csv  # NASA Exoplanet Archive data
├── tutorial/
│   ├── test.ipynb
│   └── pip_test.ipynb
└── ...
```

If data is elsewhere, update the `data_path` parameter in training cells:
```python
detect.train_random_forest(data_path="/path/to/your/cumulative.csv")
```

### Troubleshooting Local Setup

**Issue: "No module named 'exobengal'"**
```bash
# Solution: Install in development mode
cd ExoBengal
pip install -e .
```

**Issue: "Jupyter command not found"**
```bash
# Solution: Install Jupyter
pip install jupyter
```

**Issue: Kernel crashes during CNN training**
```bash
# Solution: Reduce batch size or use CPU-only TensorFlow
pip uninstall tensorflow
pip install tensorflow-cpu
```

## Running on Google Colab

### Opening the Notebook

**Method 1: Direct Link**
- Click the "Open in Colab" badge in `pip_test.ipynb`
- Automatically opens in Google Colab
- No local setup required

**Method 2: Upload to Colab**
1. Go to https://colab.research.google.com/
2. Click "Upload" tab
3. Select `pip_test.ipynb` from your computer
4. Notebook opens in Colab environment

**Method 3: From GitHub**
1. Go to https://colab.research.google.com/
2. Click "GitHub" tab
3. Enter repository URL
4. Select `tutorial/pip_test.ipynb`

### Setting Up Google Drive

**Step 1: Upload Data**
1. Go to https://drive.google.com/
2. Upload `cumulative.csv` to your Drive (root or any folder)
3. Note the file path

**Step 2: Mount Drive in Colab**
- Run the Drive mounting cell in the notebook
- Click the authorization link
- Sign in to your Google account
- Copy the authorization code
- Paste into Colab prompt
- Drive is now accessible at `/content/drive/MyDrive/`

**Step 3: Verify Data Access**
```python
import os
print(os.listdir('/content/drive/MyDrive/'))
# Should show your files including cumulative.csv
```

### Installing ExoBengal

- Run the pip install cell: `!pip install exobengal`
- Installation takes 1-2 minutes
- All dependencies installed automatically
- Restart runtime if prompted (Runtime > Restart runtime)

### Colab-Specific Tips

**Runtime management**:
- Free tier: 12-hour session limit
- Sessions disconnect after 90 minutes of inactivity
- Save models to Drive to persist across sessions
- Use `Runtime > Change runtime type` to enable GPU (faster CNN training)

**GPU acceleration**:
1. Click `Runtime > Change runtime type`
2. Select `GPU` from Hardware accelerator dropdown
3. Click `Save`
4. Runtime restarts with GPU enabled
5. CNN training will be 5-10x faster

**Saving outputs**:
```python
# Save trained model to Drive
import shutil
shutil.copy('models/random_forest_classifier.pkl', 
            '/content/drive/MyDrive/models/random_forest_classifier.pkl')
```

**Downloading results**:
```python
from google.colab import files
files.download('models/cnn_model.h5')
```

### Colab Limitations

- **Session timeout**: Save work frequently to Drive
- **Memory limits**: 12-16GB RAM (may need to reduce batch sizes)
- **Storage limits**: ~100GB temporary storage
- **GPU availability**: Not always guaranteed on free tier
- **Network speed**: Slower than local for large datasets

## Expected Outputs and Interpretation

### Training Outputs

**CNN Training Output**:
```
Epoch 1/50
250/250 [==============================] - 5s 20ms/step - loss: 0.4523 - accuracy: 0.7856 - val_loss: 0.3234 - val_accuracy: 0.8567
Epoch 2/50
250/250 [==============================] - 4s 18ms/step - loss: 0.2987 - accuracy: 0.8734 - val_loss: 0.2876 - val_accuracy: 0.8823
...
Epoch 25/50
250/250 [==============================] - 4s 18ms/step - loss: 0.1234 - accuracy: 0.9523 - val_loss: 0.1987 - val_accuracy: 0.9234
Early stopping triggered. Best model saved.
```

**Interpretation**:
- **loss**: Lower is better (measures prediction error)
- **accuracy**: Higher is better (% of correct predictions)
- **val_loss/val_accuracy**: Performance on validation set (unseen data)
- **Early stopping**: Training stops when validation loss stops improving
- **Best model**: Model with lowest validation loss is saved

**Random Forest Training Output**:
```
Classification Report:
                precision    recall  f1-score   support

   Not Planet       0.92      0.95      0.93      1500
       Planet       0.88      0.82      0.85       800

     accuracy                           0.90      2300
    macro avg       0.90      0.89      0.89      2300
 weighted avg       0.90      0.90      0.90      2300

AUC-ROC Score: 0.9456
```

**Interpretation**:
- **precision**: Of predicted planets, 88% are actually planets
- **recall**: Of actual planets, 82% are correctly identified
- **f1-score**: Harmonic mean of precision and recall
- **support**: Number of samples in each class
- **AUC-ROC**: 0.9456 indicates excellent discrimination ability (1.0 = perfect)

**Confusion Matrix**:
```
[[1425   75]
 [ 144  656]]
```

**Interpretation**:
- **Top-left (1425)**: True Negatives - correctly identified non-planets
- **Top-right (75)**: False Positives - non-planets incorrectly classified as planets
- **Bottom-left (144)**: False Negatives - planets incorrectly classified as non-planets
- **Bottom-right (656)**: True Positives - correctly identified planets

### Prediction Outputs

**Example 1: Planet Detection**
```python
{
    'prediction': 'Planet',
    'probability': 0.8734,
    'ESI': 0.6543
}
```

**Interpretation**:
- **prediction**: Model classifies this as a planet
- **probability**: 87.34% confidence (high confidence)
- **ESI**: Earth Similarity Index of 0.65 (moderately Earth-like)

**ESI Scale**:
- **0.8 - 1.0**: Very Earth-like (potentially habitable)
- **0.6 - 0.8**: Moderately Earth-like
- **0.4 - 0.6**: Somewhat Earth-like
- **0.0 - 0.4**: Very different from Earth

**Example 2: Non-Planet Detection**
```python
{
    'prediction': 'Not a Planet',
    'probability': 0.2341
}
```

**Interpretation**:
- **prediction**: Model classifies this as not a planet (false positive)
- **probability**: 23.41% confidence in planet class (below threshold)
- **ESI**: Not calculated for non-planets

**Example 3: Uncertain Prediction**
```python
{
    'prediction': 'Planet',
    'probability': 0.6123,
    'ESI': 0.4521
}
```

**Interpretation**:
- **prediction**: Barely above threshold (0.6 for CNN/kNN/DT, 0.5 for RF)
- **probability**: Low confidence - consider running multiple models
- **ESI**: Relatively low - not very Earth-like
- **Recommendation**: Verify with additional observations or models

### Comparing Model Outputs

**Example: Same input, different models**
```python
Random Forest: {'prediction': 'Planet', 'probability': 0.8234, 'ESI': 0.7123}
CNN:          {'prediction': 'Planet', 'probability': 0.7456, 'ESI': 0.7123}
kNN:          {'prediction': 'Planet', 'probability': 0.6789, 'ESI': 0.7123}
Decision Tree: {'prediction': 'Not a Planet', 'probability': 0.5234}
```

**Interpretation**:
- **Agreement**: 3 out of 4 models predict "Planet" - high confidence
- **Probability variation**: Normal - different algorithms have different decision boundaries
- **ESI consistency**: Same for all planet predictions (calculated from input parameters)
- **Decision Tree disagreement**: Single tree may overfit or underfit - ensemble methods (RF) more reliable
- **Recommendation**: Trust the majority vote, especially when probabilities are high

### Understanding Warnings

**TensorFlow GPU Warnings**:
```
Could not load dynamic library 'cudart64_110.dll'
```
- **Meaning**: TensorFlow can't find GPU libraries
- **Impact**: Training uses CPU (slower but functional)
- **Action**: Ignore if you don't have a GPU, or install CUDA toolkit for GPU support

**Model Saving Warnings**:
```
WARNING:tensorflow:Compiled the loaded model, but the compiled metrics have yet to be built.
```
- **Meaning**: TensorFlow recommends .keras format over .h5
- **Impact**: None - model saves and loads correctly
- **Action**: Ignore or update code to use .keras format

**Imputation Warnings**:
```
Missing values detected in input. Imputing with mean values.
```
- **Meaning**: Some input parameters are None or NaN
- **Impact**: Missing values filled with training data means
- **Action**: Normal behavior - imputation is automatic

## Troubleshooting Common Issues

### Data File Not Found

**Error**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'data/cumulative.csv'
```

**Solutions**:
1. **Check file location**: Ensure `cumulative.csv` is in `data/` directory
2. **Update path**: Modify `data_path` parameter to correct location
3. **Download data**: Get cumulative table from NASA Exoplanet Archive
4. **Use absolute path**: Provide full path instead of relative

```python
# Example with absolute path
detect.train_random_forest(data_path="/full/path/to/cumulative.csv")
```

### TensorFlow Installation Issues

**Error**:
```
ModuleNotFoundError: No module named 'tensorflow'
```

**Solutions**:
```bash
# Install TensorFlow CPU version (recommended for most users)
pip install tensorflow-cpu

# Or install full TensorFlow (includes GPU support)
pip install tensorflow

# For Apple Silicon Macs
pip install tensorflow-macos tensorflow-metal
```

**Error**:
```
IllegalInstructionError: TensorFlow requires AVX instructions
```

**Solution**: Your CPU doesn't support required instructions. Use an older TensorFlow version:
```bash
pip install tensorflow==2.5.0
```

### Memory Errors

**Error**:
```
MemoryError: Unable to allocate array
```

**Solutions**:
1. **Reduce batch size** in CNN training:
```python
detect.train_cnn(data_path="data/cumulative.csv", batch_size=16)
```

2. **Use subset of data**:
```python
import pandas as pd
df = pd.read_csv("data/cumulative.csv", skiprows=1)
df_sample = df.sample(frac=0.5, random_state=42)
df_sample.to_csv("data/cumulative_sample.csv", index=False)
```

3. **Close other applications** to free up RAM

4. **Restart Jupyter kernel**: Kernel > Restart

### Slow Training

**Issue**: CNN training takes too long

**Solutions**:
1. **Enable GPU** (if available):
   - Colab: Runtime > Change runtime type > GPU
   - Local: Install tensorflow-gpu and CUDA toolkit

2. **Reduce epochs**:
```python
detect.train_cnn(data_path="data/cumulative.csv", epochs=20)
```

3. **Increase batch size** (if memory allows):
```python
detect.train_cnn(data_path="data/cumulative.csv", batch_size=64)
```

4. **Use pre-trained models** instead of training from scratch

### Inconsistent Predictions

**Issue**: Same input gives different predictions across runs

**Causes**:
1. **Different models**: Each algorithm has different decision boundaries
2. **Random initialization**: Neural networks have random starting weights
3. **Data shuffling**: Training data order affects learning

**Solutions**:
1. **Set random seeds** for reproducibility:
```python
import numpy as np
import tensorflow as tf
import random

np.random.seed(42)
tf.random.set_seed(42)
random.seed(42)
```

2. **Use ensemble predictions**: Average probabilities from multiple models

3. **Retrain with more data**: Larger datasets lead to more stable models

### Import Errors

**Error**:
```
ImportError: cannot import name 'ExoParams' from 'exobengal'
```

**Solutions**:
1. **Reinstall package**:
```bash
pip uninstall exobengal
pip install exobengal
```

2. **Install in development mode** (if using local code):
```bash
cd ExoBengal
pip install -e .
```

3. **Restart Jupyter kernel**: Kernel > Restart & Run All

### Colab-Specific Issues

**Issue**: Session disconnected

**Solutions**:
- Save models to Drive regularly
- Use `Runtime > Manage sessions` to monitor active sessions
- Keep browser tab active (Colab disconnects inactive sessions)
- Use Colab Pro for longer sessions

**Issue**: Drive mounting fails

**Solutions**:
- Clear browser cookies and cache
- Try incognito/private browsing mode
- Ensure Google account has Drive access
- Manually authorize at https://accounts.google.com/

## Next Steps and Further Learning

### After Completing Tutorials

Once you've mastered the notebooks, explore:

1. **API Documentation** - Deep dive into class methods and parameters
   - See: `../docs/api.md` for complete API reference
   - See: `../exobengal/README.md` for library-specific documentation

2. **Model Documentation** - Understand architectures and performance
   - See: `../docs/models.md` for model details and benchmarks
   - See: `../models/README.md` for artifact documentation

3. **Data Documentation** - Learn about NASA Exoplanet Archive format
   - See: `../docs/data.md` for data schema and preprocessing

4. **Advanced Examples** - Explore complex workflows
   - See: `../docs/notebook.md` for additional examples

### Project Ideas

Apply your knowledge to real projects:

1. **Exoplanet Candidate Screening**
   - Download latest NASA data
   - Run predictions on unconfirmed candidates
   - Identify high-probability planets for follow-up

2. **Habitability Analysis**
   - Filter predictions by ESI > 0.8
   - Analyze characteristics of Earth-like planets
   - Visualize habitable zone distributions

3. **Model Comparison Study**
   - Train all models with different hyperparameters
   - Compare accuracy, speed, and interpretability
   - Write a report on findings

4. **Custom Dataset Training**
   - Collect data from other exoplanet surveys (TESS, K2)
   - Preprocess to match ExoBengal format
   - Train models and compare performance

5. **Web Application**
   - Build a Flask/FastAPI interface
   - Allow users to input parameters and get predictions
   - Visualize results with interactive charts

6. **Ensemble Predictor**
   - Combine predictions from all four models
   - Implement voting or weighted averaging
   - Evaluate ensemble performance vs individual models

### Additional Resources

**ExoBengal Documentation**:
- [Installation Guide](../docs/installation.md) - Detailed setup instructions
- [API Reference](../docs/api.md) - Complete class and method documentation
- [Data Reference](../docs/data.md) - NASA data format and preprocessing
- [Models Documentation](../docs/models.md) - Architecture and performance details
- [Root README](../README.md) - Project overview and quick start

**External Resources**:
- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) - Official data source
- [Kepler Mission](https://www.nasa.gov/mission_pages/kepler/main/index.html) - Mission background
- [Scikit-learn Documentation](https://scikit-learn.org/) - ML algorithms reference
- [TensorFlow Tutorials](https://www.tensorflow.org/tutorials) - Deep learning guides
- [Exoplanet Detection Methods](https://exoplanets.nasa.gov/alien-worlds/ways-to-find-a-planet/) - Astronomy background

**Community**:
- GitHub Issues - Report bugs and request features
- Discussions - Ask questions and share projects
- Contributing - Submit improvements and new features

### Contributing to ExoBengal

Help improve the project:

1. **Report Issues**: Found a bug? Open an issue on GitHub
2. **Suggest Features**: Have an idea? Start a discussion
3. **Improve Documentation**: Fix typos or add examples
4. **Add Notebooks**: Create new tutorials for specific use cases
5. **Optimize Models**: Experiment with architectures and share results
6. **Write Tests**: Improve code reliability

See the main [README](../README.md) for contribution guidelines.

## Frequently Asked Questions

**Q: How long does training take?**
A: Depends on hardware and model:
- Random Forest: 30-60 seconds (CPU)
- Decision Tree: 10-20 seconds (CPU)
- kNN: 5-10 seconds (CPU, no actual training)
- CNN: 5-15 minutes (CPU), 1-3 minutes (GPU)

**Q: Can I use my own data?**
A: Yes! Format your data to match NASA Exoplanet Archive schema with the 9 required features. See `../docs/data.md` for details.

**Q: Which model is most accurate?**
A: Random Forest typically provides the best balance of accuracy and speed. CNN may achieve higher accuracy with proper tuning and sufficient data.

**Q: What does ESI mean?**
A: Earth Similarity Index measures how similar a planet is to Earth based on radius and temperature. ESI = 1.0 means identical to Earth. ESI > 0.8 suggests potentially habitable conditions.

**Q: Why do models give different predictions?**
A: Each algorithm learns different patterns and has different decision boundaries. This is normal and expected. Use ensemble methods or trust the model with highest confidence.

**Q: Can I run this without GPU?**
A: Yes! All models work on CPU. CNN training is slower on CPU but still functional. Consider using Google Colab's free GPU for faster training.

**Q: How do I save my trained models?**
A: Models are automatically saved to the `models/` directory during training. You can copy them to other locations or load them in new sessions.

**Q: What if I get TensorFlow warnings?**
A: Most TensorFlow warnings are informational and can be safely ignored. They typically relate to GPU availability or optimization features.

**Q: How accurate are the predictions?**
A: Models achieve 85-95% accuracy on test data, depending on the algorithm and hyperparameters. See `../docs/models.md` for detailed performance metrics.

**Q: Can I use this for research?**
A: Yes! ExoBengal is open-source (MIT License) and suitable for academic research. Please cite the project if you use it in publications.

---

**Ready to start learning?** Open `test.ipynb` (local) or `pip_test.ipynb` (Colab) and begin your exoplanet detection journey!

For questions or issues, please open an issue on GitHub or consult the documentation links above.
