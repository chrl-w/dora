import { daysUntilNext } from './utils/storage'

function CatIllustration({ size = 80 }) {
  const s = size / 40
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M10 16L7 6L15 13" stroke="currentColor" strokeWidth={1.5 / s} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 16L33 6L25 13" stroke="currentColor" strokeWidth={1.5 / s} strokeLinecap="round" strokeLinejoin="round" />
      {/* Head */}
      <ellipse cx="20" cy="22" rx="12" ry="11" stroke="currentColor" strokeWidth={1.5 / s} />
      {/* Eyes */}
      <circle cx="15" cy="20" r="1.5" fill="currentColor" />
      <circle cx="25" cy="20" r="1.5" fill="currentColor" />
      {/* Nose */}
      <path d="M20 24L18.5 25.5H21.5L20 24Z" fill="currentColor" />
      {/* Whiskers */}
      <path d="M5 21L14 22" stroke="currentColor" strokeWidth={1 / s} strokeLinecap="round" />
      <path d="M5 25L14 24" stroke="currentColor" strokeWidth={1 / s} strokeLinecap="round" />
      <path d="M35 21L26 22" stroke="currentColor" strokeWidth={1 / s} strokeLinecap="round" />
      <path d="M35 25L26 24" stroke="currentColor" strokeWidth={1 / s} strokeLinecap="round" />
    </svg>
  )
}

export default function HeroRing({ solensiaLastDate, bloodTestLastDate }) {
  const solensiaDays = solensiaLastDate ? daysUntilNext(solensiaLastDate, 28) : null
  const bloodDays = bloodTestLastDate ? daysUntilNext(bloodTestLastDate, 90) : null

  // Overall status: action needed if anything is overdue or due within 3 days
  const needsAction =
    (solensiaDays !== null && solensiaDays <= 3) ||
    (bloodDays !== null && bloodDays <= 3)

  const noRecords = solensiaDays === null && bloodDays === null

  // Calculate worst-case progress for the ring
  let overallProgress = 1
  if (solensiaDays !== null) {
    const sp = Math.max(0, Math.min(1, (28 - solensiaDays) / 28))
    overallProgress = Math.min(overallProgress, 1 - sp)
  }
  if (bloodDays !== null) {
    const bp = Math.max(0, Math.min(1, (90 - bloodDays) / 90))
    overallProgress = Math.min(overallProgress, 1 - bp)
  }
  if (noRecords) overallProgress = 0

  const radius = 100
  const strokeWidth = 8
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - overallProgress)
  const viewSize = (radius + strokeWidth) * 2 + 4
  const center = viewSize / 2

  const ringColor = needsAction ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)'
  const trackColor = 'rgba(255,255,255,0.15)'

  return (
    <div className="hero-gradient relative flex flex-col items-center justify-center" style={{ height: '35vh', minHeight: 280 }}>
      {/* Title at top */}
      <div className="absolute top-0 left-0 right-0 pt-6 px-5">
        <h1 className="font-display text-[22px] font-semibold text-white/90 tracking-tight">
          Dora's Health
        </h1>
      </div>

      {/* Ring + cat */}
      <div className="relative" style={{ width: viewSize, height: viewSize }}>
        <svg width={viewSize} height={viewSize} viewBox={`0 0 ${viewSize} ${viewSize}`} className="-rotate-90">
          {/* Track */}
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke={trackColor}
          />
          {/* Progress */}
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke={ringColor}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>

        {/* Cat in centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
          <CatIllustration size={56} />
        </div>
      </div>

      {/* Status message below ring */}
      <p className="mt-3 font-display text-[18px] font-medium text-white/90 tracking-wide">
        {noRecords
          ? 'Get started below'
          : needsAction
            ? 'Action needed'
            : 'All on track'
        }
      </p>
    </div>
  )
}
