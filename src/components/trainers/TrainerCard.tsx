"use client";

import React from "react";
import Image from "next/image";
import { Trainer } from "@/utils/trainer.utils";
import styles from "./TrainerCard.module.scss";

interface TrainerCardProps {
  trainer: Trainer;
}

function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "ТН";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  if (parts.length === 0) return "ТН";

  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  return parts[0].charAt(0).toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    "var(--dynamo-blue)",
    "#0055b7",
    "#1a75ff",
    "#003d82",
    "#0066cc",
  ];

  if (!name) return colors[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  const hasPhoto = trainer.photo && trainer.photo.trim() !== "";
  const initials = getInitials(trainer.name);
  const avatarColor = getAvatarColor(trainer.name);
  const altText = `Фото тренера ${trainer.name}`;

  // Получаем основное отделение
  const mainDepartment = trainer.departments[0]?.name || trainer.department;

  return (
    <article
      className={styles.card}
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className={styles.photoContainer}>
        {hasPhoto ? (
          <div className={styles.photoWrapper}>
            <Image
              src={trainer.photo!}
              alt={altText}
              width={280}
              height={280}
              className={styles.photo}
              quality={90}
              loading="lazy"
              sizes="(max-width: 640px) 220px, 280px"
            />
          </div>
        ) : (
          <div
            className={styles.avatar}
            style={{ backgroundColor: avatarColor }}
            aria-label={`Аватар тренера ${trainer.name}`}
          >
            <span className={styles.initials}>{initials}</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.department}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21L21 21M19 21H14M5 21L3 21M5 21H10M9 6.99998H10M9 11H10M14 6.99998H15M14 11H15M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{mainDepartment}</span>
        </div>

        <h3 className={styles.name} itemProp="name">
          {trainer.name}
        </h3>

        <p className={styles.position} itemProp="jobTitle">
          {trainer.position}
        </p>
      </div>

      <meta itemProp="affiliation" content="СДЮШОР Динамо Витебск" />
      <meta itemProp="worksFor" content="Витебская СДЮШОР Динамо" />
    </article>
  );
}
