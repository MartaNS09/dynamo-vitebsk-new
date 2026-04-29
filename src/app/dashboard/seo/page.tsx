"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/auth.types";
import { SeoPagesList } from "@/components/admin/seo/SeoPagesList";
import { SeoForm } from "@/components/admin/seo/SeoForm";
import { useSeo } from "@/hooks/admin/useSeo";
import { SEO_PAGES } from "@/constants/seo";
import { SeoPage as SeoPageType } from "@/types/seo.types";
import { getSections } from "@/lib/api/sections";
import { ALL_DEPARTMENTS } from "@/data/departments";
import { blogPosts } from "@/data/blog-posts";
import { RefreshCw, CheckCircle, AlertCircle, Shield } from "lucide-react";
import styles from "./page.module.scss";

export default function SeoPage() {
  const { user } = useAuth();
  const router = useRouter();

  const {
    seoData,
    selectedPage,
    setSelectedPage,
    currentSeo,
    loading,
    saving,
    initializing,
    error,
    success,
    saveSeo,
    resetToDefault,
    initializeDefaults,
    refresh,
  } = useSeo();
  const [dynamicSectionPages, setDynamicSectionPages] = React.useState<
    SeoPageType[]
  >([]);
  const dynamicDepartmentPages = React.useMemo(
    () =>
      ALL_DEPARTMENTS.filter((department) => Boolean(department.seoSlug)).map(
        (department) => ({
          id: `departments-${department.seoSlug.toLowerCase()}`,
          name: department.title,
          path: `/departments/${department.seoSlug.toLowerCase()}`,
          group: "departments" as const,
        }),
      ),
    [],
  );
  const dynamicBlogPages = React.useMemo(
    () =>
      blogPosts
        .filter((post) => Boolean(post.slug))
        .map((post) => ({
          id: `blog-${post.slug}`,
          name: `Блог: ${post.title}`,
          path: `/blog/${post.slug}`,
          group: "blog" as const,
        })),
    [],
  );

  React.useEffect(() => {
    (async () => {
      try {
        const sections = await getSections();
        const pages = sections
          .filter((section) => Boolean(section.slug))
          .map((section) => ({
            id: `sports-${section.slug}`,
            name: section.name,
            path: `/sports/${section.slug}`,
            group: "sections" as const,
          }));
        setDynamicSectionPages(pages);
      } catch {
        setDynamicSectionPages([]);
      }
    })();
  }, []);

  // Проверка прав доступа
  React.useEffect(() => {
    if (user && user.role !== UserRole.SUPER_ADMIN) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== UserRole.SUPER_ADMIN) {
    return (
      <div className={styles.accessDenied}>
        <Shield size={48} />
        <h2>Доступ запрещен</h2>
        <p>Настройки SEO доступны только Супер Администратору</p>
      </div>
    );
  }

  // Создаем объект с флагами наличия данных для каждой страницы
  const hasData = seoData.reduce(
    (acc, item) => {
      acc[item.page] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const allPages = React.useMemo(() => {
    const staticWithoutTemplate = SEO_PAGES.filter(
      (page) =>
        page.id !== "sports-single" &&
        page.id !== "departments-single" &&
        page.id !== "blog-single",
    );
    return [
      ...staticWithoutTemplate,
      ...dynamicSectionPages,
      ...dynamicDepartmentPages,
      ...dynamicBlogPages,
    ];
  }, [dynamicBlogPages, dynamicDepartmentPages, dynamicSectionPages]);

  const pageInfo = allPages.find((p) => p.id === selectedPage);

  if (loading) {
    return (
      <div className={styles.loading}>
        <RefreshCw size={40} className={styles.spinner} />
        <p>Загрузка SEO настроек...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Управление SEO</h1>
          <p className={styles.subtitle}>
            Настройка мета-тегов для всех страниц сайта
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.refreshButton}
            onClick={initializeDefaults}
            disabled={initializing}
          >
            <RefreshCw size={18} />
            {initializing ? "Инициализация..." : "Инициализировать дефолты"}
          </button>
          <button className={styles.refreshButton} onClick={refresh}>
            <RefreshCw size={18} />
            Обновить
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.alert}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className={`${styles.alert} ${styles.success}`}>
          <CheckCircle size={20} />
          <span>{success}</span>
        </div>
      )}

      <div className={styles.seoGrid}>
        <SeoPagesList
          selectedPage={selectedPage}
          onSelectPage={setSelectedPage}
          hasData={hasData}
          pages={allPages}
        />

        <SeoForm
          initialData={currentSeo}
          pageInfo={pageInfo}
          onSave={saveSeo}
          onReset={() => resetToDefault(pageInfo?.path)}
          saving={saving}
        />
      </div>
    </div>
  );
}
