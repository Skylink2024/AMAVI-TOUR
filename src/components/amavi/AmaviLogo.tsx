import { Link } from 'react-router-dom'

export function AmaviLogo({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-1 ${className}`} aria-label="AMAVI — Início">
      <span
        className={`font-display text-2xl font-extrabold tracking-[0.22em] transition-opacity group-hover:opacity-80 md:text-3xl lg:text-[2.1rem] ${
          light ? 'text-white' : 'text-amavi-brown'
        }`}
      >
        <span className="relative inline-block">
          <span className="opacity-0">A</span>
          <svg
            viewBox="0 0 28 32"
            className={`absolute left-0 top-1/2 h-[1.1em] w-[0.85em] -translate-y-1/2 ${light ? 'text-white' : 'text-amavi-brown'}`}
            aria-hidden
          >
            <path d="M2 30 L14 2 L26 30 Z" fill="currentColor" />
            <path
              d="M8 22 L14 10 L20 22 Z"
              fill={light ? '#471401' : 'var(--amavi-cream)'}
            />
          </svg>
        </span>
        MAVI
      </span>
    </Link>
  )
}
