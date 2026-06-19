import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { BookingWidget } from '../components/amavi/BookingWidget'
import { aboutAmavi, destinations, images, experiencesContent } from '../data/amaviContent'
import { brandGuide } from '../config/brandGuide'

export default function HomePage() {
  return (
    <>
      {/* Hero Original Restaurado */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.heroMain}
            alt=""
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
            className="hero-image h-full w-full object-cover object-center brightness-[1.12] saturate-[1.08]"
          />
          {/* Escurece só à esquerda (texto) e um pouco no topo (header) — o resto da foto fica visível */}
          <div className="absolute inset-0 bg-gradient-to-r from-amavi-brown/55 via-amavi-brown/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-50% to-amavi-brown/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,159,5,0.12),transparent_50%)]" />
        </div>

        <div className="amavi-container relative z-10 flex min-h-screen flex-col justify-center pt-28 pb-16 lg:pt-32">
          <p className="animate-fade-up text-sm font-bold uppercase tracking-[0.35em] text-amavi-golden lg:text-base">
            {aboutAmavi.eyebrow}
          </p>
          <h1 className="animate-fade-up font-display mt-6 max-w-5xl text-[clamp(3rem,5.5vw,7.5rem)] leading-[0.92] text-white [animation-delay:100ms] lg:max-w-6xl">
            {aboutAmavi.title.split(' ').map((word, i) => (
              <span key={word} className={i === 2 ? 'text-amavi-amber' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="animate-fade-up mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white lg:max-w-3xl lg:text-2xl lg:leading-relaxed [animation-delay:200ms]">
            {aboutAmavi.subtitle}
          </p>
          <div className="animate-fade-up mt-12 flex flex-wrap gap-5 [animation-delay:300ms]">
            <Link
              to="/namibe"
              className="rounded-full bg-amavi-burnt px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-amavi-amber lg:px-12 lg:py-5 lg:text-base"
            >
              Namibe
            </Link>
            <Link
              to="/huambo"
              className="rounded-full border border-white/50 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white hover:text-amavi-brown lg:px-12 lg:py-5 lg:text-base"
            >
              Huambo
            </Link>
          </div>
        </div>
      </section>

      {/* About com Letras Fortes e Visíveis */}
      <section className="bg-amavi-cream py-24 md:py-32 lg:py-36">
        <div className="amavi-container grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amavi-burnt">Sobre a AMAVI</p>
            <h2 className="font-display mt-4 text-4xl text-amavi-brown md:text-5xl lg:text-6xl">
              Hospitalidade com alma angolana
            </h2>
            {/* Texto escuro puro (sem opacidade /70) para máxima legibilidade */}
            <p className="mt-6 text-lg font-medium leading-relaxed text-amavi-brown">
              {aboutAmavi.description}
            </p>
            <p className="mt-4 text-lg font-medium leading-relaxed text-amavi-brown">
              Atualmente, a AMAVI divide as suas operações entre duas regiões distintas — cada uma com a sua
              identidade, mas unidas pela mesma dedicação ao detalhe.
            </p>
            <Link
              to="/sobre"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amavi-burnt hover:text-amavi-amber"
            >
              Conhecer a nossa história <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="relative">
              <img
                src={images.brandIdentity}
                alt="Identidade visual AMAVI"
                className="rounded-3xl shadow-elegant"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-amavi-golden px-6 py-4 shadow-lg md:block">
                <p className="font-display text-3xl text-amavi-brown">2</p>
                <p className="text-xs font-bold uppercase tracking-widest text-amavi-brown">Regiões</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Destinos como Cards Arredondados */}
      <section className="bg-white py-24 md:py-32 lg:py-36">
        <div className="amavi-container">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amavi-burnt lg:text-sm">Destinos</p>
            <h2 className="font-display mt-3 text-4xl text-amavi-brown md:text-5xl lg:text-6xl">Namibe & Huambo</h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
            {destinations.map((dest, i) => (
              <ScrollReveal key={dest.id} delay={i * 120}>
                <Link to={dest.link} className="group destination-card block overflow-hidden rounded-[2.5rem]">
                  <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4] lg:aspect-[16/11]">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-90 transition-opacity group-hover:opacity-80"
                      style={{
                        background: `linear-gradient(to top, ${dest.accent} 0%, rgba(71,20,1,0.6) 50%, transparent 100%)`,
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-amavi-golden">{dest.tagline}</p>
                      <h3 className="font-display mt-2 text-5xl md:text-6xl">{dest.name}</h3>
                      <p className="mt-3 max-w-sm text-base font-medium leading-relaxed text-white">
                        {dest.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {dest.properties.map((p) => (
                          <span
                            key={p}
                            className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-amavi-brown transition-transform group-hover:scale-105">
                        Explorar destino <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experiências teaser */}
      <section className="bg-amavi-brown py-24 text-amavi-cream md:py-32 lg:py-36">
        <div className="amavi-container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amavi-golden">
                Experiências
              </p>
              <h2 className="font-display mt-3 text-4xl text-white md:text-5xl lg:text-6xl">
                Turismo, natureza & responsabilidade social
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-white/90">
                Das Pedras de Kandumbo à praia Otchimba — experiências autênticas geridas pela AMAVI com
                impacto na comunidade local.
              </p>
              <Link
                to="/experiencias"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-amavi-golden px-8 py-4 text-sm font-bold uppercase tracking-wider text-amavi-brown transition hover:bg-amavi-amber shadow-lg"
              >
                Ver todas as experiências <ArrowUpRight size={18} />
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <img
                src={images.kandumbo}
                alt="Pedras de Kandumbo"
                className="rounded-[2.5rem] object-cover shadow-2xl border border-white/10"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Booking com Contraste Forte */}
      <section className="bg-amavi-sand py-24 md:py-32 lg:py-36">
        <div className="amavi-container">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <ScrollReveal className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amavi-burnt">Reservas</p>
              <h2 className="font-display mt-3 text-4xl text-amavi-brown md:text-5xl">
                A sua estadia começa aqui
              </h2>
              <p className="mt-5 text-lg font-medium leading-relaxed text-amavi-brown">
                Plataforma integrada de reservas para todas as propriedades AMAVI em Namibe e Huambo.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100} className="lg:col-span-3">
              <BookingWidget accent={brandGuide.colors.brown} />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
