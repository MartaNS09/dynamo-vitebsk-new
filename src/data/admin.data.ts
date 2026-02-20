import { DashboardStats, ActivityLog } from "@/types/auth.types";

export const mockDashboardStats: DashboardStats = {
  totalSections: 12,
  activeSections: 11,
  totalBlogPosts: 24,
  totalVisitors: 8234,
  pendingApplications: 23,
  monthlyStats: [
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
};

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    user: { name: "Анна Смирнова" },
    action: "create",
    entity: "section",
    entityId: "1",
    entityName: "Футбольная секция",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "2",
    user: { name: "Иван Петров" },
    action: "update",
    entity: "blog",
    entityId: "2",
    entityName: "Чемпионат по лыжным гонкам",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "3",
    user: { name: "Анна Смирнова" },
    action: "delete",
    entity: "application",
    entityId: "3",
    entityName: "Заявка Иванова",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "4",
    user: { name: "Елена Козлова" },
    action: "create",
    entity: "blog",
    entityId: "4",
    entityName: "Новость о соревнованиях",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
];
