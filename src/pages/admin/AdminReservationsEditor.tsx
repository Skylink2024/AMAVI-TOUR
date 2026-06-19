import { useState } from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Loader2, Check, CreditCard, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  useReservations,
  useUpdateReservationStatus,
  useRecordPayment,
} from '../../hooks/useAnalytics'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import type { Reservation } from '../../types/analytics'

const statusLabel: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  paid: 'Paga',
  cancelled: 'Cancelada',
}

export default function AdminReservationsEditor() {
  const { data: reservations, isLoading } = useReservations()
  const updateStatus = useUpdateReservationStatus()
  const recordPayment = useRecordPayment()
  const [payAmount, setPayAmount] = useState<Record<string, string>>({})

  const handleConfirm = async (r: Reservation) => {
    try {
      await updateStatus.mutateAsync({ id: r.id, status: 'confirmed' })
      toast.success('Reserva confirmada')
    } catch {
      toast.error('Erro ao confirmar')
    }
  }

  const handleCancel = async (r: Reservation) => {
    try {
      await updateStatus.mutateAsync({ id: r.id, status: 'cancelled' })
      toast.success('Reserva cancelada')
    } catch {
      toast.error('Erro ao cancelar')
    }
  }

  const handlePay = async (r: Reservation) => {
    const amount = Number(payAmount[r.id]?.replace(/\D/g, '') || r.amount_kz || 0)
    if (!amount) {
      toast.error('Indique o valor em KZ')
      return
    }
    try {
      await recordPayment.mutateAsync({ reservationId: r.id, amount_kz: amount })
      toast.success('Pagamento registado')
    } catch {
      toast.error('Erro ao registar pagamento')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-amavi-burnt" />
      </div>
    )
  }

  return (
    <Card className="border-amavi-brown/10">
      <CardHeader>
        <CardTitle className="text-amavi-brown">Gestão de Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        {!reservations?.length ? (
          <p className="py-8 text-center text-sm text-amavi-brown/60">
            Nenhuma reserva recebida ainda
          </p>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-amavi-brown/10 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-amavi-brown">
                      {r.guest_name} · {r.property_label || r.property_slug}
                    </p>
                    <p className="mt-1 text-sm text-amavi-brown/70">
                      {r.guest_email}
                      {r.guest_phone && ` · ${r.guest_phone}`}
                    </p>
                    <p className="mt-2 text-sm text-amavi-brown/80">
                      {format(new Date(r.check_in), 'dd MMM yyyy', { locale: pt })}
                      {r.check_out &&
                        ` → ${format(new Date(r.check_out), 'dd MMM yyyy', { locale: pt })}`}
                      {' · '}
                      {r.guests} hóspede{r.guests !== 1 ? 's' : ''}
                    </p>
                    <p className="mt-1 text-xs text-amavi-brown/50">
                      Pedido em {format(new Date(r.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: pt })}
                    </p>
                  </div>
                  <span className="rounded-full bg-amavi-sand px-3 py-1 text-xs font-bold uppercase text-amavi-brown">
                    {statusLabel[r.status]}
                  </span>
                </div>

                {r.status !== 'paid' && r.status !== 'cancelled' && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-amavi-brown/10 pt-4">
                    {r.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleConfirm(r)}
                        disabled={updateStatus.isPending}
                      >
                        <Check size={14} />
                        Confirmar
                      </Button>
                    )}
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Valor KZ"
                        className="h-9 w-32"
                        value={payAmount[r.id] ?? ''}
                        onChange={(e) =>
                          setPayAmount({ ...payAmount, [r.id]: e.target.value })
                        }
                      />
                      <Button
                        size="sm"
                        className="gap-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handlePay(r)}
                        disabled={recordPayment.isPending}
                      >
                        <CreditCard size={14} />
                        Registar pagamento
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 text-red-600"
                      onClick={() => handleCancel(r)}
                      disabled={updateStatus.isPending}
                    >
                      <X size={14} />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
