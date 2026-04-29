import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_DEPARTMENTS } from "@/data/departments";
import DepartmentPageClient from "./page.client";
import { getSeoForPage } from "@/lib/api/seo";
import { toAbsoluteUrl } from "@/lib/seo/site";

// Тип для метаданных
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const seo = await getSeoForPage(`departments-${normalizedSlug}`);
  const dept = ALL_DEPARTMENTS.find(
    (d) => d.seoSlug.toLowerCase() === normalizedSlug
  );

  if (!dept) {
    return {
      title: "Отделение не найдено",
    };
  }

  if (seo?.isActive) {
    const ogImageUrl = seo.ogImage
      ? toAbsoluteUrl(seo.ogImage)
      : toAbsoluteUrl(dept.heroImage);

    return {
      title: seo.title || `${dept.title} | СДЮШОР Динамо Витебск`,
      description: seo.description || dept.description,
      keywords: seo.keywords || undefined,
      alternates: {
        canonical: seo.canonical || `/departments/${normalizedSlug}`,
      },
      robots: seo.robots || undefined,
      openGraph: {
        title: seo.ogTitle || seo.title || `${dept.title} | СДЮШОР Динамо`,
        description: seo.ogDescription || seo.description || dept.description,
        url: seo.canonical || `/departments/${normalizedSlug}`,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: dept.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: seo.ogTitle || seo.title || `${dept.title} | СДЮШОР Динамо`,
        description: seo.ogDescription || seo.description || dept.description,
        images: [ogImageUrl],
      },
    };
  }

  const fallbackImageUrl = toAbsoluteUrl(dept.heroImage);
  return {
    title: `${dept.title} | СДЮШОР Динамо Витебск`,
    description: dept.description,
    openGraph: {
      title: `${dept.title} | СДЮШОР Динамо`,
      description: dept.description,
      url: `https://dynamovitebsk.by/departments/${normalizedSlug}`,
      images: [
        {
          url: fallbackImageUrl,
          width: 1200,
          height: 630,
          alt: dept.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dept.title} | СДЮШОР Динамо`,
      description: dept.description,
      images: [fallbackImageUrl],
    },
  };
}

// Статические пути для 10 отделений
export async function generateStaticParams() {
  return ALL_DEPARTMENTS.map((dept) => ({
    slug: dept.seoSlug.toLowerCase(),
  }));
}

// Основной компонент страницы
export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = ALL_DEPARTMENTS.find(
    (d) => d.seoSlug.toLowerCase() === slug.toLowerCase()
  );

  if (!department) {
    notFound();
  }

  return <DepartmentPageClient department={department} />;
}
