import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

const sections = ["home", "about", "services", "gallery", "contact"] as const;

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = sections.map((k) => ({ key: k, label: t.nav[k] }));

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur border-b border-gold/15 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-4">
        {/* LOGO SECTION */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <img 
            src="/logo.png" 
            alt="TAZI Logo" 
            className="h-10 w-auto object-contain" 
          />
          <span className="font-display text-xl tracking-[0.3em] text-gold">T A Z I</span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className="relative text-sm uppercase tracking-[0.18em] text-offwhite/80 hover:text-gold transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] font-semibold rounded-full bg-gradient-to-r from-gold to-gold-glow text-background hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 transition-all"
          >
            {t.nav.cta}
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden text-gold p-2"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gold/15 bg-background/98 backdrop-blur">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                onClick={() => setOpen(false)}
                className="text-base uppercase tracking-[0.18em] text-offwhite/90 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-gold/10">
              <LanguageToggle />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold rounded-full bg-gradient-to-r from-gold to-gold-glow text-background"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}