# Callback Operations Console

Small full-stack application for managing post-discharge patient callback requests.

## Prerequisites

- Node.js 20+
- Python 3.11+

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`.

Run backend tests:

```bash
cd backend
pytest
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

Run frontend tests:

```bash
cd frontend
npm test
```
