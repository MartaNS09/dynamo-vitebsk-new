import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSeoForPage } from "@/lib/api/seo";

const FALLBACK_BLOG_METADATA: Metadata = {
  title: "Новости и блог о спорте в Витебске",
  description:
    "Новости СДЮШОР Динамо Витебск: соревнования, интервью, статьи о спорте и развитии детей.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Новости и блог о спорте в Витебске",
    description:
      "Новости СДЮШОР Динамо Витебск: соревнования, интервью, статьи о спорте и развитии детей.",
    url: "/blog",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("blog");

  if (!seo || !seo.isActive) {
    return FALLBACK_BLOG_METADATA;
  }

  return {
    title: seo.title || FALLBACK_BLOG_METADATA.title,
    description: seo.description || FALLBACK_BLOG_METADATA.description,
    keywords: seo.keywords || undefined,
    alternates: {
      canonical: seo.canonical || seo.path || "/blog",
    },
    robots: seo.robots || undefined,
    openGraph: {
      title: seo.ogTitle || seo.title || "Новости и блог о спорте в Витебске",
      description:
        seo.ogDescription ||
        seo.description ||
        "Новости СДЮШОР Динамо Витебск: соревнования, интервью, статьи о спорте и развитии детей.",
      url: seo.canonical || seo.path || "/blog",
      images: seo.ogImage ? [seo.ogImage] : undefined,
      type: "website",
    },
  };
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
