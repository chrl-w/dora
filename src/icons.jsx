export function WalkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="14" cy="5" r="2" />
      <path d="M7 21l3-4" />
      <path d="M16 21l-2-4l-3-3l1-6" />
      <path d="M6 12l2-3l4.5-1" />
    </svg>
  )
}

export function SoupIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 12a5 5 0 0 0 5 5H7a5 5 0 0 0 5-5Z" />
      <path d="M4 12h16" />
      <path d="M15 7c0-1.5-.5-3-2-3s-2 1.5-2 3" />
      <path d="M9 7c0-1.5-.5-3-2-3" />
      <path d="M9 17v5" />
      <path d="M15 17v5" />
    </svg>
  )
}

export function ChevronIcon({ className, direction = 'down' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={direction === 'up' ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
