import { useState, useCallback } from 'react'
import { load, SOLENSIA_KEY, BLOODTEST_KEY } from './utils/storage'
import HeroRing from './HeroRing'
import MetricCard from './MetricCard'
import BottomSheet from './BottomSheet'
import BottomNav from './BottomNav'

function getLastDate(records) {
  if (!records.length) return null
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date))
  return sorted[0].date
}

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeSheet, setActiveSheet] = useState(null)

  const solensiaRecords = load(SOLENSIA_KEY)
  const bloodTestRecords = load(BLOODTEST_KEY)
  const solensiaLast = getLastDate(solensiaRecords)
  const bloodTestLast = getLastDate(bloodTestRecords)

  const handleDataChange = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

  return (
    <div className="min-h-screen bg-white" key={refreshKey}>
      {/* Hero */}
      <HeroRing solensiaLastDate={solensiaLast} bloodTestLastDate={bloodTestLast} />

      {/* Metric cards */}
      <div className="mx-auto max-w-[420px] px-5 -mt-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard type="solensia" lastDate={solensiaLast} onTap={() => setActiveSheet('solensia')} />
          <MetricCard type="blood" lastDate={bloodTestLast} onTap={() => setActiveSheet('blood')} />
        </div>
      </div>

      {/* Bottom padding for nav */}
      <div className="h-24" />

      {/* Bottom sheet */}
      <BottomSheet
        type={activeSheet || 'solensia'}
        isOpen={activeSheet !== null}
        onClose={() => setActiveSheet(null)}
        onDataChange={handleDataChange}
      />

      {/* Bottom nav */}
      <BottomNav active="home" />
    </div>
  )
}
