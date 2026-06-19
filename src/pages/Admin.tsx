import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAdmin, isAdminBypassEnabled } from '../context/AdminContext'
import { AdminLayout, type AdminSection } from '../components/admin/AdminLayout'

const AdminAnalytics = lazy(() => import('./admin/AdminAnalytics'))
const AdminReservationsEditor = lazy(() => import('./admin/AdminReservationsEditor'))
const AdminHeroEditor = lazy(() => import('./admin/AdminHeroEditor'))
const AdminAboutEditor = lazy(() => import('./admin/AdminAboutEditor'))
const AdminDancesEditor = lazy(() => import('./admin/AdminDancesEditor'))
const AdminEventsEditor = lazy(() => import('./admin/AdminEventsEditor'))
const AdminCoursesEditor = lazy(() => import('./admin/AdminCoursesEditor'))
const AdminGalleryEditor = lazy(() => import('./admin/AdminGalleryEditor'))
const AdminHotelsEditor = lazy(() => import('./admin/AdminHotelsEditor'))
const AdminTeamEditor = lazy(() => import('./admin/AdminTeamEditor'))
const AdminMaterialsEditor = lazy(() => import('./admin/AdminMaterialsEditor'))
const AdminGuestsEditor = lazy(() => import('./admin/AdminGuestsEditor'))

function SectionLoader() {
  return (
    <div className="flex items-center justify-center gap-2 py-20 text-amavi-brown/60">
      <Loader2 className="h-5 w-5 animate-spin text-amavi-burnt" />
      <span className="text-sm">A carregar...</span>
    </div>
  )
}

function renderSection(section: AdminSection) {
  switch (section) {
    case 'analytics':
      return <AdminAnalytics />
    case 'reservations':
      return <AdminReservationsEditor />
    case 'hero':
      return <AdminHeroEditor />
    case 'about':
      return <AdminAboutEditor />
    case 'dances':
      return <AdminDancesEditor />
    case 'events':
      return <AdminEventsEditor />
    case 'courses':
      return <AdminCoursesEditor />
    case 'gallery':
      return <AdminGalleryEditor />
    case 'hotels':
      return <AdminHotelsEditor />
    case 'team':
      return <AdminTeamEditor />
    case 'guests':
      return <AdminGuestsEditor />
    case 'materials':
      return <AdminMaterialsEditor />
    default:
      return <AdminAnalytics />
  }
}

export default function AdminPage() {
  const { isAdmin, user, logout, loading, enterWithoutPassword } = useAdmin()
  const navigate = useNavigate()
  const [section, setSection] = useState<AdminSection>('analytics')

  useEffect(() => {
    if (!loading && !isAdmin && isAdminBypassEnabled) {
      enterWithoutPassword()
    }
  }, [loading, isAdmin, enterWithoutPassword])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 bg-[#f4f0eb] text-amavi-brown">
        <Loader2 className="h-8 w-8 animate-spin text-amavi-burnt" />
        <p className="text-sm font-medium">A carregar CRM...</p>
      </div>
    )
  }

  if (!isAdmin || !user) {
    navigate('/admin/login')
    return null
  }

  const handleLogout = async () => {
    await logout()
    if (isAdminBypassEnabled) {
      navigate('/')
    } else {
      navigate('/admin/login')
    }
  }

  return (
    <AdminLayout
      active={section}
      onNavigate={setSection}
      userEmail={user.email}
      onLogout={handleLogout}
    >
      <Suspense fallback={<SectionLoader />}>{renderSection(section)}</Suspense>
    </AdminLayout>
  )
}
