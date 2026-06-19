import { ArrowRight, Home, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useHeroSection } from "../hooks/useContent";
import { useAdmin } from "../context/AdminContext";
import heroFallback from "../assets/hero-mr-angola.png";

const DEFAULT_HERO_EYEBROW = "Culture · Identity · Legacy";

export function Hero() {
  const { data: hero } = useHeroSection();
  const { user } = useAdmin();
  const [firstTitleWord = "MR", ...restTitleWords] = (hero?.title || "MR ANGOLA").split(" ");
  const secondTitleLine = restTitleWords.join(" ") || "ANGOLA";
  const heroImageSrc = hero?.image_url?.trim() ? hero.image_url : heroFallback;
  const eyebrowText = hero?.eyebrow?.trim() ? hero.eyebrow : DEFAULT_HERO_EYEBROW;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImageSrc}
          alt="Mr Angola dancing kizomba at sunset"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-radial-gold opacity-60" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-primary text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            {eyebrowText}
          </p>
          <h1 className="font-display text-7xl md:text-9xl leading-[0.85] tracking-tight">
            <span className="block text-foreground">{firstTitleWord}</span>
            <span className="block text-gold-gradient">{secondTitleLine}</span>
          </h1>
          <div className="mt-8 h-px w-24 bg-gradient-gold" />
          <p className="mt-8 text-lg text-foreground/80 max-w-md leading-relaxed">
            {hero?.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={hero?.cta_link || "#events"}
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 font-medium tracking-wider text-sm uppercase shadow-gold hover:shadow-[0_15px_50px_-10px_oklch(0.85_0.15_85_/_0.6)] transition-all"
            >
              {hero?.cta_text || "Discover the story"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center gap-3 border border-primary text-primary px-8 py-4 font-medium tracking-wider text-sm uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Explore courses
            </a>
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10 [writing-mode:vertical-rl] rotate-180">
        <span className="text-primary text-xs tracking-[0.5em] uppercase">Angola to the world</span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-background/40 px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-primary backdrop-blur-sm hover:bg-primary/15 transition-colors"
          >
            <Home size={16} aria-hidden />
            Home
          </Link>
          {user && (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-background/40 px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-primary backdrop-blur-sm hover:bg-primary/15 transition-colors"
            >
              <LayoutDashboard size={16} aria-hidden />
              Admin dashboard
            </Link>
          )}
        </div>
        <span className="text-primary text-xl tracking-[0.5em] hidden sm:inline" aria-hidden>
          ⋈⋈
        </span>
      </div>
    </section>
  );
}