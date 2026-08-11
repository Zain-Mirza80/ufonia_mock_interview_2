from .models import Callback, CallbackCreate, CallbackUpdate

_callbacks: dict[int, Callback] = {
    1: Callback(
        id=1,
        patient_name="Patient Alpha",
        phone_number="0000000001",
        reason="Check nausea after discharge medication change",
        priority="urgent",
        due_date="2026-08-11",
    ),
    2: Callback(
        id=2,
        patient_name="Patient Beta",
        phone_number="0000000002",
        reason="Confirm community follow-up has occurred",
        priority="routine",
        due_date="2026-08-12",
        status="in_progress",
        assigned_to="Clinician A",
    ),
    3: Callback(
        id=3,
        patient_name="Patient Gamma",
        phone_number="0000000003",
        reason="Review pain control after minor procedure",
        priority="urgent",
        due_date="2026-08-13",
    ),
    4: Callback(
        id=4,
        patient_name="Patient Delta",
        phone_number="0000000004",
        reason="Check transport arranged for clinic appointment",
        priority="routine",
        due_date="2026-08-14",
        status="completed",
        assigned_to="Clinician B",
    ),
}
_next_id = 5


def list_callbacks() -> list[Callback]:
    return list(_callbacks.values())


def get_callback(callback_id: int) -> Callback | None:
    return _callbacks.get(callback_id)


def create_callback(data: CallbackCreate) -> Callback:
    global _next_id
    callback = Callback(id=_next_id, **data.model_dump())
    _callbacks[_next_id] = callback
    _next_id += 1
    return callback


def update_callback(callback_id: int, data: CallbackUpdate) -> Callback | None:
    existing = _callbacks.get(callback_id)
    if existing is None:
        return None

    updated = existing.model_copy(update=data.model_dump(exclude_unset=True))
    _callbacks[callback_id] = updated
    return updated
