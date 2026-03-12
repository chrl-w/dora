import { daysUntilNext, formatDate } from './utils/storage'

export default function StatusCard({ lastDate, intervalDays, label }) {
  if (!lastDate) {
    return (
      <div className="rounded-xl bg-stone-100 p-4 text-center text-stone-500">
        No records yet
      </div>
    )
  }

  const days = daysUntilNext(lastDate, intervalDays)
  const nextDate = new Date(lastDate)
  nextDate.setDate(nextDate.getDate() + intervalDays)
  const nextDateStr = nextDate.toISOString().split('T')[0]

  let bgClass, textClass, message
  if (days < 0) {
    bgClass = 'bg-red-50'
    textClass = 'text-red-700'
    message = `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''}`
  } else if (days === 0) {
    bgClass = 'bg-amber-50'
    textClass = 'text-amber-700'
    message = 'Due today'
  } else if (days <= 7) {
    bgClass = 'bg-amber-50'
    textClass = 'text-amber-700'
    message = `${days} day${days !== 1 ? 's' : ''} until next`
  } else {
    bgClass = 'bg-emerald-50'
    textClass = 'text-emerald-700'
    message = `${days} day${days !== 1 ? 's' : ''} until next`
  }

  return (
    <div className={`rounded-xl p-4 ${bgClass}`}>
      <p className={`text-2xl font-bold ${textClass}`}>{message}</p>
      <p className="mt-1 text-sm text-stone-500">
        {label}: {formatDate(nextDateStr)} · Last: {formatDate(lastDate)}
      </p>
    </div>
  )
}
