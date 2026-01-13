import { Metadata } from "next";
import Link from "next/link";
import DepartmentsHero from "./components/DepartmentsHero";
import { ALL_DEPARTMENTS } from "@/data/departments";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Спортивные отделения | СДЮШОР Динамо Витебск",
  description:
    "10 профессиональных спортивных отделений с многолетней историей",
};

export default function DepartmentsPage() {
  return (
    <main className={styles.container}>
      <DepartmentsHero />

      <section id="departments" className={styles.departmentsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Наши отделения</h2>
          <p className={styles.sectionSubtitle}>
            Выберите отделение для получения подробной информации
          </p>

          <div className={styles.departmentsGrid}>
            {ALL_DEPARTMENTS.map((dept) => (
              <Link
                key={dept.id}
                href={`/departments/${dept.seoSlug}`}
                className={styles.departmentCard}
              >
                <div className={styles.cardImage}>
                  <div
                    className={styles.imageBackground}
                    style={{ backgroundImage: `url(${dept.coverImage})` }}
                  ></div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{dept.title}</h3>
                  <p className={styles.cardDescription}>{dept.description}</p>

                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>👤 {dept.ageInfo}</span>
                    <span className={styles.metaItem}>
                      📍 {dept.locations.length} локации
                    </span>
                  </div>

                  <span className={styles.cardLink}>
                    Подробнее об отделении →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Не нашли подходящее отделение?</h2>
          <p className={styles.ctaText}>
            Посмотрите также наш раздел спортивных секций или свяжитесь с нами
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/sports" className={styles.primaryButton}>
              Перейти к спортивным секциям
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
