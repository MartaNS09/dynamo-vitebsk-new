import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_DEPARTMENTS } from "@/data/departments";
import DepartmentPageClient from "./page.client";

// Тип для метаданных
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = ALL_DEPARTMENTS.find(
    (d) => d.seoSlug.toLowerCase() === slug.toLowerCase()
  );

  if (!dept) {
    return {
      title: "Отделение не найдено",
    };
  }

  return {
    title: `${dept.title} | СДЮШОР Динамо Витебск`,
    description: dept.description,
    openGraph: {
      title: `${dept.title} | СДЮШОР Динамо`,
      description: dept.description,
      images: [dept.heroImage],
    },
  };
}

// Статические пути для 10 отделений
export async function generateStaticParams() {
  return ALL_DEPARTMENTS.map((dept) => ({
    slug: dept.seoSlug, // Bicycle, Gymnastics...
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
