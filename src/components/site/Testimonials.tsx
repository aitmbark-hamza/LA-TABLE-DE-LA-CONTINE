import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionTitle } from "./SectionTitle";

export function Testimonials() {
  const { t, dir } = useLang();
  const items = t.testimonials.items;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [items.length]);

  const prev = () => setI((x) => (x - 1 + items.length) % items.length);
  const next = () => setI((x) => (x + 1) % items.length);

  const current = items[i];

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-10 bg-background">
      <SectionTitle eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

      <div className="mt-14 max-w-3xl mx-auto relative">
        <Quote size={56} className="absolute -top-6 start-0 text-gold/30" />
        <div className="relative min-h-[260px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4"
            >
              <p className="text-xl sm:text-2xl md:text-[1.65rem] leading-[1.5] text-offwhite/90 font-display italic">
                « {current.quote} »
              </p>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">{current.name}</div>
                <div className="text-xs text-muted-foreground">{current.event}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={prev} className="p-2 text-gold/70 hover:text-gold" aria-label="Prev">
            {dir === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <div className="flex gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-1.5 bg-gold/30"}`}
                aria-label={`Témoignage ${k + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="p-2 text-gold/70 hover:text-gold" aria-label="Next">
            {dir === "rtl" ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </div>
    </section>
  );
}
