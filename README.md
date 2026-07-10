# Task Board

A full-stack task board with a FastAPI backend and a React (Vite + Tailwind) frontend.

## Tech Stack

- **Backend:** FastAPI, Pydantic, JSON file persistence (`backend/tasks.json` — no database)
- **Frontend:** React 18, Vite, Tailwind CSS

## Project Structure

```
backend/
  main.py           # App creation, CORS, router registration
  models.py         # Pydantic models: Priority, TaskCreate, Task
  storage.py        # JSON file persistence (tasks.json) — load/save/add/toggle/delete/stats
  routes.py         # APIRouter with thin endpoint handlers
  requirements.txt
frontend/
  src/
    api.js           # All fetch calls to the backend
    App.jsx           # Top-level state management and layout
    index.css
    components/
      AddTask.jsx      # Input + priority selector + Add button
      TaskCard.jsx      # Title, checkbox, priority badge, delete button
      Progress.jsx      # Animated progress bar
      StatsPanel.jsx    # Focus Mode toggle + live stats
```

## Setup & Run

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API is now running at `http://localhost:8000` (interactive docs at `http://localhost:8000/docs`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app is now running at `http://localhost:5173`.

> The frontend expects the backend to be reachable at `http://localhost:8000` (see `frontend/src/api.js`).

## API Endpoints

| Method | Endpoint               | Description                                  |
|--------|-------------------------|-----------------------------------------------|
| POST   | `/tasks`                | Create a task (`title`, `priority`) — 201     |
| GET    | `/tasks`                | List all tasks                                |
| PATCH  | `/tasks/{id}/complete`  | Toggle a task's completed state — 404 if missing |
| DELETE | `/tasks/{id}`           | Delete a task — 204, 404 if missing            |
| GET    | `/stats`                | `total`, `completed`, `completion_percentage`, `completed_today` |

## Unique Feature: Focus Mode

Toggling **Focus Mode** does three things at once:

1. Dims completed tasks (reduced opacity) so your eye goes straight to what's left.
2. Auto-sorts the remaining tasks by priority (High → Medium → Low), pushing completed tasks to the bottom.
3. Reveals a **Stats Panel** pulling live data from `/stats` — total tasks, completion percentage, and how many tasks were completed today.

It's a quick way to shift from "manage everything" to "just focus on what's next."

## Running Both on Replit

1. Create two Repls (or one Repl with two run targets) — one for `backend/`, one for `frontend/`.
2. Backend Repl: set the run command to
   `pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port 8000`
3. Frontend Repl: set the run command to `npm install && npm run dev -- --host 0.0.0.0`
4. Update `BASE_URL` in `frontend/src/api.js` to the backend Repl's public URL (Replit assigns each Repl its own `https://<repl-name>.<user>.repl.co` address — `localhost` won't resolve across Repls).
