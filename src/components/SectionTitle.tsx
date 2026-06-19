interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionTitle({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center mx-auto" : ""} max-w-2xl`}>
      {eyebrow && (
        <div className="text-primary text-xs tracking-[0.4em] uppercase mb-4">{eyebrow}</div>
      )}
      <h2 className="font-display text-4xl md:text-6xl tracking-wide">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground mt-4 text-base md:text-lg">{subtitle}</p>
      )}
      <div className={`mt-6 h-px w-20 bg-gradient-gold ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}
