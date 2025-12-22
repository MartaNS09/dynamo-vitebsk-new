"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AbonementCard from "@/components/sport-section/AbonementCard";
import TrainerCard from "@/components/sport-section/TrainerCard";
import { Button } from "@/components/ui/Button/Button";
import {
  ArrowLeftIcon as ArrowLeft,
  PhoneIcon as Phone,
  CalendarIcon as Calendar,
  UsersIcon as Users,
  ClockIcon as Clock,
  LocationIcon as MapPin,
} from "@/components/icons";
import { SectionWithData } from "./page";
import styles from "./page.module.scss";

interface SportSectionPageClientProps {
  section: SectionWithData;
}

export default function SportSectionPageClient({
  section,
}: SportSectionPageClientProps) {
  // ФИКС ДРОЖАНИЯ - ПРАВИЛЬНЫЙ СПОСОБ
  useEffect(() => {
    // 1. Используем requestAnimationFrame для стабильности
    const applyFix = () => {
      // ТОЛЬКО для элементов, которые дрожат
      const breadcrumbs = document.querySelector(".breadcrumbs");
      const abonementsGrid = document.querySelector(".abonementsGrid");
      const cards = document.querySelectorAll(".card");

      if (breadcrumbs) {
        (breadcrumbs as HTMLElement).style.transformStyle = "flat";
        (breadcrumbs as HTMLElement).style.transform = "translateZ(0)";
      }

      if (abonementsGrid) {
        (abonementsGrid as HTMLElement).style.transformStyle = "flat";
        (abonementsGrid as HTMLElement).style.transform = "translateZ(0)";
      }

      cards.forEach((card) => {
        (card as HTMLElement).style.transformStyle = "flat";
        (card as HTMLElement).style.transform = "translateZ(0)";

        // Находим кнопки внутри карточек
        const buttons = card.querySelectorAll("button, a[href]");
        buttons.forEach((btn) => {
          (btn as HTMLElement).style.position = "relative";
          (btn as HTMLElement).style.zIndex = "1000";
        });

        // Находим звезды
        const stars = card.querySelectorAll(".popularStar");
        stars.forEach((star) => {
          (star as HTMLElement).style.pointerEvents = "none";
          (star as HTMLElement).style.zIndex = "5";
        });
      });
    };

    // Даем время загрузиться DOM
    const timer = setTimeout(() => {
      requestAnimationFrame(applyFix);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.container}>
      {/* Навигация */}
      <nav className={styles.breadcrumbs}>
        <div className="container">
          <div className={styles.breadcrumbsContent}>
            <Button
              variant="outline"
              size="small"
              href="/sports"
              icon={<ArrowLeft />}
              className={styles.backButton}
            >
              Все секции
            </Button>
            <div className={styles.breadcrumbsText}>
              <Link href="/">Главная</Link> /
              <Link href="/sports">Спортивные секции</Link> /
              <span>{section.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>{section.name}</h1>
              <p className={styles.subtitle}>{section.shortDescription}</p>

              <div className={styles.heroInfo}>
                <div className={styles.infoItem}>
                  <Users style={{ width: 20, height: 20 }} />
                  <span>{section.ageInfo}</span>
                </div>
                <div className={styles.infoItem}>
                  <Clock style={{ width: 20, height: 20 }} />
                  <span>{section.schedule}</span>
                </div>
                <div className={styles.infoItem}>
                  <MapPin style={{ width: 20, height: 20 }} />
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

              <div className={styles.heroCta}>
                <Button
                  variant="primary"
                  size="medium"
                  href={`/enrollment?section=${section.slug}`}
                  icon={<Calendar />}
                >
                  Записаться онлайн
                </Button>
                <Button
                  variant="outline"
                  size="medium"
                  href="tel:+375333102525"
                  icon={<Phone />}
                >
                  Бесплатная консультация
                </Button>
              </div>
            </div>

            {/* Фото */}
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
                <div className={styles.imageBadge}>
                  <span className={styles.badgeIcon}>🏆</span>
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

              <div className={styles.heroDecoration}>
                <div className={styles.decorationLine}></div>
                <div className={styles.decorationCircle}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Остальная часть */}
      <div className="container">
        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            <section className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>О секции</h2>
              <div
                className={styles.descriptionContent}
                dangerouslySetInnerHTML={{ __html: section.fullDescription }}
              />
            </section>

            <section className={styles.abonementsSection}>
              <h2 className={styles.sectionTitle}>Абонементы и цены</h2>
              <p className={styles.sectionSubtitle}>
                Выберите подходящий вариант
              </p>

              <div className={styles.abonementsGrid}>
                {section.abonements.map((abonement, index) => (
                  <AbonementCard
                    key={abonement.id}
                    abonement={abonement}
                    sectionName={section.name}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <section className={styles.trainersSection}>
              <h2 className={styles.sectionTitle}>Наши тренеры</h2>
              <div className={styles.trainersGrid}>
                {section.trainers.map((trainer) => (
                  <TrainerCard key={trainer.id} trainer={trainer} />
                ))}
              </div>
            </section>

            <section className={styles.gallerySection}>
              <h2 className={styles.sectionTitle}>Фотогалерея</h2>
              <div className={styles.galleryGrid}>
                {section.gallery.map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <Image
                      src={image}
                      alt={`${section.name} - фото ${index + 1}`}
                      width={300}
                      height={200}
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaTitle}>Записаться в секцию</h3>

              <div className={styles.ctaInfo}>
                <div className={styles.infoRow}>
                  <Clock style={{ width: 18, height: 18 }} />
                  <span>{section.schedule}</span>
                </div>
                <div className={styles.infoRow}>
                  <MapPin style={{ width: 18, height: 18 }} />
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
                <div className={styles.infoRow}>
                  <Users style={{ width: 18, height: 18 }} />
                  <span>
                    {section.trainers[0]?.name?.split(" ")[0] || "Тренер"}
                  </span>
                </div>
              </div>

              <div className={styles.ctaActions}>
                <Button
                  variant="primary"
                  size="large"
                  href={`/enrollment?section=${section.slug}`}
                  icon={<Calendar />}
                  fullWidth
                >
                  Записаться онлайн
                </Button>

                <Button
                  variant="outline"
                  size="large"
                  href="tel:+375333102525"
                  icon={<Phone />}
                  fullWidth
                >
                  Позвонить для записи
                </Button>
              </div>
            </div>

            <div className={styles.contactsCard}>
              <h4 className={styles.contactsTitle}>Контакты</h4>
              <div className={styles.contactsList}>
                <div className={styles.contactItem}>
                  <strong>Телефон:</strong>
                  <a href="tel:+375333102525">+375 (33) 310-25-25</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Email:</strong>
                  <a href="mailto:vitebsksdushor@dynamo.by">
                    vitebsksdushor@dynamo.by
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Адрес:</strong>
                  <span>ул. Терешковой 16/2, Витебск</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
