import { PageShell } from '../components/PageShell'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import { useHotels } from '../hooks/useContent'

export default function HotelsPage() {
  const { data: hotels = [], isLoading } = useHotels()

  return (
    <PageShell
      eyebrow="Stay"
      title="BOOK A HOTEL"
      subtitle="Sleep where the rhythm lives. Curated stays near every event."
    >
      {isLoading ? (
        <div className="py-16 text-center text-muted-foreground">Loading hotels…</div>
      ) : hotels.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No hotels listed yet. Add them in the admin dashboard under Hotels.
        </p>
      ) : (
        <div className="space-y-8">
          {hotels.map((hotel) => (
            <article
              key={hotel.id}
              className="bg-card border border-border/50 hover:border-primary/60 transition-all overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-1 bg-muted min-h-[200px]">
                  {hotel.image_url ? (
                    <img
                      src={hotel.image_url}
                      alt={hotel.name}
                      loading="lazy"
                      className="w-full h-64 object-cover"
                    />
                  ) : null}
                </div>

                <div className="md:col-span-2 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-3xl mb-2">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin size={14} className="text-primary" /> {hotel.address}
                    </div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">{hotel.description}</p>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border/50 pt-6">
                    <p className="font-display text-3xl text-primary">
                      ${Number(hotel.price_per_night).toFixed(0)}
                      <span className="text-sm font-sans text-muted-foreground font-normal"> / night</span>
                    </p>
                    <a
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
                    >
                      View & book <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  )
}
