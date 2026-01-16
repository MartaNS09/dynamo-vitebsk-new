import type { Metadata } from "next";
import Link from "next/link";
import AdministrationCard from "./components/AdministrationCard";
import ContactSection from "./components/ContactSection";
import { administrationData } from "@/data/administration";
import styles from "./administration.module.scss";

export const metadata: Metadata = {
  title: "Администрация Витебской СДЮШОР Динамо | Руководство школы",
  description:
    "Руководство и администрация Витебской СДЮШОР Динамо. Контакты директора, заместителей и сотрудников администрации школы.",
  keywords: [
    "администрация Динамо Витебск",
    "руководство СДЮШОР",
    "контакты спортивной школы",
    "директор Динамо Витебск",
  ],
  openGraph: {
    title: "Администрация Витебской СДЮШОР Динамо",
    description: "Руководство и контакты администрации спортивной школы",
    type: "website",
  },
};

export default function AdministrationPage() {
  const sortedAdministration = [...administrationData].sort(
    (a, b) => a.order - b.order
  );

  const keyMembers = sortedAdministration.slice(0, 2); // Директор и замдиректора
  const otherMembers = sortedAdministration.slice(2); // Остальные 3

  return (
    <main className={styles.container} role="main">
      <nav className={styles.breadcrumbs} aria-label="Навигация по сайту">
        <div className="container">
          <div className={styles.breadcrumbsContent}>
            <Link href="/" aria-label="Перейти на главную страницу">
              Главная
            </Link>{" "}
            /{" "}
            <Link href="#" aria-label="Раздел 'О школе'">
              О школе
            </Link>{" "}
            /<span aria-current="page">Администрация</span>
          </div>
        </div>
      </nav>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className="container">
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.badge} aria-label="Категория">
                Руководство школы
              </div>
              <h1 id="hero-title" className={styles.title}>
                Администрация Витебской СДЮШОР Динамо
              </h1>
              <p className={styles.subtitle}>
                Профессиональная команда специалистов, обеспечивающая развитие
                спортивной школы и создание оптимальных условий для тренировок
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="administration-heading"
      >
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className={styles.sectionHeader}>
              <h2 id="administration-heading" className={styles.sectionTitle}>
                Наша команда
              </h2>
              <p className={styles.sectionDescription}>
                Ознакомьтесь с руководством и административным составом нашей
                спортивной школы
              </p>
            </div>

            {/* Основные карточки (директор и замдиректора) */}
            <div className={styles.keyCardsContainer}>
              {keyMembers.map((member) => (
                <div key={member.id} className={styles.fullWidthCard}>
                  <AdministrationCard member={member} isCompact={false} />
                </div>
              ))}
            </div>

            {/* 3 карточки в ряд */}
            <div className={styles.compactCardsContainer}>
              {otherMembers.map((member) => (
                <div key={member.id} className={styles.compactCard}>
                  <AdministrationCard member={member} isCompact={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Есть вопросы к администрации?</h2>
            <p className={styles.ctaText}>
              Мы всегда готовы помочь и ответить на ваши вопросы. Свяжитесь с
              нами удобным способом.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="tel:+375212379654"
                className={styles.primaryButton}
                aria-label="Позвонить в учебно-спортивный отдел"
              >
                Позвонить сейчас
              </a>
              <a
                href="mailto:vitebsksdushor@dynamo.by"
                className={styles.secondaryButton}
                aria-label="Написать письмо администрации"
              >
                Написать письмо
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
