import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();
  const [currentYear, setCurrentYear] = useState<string>("2026"); // Safe fallback matching execution timeline
  
  const sections = ["home", "about", "services", "gallery", "contact"] as const;

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const socialChannels = [
    { Icon: Instagram, href: "https://www.instagram.com/mohcine_tazi?igsh=MTk4c2x0OHlwYWtkcg==", ariaLabel: "Follow Tritor on Instagram" },
    { Icon: Facebook, href: "https://facebook.com", ariaLabel: "Follow Tritor on Facebook" },
    { Icon: Linkedin, href: "https://linkedin.com", ariaLabel: "Connect with Tritor on LinkedIn" },
  ];

  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 px-6 sm:px-12 md:px-16 border-t border-white/5" aria-label="Site Footer">
      {/* Structural Accent Rule */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric Swiss Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-x-8 gap-y-16 items-start pb-20">
          
          {/* Column 1: Core Brand Identity & Social Signifiers */}
          <div className="md:col-span-3 lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-light text-xl tracking-[0.4em] text-gold block select-none">
                TRITOR
              </span>
              <p className="text-xs font-light tracking-wide text-offwhite/40 max-w-xs leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>
            
            {/* Elegant Borderless Social Tray */}
            <div className="flex items-center gap-5 pt-2">
              {socialChannels.map(({ Icon, href, ariaLabel }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="text-offwhite/30 hover:text-gold hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >
                  <Icon size={16} strokeWidth={1.2} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Editorial Navigation Schema */}
          <div className="md:col-span-1 lg:col-span-3 space-y-5">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-light">
              {t.footer.quickLinks}
            </h3>
            <nav aria-label="Footer Navigation Links">
              <ul className="space-y-3.5">
                {sections.map((key) => (
                  <li key={key}>
                    <a 
                      href={`#${key}`} 
                      className="text-xs font-light text-offwhite/50 tracking-wide hover:text-gold transition-colors duration-300 block py-0.5"
                    >
                      {t.nav[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Communication & Spatial Vectors */}
          <div className="md:col-span-2 lg:col-span-4 space-y-5">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-light">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3.5 text-xs font-light text-offwhite/50 tracking-wide leading-relaxed">
              <li>
                <a
                  href="tel:+212650460950"
                  className="hover:text-gold transition-colors duration-300 block py-0.5"
                >
                  +212 650 460 950
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@tritor.ma"
                  className="hover:text-gold transition-colors duration-300 block py-0.5"
                >
                  contact@tritor.ma
                </a>
              </li>
              <li className="text-offwhite/40 pt-1 border-t border-white/5 mt-2 max-w-xs">
                {t.contact.info.addressValue}
              </li>
            </ul>
          </div>

        </div>

        {/* Balanced Structural Baseline Panel */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] tracking-[0.15em] text-white/20 font-light uppercase">
          <div>
            © {currentYear} TRITOR — {t.footer.rights}
          </div>
          <div className="flex items-center gap-6 text-white/10">
            <span className="hover:text-gold transition-colors duration-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold transition-colors duration-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}