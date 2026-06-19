import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { toast } from 'sonner'
import { AmaviLogo } from '../components/amavi/AmaviLogo'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export default function EntrarPage() {
  const navigate = useNavigate()
  const { signIn, signUp, signInWithGoogle, isAuthenticated, loading } = useUser()
  const [tab, setTab] = useState<'entrar' | 'registar'>('entrar')
  const [busy, setBusy] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
  })

  useEffect(() => {
    if (isAuthenticated) navigate('/conta', { replace: true })
  }, [isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amavi-cream text-amavi-brown">
        <Loader2 className="h-8 w-8 animate-spin text-amavi-burnt" />
      </div>
    )
  }

  if (isAuthenticated) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      await signIn(loginForm.email, loginForm.password)
      toast.success('Bem-vindo de volta!')
      navigate('/conta')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Não foi possível entrar')
    } finally {
      setBusy(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirm) {
      toast.error('As palavras-passe não coincidem')
      return
    }
    if (registerForm.password.length < 6) {
      toast.error('A palavra-passe deve ter pelo menos 6 caracteres')
      return
    }
    setBusy(true)
    try {
      await signUp(registerForm.email, registerForm.password, registerForm.fullName)
      toast.success('Conta criada! Verifique o email se necessário.')
      navigate('/conta')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Não foi possível criar conta')
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setBusy(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro com Google')
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-amavi-cream">
      <header className="border-b border-amavi-brown/10 bg-white/95 py-4">
        <div className="amavi-container flex items-center justify-between">
          <AmaviLogo />
          <Link to="/" className="text-sm font-bold text-amavi-burnt hover:underline">
            Voltar ao site
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-amavi-brown/10 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-3xl text-amavi-brown">A sua conta AMAVI</CardTitle>
            <CardDescription>
              Entre ou crie conta para gerir reservas e acompanhar pedidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as 'entrar' | 'registar')}>
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="entrar">Entrar</TabsTrigger>
                <TabsTrigger value="registar">Criar conta</TabsTrigger>
              </TabsList>

              <TabsContent value="entrar">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="nome@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Palavra-passe</Label>
                    <Input
                      id="login-password"
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={busy}
                    className="w-full bg-amavi-brown hover:bg-amavi-burnt"
                  >
                    {busy ? 'A entrar...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="registar">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Nome completo</Label>
                    <Input
                      id="reg-name"
                      required
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Palavra-passe</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      required
                      minLength={6}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm">Confirmar palavra-passe</Label>
                    <Input
                      id="reg-confirm"
                      type="password"
                      required
                      value={registerForm.confirm}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={busy}
                    className="w-full bg-amavi-brown hover:bg-amavi-burnt"
                  >
                    {busy ? 'A criar conta...' : 'Criar conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-amavi-brown/15" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-white px-3 text-amavi-brown/50">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-3 border-amavi-brown/20 py-6 text-amavi-brown hover:bg-amavi-sand"
            >
              <GoogleIcon />
              Continuar com Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
