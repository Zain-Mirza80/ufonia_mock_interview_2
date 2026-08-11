from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_list_callbacks_returns_seed_data():
    response = client.get("/callbacks")
    assert response.status_code == 200
    assert len(response.json()) >= 4


def test_get_missing_callback_returns_404():
    response = client.get("/callbacks/9999")
    assert response.status_code == 404


def test_update_callback_status():
    response = client.patch("/callbacks/1", json={"status": "in_progress"})
    assert response.status_code == 200
    assert response.json()["status"] == "in_progress"


def test_invalid_status_is_rejected():
    response = client.patch("/callbacks/2", json={"status": "unknown"})
    assert response.status_code == 422
