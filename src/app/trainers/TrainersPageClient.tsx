"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import TrainerCard from "@/components/trainers/TrainerCard";
import { Trainer } from "@/utils/trainer.utils";
import styles from "./page.module.scss";

interface TrainersPageClientProps {
  trainers: Trainer[];
  departments: Array<{
    id: string;
    name: string;
    slug: string;
    count: number;
  }>;
}

export default function TrainersPageClient({
  trainers,
  departments,
}: TrainersPageClientProps) {
  const [activeDepartment, setActiveDepartment] = useState("all");

  // Фильтруем тренеров
  const filteredTrainers = useMemo(() => {
    if (activeDepartment === "all") return trainers;

    return trainers.filter(
      (trainer) =>
        trainer.departments.some((dept) => dept.slug === activeDepartment) ||
        (trainer.department &&
          trainer.department.toLowerCase().replace(/\s+/g, "-") ===
            activeDepartment)
    );
  }, [trainers, activeDepartment]);

  // Рассчитываем заполнители для сетки
  const itemsPerRow = 4;
  const totalItems = filteredTrainers.length;
  const remainder = totalItems % itemsPerRow;
  const placeholdersCount = remainder > 0 ? itemsPerRow - remainder : 0;

  return (
    <main className={styles.container}>
      {/* Hero секция - в стиле спортивных секций */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.titleWrapper}>
                <h1 id="page-title" className={styles.title}>
                  <span className={styles.titleMain}>
                    ТРЕНЕРЫ-ПРЕПОДАВАТЕЛИ
                  </span>
                  <span className={styles.titleSub}>
                    ВИТЕБСКОЙ СДЮШОР &quot;ДИНАМО&quot;
                  </span>
                </h1>
                <div className={styles.titleDecoration}>
                  <div className={styles.decorationLine}></div>
                  <div className={styles.decorationDot}></div>
                </div>
              </div>

              <div className={styles.descriptionWrapper}>
                <p className={styles.description}>
                  <span className={styles.highlight}>Профессиональные</span>{" "}
                  тренеры с высшим спортивным образованием и многолетним опытом
                  работы.
                  <span className={styles.highlight}> Каждый тренер</span> ведет
                  занятия в соответствующих отделениях спортивной школы.
                </p>
              </div>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{trainers.length}+</span>
                  <span className={styles.statLabel}>тренеров</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>
                    {departments.length - 1}+
                  </span>
                  <span className={styles.statLabel}>отделений</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>15+</span>
                  <span className={styles.statLabel}>видов спорта</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Фильтры по отделениям */}
      <section className={styles.filtersSection}>
        <div className="container">
          <div className={styles.filtersContainer}>
            <h2 className={styles.filtersTitle}>Направления</h2>

            <div className={styles.filters}>
              {departments.map((department) => (
                <button
                  key={department.id}
                  className={`${styles.filterButton} ${
                    activeDepartment === department.slug ? styles.active : ""
                  }`}
                  onClick={() => setActiveDepartment(department.slug)}
                  aria-label={`Тренеры отделения ${department.name} (${department.count})`}
                  aria-pressed={activeDepartment === department.slug}
                >
                  <span className={styles.filterName}>{department.name}</span>
                  <span className={styles.filterCount}>{department.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Сетка тренеров */}
      <section className={styles.trainersSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {activeDepartment === "all"
                ? "Все тренеры-преподаватели"
                : `Тренеры отделения "${
                    departments.find((d) => d.slug === activeDepartment)?.name
                  }"`}
            </h2>
            <p className={styles.sectionCount}>
              Найдено: <strong>{filteredTrainers.length}</strong> тренеров
            </p>
          </div>

          {filteredTrainers.length > 0 ? (
            <>
              <div className={styles.trainersGrid}>
                {filteredTrainers.map((trainer) => (
                  <TrainerCard key={trainer.id} trainer={trainer} />
                ))}

                {/* Заполнители для выравнивания сетки */}
                {Array.from({ length: placeholdersCount }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className={styles.gridPlaceholder}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>👤</div>
              <h3 className={styles.noResultsTitle}>Тренеры не найдены</h3>
              <p className={styles.noResultsText}>
                По выбранному отделению пока нет тренеров. Выберите другое
                отделение или посмотрите всех тренеров.
              </p>
              <button
                className={styles.resetButton}
                onClick={() => setActiveDepartment("all")}
                aria-label="Показать всех тренеров"
              >
                Показать всех тренеров
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Контакты и CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Есть вопросы по выбору тренера?</h2>
            <p className={styles.ctaText}>
              Наши специалисты с радостью проконсультируют вас и помогут сделать
              правильный выбор.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="tel:+375333102525"
                className={styles.phoneButton}
                aria-label="Позвонить по телефону +375 (33) 310-25-25"
              >
                <span className={styles.buttonIcon}>📞</span>
                <span>Позвонить</span>
              </a>
              <Link
                href="/enrollment"
                className={styles.enrollButton}
                aria-label="Записаться онлайн к тренеру"
              >
                <span className={styles.buttonIcon}>📝</span>
                <span>Запись онлайн</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
