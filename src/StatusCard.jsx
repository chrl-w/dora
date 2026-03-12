import { daysUntilNext, formatDate } from './utils/storage'

export default function StatusCard({ lastDate, intervalDays, label, icon }) {
  if (!lastDate) {
    return (
      <div className="rounded-3xl bg-warm-100 p-6 text-center">
        <span className="text-3xl">🐾</span>
        <p className="mt-2 font-display text-base font-medium text-warm-400">
          No records yet
        </p>
        <p className="text-sm text-warm-300">Log one below to get started</p>
      </div>
    )
  }

  const days = daysUntilNext(lastDate, intervalDays)
  const nextDate = new Date(lastDate)
  nextDate.setDate(nextDate.getDate() + intervalDays)
  const nextDateStr = nextDate.toISOString().split('T')[0]

  const elapsed = intervalDays - days
  const progress = Math.max(0, Math.min(1, elapsed / intervalDays))

  let bgClass, accentClass, ringColor, statusEmoji, statusLabel
  if (days < 0) {
    bgClass = 'bg-overdue-bg'
    accentClass = 'text-overdue'
    ringColor = 'stroke-overdue'
    statusEmoji = '😿'
    statusLabel = 'Overdue'
  } else if (days === 0) {
    bgClass = 'bg-warning-bg'
    accentClass = 'text-warning'
    ringColor = 'stroke-warning'
    statusEmoji = '⏰'
    statusLabel = 'Due today'
  } else if (days <= 7) {
    bgClass = 'bg-warning-bg'
    accentClass = 'text-warning'
    ringColor = 'stroke-warning'
    statusEmoji = '📅'
    statusLabel = 'Coming up'
  } else {
    bgClass = 'bg-sage-bg'
    accentClass = 'text-sage-dark'
    ringColor = 'stroke-sage'
    statusEmoji = '😸'
    statusLabel = 'All good'
  }

  const circumference = 2 * Math.PI * 40
  const dashOffset = circumference * (1 - progress)

  return (
    <div className={`${bgClass} rounded-3xl p-5 countdown-pulse`}>
      <div className="flex items-center gap-5">
        {/* Countdown ring */}
        <div className="relative flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle
              cx="48" cy="48" r="40"
              fill="none"
              strokeWidth="6"
              className="stroke-warm-200/50"
            />
            <circle
              cx="48" cy="48" r="40"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className={ringColor}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
                transition: 'stroke-dashoffset 0.6s ease',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-display text-2xl font-bold leading-none ${accentClass}`}>
              {days < 0 ? Math.abs(days) : days}
            </span>
            <span className="font-body text-[10px] font-semibold uppercase tracking-wide text-warm-400">
              {days === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{statusEmoji}</span>
            <span className={`font-display text-sm font-semibold ${accentClass}`}>
              {statusLabel}
            </span>
          </div>
          {days < 0 ? (
            <p className={`mt-1 font-display text-lg font-bold ${accentClass}`}>
              {Math.abs(days)} day{Math.abs(days) !== 1 ? 's' : ''} overdue
            </p>
          ) : days === 0 ? (
            <p className={`mt-1 font-display text-lg font-bold ${accentClass}`}>
              Due today!
            </p>
          ) : (
            <p className={`mt-1 font-display text-lg font-bold ${accentClass}`}>
              {days} day{days !== 1 ? 's' : ''} to go
            </p>
          )}
          <p className="mt-1 text-xs text-warm-400">
            {label}: {formatDate(nextDateStr)}
          </p>
          <p className="text-xs text-warm-300">
            Last: {formatDate(lastDate)}
          </p>
        </div>
      </div>
    </div>
  )
}
