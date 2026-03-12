export const SOLENSIA_KEY = 'dora-solensia'
export const BLOODTEST_KEY = 'dora-bloodtests'

export function load(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function generateId() {
  return crypto.randomUUID()
}

export function todayString() {
  return new Date().toISOString().split('T')[0]
}

export function daysUntilNext(dateString, intervalDays) {
  const next = new Date(dateString)
  next.setDate(next.getDate() + intervalDays)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  next.setHours(0, 0, 0, 0)
  return Math.ceil((next - today) / (1000 * 60 * 60 * 24))
}

export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  })
}
