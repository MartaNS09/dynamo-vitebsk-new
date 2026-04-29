import { Suspense } from "react";
import type { Metadata } from "next";
import { SportsPageClient } from "./SportsPageClient";
import Loading from "./loading";
import { getSeoForPage } from "@/lib/api/seo";

const FALLBACK_SPORTS_METADATA: Metadata = {
  title: "Спортивные секции в Витебске",
  description:
    "Спортивные секции СДЮШОР Динамо Витебск: выбор направления, тренеры, расписание и запись онлайн.",
  alternates: {
    canonical: "/sports",
  },
  openGraph: {
    title: "Спортивные секции в Витебске | СДЮШОР Динамо",
    description:
      "Выберите спортивное направление в Витебске: секции для детей и взрослых, тренеры и запись.",
    url: "/sports",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("sports");

  if (!seo || !seo.isActive) {
    return FALLBACK_SPORTS_METADATA;
  }

  return {
    title: seo.title || FALLBACK_SPORTS_METADATA.title,
    description: seo.description || FALLBACK_SPORTS_METADATA.description,
    keywords: seo.keywords || undefined,
    alternates: {
      canonical: seo.canonical || seo.path || "/sports",
    },
    robots: seo.robots || undefined,
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Спортивные секции в Витебске | СДЮШОР Динамо",
      description:
        seo.ogDescription ||
        seo.description ||
        "Выберите спортивное направление в Витебске: секции для детей и взрослых, тренеры и запись.",
      url: seo.path || "/sports",
      images: seo.ogImage ? [seo.ogImage] : undefined,
      type: "website",
    },
  };
}

export default function SportsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SportsPageClient />
    </Suspense>
  );
}
