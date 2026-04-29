"use client";

import React from "react";
import { Eye, ExternalLink } from "lucide-react";
import {
  DEFAULT_OG_IMAGE_BY_PAGE_ID,
  DEFAULT_OG_IMAGE_BY_PATH_PREFIX,
  DEFAULT_OG_IMAGE_FALLBACK,
} from "@/constants/seo-preview-images";
import styles from "./SeoPreview.module.scss";

interface SeoPreviewProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  path?: string;
  pageId?: string;
}

function getDefaultOgImage(pageId: string | undefined, path: string): string {
  if (pageId && DEFAULT_OG_IMAGE_BY_PAGE_ID[pageId]) {
    return DEFAULT_OG_IMAGE_BY_PAGE_ID[pageId];
  }

  const normalizedPath = path.toLowerCase();
  const matched = DEFAULT_OG_IMAGE_BY_PATH_PREFIX.find(({ prefix }) => {
    if (prefix === "/") {
      return normalizedPath === "/";
    }
    return normalizedPath.startsWith(prefix);
  });

  if (matched) {
    return matched.image;
  }

  return DEFAULT_OG_IMAGE_FALLBACK;
}

export const SeoPreview: React.FC<SeoPreviewProps> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  path = "/",
  pageId,
}) => {
  const displayTitle = title || "Заголовок не указан";
  const displayDescription = description || "Описание не указано";
  const displayUrl = "https://dynamo-vitebsk.by" + path;
  const fallbackImage = getDefaultOgImage(pageId, path);
  const previewCandidates = React.useMemo(() => {
    const candidates: string[] = [];

    if (ogImage) {
      candidates.push(ogImage);

      // In local dev, production absolute URLs can fail because domain is unreachable.
      // Try local path variant to keep admin preview accurate.
      if (/^https?:\/\/dynamovitebsk\.by\//i.test(ogImage)) {
        try {
          const mappedPath = new URL(ogImage).pathname;
          if (mappedPath) {
            candidates.push(mappedPath);
          }
        } catch {
          // Ignore malformed URL and keep the original candidate.
        }
      }
    }

    candidates.push(fallbackImage);
    return [...new Set(candidates)];
  }, [ogImage]);

  const [previewImage, setPreviewImage] = React.useState(previewCandidates[0]);
  const [previewIndex, setPreviewIndex] = React.useState(0);

  React.useEffect(() => {
    setPreviewIndex(0);
    setPreviewImage(previewCandidates[0]);
  }, [previewCandidates]);

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

      <div className={styles.socialPreview}>
        <div className={styles.previewHeader}>
          <ExternalLink size={16} />
          <span>Превью в соцсетях</span>
        </div>

        <div className={styles.ogPreview}>
          <div className={styles.ogImage}>
            <img
              src={previewImage}
              alt={`Превью для страницы ${path}`}
              onError={(e) => {
                const nextIndex = previewIndex + 1;
                if (nextIndex < previewCandidates.length) {
                  setPreviewIndex(nextIndex);
                  setPreviewImage(previewCandidates[nextIndex]);
                  return;
                }

                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className={styles.ogContent}>
            <div className={styles.ogTitle}>{ogTitle || title || "Заголовок"}</div>
            <div className={styles.ogDescription}>
              {ogDescription || description || "Описание"}
            </div>
            <div className={styles.ogUrl}>{displayUrl}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
