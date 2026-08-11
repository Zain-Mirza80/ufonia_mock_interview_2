from enum import Enum
from pydantic import BaseModel, Field


class CallbackStatus(str, Enum):
    waiting = "waiting"
    in_progress = "in_progress"
    completed = "completed"


class CallbackPriority(str, Enum):
    routine = "routine"
    urgent = "urgent"


class CallbackBase(BaseModel):
    patient_name: str = Field(min_length=1, max_length=100)
    phone_number: str = Field(min_length=7, max_length=30)
    reason: str = Field(min_length=1, max_length=240)
    priority: CallbackPriority = CallbackPriority.routine


class CallbackCreate(CallbackBase):
    due_date: str = Field(min_length=10, max_length=10)


class CallbackUpdate(BaseModel):
    status: CallbackStatus | None = None
    assigned_to: str | None = Field(default=None, max_length=80)
    due_date: str | None = Field(default=None, min_length=10, max_length=10)


class Callback(CallbackBase):
    id: int
    due_date: str
    status: CallbackStatus = CallbackStatus.waiting
    assigned_to: str | None = None
