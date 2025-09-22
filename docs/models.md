# Models and Artifacts

Location: `models/`

- random_forest_classifier.pkl — trained `RandomForestClassifier`
- cnn_model.h5 — Keras dense model
- knn_model.pkl — trained `KNeighborsClassifier`
- scaler.pkl — `StandardScaler` used for all tabular models
- imputer.pkl — `SimpleImputer` used for all tabular models

## Loading in code

```python
from exobengal.exobengal import DetectExoplanet

model = DetectExoplanet()
# Prediction will auto-load the saved artifacts if not already in memory
print(model.random_forest([365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]))
```

## Retraining

Each `train_*` method writes its own artifact(s) to `models/` and overwrites existing files:

- `train_random_forest`: writes `random_forest_classifier.pkl`, `scaler.pkl`, `imputer.pkl`
- `train_cnn`: writes `cnn_model.h5`, `scaler.pkl`, `imputer.pkl`
- `train_knn`: writes `knn_model.pkl`, `scaler.pkl`, `imputer.pkl`

To keep previous versions, move or rename the files before retraining.

## Notes

- Saved Keras format is `.h5`. Modern Keras also supports `.keras` format; you can modify the code to switch if desired.
- Models are trained on scaled numeric features only (no images or light curves at this time).
