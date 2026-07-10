function StatsPanel({ stats, focusMode, onToggleFocusMode }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">Focus Mode</span>
        <button
          onClick={onToggleFocusMode}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            focusMode
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {focusMode ? 'On' : 'Off'}
        </button>
      </div>

      {focusMode && stats && (
        <div className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-3">
          <div className="text-center">
            <p className="text-2xl font-semibold text-slate-100">{stats.total}</p>
            <p className="text-xs text-slate-500">Total Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-indigo-400">{stats.completion_percentage}%</p>
            <p className="text-xs text-slate-500">Completion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-emerald-400">{stats.completed_today}</p>
            <p className="text-xs text-slate-500">Done Today</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatsPanel
