import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { guiaTuristicoContent, contact } from '../data/amaviContent'
import { whatsappUrl } from '../components/amavi/WhatsAppButton'

export default function GuiaTuristicoPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="bg-amavi-brown py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amavi-golden">Planeie a sua viagem</p>
          <h1 className="font-display mt-3 text-4xl md:text-6xl">{guiaTuristicoContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{guiaTuristicoContent.subtitle}</p>
        </div>
      </section>

      <section className="bg-amavi-sand py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="text-base leading-relaxed text-amavi-brown md:text-lg">{guiaTuristicoContent.intro}</p>
        </div>
      </section>

      {guiaTuristicoContent.regions.map((region, ri) => (
        <section key={region.name} className={ri % 2 === 0 ? 'bg-amavi-cream py-16 md:py-24' : 'py-16 md:py-24'}>
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <ScrollReveal>
              <h2 className="font-display text-4xl text-amavi-brown md:text-5xl">{region.name}</h2>
            </ScrollReveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {region.tips.map((tip, i) => (
                <ScrollReveal key={tip.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-amavi-brown/12 bg-white p-5">
                    <h3 className="font-bold" style={{ color: region.accent }}>
                      {tip.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-amavi-brown">{tip.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amavi-brown/12 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-amavi-brown">Onde ficar</p>
              <ul className="mt-3 space-y-1">
                {region.stays.map((s) => (
                  <li key={s} className="text-sm font-medium text-amavi-brown">
                    · {s}
                  </li>
                ))}
              </ul>
              <Link
                to={region.link}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white rounded-full px-5 py-2.5"
                style={{ backgroundColor: region.accent }}
              >
                Explorar {region.name} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-amavi-brown py-16 text-white md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 space-y-4">
            {guiaTuristicoContent.faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-white/12 bg-white/5 p-5">
                <h3 className="font-bold text-amavi-golden">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{faq.a}</p>
              </div>
            ))}
          </div>

          <a
            href={whatsappUrl('Olá! Tenho uma dúvida sobre o guia turístico AMAVI.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#20bd5a]"
          >
            <MessageCircle size={18} />
            Fale connosco no WhatsApp — {contact.phone}
          </a>
        </div>
      </section>
    </div>
  )
}
