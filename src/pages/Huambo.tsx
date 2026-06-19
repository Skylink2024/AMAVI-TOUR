import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { PropertyHero } from '../components/amavi/PropertyHero'
import { BookingWidget } from '../components/amavi/BookingWidget'
import { huamboHub, images } from '../data/amaviContent'

export default function HuamboPage() {
  return (
    <>
      <PropertyHero
        eyebrow="Destino · Terras Altas"
        title={huamboHub.title}
        subtitle={huamboHub.subtitle}
        image={images.heroHuambo}
        region={huamboHub.region}
        accent={huamboHub.accent}
        cta={{ label: 'Reservar em Huambo', to: '/reservar' }}
        lightOverlay
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <ScrollReveal>
            <p className="text-base leading-relaxed text-amavi-brown/80 md:text-lg">{huamboHub.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-amavi-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-amavi-brown md:text-4xl">Lugares de Huambo</h2>
            <p className="mt-2 text-amavi-brown/65">Natureza, serras e património natural</p>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {huamboHub.gallery.map((img, i) => (
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

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-amavi-brown md:text-4xl">O que vai encontrar</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {huamboHub.highlights.map((h, i) => (
              <ScrollReveal key={h.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-amavi-brown/10 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg text-amavi-amber">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-amavi-brown/70">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amavi-sand/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-amavi-brown md:text-4xl">Onde ficar & explorar</h2>
            <p className="mt-2 text-amavi-brown/65">Propriedades e experiências AMAVI em Huambo</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {huamboHub.stays.map((stay, i) => (
              <ScrollReveal key={stay.name} delay={i * 80}>
                <Link to={stay.link} className="group grid overflow-hidden rounded-2xl bg-white shadow-elegant md:grid-cols-2">
                  <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-amavi-amber">{stay.type}</p>
                    <h3 className="font-display mt-1 text-2xl text-amavi-brown">{stay.name}</h3>
                    <p className="mt-2 text-sm text-amavi-brown/65">{stay.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amavi-amber">
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
            <BookingWidget defaultProperty="residencies" accent={huamboHub.accent} />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
