import { useState } from 'react'
import StatusCard from './StatusCard'
import { load, save, generateId, todayString, formatDate, SOLENSIA_KEY } from './utils/storage'

export default function SolensiaSection() {
  const [injections, setInjections] = useState(() => load(SOLENSIA_KEY))
  const [date, setDate] = useState(todayString())
  const [showHistory, setShowHistory] = useState(false)

  const sorted = [...injections].sort((a, b) => b.date.localeCompare(a.date))
  const lastDate = sorted.length > 0 ? sorted[0].date : null

  function handleLog(e) {
    e.preventDefault()
    if (!date) return
    const updated = [...injections, { id: generateId(), date }]
    setInjections(updated)
    save(SOLENSIA_KEY, updated)
    setDate(todayString())
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this injection record?')) return
    const updated = injections.filter((i) => i.id !== id)
    setInjections(updated)
    save(SOLENSIA_KEY, updated)
  }

  return (
    <section>
      {/* Section header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-terracotta-bg text-sm">💉</span>
        <h2 className="font-display text-xl font-bold text-warm-800">Solensia</h2>
      </div>

      {/* Status countdown */}
      <StatusCard lastDate={lastDate} intervalDays={28} label="Next injection" icon="💉" />

      {/* Log form */}
      <form onSubmit={handleLog} className="mt-4">
        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 rounded-2xl border-2 border-warm-200 bg-white px-4 py-3 text-sm font-medium text-warm-700 transition-colors focus:border-terracotta focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-2xl bg-terracotta px-6 py-3 font-display text-sm font-semibold text-white shadow-md shadow-terracotta/25 transition-all hover:bg-terracotta-dark active:scale-95 active:shadow-sm"
          >
            Log 🐾
          </button>
        </div>
      </form>

      {/* History */}
      {sorted.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex w-full items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold text-warm-500 transition-colors hover:bg-white/80"
          >
            <span>History ({sorted.length})</span>
            <span className={`transition-transform ${showHistory ? 'rotate-180' : ''}`}>▾</span>
          </button>

          {showHistory && (
            <div className="mt-2 space-y-0">
              {sorted.map((injection, index) => (
                <div
                  key={injection.id}
                  className="timeline-item flex items-center gap-3 py-2.5 pl-2"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-terracotta-bg">
                    <div className="h-2.5 w-2.5 rounded-full bg-terracotta" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <div>
                      <span className="font-display text-sm font-semibold text-warm-700">
                        {formatDate(injection.date)}
                      </span>
                      {index === 0 && (
                        <span className="ml-2 rounded-full bg-sage-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sage-dark">
                          Latest
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(injection.id)}
                      className="rounded-lg p-1 text-warm-300 transition-colors hover:bg-overdue-bg hover:text-overdue"
                      aria-label="Delete record"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 4l8 8M12 4l-8 8" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
