import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { MapPin, ArrowRight, Calendar, Grid3x3, List } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useEvents } from '../hooks/useContent'
import type { Event } from '../types/content'

function cityFromLocation(location: string): string {
  const first = location.split(',')[0]?.trim()
  return first || location
}

function formatEventBadge(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

type EventWithDate = Event & { dateObj: Date }

function withDateObj(e: Event): EventWithDate {
  return { ...e, dateObj: new Date(`${e.date}T12:00:00`) }
}

export default function EventsPage() {
  const { data: rawEvents = [], isLoading } = useEvents()
  const events = useMemo(() => rawEvents.map(withDateObj), [rawEvents])
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid')

  const cities = useMemo(
    () => ['All Cities', ...Array.from(new Set(events.map((e) => cityFromLocation(e.location))))],
    [events],
  )

  const filteredEvents = useMemo(() => {
    if (selectedCity === 'All Cities') return events
    return events.filter((e) => cityFromLocation(e.location) === selectedCity)
  }, [selectedCity, events])

  return (
    <PageShell
      eyebrow="Calendar"
      title="OUR EVENTS"
      subtitle="Every date. Every city. Every night a celebration of Angolan culture."
    >
      {isLoading ? (
        <div className="py-16 text-center text-muted-foreground">Loading events…</div>
      ) : events.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No events yet. Add them in the admin dashboard under Events.
        </p>
      ) : (
        <>
          <div className="mb-10 space-y-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-display tracking-widest uppercase text-muted-foreground">
                Filter by:
              </span>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 text-xs tracking-wider uppercase transition-all ${
                      selectedCity === city
                        ? 'bg-primary text-primary-foreground shadow-gold'
                        : 'border border-border bg-background hover:border-primary'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-display tracking-widest uppercase text-muted-foreground">View:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary'}`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-all ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary'}`}
                >
                  <List size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('calendar')}
                  className={`p-2 transition-all ${viewMode === 'calendar' ? 'bg-primary text-primary-foreground' : 'border border-border hover:border-primary'}`}
                >
                  <Calendar size={18} />
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'grid' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredEvents.map((e) => (
                <EventListItem key={e.id} event={e} />
              ))}
            </div>
          )}

          {viewMode === 'calendar' && <EventCalendar events={filteredEvents} />}
        </>
      )}
    </PageShell>
  )
}

function EventCard({ event }: { event: EventWithDate }) {
  return (
    <article className="group bg-card border border-border/50 hover:border-primary/60 transition-all shadow-elegant hover:shadow-gold overflow-hidden">
      <div className="relative h-64 overflow-hidden bg-muted">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-4 left-4 glass px-3 py-1.5 text-xs tracking-widest text-primary">
          {formatEventBadge(event.date)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl mb-3">{event.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin size={14} className="text-primary" /> {event.location}
        </div>
        <div className="text-xs text-muted-foreground mb-5">{event.capacity} seats available</div>
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-primary font-display text-2xl">${Number(event.price).toFixed(0)}</span>
          <Link
            to={`/booking/${event.id}`}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors shimmer-gold-hover"
          >
            Book now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}

function EventListItem({ event }: { event: EventWithDate }) {
  return (
    <div className="flex gap-6 bg-card border border-border/50 hover:border-primary/60 p-6 transition-all hover:shadow-gold">
      <div className="w-40 h-40 flex-shrink-0 bg-muted overflow-hidden">
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs tracking-widest uppercase text-primary mb-2">{formatEventBadge(event.date)}</p>
          <h3 className="font-display text-3xl mb-2">{event.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin size={14} className="text-primary" /> {event.location}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{event.time}</p>
          <p className="text-sm mb-4">
            Seats: <span className="text-primary font-display">{event.capacity}</span>
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-primary font-display text-3xl">${Number(event.price).toFixed(0)}</span>
          <Link
            to={`/booking/${event.id}`}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors"
          >
            Book now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function EventCalendar({ events }: { events: EventWithDate[] }) {
  const eventsByMonth = new Map<string, EventWithDate[]>()
  events.forEach((event) => {
    const monthKey = `${event.dateObj.getFullYear()}-${String(event.dateObj.getMonth() + 1).padStart(2, '0')}`
    if (!eventsByMonth.has(monthKey)) {
      eventsByMonth.set(monthKey, [])
    }
    eventsByMonth.get(monthKey)!.push(event)
  })

  const months = Array.from(eventsByMonth.entries()).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="space-y-8">
      {months.map(([monthKey, monthEvents]) => {
        const [year, month] = monthKey.split('-')
        const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })

        return (
          <div key={monthKey}>
            <h3 className="font-display text-3xl mb-6 text-primary">{monthName}</h3>
            <div className="space-y-3">
              {monthEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 bg-card border border-border/50 p-4 hover:border-primary/60 transition-all hover:shadow-gold"
                >
                  <div className="w-16 text-center">
                    <div className="text-2xl font-display text-primary">{event.dateObj.getDate()}</div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {event.dateObj.toLocaleString('default', { weekday: 'short' })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-xl mb-1">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.location} • {event.capacity} seats
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl text-primary mb-2">${Number(event.price).toFixed(0)}</div>
                    <Link
                      to={`/booking/${event.id}`}
                      className="inline-flex items-center gap-1 text-xs tracking-[0.15em] uppercase hover:text-primary transition-colors"
                    >
                      Book <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
