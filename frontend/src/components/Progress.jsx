function Progress({ percentage }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm text-slate-400">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default Progress
