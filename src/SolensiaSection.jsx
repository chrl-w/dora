import { useState } from 'react'
import StatusCard from './StatusCard'
import { load, save, generateId, todayString, formatDate, SOLENSIA_KEY } from './utils/storage'

export default function SolensiaSection() {
  const [injections, setInjections] = useState(() => load(SOLENSIA_KEY))
  const [date, setDate] = useState(todayString())

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
      <h2 className="mb-3 text-lg font-semibold text-stone-800">💉 Solensia Injections</h2>

      <StatusCard lastDate={lastDate} intervalDays={28} label="Next injection" />

      <form onSubmit={handleLog} className="mt-4 flex gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-stone-800 focus:border-violet-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-700 active:bg-violet-800"
        >
          Log
        </button>
      </form>

      {sorted.length > 0 && (
        <ul className="mt-4 space-y-2">
          {sorted.map((injection) => (
            <li
              key={injection.id}
              className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-stone-700">{formatDate(injection.date)}</span>
              <button
                onClick={() => handleDelete(injection.id)}
                className="text-sm text-stone-400 hover:text-red-500"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
