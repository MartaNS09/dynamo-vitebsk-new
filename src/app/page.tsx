import { Hero } from "@/components/sections/hero/Hero";
import { Features } from "@/components/sections/features/Features";
import { HistorySection } from "@/components/sections/history/HistorySection";
import { NewsSection } from "@/components/sections/news/NewsSection";
import { LegendsSlider } from "@/components/sections/legends/LegendsSlider";
import { ContactCTA } from "@/components/sections/cta/ContactCTA";
import { getSeoForPage } from "@/lib/api/seo";
import { Metadata } from "next";

// ЭТОТ КОД ЗАСТАВИТ РАБОТАТЬ SEO!
export async function generateMetadata(): Promise<Metadata> {
  // Получаем SEO данные из базы
  const seo = await getSeoForPage("home");

  return {
    title: seo?.title || "СДЮШОР Динамо Витебск",
    description:
      seo?.description || "Официальный сайт спортивной школы Динамо в Витебске",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.title,
      description: seo?.ogDescription || seo?.description,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
    robots: seo?.robots || "index, follow",
    alternates: {
      canonical: seo?.canonical,
    },
  };
}

export default function Home() {
  return (
    <main className="main-content">
      <Hero />
      <Features />
      <HistorySection />
      <NewsSection />
      <LegendsSlider />
      <ContactCTA />
    </main>
  );
}
