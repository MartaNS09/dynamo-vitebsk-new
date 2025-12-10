// "use client";

// import { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, Award } from "lucide-react";
// import styles from "./Legends.module.scss";

// const LEGENDS = [
//   {
//     id: 1,
//     name: "Вячеслав Яновский",
//     title: "Олимпийский чемпион",
//     sport: "Бокс",
//     year: "1988",
//     achievement: "Золото Олимпийских игр в Сеуле",
//   },
//   {
//     id: 2,
//     name: "Игорь Каныгин",
//     title: "Призёр Олимпийских игр",
//     sport: "Классическая борьба",
//     year: "1980",
//     achievement: "Серебро Олимпиады в Москве",
//   },
//   {
//     id: 3,
//     name: "Татьяна Шаракова",
//     title: "Чемпионка мира",
//     sport: "Велоспорт",
//     year: "2015",
//     achievement: "Многократная чемпионка мира и Европы",
//   },
//   {
//     id: 4,
//     name: "Лариса Петрик",
//     title: "Олимпийская чемпионка",
//     sport: "Спортивная гимнастика",
//     year: "1968",
//     achievement: "Золото Олимпийских игр в Мексике",
//   },
//   {
//     id: 5,
//     name: "Константин Сивцов",
//     title: "Чемпион мира",
//     sport: "Биатлон",
//     year: "2021",
//     achievement: "Чемпион мира по биатлону",
//   },
//   {
//     id: 6,
//     name: "Тамара Лазакович",
//     title: "Олимпийская чемпионка",
//     sport: "Спортивная гимнастика",
//     year: "1972",
//     achievement: "Золото Олимпийских игр в Мюнхене",
//   },
//   {
//     id: 7,
//     name: "Александр Кучинский",
//     title: "Многократный чемпион РБ",
//     sport: "Стрельба пулевая",
//     year: "2000-е",
//     achievement:
//       "Многократный чемпион Беларуси, призёр международных соревнований",
//   },
//   {
//     id: 8,
//     name: "Сергей Лагун",
//     title: "Призёр чемпионата мира",
//     sport: "Биатлон",
//     year: "2010-е",
//     achievement: "Призёр чемпионатов мира, участник Олимпийских игр",
//   },
// ];

// export const LegendsSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % LEGENDS.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + LEGENDS.length) % LEGENDS.length);
//   };

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//     setIsAutoPlaying(false);
//   };

//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000); // 5 секунд на слайд

//     return () => clearInterval(interval);
//   }, [isAutoPlaying]);

//   return (
//     <section className={styles.legends} aria-labelledby="legends-title">
//       <div className="container">
//         {/* Заголовок */}
//         <div className={styles.legends__header}>
//           <div className={styles.legends__badge}>
//             <span>🏆</span>
//             <span>ВЕДУЩИЕ СПОРТСМЕНЫ РАЗНЫХ ЛЕТ</span>
//           </div>
//           <h2 className={styles.legends__title} id="legends-title">
//             Спортсмены, прославившие{" "}
//             <span className={styles.legends__highlight}>Витебск</span>
//           </h2>
//         </div>

//         {/* Слайдер */}
//         <div
//           className={styles.legends__slider}
//           ref={sliderRef}
//           onMouseEnter={() => setIsAutoPlaying(false)}
//           onMouseLeave={() => setIsAutoPlaying(true)}
//         >
//           <button
//             className={styles.legends__navButton}
//             onClick={prevSlide}
//             aria-label="Предыдущая легенда"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <div className={styles.legends__track}>
//             {LEGENDS.map((legend, index) => (
//               <div
//                 key={legend.id}
//                 className={`${styles.legends__slide} ${
//                   index === currentIndex ? styles.active : ""
//                 }`}
//                 style={{
//                   //   transform: `translateX(calc(-${currentIndex * 100}%))`,
//                   transform: `translateX(calc(-${currentIndex * 50}%))`, // 50% вместо 100%
//                 }}
//                 aria-hidden={index !== currentIndex}
//               >
//                 <div className={styles.legends__card}>
//                   <div className={styles.legends__cardHeader}>
//                     <div className={styles.legends__sportBadge}>
//                       {legend.sport}
//                     </div>
//                     <div className={styles.legends__year}>{legend.year}</div>
//                   </div>

//                   <div className={styles.legends__cardContent}>
//                     <div className={styles.legends__avatar}>
//                       <span>{legend.name.charAt(0)}</span>
//                     </div>

//                     <h3 className={styles.legends__name}>{legend.name}</h3>
//                     <div className={styles.legends__title}>
//                       <Award size={18} />
//                       {legend.title}
//                     </div>
//                     <p className={styles.legends__achievement}>
//                       {legend.achievement}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             className={styles.legends__navButton}
//             onClick={nextSlide}
//             aria-label="Следующая легенда"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Индикаторы + счетчик */}
//         <div className={styles.legends__controls}>
//           <div className={styles.legends__indicators}>
//             {LEGENDS.map((_, index) => (
//               <button
//                 key={index}
//                 className={`${styles.legends__indicator} ${
//                   index === currentIndex ? styles.active : ""
//                 }`}
//                 onClick={() => goToSlide(index)}
//                 aria-label={`Показать спортсмена ${index + 1}`}
//                 aria-current={index === currentIndex}
//               />
//             ))}
//           </div>

