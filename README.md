# ExoBengal – NASA Exoplanet ML Toolkit and Web Demo

ExoBengal is a Python package and website for exploring NASA exoplanet data and running
ML-based classification of exoplanet candidates. It includes:

- A Python library `exobengal` with a `DetectExoplanet` class that can train and run
  RandomForest, CNN, and kNN models
- Pretrained models under `models/`
- A Next.js static website (in `website/`) with documentation, examples, and visualizations

## Quick Start

Install the package from PyPI (or your local environment):

```bash
pip install exobengal
```

Make a prediction with the bundled RandomForest model:

```python
from exobengal.exobengal import DetectExoplanet

detector = DetectExoplanet()
sample = [365.0, 1.0, 288.0, 1.0, 4.44, 5778, 0.1, 5.0, 100.0]
print(detector.random_forest(sample))
```

## Project Structure

```
exobengal/           # Python package
  exobengal.py      # DetectExoplanet class and helpers
models/              # Trained models (.pkl, .h5, scaler)
data/                # Dataset CSVs
website/             # Next.js static website + docs
```

## DetectExoplanet API (Python)

Constructor:

```python
DetectExoplanet(
  rf_model_path="models/random_forest_classifier.pkl",
  cnn_model_path="models/cnn_model.h5",
  knn_model_path="models/knn_model.pkl",
  scaler_path="models/scaler.pkl",
)
```

Training:

```python
detector.train_random_forest(data_path="data/cumulative_2025.09.20_12.15.37.csv")
detector.train_cnn(data_path="data/cumulative_2025.09.20_12.15.37.csv")
detector.train_knn(data_path="data/cumulative_2025.09.20_12.15.37.csv")
```

Inference (all return the same schema):

```python
sample = [koi_period, koi_prad, koi_teq, koi_srad, koi_slogg, koi_steff, koi_impact, koi_duration, koi_depth]
detector.random_forest(sample)
detector.cnn(sample)
detector.knn(sample)
```

Utility:

```python
detector.calculate_esi(koi_prad=1.05, koi_teq=290)
```

## Website Docs

The static docs site is built with Next.js and lives under `website/`. Key sections:

- `/docs` – overview
- `/docs/getting-started` – install and first prediction
- `/docs/api` – full API; see `DetectExoplanet`
- `/docs/tutorials` – training and prediction guides
- `/docs/examples` – copy-paste snippets

## Development

Website (Node 20):

```bash
cd website
npm ci
npm run dev
```

Static export is enabled via `output: 'export'` and deployed to GitHub Pages with Actions.

## License

MIT License – see `LICENSE`.