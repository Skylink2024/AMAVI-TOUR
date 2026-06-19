import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

type DropdownItem = { to: string; label: string; desc?: string }

type NavDropdownProps = {
  label: string
  to: string
  items: DropdownItem[]
  onNavigate?: () => void
}

export function NavDropdown({ label, to, items, onNavigate }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isActive = location.pathname === to || items.some((i) => location.pathname.startsWith(i.to.split('#')[0]))

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-0.5">
        <Link
          to={to}
          onClick={onNavigate}
          className={`text-[0.78rem] font-bold uppercase tracking-[0.12em] transition-colors ${
            isActive ? 'text-amavi-burnt' : 'text-amavi-brown hover:text-amavi-burnt'
          }`}
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded p-0.5 text-amavi-brown hover:text-amavi-burnt"
          aria-label={`Menu ${label}`}
        >
          <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[240px] overflow-hidden rounded-xl border border-amavi-brown/12 bg-white py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                setOpen(false)
                onNavigate?.()
              }}
              className="block px-4 py-2.5 transition-colors hover:bg-amavi-sand"
            >
              <span className="block text-sm font-semibold text-amavi-brown">{item.label}</span>
              {item.desc && <span className="block text-xs text-amavi-brown/75">{item.desc}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
