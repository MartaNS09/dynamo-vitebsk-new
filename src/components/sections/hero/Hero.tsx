

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import { ArrowRight, Award } from "lucide-react";
// import Image from "next/image"; // Добавляем Next.js Image компонент
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

// Обновляем PHOTO_PLACEHOLDERS, добавляем alt описания
const PHOTOS = [
  {
    id: 1,
    src: "/images/hero/sports-hall.jpg", // Пример пути
    alt: "Спортсмены тренируются в современном зале СДЮШОР Динамо Витебск",
    title: "Спортсмены в зале",
  },
  {
    id: 2,
    src: "/images/hero/gymnastics.jpg",
    alt: "Занятия по художественной гимнастике для детей в Витебске",
    title: "художественная гимнастика",
  },
  {
    id: 3,
    src: "/images/hero/shooting.jpg",
    alt: "Тренировка по пулевой стрельбе в спортивной школе Динамо",
    title: "Занятия по пулевой стрельбе",
  },
  {
    id: 4,
    src: "/images/hero/kickboxing.jpg",
    alt: "Кикбоксинг для взрослых и детей в СДЮШОР Динамо Витебск",
    title: "кикбоксинг",
  },
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
    setIsVisible(true);

    const sportInterval = setInterval(() => {
      setCurrentSport((prev) => (prev + 1) % SPORTS.length);
    }, 2000);

    const photoInterval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % PHOTOS.length);
    }, 4000);

    const duration = 2000;
    const steps = 60;
    const incrementYears = 55 / steps;
    const incrementSports = 12 / steps;
    const incrementAthletes = 850 / steps;

    let step = 0;
    const counterInterval = setInterval(() => {
      step++;
      setCounters({
        years: Math.min(55, Math.floor(incrementYears * step)),
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
    <section
      className={`${styles.hero} ${isVisible ? styles.visible : ""}`}
      aria-label="Главная секция спортивной школы"
    >
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
            <h2 className={styles.motto}>
              <span className={styles.mottoLine}></span>
              <span className={styles.mottoTextWrapper}>
                <span className={styles.mottoText}>
                  Сила в движении и единстве
                </span>
              </span>
              <span className={styles.mottoLine}></span>
            </h2>

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
                  <span
                    className={styles.sportHighlight}
                    aria-live="polite" // Объявляет изменения скринридеру
                  >
                    {SPORTS[currentSport]}
                  </span>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div
              className={styles.stats}
              role="region"
              aria-label="Статистика спортивной школы"
            >
              <div className={styles.stat}>
                <div
                  className={styles.statNumber}
                  aria-label={`${counters.years} лет работы`}
                >
                  {counters.years}+
                </div>
                <div className={styles.statLabel}>
                  лет успешной
                  <br />
                  работы
                </div>
              </div>

              <div className={styles.statDivider} aria-hidden="true"></div>

              <div className={styles.stat}>
                <div
                  className={styles.statNumber}
                  aria-label={`${counters.sports} спортивных направлений`}
                >
                  {counters.sports}+
                </div>
                <div className={styles.statLabel}>
                  спортивных
                  <br />
                  направлений
                </div>
              </div>

              <div className={styles.statDivider} aria-hidden="true"></div>

              <div className={styles.stat}>
                <div
                  className={styles.statNumber}
                  aria-label={`${counters.athletes} активных спортсменов`}
                >
                  {counters.athletes}+
                </div>
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
                <ArrowRight size={20} aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="large"
                href="/about"
                className={styles.secondaryButton}
              >
                <span>О школе</span>
                <Award size={20} aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Правая часть - фото */}
          <div className={styles.heroRight}>
            <h3 className="visually-hidden">Фотогалерея спортивной школы</h3>
            <div className={styles.photoContainer}>
              <div className={styles.photoFrame}>
                <div className={`${styles.photoSlide} ${styles.photoActive}`}>
                  {/* Плейсхолдер пока нет фото */}
                  <div
                    className={styles.photoPlaceholder}
                    role="img"
                    aria-label={PHOTOS[currentPhoto].alt}
                  >
                    <div className={styles.photoContent}>
                      <div className={styles.photoTitle}>
                        {PHOTOS[currentPhoto].title}
                      </div>
                      <div className={styles.photoSubtitle}>
                        СДЮШОР Динамо Витебск
                      </div>
                    </div>
                  </div>
                  {/* Когда будут реальные фото, используйте: */}
                  {/* <Image
                    src={PHOTOS[currentPhoto].src}
                    alt={PHOTOS[currentPhoto].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.photoImage}
                    priority
                  /> */}
                </div>
              </div>

              {/* Индикаторы фото */}
              <div
                className={styles.photoIndicators}
                role="tablist"
                aria-label="Выбор фотографии"
              >
                {PHOTOS.map((photo, index) => (
                  <button
                    key={photo.id}
                    className={`${styles.indicator} ${
                      currentPhoto === index ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPhoto(index)}
                    role="tab"
                    aria-label={`Показать фото ${index + 1}: ${photo.title}`}
                    aria-selected={currentPhoto === index}
                    aria-controls={`photo-${photo.id}`}
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
