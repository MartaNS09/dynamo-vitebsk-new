"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Shield, Clock, Target, Trophy, TrendingUp } from "lucide-react";
import styles from "./Features.module.scss";

const FEATURES = [
  {
    icon: <Users size={32} />,
    title: "Профессиональные тренеры",
    description:
      "Квалифицированные специалисты с педагогическим образованием и спортивными достижениями",
  },
  {
    icon: <Trophy size={32} />,
    title: "Спортивные победы",
    description:
      "Наши воспитанники регулярно занимают призовые места на республиканских и международных соревнованиях",
  },
  {
    icon: <Shield size={32} />,
    title: "Безопасность на первом месте",
    description:
      "Современное оборудование, сертифицированные залы и медицинское сопровождение",
  },
  {
    icon: <Clock size={32} />,
    title: "Удобное расписание",
    description:
      "Групповые и индивидуальные тренировки в удобное время для детей, подростков и взрослых",
  },
  {
    icon: <Target size={32} />,
    title: "Индивидуальный подход",
    description:
      "Программы тренировок разрабатываются с учётом возраста, физической подготовки и целей спортсмена",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Постоянное развитие",
    description:
      "Система спортивных разрядов, аттестаций и возможность роста от новичка до мастера спорта",
  },
];

export const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className={`${styles.features} ${isVisible ? styles.visible : ""}`}
      aria-labelledby="features-title"
    >
      <div className="container">
        {/* Заголовок секции */}
        <div className={styles.features__header}>
          <div className={styles.features__titleWrapper}>
            <span className={styles.features__subtitle} id="features-title">
              Наши преимущества
            </span>
            <h2 className={styles.features__title}>
              Почему выбирают
              <span className={styles.features__titleAccent}>
                {" "}
                СДЮШОР «Динамо»
              </span>
            </h2>
          </div>
          <p className={styles.features__description}>
            Более <strong>55 лет</strong> мы развиваем спортивный потенциал
            Витебска, сочетая проверенные методики с современными подходами к
            подготовке спортсменов
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className={styles.features__grid}>
          {FEATURES.map((feature, index) => (
            <article
              key={index}
              className={styles.features__card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.features__iconWrapper}>
                <div className={styles.features__icon}>{feature.icon}</div>
                <div className={styles.features__iconDecoration} />
              </div>
              <h3 className={styles.features__cardTitle}>{feature.title}</h3>
              <p className={styles.features__cardDescription}>
                {feature.description}
              </p>
              <div className={styles.features__cardDecoration} />
            </article>
          ))}
        </div>

        {/* Дополнительная информация - БЛОК УБРАН */}
      </div>
    </section>
  );
};
