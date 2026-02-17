import {
  Application,
  ApplicationStatus,
  ApplicationSource,
} from "@/types/application.types";

// Генерация случайных дат за последние 30 дней
const getRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

const statuses: ApplicationStatus[] = [
  "new",
  "new",
  "new",
  "new",
  "in_progress",
  "in_progress",
  "in_progress",
  "contacted",
  "contacted",
  "completed",
  "cancelled",
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
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];
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

    const finalStatus =
      hasAbonement && status === "new" ? "in_progress" : status;

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
      status: finalStatus,
      // ИСПРАВЛЕНО: явно указываем тип
      statusHistory: [
        {
          status: "new" as ApplicationStatus,
          changedAt: createdAt,
          comment: "Заявка создана",
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
  const new_count = mockApplications.filter((a) => a.status === "new").length;
  const inProgress = mockApplications.filter(
    (a) => a.status === "in_progress",
  ).length;
  const contacted = mockApplications.filter(
    (a) => a.status === "contacted",
  ).length;
  const completed = mockApplications.filter(
    (a) => a.status === "completed",
  ).length;
  const cancelled = mockApplications.filter(
    (a) => a.status === "cancelled",
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
