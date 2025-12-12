import { Calendar, Trophy, Users, Target, Award, Star } from "lucide-react";
import styles from "./HistoryHero.module.scss";

export default function HistoryHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="history-hero-title"
      role="region"
    >
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge} aria-label="Год основания школы">
            <Calendar size={24} aria-hidden="true" />
            <span>Основана 1 марта 1975 года</span>
          </div>

          <h1 id="history-hero-title" className={styles.heroTitle}>
            <span className={styles.titleAccent}>История</span> СДЮШОР
            <br />
            «Динамо» Витебск
          </h1>

          <p className={styles.heroSubtitle}>
            50+ лет подготовки чемпионов, олимпийских медалей
            <br />и спортивных традиций
          </p>

          <div
            className={styles.heroStats}
            role="list"
            aria-label="Статистика школы"
          >
            <div className={styles.statItem} role="listitem">
              <div className={styles.statIcon}>
                <Trophy size={28} aria-hidden="true" />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>25+</span>
                <span className={styles.statLabel}>Олимпийцев</span>
              </div>
            </div>

            <div className={styles.statItem} role="listitem">
              <div className={styles.statIcon}>
                <Award size={28} aria-hidden="true" />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Чемпионов мира</span>
              </div>
            </div>

            <div className={styles.statItem} role="listitem">
              <div className={styles.statIcon}>
                <Users size={28} aria-hidden="true" />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Мастеров спорта</span>
              </div>
            </div>

            <div className={styles.statItem} role="listitem">
              <div className={styles.statIcon}>
                <Target size={28} aria-hidden="true" />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}>Видов спорта</span>
              </div>
            </div>
          </div>

          <div
            className={styles.heroAwards}
            role="list"
            aria-label="Награды школы"
          >
            <div className={styles.awardBadge}>
              <Star size={20} aria-hidden="true" />
              <span>8 олимпийских медалей</span>
            </div>
            <div className={styles.awardBadge}>
              <Award size={20} aria-hidden="true" />
              <span>50+ чемпионов Европы</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
