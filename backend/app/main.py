from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import Callback, CallbackCreate, CallbackUpdate
from .store import create_callback, get_callback, list_callbacks, update_callback

app = FastAPI(title="Callback Operations API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/callbacks", response_model=list[Callback])
def get_callbacks() -> list[Callback]:
    return list_callbacks()


@app.get("/callbacks/{callback_id}", response_model=Callback)
def get_one_callback(callback_id: int) -> Callback:
    callback = get_callback(callback_id)
    if callback is None:
        raise HTTPException(status_code=404, detail="Callback not found")
    return callback


@app.post("/callbacks", response_model=Callback, status_code=201)
def post_callback(payload: CallbackCreate) -> Callback:
    return create_callback(payload)


@app.patch("/callbacks/{callback_id}", response_model=Callback)
def patch_callback(callback_id: int, payload: CallbackUpdate) -> Callback:
    callback = update_callback(callback_id, payload)
    if callback is None:
        raise HTTPException(status_code=404, detail="Callback not found")
    return callback
