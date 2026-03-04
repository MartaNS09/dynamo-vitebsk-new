"use client";

import { useState, useEffect, useRef, useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SportCard from "@/components/sport-section/SportCard";
import { getSections } from "@/lib/api/sections";
import { getCategorySlug, getCategoryName } from "@/utils/categories";
import styles from "./page.module.scss";

export function SportsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filtersSectionRef = useRef<HTMLElement>(null);
  const [isPending, startTransition] = useTransition();

  // Состояние для секций из API
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Получаем категорию из URL и преобразуем slug в название
  const categorySlug = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState<string>(
    categorySlug ? getCategoryName(categorySlug) || "all" : "all",
  );

  // Загружаем секции из API
  useEffect(() => {
    const loadSections = async () => {
      try {
        setLoading(true);
        const data = await getSections();
        setSections(data);
      } catch (error) {
        console.error("Ошибка загрузки секций:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSections();
  }, []);

  // 🔴 ИСПРАВЛЕНО: функция обновления URL
  const updateUrl = useCallback(
    (categoryName: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (categoryName === "all") {
          params.delete("category");
        } else {
          // Преобразуем русское название в английский slug
          const slug = getCategorySlug(categoryName);
          params.set("category", slug);
        }

        router.push(
          `${pathname}${params.toString() ? "?" + params.toString() : ""}`,
          { scroll: false },
        );
      });
    },
    [pathname, router, searchParams],
  );

  // 🔴 ИСПРАВЛЕНО: обновление при изменении URL (без ошибок ESLint)
  useEffect(() => {
    const slug = searchParams.get("category");
    const currentCategory = slug ? getCategoryName(slug) || "all" : "all";

    const timer = setTimeout(() => {
      if (currentCategory !== activeFilter) {
        setActiveFilter(currentCategory);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams, activeFilter]); // ← добавили activeFilter

  // Обработчик фильтра
  const handleFilter = useCallback(
    (category: string) => {
      setActiveFilter(category);
      updateUrl(category);
    },
    [updateUrl],
  );

  // Извлекаем уникальные категории из реальных данных
  const categories = Array.from(
    new Set(sections.map((s) => s.category).filter(Boolean)),
  ) as string[];

  // Фильтруем секции (используем русские названия)
  const filteredSections =
    activeFilter === "all"
      ? sections
      : sections.filter((section) => section.category === activeFilter);

  // Рассчитываем заполнители для грида
  const itemsPerRow = 4;
  const totalItems = filteredSections.length;
  const remainder = totalItems % itemsPerRow;
  const placeholdersCount = remainder > 0 ? itemsPerRow - remainder : 0;

  const scrollToFilters = () => {
    filtersSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Загрузка спортивных секций...</p>
      </div>
    );
  }

  return (
    <>
      <main className={styles.container}>
        {/* Hero секция */}
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <div className={styles.titleWrapper}>
                  <h1 id="page-title" className={styles.title}>
                    <span className={styles.titleMain}>СПОРТИВНЫЕ СЕКЦИИ</span>
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
                    <span className={styles.highlight}>Выберите</span>{" "}
                    подходящую спортивную секцию для себя или своего ребенка.
                    <span className={styles.highlight}>
                      {" "}
                      Профессиональные тренера
                    </span>{" "}
                    и
                    <span className={styles.highlight}>
                      {" "}
                      современное оборудование
                    </span>
                    .
                  </p>
                </div>

                <div className={styles.heroAction}>
                  <div className={styles.actionBadge}>
                    <span className={styles.actionIcon}>⚡</span>
                    <span className={styles.actionText}>
                      Сила в движении и единстве
                    </span>
                  </div>

                  <button
                    className={styles.scrollButton}
                    onClick={scrollToFilters}
                    aria-label="Перейти к выбору направлений"
                  >
                    <span className={styles.scrollButtonText}>
                      Выберите направление
                    </span>
                    <div className={styles.scrollButtonArrow}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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
                    <span className={styles.statNumber}>20+</span>
                    <span className={styles.statLabel}>
                      профессиональных тренеров
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>11+</span>
                    <span className={styles.statLabel}>
                      спортивных направлений
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>1000+</span>
                    <span className={styles.statLabel}>
                      довольных спортсменов
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>50+</span>
                    <span className={styles.statLabel}>лет опыта работы</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Фильтры */}
        <section
          ref={filtersSectionRef}
          className={styles.filtersSection}
          aria-labelledby="filters-title"
        >
          <div className="container">
            <div className={styles.filtersContainer}>
              <h2 id="filters-title" className={styles.filtersTitle}>
                Направления
              </h2>
              <div className={styles.filters}>
                <button
                  className={`${styles.filterButton} ${
                    activeFilter === "all" ? styles.filterButtonActive : ""
                  }`}
                  onClick={() => handleFilter("all")}
                  aria-label="Показать все секции"
                  disabled={isPending}
                >
                  Все секции
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`${styles.filterButton} ${
                      activeFilter === category ? styles.filterButtonActive : ""
                    }`}
                    onClick={() => handleFilter(category)}
                    aria-label={`Показать секции категории ${category}`}
                    disabled={isPending}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Сетка секций */}
        <section
          className={styles.allSections}
          aria-labelledby="sections-title"
        >
          <div className="container">
            <h2 id="sections-title" className={styles.visuallyHidden}>
              Список спортивных секций
            </h2>

            {filteredSections.length > 0 ? (
              <div className={styles.sectionsGrid}>
                {filteredSections.map((section, index) => (
                  <SportCard key={section.id} section={section} index={index} />
                ))}
                {Array.from({ length: placeholdersCount }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className={styles.gridPlaceholder}
                    aria-hidden="true"
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>Секции по выбранному фильтру не найдены</p>
              </div>
            )}

            <div className={styles.enrollmentInfo}>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Как записаться в секцию?</h3>
                <ol className={styles.infoSteps}>
                  <li className={styles.step}>
                    <span className={styles.stepNumber}>1</span>
                    <p>Выберите интересующую секцию</p>
                  </li>
                  <li className={styles.step}>
                    <span className={styles.stepNumber}>2</span>
                    <p>Нажмите на карточку для подробной информации</p>
                  </li>
                  <li className={styles.step}>
                    <span className={styles.stepNumber}>3</span>
                    <p>Заполните форму записи на странице секции</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta} aria-labelledby="cta-title">
          <div className="container">
            <div className={styles.ctaContent}>
              <h2 id="cta-title" className={styles.ctaTitle}>
                Есть вопросы по выбору секции?
              </h2>
              <p className={styles.ctaText}>
                Наши специалисты с радостью проконсультируют вас и помогут
                сделать правильный выбор.
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
                <a
                  href="/enrollment"
                  className={styles.enrollButton}
                  aria-label="Записаться онлайн на спортивную секцию"
                >
                  <span className={styles.buttonIcon}>📝</span>
                  <span>Запись онлайн</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
