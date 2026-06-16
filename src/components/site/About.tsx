import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

interface StatItem {
  label: string;
  value: string;
}

function Counter({ value }: { value: string }) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Safe Extraction: Isolates the first continuous numeric sequence found, preserving all surroundings safely
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  
  const targetString = targetNumber.toString();
  const targetIndex = value.indexOf(targetString);
  
  const prefix = targetIndex > 0 ? value.slice(0, targetIndex) : "";
  const suffix = targetIndex !== -1 ? value.slice(targetIndex + targetString.length) : value;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || targetNumber === 0) return;

    let isMounted = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animationDuration = 1600; // Adjusted for a smoother, premium ease-out feel
          let startTime: number | null = null;

          const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min(1, (currentTime - startTime) / animationDuration);
            
            // Ultra-smooth Quintic Ease-Out curve for fluid data styling
            const easeOutQuint = 1 - Math.pow(1 - progress, 5);
            
            if (isMounted) {
              setCurrentNumber(Math.round(easeOutQuint * targetNumber));
            }

            if (progress < 1 && isMounted) {
              animationFrameId = requestAnimationFrame(step);
            }
          };

          animationFrameId = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    return () => {
      isMounted = false;
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetNumber]);

  return (
    <div 
      ref={elementRef} 
      className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight font-display text-gradient-gold tabular-nums select-none"
    >
      <span>{prefix}</span>
      <span>{targetNumber === 0 ? value : currentNumber}</span>
      <span>{suffix}</span>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  const stats: StatItem[] = t.about.stats || [];

  return (
    <section 
      id="about" 
      className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 bg-[#0a0a0a] overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Structural Accent Lines inspired by premium high-end hardware styling */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Branding Narrative & Editorial Section Header */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-4 group">
                <span className="h-[1px] w-8 bg-gold/40 group-hover:w-12 transition-all duration-500 ease-out" />
                <span id="about-eyebrow" className="text-[10px] uppercase tracking-[0.4em] text-gold font-medium">
                  {t.about.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 
                id="about-heading" 
                className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-offwhite leading-[1.12]"
              >
                {t.about.title}
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                <p className="text-sm sm:text-base text-offwhite/50 font-light tracking-wide leading-relaxed">
                  {t.about.p1}
                </p>
                <p className="text-sm sm:text-base text-offwhite/50 font-light tracking-wide leading-relaxed">
                  {t.about.p2}
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Metric Display Panel */}
          <div className="lg:col-span-5 w-full lg:pt-16">
            <Reveal delay={300}>
              {/* Removed the generic grid layout box container for a clean, unbounded typography scale */}
              <div className="divide-y divide-white/5 border-y border-white/5">
                {stats.map((stat, idx) => (
                  <div 
                    key={stat.label || idx} 
                    className="flex items-baseline justify-between py-6 sm:py-8 first:pt-2 last:pb-2 gap-4"
                  >
                    <span className="text-xs uppercase tracking-[0.25em] text-offwhite/40 font-light max-w-[180px] sm:max-w-xs">
                      {stat.label}
                    </span>
                    <div className="text-right shrink-0">
                      <Counter value={stat.value} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}