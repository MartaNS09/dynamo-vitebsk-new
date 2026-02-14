"use client";

export default function StatisticsPage() {
  return (
    <div className="content-header">
      <h1>Статистика</h1>
      <p className="subtitle">Аналитика и метрики сайта</p>
      <div className="chart-container">
        <div className="chart-header">
          <h2>Посещаемость сайта</h2>
          <p>График посещений за последние 30 дней</p>
        </div>
        <div className="chart-placeholder">
          <div className="placeholder-text">
            График будет отображаться здесь
          </div>
        </div>
      </div>
    </div>
  );
}
