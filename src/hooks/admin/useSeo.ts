"use client";

import { useState, useEffect, useCallback } from "react";
import { SeoData, SeoFormData, SeoPage } from "@/types/seo.types";
import { SEO_PAGES, DEFAULT_SEO } from "@/constants/seo";
import {
  getAllSeo,
  initializeDefaultSeo,
  upsertSeoForPage,
} from "@/lib/api/seo";

export const useSeo = () => {
  const [seoData, setSeoData] = useState<SeoData[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Загрузка SEO данных
  const loadSeoData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSeo();
      setSeoData(data);
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
        const saved = await upsertSeoForPage(selectedPage, data);
        const existingIndex = seoData.findIndex((item) => item.page === selectedPage);

        if (existingIndex >= 0) {
          const updated = [...seoData];
          updated[existingIndex] = saved;
          setSeoData(updated);
        } else {
          setSeoData([...seoData, saved]);
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
  const resetToDefault = useCallback(
    (pagePath?: string) => {
    const defaults =
      DEFAULT_SEO[selectedPage as keyof typeof DEFAULT_SEO] || {};
      const fallbackPath =
        pagePath || SEO_PAGES.find((p) => p.id === selectedPage)?.path || "/";
    return {
      page: selectedPage,
        path: fallbackPath,
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
    },
    [selectedPage],
  );

  const initializeDefaults = useCallback(async () => {
    setInitializing(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await initializeDefaultSeo();
      await loadSeoData();
      setSuccess(
        `Инициализация завершена: добавлено ${result.created}, уже существовало ${result.existed}`,
      );
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError("Ошибка инициализации SEO");
      console.error(err);
    } finally {
      setInitializing(false);
    }
  }, [loadSeoData]);

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
    initializing,
    error,
    success,
    saveSeo,
    resetToDefault,
    initializeDefaults,
    refresh: loadSeoData,
  };
};
