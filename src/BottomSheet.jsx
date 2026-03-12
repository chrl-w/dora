import { useState, useEffect, useRef } from 'react'
import { X, Syringe, Droplets, ChevronDown } from 'lucide-react'
import { load, save, generateId, todayString, formatDate, daysUntilNext, SOLENSIA_KEY, BLOODTEST_KEY } from './utils/storage'

export default function BottomSheet({ type, isOpen, onClose, onDataChange }) {
  const isSolensia = type === 'solensia'
  const storageKey = isSolensia ? SOLENSIA_KEY : BLOODTEST_KEY
  const intervalDays = isSolensia ? 28 : 90

  const [records, setRecords] = useState(() => load(storageKey))
  const [date, setDate] = useState(todayString())
  const [thyroidLevel, setThyroidLevel] = useState('')
  const [showAllHistory, setShowAllHistory] = useState(false)
  const [closing, setClosing] = useState(false)
  const sheetRef = useRef(null)

  // Sync records when opening
  useEffect(() => {
    if (isOpen) {
      setRecords(load(storageKey))
      setClosing(false)
    }
  }, [isOpen, storageKey])

  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date))
  const visibleHistory = showAllHistory ? sorted : sorted.slice(0, 4)

  function handleClose() {
    setClosing(true)
    setTimeout(() => {
      onClose()
      setClosing(false)
    }, 250)
  }

  function handleLog(e) {
    e.preventDefault()
    if (!date) return
    if (!isSolensia && thyroidLevel === '') return

    const entry = isSolensia
      ? { id: generateId(), date }
      : { id: generateId(), date, thyroidLevel: parseFloat(thyroidLevel) }

    const updated = [...records, entry]
    setRecords(updated)
    save(storageKey, updated)
    setDate(todayString())
    setThyroidLevel('')
    onDataChange()
  }

  function handleDelete(id) {
    if (!window.confirm(`Delete this ${isSolensia ? 'injection' : 'blood test'} record?`)) return
    const updated = records.filter((r) => r.id !== id)
    setRecords(updated)
    save(storageKey, updated)
    onDataChange()
  }

  if (!isOpen) return null

  const Icon = isSolensia ? Syringe : Droplets
  const title = isSolensia ? 'Pain management' : 'Blood tests'
  const accentBg = isSolensia ? 'bg-terracotta-bg' : 'bg-sage-bg'
  const accentText = isSolensia ? 'text-terracotta' : 'text-sage-dark'
  const buttonBg = isSolensia ? 'bg-terracotta hover:bg-terracotta-dark' : 'bg-sage-dark hover:bg-sage'
  const focusBorder = isSolensia ? 'focus:border-terracotta' : 'focus:border-sage'

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className={`absolute inset-0 sheet-overlay ${closing ? 'overlay-exit' : 'overlay-enter'}`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[10px] max-h-[85vh] flex flex-col ${closing ? 'sheet-exit' : 'sheet-enter'}`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-warm-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${accentBg}`}>
              <Icon size={16} className={accentText} />
            </div>
            <h2 className="font-display text-[20px] font-semibold text-warm-800">{title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-warm-100 text-warm-400 transition-colors hover:bg-warm-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-8">
          {/* History */}
          {sorted.length > 0 && (
            <div className="mb-6">
              <p className="text-[11px] font-semibold tracking-wide text-warm-400 mb-3">
                History
              </p>
              <div className="space-y-0">
                {visibleHistory.map((record, index) => (
                  <div
                    key={record.id}
                    className="timeline-item flex items-center gap-3 py-2.5 pl-2"
                  >
                    <div className={`relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[10px] ${accentBg}`}>
                      <div className={`h-2 w-2 rounded-full ${isSolensia ? 'bg-terracotta' : 'bg-sage'}`} />
                    </div>
                    <div className="flex flex-1 items-center justify-between rounded-[10px] bg-cream px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm font-medium text-warm-700">
                          {formatDate(record.date)}
                        </span>
                        {!isSolensia && record.thyroidLevel !== undefined && (
                          <span className="rounded-[10px] bg-cream-dark px-2 py-0.5 text-[11px] font-semibold text-warm-500">
                            T4: {record.thyroidLevel}
                          </span>
                        )}
                        {index === 0 && (
                          <span className={`rounded-[10px] ${accentBg} px-2 py-0.5 text-[10px] font-semibold ${accentText}`}>
                            Latest
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="rounded-[10px] p-1 text-warm-300 transition-colors hover:bg-overdue-bg hover:text-overdue"
                        aria-label="Delete record"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {sorted.length > 4 && (
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-[10px] py-2 text-[12px] font-medium text-warm-400 transition-colors hover:text-warm-600"
                >
                  <span>{showAllHistory ? 'Show less' : `Show all ${sorted.length} records`}</span>
                  <ChevronDown size={14} className={`transition-transform ${showAllHistory ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          )}

          {/* Log form */}
          <div className="border-t border-warm-200 pt-5">
            <p className="text-[11px] font-semibold tracking-wide text-warm-400 mb-3">
              Log new {isSolensia ? 'injection' : 'blood test'}
            </p>
            <form onSubmit={handleLog} className="space-y-3">
              {isSolensia ? (
                <div>
                  <label className="block text-[11px] font-semibold tracking-wide text-warm-400 mb-1.5">
                    Injection date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full rounded-[10px] border-2 border-warm-200 bg-cream px-4 py-3 text-sm font-medium text-warm-700 transition-colors ${focusBorder} focus:outline-none`}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wide text-warm-400 mb-1.5">
                      Test date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full rounded-[10px] border-2 border-warm-200 bg-cream px-4 py-3 text-sm font-medium text-warm-700 transition-colors ${focusBorder} focus:outline-none`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wide text-warm-400 mb-1.5">
                      T4 level (nmol/L)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={thyroidLevel}
                      onChange={(e) => setThyroidLevel(e.target.value)}
                      placeholder="e.g. 32.5"
                      className={`w-full rounded-[10px] border-2 border-warm-200 bg-cream px-4 py-3 text-sm font-medium text-warm-700 transition-colors ${focusBorder} focus:outline-none`}
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className={`flex w-full items-center justify-center gap-2 rounded-[10px] ${buttonBg} px-6 py-3 font-body text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98]`}
              >
                <Icon size={14} />
                Log {isSolensia ? 'injection' : 'blood test'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
