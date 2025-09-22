# Notebook Walkthrough

File: `test.ipynb`

The notebook demonstrates:
- Creating `ExoParams` and setting fields
- Initializing `DetectExoplanet`
- Training the CNN and kNN (optional)
- Running predictions with CNN and RandomForest

## Example cells

- Import and params setup:
```python
import exobengal as ex
params = ex.ExoParams()
params.depth = 0.01
params.period = 3.0
params.duration = 2.0 / 24.0
params.impact = 0.2
params.prad = 0.9
params.slog_g = 4.5
params.teq = 900
params.steff = 5500
```

- Train CNN (optional, CPU OK):
```python
detect = ex.DetectExoplanet()
detect.train_cnn()
```

- Predict:
```python
detect.cnn(params)
```

- Train RF and predict:
```python
new_detect = ex.DetectExoplanet()
new_detect.train_random_forest()
new_detect.random_forest(params)
```

## Expected output

- Training prints progress and metrics (accuracy, loss, AUC, confusion matrix).
- Predictions return a dict with `prediction`, `probability`, and `ESI` when applicable.

## Warnings

- TensorFlow may print notices about GPU drivers or oneDNN optimizations. These are informational if you are on CPU.
- Saving models as `.h5` may emit a warning recommending the `.keras` format; behavior is otherwise correct.
