import { API_BASE_URL } from "@/config/api";

export async function getSeoForPage(page: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/seo/${page}`, {
      // Добавляем кэширование на 60 секунд
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching SEO for ${page}:`, error);
    return null;
  }
}
