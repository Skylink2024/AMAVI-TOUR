import { Link } from 'react-router-dom'
import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { aboutAmavi, destinations, images, sobreContent } from '../data/amaviContent'

export default function SobrePage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="bg-amavi-brown py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amavi-golden">Sobre Nós</p>
          <h1 className="font-display mt-3 text-4xl md:text-6xl">{sobreContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{sobreContent.subtitle}</p>
        </div>
      </section>

      <section className="bg-amavi-sand py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
          <ScrollReveal>
            <p className="text-base leading-relaxed text-amavi-brown md:text-lg">{sobreContent.intro}</p>
            <p className="mt-4 text-base leading-relaxed text-amavi-brown">{aboutAmavi.description}</p>
            <p className="mt-6 text-sm font-bold text-amavi-burnt">{sobreContent.director}</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
              <img
                src={images.brandIdentity}
                alt="Identidade visual AMAVI"
                className="rounded-2xl shadow-elegant"
              />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl text-amavi-brown md:text-4xl">Os nossos valores</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {sobreContent.values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-amavi-brown/12 bg-amavi-cream p-6">
                  <h3 className="font-display text-xl text-amavi-burnt">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-amavi-brown">{v.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amavi-brown py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl">Onde estamos</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {destinations.map((d) => (
              <Link
                key={d.id}
                to={d.link}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <h3 className="font-display text-2xl">{d.name}</h3>
                <p className="mt-2 text-white/85">{d.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
