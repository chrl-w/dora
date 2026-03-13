function CatFaceLogo() {
  return (
    <svg width={32} height={32} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M10 16L7 6L15 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 16L33 6L25 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Head */}
      <ellipse cx="20" cy="22" rx="12" ry="11" stroke="currentColor" strokeWidth={1.5} />
      {/* Eyes */}
      <circle cx="15" cy="20" r="1.5" fill="currentColor" />
      <circle cx="25" cy="20" r="1.5" fill="currentColor" />
      {/* Nose */}
      <path d="M20 24L18.5 25.5H21.5L20 24Z" fill="currentColor" />
      {/* Whiskers */}
      <path d="M5 21L14 22" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
      <path d="M5 25L14 24" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
      <path d="M35 21L26 22" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
      <path d="M35 25L26 24" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
    </svg>
  )
}

function SittingCatIllustration() {
  return (
    <svg width={120} height={120} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70">
      {/* Ears */}
      <path d="M28 28L24 16L33 25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 28L50 16L41 25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Head */}
      <ellipse cx="37" cy="32" rx="11" ry="10" stroke="currentColor" strokeWidth={1.5} />
      {/* Eyes */}
      <circle cx="33" cy="31" r="1.2" fill="currentColor" />
      <circle cx="41" cy="31" r="1.2" fill="currentColor" />
      {/* Nose */}
      <path d="M37 34L35.8 35.2H38.2L37 34Z" fill="currentColor" />
      {/* Whiskers */}
      <path d="M24 30L32 31.5" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
      <path d="M24 34L32 33" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
      <path d="M50 30L42 31.5" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
      <path d="M50 34L42 33" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
      {/* Body - sitting pose */}
      <path d="M30 41C28 44 27 48 28 54C29 58 32 61 37 62C42 61 45 58 46 54C47 48 46 44 44 41" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Front legs */}
      <path d="M31 52L30 60C30 61 30.5 62 32 62" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M43 52L44 60C44 61 43.5 62 42 62" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Tail curling up */}
      <path d="M46 54C49 52 52 48 54 44C55 41 54 39 52 40" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Batting paw - extended to the right */}
      <path d="M44 56L50 54" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      {/* Ball */}
      <circle cx="53" cy="54" r="2.5" stroke="currentColor" strokeWidth={1.2} />
      {/* Ball motion lines */}
      <path d="M56 52L58 51" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
      <path d="M56 55L58 56" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
    </svg>
  )
}

export default function HeroRing() {
  return (
    <div className="hero-gradient relative flex flex-col items-center justify-center" style={{ height: '25vh', minHeight: 180 }}>
      {/* Title with cat logo at top */}
      <div className="absolute top-0 left-0 right-0 pt-6 px-5">
        <div className="flex items-center gap-2.5">
          <div className="text-white/90">
            <CatFaceLogo />
          </div>
          <h1 className="font-display text-[22px] font-semibold text-white/90 tracking-tight">
            Dora's health
          </h1>
        </div>
      </div>

      {/* Sitting cat illustration */}
      <div className="mt-6">
        <SittingCatIllustration />
      </div>
    </div>
  )
}
