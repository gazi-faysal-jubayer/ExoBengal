# Installation and Requirements

## Python version

- Python 3.8+

## Install from source

```bash
git clone https://github.com/gazi-faysal-jubayer/ExoBengal.git
cd ExoBengal
python -m venv .venv && source .venv/bin/activate  # on Windows: .venv\Scripts\activate
pip install -U pip
pip install -r requirements.txt
```

Alternatively, install the package (local):

```bash
pip install .
```

## Dependencies

From `requirements.txt` / `pyproject.toml`:

```
numpy
pandas
matplotlib
seaborn
scikit-learn
joblib
tensorflow
```

If you do not have a GPU, TensorFlow will default to CPU.

## Verifying the install

```bash
python -c "import exobengal; print('exobengal OK')"
```

## Optional: website

The Next.js docs site lives in `website/`. To run locally:

```bash
cd website
npm ci
npm run dev
```
