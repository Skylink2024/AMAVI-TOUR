import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const BYPASS_KEY = 'amavi_admin_session'
const LOCAL_ADMIN = { id: 'local-admin', email: 'admin@amavi.co.ao' }

/** Só em desenvolvimento local — nunca activar em produção */
export const isAdminBypassEnabled = import.meta.env.DEV

interface User {
  id: string
  email: string
}

interface AdminContextType {
  isAdmin: boolean
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  enterWithoutPassword: () => void
  logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

function hasLocalSession(): boolean {
  try {
    return sessionStorage.getItem(BYPASS_KEY) === '1'
  } catch {
    return false
  }
}

async function checkIsAdminUser(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.warn('Não foi possível verificar perfil admin:', error.message)
    return true
  }

  return data?.role === 'admin'
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const enterWithoutPassword = useCallback(() => {
    if (!isAdminBypassEnabled) return
    sessionStorage.setItem(BYPASS_KEY, '1')
    setUser(LOCAL_ADMIN)
    setIsAdmin(true)
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      if (isAdminBypassEnabled && hasLocalSession()) {
        setUser(LOCAL_ADMIN)
        setIsAdmin(true)
        setLoading(false)
        return
      }

      try {
        const {
          data: { user: supabaseUser },
        } = await supabase.auth.getUser()

        if (supabaseUser) {
          const admin = await checkIsAdminUser(supabaseUser.id)
          if (admin) {
            sessionStorage.removeItem(BYPASS_KEY)
            setUser({ id: supabaseUser.id, email: supabaseUser.email || '' })
            setIsAdmin(true)
          } else {
            setUser(null)
            setIsAdmin(false)
          }
        }
      } catch (error) {
        console.error('Falha na verificação de autenticação:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (hasLocalSession()) return

      if (session?.user) {
        const admin = await checkIsAdminUser(session.user.id)
        if (admin) {
          setUser({ id: session.user.id, email: session.user.email || '' })
          setIsAdmin(true)
        } else {
          setUser(null)
          setIsAdmin(false)
        }
      } else if (!hasLocalSession()) {
        setUser(null)
        setIsAdmin(false)
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    if (data.user) {
      const admin = await checkIsAdminUser(data.user.id)
      if (!admin) {
        await supabase.auth.signOut()
        throw new Error('Esta conta não tem permissões de administrador')
      }
      sessionStorage.removeItem(BYPASS_KEY)
      setUser({ id: data.user.id, email: data.user.email || '' })
      setIsAdmin(true)
    }
  }

  const logout = async () => {
    const hadLocal = hasLocalSession()
    sessionStorage.removeItem(BYPASS_KEY)
    if (!hadLocal) {
      try {
        await supabase.auth.signOut()
      } catch (error) {
        console.error('Falha ao terminar sessão:', error)
      }
    }
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AdminContext.Provider
      value={{ isAdmin, user, loading, login, enterWithoutPassword, logout }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin deve ser usado dentro de AdminProvider')
  }
  return context
}
