# Python API Reference

## exobengal.ExoParams

Container for model input features.

Fields (all optional, None allowed):
- period (koi_period): days
- prad (koi_prad): Earth radii
- teq (koi_teq): Kelvin
- srad (koi_srad): Solar radii
- slog_g (koi_slogg): log10(cm/s^2)
- steff (koi_steff): Kelvin
- impact (koi_impact)
- duration (koi_duration): hours
- depth (koi_depth): ppm

Example:
```python
from exobengal.exobengal import ExoParams

p = ExoParams(period=365.0, prad=1.0, teq=288.0, srad=1.0,
              slog_g=4.44, steff=5778, impact=0.1, duration=5.0, depth=100)
```

## exobengal.DetectExoplanet

High-level interface to train and run classifiers (RF, CNN, kNN).

Constructor:
```python
DetectExoplanet(
  rf_model_path="models/random_forest_classifier.pkl",
  cnn_model_path="models/cnn_model.h5",
  knn_model_path="models/knn_model.pkl",
  scaler_path="models/scaler.pkl",
  imputer_path="models/imputer.pkl",
)
```

### Prediction schema
Each predictor returns:
```json
{
  "prediction": "Planet" | "Not a Planet",
  "probability": float,
  "ESI": float (optional when Planet)
}
```

### Methods

- train_random_forest(data_path): trains RF with GridSearchCV, saves best model, scaler, imputer. Prints report, confusion matrix, AUC.
- random_forest(input): run RF inference on list or ExoParams.
- train_cnn(data_path): trains small dense network on scaled features, saves model, scaler, imputer.
- cnn(input): run CNN inference on list or ExoParams.
- train_knn(data_path): trains kNN on scaled features, saves model, scaler, imputer.
- knn(input): run kNN inference on list or ExoParams.
- calculate_esi(koi_prad, koi_teq): convenience utility for ESI.

### Usage examples

List input:
```python
from exobengal.exobengal import DetectExoplanet

sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
d = DetectExoplanet()
print(d.random_forest(sample))
```

ExoParams input:
```python
from exobengal.exobengal import DetectExoplanet, ExoParams

params = ExoParams(period=365.0, prad=1.0, teq=288.0, srad=1.0,
                   slog_g=4.44, steff=5778, impact=0.1, duration=5.0, depth=100)
d = DetectExoplanet()
print(d.cnn(params))
```
