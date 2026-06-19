import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { PropertyHero } from '../components/amavi/PropertyHero'
import { BookingWidget } from '../components/amavi/BookingWidget'
import { casa2Content, images } from '../data/amaviContent'
import { brandGuide } from '../config/brandGuide'
import { Check } from 'lucide-react'

const accent = brandGuide.properties.casa2.accent

export default function Casa2Page() {
  return (
    <>
      <PropertyHero
        eyebrow={casa2Content.eyebrow}
        title={casa2Content.title}
        subtitle={casa2Content.intro}
        image={images.heroNamibe}
        region={casa2Content.region}
        accent={accent}
        cta={{ label: 'Reservar agora', to: '/reservar' }}
        lightOverlay
      />

      <section className="bg-amavi-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amavi-burnt">
              Namibe · Sul de Angola
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl text-amavi-brown md:text-5xl">
              Onde o deserto encontra o Atlântico
            </h2>
            <p className="mt-5 max-w-2xl text-amavi-brown/70 leading-relaxed">
              Namibe é uma região de contrastes únicos — dunas douradas, costa atlântica e uma herança
              arquitetónica que a Casa 2 preserva com elegância.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {casa2Content.properties.map((property, index) => (
        <section
          key={property.id}
          id={property.id}
          className={`py-20 md:py-28 ${index % 2 === 0 ? 'bg-white' : 'bg-amavi-sand/40'}`}
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <ScrollReveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>
                  {property.type}
                </p>
                <h3 className="font-display mt-2 text-4xl text-amavi-brown md:text-5xl">{property.name}</h3>
                <p className="mt-5 text-amavi-brown/70 leading-relaxed">{property.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-amavi-brown/75">
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {property.rooms.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {property.rooms.map((room) => (
                      <div
                        key={room.name}
                        className="rounded-2xl border border-amavi-brown/10 bg-amavi-cream/60 px-5 py-4"
                      >
                        <p className="text-xs uppercase tracking-wider text-amavi-brown/50">{room.name}</p>
                        <p className="font-display mt-1 text-2xl text-amavi-brown">
                          {room.price}
                          <span className="text-sm font-normal text-amavi-brown/50">{room.unit}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {property.note && (
                  <p className="mt-6 rounded-xl bg-amavi-amber/10 px-4 py-3 text-sm text-amavi-brown/75">
                    {property.note}
                  </p>
                )}
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <div className="relative overflow-hidden rounded-[2rem]">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(135deg, ${accent}, transparent)` }}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <ScrollReveal>
            <BookingWidget defaultProperty="casa2-casal" accent={accent} />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
