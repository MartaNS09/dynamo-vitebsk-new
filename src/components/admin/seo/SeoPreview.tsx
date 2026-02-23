"use client";

import React from "react";
import { Eye, ExternalLink } from "lucide-react";
import styles from "./SeoPreview.module.scss";

interface SeoPreviewProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  path?: string;
}

export const SeoPreview: React.FC<SeoPreviewProps> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  path = "/",
}) => {
  const displayTitle = title || "Заголовок не указан";
  const displayDescription = description || "Описание не указано";
  const displayUrl = "https://dynamo-vitebsk.by" + path;

  return (
    <div className={styles.preview}>
      <div className={styles.previewHeader}>
        <Eye size={18} />
        <span>Превью в поиске Google</span>
      </div>

      <div className={styles.googlePreview}>
        <div className={styles.previewUrl}>{displayUrl}</div>
        <div className={styles.previewTitle}>{displayTitle}</div>
        <div className={styles.previewDescription}>{displayDescription}</div>
      </div>

      {ogImage && (
        <div className={styles.socialPreview}>
          <div className={styles.previewHeader}>
            <ExternalLink size={16} />
            <span>Превью в соцсетях</span>
          </div>

          <div className={styles.ogPreview}>
            {ogImage && (
              <div className={styles.ogImage}>
                <img
                  src={ogImage}
                  alt={`Превью для страницы ${path}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className={styles.ogContent}>
              <div className={styles.ogTitle}>
                {ogTitle || title || "Заголовок"}
              </div>
              <div className={styles.ogDescription}>
                {ogDescription || description || "Описание"}
              </div>
              <div className={styles.ogUrl}>{displayUrl}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
