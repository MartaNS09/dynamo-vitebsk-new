"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SportSection } from "@/types/sport-section.types";
import styles from "./SportCard.module.scss";

interface SportCardProps {
  section: SportSection;
  index: number;
}

export default function SportCard({ section, index }: SportCardProps) {
  // ✅ ИСПОЛЬЗУЕМ ОРИГИНАЛЬНЫЕ РАЗМЕРЫ 292×344
  const imageWidth = 292;
  const imageHeight = 344;

  return (
    <article className={styles.card}>
      <Link
        href={`/sports/${section.slug}`}
        className={styles.cardLink}
        aria-label={`${section.name} - ${section.shortDescription}`}
      >
        {/* ✅ ФОТО С ПРАВИЛЬНЫМИ РАЗМЕРАМИ И PADDING */}
        <div className={styles.imageContainer}>
          <Image
            src={section.coverImage}
            alt={`${section.name} в СДЮШОР Динамо Витебск`}
            width={imageWidth}
            height={imageHeight}
            className={styles.image}
            loading={index < 4 ? "eager" : "lazy"}
            priority={index < 2}
            quality={80} // Увеличили качество
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='292' height='344' viewBox='0 0 292 344'%3E%3Crect width='292' height='344' fill='%23f0f0f0'/%3E%3C/svg%3E"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "220px",
            }}
          />
        </div>

        {/* ✅ КОНТЕНТ С PADDING И ПРИЖАТЫМ НИЗОМ */}
        <div className={styles.content}>
          <h3 className={styles.title}>{section.name}</h3>
          <p className={styles.description}>{section.shortDescription}</p>

          {/* ✅ ПРИЖИМАЕМ К НИЗУ */}
          <div className={styles.bottomContent}>
            <span className={styles.ageLabel}>{section.ageInfo}</span>
            <span className={styles.ctaText}>
              Подробнее
              <span className={styles.arrow}>→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
