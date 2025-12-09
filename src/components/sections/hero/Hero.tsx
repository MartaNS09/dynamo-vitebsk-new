"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import { ArrowRight, Award } from "lucide-react";
import styles from "./Hero.module.scss";

const SPORTS = [
  "кикбоксинг",
  "художественная гимнастика",
  "легкая атлетика",
  "каратэ",
  "стрельба пулевая",
  "акробатика",
  "велоспорт",
];

const PHOTO_PLACEHOLDERS = [
  "Спортсмены в зале",
  "художественная гимнастика",
  "Занятия по пулевой стрельбе",
  "кикбоксинг",
];

export const Hero = () => {
  const [currentSport, setCurrentSport] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [counters, setCounters] = useState({
    years: 0,
    sports: 0,
    athletes: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Анимация появления
    setIsVisible(true);

    // Смена видов спорта - БЫСТРЕЕ (2 сек вместо 3)
    const sportInterval = setInterval(() => {
      setCurrentSport((prev) => (prev + 1) % SPORTS.length);
    }, 2000); // ← ИЗМЕНЕНО: 2000ms = 2 секунды

    // Смена фото placeholder
    const photoInterval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % PHOTO_PLACEHOLDERS.length);
    }, 4000);

    // Анимация счетчиков - 55+ лет вместо 46
    const duration = 2000;
    const steps = 60;
    const incrementYears = 55 / steps; // ← ИЗМЕНЕНО: 55 лет
    const incrementSports = 12 / steps;
    const incrementAthletes = 850 / steps;

    let step = 0;
    const counterInterval = setInterval(() => {
      step++;
      setCounters({
        years: Math.min(55, Math.floor(incrementYears * step)), // ← ИЗМЕНЕНО: 55
        sports: Math.min(12, Math.floor(incrementSports * step)),
        athletes: Math.min(850, Math.floor(incrementAthletes * step)),
      });

      if (step >= steps) clearInterval(counterInterval);
    }, duration / steps);

    return () => {
      clearInterval(sportInterval);
      clearInterval(photoInterval);
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <section className={`${styles.hero} ${isVisible ? styles.visible : ""}`}>
      <div className="container">
        <div className={styles.heroContent}>
          {/* Левая часть - контент */}
          <div className={styles.heroLeft}>
            {/* Заголовок - ОДНОЙ СТРОКОЙ */}
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                <span className={styles.titleDynamo}>Динамо</span>
                <span className={styles.titleSeparator}></span>
                <span className={styles.titleVitebsk}>Витебск</span>
              </h1>
              <div className={styles.titleLine}></div>
            </div>

            {/* Девиз - линии с обеих сторон */}
            <div className={styles.motto}>
              <div className={styles.mottoLine}></div>
              <div className={styles.mottoTextWrapper}>
                <span className={styles.mottoText}>
                  Сила в движении и единстве
                </span>
              </div>
              <div className={styles.mottoLine}></div>
            </div>

            {/* Приглашение */}
            <div className={styles.invitation}>
              <p className={styles.invitationText}>
                Приглашаем детей и взрослых
                <br />
                на спортивные секции в Витебске
              </p>

              <div className={styles.sportRotator}>
                <span className={styles.rotatorLabel}>Направление:</span>
                <div className={styles.sportHighlightWrapper}>
                  <span className={styles.sportHighlight}>
                    {SPORTS[currentSport]}
                  </span>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{counters.years}+</div>
                <div className={styles.statLabel}>
                  лет успешной
                  <br />
                  работы
                </div>
              </div>

              <div className={styles.statDivider}></div>

              <div className={styles.stat}>
                <div className={styles.statNumber}>{counters.sports}+</div>
                <div className={styles.statLabel}>
                  спортивных
                  <br />
                  направлений
                </div>
              </div>

              <div className={styles.statDivider}></div>

              <div className={styles.stat}>
                <div className={styles.statNumber}>{counters.athletes}+</div>
                <div className={styles.statLabel}>
                  активных
                  <br />
                  спортсменов
                </div>
              </div>
            </div>

            {/* Кнопки */}
            <div className={styles.actions}>
              <Button
                variant="primary"
                size="large"
                href="/sections"
                className={styles.primaryButton}
              >
                <span>Подробнее</span>
                <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                size="large"
                href="/about"
                className={styles.secondaryButton}
              >
                <span>О школе</span>
                <Award size={20} />
              </Button>
            </div>
          </div>

          {/* Правая часть - фото */}
          <div className={styles.heroRight}>
            <div className={styles.photoContainer}>
              <div className={styles.photoFrame}>
                <div className={`${styles.photoSlide} ${styles.photoActive}`}>
                  <div className={styles.photoPlaceholder}>
                    <div className={styles.photoContent}>
                      <div className={styles.photoTitle}>
                        {PHOTO_PLACEHOLDERS[currentPhoto]}
                      </div>
                      <div className={styles.photoSubtitle}>
                        СДЮШОР Динамо Витебск
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Индикаторы фото */}
              <div className={styles.photoIndicators}>
                {PHOTO_PLACEHOLDERS.map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.indicator} ${
                      currentPhoto === index ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPhoto(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
