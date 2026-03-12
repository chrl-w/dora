import { daysUntilNext, formatDate } from './utils/storage'
import { AlertCircle, Clock, CalendarDays, CheckCircle2 } from 'lucide-react'

export default function StatusCard({ lastDate, intervalDays, label }) {
  if (!lastDate) {
    return (
      <div className="rounded-2xl bg-warm-100 p-6 text-center">
        <p className="font-display text-base font-medium text-warm-400">
          No records yet
        </p>
        <p className="mt-1 text-[13px] text-warm-300">Log one below to get started</p>
      </div>
    )
  }

  const days = daysUntilNext(lastDate, intervalDays)
  const nextDate = new Date(lastDate)
  nextDate.setDate(nextDate.getDate() + intervalDays)
  const nextDateStr = nextDate.toISOString().split('T')[0]

  const elapsed = intervalDays - days
  const progress = Math.max(0, Math.min(1, elapsed / intervalDays))

  let bgClass, accentClass, ringColor, StatusIcon, statusLabel
  if (days < 0) {
    bgClass = 'bg-overdue-bg'
    accentClass = 'text-overdue'
    ringColor = 'stroke-overdue'
    StatusIcon = AlertCircle
    statusLabel = 'Overdue'
  } else if (days === 0) {
    bgClass = 'bg-warning-bg'
    accentClass = 'text-warning'
    ringColor = 'stroke-warning'
    StatusIcon = Clock
    statusLabel = 'Due today'
  } else if (days <= 7) {
    bgClass = 'bg-warning-bg'
    accentClass = 'text-warning'
    ringColor = 'stroke-warning'
    StatusIcon = CalendarDays
    statusLabel = 'Coming up'
  } else {
    bgClass = 'bg-sage-bg/50'
    accentClass = 'text-sage-dark'
    ringColor = 'stroke-sage'
    StatusIcon = CheckCircle2
    statusLabel = null
  }

  const circumference = 2 * Math.PI * 40
  const dashOffset = circumference * (1 - progress)

  return (
    <div className={`${bgClass} rounded-2xl p-6 countdown-pulse`}>
      <div className="flex items-center gap-6">
        {/* Countdown ring */}
        <div className="relative flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle
              cx="48" cy="48" r="40"
              fill="none"
              strokeWidth="5"
              className="stroke-warm-200/40"
            />
            <circle
              cx="48" cy="48" r="40"
              fill="none"
              strokeWidth="5"
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
            <span className={`font-display text-[28px] font-bold leading-none ${accentClass}`}>
              {days < 0 ? Math.abs(days) : days}
            </span>
            <span className="font-body text-[10px] font-medium uppercase tracking-wider text-warm-400">
              {days === 1 || days === -1 ? 'day' : 'days'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {statusLabel && (
            <div className="flex items-center gap-1.5 mb-1">
              <StatusIcon size={14} className={accentClass} />
              <span className={`font-body text-xs font-semibold uppercase tracking-wide ${accentClass}`}>
                {statusLabel}
              </span>
            </div>
          )}

          <p className={`font-display text-lg font-semibold leading-snug ${days < 0 ? accentClass : 'text-warm-800'}`}>
            {days < 0
              ? `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`
              : days === 0
                ? 'Due today'
                : `${days} day${days !== 1 ? 's' : ''} to go`
            }
          </p>

          <p className="mt-2 text-[13px] font-medium text-warm-600">
            {label}: {formatDate(nextDateStr)}
          </p>
          <p className="mt-0.5 text-[11px] text-warm-400">
            Last recorded: {formatDate(lastDate)}
          </p>
        </div>
      </div>
    </div>
  )
}
