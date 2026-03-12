import { useState } from 'react'
import HealthCard from './HealthCard'
import { WalkIcon, SoupIcon } from './icons'
import { load, save, formatDate, daysUntilNext, SOLENSIA_KEY, BLOODTEST_KEY } from './utils/storage'

function dueSubtitle(records, intervalDays) {
  if (records.length === 0) return 'No records yet'
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date))
  const days = daysUntilNext(sorted[0].date, intervalDays)
  if (days < 0) return `Overdue by ${Math.abs(days)} days`
  if (days === 0) return 'Due today'
  return `Due in ${days} days`
}

export default function App() {
  const [openCard, setOpenCard] = useState(null)
  const [injections, setInjections] = useState(() => load(SOLENSIA_KEY))
  const [tests, setTests] = useState(() => load(BLOODTEST_KEY))

  const sortedInjections = [...injections].sort((a, b) => b.date.localeCompare(a.date))
  const sortedTests = [...tests].sort((a, b) => b.date.localeCompare(a.date))

  function addInjection(record) {
    const updated = [...injections, record]
    setInjections(updated)
    save(SOLENSIA_KEY, updated)
  }

  function addTest(record) {
    const updated = [...tests, { ...record, thyroidLevel: parseFloat(record.thyroidLevel) }]
    setTests(updated)
    save(BLOODTEST_KEY, updated)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-md px-4 py-6">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#161C2C]">Dora's data</h1>
        </header>

        <div className="flex flex-col gap-2.5">
          <HealthCard
            title="Pain management"
            subtitle={dueSubtitle(injections, 28)}
            icon={WalkIcon}
            colorScheme="blue"
            isOpen={openCard === 'solensia'}
            onToggle={() => setOpenCard(openCard === 'solensia' ? null : 'solensia')}
            records={sortedInjections}
            renderRecord={(record) => (
              <>
                <span>{formatDate(record.date)}</span>
              </>
            )}
            actionLabel="+ Record injection"
            onAddRecord={addInjection}
          />

          <HealthCard
            title="Blood work"
            subtitle={dueSubtitle(tests, 90)}
            icon={SoupIcon}
            colorScheme="pink"
            isOpen={openCard === 'bloodtest'}
            onToggle={() => setOpenCard(openCard === 'bloodtest' ? null : 'bloodtest')}
            records={sortedTests}
            renderRecord={(record) => (
              <>
                <span>{formatDate(record.date)}</span>
                <span>T4: {record.thyroidLevel}</span>
              </>
            )}
            actionLabel="+ Record blood test"
            onAddRecord={addTest}
            extraFields={[
              { key: 'thyroidLevel', type: 'number', step: 'any', placeholder: 'T4 level' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
