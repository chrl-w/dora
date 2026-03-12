import SolensiaSection from './SolensiaSection'
import BloodTestSection from './BloodTestSection'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-md px-4 py-6">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-stone-800">🐾 Dora Health</h1>
          <p className="text-sm text-stone-500">Health tracker for Dora</p>
        </header>

        <div className="space-y-10">
          <SolensiaSection />
          <BloodTestSection />
        </div>
      </div>
    </div>
  )
}
