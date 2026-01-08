import React from "react";
import Image from "next/image";
import { Trainer } from "@/types/sport-section.types";
import styles from "./TrainerCard.module.scss";

interface TrainerCardProps {
  trainer: Trainer;
}

// Функция для получения инициалов (две буквы: первая имя и первая фамилия)
function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "??";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  // Берем первую букву имени и первую букву последнего слова (фамилии)
  const first = parts[0].charAt(0).toUpperCase();
  const last = parts[parts.length - 1].charAt(0).toUpperCase();
  return first + last;
}

// Функция для цвета
function getAvatarColor(name: string): string {
  const colors = ["#0055b7", "#1a75ff", "#003d82", "#0066cc"];
  if (!name) return colors[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  // ВАЖНО: используем пустую строку вместо undefined и проверяем
  const photo = trainer.photo || "";

  // Показываем аватар если:
  // 1. photo - undefined
  // 2. photo - пустая строка ""
  // 3. photo - строка только из пробелов
  const shouldShowAvatar = !photo || photo.trim() === "";

  const initials = getInitials(trainer.name);
  const avatarColor = getAvatarColor(trainer.name);
  const altText = `Фото тренера ${trainer.name} - ${trainer.position}`;

  return (
    <article className={styles.card}>
      <div className={styles.photoContainer}>
        {shouldShowAvatar ? (
          // Аватар с инициалами (круг как в Legends)
          <div
            className={styles.avatar}
            style={{ backgroundColor: avatarColor }}
            aria-label={`Аватар тренера ${trainer.name}`}
          >
            <span className={styles.initials}>{initials}</span>
          </div>
        ) : (
          // Фото тренера - безопасно используем photo т.к. мы уже проверили
          <div className={styles.imageWrapper}>
            <Image
              src={photo}
              alt={altText}
              width={98}
              height={130}
              className={styles.photo}
              quality={80}
              loading="lazy"
              sizes="(max-width: 480px) 90px, (max-width: 768px) 98px, 98px"
            />
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{trainer.name}</h3>
        <p className={styles.position}>{trainer.position}</p>
      </div>
    </article>
  );
}
