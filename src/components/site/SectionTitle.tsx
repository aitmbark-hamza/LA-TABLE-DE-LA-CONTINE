import { type ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} mb-4`}>
          <span className="gold-divider" />
          <span className="text-[0.7rem] uppercase tracking-[0.32em] text-gold font-medium">{eyebrow}</span>
          <span className="gold-divider" />
        </div>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.15] ${light ? "text-offwhite" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

export function ChildrenSection({ id, children, dark = false, className = "" }: { id?: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-28 px-6 sm:px-10 ${dark ? "bg-[#0a0a0a]" : "bg-background"} ${className}`}
    >
      {children}
    </section>
  );
}
