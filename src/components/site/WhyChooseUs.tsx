import { motion } from "framer-motion";
import { Award, Users, Sparkles, Clock, Smile, ChefHat } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionTitle } from "./SectionTitle";

const ICONS = [Award, Users, Sparkles, Clock, Smile, ChefHat];

export function WhyChooseUs() {
  const { t } = useLang();
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-10 bg-[#070707] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative">
        <SectionTitle eyebrow={t.why.eyebrow} title={t.why.title} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <motion.div
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-xl border border-gold/15 bg-card/40 backdrop-blur p-5 sm:p-7 hover:border-gold/60 hover:shadow-[0_18px_50px_-20px_rgba(212,175,55,0.4)] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 flex items-center justify-center text-gold mb-4 sm:mb-5">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold text-offwhite">{item.title}</h3>
                <p className="mt-2 sm:mt-3 text-[13px] sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
