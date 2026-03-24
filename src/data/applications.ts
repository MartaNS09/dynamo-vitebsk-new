import { Application, ApplicationSource } from "@/types/application.types";
import { getStatusName } from "@/types/application";

// Генерация случайных дат за последние 30 дней
const getRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

const statusObjects = [
  { id: "status_new", name: "new", label: "Новая", color: "#3b82f6" },
  { id: "status_new", name: "new", label: "Новая", color: "#3b82f6" },
  { id: "status_new", name: "new", label: "Новая", color: "#3b82f6" },
  { id: "status_new", name: "new", label: "Новая", color: "#3b82f6" },
  {
    id: "status_in_progress",
    name: "in_progress",
    label: "В обработке",
    color: "#f59e0b",
  },
  {
    id: "status_in_progress",
    name: "in_progress",
    label: "В обработке",
    color: "#f59e0b",
  },
  {
    id: "status_in_progress",
    name: "in_progress",
    label: "В обработке",
    color: "#f59e0b",
  },
  {
    id: "status_contacted",
    name: "contacted",
    label: "Связались",
    color: "#00d4aa",
  },
  {
    id: "status_contacted",
    name: "contacted",
    label: "Связались",
    color: "#00d4aa",
  },
  {
    id: "status_completed",
    name: "completed",
    label: "Завершена",
    color: "#10b981",
  },
  {
    id: "status_cancelled",
    name: "cancelled",
    label: "Отменена",
    color: "#ef4444",
  },
];

const sources: ApplicationSource[] = [
  "enrollment_form",
  "sport_section_page",
  "abonement_page",
  "other",
];

const sports = [
  "ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА",
  "КИКБОКСИНГ",
  "ДЗЮДО (САМБО)",
  "СТРЕЛЬБА ПУЛЕВАЯ",
  "ФРИСТАЙЛ",
  "АКРОБАТИКА",
  "ПОЖАРНО-СПАСАТЕЛЬНЫЙ СПОРТ",
  "ВЬЕТ ВО ДАО",
];

const names = [
  "Иванов Иван Иванович",
  "Петрова Анна Сергеевна",
  "Сидоров Петр Алексеевич",
  "Козлова Елена Дмитриевна",
  "Морозов Александр Павлович",
  "Волкова Татьяна Игоревна",
  "Новиков Денис Валерьевич",
  "Соколова Ольга Николаевна",
];

export const mockApplications: Application[] = Array.from(
  { length: 50 },
  (_, i) => {
    const id = `app_${String(i + 1).padStart(3, "0")}`;
    const createdAt = getRandomDate(30);
    const statusIndex = Math.floor(Math.random() * statusObjects.length);
    let status = statusObjects[statusIndex];
    const sourceIndex = Math.floor(Math.random() * sources.length);
    const source = sources[sourceIndex];
    const sportIndex = Math.floor(Math.random() * sports.length);
    const sport = sports[sportIndex];
    const hasAbonement = Math.random() > 0.7;

    const abonement = hasAbonement
      ? {
          id: `ab_${Math.random().toString(36).substr(2, 9)}`,
          name:
            Math.random() > 0.5
              ? "АБОНЕМЕНТ (8 занятий)"
              : "АБОНЕМЕНТ (12 занятий)",
          price: Math.random() > 0.5 ? 65 : 100,
          duration: "1 месяц",
        }
      : undefined;

    // Если есть абонемент и статус new, меняем на in_progress
    if (hasAbonement && getStatusName(status) === "new") {
      status = {
        id: "status_in_progress",
        name: "in_progress",
        label: "В обработке",
        color: "#f59e0b",
      };
    }

    return {
      id,
      createdAt,
      updatedAt: getRandomDate(5),
      name: names[Math.floor(Math.random() * names.length)],
      phone: `+375 (${Math.floor(Math.random() * 30)}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90) + 10}`,
      email: Math.random() > 0.3 ? `user${i}@example.com` : undefined,
      childAge: Math.floor(Math.random() * 15) + 3,
      sport,
      message:
        Math.random() > 0.5 ? "Хочу записаться на пробное занятие" : undefined,
      selectedAbonement: abonement,
      source,
      sectionId: `section_${sportIndex + 1}`,
      sectionName: sport,
      status: status,
      statusHistory: [
        {
          status: {
            id: "status_new",
            name: "new",
            label: "Новая",
            color: "#3b82f6",
          },
          changedAt: createdAt,
          comment: "Заявка создана",
          changedBy: "system",
          changedByName: "Система",
        },
      ],
      managerNotes:
        Math.random() > 0.7
          ? [
              {
                id: `note_${i}`,
                text: "Клиент просил перезвонить после 18:00",
                createdAt: getRandomDate(2),
                createdBy: "manager_1",
                createdByName: "Анна Петрова",
              },
            ]
          : [],
      assignedTo: Math.random() > 0.4 ? "manager_1" : undefined,
      assignedToName: Math.random() > 0.4 ? "Анна Петрова" : undefined,
    };
  },
).sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

export const getApplicationStats = () => {
  const total = mockApplications.length;
  const new_count = mockApplications.filter(
    (a) => getStatusName(a.status) === "new",
  ).length;
  const inProgress = mockApplications.filter(
    (a) => getStatusName(a.status) === "in_progress",
  ).length;
  const contacted = mockApplications.filter(
    (a) => getStatusName(a.status) === "contacted",
  ).length;
  const completed = mockApplications.filter(
    (a) => getStatusName(a.status) === "completed",
  ).length;
  const cancelled = mockApplications.filter(
    (a) => getStatusName(a.status) === "cancelled",
  ).length;

  return {
    total,
    new: new_count,
    inProgress,
    contacted,
    completed,
    cancelled,
    conversionRate: Math.round((completed / total) * 100),
  };
};
