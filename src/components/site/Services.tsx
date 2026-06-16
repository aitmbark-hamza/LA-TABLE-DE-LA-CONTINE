import { ChefHat, Sparkles, Heart, Wine, Utensils, Briefcase, Crown, Settings } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

const ICONS = [ChefHat, Sparkles, Heart, Wine, Utensils, Briefcase, Crown, Settings];

export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="relative py-24 sm:py-32 px-6 sm:px-10 bg-[#0a0a0a]">
      <Reveal>
        <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />
      </Reveal>

      <div className="mt-16 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {t.services.items.map((s, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          return (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group h-full rounded-xl border border-gold/15 bg-card/60 p-5 sm:p-7 transition-all duration-500 hover:border-gold hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(212,175,55,0.5)]">
                <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-4 sm:mb-5 group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold text-offwhite leading-snug">{s.title}</h3>
                <p className="mt-2 sm:mt-3 text-[13px] sm:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
