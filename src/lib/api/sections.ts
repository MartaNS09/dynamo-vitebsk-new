import { SportSection } from "@/types/sport-section.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Получить все секции
export async function getSections(): Promise<SportSection[]> {
  const res = await fetch(`${API_BASE_URL}/sections`);
  if (!res.ok) throw new Error("Ошибка загрузки секций");
  return res.json();
}

// Получить секцию по ID
export async function getSectionById(id: string): Promise<SportSection> {
  console.log("🔍 Запрос к API:", `${API_BASE_URL}/sections/${id}`);
  const res = await fetch(`${API_BASE_URL}/sections/${id}`);
  if (!res.ok) {
    const error = await res.text();
    console.error("❌ Ошибка ответа:", res.status, error);
    throw new Error(`Секция не найдена (${res.status})`);
  }
  return res.json();
}

// Получить секцию по slug
export async function getSectionBySlug(slug: string): Promise<SportSection> {
  const res = await fetch(`${API_BASE_URL}/sections/slug/${slug}`);
  if (!res.ok) throw new Error("Секция не найдена");
  return res.json();
}

// Создать новую секцию
export async function createSection(
  data: Partial<SportSection>,
): Promise<SportSection> {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_BASE_URL}/sections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Ошибка создания секции");
  }

  return res.json();
}

// Обновить секцию
export async function updateSection(
  id: string,
  data: Partial<SportSection>,
): Promise<SportSection> {
  const token = localStorage.getItem("access_token");
  console.log("🔑 Токен для обновления:", token ? "есть" : "нет");
  console.log("📡 URL обновления:", `${API_BASE_URL}/sections/${id}`);

  // ОТПРАВЛЯЕМ ТОЛЬКО НУЖНЫЕ ПОЛЯ
  const sectionData = {
    name: data.name,
    slug: data.slug,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    ageInfo: data.ageInfo,
    category: data.category,
    schedule: data.schedule,
    location: data.location,
    isActive: data.isActive,
    coverImage: data.coverImage,
    heroImages: data.heroImages,
    gallery: data.gallery,
    // НЕ отправляем abonements и trainers!
  };

  console.log("📦 Отправляем данные:", JSON.stringify(sectionData, null, 2));

  const res = await fetch(`${API_BASE_URL}/sections/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sectionData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Ответ сервера:", res.status, errorText);
    throw new Error(`Ошибка ${res.status}: ${errorText}`);
  }

  const result = await res.json();
  console.log("✅ Успешно обновлено:", result);
  return result;
}

// Удалить секцию
export async function deleteSection(id: string): Promise<void> {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_BASE_URL}/sections/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Ошибка удаления секции");
  }
}
