import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, MessageCircle, Clock, Check, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(120),
  eventType: z.string().trim().min(2).max(60),
  guests: z.string().trim().min(1).max(10),
  date: z.string().trim().min(1),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const f = t.contact.fields;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200)); // Refined for natural system feedback pacing
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  // Automated layout tracker for floating context labels
  const formValues = watch();

  const renderInputField = (
    id: keyof FormData, 
    label: string, 
    type = "text", 
    gridSpan = "sm:col-span-1"
  ) => {
    const hasValue = formValues && formValues[id] && formValues[id]!.length > 0;
    const errorMsg = errors[id]?.message ? t.contact.errors[id === "phone" || id === "email" ? id : "required"] : null;

    return (
      <div className={`relative flex flex-col pt-5 pb-2 group ${gridSpan}`}>
        <label
          htmlFor={id}
          className={`absolute left-0 top-5 text-sm font-light tracking-wide transition-all duration-300 ease-out pointer-events-none select-none
            ${hasValue || type === "date"
              ? "text-[10px] uppercase tracking-[0.25em] text-gold -translate-y-5" 
              : "text-offwhite/40 group-focus-within:text-[10px] group-focus-within:uppercase group-focus-within:tracking-[0.25em] group-focus-within:text-gold group-focus-within:-translate-y-5"
            }`}
        >
          {label}
        </label>
        
        <input
          id={id}
          type={type}
          {...register(id)}
          className="w-full bg-transparent border-b border-white/10 px-0 py-1.5 text-sm font-light text-offwhite [color-scheme:dark] placeholder-transparent focus:outline-none transition-colors duration-300 group-focus-within:border-white/30"
        />
        
        {/* Animated accent focus line */}
        <span className="absolute bottom-2 left-0 h-[1px] w-0 bg-gold transition-all duration-500 ease-out group-focus-within:w-full" />
        
        {/* Layout stability container for error output */}
        <div className="absolute bottom-[-16px] left-0 h-4 overflow-hidden pointer-events-none">
          {errorMsg && (
            <p className="text-[10px] tracking-wide text-destructive/90 animate-fade-in">
              {errorMsg}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-16 bg-[#0a0a0a] overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <SectionTitle eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="mt-20 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* LEFT: Premium Linear Form Layout */}
        <Reveal className="lg:col-span-7 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {renderInputField("name", f.name)}
              {renderInputField("phone", f.phone, "tel")}
              {renderInputField("email", f.email, "email", "sm:col-span-2")}
              {renderInputField("eventType", f.eventType)}
              {renderInputField("guests", f.guests, "number")}
              {renderInputField("date", f.date, "date", "sm:col-span-2")}

              {/* Textarea Field */}
              <div className="relative flex flex-col pt-5 pb-2 group sm:col-span-2">
                <label
                  htmlFor="message"
                  className={`absolute left-0 top-5 text-sm font-light tracking-wide transition-all duration-300 ease-out pointer-events-none select-none
                    ${formValues?.message 
                      ? "text-[10px] uppercase tracking-[0.25em] text-gold -translate-y-5" 
                      : "text-offwhite/40 group-focus-within:text-[10px] group-focus-within:uppercase group-focus-within:tracking-[0.25em] group-focus-within:text-gold group-focus-within:-translate-y-5"
                    }`}
                >
                  {f.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-1.5 text-sm font-light text-offwhite resize-none placeholder-transparent focus:outline-none transition-colors duration-300 group-focus-within:border-white/30"
                />
                <span className="absolute bottom-2 left-0 h-[1px] w-0 bg-gold transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative inline-flex items-center justify-center px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium bg-gold text-black rounded-none hover:bg-white transition-all duration-400 ease-out disabled:opacity-40 disabled:hover:bg-gold disabled:hover:text-black w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin" /> Processing
                  </span>
                ) : (
                  f.submit
                )}
              </button>
              
              {sent && (
                <div className="inline-flex items-center gap-2.5 text-xs tracking-wider text-gold uppercase font-light animate-fade-in">
                  <Check size={14} strokeWidth={1.5} /> {t.contact.success}
                </div>
              )}
            </div>
          </form>
        </Reveal>

        {/* RIGHT: High-End Asymmetric Information Column */}
        <Reveal className="lg:col-span-5 w-full lg:pl-4" delay={150}>
          <div className="divide-y divide-white/5 border-y border-white/5">
            <InfoRow icon={<MessageCircle size={16} strokeWidth={1.2} />} label={t.contact.info.whatsapp} value="+212 650 460 950" href="https://wa.me/212650460950" />
            <InfoRow icon={<Phone size={16} strokeWidth={1.2} />} label={t.contact.info.phone} value="+212 650 460 950" href="tel:+212650460950" />
            <InfoRow icon={<Mail size={16} strokeWidth={1.2} />} label={t.contact.info.email} value={t.contact.info.emailValue || "contact@tritor.ma"} href={`mailto:${t.contact.info.emailValue || "contact@tritor.ma"}`} />
            <InfoRow icon={<MapPin size={16} strokeWidth={1.2} />} label={t.contact.info.address} value={t.contact.info.addressValue} />
            <InfoRow icon={<Clock size={16} strokeWidth={1.2} />} label={t.contact.info.hours} value={t.contact.info.hoursValue} />
          </div>

          {/* Handcrafted Architectural Map Placeholder Graphic */}
          <div className="mt-10 h-48 border border-white/5 bg-gradient-to-br from-[#0e0e0e] to-[#121212] relative group overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_75%)]" />
            <div className="absolute top-1/2 left-1/4 right-1/4 h-[1px] bg-white/5" />
            <div className="absolute left-1/2 top-1/4 bottom-1/4 w-[1px] bg-white/5" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black border border-gold/30 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <MapPin size={16} className="text-gold" />
              </div>
              <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase font-light">
                Casablanca, Morocco
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function InfoRow({ icon, label, value, href }: InfoRowProps) {
  const innerContent = (
    <div className="flex items-start justify-between py-6 w-full text-left min-w-0 group">
      <div className="space-y-1.5 min-w-0 pr-4">
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-light">
          {label}
        </div>
        <div className="text-sm text-offwhite/80 font-light tracking-wide break-words transition-colors duration-300 group-hover:text-gold">
          {value}
        </div>
      </div>
      <span className="w-8 h-8 shrink-0 border border-white/5 flex items-center justify-center text-white/40 transition-all duration-300 group-hover:border-gold/30 group-hover:text-gold">
        {icon}
      </span>
    </div>
  );

  return (
    <div className="flex w-full">
      {href ? (
        <a href={href} className="w-full focus:outline-none" rel="noopener noreferrer" target="_blank">
          {innerContent}
        </a>
      ) : (
        <div className="w-full">{innerContent}</div>
      )}
    </div>
  );
}