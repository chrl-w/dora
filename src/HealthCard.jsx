import { useState } from 'react'
import { ChevronIcon } from './icons'
import { formatDate, todayString, generateId } from './utils/storage'

const colorSchemes = {
  blue: {
    cardBg: 'bg-[#E8F2FA]',
    iconBg: 'bg-[#197BD2]',
    iconText: 'text-white',
    expandedIconBg: 'bg-white',
    expandedIconText: 'text-[#197BD2]',
  },
  pink: {
    cardBg: 'bg-[#FAECF0]',
    iconBg: 'bg-[#D2416E]',
    iconText: 'text-white',
    expandedIconBg: 'bg-white',
    expandedIconText: 'text-[#D2416E]',
  },
}

export default function HealthCard({
  title,
  subtitle,
  icon: Icon,
  colorScheme = 'blue',
  isOpen,
  onToggle,
  records,
  renderRecord,
  actionLabel,
  onAddRecord,
  extraFields,
  maxVisible = 3,
}) {
  const [showAll, setShowAll] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState(todayString())
  const [extraValues, setExtraValues] = useState({})

  const colors = colorSchemes[colorScheme]
  const visibleRecords = showAll ? records : records.slice(0, maxVisible)
  const hasMore = records.length > maxVisible

  function handleSubmit(e) {
    e.preventDefault()
    if (!date) return
    onAddRecord({ id: generateId(), date, ...extraValues })
    setDate(todayString())
    setExtraValues({})
    setShowForm(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className={`${colors.cardBg} flex w-full items-center gap-3 rounded-[10px] py-4 pl-[18px] pr-5 text-left`}
      >
        <div
          className={`${colors.iconBg} ${colors.iconText} flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full`}
        >
          <Icon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#161C2C]">{title}</p>
          <p className="text-xs text-[#161C2C]/50">{subtitle}</p>
        </div>
        <ChevronIcon className="shrink-0 text-[#161C2C]" />
      </button>
    )
  }

  return (
    <div className={`${colors.cardBg} overflow-hidden rounded-[10px]`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 border-b border-white/15 pb-3 pl-[18px] pr-5 pt-[18px] text-left"
      >
        <div
          className={`${colors.expandedIconBg} ${colors.expandedIconText} flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full`}
        >
          <Icon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#161C2C]">{title}</p>
          <p className="text-xs text-[#161C2C]/70">{subtitle}</p>
        </div>
        <ChevronIcon className="shrink-0 text-[#161C2C]" direction="up" />
      </button>

      {/* Records */}
      <div className="px-[18px] pb-10 pt-4">
        {records.length === 0 ? (
          <p className="py-2 text-center text-sm text-[#161C2C]/50">No records yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {visibleRecords.map((record, i) => (
              <div
                key={record.id}
                className={`flex items-center justify-between pt-2.5 text-sm text-[#161C2C]/80 ${
                  i > 0 ? 'border-t border-[#161C2C]/40' : ''
                }`}
              >
                {renderRecord(record)}
              </div>
            ))}

            {hasMore && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="py-1 text-sm font-semibold text-[#161C2C]"
              >
                See more
              </button>
            )}
            {showAll && hasMore && (
              <button
                onClick={() => setShowAll(false)}
                className="py-1 text-sm font-semibold text-[#161C2C]"
              >
                See less
              </button>
            )}
          </div>
        )}

        {/* Inline form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-[#161C2C]/20 bg-white px-3 py-2 text-sm text-[#161C2C] focus:border-[#197BD2] focus:outline-none"
            />
            {extraFields?.map((field) => (
              <input
                key={field.key}
                type={field.type || 'text'}
                step={field.step}
                placeholder={field.placeholder}
                value={extraValues[field.key] || ''}
                onChange={(e) =>
                  setExtraValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="rounded-lg border border-[#161C2C]/20 bg-white px-3 py-2 text-sm text-[#161C2C] focus:border-[#197BD2] focus:outline-none"
              />
            ))}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-full border border-[#161C2C] py-2 text-sm font-semibold text-[#161C2C]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full px-4 py-2 text-sm text-[#161C2C]/60"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Action button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full rounded-full border border-[#161C2C] py-2.5 text-sm font-semibold text-[#161C2C]"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
