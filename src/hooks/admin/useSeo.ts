"use client";

import { useState, useEffect, useCallback } from "react";
import { SeoData, SeoFormData, SeoPage } from "@/types/seo.types";
import { SEO_PAGES, DEFAULT_SEO } from "@/constants/seo";

// МОК-ДАННЫЕ (пока нет API)
const MOCK_SEO_DATA: SeoData[] = [
  {
    id: "1",
    page: "home",
    path: "/",
    title: "Динамо Витебск | Спортивная школа олимпийского резерва",
    description:
      "Официальный сайт СДЮШОР Динамо Витебск. Спортивные секции для детей и подростков, профессиональные тренеры, участие в соревнованиях.",
    keywords:
      "Динамо Витебск, спортивная школа, секции для детей, спорт Витебск",
    ogImage: "/images/og/home-og.jpg",
    ogTitle: "Динамо Витебск - официальный сайт",
    ogDescription: "Спортивная школа олимпийского резерва в Витебске",
    robots: "index, follow",
    isActive: true,
    updatedAt: new Date().toISOString(),
    updatedBy: "admin@dynamo-vitebsk.by",
  },
  {
    id: "2",
    page: "sports",
    path: "/sports",
    title: "Спортивные секции | Динамо Витебск",
    description:
      "Спортивные секции для детей и подростков в Витебске. Футбол, плавание, дзюдо, гимнастика и другие виды спорта.",
    keywords:
      "спортивные секции Витебск, секции для детей, спорт для подростков",
    ogImage: "/images/og/sports-og.jpg",
    robots: "index, follow",
    isActive: true,
    updatedAt: new Date().toISOString(),
    updatedBy: "admin@dynamo-vitebsk.by",
  },
];

export const useSeo = () => {
  const [seoData, setSeoData] = useState<SeoData[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Загрузка SEO данных
  const loadSeoData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSeoData(MOCK_SEO_DATA);
    } catch (err) {
      setError("Ошибка загрузки SEO данных");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Получить SEO для выбранной страницы
  const getCurrentSeo = useCallback((): SeoData | undefined => {
    return seoData.find((item) => item.page === selectedPage);
  }, [seoData, selectedPage]);

  // Сохранить SEO
  const saveSeo = useCallback(
    async (data: SeoFormData) => {
      setSaving(true);
      setError(null);
      setSuccess(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Ищем существующую запись
        const existingIndex = seoData.findIndex(
          (item) => item.page === selectedPage,
        );

        const newSeoData: SeoData = {
          id:
            existingIndex >= 0
              ? seoData[existingIndex].id
              : Date.now().toString(),
          ...data,
          updatedAt: new Date().toISOString(),
          updatedBy: "admin@dynamo-vitebsk.by", // Здесь будет реальный пользователь
        };

        if (existingIndex >= 0) {
          // Обновляем существующую
          const updated = [...seoData];
          updated[existingIndex] = newSeoData;
          setSeoData(updated);
        } else {
          // Добавляем новую
          setSeoData([...seoData, newSeoData]);
        }

        setSuccess("SEO настройки сохранены");

        // Очищаем сообщение через 3 секунды
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError("Ошибка сохранения");
        console.error(err);
      } finally {
        setSaving(false);
      }
    },
    [seoData, selectedPage],
  );

  // Сбросить к дефолтным значениям
  const resetToDefault = useCallback(() => {
    const defaults =
      DEFAULT_SEO[selectedPage as keyof typeof DEFAULT_SEO] || {};
    return {
      page: selectedPage,
      path: SEO_PAGES.find((p) => p.id === selectedPage)?.path || "/",
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

  useEffect(() => {
    loadSeoData();
  }, [loadSeoData]);

  return {
    seoData,
    selectedPage,
    setSelectedPage,
    currentSeo: getCurrentSeo(),
    loading,
    saving,
    error,
    success,
    saveSeo,
    resetToDefault,
    refresh: loadSeoData,
  };
};
