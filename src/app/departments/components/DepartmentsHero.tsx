"use client";

import styles from "../page.module.scss";

export default function DepartmentsHero() {
  const scrollToDepartments = () => {
    document.getElementById("departments")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.titleWrapper}>
              <h1 id="page-title" className={styles.title}>
                <span className={styles.titleMain}>СПОРТИВНЫЕ ОТДЕЛЕНИЯ</span>
                <span className={styles.titleSub}>
                  СДЮШОР &quot;ДИНАМО&quot; ВИТЕБСК
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
                спортивные отделения с
                <span className={styles.highlight}> многолетней историей</span>{" "}
                и
                <span className={styles.highlight}>
                  {" "}
                  чемпионскими традициями
                </span>
                . Подготовка спортсменов высшего класса.
              </p>
            </div>

            <div className={styles.heroAction}>
              <div className={styles.actionBadge}>
                <span className={styles.actionIcon}>🏆</span>
                <span className={styles.actionText}>
                  Воспитываем чемпионов с 1975 года
                </span>
              </div>

              <button
                className={styles.scrollButton}
                onClick={scrollToDepartments}
                aria-label="Перейти к выбору отделений"
              >
                <span className={styles.scrollButtonText}>
                  Выберите отделение
                </span>
                <div className={styles.scrollButtonArrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5L12 19M12 19L19 12M12 19L5 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>спортивных отделений</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>лет истории</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>мастеров спорта</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>чемпионов мира</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
