"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { sortedBlogPosts } from "@/data/blog-posts";
import styles from "./NewsSection.module.scss";

export function NewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slidesToShow = 3;
  const recentNews = sortedBlogPosts.slice(0, 6);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleSlides = isMobile
    ? [recentNews[currentSlide]]
    : recentNews.slice(currentSlide, currentSlide + slidesToShow);

  const nextSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev >= recentNews.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentSlide((prev) =>
        prev >= recentNews.length - slidesToShow ? 0 : prev + 1,
      );
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) =>
        prev === 0 ? recentNews.length - 1 : prev - 1,
      );
    } else {
      setCurrentSlide((prev) =>
        prev === 0 ? recentNews.length - slidesToShow : prev - 1,
      );
    }
  };

  return (
    <section
      className={`${styles.newsSection} section-padding`}
      aria-labelledby="news-title"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <h2 id="news-title" className={styles.sectionTitle}>
              Наш блог и новости
            </h2>
            <div className={styles.titleLine}></div>
          </div>
          <Link href="/blog" className={styles.viewAllLink}>
            Все новости →
          </Link>
        </div>

        {/* Слайдер */}
        <div className={styles.sliderContainer}>
          {/* Кнопка назад */}
          <button
            onClick={prevSlide}
            className={styles.sliderButton}
            aria-label="Предыдущие новости"
            type="button"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Слайды */}
          <div className={styles.sliderTrack}>
            {visibleSlides.map((news) => {
              // Определяем тип изображения по его размерам
              const isVertical =
                news.featuredImage.height > news.featuredImage.width;

              return (
                <article key={news.id} className={styles.slide}>
                  <div
                    className={`${styles.slideImage} ${isVertical ? styles.verticalImage : styles.horizontalImage}`}
                  >
                    <Link href={`/blog/${news.slug}`} aria-label={news.title}>
                      <Image
                        src={news.featuredImage.url}
                        alt={news.featuredImage.alt}
                        width={news.featuredImage.width}
                        height={news.featuredImage.height}
                        className={styles.image}
                        priority={currentSlide === 0}
                      />
                    </Link>
                  </div>
                  <div className={styles.slideContent}>
                    <div
                      className={styles.slideCategory}
                      style={{ color: news.category.color }}
                    >
                      {news.category.name}
                    </div>
                    <h3 className={styles.slideTitle}>
                      <Link href={`/blog/${news.slug}`}>{news.title}</Link>
                    </h3>
                    <p className={styles.slideExcerpt}>{news.excerpt}</p>
                    <div className={styles.slideFooter}>
                      <time
                        dateTime={news.publishedAt}
                        className={styles.slideDate}
                      >
                        {new Date(news.publishedAt).toLocaleDateString(
                          "ru-RU",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </time>
                      <Link
                        href={`/blog/${news.slug}`}
                        className={styles.readMoreLink}
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Кнопка вперед */}
          <button
            onClick={nextSlide}
            className={styles.sliderButton}
            aria-label="Следующие новости"
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Индикаторы */}
        {isMobile && (
          <div className={styles.sliderIndicators} aria-hidden="true">
            {recentNews.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${currentSlide === index ? styles.active : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Перейти к новости ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
