import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { PropertyHero } from '../components/amavi/PropertyHero'
import { BookingWidget } from '../components/amavi/BookingWidget'
import { namibeHub, images } from '../data/amaviContent'

export default function NamibePage() {
  return (
    <>
      <PropertyHero
        eyebrow="Destino · Sul de Angola"
        title={namibeHub.title}
        subtitle={namibeHub.subtitle}
        image={images.heroNamibe}
        region={namibeHub.region}
        accent={namibeHub.accent}
        cta={{ label: 'Reservar em Namibe', to: '/reservar' }}
        lightOverlay
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <ScrollReveal>
            <p className="text-base leading-relaxed text-amavi-brown/80 md:text-lg">{namibeHub.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Galeria */}
      <section className="bg-amavi-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-amavi-brown md:text-4xl">Lugares de Namibe</h2>
            <p className="mt-2 text-amavi-brown/65">Praias, deserto e cidade — tudo ao alcance</p>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {namibeHub.gallery.map((img, i) => (
              <ScrollReveal key={img} delay={i * 60}>
                <div className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img
                    src={img}
                    alt=""
                    className={`w-full object-cover ${i === 0 ? 'aspect-square md:aspect-auto md:h-full md:min-h-[360px]' : 'aspect-square'}`}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-amavi-brown md:text-4xl">O que vai encontrar</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {namibeHub.highlights.map((h, i) => (
              <ScrollReveal key={h.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-amavi-brown/10 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg text-amavi-burnt">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-amavi-brown/70">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Onde ficar */}
      <section className="bg-amavi-sand/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-amavi-brown md:text-4xl">Onde ficar & viver</h2>
            <p className="mt-2 text-amavi-brown/65">Propriedades AMAVI em Namibe</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {namibeHub.stays.map((stay, i) => (
              <ScrollReveal key={stay.name} delay={i * 80}>
                <Link to={stay.link} className="group block overflow-hidden rounded-2xl bg-white shadow-elegant">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-amavi-burnt">{stay.type}</p>
                    <h3 className="font-display mt-1 text-2xl text-amavi-brown">{stay.name}</h3>
                    <p className="mt-2 text-sm text-amavi-brown/65">{stay.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amavi-burnt">
                      Ver detalhes <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <ScrollReveal>
            <BookingWidget defaultProperty="casa2-casal" accent={namibeHub.accent} />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
