"""JSON file persistence for tasks.

All reads and writes go through this module so routes.py never touches
the filesystem directly.
"""

import json
from datetime import date, datetime
from pathlib import Path
from uuid import uuid4

from models import Task, TaskCreate

DATA_FILE = Path(__file__).parent / "tasks.json"


def load_tasks() -> list[Task]:
    """Load all tasks from disk, returning an empty list if the file doesn't exist yet."""
    if not DATA_FILE.exists():
        return []
    with DATA_FILE.open("r", encoding="utf-8") as data_file:
        raw_tasks = json.load(data_file)
    return [Task(**item) for item in raw_tasks]


def save_tasks(tasks: list[Task]) -> None:
    """Persist the given list of tasks to disk as JSON."""
    with DATA_FILE.open("w", encoding="utf-8") as data_file:
        json.dump([task.model_dump(mode="json") for task in tasks], data_file, indent=2)


def add_task(task_data: TaskCreate) -> Task:
    """Create a new task, persist it, and return it."""
    tasks = load_tasks()
    task = Task(
        id=str(uuid4()),
        title=task_data.title.strip(),
        priority=task_data.priority,
        created_at=datetime.now(),
    )
    tasks.append(task)
    save_tasks(tasks)
    return task


def toggle_task(task_id: str) -> Task | None:
    """Toggle a task's completed state and persist the change.

    Returns the updated task, or None if no task matches the given id.
    """
    tasks = load_tasks()
    for task in tasks:
        if task.id == task_id:
            task.completed = not task.completed
            task.completed_at = datetime.now() if task.completed else None
            save_tasks(tasks)
            return task
    return None


def delete_task(task_id: str) -> bool:
    """Delete a task by id and persist the change.

    Returns True if a task was deleted, False if no task matched.
    """
    tasks = load_tasks()
    remaining_tasks = [task for task in tasks if task.id != task_id]
    if len(remaining_tasks) == len(tasks):
        return False
    save_tasks(remaining_tasks)
    return True


def get_stats() -> dict:
    """Compute aggregate completion statistics over all stored tasks."""
    tasks = load_tasks()
    total = len(tasks)
    completed = sum(1 for task in tasks if task.completed)
    completion_percentage = round((completed / total) * 100, 1) if total else 0.0
    today = date.today()
    completed_today = sum(
        1 for task in tasks
        if task.completed and task.completed_at and task.completed_at.date() == today
    )
    return {
        "total": total,
        "completed": completed,
        "completion_percentage": completion_percentage,
        "completed_today": completed_today,
    }
