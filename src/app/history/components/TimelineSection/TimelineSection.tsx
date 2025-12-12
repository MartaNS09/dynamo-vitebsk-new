"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Trophy,
  Users,
  Building,
  Target,
  Star,
  ChevronDown,
} from "lucide-react";
import styles from "./TimelineSection.module.scss";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "foundation" | "achievement" | "expansion" | "modern";
  isHighlight: boolean;
}

export default function TimelineSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      year: "1975",
      title: "Основание школы «Юный динамовец»",
      description:
        "Приказом Витебского областного совета «Динамо» создана комплексная спортивная школа с 8 видами спорта: легкая атлетика, велоспорт, борьба самбо, стрельба, лыжный спорт, тяжелая атлетика, борьба дзюдо.",
      icon: <Building size={24} />,
      category: "foundation",
      isHighlight: true,
    },
    {
      year: "1980",
      title: "Первая олимпийская медаль",
      description:
        "Игорь Каныгин завоевал серебряную медаль на Московской Олимпиаде в классической борьбе (весовая категория 90кг).",
      icon: <Trophy size={24} />,
      category: "achievement",
      isHighlight: true,
    },
    {
      year: "1988",
      title: "Олимпийское золото",
      description:
        "Вячеслав Яновский под руководством заслуженного тренера БССР В.Г. Кондратенко выиграл золотую медаль на Олимпиаде в Сеуле по боксу.",
      icon: <Star size={24} />,
      category: "achievement",
      isHighlight: true,
    },
    {
      year: "1994",
      title: "Статус СДЮШОР",
      description:
        "Школа получила статус специализированной детско-юношеской школы олимпийского резерва (СДЮШОР).",
      icon: <Target size={24} />,
      category: "expansion",
      isHighlight: false,
    },
    {
      year: "2004",
      title: "Олимпиада в Афинах",
      description:
        "6 спортсменов школы приняли участие в XXVIII летних Олимпийских играх. Школа культивировала 8 олимпийских видов спорта.",
      icon: <Calendar size={24} />,
      category: "achievement",
      isHighlight: false,
    },
    {
      year: "2005",
      title: "Юридический статус",
      description:
        "Учреждение «Витебская СДЮШОР» БФСО «Динамо» получило статус юридического лица.",
      icon: <Building size={24} />,
      category: "modern",
      isHighlight: false,
    },
    {
      year: "Сегодня",
      title: "Современный этап",
      description:
        "12 спортивных направлений, современная база, квалифицированные тренеры. Продолжаем готовить чемпионов мирового уровня.",
      icon: <Users size={24} />,
      category: "modern",
      isHighlight: true,
    },
  ];

  const categories = [
    { id: "all", label: "Вся история", count: timelineEvents.length },
    {
      id: "foundation",
      label: "Основание",
      count: timelineEvents.filter((e) => e.category === "foundation").length,
    },
    {
      id: "achievement",
      label: "Достижения",
      count: timelineEvents.filter((e) => e.category === "achievement").length,
    },
    {
      id: "expansion",
      label: "Развитие",
      count: timelineEvents.filter((e) => e.category === "expansion").length,
    },
    {
      id: "modern",
      label: "Современность",
      count: timelineEvents.filter((e) => e.category === "modern").length,
    },
  ];

  const filteredEvents =
    activeCategory === "all"
      ? timelineEvents
      : timelineEvents.filter((event) => event.category === activeCategory);

  const toggleEvent = (year: string) => {
    setExpandedEvent(expandedEvent === year ? null : year);
  };

  return (
    <section
      className={styles.timeline}
      aria-labelledby="timeline-title"
      role="region"
    >
      <div className="container">
        <div className={styles.header}>
          <h2 id="timeline-title" className={styles.title}>
            Хронология ключевых событий
          </h2>
          <p className={styles.subtitle}>
            Основные этапы развития школы за 50+ лет
          </p>
        </div>

        <div
          className={styles.filters}
          role="tablist"
          aria-label="Фильтры периодов"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls="timeline-content"
            >
              <span className={styles.filterLabel}>{category.label}</span>
              <span
                className={styles.filterCount}
                aria-label={`${category.count} событий`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>

        <div
          className={styles.timelineContainer}
          id="timeline-content"
          role="tabpanel"
        >
          <div className={styles.timelineLine} aria-hidden="true" />

          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className={`${styles.timelineItem} ${
                event.isHighlight ? styles.highlight : ""
              } ${index % 2 === 0 ? styles.left : styles.right}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              role="article"
              aria-label={`Событие ${event.year}: ${event.title}`}
            >
              <div className={styles.yearMarker}>
                <span className={styles.year}>{event.year}</span>
                <div className={styles.icon}>{event.icon}</div>
              </div>

              <div className={styles.content}>
                <h3 className={styles.eventTitle}>{event.title}</h3>

                <AnimatePresence>
                  {expandedEvent === event.year ? (
                    <motion.p
                      className={styles.eventDescription}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      aria-hidden={expandedEvent !== event.year}
                    >
                      {event.description}
                    </motion.p>
                  ) : (
                    <p
                      className={styles.eventPreview}
                      aria-hidden={expandedEvent === event.year}
                    >
                      {event.description.substring(0, 100)}...
                    </p>
                  )}
                </AnimatePresence>

                <button
                  className={styles.expandButton}
                  onClick={() => toggleEvent(event.year)}
                  aria-expanded={expandedEvent === event.year}
                  aria-controls={`event-${event.year}`}
                  aria-label={`${
                    expandedEvent === event.year ? "Свернуть" : "Развернуть"
                  } подробности события ${event.year}`}
                >
                  <ChevronDown
                    size={18}
                    className={
                      expandedEvent === event.year ? styles.rotated : ""
                    }
                    aria-hidden="true"
                  />
                  <span>
                    {expandedEvent === event.year
                      ? "Скрыть детали"
                      : "Подробнее"}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
