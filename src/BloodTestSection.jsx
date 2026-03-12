import { useState } from 'react'
import StatusCard from './StatusCard'
import { load, save, generateId, todayString, formatDate, BLOODTEST_KEY } from './utils/storage'

export default function BloodTestSection() {
  const [tests, setTests] = useState(() => load(BLOODTEST_KEY))
  const [date, setDate] = useState(todayString())
  const [thyroidLevel, setThyroidLevel] = useState('')

  const sorted = [...tests].sort((a, b) => b.date.localeCompare(a.date))
  const lastDate = sorted.length > 0 ? sorted[0].date : null

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
      <h2 className="mb-3 text-lg font-semibold text-stone-800">🩸 Blood Tests</h2>

      <StatusCard lastDate={lastDate} intervalDays={90} label="Next blood test" />

      <form onSubmit={handleLog} className="mt-4 flex gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-stone-800 focus:border-violet-500 focus:outline-none"
        />
        <input
          type="number"
          step="any"
          value={thyroidLevel}
          onChange={(e) => setThyroidLevel(e.target.value)}
          placeholder="T4 level"
          className="w-24 rounded-lg border border-stone-300 px-3 py-2 text-stone-800 focus:border-violet-500 focus:outline-none"
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
          {sorted.map((test) => (
            <li
              key={test.id}
              className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm"
            >
              <div>
                <span className="text-stone-700">{formatDate(test.date)}</span>
                <span className="ml-3 text-sm text-stone-500">T4: {test.thyroidLevel}</span>
              </div>
              <button
                onClick={() => handleDelete(test.id)}
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
