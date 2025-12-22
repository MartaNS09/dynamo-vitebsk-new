import { Metadata } from "next";
import { notFound } from "next/navigation";
import SportSectionPageClient from "./page.client";
import { ALL_SECTIONS } from "@/data/sport-sections";
import { SportSection, Abonement, Trainer } from "@/types/sport-section.types";

// Экспортируем тип для использования в клиентском компоненте
export interface SectionWithData extends SportSection {
  abonements: Abonement[];
  trainers: Trainer[];
  gallery: string[];
  schedule: string;
  location: string;
  heroImages: string[];
}

// Метаданные - ТОЛЬКО в серверном компоненте
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = ALL_SECTIONS.find((s) => s.slug === slug);

  if (!section) {
    return {
      title: "Секция не найдена",
      description: "Данной спортивной секции не существует",
    };
  }

  return {
    title: `${section.name} | СДЮШОР Динамо Витебск`,
    description: section.shortDescription,
    openGraph: {
      title: `${section.name} | Динамо Витебск`,
      description: section.shortDescription,
      url: `https://dynamovitebsk.by/sports/${section.slug}`,
    },
  };
}

// Статические пути - ТОЛЬКО в серверном компоненте
export async function generateStaticParams() {
  return ALL_SECTIONS.map((section) => ({
    slug: section.slug,
  }));
}

// Функция получения данных
async function getSectionData(slug: string): Promise<SectionWithData | null> {
  const section = ALL_SECTIONS.find((s) => s.slug === slug);

  if (!section) return null;

  const heroImages = section.heroImages || [
    section.coverImage,
    section.coverImage,
  ];

  return {
    ...section,
    heroImages,
    abonements:
      section.abonements.length > 0
        ? section.abonements
        : [
            {
              id: "1",
              name: "абонемент",
              description: "8 занятий в месяц (2 раза в неделю)",
              price: 80,
              currency: "BYN",
              duration: "1 месяц",
              features: ["Группа до 15 человек", "Профессиональный тренер"],
              isPopular: true,
            } as Abonement,
          ],
    trainers:
      section.trainers.length > 0
        ? section.trainers
        : [
            {
              id: "1",
              name: "Иванова Мария Петровна",
              position: "тренер-преподаватель",
              description: "Опыт работы 5+ лет",
            } as Trainer,
          ],
    gallery:
      section.gallery.length > 0
        ? section.gallery
        : [
            section.coverImage,
            "/images/sections/default-1.jpg",
            "/images/sections/default-2.jpg",
          ],
    schedule: section.schedule || "Понедельник, среда, пятница 16:00-18:00",
    location: section.location || "г. Витебск, ул. Терешковой 16/2",
  };
}

// Основной компонент - ТОЛЬКО server component
export default async function SportSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = await getSectionData(slug);

  if (!section) {
    notFound();
  }

  // Передаем данные в клиентский компонент
  return <SportSectionPageClient section={section} />;
}
