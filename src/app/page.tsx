import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { Features } from "@/components/sections/features/Features";
import { HistorySection } from "@/components/sections/history/HistorySection";
import { NewsSection } from "@/components/sections/news/NewsSection";
import { LegendsSlider } from "@/components/sections/legends/LegendsSlider";
import { ContactCTA } from "@/components/sections/cta/ContactCTA";
import { getSeoForPage } from "@/lib/api/seo";

const FALLBACK_HOME_METADATA: Metadata = {
  title: "Динамо Витебск | Спортивная школа олимпийского резерва",
  description:
    "Официальный сайт СДЮШОР Динамо Витебск. Спортивные секции для детей и подростков, профессиональные тренеры, участие в соревнованиях.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Динамо Витебск - официальный сайт",
    description: "Спортивная школа олимпийского резерва в Витебске",
    url: "/",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("home");

  if (!seo || !seo.isActive) {
    return FALLBACK_HOME_METADATA;
  }

  return {
    title: seo.title || FALLBACK_HOME_METADATA.title,
    description: seo.description || FALLBACK_HOME_METADATA.description,
    keywords: seo.keywords || undefined,
    alternates: {
      canonical: seo.canonical || seo.path || "/",
    },
    robots: seo.robots || undefined,
    openGraph: {
      title: seo.ogTitle || seo.title || "Динамо Витебск - официальный сайт",
      description:
        seo.ogDescription ||
        seo.description ||
        "Спортивная школа олимпийского резерва в Витебске",
      url: seo.path || "/",
      images: seo.ogImage ? [seo.ogImage] : undefined,
      type: "website",
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
