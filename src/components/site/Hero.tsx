import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const SLIDES = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];
// 4.5s is the sweet spot for premium crossfades (not too fast, not too boring)
const INTERVAL = 4500; 

export function Hero() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);

    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* LUXURY CROSSFADE BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Removed mode="wait" to allow true overlay crossfading (no black flash between slides) */}
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={SLIDES[index]}
            alt="HUDA premium visual"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }, // Smooth fluid transition
              scale: { duration: INTERVAL / 1000 + 1.5, ease: "linear" }, // Slow architectural zoom
            }}
          />
        </AnimatePresence>

        {/* Premium Dark Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_75%)] z-10" />
      </div>

      {/* REFINED CONTENT (STAYS ROCK SOLID ON TOP) */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-xs font-light tracking-[0.6em] text-gold uppercase mb-5 block">
            T A Z I 
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-offwhite max-w-3xl leading-[1.15]">
            {t.hero.title}
          </h1>

          <p className="mt-8 text-sm sm:text-base md:text-lg text-offwhite/50 max-w-xl font-light tracking-wide leading-relaxed mx-auto">
            {t.hero.subtitle}
          </p>
        </motion.div>

        {/* TIMELESS BUTTONS */}
        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a
            href="#contact"
            className="w-full sm:w-auto px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium bg-gold text-black rounded-none hover:bg-white transition-all duration-400 ease-out"
          >
            {t.hero.ctaPrimary}
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium border border-white/10 text-offwhite rounded-none hover:border-gold hover:text-gold transition-all duration-400 ease-out"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* FLOATING DOWN ARROW */}
      <motion.a
        href="#about"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 hover:text-gold transition-colors duration-300 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <ChevronDown size={18} strokeWidth={1} />
      </motion.a>
    </section>
  );
}