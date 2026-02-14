import { DashboardStats, ActivityLog } from "@/types/auth.types";

// Мок данные для статистики
export const mockDashboardStats: DashboardStats = {
  totalSections: 11,
  activeSections: 11,
  totalBlogPosts: 3,
  totalVisitors: 1247, // 👈 ДОБАВЛЕНО
  pendingApplications: 5, // 👈 ДОБАВЛЕНО
  monthlyStats: [
    { name: "Янв", sections: 3, posts: 2 },
    { name: "Фев", sections: 2, posts: 1 },
    { name: "Мар", sections: 1, posts: 0 },
    { name: "Апр", sections: 2, posts: 0 },
    { name: "Май", sections: 1, posts: 0 },
    { name: "Июн", sections: 2, posts: 0 },
  ],
};

// Мок данные для лога активности
export const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    user: { name: "Администратор", avatar: "" },
    action: "обновил",
    entity: "section",
    entityId: "1",
    entityName: "Художественная гимнастика",
    timestamp: "2026-02-10T14:30:00Z",
  },
  {
    id: "2",
    user: { name: "Администратор", avatar: "" },
    action: "создал",
    entity: "blog",
    entityId: "3",
    entityName: "Значение спорта в жизни ребенка",
    timestamp: "2026-02-09T11:20:00Z",
  },
  {
    id: "3",
    user: { name: "Супер Администратор", avatar: "" },
    action: "добавил",
    entity: "section",
    entityId: "11",
    entityName: "Пожарно-спасательный спорт",
    timestamp: "2026-02-08T16:45:00Z",
  },
  {
    id: "4",
    user: { name: "Администратор", avatar: "" },
    action: "обновил",
    entity: "blog",
    entityId: "1",
    entityName: "Чемпионат Витебской области по лыжным гонкам",
    timestamp: "2026-02-07T09:15:00Z",
  },
  {
    id: "5",
    user: { name: "Супер Администратор", avatar: "" },
    action: "создал",
    entity: "blog",
    entityId: "2",
    entityName: "Егор Клюшин: Путь к победам в кикбоксинге",
    timestamp: "2026-02-06T14:00:00Z",
  },
];
