# Data Reference and Preprocessing

Location: `data/cumulative_2025.09.20_12.15.37.csv`

This is a NASA Exoplanet Archive cumulative table export. The library uses the following columns:

- koi_period (days)
- koi_prad (Earth radii)
- koi_teq (K)
- koi_srad (Solar radii)
- koi_slogg (log10 cm/s^2)
- koi_steff (K)
- koi_impact
- koi_duration (hours)
- koi_depth (ppm)
- koi_disposition (label source; mapped to 1 for CONFIRMED/CANDIDATE, 0 for FALSE POSITIVE)

Derived feature:
- koi_insol = ((koi_steff / 5778)^4) * (koi_srad^2) / (koi_period^(4/3))

## Preprocessing pipeline

- Impute numeric features with `SimpleImputer(strategy='mean')` → saved to `models/imputer.pkl`
- Scale features with `StandardScaler()` → saved to `models/scaler.pkl`
- Train/validation split: `train_test_split(test_size=0.2, random_state=42, stratify=y)` where applicable

## Labels

`koi_disposition` is mapped as:
- CONFIRMED → 1
- CANDIDATE → 1
- FALSE POSITIVE → 0

Rows with missing `label` after mapping are dropped before training.

## Updating the dataset

Replace the CSV in `data/` with a newer cumulative export and adjust paths when calling `train_*` methods:

```python
from exobengal.exobengal import DetectExoplanet

model = DetectExoplanet()
model.train_random_forest(data_path="data/your_new_file.csv")
```
