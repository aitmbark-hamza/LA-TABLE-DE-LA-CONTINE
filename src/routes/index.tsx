import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HUDA — Traiteur & Organisation Événementielle" },
      {
        name: "description",
        content:
          "HUDA, maison de traiteur et d'organisation événementielle. Mariages, soirées, cocktails et réceptions privées de prestige.",
      },
      { property: "og:title", content: "HUDA — Traiteur & Événementiel" },
      { property: "og:description", content: "Expériences culinaires et événementielles inoubliables." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Gallery />
          <WhyChooseUs />
          <Testimonials />
          <HowItWorks />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}
