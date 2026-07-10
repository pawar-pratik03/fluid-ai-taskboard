import { useState } from 'react'

const PRIORITIES = ['low', 'medium', 'high']

function AddTask({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return
    onAddTask(trimmedTitle, priority)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2.5 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      >
        {PRIORITIES.map((level) => (
          <option key={level} value={level}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-500 active:scale-95"
      >
        Add Task
      </button>
    </form>
  )
}

export default AddTask
