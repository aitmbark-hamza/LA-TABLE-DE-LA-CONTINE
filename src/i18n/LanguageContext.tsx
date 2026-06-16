import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fr, type Dict } from "./locales/fr";
import { ar } from "./locales/ar";

export type Lang = "fr" | "ar";
export type Dir = "ltr" | "rtl";

type Ctx = {
  lang: Lang;
  dir: Dir;
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "tritor.lang";
const dicts: Record<Lang, Dict> = { fr, ar };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "fr" || stored === "ar") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    const dir: Dir = lang === "ar" ? "rtl" : "ltr";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: dicts[lang],
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "fr" ? "ar" : "fr")),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
