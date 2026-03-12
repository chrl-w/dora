import SolensiaSection from './SolensiaSection'
import BloodTestSection from './BloodTestSection'

function CatIllustration() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M10 16L7 6L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 16L33 6L25 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Head */}
      <ellipse cx="20" cy="22" rx="12" ry="11" stroke="currentColor" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="15" cy="20" r="1.5" fill="currentColor" />
      <circle cx="25" cy="20" r="1.5" fill="currentColor" />
      {/* Nose */}
      <path d="M20 24L18.5 25.5H21.5L20 24Z" fill="currentColor" />
      {/* Whiskers */}
      <path d="M5 21L14 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M5 25L14 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M35 21L26 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M35 25L26 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-[420px] px-5 pb-12">
        {/* Header */}
        <header className="pt-8 pb-10">
          <div className="flex items-center gap-4">
            <div className="text-terracotta">
              <CatIllustration />
            </div>
            <div>
              <h1 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-warm-800">
                Dora's Health
              </h1>
              <p className="font-body text-[13px] font-medium text-warm-400 tracking-wide">
                Keeping her purring along
              </p>
            </div>
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-10">
          <SolensiaSection />
          <BloodTestSection />
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-warm-200 pt-4 text-center">
          <p className="text-[11px] font-medium tracking-wide text-warm-300">Dora Health</p>
        </div>
      </div>
    </div>
  )
}
