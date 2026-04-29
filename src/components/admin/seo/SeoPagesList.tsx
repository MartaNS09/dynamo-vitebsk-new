"use client";

import React from "react";
import { SEO_PAGES, SEO_GROUPS } from "@/constants/seo";
import { SeoPage } from "@/types/seo.types";
import { Check } from "lucide-react";
import styles from "./SeoPagesList.module.scss";

interface SeoPagesListProps {
  selectedPage: string;
  onSelectPage: (pageId: string) => void;
  hasData: Record<string, boolean>;
  pages?: SeoPage[];
}

export const SeoPagesList: React.FC<SeoPagesListProps> = ({
  selectedPage,
  onSelectPage,
  hasData,
  pages,
}) => {
  const sourcePages = pages || SEO_PAGES;
  const pagesByGroup = SEO_GROUPS.map((group) => ({
    ...group,
    pages: sourcePages.filter((p) => p.group === group.id),
  }));

  return (
    <div className={styles.pagesList}>
      {pagesByGroup.map((group) => (
        <div key={group.id} className={styles.group}>
          <div className={styles.groupTitle}>{group.name}</div>
          <div className={styles.groupPages}>
            {group.pages.map((page) => (
              <button
                key={page.id}
                className={`${styles.pageButton} ${
                  selectedPage === page.id ? styles.active : ""
                }`}
                onClick={() => onSelectPage(page.id)}
              >
                <span className={styles.pageName}>{page.name}</span>
                <span className={styles.pagePath}>{page.path}</span>
                {hasData[page.id] && (
                  <Check size={14} className={styles.checkIcon} />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
