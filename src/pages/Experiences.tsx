import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { experiencesContent } from '../data/amaviContent'

export default function ExperiencesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-amavi-brown pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(242,159,5,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amavi-terracotta">
            {experiencesContent.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl text-white md:text-7xl">
            {experiencesContent.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">{experiencesContent.intro}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="space-y-24 md:space-y-32">
            {experiencesContent.experiences.map((exp, index) => (
              <ScrollReveal key={exp.id}>
                <article
                  id={exp.id}
                  className={`grid items-center gap-12 lg:grid-cols-12 ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="lg:col-span-7">
                    <div className="relative overflow-hidden rounded-[2rem]">
                      <img
                        src={exp.image}
                        alt={exp.name}
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <span
                        className="absolute left-6 top-6 rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white"
                        style={{ backgroundColor: exp.accent }}
                      >
                        {exp.region}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <h2 className="font-display text-4xl text-amavi-brown md:text-5xl">{exp.name}</h2>
                    <p className="mt-5 text-amavi-brown/70 leading-relaxed">{exp.description}</p>

                    <div className="mt-6">
                      <p className="font-display text-3xl" style={{ color: exp.accent }}>
                        {exp.price}
                        {exp.unit && (
                          <span className="text-base font-normal text-amavi-brown/50"> {exp.unit}</span>
                        )}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-2">
                      {exp.managed.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-amavi-brown/65">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: exp.accent }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {exp.region === 'Namibe' && (
                      <Link
                        to="/casa-2"
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amavi-burnt hover:text-amavi-amber"
                      >
                        Ver Casa 2 <ArrowUpRight size={16} />
                      </Link>
                    )}
                    {exp.region === 'Huambo' && exp.id === 'kandumbo' && (
                      <Link
                        to="/a-residencies"
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amavi-amber hover:text-amavi-golden"
                      >
                        Ver A Residencies <ArrowUpRight size={16} />
                      </Link>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
