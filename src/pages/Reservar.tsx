import { ScrollReveal } from '../components/amavi/ScrollReveal'
import { BookingWidget } from '../components/amavi/BookingWidget'
import { brandGuide } from '../config/brandGuide'

export default function ReservarPage() {
  return (
    <section className="min-h-screen bg-amavi-cream pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amavi-burnt">
            Sistema de reservas
          </p>
          <h1 className="font-display mt-3 text-4xl text-amavi-brown md:text-6xl">Reserve connosco</h1>
          <p className="mt-4 text-amavi-brown/65 leading-relaxed">
            Escolha a propriedade, as datas e o número de hóspedes. A nossa equipa confirmará a
            disponibilidade em breve.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100} className="mt-10">
          <BookingWidget accent={brandGuide.colors.brown} />
        </ScrollReveal>
      </div>
    </section>
  )
}
