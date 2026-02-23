"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/auth.types";
import { SeoPagesList } from "@/components/admin/seo/SeoPagesList";
import { SeoForm } from "@/components/admin/seo/SeoForm";
import { useSeo } from "@/hooks/admin/useSeo";
import { SEO_PAGES } from "@/constants/seo";
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
    error,
    success,
    saveSeo,
    resetToDefault,
    refresh,
  } = useSeo();

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

  const pageInfo = SEO_PAGES.find((p) => p.id === selectedPage);

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

        <button className={styles.refreshButton} onClick={refresh}>
          <RefreshCw size={18} />
          Обновить
        </button>
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
        />

        <SeoForm
          initialData={currentSeo}
          pageInfo={pageInfo}
          onSave={saveSeo}
          onReset={resetToDefault}
          saving={saving}
        />
      </div>
    </div>
  );
}
