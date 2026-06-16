import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function FloatingActions() {
  const { t } = useLang();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 z-50 flex flex-col gap-3" style={{ insetInlineEnd: "1.5rem" }}>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.floating.top}
          className="w-12 h-12 rounded-full border border-gold/50 bg-background/80 backdrop-blur text-gold hover:bg-gold hover:text-background transition-all flex items-center justify-center shadow-lg"
        >
          <ArrowUp size={18} />
        </button>
      )}
      <a
        href="https://wa.me/212650460950"
        target="_blank"
        rel="noopener"
        aria-label={t.floating.whatsapp}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] animate-pulse-gold hover:scale-110 transition-transform"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
