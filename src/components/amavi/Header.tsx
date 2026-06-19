import { useState, useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'
import { AmaviLogo } from './AmaviLogo'
import { useUser } from '../../context/UserContext'

const navLinks = [
  { to: '/namibe', label: 'Namibe' },
  { to: '/huambo', label: 'Huambo' },
  { to: '/guia-turistico', label: 'Guia Turístico' },
  { to: '/experiencias', label: 'Experiências' },
  { to: '/sobre', label: 'Sobre Nós' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useUser()

  // Verifica se estamos numa página com herói escuro no topo
  const isDarkHeroTop = 
    location.pathname === '/' || 
    location.pathname === '/experiencias' ||
    location.pathname === '/sobre' ||
    location.pathname === '/guia-turistico'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  // O header fica transparente no topo (se a imagem for escura) ou castanho sólido quando faz scroll
  const headerBg = scrolled 
    ? 'bg-amavi-brown py-3 shadow-[0_4px_24px_rgba(71,20,1,0.35)]' 
    : isDarkHeroTop 
      ? 'bg-transparent py-5' 
      : 'bg-amavi-brown py-4' // Para páginas que não têm herói escuro

  return (
    <header className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${headerBg}`}>
      <div className="amavi-container flex items-center justify-between gap-6">
        <AmaviLogo light={true} />

        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-[0.14em] transition-colors lg:text-[0.9rem] ${
                  isActive ? 'text-amavi-golden' : 'text-white hover:text-amavi-golden'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/reservar"
            className="rounded-full bg-amavi-golden px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-amavi-brown transition hover:bg-white"
          >
            Reservar
          </NavLink>

          <Link
            to={isAuthenticated ? '/conta' : '/entrar'}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:text-amavi-golden"
          >
            <User size={16} />
            {isAuthenticated ? 'Conta' : 'Entrar'}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-white lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-2 max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-amavi-brown p-5 shadow-2xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={close}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'bg-amavi-golden/10 text-amavi-golden' : 'text-white hover:bg-white/5 hover:text-amavi-golden'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/reservar"
              onClick={close}
              className="mt-4 rounded-full bg-amavi-golden px-5 py-4 text-center text-sm font-bold uppercase tracking-wider text-amavi-brown"
            >
              Reservar Agora
            </NavLink>

            <NavLink
              to={isAuthenticated ? '/conta' : '/entrar'}
              onClick={close}
              className="mt-2 rounded-lg px-4 py-3 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-white/5"
            >
              {isAuthenticated ? 'A minha conta' : 'Entrar / Registar'}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
