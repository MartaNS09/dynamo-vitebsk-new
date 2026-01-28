"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./BlogHero.module.scss";

export const BlogHero = () => {
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
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.blogHero} ${isVisible ? styles.visible : ""}`}
      aria-labelledby="blog-hero-title"
      role="region"
      aria-label="Герой блога"
    >
      <div className="container">
        {/* Декоративные элементы - анимация */}
        <div
          className={styles.decorativeElements}
          role="presentation"
          aria-hidden="true"
        >
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>

        {/* Заголовок секции */}
        <header className={styles.hero__header}>
          <div className={styles.hero__titleWrapper}>
            <span className={styles.hero__subtitle} id="blog-hero-title">
              Новости и события
            </span>
            <h1 className={styles.hero__title}>
              <span className={styles.hero__titleText}>Наш блог</span>
              <span className={styles.hero__titleAccent}> СДЮШОР «Динамо»</span>
            </h1>
          </div>
          <p className={styles.hero__description}>
            Следите за последними достижениями, спортивными событиями и
            новостями нашей школы. Будьте в курсе всех важных мероприятий!
          </p>
        </header>
      </div>
    </section>
  );
};