//           <div className={styles.legends__counter}>
//             <span className={styles.legends__current}>{currentIndex + 1}</span>
//             <span className={styles.legends__total}>/{LEGENDS.length}</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import styles from "./Legends.module.scss";

const LEGENDS = [
  {
    id: 1,
    name: "Вячеслав Яновский",
    title: "Олимпийский чемпион",
    sport: "Бокс",
    year: "1988",
    achievement: "Золото Олимпийских игр в Сеуле",
  },
  {
    id: 2,
    name: "Игорь Каныгин",
    title: "Призёр Олимпийских игр",
    sport: "Классическая борьба",
    year: "1980",
    achievement: "Серебро Олимпиады в Москве",
  },
  {
    id: 3,
    name: "Татьяна Шаракова",
    title: "Чемпионка мира",
    sport: "Велоспорт",
    year: "2015",
    achievement: "Многократная чемпионка мира и Европы",
  },
  {
    id: 4,
    name: "Лариса Петрик",
    title: "Олимпийская чемпионка",
    sport: "Спортивная гимнастика",
    year: "1968",
    achievement: "Золото Олимпийских игр в Мексике",
  },
  {
    id: 5,
    name: "Константин Сивцов",
    title: "Чемпион мира",
    sport: "Велоспорт",
    year: "2013",
    achievement: "Чемпион мира по командной гонке на время",
  },
  {
    id: 6,
    name: "Тамара Лазакович",
    title: "Олимпийская чемпионка",
    sport: "Спортивная гимнастика",
    year: "1972",
    achievement: "Золото Олимпийских игр в Мюнхене",
  },
  {
    id: 7,
    name: "Александр Кучинский",
    title: "Многократный чемпион РБ",
    sport: "Велоспорт",
    year: "2000е",
    achievement:
      "Многократный чемпион Беларуси, призёр международных соревнований",
  },
  {
    id: 8,
    name: "Сергей Лагун",
    title: "Призёр чемпионата мира",
    sport: "Тяжёлая атлетика",
    year: "2010",
    achievement: "Призёр чемпионатов мира, участник Олимпийских игр",
  },
];

export const LegendsSlider = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобилку безопасно
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Ждем когда компонент смонтирован
    setTimeout(() => {
      if (typeof window !== "undefined") {
        checkMobile();
        window.addEventListener("resize", checkMobile);
      }
    }, 100);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  // На десктопе показываем по 4, на мобилке по 1
  const cardsPerView = isMobile ? 1 : 4;
  const totalGroups = Math.ceil(LEGENDS.length / cardsPerView);

  // Получаем карточки для текущей группы
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

  // Автопереключение - ИСПРАВЛЕННЫЙ useEffect
  useEffect(() => {
    if (!isAutoPlaying || isMobile) return;

    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile, totalGroups]);

  return (
    <section className={styles.legends} aria-labelledby="legends-title">
      <div className="container">
        {/* Заголовок */}
        <div className={styles.legends__header}>
          <div className={styles.legends__badge}>
            <span>🏆</span>
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
        >
          {/* Стрелки - только на десктопе */}
          {!isMobile && (
            <>
              <button
                className={`${styles.legends__navButton} ${styles.legends__navButtonLeft}`}
                onClick={prevGroup}
                aria-label="Предыдущие спортсмены"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className={`${styles.legends__navButton} ${styles.legends__navButtonRight}`}
                onClick={nextGroup}
                aria-label="Следующие спортсмены"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Карточки */}
          <div className={styles.legends__cardsContainer}>
            {getDisplayedCards().map((legend) => (
              <div key={legend.id} className={styles.legends__cardWrapper}>
                <div className={styles.legends__card}>
                  <div className={styles.legends__cardHeader}>
                    <div className={styles.legends__sportBadge}>
                      {legend.sport}
                    </div>
                    <div className={styles.legends__year}>{legend.year}</div>
                  </div>

                  <div className={styles.legends__cardContent}>
                    <div className={styles.legends__avatar}>
                      <span>{legend.name.charAt(0)}</span>
                    </div>

                    <h3 className={styles.legends__name}>{legend.name}</h3>
                    <div className={styles.legends__title}>
                      <Award size={18} />
                      {legend.title}
                    </div>
                    <p className={styles.legends__achievement}>
                      {legend.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Индикаторы */}
        <div className={styles.legends__controls}>
          <div className={styles.legends__indicators}>
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                className={`${styles.legends__indicator} ${
                  index === currentGroup ? styles.active : ""
                }`}
                onClick={() => goToGroup(index)}
                aria-label={`Группа ${index + 1}`}
                aria-current={index === currentGroup}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
