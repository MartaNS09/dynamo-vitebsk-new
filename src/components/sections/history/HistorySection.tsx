"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  History,
  BookOpen,
  Trophy,
  Calendar,
  Award,
  Target,
} from "lucide-react";
import styles from "./History.module.scss";

export const HistorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.history} aria-labelledby="history-title">
      <div className="container">
        {/* Заголовок */}
        <div className={styles.history__header}>
          <div className={styles.history__badge}>
            <History size={20} />
            <span> Школа основана в 1975 году</span>
          </div>
          <h2 className={styles.history__title} id="history-title">
            <span className={styles.history__highlight}>55+ лет</span>{" "}
            спортивной истории
          </h2>
          <p className={styles.history__subtitle}>
            СДЮШОР «Динамо» Витебск — одна из старейших спортивных школ Беларуси
          </p>
        </div>

        {/* Контент */}
        <div className={styles.history__content}>
          <div className={styles.history__text}>
            <p className={styles.history__lead}>
              За годы работы мы воспитали десятки олимпийских чемпионов,
              чемпионов мира и Европы, подготовили более 500 мастеров спорта.
            </p>

            {isExpanded ? (
              <div className={styles.history__expanded}>
                <div className={styles.history__milestones}>
                  <div className={styles.milestone}>
                    <div className={styles.milestone__icon}>
                      <Calendar size={24} />
                    </div>
                    <div className={styles.milestone__content}>
                      <h3 className={styles.milestone__year}>1975</h3>
                      <p>Основание школы «Юный динамовец» с 8 видами спорта</p>
                    </div>
                  </div>

                  <div className={styles.milestone}>
                    <div className={styles.milestone__icon}>
                      <Award size={24} />
                    </div>
                    <div className={styles.milestone__content}>
                      <h3 className={styles.milestone__year}>1980</h3>
                      <p>
                        Первая олимпийская медаль — Игорь Каныгин (серебро
                        Москва)
                      </p>
                    </div>
                  </div>

                  <div className={styles.milestone}>
                    <div className={styles.milestone__icon}>
                      <Trophy size={24} />
                    </div>
                    <div className={styles.milestone__content}>
                      <h3 className={styles.milestone__year}>1988</h3>
                      <p>Вячеслав Яновский — олимпийское золото в Сеуле</p>
                    </div>
                  </div>

                  <div className={styles.milestone}>
                    <div className={styles.milestone__icon}>
                      <Target size={24} />
                    </div>
                    <div className={styles.milestone__content}>
                      <h3 className={styles.milestone__year}>Сегодня</h3>
                      <p>
                        12 направлений, современная база, квалифицированные
                        тренеры
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.history__fullText}>
                  <p>
                    Школа прошла путь от небольшой комплексной спортивной школы
                    до ведущего учебного заведения олимпийского резерва в
                    Беларуси. За каждым достижением — труд тренеров,
                    самоотверженность спортсменов и поддержка родителей.
                  </p>
                </div>
              </div>
            ) : (
              <p className={styles.history__preview}>
                От первых побед на всесоюзных соревнованиях до медалей
                чемпионатов мира и Олимпийских игр. Наша история — это история
                побед и преданности спорту.
              </p>
            )}

            {/* Кнопки */}
            <div className={styles.history__actions}>
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="history-content"
              >
                <BookOpen size={18} />
                <span>
                  {isExpanded ? "Свернуть историю" : "Подробнее об истории"}
                </span>
              </Button>

              <Button variant="primary" href="/history">
                <Trophy size={18} aria-hidden="true" />
                <span>Вся история школы</span>
              </Button>
            </div>
          </div>

          {/* Статистика */}
          <div className={styles.history__stats}>
            <div className={styles.stat}>
              <div className={styles.stat__number}>55+</div>
              <div className={styles.stat__label}>лет работы</div>
            </div>

            <div className={styles.stat}>
              <div className={styles.stat__number}>100+</div>
              <div className={styles.stat__label}>МСМК</div>
            </div>

            <div className={styles.stat}>
              <div className={styles.stat__number}>25+</div>
              <div className={styles.stat__label}>олимпийцев</div>
            </div>

            <div className={styles.stat}>
              <div className={styles.stat__number}>500+</div>
              <div className={styles.stat__label}>мастеров спорта</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
