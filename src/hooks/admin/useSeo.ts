"use client";

import { useState, useEffect, useCallback } from "react";
import { SeoData, SeoFormData } from "@/types/seo.types";
import { SEO_PAGES, DEFAULT_SEO } from "@/constants/seo";
import { API_BASE_URL } from "@/config/api";

// const getAuthToken = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token");
//   }
//   return null;
// };

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    // Ищем оба варианта - и token, и access_token
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    console.log("Token from localStorage:", token ? "есть" : "нет");
    return token;
  }
  return null;
};

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAuthToken()}`,
});

export const useSeo = () => {
  const [seoData, setSeoData] = useState<SeoData[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadSeoData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Не авторизован");
      }

      const response = await fetch(`${API_BASE_URL}/seo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Требуется авторизация");
        }
        if (response.status === 403) {
          throw new Error("Недостаточно прав");
        }
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data = await response.json();
      setSeoData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки SEO данных",
      );
      console.error("SEO load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSeoForPage = useCallback(
    async (page: string): Promise<SeoData | null> => {
      try {
        const response = await fetch(`${API_BASE_URL}/seo/${page}`);

        if (response.status === 204 || !response.ok) {
          return null;
        }

        const data = await response.json();
        return data;
      } catch (err) {
        console.error(`Error loading SEO for page ${page}:`, err);
        return null;
      }
    },
    [],
  );

  const saveSeo = useCallback(
    async (data: SeoFormData) => {
      setSaving(true);
      setError(null);
      setSuccess(null);

      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error("Не авторизован");
        }

        const response = await fetch(`${API_BASE_URL}/seo/${selectedPage}`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Ошибка сохранения");
        }

        const savedData = await response.json();

        setSeoData((prev) => {
          const index = prev.findIndex((item) => item.page === selectedPage);
          if (index >= 0) {
            const updated = [...prev];
            updated[index] = savedData;
            return updated;
          }
          return [...prev, savedData];
        });

        setSuccess("SEO настройки успешно сохранены");
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка сохранения");
        console.error("SEO save error:", err);
      } finally {
        setSaving(false);
      }
    },
    [selectedPage],
  );

  // ИСПРАВЛЕНО: теперь возвращает SeoFormData, а не Promise
  const resetToDefault = useCallback((): SeoFormData => {
    const pageInfo = SEO_PAGES.find((p) => p.id === selectedPage);
    const defaults =
      DEFAULT_SEO[selectedPage as keyof typeof DEFAULT_SEO] || {};

    return {
      page: selectedPage,
      path: pageInfo?.path || "/",
      title: defaults.title || "",
      description: defaults.description || "",
      keywords: defaults.keywords || "",
      ogImage: "",
      ogTitle: "",
      ogDescription: "",
      robots: "index, follow",
      canonical: "",
      isActive: true,
    };
  }, [selectedPage]);

  const currentSeo = seoData.find((item) => item.page === selectedPage);

  useEffect(() => {
    loadSeoData();
  }, [loadSeoData]);

  return {
    seoData,
    selectedPage,
    setSelectedPage,
    currentSeo,
    loading,
    saving,
    error,
    success,
    saveSeo,
    resetToDefault, // Теперь правильный тип
    getSeoForPage,
    refresh: loadSeoData,
  };
};
