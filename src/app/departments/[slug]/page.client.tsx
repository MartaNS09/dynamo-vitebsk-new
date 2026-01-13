"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { Department } from "@/data/departments";
import TrainerCard from "@/components/sport-section/TrainerCard";
import styles from "./page.module.scss";
import {
  PhoneIcon as Phone,
  CalendarIcon as Calendar,
  UsersIcon as Users,
  LocationIcon as MapPin,
} from "@/components/icons";

interface DepartmentPageClientProps {
  department: Department;
}

export default function DepartmentPageClient({
  department,
}: DepartmentPageClientProps) {
  // Формируем alt текст для фото
  const heroImageAlt = `${department.title} - спортивное отделение СДЮШОР Динамо Витебск`;

  return (
    <main className={styles.container}>
      {/* Навигация с aria-label */}
      <nav className={styles.breadcrumbs} aria-label="Навигация по сайту">
        <div className="container">
          <div className={styles.breadcrumbsContent}>
            <Link href="/" aria-label="Перейти на главную страницу">
              Главная
            </Link>{" "}
            /{" "}
            <Link href="/departments" aria-label="Перейти к списку отделений">
              Отделения
            </Link>{" "}
            /<span aria-current="page">{department.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero секция - ОСНОВНОЙ КОНТЕНТ СТРАНИЦЫ */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 id="hero-title" itemProp="name">
                {department.title}
              </h1>
              <p className={styles.subtitle} itemProp="description">
                {department.description}
              </p>

              <div className={styles.heroInfo}>
                <div className={styles.infoItem}>
                  <Users aria-hidden="true" />
                  <span itemProp="typicalAgeRange">{department.ageInfo}</span>
                </div>
                <div className={styles.infoItem}>
                  <MapPin aria-hidden="true" />
                  <span
                    itemProp="location"
                    itemScope
                    itemType="https://schema.org/Place"
                  >
                    <span itemProp="address">{department.locations[0]}</span>
                  </span>
                </div>
              </div>

              <div className={styles.heroCta}>
                <Button
                  variant="primary"
                  size="medium"
                  href={`/enrollment?department=${department.internalSlug}`}
                  icon={<Calendar aria-hidden="true" />}
                  aria-label={`Записаться в отделение ${department.title}`}
                >
                  Записаться
                </Button>
                <Button
                  variant="outline"
                  size="medium"
                  href="tel:+375333102525"
                  icon={<Phone aria-hidden="true" />}
                  aria-label="Позвонить для записи в отделение"
                >
                  Позвонить
                </Button>
              </div>
            </div>

            {/* Фото с микроразметкой и доступностью */}
            <div
              className={styles.heroImage}
              itemProp="image"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={department.heroImage}
                  alt={heroImageAlt}
                  width={1200}
                  height={451}
                  className={styles.image}
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  itemProp="contentUrl"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='451' viewBox='0 0 1200 451'%3E%3Crect width='1200' height='451' fill='%23f0f0f0'/%3E%3C/svg%3E"
                />
                <meta itemProp="url" content={department.heroImage} />
                <meta itemProp="width" content="1200" />
                <meta itemProp="height" content="451" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Описание отделения */}
      <section
        className={styles.description}
        aria-labelledby="description-title"
      >
        <div className="container">
          <div className={styles.descriptionSection}>
            <h2 id="description-title" className={styles.sectionTitle}>
              Об отделении {department.title}
            </h2>
            <div
              className={styles.descriptionContent}
              dangerouslySetInnerHTML={{
                __html: department.fullDescription.includes("<")
                  ? department.fullDescription
                  : formatPlainTextToHTML(department.fullDescription),
              }}
            />
          </div>
        </div>
      </section>

      {/* Основные блоки: Документы + Тренеры + Адрес */}
      <div className="container">
        <div className={styles.infoGrid}>
          {/* Документы */}
          <section
            className={styles.documentsCard}
            aria-labelledby="documents-title"
          >
            <h2 id="documents-title" className={styles.cardTitle}>
              Необходимые документы для записи
            </h2>
            <div className={styles.documentsList}>
              <div className={styles.documentItem} role="listitem">
                <div className={styles.documentNumber} aria-hidden="true">
                  01
                </div>
                <div className={styles.documentText}>
                  копия документа, удостоверяющего личность;
                </div>
              </div>
              <div className={styles.documentItem} role="listitem">
                <div className={styles.documentNumber} aria-hidden="true">
                  02
                </div>
                <div className={styles.documentText}>
                  медицинская справка о неимении медицинских противопоказаний к
                  занятию избранным видом спорта.
                </div>
              </div>
            </div>
          </section>

          {/* Тренеры */}
          <section
            className={styles.trainersCard}
            aria-labelledby="trainers-title"
          >
            <h2 id="trainers-title" className={styles.cardTitle}>
              Тренерский состав
            </h2>
            <div className={styles.trainersGrid} role="list">
              {department.coaches.map((coach) => (
                <TrainerCard key={coach.id} trainer={coach} />
              ))}
            </div>
          </section>

          {/* Адрес */}
          <section
            className={styles.locationCard}
            aria-labelledby="location-title"
          >
            <h2 id="location-title" className={styles.cardTitle}>
              Контакты
            </h2>
            <div className={styles.locationInfo}>
              <div className={styles.address}>
                <h3>Занятия проводятся по адресу:</h3>
                <ul className={styles.addressList}>
                  {department.locations.map((loc, idx) => (
                    <li key={idx}>
                      <MapPin
                        style={{ width: 16, height: 16 }}
                        aria-hidden="true"
                      />{" "}
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.cta}>
              <Button
                variant="primary"
                fullWidth
                href={`/enrollment?department=${department.internalSlug}`}
                aria-label={`Записаться в отделение ${department.title}`}
              >
                Записаться в отделение
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// Функция для преобразования простого текста в HTML
function formatPlainTextToHTML(text: string): string {
  const paragraphs = text
    .split("\n")
    .filter((p) => p.trim().length > 0)
    .map((paragraph, index) => {
      const trimmed = paragraph.trim();

      // Определяем, является ли абзац заголовком
      const isHeader =
        trimmed.endsWith(":") ||
        trimmed.startsWith("•") ||
        trimmed.startsWith("—") ||
        trimmed.startsWith("-") ||
        trimmed.match(/^\d+\./) ||
        (trimmed.length < 100 && trimmed.endsWith("."));

      if (index === 0) {
        // Первый абзац - введение
        return `<div class="section-intro">
          <p>${trimmed}</p>
        </div>`;
      } else if (isHeader) {
        // Заголовок
        return `<h3>${trimmed.replace(/^[•—\-]\s*/, "")}</h3>`;
      } else {
        // Обычный абзац
        return `<p>${trimmed}</p>`;
      }
    });

  return paragraphs.join("");
}
