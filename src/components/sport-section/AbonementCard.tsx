import React from "react";
import { Abonement } from "@/types/sport-section.types";
import { Button } from "@/components/ui/Button/Button"; // ← исправьте импорт
import { Check, Star } from "@/components/icons";
import styles from "./AbonementCard.module.scss";

interface AbonementCardProps {
  abonement: Abonement;
  sectionName: string;
}

export default function AbonementCard({
  abonement,
  sectionName,
}: AbonementCardProps) {
  return (
    <div
      className={`${styles.card} ${abonement.isPopular ? styles.popular : ""}`}
    >
      {/* Популярный бейдж */}
      {abonement.isPopular && (
        <div className={styles.popularBadge}>
          <Star style={{ width: 16, height: 16 }} /> {/* ← ИСПРАВЛЕНО */}
          <span>Самый популярный</span>
        </div>
      )}

      {/* Заголовок и описание */}
      <div className={styles.header}>
        <h3 className={styles.name}>{abonement.name}</h3>
        <p className={styles.description}>{abonement.description}</p>
      </div>

      {/* Цена */}
      <div className={styles.priceSection}>
        <div className={styles.price}>
          <span className={styles.priceAmount}>{abonement.price}</span>
          <span className={styles.priceCurrency}>BYN</span>
        </div>
        <div className={styles.duration}>{abonement.duration}</div>
      </div>

      {/* Особенности */}
      <ul className={styles.features}>
        {abonement.features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            <Check
              style={{ width: 16, height: 16 }} // ← ИСПРАВЛЕНО
              className={styles.checkIcon}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Кнопка записи */}
      <div className={styles.actions}>
        <Button
          variant={abonement.isPopular ? "primary" : "secondary"}
          size="medium"
          href={`/enrollment?section=${sectionName}&abonement=${abonement.id}`}
          fullWidth
        >
          Выбрать этот абонемент
        </Button>
      </div>
    </div>
  );
}
