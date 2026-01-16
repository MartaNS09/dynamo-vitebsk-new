"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    // Фикс для iOS скролла
    const fixIOSScroll = () => {
      const preventScale = (e: WheelEvent) => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      };

      document.body.style.overscrollBehaviorY = "none";
      document.addEventListener("wheel", preventScale, { passive: false });

      return () => {
        document.body.style.overscrollBehaviorY = "auto";
        document.removeEventListener("wheel", preventScale);
      };
    };

    fixIOSScroll();
  }, []);

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

      {/* Hero секция - НЕ ТРОГАЕМ */}
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

            {/* Фото в Hero */}
            <div className={styles.heroImages}>
              <div className={styles.imageFramePrimary}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={section.heroImages[0]}
                    alt={`${section.name} - основное фото`}
                    width={400}
                    height={470}
                    className={styles.image}
                    priority
                    quality={90}
                  />
                  <div className={styles.frameBorder}></div>
                  <div className={styles.frameCorner}></div>
                  <div className={styles.frameGlow}></div>
                </div>
                <div className={styles.imageBadge} aria-label="Лучшие тренеры">
                  <span className={styles.badgeIcon} aria-hidden="true">
                    🏆
                  </span>
                  <span className={styles.badgeText}>Лучшие тренеры</span>
                </div>
              </div>

              <div className={styles.imageFrameSecondary}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={section.heroImages[1] || section.heroImages[0]}
                    alt={`${section.name} - дополнительное фото`}
                    width={350}
                    height={410}
                    className={styles.image}
                    quality={85}
                  />
                  <div className={styles.frameBorder}></div>
                  <div className={styles.frameCorner}></div>
                  <div className={styles.frameGlow}></div>
                </div>
                <div className={styles.imageCaption}>
                  <span className={styles.captionText}>СДЮШОР «Динамо»</span>
                </div>
              </div>
            </div>
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
                  // Безопасная проверка фото
                  const photo = trainer.photo || "";
                  const hasPhoto = photo.trim() !== "";

                  return (
                    <div key={trainer.id} className={styles.trainerCompact}>
                      <div className={styles.trainerPhoto}>
                        {hasPhoto ? (
                          // Фото тренера
                          <Image
                            src={photo} // используем безопасную переменную photo
                            alt={`Тренер ${trainer.name}`}
                            width={80}
                            height={80}
                            className={styles.photo}
                          />
                        ) : (
                          // Аватар с инициалами
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

          {/* 🔴 КОНТЕНТ НА ВСЮ ШИРИНУ (после сайдбара) */}
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

            {/* Галерея */}
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
                    />
                  </div>
                ))}
              </div>
              <div className={styles.scrollHintMobile}>
                <ChevronRight style={{ width: 16, height: 16 }} />
                Прокрутите в сторону
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
