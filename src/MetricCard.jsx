import { daysUntilNext, formatDate } from './utils/storage'
import { Syringe, Droplets } from 'lucide-react'

export default function MetricCard({ type, lastDate, onTap }) {
  const isSolensia = type === 'solensia'
  const intervalDays = isSolensia ? 28 : 90
  const label = isSolensia ? 'Solensia' : 'Blood tests'
  const Icon = isSolensia ? Syringe : Droplets

  const hasDates = lastDate !== null
  const days = hasDates ? daysUntilNext(lastDate, intervalDays) : null
  const nextDate = hasDates ? (() => {
    const d = new Date(lastDate)
    d.setDate(d.getDate() + intervalDays)
    return d.toISOString().split('T')[0]
  })() : null

  const isOverdue = days !== null && days < 0
  const isDueSoon = days !== null && days >= 0 && days <= 7
  const isOk = days !== null && days > 7

  // Progress arc
  const radius = 28
  const strokeWidth = 4
  const circumference = 2 * Math.PI * radius
  let progress = 0
  if (hasDates) {
    const elapsed = intervalDays - (days < 0 ? 0 : days)
    progress = Math.max(0, Math.min(1, elapsed / intervalDays))
  }
  const dashOffset = circumference * (1 - progress)

  // Colours
  let accentColor, bgColor, ringStroke
  if (isSolensia) {
    accentColor = isOverdue ? 'text-overdue' : 'text-terracotta'
    bgColor = 'bg-white'
    ringStroke = isOverdue ? 'stroke-overdue' : isDueSoon ? 'stroke-warning' : 'stroke-terracotta'
  } else {
    accentColor = isOverdue ? 'text-overdue' : 'text-sage-dark'
    bgColor = 'bg-white'
    ringStroke = isOverdue ? 'stroke-overdue' : isDueSoon ? 'stroke-warning' : 'stroke-sage'
  }

  const borderColor = isSolensia
    ? (isOverdue ? 'border-overdue/20' : 'border-terracotta/15')
    : (isOverdue ? 'border-overdue/20' : 'border-sage/15')

  return (
    <button
      onClick={onTap}
      className={`metric-card ${bgColor} ${borderColor} w-full rounded-2xl border-2 p-5 text-left shadow-sm`}
    >
      {/* Icon + label */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${isSolensia ? 'bg-terracotta-bg' : 'bg-sage-bg'}`}>
          <Icon size={12} className={isSolensia ? 'text-terracotta' : 'text-sage-dark'} />
        </div>
        <span className="font-body text-[12px] font-semibold uppercase tracking-wider text-warm-400">
          {label}
        </span>
      </div>

      {/* Ring + days */}
      <div className="flex items-center gap-4">
        {/* Mini progress arc */}
        <div className="relative flex-shrink-0">
          <svg width={72} height={72} viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`} className="-rotate-90">
            <circle
              cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              className="stroke-warm-200/30"
            />
            <circle
              cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className={ringStroke}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
                transition: 'stroke-dashoffset 0.6s ease',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-display text-[22px] font-bold leading-none ${accentColor}`}>
              {hasDates ? (days < 0 ? Math.abs(days) : days) : '—'}
            </span>
            {hasDates && (
              <span className="font-body text-[8px] font-medium uppercase tracking-wider text-warm-400 mt-0.5">
                {days === 1 || days === -1 ? 'day' : 'days'}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          {hasDates ? (
            <>
              <p className={`font-body text-[13px] font-semibold ${isOverdue ? 'text-overdue' : 'text-warm-700'}`}>
                {isOverdue
                  ? 'Overdue'
                  : days === 0
                    ? 'Due today'
                    : isDueSoon
                      ? 'Due soon'
                      : 'On track'
                }
              </p>
              <p className="font-body text-[11px] text-warm-400 mt-1">
                {isOverdue ? 'Was due' : 'Due'} {formatDate(nextDate)}
              </p>
            </>
          ) : (
            <p className="font-body text-[13px] text-warm-400">
              No records yet
            </p>
          )}
        </div>
      </div>
    </button>
  )
}
