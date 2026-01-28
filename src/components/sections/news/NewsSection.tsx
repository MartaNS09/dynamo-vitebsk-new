"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sortedBlogPosts } from "@/data/blog-posts";
import styles from "./NewsSection.module.scss";

export function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Только 3 новости для производительности
  const news = sortedBlogPosts.slice(0, 3);

  // Мемоизированные обработчики
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  }, [news.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  }, [news.length]);

  // Автослайдинг с правильным cleanup
  useEffect(() => {
    if (isPaused) return;

    const startAutoSlide = () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
      autoSlideRef.current = setInterval(nextSlide, 5000);
    };

    startAutoSlide();

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [nextSlide, isPaused]); // ✅ Исправлено: добавлены зависимости

  // Остановка автослайда при наведении
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Форматирование даты
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  return (
    <section
      className={styles.newsSection}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Последние новости</h2>
          <Link href="/blog" className={styles.allLink}>
            Все новости →
          </Link>
        </div>

        <div className={styles.newsGrid}>
          {news.map(
            (
              item, // ✅ Исправлено: убрали неиспользуемый index
            ) => (
              <article key={item.id} className={styles.newsCard}>
                <div className={styles.imageContainer}>
                  <Link href={`/blog/${item.slug}`}>
                    <Image
                      src={item.featuredImage.url}
                      alt={item.featuredImage.alt}
                      width={400}
                      height={250}
                      className={styles.image}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 400px"
                      quality={85} // ✅ Оптимизация качества
                    />
                  </Link>
                  <span
                    className={styles.category}
                    style={{ backgroundColor: item.category.color }}
                  >
                    {item.category.name}
                  </span>
                </div>

                <div className={styles.content}>
                  <h3 className={styles.newsTitle}>
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className={styles.excerpt}>{item.excerpt}</p>
                  <div className={styles.footer}>
                    <time className={styles.date}>
                      {formatDate(item.publishedAt)}
                    </time>
                    <Link
                      href={`/blog/${item.slug}`}
                      className={styles.moreLink}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>

        {/* Простые кнопки навигации */}
        <div className={styles.navigation}>
          <button
            onClick={prevSlide}
            className={styles.navButton}
            aria-label="Предыдущая новость"
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          <div className={styles.dots}>
            {news.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentIndex ? styles.active : ""}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Перейти к новости ${i + 1}`}
                type="button"
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className={styles.navButton}
            aria-label="Следующая новость"
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
