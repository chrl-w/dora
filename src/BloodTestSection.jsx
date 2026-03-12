import { useState } from 'react'
import { Droplets, ChevronDown, X } from 'lucide-react'
import StatusCard from './StatusCard'
import { load, save, generateId, todayString, formatDate, BLOODTEST_KEY } from './utils/storage'

export default function BloodTestSection() {
  const [tests, setTests] = useState(() => load(BLOODTEST_KEY))
  const [date, setDate] = useState(todayString())
  const [thyroidLevel, setThyroidLevel] = useState('')
  const [showAllHistory, setShowAllHistory] = useState(false)

  const sorted = [...tests].sort((a, b) => b.date.localeCompare(a.date))
  const lastDate = sorted.length > 0 ? sorted[0].date : null
  const visibleHistory = showAllHistory ? sorted : sorted.slice(0, 2)

  function handleLog(e) {
    e.preventDefault()
    if (!date || thyroidLevel === '') return
    const updated = [
      ...tests,
      { id: generateId(), date, thyroidLevel: parseFloat(thyroidLevel) },
    ]
    setTests(updated)
    save(BLOODTEST_KEY, updated)
    setDate(todayString())
    setThyroidLevel('')
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this blood test record?')) return
    const updated = tests.filter((t) => t.id !== id)
    setTests(updated)
    save(BLOODTEST_KEY, updated)
  }

  return (
    <section>
      {/* Section header */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage-bg">
          <Droplets size={14} className="text-sage-dark" />
        </div>
        <h2 className="font-display text-[17px] font-semibold text-warm-800">Blood tests</h2>
      </div>

      {/* Status countdown */}
      <StatusCard lastDate={lastDate} intervalDays={90} label="Next blood test" />

      {/* Log form */}
      <form onSubmit={handleLog} className="mt-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-warm-400 mb-1.5">
              Test date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border-2 border-warm-200 bg-cream px-4 py-3 text-sm font-medium text-warm-700 transition-colors focus:border-sage focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-warm-400 mb-1.5">
              T4 Level (nmol/L)
            </label>
            <input
              type="number"
              step="any"
              value={thyroidLevel}
              onChange={(e) => setThyroidLevel(e.target.value)}
              placeholder="e.g. 32.5"
              className="w-full rounded-xl border-2 border-warm-200 bg-cream px-4 py-3 text-sm font-medium text-warm-700 transition-colors focus:border-sage focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-terracotta px-6 py-3 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-terracotta-dark active:scale-[0.98]"
        >
          <Droplets size={14} />
          Log blood test
        </button>
      </form>

      {/* History - show last 2 by default */}
      {sorted.length > 0 && (
        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-warm-400 mb-3">
            History
          </p>
          <div className="space-y-0">
            {visibleHistory.map((test, index) => (
              <div
                key={test.id}
                className="timeline-item flex items-center gap-3 py-2.5 pl-2"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage-bg">
                  <div className="h-2 w-2 rounded-full bg-sage" />
                </div>

                {/* Content */}
                <div className="flex flex-1 items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm font-medium text-warm-700">
                      {formatDate(test.date)}
                    </span>
                    <span className="rounded-full bg-cream-dark px-2 py-0.5 text-[11px] font-semibold text-warm-500">
                      T4: {test.thyroidLevel}
                    </span>
                    {index === 0 && (
                      <span className="rounded-full bg-sage-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sage-dark">
                        Latest
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(test.id)}
                    className="rounded-lg p-1 text-warm-300 transition-colors hover:bg-overdue-bg hover:text-overdue"
                    aria-label="Delete record"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sorted.length > 2 && (
            <button
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-[12px] font-medium text-warm-400 transition-colors hover:text-warm-600"
            >
              <span>{showAllHistory ? 'Show less' : `Show all ${sorted.length} records`}</span>
              <ChevronDown size={14} className={`transition-transform ${showAllHistory ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
