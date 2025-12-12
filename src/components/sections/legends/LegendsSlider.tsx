

"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
// import Image from "next/image";
import styles from "./Legends.module.scss";

const LEGENDS = [
  {
    id: 1,
    name: "Вячеслав Яновский",
    title: "Олимпийский чемпион",
    sport: "Бокс",
    year: "1988",
    achievement: "Золото Олимпийских игр в Сеуле",
    image: "/images/legends/yanovsky.jpg", // Пример пути
    alt: "Вячеслав Яновский, олимпийский чемпион по боксу 1988 года",
  },
  {
    id: 2,
    name: "Игорь Каныгин",
    title: "Призёр Олимпийских игр",
    sport: "Классическая борьба",
    year: "1980",
    achievement: "Серебро Олимпиады в Москве",
    image: "/images/legends/kanygin.jpg",
    alt: "Игорь Каныгин, серебряный призёр Олимпиады 1980 по борьбе",
  },
  {
    id: 3,
    name: "Татьяна Шаракова",
    title: "Чемпионка мира",
    sport: "Велоспорт",
    year: "2015",
    achievement: "Многократная чемпионка мира и Европы",
    image: "/images/legends/sharakova.jpg",
    alt: "Татьяна Шаракова, чемпионка мира по велоспорту",
  },
  {
    id: 4,
    name: "Лариса Петрик",
    title: "Олимпийская чемпионка",
    sport: "Спортивная гимнастика",
    year: "1968",
    achievement: "Золото Олимпийских игр в Мексике",
    image: "/images/legends/petrik.jpg",
    alt: "Лариса Петрик, олимпийская чемпионка по гимнастике",
  },
  {
    id: 5,
    name: "Константин Сивцов",
    title: "Чемпион мира",
    sport: "Велоспорт",
    year: "2013",
    achievement: "Чемпион мира по командной гонке на время",
    image: "/images/legends/sivtsov.jpg",
    alt: "Константин Сивцов, чемпион мира по велоспорту",
  },
  {
    id: 6,
    name: "Тамара Лазакович",
    title: "Олимпийская чемпионка",
    sport: "Спортивная гимнастика",
    year: "1972",
    achievement: "Золото Олимпийских игр в Мюнхене",
    image: "/images/legends/lazakovich.jpg",
    alt: "Тамара Лазакович, олимпийская чемпионка по гимнастике",
  },
  {
    id: 7,
    name: "Александр Кучинский",
    title: "Многократный чемпион РБ",
    sport: "Велоспорт",
    year: "2000е",
    achievement:
      "Многократный чемпион Беларуси, призёр международных соревнований",
    image: "/images/legends/kuchinsky.jpg",
    alt: "Александр Кучинский, чемпион Беларуси по велоспорту",
  },
  {
    id: 8,
    name: "Сергей Лагун",
    title: "Призёр чемпионата мира",
    sport: "Тяжёлая атлетика",
    year: "2010",
    achievement: "Призёр чемпионатов мира, участник Олимпийских игр",
    image: "/images/legends/lagun.jpg",
    alt: "Сергей Лагун, призёр чемпионата мира по тяжёлой атлетике",
  },
];

export const LegendsSlider = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  const cardsPerView = isMobile ? 1 : 4;
  const totalGroups = Math.ceil(LEGENDS.length / cardsPerView);

  const getDisplayedCards = () => {
    const start = currentGroup * cardsPerView;
    const end = start + cardsPerView;
    return LEGENDS.slice(start, end);
  };

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
  };

  const prevGroup = () => {
    setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  const goToGroup = (index: number) => {
    setCurrentGroup(index);
    setIsAutoPlaying(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;

    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextGroup();
      } else {
        prevGroup();
      }
    }
  };

  useEffect(() => {
    if (!isAutoPlaying || isMobile) return;

    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile, totalGroups]);

  return (
    <section
      className={styles.legends}
      aria-labelledby="legends-title"
      role="region"
      aria-label="Известные спортсмены"
    >
      <div className="container">
        {/* Заголовок */}
        <div className={styles.legends__header}>
          <div className={styles.legends__badge}>
            <span aria-hidden="true">🏆</span>
            <span>ВЕДУЩИЕ СПОРТСМЕНЫ РАЗНЫХ ЛЕТ</span>
          </div>
          <h2 className={styles.legends__title} id="legends-title">
            Спортсмены, прославившие{" "}
            <span className={styles.legends__highlight}>Витебск</span>
          </h2>
        </div>

        {/* Слайдер */}
        <div
          className={styles.legends__slider}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          role="group"
          aria-label="Карусель известных спортсменов"
        >
          {/* Стрелки */}
          {!isMobile && (
            <>
              <button
                className={`${styles.legends__navButton} ${styles.legends__navButtonLeft}`}
                onClick={prevGroup}
                aria-label="Предыдущие спортсмены"
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>

              <button
                className={`${styles.legends__navButton} ${styles.legends__navButtonRight}`}
                onClick={nextGroup}
                aria-label="Следующие спортсмены"
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </>
          )}

          {/* Карточки */}
          <div
            ref={cardsContainerRef}
            className={styles.legends__cardsContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getDisplayedCards().map((legend) => (
              <article
                key={legend.id}
                className={styles.legends__cardWrapper}
                role="article"
                aria-label={`Спортсмен: ${legend.name}`}
              >
                <div className={styles.legends__card}>
                  <div className={styles.legends__cardHeader}>
                    <div className={styles.legends__sportBadge}>
                      {legend.sport}
                    </div>
                    <div className={styles.legends__year}>{legend.year}</div>
                  </div>

                  <div className={styles.legends__cardContent}>
                    {/* Аватар/Фото */}
                    <div className={styles.legends__avatar}>
                      {/* Плейсхолдер пока нет фото */}
                      <span aria-hidden="true">{legend.name.charAt(0)}</span>

                      {/* Когда будут реальные фото: */}
                      {/* <Image
                        src={legend.image}
                        alt={legend.alt}
                        width={80}
                        height={80}
                        className={styles.legends__photo}
                      /> */}
                    </div>

                    <h3 className={styles.legends__name}>{legend.name}</h3>
                    <div className={styles.legends__title}>
                      <Award size={18} aria-hidden="true" />
                      {legend.title}
                    </div>
                    <p className={styles.legends__achievement}>
                      {legend.achievement}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Индикаторы */}
        <div
          className={styles.legends__controls}
          role="navigation"
          aria-label="Навигация по группам спортсменов"
        >
          <div className={styles.legends__indicators}>
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                className={`${styles.legends__indicator} ${
                  index === currentGroup ? styles.active : ""
                }`}
                onClick={() => goToGroup(index)}
                aria-label={`Группа спортсменов ${index + 1}`}
                aria-current={index === currentGroup ? "page" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
