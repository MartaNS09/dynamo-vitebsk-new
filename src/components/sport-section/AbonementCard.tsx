"use client";

import React from "react";
import { Abonement } from "@/types/sport-section.types";
import { Check } from "@/components/icons";
import styles from "./AbonementCard.module.scss";

interface AbonementCardProps {
  abonement: Abonement;
  sectionName: string;
  index?: number;
}

export default function AbonementCard({
  abonement,
  sectionName,
  index = 0,
}: AbonementCardProps) {
  return (
    <div
      className={`${styles.card} ${abonement.isPopular ? styles.popular : ""}`}
      data-card-index={index}
    >
      {/* Звезда */}
      {abonement.isPopular && (
        <div
          className={styles.popularStar}
          title="Популярный абонемент"
          aria-label="Популярный"
        />
      )}

      {/* Заголовок и описание */}
      <div className={styles.header}>
        <h3 className={styles.title}>{abonement.name}</h3>
        <p className={styles.description}>{abonement.description}</p>
      </div>

      {/* Цена и длительность */}
      <div className={styles.priceContainer}>
        <div className={styles.price}>
          <span className={styles.priceAmount}>{abonement.price}</span>
          <span className={styles.currency}>{abonement.currency}</span>
        </div>
        <span className={styles.duration}>{abonement.duration}</span>
      </div>

      {/* Особенности */}
      <div className={styles.features}>
        <ul className={styles.featuresList}>
          {abonement.features.map((feature, idx) => (
            <li key={idx} className={styles.feature}>
              <Check
                style={{ width: 14, height: 14 }}
                className={styles.icon}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Кнопка */}
      <div className={styles.actions}>
        <a
          href={`/enrollment?section=${encodeURIComponent(
            sectionName
          )}&abonement=${abonement.id}`}
          className={styles.enrollButton}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Выбрать
        </a>
      </div>
    </div>
  );
}
