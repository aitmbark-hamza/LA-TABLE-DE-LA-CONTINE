import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function HowItWorks() {
  const { t } = useLang();
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-10 bg-[#0a0a0a]">
      <SectionTitle eyebrow={t.how.eyebrow} title={t.how.title} />

      <div className="mt-16 max-w-6xl mx-auto relative">
        {/* connecting line */}
        <div className="hidden md:block absolute top-7 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative">
          {t.how.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="flex md:flex-col items-start md:items-center gap-5 md:gap-4 md:text-center">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-background border-2 border-gold flex items-center justify-center text-gold font-display text-xl font-semibold relative z-10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute inset-0 rounded-full border border-gold/40 animate-pulse-gold" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-display font-semibold text-offwhite">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
