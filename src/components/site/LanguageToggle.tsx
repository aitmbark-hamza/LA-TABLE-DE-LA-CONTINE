import { useLang } from "@/i18n/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex items-center rounded-full border border-gold/60 p-0.5 text-xs font-semibold tracking-wide ${className}`}
    >
      <button
        onClick={() => setLang("fr")}
        className={`px-3 py-1.5 rounded-full transition-colors ${
          lang === "fr" ? "bg-gold text-background" : "text-gold hover:text-gold-glow"
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => setLang("ar")}
        className={`px-3 py-1.5 rounded-full transition-colors font-arabic ${
          lang === "ar" ? "bg-gold text-background" : "text-gold hover:text-gold-glow"
        }`}
        style={{ fontFamily: "Noto Naskh Arabic, Cairo, serif" }}
        aria-label="العربية"
      >
        عر
      </button>
    </div>
  );
}
