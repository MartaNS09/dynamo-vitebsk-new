import React from "react";
import Image from "next/image";
import { Trainer } from "@/types/sport-section.types";
import styles from "./TrainerCard.module.scss";

interface TrainerCardProps {
  trainer: Trainer;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <div className={styles.card}>
      {/* Фото тренера */}
      <div className={styles.photoContainer}>
        <Image
          src={trainer.photo || "/images/trainers/default.jpg"}
          alt={trainer.name}
          fill
          className={styles.photo}
        />
      </div>

      {/* Информация */}
      <div className={styles.info}>
        <h3 className={styles.name}>{trainer.name}</h3>
        <p className={styles.position}>{trainer.position}</p>

        {trainer.description && (
          <p className={styles.description}>{trainer.description}</p>
        )}
      </div>
    </div>
  );
}
