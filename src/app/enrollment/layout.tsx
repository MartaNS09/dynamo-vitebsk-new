import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/api/seo";

const FALLBACK_ENROLLMENT_METADATA: Metadata = {
  title: "Запись в спортивную школу в Витебске",
  description:
    "Онлайн-запись в спортивные секции СДЮШОР Динамо Витебск. Оставьте заявку и получите консультацию по выбору направления.",
  alternates: {
    canonical: "/enrollment",
  },
  openGraph: {
    title: "Запись в секции | СДЮШОР Динамо Витебск",
    description:
      "Оформите заявку на занятия спортом в Витебске: секции, тренеры и удобный график.",
    url: "/enrollment",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("enrollment");

  if (!seo || !seo.isActive) {
    return FALLBACK_ENROLLMENT_METADATA;
  }

  return {
    title: seo.title || FALLBACK_ENROLLMENT_METADATA.title,
    description: seo.description || FALLBACK_ENROLLMENT_METADATA.description,
    keywords: seo.keywords || undefined,
    alternates: {
      canonical: seo.canonical || seo.path || "/enrollment",
    },
    robots: seo.robots || undefined,
    openGraph: {
      title: seo.ogTitle || seo.title || "Запись в секции | СДЮШОР Динамо Витебск",
      description:
        seo.ogDescription ||
        seo.description ||
        "Оформите заявку на занятия спортом в Витебске: секции, тренеры и удобный график.",
      url: seo.path || "/enrollment",
      images: seo.ogImage ? [seo.ogImage] : undefined,
      type: "website",
    },
  };
}

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
