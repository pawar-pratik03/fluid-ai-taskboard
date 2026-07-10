import { useEffect, useState } from 'react'
import { fetchTasks, createTask, toggleTaskCompletion, deleteTask, fetchStats } from './api.js'
import AddTask from './components/AddTask.jsx'
import TaskCard from './components/TaskCard.jsx'
import Progress from './components/Progress.jsx'
import StatsPanel from './components/StatsPanel.jsx'

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 }

function App() {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState(null)
  const [focusMode, setFocusMode] = useState(false)
  const [error, setError] = useState(null)

  async function refreshTasks() {
    const data = await fetchTasks()
    setTasks(data)
  }

  async function refreshStats() {
    const data = await fetchStats()
    setStats(data)
  }

  useEffect(() => {
    refreshTasks().catch((err) => setError(err.message))
    refreshStats().catch((err) => setError(err.message))
  }, [])

  async function handleAddTask(title, priority) {
    try {
      await createTask(title, priority)
      await Promise.all([refreshTasks(), refreshStats()])
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggleTask(taskId) {
    try {
      await toggleTaskCompletion(taskId)
      await Promise.all([refreshTasks(), refreshStats()])
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId)
      await Promise.all([refreshTasks(), refreshStats()])
    } catch (err) {
      setError(err.message)
    }
  }

  const completionPercentage = stats?.completion_percentage ?? 0

  const visibleTasks = focusMode
    ? [...tasks].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
      })
    : tasks

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-bold">Task Board</h1>
        </header>

        {error && (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-400">
            {error}
          </p>
        )}

        <AddTask onAddTask={handleAddTask} />

        <Progress percentage={completionPercentage} />

        <StatsPanel
          stats={stats}
          focusMode={focusMode}
          onToggleFocusMode={() => setFocusMode((prev) => !prev)}
        />

        {visibleTasks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-800 py-10 text-center text-slate-500">
            No tasks yet — add one above to get started.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                dimmed={focusMode && task.completed}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
