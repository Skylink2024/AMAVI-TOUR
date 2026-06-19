import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin, isAdminBypassEnabled } from '../context/AdminContext'
import { getSupabaseConnectionErrorMessage } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { toast } from 'sonner'
import { Home, LayoutDashboard, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login, enterWithoutPassword, isAdmin, loading } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  // Em bypass: entra directo no painel, sem password (dev e produção)
  useEffect(() => {
    if (loading) return
    if (isAdminBypassEnabled && !isAdmin) {
      enterWithoutPassword()
    }
  }, [loading, isAdmin, enterWithoutPassword])

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAdmin, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(formData.email, formData.password)
      toast.success('Sessão iniciada com sucesso!')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(getSupabaseConnectionErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || (isAdminBypassEnabled && !isAdmin)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-amavi-cream text-amavi-brown">
        <Loader2 className="h-8 w-8 animate-spin text-amavi-burnt" />
        <p className="text-sm font-medium">A abrir o painel de administração...</p>
      </div>
    )
  }

  if (isAdmin) return null

  return (
    <div className="flex min-h-screen flex-col bg-amavi-cream">
      <header className="sticky top-0 z-50 shrink-0 border-b border-amavi-brown/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-4 text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-medium text-amavi-burnt hover:underline"
          >
            <Home size={16} aria-hidden />
            Página inicial
          </Link>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 font-medium text-amavi-brown/70 hover:text-amavi-burnt"
          >
            <LayoutDashboard size={16} aria-hidden />
            Painel admin
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-amavi-brown/10">
          <CardHeader>
            <CardTitle className="text-amavi-brown">Administração AMAVI</CardTitle>
            <CardDescription>
              Inicie sessão com email e password para gerir o conteúdo do website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@amavi.co.ao"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-amavi-brown hover:bg-amavi-burnt"
                disabled={isLoading}
              >
                {isLoading ? 'A entrar...' : 'Entrar'}
              </Button>
              <p className="mt-4 text-center text-xs text-amavi-brown/60">
                Contacte a equipa AMAVI se recuperar o acesso.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
