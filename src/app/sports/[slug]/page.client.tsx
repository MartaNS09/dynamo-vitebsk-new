"use client";

import Image from "next/image";
import Link from "next/link";
import AbonementCard from "@/components/sport-section/AbonementCard";
import { Button } from "@/components/ui/Button/Button";
import {
  PhoneIcon as Phone,
  CalendarIcon as Calendar,
  UsersIcon as Users,
  LocationIcon as MapPin,
} from "@/components/icons";
import { SectionWithData } from "./page";
import styles from "./page.module.scss";
import { ChevronRight } from "lucide-react";

interface SportSectionPageClientProps {
  section: SectionWithData;
}

// Функция для получения инициалов (Фамилия и Имя)
function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "??";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  const lastName = parts[0].charAt(0).toUpperCase(); // Фамилия (первое слово)
  const firstName = parts[1].charAt(0).toUpperCase(); // Имя (второе слово)

  return lastName + firstName;
}

// Функция для цвета
function getAvatarColor(name: string): string {
  const colors = ["#0055b7", "#1a75ff", "#003d82", "#0066cc"];
  if (!name) return colors[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export default function SportSectionPageClient({
  section,
}: SportSectionPageClientProps) {
  // Безопасно получаем hero изображения
  const getHeroImages = () => {
    if (section.heroImages && section.heroImages.length > 0) {
      return section.heroImages;
    }
    // Если нет heroImages, используем coverImage
    return section.coverImage ? [section.coverImage] : [];
  };

  const heroImages = getHeroImages();
  const hasHeroImages = heroImages.length > 0;

  return (
    <main className={styles.container}>
      {/* Навигация */}
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <div className={styles.contentWrapper}>
          <div className={styles.breadcrumbsContent}>
            <div className={styles.breadcrumbsText}>
              <Link href="/" aria-label="Перейти на главную страницу">
                Главная
              </Link>{" "}
              /
              <Link href="/sports" aria-label="Перейти к спортивным секциям">
                Спортивные секции
              </Link>{" "}
              /<span aria-current="page">{section.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.contentWrapper}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 id="hero-title" className={styles.title}>
                {section.name}
              </h1>
              <p className={styles.subtitle}>{section.shortDescription}</p>

              <div className={styles.heroInfo}>
                <div className={styles.infoItem}>
                  <Users style={{ width: 20, height: 20 }} aria-hidden="true" />
                  <span>{section.ageInfo}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.emojiIcon} aria-hidden="true">
                    ⭐
                  </span>
                  <span className={styles.infoText}>
                    Твой спортивный путь начинается здесь
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.emojiIcon} aria-hidden="true">
                    ✨
                  </span>
                  <span className={styles.infoText}>
                    Воспитываем характер и добиваемся результатов вместе
                  </span>
                </div>
              </div>

              <div className={styles.heroCta}>
                <Button
                  variant="primary"
                  size="medium"
                  href={`/enrollment?section=${section.slug}`}
                  icon={<Calendar aria-hidden="true" />}
                  aria-label={`Записаться в секцию ${section.name}`}
                >
                  Записаться
                </Button>
                <Button
                  variant="outline"
                  size="medium"
                  href="tel:+375333102525"
                  icon={<Phone aria-hidden="true" />}
                  aria-label="Получить консультацию по телефону"
                >
                  Получить консультацию
                </Button>
              </div>
            </div>

            {/* Фото в Hero - ТЕПЕРЬ С БЕЗОПАСНОЙ ПРОВЕРКОЙ */}
            {hasHeroImages && (
              <div className={styles.heroImages}>
                {/* Первое фото */}
                <div className={styles.imageFramePrimary}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={heroImages[0]}
                      alt={`${section.name} - основное фото`}
                      width={400}
                      height={470}
                      className={styles.image}
                      priority
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className={styles.frameBorder}></div>
                    <div className={styles.frameCorner}></div>
                    <div className={styles.frameGlow}></div>
                  </div>
                  <div
                    className={styles.imageBadge}
                    aria-label="Лучшие тренеры"
                  >
                    <span className={styles.badgeIcon} aria-hidden="true">
                      🏆
                    </span>
                    <span className={styles.badgeText}>Лучшие тренеры</span>
                  </div>
                </div>

                {/* Второе фото (если есть) */}
                {heroImages.length > 1 && (
                  <div className={styles.imageFrameSecondary}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={heroImages[1]}
                        alt={`${section.name} - дополнительное фото`}
                        width={350}
                        height={410}
                        className={styles.image}
                        quality={80}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className={styles.frameBorder}></div>
                      <div className={styles.frameCorner}></div>
                      <div className={styles.frameGlow}></div>
                    </div>
                    <div className={styles.imageCaption}>
                      <span className={styles.captionText}>
                        СДЮШОР «Динамо»
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <div className={styles.contentWrapper}>
        <div className={styles.contentLayout}>
          {/* 🔴 Описание (левая колонка) */}
          <section
            className={styles.descriptionSection}
            aria-labelledby="description-title"
          >
            <h2 id="description-title" className={styles.sectionTitle}>
              О секции {section.name}
            </h2>
            <div
              className={styles.descriptionContent}
              dangerouslySetInnerHTML={{ __html: section.fullDescription }}
            />
          </section>

          {/* 🔴 Сайдбар (правая колонка) */}
          <aside
            className={styles.sidebar}
            aria-label="Дополнительная информация"
          >
            {/* Весь сайдбар как был */}
            <div className={styles.benefitsCard}>
              <h3 className={styles.sidebarTitle}>Наши преимущества</h3>
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    🏆
                  </span>
                  <div className={styles.benefitText}>
                    <strong>Профессиональные тренеры</strong>
                    <p>Мастера спорта с педагогическим образованием</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    ⭐
                  </span>
                  <div className={styles.benefitText}>
                    <strong>Безопасность</strong>
                    <p>Занятия на профессиональном оборудовании</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    ✨
                  </span>
                  <div className={styles.benefitText}>
                    <strong>Индивидуальный подход</strong>
                    <p>Малые группы, внимание каждому ребенку</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.documentsCard}>
              <h3 className={styles.sidebarTitle}>Необходимые документы</h3>
              <div className={styles.documentsList}>
                <div className={styles.documentItem}>
                  <div className={styles.documentNumber}>01</div>
                  <div className={styles.documentText}>
                    копия документа, удостоверяющего личность
                  </div>
                </div>
                <div className={styles.documentItem}>
                  <div className={styles.documentNumber}>02</div>
                  <div className={styles.documentText}>
                    медицинская справка о неимении медицинских противопоказаний
                    к занятию избранным видом спорта
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.trainersCard}>
              <h3 className={styles.sidebarTitle}>Наши тренеры</h3>
              <div className={styles.trainersList}>
                {section.trainers.map((trainer) => {
                  const photo = trainer.photo || "";
                  const hasPhoto = photo.trim() !== "";

                  return (
                    <div key={trainer.id} className={styles.trainerCompact}>
                      <div className={styles.trainerPhoto}>
                        {hasPhoto ? (
                          <Image
                            src={photo}
                            alt={`Тренер ${trainer.name}`}
                            width={80}
                            height={80}
                            className={styles.photo}
                            quality={75}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className={styles.avatar}
                            style={{
                              backgroundColor: getAvatarColor(trainer.name),
                            }}
                          >
                            <span className={styles.initials}>
                              {getInitials(trainer.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={styles.trainerInfo}>
                        <h4 className={styles.trainerName}>{trainer.name}</h4>
                        <p className={styles.trainerPosition}>
                          {trainer.position}
                        </p>
                        <Link
                          href={`/enrollment?section=${encodeURIComponent(
                            section.slug,
                          )}&trainerId=${encodeURIComponent(trainer.id)}`}
                          className={styles.trainerEnrollLink}
                          aria-label={`Записаться к тренеру ${trainer.name}`}
                        >
                          Записаться к тренеру
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.ctaCard}>
              <h3 className={styles.sidebarTitle}>Записаться в секцию</h3>

              {section.location && (
                <div className={styles.ctaInfo}>
                  <div className={styles.infoRow}>
                    <MapPin
                      style={{ width: 18, height: 18 }}
                      aria-hidden="true"
                    />
                    <div className={styles.locationText}>
                      {section.location
                        .split("; ")
                        .map((addr: string, idx: number) => (
                          <span key={idx} className={styles.addressLine}>
                            {addr}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.ctaActions}>
                <Button
                  variant="primary"
                  size="medium"
                  href={`/enrollment?section=${section.slug}`}
                  icon={<Calendar aria-hidden="true" />}
                  fullWidth
                  className={styles.compactButton}
                  aria-label={`Записаться онлайн в секцию ${section.name}`}
                >
                  Записаться
                </Button>

                <Button
                  variant="outline"
                  size="medium"
                  href="tel:+375333102525"
                  icon={<Phone aria-hidden="true" />}
                  fullWidth
                  className={styles.compactButton}
                  aria-label="Позвонить для записи в секцию"
                >
                  Получить консультацию
                </Button>
              </div>
            </div>
          </aside>

          {/* 🔴 КОНТЕНТ НА ВСЮ ШИРИНУ */}
          <div className={styles.fullWidthContent}>
            {/* Абонементы */}
            <section
              className={styles.abonementsSection}
              aria-labelledby="abonements-title"
            >
              <h2 id="abonements-title" className={styles.sectionTitle}>
                Абонементы и цены
              </h2>
              <div className={styles.abonementsGrid}>
                {section.abonements.map((abonement, index) => (
                  <div key={abonement.id} className={styles.abonementCard}>
                    <AbonementCard
                      abonement={abonement}
                      sectionName={section.name}
                      index={index}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.scrollHintMobile}>
                <ChevronRight style={{ width: 16, height: 16 }} />
                Прокрутите в сторону
              </div>
            </section>

            {/* Галерея - только если есть изображения */}
            {section.gallery && section.gallery.length > 0 && (
              <section
                className={styles.gallerySection}
                aria-labelledby="gallery-title"
              >
                <h2 id="gallery-title" className={styles.sectionTitle}>
                  Фотогалерея
                </h2>
                <div className={styles.galleryGrid}>
                  {section.gallery.map((image, index) => (
                    <div key={index} className={styles.galleryItem}>
                      <Image
                        src={image}
                        alt={`${section.name} - фото ${index + 1}`}
                        width={300}
                        height={200}
                        className={styles.galleryImage}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.scrollHintMobile}>
                  <ChevronRight style={{ width: 16, height: 16 }} />
                  Прокрутите в сторону
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
