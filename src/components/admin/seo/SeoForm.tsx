"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Save, RotateCcw, Image } from "lucide-react";
import { SeoFormData, SeoPage } from "@/types/seo.types";
import { ROBOTS_OPTIONS, SEO_VALIDATION } from "@/constants/seo";
import { SeoPreview } from "./SeoPreview";
import styles from "./SeoForm.module.scss";

interface SeoFormProps {
  initialData?: SeoFormData;
  pageInfo: SeoPage | undefined;
  onSave: (data: SeoFormData) => Promise<void>;
  onReset: () => SeoFormData;
  saving: boolean;
}

export const SeoForm: React.FC<SeoFormProps> = ({
  initialData,
  pageInfo,
  onSave,
  onReset,
  saving,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<SeoFormData>({
    defaultValues: initialData || onReset(),
  });

  // Используем useState для хранения значений
  const [formValues, setFormValues] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    ogTitle: initialData?.ogTitle || "",
    ogDescription: initialData?.ogDescription || "",
    ogImage: initialData?.ogImage || "",
  });

  // Обновляем локальное состояние при изменении формы
  useEffect(() => {
    const subscription = watch((value) => {
      setFormValues({
        title: value.title || "",
        description: value.description || "",
        ogTitle: value.ogTitle || "",
        ogDescription: value.ogDescription || "",
        ogImage: value.ogImage || "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Обновляем форму при смене страницы
  useEffect(() => {
    const newDefaults = initialData || onReset();
    reset(newDefaults);
    setFormValues({
      title: newDefaults.title || "",
      description: newDefaults.description || "",
      ogTitle: newDefaults.ogTitle || "",
      ogDescription: newDefaults.ogDescription || "",
      ogImage: newDefaults.ogImage || "",
    });
  }, [initialData, pageInfo, reset, onReset]);

  const titleLength = formValues.title.length;
  const descLength = formValues.description.length;

  return (
    <div className={styles.seoForm}>
      <div className={styles.formHeader}>
        <h2>SEO настройки для: {pageInfo?.name}</h2>
        <p className={styles.pagePath}>{pageInfo?.path}</p>
      </div>

      <form onSubmit={handleSubmit(onSave)} className={styles.form}>
        {/* Основные мета-теги */}
        <div className={styles.section}>
          <h3>Основные мета-теги</h3>

          <div className={styles.formGroup}>
            <label>
              Мета-заголовок (Title)
              <span
                className={`${styles.counter} ${
                  titleLength > SEO_VALIDATION.titleMaxLength
                    ? styles.error
                    : ""
                }`}
              >
                {titleLength}/{SEO_VALIDATION.titleMaxLength}
              </span>
            </label>
            <input
              {...register("title", {
                required: "Заголовок обязателен",
                maxLength: {
                  value: SEO_VALIDATION.titleMaxLength,
                  message: `Максимум ${SEO_VALIDATION.titleMaxLength} символов`,
                },
              })}
              placeholder="Введите мета-заголовок"
              className={errors.title ? styles.error : ""}
            />
            {errors.title && (
              <span className={styles.errorMessage}>
                {errors.title.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>
              Мета-описание (Description)
              <span
                className={`${styles.counter} ${
                  descLength > SEO_VALIDATION.descriptionMaxLength
                    ? styles.error
                    : ""
                }`}
              >
                {descLength}/{SEO_VALIDATION.descriptionMaxLength}
              </span>
            </label>
            <textarea
              {...register("description", {
                required: "Описание обязательно",
                maxLength: {
                  value: SEO_VALIDATION.descriptionMaxLength,
                  message: `Максимум ${SEO_VALIDATION.descriptionMaxLength} символов`,
                },
              })}
              placeholder="Введите мета-описание"
              rows={4}
              className={errors.description ? styles.error : ""}
            />
            {errors.description && (
              <span className={styles.errorMessage}>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Keywords (через запятую)</label>
            <input
              {...register("keywords")}
              placeholder="спортивные секции, Динамо Витебск, спорт для детей"
            />
          </div>
        </div>

        {/* Open Graph */}
        <div className={styles.section}>
          <h3>Open Graph (для соцсетей)</h3>

          <div className={styles.formGroup}>
            <label>OG Image URL</label>
            <div className={styles.imageInput}>
              <input
                {...register("ogImage")}
                placeholder="/images/og/default.jpg"
              />
              <button type="button" className={styles.imageButton}>
                <Image size={18} />
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>OG Title (если отличается от основного)</label>
            <input
              {...register("ogTitle")}
              placeholder="Заголовок для соцсетей"
            />
          </div>

          <div className={styles.formGroup}>
            <label>OG Description</label>
            <textarea
              {...register("ogDescription")}
              placeholder="Описание для соцсетей"
              rows={3}
            />
          </div>
        </div>

        {/* Дополнительные настройки */}
        <div className={styles.section}>
          <h3>Дополнительные настройки</h3>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Robots</label>
              <select {...register("robots")}>
                {ROBOTS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Canonical URL</label>
              <input
                {...register("canonical")}
                placeholder="https://dynamo-vitebsk.by/page"
              />
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input type="checkbox" {...register("isActive")} />
              <span>SEO активно для этой страницы</span>
            </label>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={() => reset(onReset())}
            disabled={saving}
          >
            <RotateCcw size={16} />
            Сбросить
          </button>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={saving || !isDirty}
          >
            <Save size={16} />
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </div>
      </form>

      {/* Превью */}
      <SeoPreview
        title={formValues.title}
        description={formValues.description}
        ogTitle={formValues.ogTitle}
        ogDescription={formValues.ogDescription}
        ogImage={formValues.ogImage}
        path={pageInfo?.path}
      />
    </div>
  );
};
