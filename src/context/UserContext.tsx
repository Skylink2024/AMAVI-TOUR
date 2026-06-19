import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { supabase, getSupabaseConnectionErrorMessage } from '../lib/supabase'
import type { Profile } from '../types/analytics'

interface AuthUser {
  id: string
  email: string
}

interface UserContextType {
  user: AuthUser | null
  profile: Profile | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.error('Erro ao carregar perfil:', error)
    return null
  }
  return data as Profile | null
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    const {
      data: { user: current },
    } = await supabase.auth.getUser()

    if (!current) {
      setProfile(null)
      return
    }

    const p = await fetchProfile(current.id)
    setProfile(p)
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { user: current },
        } = await supabase.auth.getUser()

        if (current) {
          setUser({ id: current.id, email: current.email || '' })
          const p = await fetchProfile(current.id)
          setProfile(p)
        }
      } catch (error) {
        console.error('Erro na sessão do utilizador:', error)
      } finally {
        setLoading(false)
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' })
        const p = await fetchProfile(session.user.id)
        setProfile(p)
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(getSupabaseConnectionErrorMessage(error))
    if (data.user) {
      setUser({ id: data.user.id, email: data.user.email || '' })
      const p = await fetchProfile(data.user.id)
      setProfile(p)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/entrar`,
      },
    })
    if (error) throw new Error(getSupabaseConnectionErrorMessage(error))

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: 'guest',
      })
      if (data.session) {
        setUser({ id: data.user.id, email: data.user.email || '' })
        const p = await fetchProfile(data.user.id)
        setProfile(p)
      }
    }
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/entrar`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (error) throw new Error(getSupabaseConnectionErrorMessage(error))
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser deve ser usado dentro de UserProvider')
  return ctx
}
