"use client";

import React from "react";
import { useStatistics } from "@/hooks/admin/useStatistics";
import { RefreshCw, Download } from "lucide-react";
import styles from "./page.module.scss";

export default function StatisticsPage() {
  const { stats, loading, dateRange, setDateRange, exportToCSV, refresh } =
    useStatistics();

  const dateRangeOptions = [
    { value: "week", label: "За неделю" },
    { value: "month", label: "За месяц" },
    { value: "quarter", label: "За квартал" },
    { value: "year", label: "За год" },
  ];

  if (loading) {
    return (
      <div className={styles.loading}>
        <RefreshCw size={40} className={styles.spinner} />
        <p>Загрузка статистики...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={styles.loading}>
        <p>Нет данных для отображения</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Статистика сайта</h1>
          <p className={styles.subtitle}>Аналитика и метрики</p>
        </div>

        <div className={styles.headerActions}>
          <select
            className={styles.dateSelect}
            value={dateRange.label}
            onChange={(e) =>
              setDateRange({
                ...dateRange,
                label: e.target.value as typeof dateRange.label,
              })
            }
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            className={styles.iconButton}
            onClick={refresh}
            title="Обновить"
          >
            <RefreshCw size={18} />
          </button>

          <button
            className={styles.iconButton}
            onClick={exportToCSV}
            title="Экспорт в CSV"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Основные карточки */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <h3>Посещения</h3>
          </div>
          <div className={styles.cardValue}>
            {stats.visits.totalVisits.toLocaleString()}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <h3>Уникальные</h3>
          </div>
          <div className={styles.cardValue}>
            {stats.visits.uniqueVisitors.toLocaleString()}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <h3>Заявки</h3>
          </div>
          <div className={styles.cardValue}>{stats.applications.total}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <h3>Конверсия</h3>
          </div>
          <div className={styles.cardValue}>
            {stats.applications.conversionRate}%
          </div>
        </div>
      </div>

      {/* График посещаемости */}
      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h2>Посещаемость по месяцам</h2>
        </div>
        <div className={styles.chartBars}>
          {stats.monthly.map((item) => {
            const maxVisits = Math.max(...stats.monthly.map((d) => d.visits));
            const height = (item.visits / maxVisits) * 100;
            return (
              <div key={item.month} className={styles.chartBarItem}>
                <div className={styles.chartBarLabel}>
                  {item.month.slice(5)}
                </div>
                <div className={styles.chartBarWrapper}>
                  <div
                    className={styles.chartBar}
                    style={{ height: `${height}%` }}
                  >
                    <span className={styles.chartBarValue}>{item.visits}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Источники трафика */}
      <div className={styles.detailedGrid}>
        <div className={styles.statsCard}>
          <h3>Источники трафика</h3>
          <div className={styles.statsList}>
            {Object.entries(stats.visits.bySource).map(([key, value]) => {
              const total = stats.visits.totalVisits;
              const percentage = ((value / total) * 100).toFixed(1);
              const names: Record<string, string> = {
                direct: "Прямые",
                search: "Поиск",
                social: "Соцсети",
                referral: "Рефералы",
              };
              return (
                <div key={key} className={styles.statItem}>
                  <div className={styles.statLabel}>
                    <span>{names[key] || key}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.statsCard}>
          <h3>Устройства</h3>
          <div className={styles.statsList}>
            {Object.entries(stats.visits.byDevice).map(([key, value]) => {
              const total = stats.visits.totalVisits;
              const percentage = ((value / total) * 100).toFixed(1);
              const names: Record<string, string> = {
                desktop: "Десктоп",
                mobile: "Мобильные",
                tablet: "Планшеты",
              };
              return (
                <div key={key} className={styles.statItem}>
                  <div className={styles.statLabel}>
                    <span>{names[key]}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.statsCard}>
          <h3>Статус заявок</h3>
          <div className={styles.statsList}>
            {Object.entries(stats.applications.byStatus).map(([key, value]) => {
              const total = stats.applications.total;
              const percentage = ((value / total) * 100).toFixed(1);
              const names: Record<string, string> = {
                new: "Новые",
                inProgress: "В работе",
                contacted: "Связались",
                completed: "Завершены",
                cancelled: "Отменены",
              };
              return (
                <div key={key} className={styles.statItem}>
                  <div className={styles.statLabel}>
                    <span>{names[key]}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Популярный контент */}
      <div className={styles.popularGrid}>
        <div className={styles.statsCard}>
          <h3>Популярные новости</h3>
          <div className={styles.popularList}>
            {stats.content.popularPosts.map((post, index) => (
              <div key={post.id} className={styles.popularItem}>
                <span className={styles.popularRank}>{index + 1}</span>
                <span className={styles.popularTitle}>{post.title}</span>
                <span className={styles.popularViews}>{post.views}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statsCard}>
          <h3>Популярные секции</h3>
          <div className={styles.popularList}>
            {stats.content.popularSections.map((section, index) => (
              <div key={section.id} className={styles.popularItem}>
                <span className={styles.popularRank}>{index + 1}</span>
                <span className={styles.popularTitle}>{section.name}</span>
                <span className={styles.popularViews}>{section.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.lastUpdated}>
        Последнее обновление:{" "}
        {new Date(stats.lastUpdated).toLocaleString("ru-RU")}
      </div>
    </div>
  );
}
