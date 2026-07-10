const PRIORITY_STYLES = {
  low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  high: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
}

function TaskCard({ task, dimmed, onToggle, onDelete }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-all duration-300 ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-500"
      />
      <span
        className={`flex-1 truncate transition ${
          task.completed ? 'text-slate-500 line-through' : 'text-slate-100'
        }`}
      >
        {task.title}
      </span>
      <span
        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${PRIORITY_STYLES[task.priority]}`}
      >
        {task.priority}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="rounded-md p-1.5 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-400"
      >
        ✕
      </button>
    </li>
  )
}

export default TaskCard
