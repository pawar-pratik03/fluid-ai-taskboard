"""API routes for the Task Board.

Handlers stay thin: they delegate all reading/writing to storage.py.
"""

from fastapi import APIRouter, HTTPException, status

import storage
from models import Task, TaskCreate

router = APIRouter()


@router.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task_data: TaskCreate) -> Task:
    """Create a new task from the given title and priority."""
    return storage.add_task(task_data)


@router.get("/tasks", response_model=list[Task])
def list_tasks() -> list[Task]:
    """Return every stored task."""
    return storage.load_tasks()


@router.patch("/tasks/{task_id}/complete", response_model=Task)
def toggle_task_completion(task_id: str) -> Task:
    """Toggle a task's completed state."""
    task = storage.toggle_task(task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str) -> None:
    """Delete a task by id."""
    if not storage.delete_task(task_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")


@router.get("/stats")
def get_stats() -> dict:
    """Return aggregate completion statistics for the task board."""
    return storage.get_stats()
