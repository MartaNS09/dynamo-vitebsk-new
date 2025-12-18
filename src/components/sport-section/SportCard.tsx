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
  // Фиксированные размеры для CLS
  const imageWidth = 600;
  const imageHeight = 400;

  return (
    <article
      className={styles.card}
      itemScope
      itemType="https://schema.org/SportsActivityLocation"
      aria-labelledby={`card-title-${section.id}`}
      style={{
        minHeight: "500px",
        position: "relative",
      }}
    >
      <Link
        href={`/sports/${section.slug}`}
        className={styles.cardLink}
        aria-label={`${section.name} - ${section.shortDescription}`}
        prefetch={true}
        scroll={true}
      >
        <div
          className={styles.imageContainer}
          style={{
            width: "100%",
            height: "250px",
            position: "relative",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Image
            src={section.coverImage}
            alt={`${section.name} в СДЮШОР Динамо Витебск`}
            width={imageWidth}
            height={imageHeight}
            className={styles.image}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            loading={index < 3 ? "eager" : "lazy"}
            priority={index < 2}
            quality={70}
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f5f5f5'/%3E%3C/svg%3E"
          />
        </div>

        <div
          className={styles.content}
          style={{
            minHeight: "250px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              id={`card-title-${section.id}`}
              className={styles.title}
              itemProp="name"
            >
              {section.name}
            </h3>

            <p
              className={styles.description}
              itemProp="description"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {section.shortDescription}
            </p>
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.ageGroup}>
              <span className={styles.ageLabel}>{section.ageInfo}</span>
            </div>

            <div className={styles.cta}>
              <span className={styles.ctaText}>
                Подробнее
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
