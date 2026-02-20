"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardStats, DateRange } from "@/types/statistics.types";

// МОК-ДАННЫЕ (пока нет API)
const MOCK_STATS: DashboardStats = {
  visits: {
    totalVisits: 15420,
    uniqueVisitors: 8234,
    averageTime: 245,
    bounceRate: 32.5,
    byDevice: {
      desktop: 8540,
      mobile: 6120,
      tablet: 760,
    },
    bySource: {
      direct: 5230,
      search: 6780,
      social: 2340,
      referral: 1070,
    },
  },
  content: {
    totalPosts: 24,
    totalSections: 12,
    totalTrainers: 18,
    totalAbonements: 8,
    popularPosts: [
      {
        id: "1",
        title: "Чемпионат по лыжным гонкам",
        views: 1240,
        slug: "chempionat",
      },
      {
        id: "2",
        title: "Интервью с Егором Клюшиным",
        views: 890,
        slug: "intervyu",
      },
      {
        id: "3",
        title: "Значение спорта в жизни",
        views: 654,
        slug: "znachenie",
      },
    ],
    popularSections: [
      { id: "1", name: "Футбол", views: 3450, slug: "football" },
      { id: "2", name: "Плавание", views: 2870, slug: "swimming" },
      { id: "3", name: "Дзюдо", views: 1980, slug: "judo" },
    ],
  },
  applications: {
    total: 156,
    byStatus: {
      new: 23,
      inProgress: 45,
      contacted: 38,
      completed: 42,
      cancelled: 8,
    },
    conversionRate: 26.9,
    averageResponseTime: 4.5,
    bySource: {
      enrollment_form: 89,
      sport_section_page: 42,
      abonement_page: 18,
      other: 7,
    },
  },
  monthly: [
    {
      month: "2025-09",
      visits: 1250,
      visitors: 890,
      applications: 12,
      posts: 2,
    },
    {
      month: "2025-10",
      visits: 1480,
      visitors: 1020,
      applications: 15,
      posts: 3,
    },
    {
      month: "2025-11",
      visits: 1620,
      visitors: 1150,
      applications: 18,
      posts: 4,
    },
    {
      month: "2025-12",
      visits: 1890,
      visitors: 1320,
      applications: 22,
      posts: 5,
    },
    {
      month: "2026-01",
      visits: 2150,
      visitors: 1580,
      applications: 28,
      posts: 6,
    },
    {
      month: "2026-02",
      visits: 2450,
      visitors: 1820,
      applications: 35,
      posts: 4,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

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
      // Имитация загрузки
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStats(MOCK_STATS);
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
