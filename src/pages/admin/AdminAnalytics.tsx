import {
  Eye,
  Users,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { useAnalyticsSummary } from '../../hooks/useAnalytics'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string
  value: string | number
  sub?: string
  icon: typeof Eye
  accent: string
}) {
  return (
    <Card className="border-amavi-brown/10">
      <CardContent className="flex items-start justify-between pt-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amavi-brown/60">{label}</p>
          <p className="font-display mt-2 text-4xl text-amavi-brown">{value}</p>
          {sub && <p className="mt-1 text-sm text-amavi-brown/60">{sub}</p>}
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          <Icon size={22} />
        </div>
      </CardContent>
    </Card>
  )
}

const statusLabel: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  paid: 'Paga',
  cancelled: 'Cancelada',
}

export default function AdminAnalytics() {
  const { data, isLoading, isError, error } = useAnalyticsSummary()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-20 text-amavi-brown/70">
        <Loader2 className="h-6 w-6 animate-spin" />
        A carregar métricas...
      </div>
    )
  }

  if (isError) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="flex items-start gap-3 py-6">
          <AlertCircle className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="font-bold text-amavi-brown">Métricas indisponíveis</p>
            <p className="mt-1 text-sm text-amavi-brown/70">
              Execute o ficheiro <code className="text-xs">SUPABASE_ANALYTICS_AUTH_MIGRATION.sql</code> no
              Supabase para activar analytics, reservas e pagamentos.
            </p>
            <p className="mt-2 text-xs text-amavi-brown/50">
              {(error as Error)?.message}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const conversionRate =
    data.uniqueVisitors > 0
      ? ((data.totalReservations / data.uniqueVisitors) * 100).toFixed(1)
      : '0'

  const paymentRate =
    data.totalReservations > 0
      ? ((data.paidReservations / data.totalReservations) * 100).toFixed(1)
      : '0'

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-amavi-brown">Painel Inteligente</h2>
        <p className="mt-1 text-sm text-amavi-brown/70">
          Visitas, reservas e pagamentos em tempo real
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Visitas ao site"
          value={data.totalViews.toLocaleString('pt-PT')}
          sub={`${data.viewsLast7Days} nos últimos 7 dias`}
          icon={Eye}
          accent="#BF4904"
        />
        <StatCard
          label="Visitantes únicos"
          value={data.uniqueVisitors.toLocaleString('pt-PT')}
          sub="Por sessão"
          icon={Users}
          accent="#F29F05"
        />
        <StatCard
          label="Pedidos de reserva"
          value={data.totalReservations}
          sub={`${data.pendingReservations} pendentes · ${conversionRate}% conversão`}
          icon={CalendarCheck}
          accent="#471401"
        />
        <StatCard
          label="Pagamentos"
          value={data.paidReservations}
          sub={`${data.revenueKz.toLocaleString('pt-PT')} KZ · ${paymentRate}% pagos`}
          icon={CreditCard}
          accent="#25a244"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-amavi-brown/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amavi-brown">
              <TrendingUp size={18} />
              Páginas mais visitadas
            </CardTitle>
            <CardDescription>Onde os visitantes passam mais tempo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.topPages.length === 0 ? (
              <p className="text-sm text-amavi-brown/60">Sem dados ainda</p>
            ) : (
              data.topPages.map((page) => {
                const pct = data.totalViews > 0 ? (page.count / data.totalViews) * 100 : 0
                return (
                  <div key={page.path}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-amavi-brown">{page.path}</span>
                      <span className="text-amavi-brown/60">{page.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-amavi-sand">
                      <div
                        className="h-full rounded-full bg-amavi-burnt transition-all"
                        style={{ width: `${Math.max(pct, 4)}%` }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        <Card className="border-amavi-brown/10">
          <CardHeader>
            <CardTitle className="text-amavi-brown">Funil de reservas</CardTitle>
            <CardDescription>Do pedido ao pagamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Pedidos recebidos', value: data.totalReservations, color: '#F29F05' },
              { label: 'Confirmadas', value: data.confirmedReservations + data.paidReservations, color: '#BF4904' },
              { label: 'Pagas', value: data.paidReservations, color: '#25a244' },
            ].map((step) => (
              <div key={step.label} className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {step.value}
                </div>
                <div>
                  <p className="font-medium text-amavi-brown">{step.label}</p>
                  {data.totalReservations > 0 && (
                    <p className="text-xs text-amavi-brown/60">
                      {((step.value / data.totalReservations) * 100).toFixed(0)}% do total
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-amavi-brown/10">
        <CardHeader>
          <CardTitle className="text-amavi-brown">Reservas recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentReservations.length === 0 ? (
            <p className="text-sm text-amavi-brown/60">Nenhuma reserva ainda</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amavi-brown/10 text-left text-xs uppercase tracking-wider text-amavi-brown/60">
                    <th className="pb-3 pr-4">Data</th>
                    <th className="pb-3 pr-4">Hóspede</th>
                    <th className="pb-3 pr-4">Propriedade</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentReservations.map((r) => (
                    <tr key={r.id} className="border-b border-amavi-brown/5">
                      <td className="py-3 pr-4 text-amavi-brown/80">
                        {format(new Date(r.created_at), 'dd/MM/yyyy HH:mm', { locale: pt })}
                      </td>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-amavi-brown">{r.guest_name}</p>
                        <p className="text-xs text-amavi-brown/60">{r.guest_email}</p>
                      </td>
                      <td className="py-3 pr-4 text-amavi-brown/80">
                        {r.property_label || r.property_slug}
                      </td>
                      <td className="py-3">
                        <span className="rounded-full bg-amavi-sand px-2 py-1 text-xs font-bold uppercase text-amavi-brown">
                          {statusLabel[r.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
