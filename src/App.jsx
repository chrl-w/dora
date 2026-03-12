import SolensiaSection from './SolensiaSection'
import BloodTestSection from './BloodTestSection'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-[420px] px-4 pb-10">
        {/* Header */}
        <header className="pt-6 pb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta shadow-lg shadow-terracotta/25">
              <span className="text-2xl" role="img" aria-label="cat">🐱</span>
            </div>
            <div>
              <h1 className="font-display text-[28px] font-bold leading-tight text-warm-800">
                Dora's Health
              </h1>
              <p className="font-body text-sm font-medium text-warm-400">
                🐾 Keeping her purring along
              </p>
            </div>
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-8">
          <SolensiaSection />
          <BloodTestSection />
        </div>

        {/* Footer paw */}
        <div className="mt-10 text-center">
          <span className="text-warm-300 text-xs tracking-widest">🐾 🐾 🐾</span>
        </div>
      </div>
    </div>
  )
}
