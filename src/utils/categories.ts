// utils/categories.ts
export const CATEGORY_SLUGS = {
  Гимнастика: "gymnastics",
  Единоборства: "martial-arts",
  Йога: "yoga",
  Стрельба: "shooting",
  Танцы: "dance",
  Экстрим: "extreme",
  "Прикладной спорт": "applied-sports",
} as const;

export const SLUG_TO_CATEGORY = Object.entries(CATEGORY_SLUGS).reduce(
  (acc, [category, slug]) => {
    acc[slug] = category;
    return acc;
  },
  {} as Record<string, string>,
);

export function getCategorySlug(categoryName: string): string {
  return (
    CATEGORY_SLUGS[categoryName as keyof typeof CATEGORY_SLUGS] ||
    categoryName.toLowerCase().replace(/\s+/g, "-")
  );
}

export function getCategoryName(slug: string): string | null {
  return SLUG_TO_CATEGORY[slug] || null;
}
