import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, MapPin, Check, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import { toast } from 'sonner'
import { Calendar as CalendarUi } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useCreateReservation } from '../../hooks/useAnalytics'
import { useUser } from '../../context/UserContext'

const properties = [
  { id: 'casa2-casal', label: 'Casa 2 — Quarto Casal', region: 'Namibe', price: 35000 },
  { id: 'casa2-solteiro', label: 'Casa 2 — Quarto Solteiro', region: 'Namibe', price: 31500 },
  { id: 'bara-bara', label: 'Bara Bara — Guest House', region: 'Namibe', price: 60000 },
  { id: 'residencies', label: 'A Residencies — Suite Casal', region: 'Huambo', price: 40000 },
]

type BookingWidgetProps = {
  defaultProperty?: string
  accent?: string
  compact?: boolean
}

export function BookingWidget({
  defaultProperty = '',
  accent = '#471401',
  compact = false,
}: BookingWidgetProps) {
  const { user, profile } = useUser()
  const createReservation = useCreateReservation()

  const [property, setProperty] = useState(defaultProperty)
  const [guests, setGuests] = useState(2)
  const [range, setRange] = useState<DateRange | undefined>()
  const [submitted, setSubmitted] = useState(false)
  const [contact, setContact] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    phone: '',
  })

  useEffect(() => {
    if (profile?.full_name) setContact((c) => ({ ...c, name: profile.full_name! }))
    if (user?.email) setContact((c) => ({ ...c, email: user.email }))
  }, [user?.email, profile?.full_name])

  const selected = properties.find((p) => p.id === property)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!property || !range?.from || !contact.name || !contact.email) return

    try {
      await createReservation.mutateAsync({
        property_slug: property,
        property_label: selected?.label || property,
        check_in: format(range.from, 'yyyy-MM-dd'),
        check_out: range.to ? format(range.to, 'yyyy-MM-dd') : null,
        guests,
        guest_name: contact.name,
        guest_email: contact.email,
        guest_phone: contact.phone || undefined,
        amount_kz: selected?.price,
        user_id: user?.id ?? null,
      })
      setSubmitted(true)
    } catch {
      toast.error('Não foi possível enviar o pedido. Tente novamente ou contacte-nos.')
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-amavi-brown/10 bg-white p-8 text-center shadow-elegant md:p-10">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          <Check size={28} />
        </div>
        <h3 className="font-display text-2xl text-amavi-brown">Pedido recebido</h3>
        <p className="mt-3 text-sm text-amavi-brown/65">
          A nossa equipa entrará em contacto para confirmar a disponibilidade e finalizar a reserva.
        </p>
        {user && (
          <Link to="/conta" className="mt-4 inline-block text-sm font-bold text-amavi-burnt hover:underline">
            Ver na minha conta →
          </Link>
        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl border border-amavi-brown/15 bg-white shadow-[0_8px_30px_rgba(71,20,1,0.08)] ${
        compact ? 'p-5 md:p-6' : 'p-6 md:p-10'
      }`}
    >
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amavi-burnt">Reservas</p>
        <h3 className="mt-1 font-display text-3xl text-amavi-brown md:text-4xl">Reserve a sua estadia</h3>
        {!user && (
          <p className="mt-2 text-sm text-amavi-brown/60">
            <Link to="/entrar" className="font-bold text-amavi-burnt hover:underline">
              Entre na sua conta
            </Link>{' '}
            para acompanhar o pedido
          </p>
        )}
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <label className="block md:col-span-1">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-amavi-brown/80">
            Nome
          </span>
          <Input
            required
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className="border-amavi-brown/20 font-medium text-amavi-brown"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-amavi-brown/80">
            Email
          </span>
          <Input
            type="email"
            required
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="border-amavi-brown/20 font-medium text-amavi-brown"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-amavi-brown/80">
            Telefone
          </span>
          <Input
            type="tel"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            placeholder="+244 ..."
            className="border-amavi-brown/20 font-medium text-amavi-brown"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amavi-brown/80">
            <MapPin size={14} /> Propriedade
          </span>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            required
            className="w-full rounded-xl border border-amavi-brown/20 bg-white px-4 py-3.5 text-sm font-bold text-amavi-brown shadow-sm outline-none focus:border-amavi-burnt focus:ring-2 focus:ring-amavi-burnt/20"
          >
            <option value="">Selecionar...</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} — {p.price.toLocaleString('pt-PT')} KZ/noite
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amavi-brown/80">
            <Users size={14} /> Hóspedes
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-xl border border-amavi-brown/20 bg-white px-4 py-3.5 text-sm font-bold text-amavi-brown shadow-sm outline-none focus:border-amavi-burnt focus:ring-2 focus:ring-amavi-burnt/20"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'hóspede' : 'hóspedes'}
              </option>
            ))}
          </select>
        </label>

        <div className="md:col-span-2">
          <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amavi-brown/80">
            <Calendar size={14} /> Datas
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-auto w-full justify-start rounded-xl border-amavi-brown/20 bg-white px-4 py-3.5 text-left font-bold text-amavi-brown shadow-sm hover:bg-amavi-sand focus:border-amavi-burnt"
              >
                {range?.from ? (
                  range.to ? (
                    <>
                      {format(range.from, 'dd MMM', { locale: pt })} —{' '}
                      {format(range.to, 'dd MMM yyyy', { locale: pt })}
                    </>
                  ) : (
                    format(range.from, 'dd MMM yyyy', { locale: pt })
                  )
                ) : (
                  <span className="text-amavi-brown/50">Check-in — Check-out</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarUi
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {selected && (
        <p className="mt-4 text-sm text-amavi-brown/60">
          <span className="font-medium text-amavi-brown">{selected.region}</span> · a partir de{' '}
          <span className="font-semibold" style={{ color: accent }}>
            {selected.price.toLocaleString('pt-PT')} KZ
          </span>{' '}
          / noite
        </p>
      )}

      <button
        type="submit"
        disabled={!property || !range?.from || createReservation.isPending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:brightness-110 disabled:opacity-40"
        style={{ backgroundColor: accent }}
      >
        {createReservation.isPending ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            A enviar...
          </>
        ) : (
          'Solicitar reserva'
        )}
      </button>
    </form>
  )
}
