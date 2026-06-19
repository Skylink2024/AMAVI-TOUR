import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type PropertyHeroProps = {
  eyebrow: string
  title: string
  subtitle?: string
  image: string
  region: string
  accent: string
  cta?: { label: string; to: string }
  /** Overlay mais leve para mostrar melhor a fotografia */
  lightOverlay?: boolean
}

export function PropertyHero({
  eyebrow,
  title,
  subtitle,
  image,
  region,
  accent,
  cta,
  lightOverlay = false,
}: PropertyHeroProps) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="hero-ken-burns h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: lightOverlay
              ? 'linear-gradient(to top, rgba(71,20,1,0.88) 0%, rgba(71,20,1,0.35) 45%, rgba(71,20,1,0.15) 100%)'
              : `linear-gradient(to top, ${accent}dd 0%, rgba(71,20,1,0.55) 40%, rgba(71,20,1,0.25) 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p
          className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: accent === '#BF4904' ? '#F2CB05' : '#F29F05' }}
        >
          {region} · {eyebrow}
        </p>
        <h1 className="font-display max-w-4xl text-[clamp(3rem,10vw,6.5rem)] leading-[0.92] text-white drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white md:text-lg">{subtitle}</p>
        )}
        {cta && (
          <Link
            to={cta.to}
            className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-all hover:gap-4"
            style={{ color: accent }}
          >
            {cta.label}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </section>
  )
}
