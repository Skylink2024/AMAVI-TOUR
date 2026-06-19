import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Calendar, Loader2, LogOut, User } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { useMyReservations } from '../hooks/useAnalytics'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { AmaviLogo } from '../components/amavi/AmaviLogo'

const statusLabel: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  paid: 'Paga',
  cancelled: 'Cancelada',
}

const statusColor: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-600',
}

export default function ContaPage() {
  const navigate = useNavigate()
  const { user, profile, loading, signOut, isAuthenticated } = useUser()
  const { data: reservations, isLoading: loadingReservations } = useMyReservations(user?.id)

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/entrar', { replace: true })
  }, [loading, isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amavi-cream">
        <Loader2 className="h-8 w-8 animate-spin text-amavi-burnt" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-amavi-cream">
      <header className="border-b border-amavi-brown/10 bg-white py-4">
        <div className="amavi-container flex items-center justify-between">
          <AmaviLogo />
          <div className="flex items-center gap-4">
            <Link to="/reservar" className="text-sm font-bold text-amavi-burnt hover:underline">
              Nova reserva
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut size={14} />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="amavi-container py-12 lg:py-16">
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amavi-brown text-white">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-14 w-14 rounded-full object-cover" />
            ) : (
              <User size={28} />
            )}
          </div>
          <div>
            <h1 className="font-display text-3xl text-amavi-brown lg:text-4xl">
              Olá, {profile?.full_name || user?.email?.split('@')[0]}
            </h1>
            <p className="mt-1 text-amavi-brown/70">{user?.email}</p>
          </div>
        </div>

        <Card className="border-amavi-brown/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amavi-brown">
              <Calendar size={20} />
              As minhas reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingReservations ? (
              <p className="text-sm text-amavi-brown/60">A carregar reservas...</p>
            ) : !reservations?.length ? (
              <div className="py-8 text-center">
                <p className="text-amavi-brown/70">Ainda não tem reservas.</p>
                <Link
                  to="/reservar"
                  className="mt-4 inline-block rounded-full bg-amavi-burnt px-6 py-3 text-sm font-bold text-white"
                >
                  Fazer primeira reserva
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amavi-brown/10 bg-white p-5"
                  >
                    <div>
                      <p className="font-bold text-amavi-brown">
                        {r.property_label || r.property_slug}
                      </p>
                      <p className="mt-1 text-sm text-amavi-brown/70">
                        {format(new Date(r.check_in), 'dd MMM yyyy', { locale: pt })}
                        {r.check_out &&
                          ` — ${format(new Date(r.check_out), 'dd MMM yyyy', { locale: pt })}`}
                        {' · '}
                        {r.guests} hóspede{r.guests !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusColor[r.status]}`}
                    >
                      {statusLabel[r.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
