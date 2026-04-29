import { SeoData, SeoFormData } from "@/types/seo.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const NORMALIZED_API_BASE_URL = API_BASE_URL.replace(/\/+$/, "");

function normalizeSeoData(raw: Partial<SeoData>): SeoData {
  return {
    id: raw.id || "",
    page: raw.page || "",
    path: raw.path || "/",
    title: raw.title || "",
    description: raw.description || "",
    keywords: raw.keywords || "",
    ogImage: raw.ogImage || "",
    ogTitle: raw.ogTitle || "",
    ogDescription: raw.ogDescription || "",
    robots: raw.robots || "index, follow",
    canonical: raw.canonical || "",
    isActive: raw.isActive ?? true,
    updatedAt: raw.updatedAt || new Date().toISOString(),
    updatedBy: raw.updatedBy || "system",
  };
}

export async function getAllSeo(): Promise<SeoData[]> {
  try {
    const response = await fetch(`${NORMALIZED_API_BASE_URL}/seo`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to load SEO list: ${response.status}`);
    }

    const data = (await response.json()) as Partial<SeoData>[];
    return data.map((item) => normalizeSeoData(item));
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("SEO list is unavailable: API does not respond");
    }
    return [];
  }
}

export async function getSeoForPage(page: string): Promise<SeoData | null> {
  try {
    const response = await fetch(`${NORMALIZED_API_BASE_URL}/seo/${page}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as Partial<SeoData> | null;
    return data ? normalizeSeoData(data) : null;
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn(`SEO data is unavailable for page "${page}"`);
    }
    return null;
  }
}

export async function upsertSeoForPage(
  page: string,
  payload: SeoFormData,
): Promise<SeoData> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(`${NORMALIZED_API_BASE_URL}/seo/${page}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Ошибка сохранения SEO");
  }

  const data = (await response.json()) as Partial<SeoData>;
  return normalizeSeoData(data);
}

export async function initializeDefaultSeo(): Promise<{
  total: number;
  created: number;
  existed: number;
}> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const response = await fetch(
    `${NORMALIZED_API_BASE_URL}/seo/initialize-defaults`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Ошибка инициализации SEO");
  }

  return response.json();
}
