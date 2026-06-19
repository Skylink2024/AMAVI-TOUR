import { SectionTitle } from "./SectionTitle";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDances } from "../hooks/useContent";

export function DancesSection() {
  const { data: dances = [] } = useDances();

  return (
    <section id="courses" className="py-28 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-40" />
      <div className="container mx-auto px-6 relative">
        <SectionTitle
          eyebrow="Learn From The Source"
          title="THE DANCES"
          subtitle="Discover the rhythms that shaped a nation. Master them with Mr Angola."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dances.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground py-12">
              Dance listings will appear here after they are added in the admin dashboard.
            </p>
          ) : (
            dances.map((dance, i) => (
            <div
              key={dance.id}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img
                src={dance.image_url}
                alt={dance.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent dark:from-black/75 dark:via-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-3xl text-foreground mb-2">{dance.name}</h3>
                <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 transition-all duration-500 overflow-hidden">
                  {dance.description}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={16} className="text-primary" />
              </div>
            </div>
            ))
          )}
        </div>

        <div className="mt-16 text-center glass max-w-2xl mx-auto p-10 rounded-lg">
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-3">Ready to dance?</p>
          <h3 className="font-display text-3xl md:text-4xl mb-4">Take a course with Mr Angola</h3>
          <p className="text-muted-foreground mb-8">
            Private lessons, group classes, and immersive workshops worldwide.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase shadow-gold hover:opacity-90 transition-opacity"
          >
            Press to book a course <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}