import { useEffect, type ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdminProvider, useAdmin, isAdminBypassEnabled } from './context/AdminContext'
import { UserProvider } from './context/UserContext'
import { Toaster } from './components/ui/sonner'
import { Header } from './components/amavi/Header'
import { Footer } from './components/amavi/Footer'
import { WhatsAppButton } from './components/amavi/WhatsAppButton'
import { PageViewTracker } from './components/amavi/PageViewTracker'
import HomePage from './pages/Home'
import NamibePage from './pages/Namibe'
import HuamboPage from './pages/Huambo'
import Casa2Page from './pages/Casa2'
import ResidenciesPage from './pages/Residencies'
import ExperiencesPage from './pages/Experiences'
import ReservarPage from './pages/Reservar'
import SobrePage from './pages/Sobre'
import GuiaTuristicoPage from './pages/GuiaTuristico'
import EntrarPage from './pages/Entrar'
import ContaPage from './pages/Conta'
import AdminLoginPage from './pages/AdminLogin'
import AdminPage from './pages/Admin'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 10,
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { isAdmin, user, loading, enterWithoutPassword } = useAdmin()

  useEffect(() => {
    if (!loading && !isAdmin && isAdminBypassEnabled) {
      enterWithoutPassword()
    }
  }, [loading, isAdmin, enterWithoutPassword])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amavi-cream text-amavi-brown">
        A carregar...
      </div>
    )
  }

  if (!isAdmin || !user) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-amavi-cream">
      <PageViewTracker />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Routes>
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/sobre" element={<PublicLayout><SobrePage /></PublicLayout>} />
            <Route path="/guia-turistico" element={<PublicLayout><GuiaTuristicoPage /></PublicLayout>} />
            <Route path="/namibe" element={<PublicLayout><NamibePage /></PublicLayout>} />
            <Route path="/huambo" element={<PublicLayout><HuamboPage /></PublicLayout>} />
            <Route path="/casa-2" element={<PublicLayout><Casa2Page /></PublicLayout>} />
            <Route path="/a-residencies" element={<PublicLayout><ResidenciesPage /></PublicLayout>} />
            <Route path="/experiencias" element={<PublicLayout><ExperiencesPage /></PublicLayout>} />
            <Route path="/reservar" element={<PublicLayout><ReservarPage /></PublicLayout>} />

            <Route path="/entrar" element={<EntrarPage />} />
            <Route path="/conta" element={<ContaPage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            <Route path="/about" element={<Navigate to="/sobre" replace />} />
            <Route path="/hotels" element={<Navigate to="/casa-2" replace />} />
            <Route path="/events" element={<Navigate to="/experiencias" replace />} />
            <Route path="/gallery" element={<Navigate to="/experiencias" replace />} />
            <Route path="/courses" element={<Navigate to="/" replace />} />
            <Route path="/materials" element={<Navigate to="/" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </QueryClientProvider>
      </UserProvider>
    </AdminProvider>
  )
}

export default App
