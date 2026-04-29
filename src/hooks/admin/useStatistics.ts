"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardStats, DateRange } from "@/types/statistics.types";
import { getDashboardStatistics } from "@/lib/api/statistics";

export const useStatistics = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 6))
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    label: "month",
  });

  const loadStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboardStatistics();
      setStats(data);
    } catch (error) {
      console.error("Ошибка загрузки статистики:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Пустой массив зависимостей

  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
    // Здесь потом будет загрузка с новым диапазоном
    loadStatistics();
  };

  const exportToCSV = useCallback(() => {
    if (!stats) return;

    const rows = [
      ["Показатель", "Значение"],
      ["Всего визитов", stats.visits.totalVisits],
      ["Уникальные посетители", stats.visits.uniqueVisitors],
      ["Среднее время (сек)", stats.visits.averageTime],
      ["Процент отказов", `${stats.visits.bounceRate}%`],
      ["Всего заявок", stats.applications.total],
      ["Конверсия", `${stats.applications.conversionRate}%`],
      ["Новых заявок", stats.applications.byStatus.new],
      ["В работе", stats.applications.byStatus.inProgress],
      ["Завершено", stats.applications.byStatus.completed],
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `statistics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }, [stats]);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  return {
    stats,
    loading,
    dateRange,
    setDateRange: handleDateRangeChange,
    exportToCSV,
    refresh: loadStatistics,
  };
};
