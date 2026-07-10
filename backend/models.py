"""Pydantic models for the Task Board API."""

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class Priority(str, Enum):
    """Allowed task priority levels."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class TaskCreate(BaseModel):
    """Payload required to create a new task."""

    title: str = Field(..., min_length=1, description="Task title, cannot be empty")
    priority: Priority = Priority.MEDIUM


class Task(BaseModel):
    """A task as stored and returned by the API."""

    id: str
    title: str
    completed: bool = False
    priority: Priority
    created_at: datetime
    completed_at: datetime | None = None
