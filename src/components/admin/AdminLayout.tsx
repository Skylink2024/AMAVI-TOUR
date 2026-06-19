import { Link } from 'react-router-dom'
import {
  BarChart3,
  CalendarCheck,
  FileText,
  Home,
  Hotel,
  Image,
  LayoutGrid,
  LogOut,
  Package,
  Sparkles,
  Star,
  Users,
  ExternalLink,
} from 'lucide-react'
import { AmaviLogo } from '../amavi/AmaviLogo'
import { brandGuide } from '../../config/brandGuide'

export type AdminSection =
  | 'analytics'
  | 'reservations'
  | 'hero'
  | 'about'
  | 'dances'
  | 'events'
  | 'courses'
  | 'gallery'
  | 'hotels'
  | 'team'
  | 'guests'
  | 'materials'

type NavItem = {
  id: AdminSection
  label: string
  icon: typeof BarChart3
  group?: 'dashboard' | 'content'
}

const navItems: NavItem[] = [
  { id: 'analytics', label: 'Métricas', icon: BarChart3, group: 'dashboard' },
  { id: 'reservations', label: 'Reservas', icon: CalendarCheck, group: 'dashboard' },
  { id: 'hero', label: 'Página Inicial', icon: Home, group: 'content' },
  { id: 'about', label: 'Sobre', icon: FileText, group: 'content' },
  { id: 'dances', label: 'Destaques', icon: Sparkles, group: 'content' },
  { id: 'events', label: 'Experiências', icon: Star, group: 'content' },
  { id: 'courses', label: 'Pacotes', icon: Package, group: 'content' },
  { id: 'gallery', label: 'Galeria', icon: Image, group: 'content' },
  { id: 'hotels', label: 'Alojamentos', icon: Hotel, group: 'content' },
  { id: 'team', label: 'Equipa', icon: Users, group: 'content' },
  { id: 'guests', label: 'Testemunhos', icon: LayoutGrid, group: 'content' },
  { id: 'materials', label: 'Materiais', icon: FileText, group: 'content' },
]

const sectionTitles: Record<AdminSection, string> = {
  analytics: 'Painel de Métricas',
  reservations: 'Gestão de Reservas',
  hero: 'Página Inicial',
  about: 'Sobre a AMAVI',
  dances: 'Destaques',
  events: 'Experiências',
  courses: 'Pacotes',
  gallery: 'Galeria',
  hotels: 'Alojamentos',
  team: 'Equipa',
  guests: 'Testemunhos',
  materials: 'Materiais',
}

type AdminLayoutProps = {
  active: AdminSection
  onNavigate: (section: AdminSection) => void
  userEmail: string
  onLogout: () => void
  children: React.ReactNode
  seeding?: boolean
}

export function AdminLayout({
  active,
  onNavigate,
  userEmail,
  onLogout,
  children,
  seeding,
}: AdminLayoutProps) {
  const dashboardItems = navItems.filter((i) => i.group === 'dashboard')
  const contentItems = navItems.filter((i) => i.group === 'content')

  return (
    <div className="flex min-h-screen bg-[#f4f0eb]">
      {/* Sidebar CRM */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-amavi-brown text-white shadow-2xl">
        <div className="border-b border-white/10 px-6 py-6">
          <div className="mb-1 opacity-90">
            <AmaviLogo light />
          </div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-amavi-golden">
            CRM · Admin
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/40">
            Dashboard
          </p>
          <ul className="mb-6 space-y-0.5">
            {dashboardItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onNavigate(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    active === id
                      ? 'bg-amavi-burnt text-white shadow-lg'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <p className="mb-2 px-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/40">
            Conteúdo do Site
          </p>
          <ul className="space-y-0.5">
            {contentItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onNavigate(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    active === id
                      ? 'bg-amavi-burnt text-white shadow-lg'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            to="/"
            target="_blank"
            className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ExternalLink size={16} />
            Ver website
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            Terminar sessão
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-[260px] flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-amavi-brown/10 bg-white/90 px-8 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl text-amavi-brown">{sectionTitles[active]}</h1>
              <p className="text-sm text-amavi-brown/60">{userEmail}</p>
            </div>
            {seeding && (
              <span className="rounded-full bg-amavi-sand px-4 py-1.5 text-xs font-bold text-amavi-brown">
                A sincronizar conteúdo...
              </span>
            )}
          </div>
        </header>

        <main className="flex-1 px-8 py-8">{children}</main>

        <footer className="border-t border-amavi-brown/10 bg-white px-8 py-4 text-center text-sm text-amavi-brown/50">
          Criado pela{' '}
          <a
            href={brandGuide.agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-amavi-burnt hover:text-amavi-amber hover:underline"
          >
            {brandGuide.agency.name}
          </a>
          {' '}— {brandGuide.agency.tagline}
        </footer>
      </div>
    </div>
  )
}
