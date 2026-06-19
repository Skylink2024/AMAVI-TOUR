import { Header } from "./Header";
import { ReactNode } from "react";

export function PageShell({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <section className="pt-40 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gold opacity-50" />
          <div className="container mx-auto px-6 relative text-center">
            {eyebrow && <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{eyebrow}</p>}
            <h1 className="font-display text-6xl md:text-8xl text-gold-gradient">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">{subtitle}</p>}
            <div className="mt-8 h-px w-24 bg-gradient-gold mx-auto" />
          </div>
        </section>
        <section className="pb-24">
          <div className="container mx-auto px-6">{children}</div>
        </section>
      </main>
    </div>
  );
}
