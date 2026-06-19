import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { isAdminBypassEnabled, withTimeout } from '../lib/adminConfig'

const BYPASS_KEY = 'amavi_admin_session'
const LOCAL_ADMIN = { id: 'local-admin', email: 'admin@amavi.co.ao' }

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

export { isAdminBypassEnabled }

function hasLocalSession(): boolean {
  try {
    return sessionStorage.getItem(BYPASS_KEY) === '1'
  } catch {
    return false
  }
}

function activateBypass(
  setUser: (u: User) => void,
  setIsAdmin: (v: boolean) => void,
) {
  try {
    sessionStorage.setItem(BYPASS_KEY, '1')
  } catch {
    /* ignore */
  }
  setUser(LOCAL_ADMIN)
  setIsAdmin(true)
}

async function checkIsAdminUser(userId: string): Promise<boolean> {
  try {
    const { data, error } = await withTimeout(
      supabase.from('profiles').select('role').eq('id', userId).maybeSingle(),
    )
    if (error) return false
    return data?.role === 'admin'
  } catch {
    return false
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const enterWithoutPassword = useCallback(() => {
    if (!isAdminBypassEnabled) return
    activateBypass(setUser, setIsAdmin)
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      if (isAdminBypassEnabled) {
        activateBypass(setUser, setIsAdmin)
        setLoading(false)
        return
      }

      if (hasLocalSession()) {
        setUser(LOCAL_ADMIN)
        setIsAdmin(true)
        setLoading(false)
        return
      }

      try {
        const {
          data: { user: supabaseUser },
        } = await withTimeout(supabase.auth.getUser())

        if (supabaseUser) {
          const admin = await checkIsAdminUser(supabaseUser.id)
          if (admin) {
            setUser({ id: supabaseUser.id, email: supabaseUser.email || '' })
            setIsAdmin(true)
          }
        }
      } catch (error) {
        console.error('Falha na verificação de autenticação:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    if (isAdminBypassEnabled) return

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
    sessionStorage.removeItem(BYPASS_KEY)
    if (!isAdminBypassEnabled) {
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
