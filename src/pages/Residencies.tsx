import { Coffee, Dumbbell, Flag, Flame, Gamepad2, Leaf } from 'lucide-react'
import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { PropertyHero } from '../components/amavi/PropertyHero'
import { BookingWidget } from '../components/amavi/BookingWidget'
import { residenciesContent, images } from '../data/amaviContent'
import { brandGuide } from '../config/brandGuide'

const accent = brandGuide.properties.residencies.accent

const iconMap = {
  coffee: Coffee,
  flag: Flag,
  gamepad: Gamepad2,
  dumbbell: Dumbbell,
  leaf: Leaf,
  flame: Flame,
} as const

export default function ResidenciesPage() {
  return (
    <>
      <PropertyHero
        eyebrow={residenciesContent.eyebrow}
        title={residenciesContent.title}
        subtitle={residenciesContent.intro}
        image={images.heroHuambo}
        region={residenciesContent.region}
        accent={accent}
        cta={{ label: 'Reservar agora', to: '/reservar' }}
        lightOverlay
      />

      <section className="bg-amavi-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amavi-amber">
              Huambo · Terras Altas
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl text-amavi-brown md:text-5xl">
              Natureza, tranquilidade e conexão
            </h2>
            <p className="mt-5 max-w-2xl text-amavi-brown/70 leading-relaxed">
              Huambo oferece paisagens verdes, clima ameno e uma experiência de lodge imersa na natureza —
              longe do ritmo urbano, perto do essencial.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {residenciesContent.features.map((feature, i) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Leaf
              return (
                <ScrollReveal key={feature.title} delay={i * 60}>
                  <div className="group rounded-2xl border border-amavi-brown/8 bg-white p-6 transition hover:border-amavi-amber/40 hover:shadow-elegant">
                    <div
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${accent}18`, color: accent }}
                    >
                      <Icon size={20} />
                    </div>
                    <p className="font-medium text-amavi-brown">{feature.title}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amavi-amber">Galeria</p>
            <h2 className="font-display mt-3 text-3xl text-amavi-brown md:text-4xl">O ambiente</h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {residenciesContent.gallery.map((img, i) => (
              <ScrollReveal key={img} delay={i * 80}>
                <div
                  className={`overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <img
                    src={img}
                    alt=""
                    className={`w-full object-cover ${i === 0 ? 'aspect-[16/10] md:aspect-auto md:h-full md:min-h-[420px]' : 'aspect-[4/3]'}`}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amavi-sand/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amavi-amber">Preçário</p>
            <div className="mt-6 flex flex-wrap gap-6">
              {residenciesContent.pricing.map((item) => (
                <div
                  key={item.name}
                  className="rounded-3xl border border-amavi-brown/10 bg-white px-8 py-6 shadow-elegant"
                >
                  <p className="text-xs uppercase tracking-wider text-amavi-brown/50">{item.name}</p>
                  <p className="font-display mt-2 text-4xl text-amavi-brown">
                    {item.price}
                    <span className="text-base font-normal text-amavi-brown/50">{item.unit}</span>
                  </p>
                  <p className="mt-2 text-sm text-amavi-brown/55">Pequeno-almoço incluído</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <ScrollReveal>
            <BookingWidget defaultProperty="residencies" accent={accent} />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
