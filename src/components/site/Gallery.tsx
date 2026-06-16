import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

type Item = {
  src: string;
  cat: 1 | 2 | 3 | 4;
  titleFr: string;
  titleAr: string;
};

const ITEMS: Item[] = [
  {
    src: "/hero1.jpg",
    cat: 1,
    titleFr: "Mariage élégant",
    titleAr: "حفل زفاف راقٍ",
  },
  {
    src: "/hero2.jpg",
    cat: 2,
    titleFr: "Buffet premium",
    titleAr: "بوفيه فاخر",
  },
  {
    src: "/hero3.jpg",
    cat: 3,
    titleFr: "Cocktail & réception",
    titleAr: "كوكتيل وحفل استقبال",
  },
  {
    src: "/hero1.jpg",
    cat: 4,
    titleFr: "Événement privé",
    titleAr: "مناسبة خاصة",
  },
  {
    src: "/hero2.jpg",
    cat: 1,
    titleFr: "Réception de mariage",
    titleAr: "استقبال الزفاف",
  },
  {
    src: "/hero3.jpg",
    cat: 2,
    titleFr: "Buffet raffiné",
    titleAr: "بوفيه راقٍ",
  },
];

export function Gallery() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === 0 ? ITEMS : ITEMS.filter((i) => i.cat === filter)),
    [filter]
  );

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-6 sm:px-10 bg-background">
      <Reveal>
        <SectionTitle eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
      </Reveal>

      <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {t.gallery.filters.map((label, i) => (
          <button
            key={label}
            onClick={() => setFilter(i)}
            className={`px-5 py-2 text-xs uppercase tracking-[0.18em] rounded-full border transition-all ${
              filter === i
                ? "border-gold bg-gold text-background"
                : "border-gold/30 text-offwhite/70 hover:border-gold hover:text-gold"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-12 max-w-7xl mx-auto columns-2 lg:columns-3 gap-3 sm:gap-5 [column-fill:_balance]">
        {visible.map((item, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="group relative mb-3 sm:mb-5 block w-full break-inside-avoid overflow-hidden rounded-lg border border-gold/10 cursor-pointer"
          >
            <img
              src={item.src}
              alt={lang === "ar" ? item.titleAr : item.titleFr}
              loading="lazy"
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
              <p className="text-gold font-display text-base sm:text-lg leading-tight">
                {lang === "ar" ? item.titleAr : item.titleFr}
              </p>

              <p className="text-offwhite/70 text-[10px] uppercase tracking-[0.25em] mt-1">
                {t.gallery.filters[item.cat]}
              </p>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && visible[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 end-6 text-gold p-2"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>

          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={visible[lightbox].src}
              alt={lang === "ar" ? visible[lightbox].titleAr : visible[lightbox].titleFr}
              className="w-full max-h-[80vh] object-contain rounded-xl border border-gold/30"
            />

            <p className="mt-4 text-center text-gold font-display text-xl">
              {lang === "ar" ? visible[lightbox].titleAr : visible[lightbox].titleFr}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}