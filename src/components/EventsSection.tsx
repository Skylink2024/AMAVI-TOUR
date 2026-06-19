import { SectionTitle } from "./SectionTitle";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEvents } from "../hooks/useContent";

function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function EventsSection() {
  const { data: events = [] } = useEvents();
  const featuredEvents = events.slice(0, 3);

  return (
    <section id="events" className="py-28 relative">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Upcoming"
          title="OUR EVENTS"
          subtitle="Live the rhythm. Book your seat at the next chapter of Angolan culture."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {featuredEvents.length === 0 ? (
            <p className="md:col-span-3 text-center text-muted-foreground py-12">
              Events will appear here once they are published in the admin dashboard.
            </p>
          ) : (
            featuredEvents.map((event) => (
            <article
              key={event.id}
              className="group relative overflow-hidden bg-card border border-border/50 hover:border-primary/60 transition-all duration-500 shadow-elegant"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent dark:from-black/70 dark:via-black/30" />
                <div className="absolute top-4 left-4 glass px-3 py-1.5 text-xs tracking-widest text-primary uppercase">
                  {formatEventDate(event.date)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl tracking-wide mb-3">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                  <MapPin size={14} className="text-primary" />
                  {event.location}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-primary font-display text-2xl">
                    ${Number(event.price).toFixed(0)}
                  </span>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors"
                  >
                    Book now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-flex items-center gap-3 text-primary text-sm tracking-[0.3em] uppercase hover:gap-5 transition-all"
          >
            <Calendar size={16} /> View all events <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}