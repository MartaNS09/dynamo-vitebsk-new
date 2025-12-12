import {
  Trophy,
  Medal,
  Award,
  Star,
  Target,
  Users,
  Calendar,
} from "lucide-react";
import styles from "./AchievementsSection.module.scss";

interface Achievement {
  category: string;
  count: string;
  description: string;
  icon: React.ReactNode;
}

interface LegendAthlete {
  name: string;
  sport: string;
  achievement: string;
  year: string;
}

export default function AchievementsSection() {
  const achievements: Achievement[] = [
    {
      category: "Олимпийские медали",
      count: "8",
      description: "Золото, серебро и бронза на Олимпийских играх",
      icon: <Medal size={32} />,
    },
    {
      category: "Чемпионы мира",
      count: "100+",
      description: "Победители мировых первенств",
      icon: <Trophy size={32} />,
    },
    {
      category: "Мастера спорта",
      count: "500+",
      description: "Высшее спортивное звание",
      icon: <Award size={32} />,
    },
    {
      category: "Тренеры",
      count: "50+",
      description: "Квалифицированных специалистов",
      icon: <Users size={32} />,
    },
    {
      category: "Виды спорта",
      count: "12",
      description: "Олимпийских направлений",
      icon: <Target size={32} />,
    },
    {
      category: "Лет истории",
      count: "50+",
      description: "Непрерывной работы",
      icon: <Calendar size={32} />,
    },
  ];

  const legendAthletes: LegendAthlete[] = [
    {
      name: "Игорь Каныгин",
      sport: "Классическая борьба",
      achievement: "Серебро Олимпиады 1980",
      year: "1980",
    },
    {
      name: "Вячеслав Яновский",
      sport: "Бокс",
      achievement: "Золото Олимпиады 1988",
      year: "1988",
    },
    {
      name: "Татьяна Аржанникова",
      sport: "Спортивная гимнастика",
      achievement: "Чемпионка мира",
      year: "1977-1980",
    },
    {
      name: "Ольга Шиленок",
      sport: "Пулевая стрельба",
      achievement: "Чемпионка СССР",
      year: "1989",
    },
    {
      name: "Вадим Девятовский",
      sport: "Легкая атлетика",
      achievement: "Участник Олимпиады 2004",
      year: "2004",
    },
    {
      name: "Сергей Лавренов",
      sport: "Тяжелая атлетика",
      achievement: "Бронза Олимпиады 2000",
      year: "2000",
    },
  ];

  return (
    <section
      className={styles.achievements}
      aria-labelledby="achievements-title"
      role="region"
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerIcon} aria-hidden="true">
            <Star size={36} />
          </div>
          <h2 id="achievements-title" className={styles.title}>
            Достижения и легенды школы
          </h2>
          <p className={styles.subtitle}>
            Самые значимые победы и выдающиеся спортсмены
          </p>
        </div>

        <div
          className={styles.achievementsGrid}
          role="list"
          aria-label="Статистика достижений"
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={styles.achievementCard}
              role="listitem"
              aria-label={`${achievement.category}: ${achievement.count} - ${achievement.description}`}
            >
              <div className={styles.cardIcon} aria-hidden="true">
                {achievement.icon}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardNumber}>{achievement.count}</div>
                <h3 className={styles.cardTitle}>{achievement.category}</h3>
                <p className={styles.cardDescription}>
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.legendsSection}>
          <h3 className={styles.legendsTitle}>Выдающиеся спортсмены</h3>
          <p className={styles.legendsSubtitle}>
            Воспитанники школы, прославившие «Динамо» Витебск
          </p>

          <div
            className={styles.legendsGrid}
            role="list"
            aria-label="Список выдающихся спортсменов"
          >
            {legendAthletes.map((athlete, index) => (
              <div
                key={index}
                className={styles.legendCard}
                role="listitem"
                aria-label={`${athlete.name} - ${athlete.sport}: ${athlete.achievement} (${athlete.year})`}
              >
                <div className={styles.legendHeader}>
                  <div
                    className={styles.legendYear}
                    aria-label={`Год: ${athlete.year}`}
                  >
                    {athlete.year}
                  </div>
                  <div
                    className={styles.legendSport}
                    aria-label={`Вид спорта: ${athlete.sport}`}
                  >
                    {athlete.sport}
                  </div>
                </div>
                <h4 className={styles.legendName}>{athlete.name}</h4>
                <p className={styles.legendAchievement}>
                  {athlete.achievement}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.callToAction}>
          <p className={styles.ctaText}>
            Стань частью истории! Присоединяйся к команде чемпионов
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="/enrollment" // ← ИЗМЕНИТЕ с "/contact" на "/enrollment"
              className={styles.primaryButton}
              aria-label="Записаться в школу"
            >
              Записаться в школу
            </a>

            <a
              href="/gallery"
              className={styles.secondaryButton}
              aria-label="Посмотреть архивные фотографии"
            >
              Архивные фото
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
