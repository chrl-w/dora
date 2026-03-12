import { Home, Clock, Settings } from 'lucide-react'

export default function BottomNav({ active = 'home' }) {
  const items = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'history', label: 'History', Icon: Clock },
    { id: 'settings', label: 'Settings', Icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-warm-200/60 bottom-nav z-40">
      <div className="mx-auto max-w-[420px] flex items-center justify-around px-4 pt-2">
        {items.map(({ id, label, Icon }) => {
          const isActive = id === active
          return (
            <button
              key={id}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${
                isActive ? 'text-terracotta' : 'text-warm-300'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
