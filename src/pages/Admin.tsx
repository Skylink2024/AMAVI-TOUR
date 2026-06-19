import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAdmin, isAdminBypassEnabled } from '../context/AdminContext'
import { AdminLayout, type AdminSection } from '../components/admin/AdminLayout'
import { useSeedDefaultContent } from '../hooks/useContent'

import AdminAnalytics from './admin/AdminAnalytics'
import AdminReservationsEditor from './admin/AdminReservationsEditor'
import AdminHeroEditor from './admin/AdminHeroEditor'
import AdminAboutEditor from './admin/AdminAboutEditor'
import AdminDancesEditor from './admin/AdminDancesEditor'
import AdminEventsEditor from './admin/AdminEventsEditor'
import AdminCoursesEditor from './admin/AdminCoursesEditor'
import AdminGalleryEditor from './admin/AdminGalleryEditor'
import AdminHotelsEditor from './admin/AdminHotelsEditor'
import AdminTeamEditor from './admin/AdminTeamEditor'
import AdminMaterialsEditor from './admin/AdminMaterialsEditor'
import AdminGuestsEditor from './admin/AdminGuestsEditor'

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
  const {
    isPending: isSeedingDefaultContent,
    isSuccess: didSeedDefaultContent,
    mutate: seedDefaultContent,
  } = useSeedDefaultContent()

  useEffect(() => {
    if (!loading && !isAdmin && isAdminBypassEnabled) {
      enterWithoutPassword()
    }
  }, [loading, isAdmin, enterWithoutPassword])

  useEffect(() => {
    if (!isAdmin || !user || isSeedingDefaultContent || didSeedDefaultContent) return

    seedDefaultContent(undefined, {
      onError: () => {
        // Fallback local já activo — seed opcional sem Supabase auth
      },
    })
  }, [didSeedDefaultContent, isAdmin, isSeedingDefaultContent, seedDefaultContent, user])

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
    navigate('/admin/login')
  }

  return (
    <AdminLayout
      active={section}
      onNavigate={setSection}
      userEmail={user.email}
      onLogout={handleLogout}
      seeding={isSeedingDefaultContent}
    >
      {renderSection(section)}
    </AdminLayout>
  )
}
