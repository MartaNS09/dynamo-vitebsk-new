// Данные: какие абонементы есть у каждого тренера
export interface TrainerAbonement {
  id: string;
  name: string;
  price: number;
  duration: string;
  paymentAccount: string;
  sectionId?: string; // Привязка к секции
}

// Данные из таблицы заказчика
export const trainerAbonements: Record<string, TrainerAbonement[]> = {
  // ===== КИКБОКСИНГ =====
  "Пашкевич Сергей Андреевич": [
    {
      id: "ab_1",
      name: "1 занятие",
      price: 25,
      duration: "1 месяц",
      paymentAccount: "31-1",
    },
    {
      id: "ab_4",
      name: "4 занятия",
      price: 70,
      duration: "1 месяц",
      paymentAccount: "31-4",
    },
    {
      id: "ab_8",
      name: "8 занятий",
      price: 75,
      duration: "1 месяц",
      paymentAccount: "31-8",
    },
    {
      id: "ab_12",
      name: "12 занятий",
      price: 80,
      duration: "1 месяц",
      paymentAccount: "31-12",
    },
  ],

  "Бельчикова Оксана Алексеевна": [
    {
      id: "ab_1",
      name: "1 занятие",
      price: 25,
      duration: "1 месяц",
      paymentAccount: "32-1",
    },
    {
      id: "ab_4",
      name: "4 занятия",
      price: 70,
      duration: "1 месяц",
      paymentAccount: "32-4",
    },
    {
      id: "ab_8",
      name: "8 занятий",
      price: 75,
      duration: "1 месяц",
      paymentAccount: "32-8",
    },
    {
      id: "ab_12",
      name: "12 занятий",
      price: 80,
      duration: "1 месяц",
      paymentAccount: "32-12",
    },
  ],

  "Клюшин Валентин Геннадьевич": [
    {
      id: "ab_12",
      name: "12 занятий",
      price: 80,
      duration: "1 месяц",
      paymentAccount: "33-12",
    },
  ],

  // ===== ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА =====
  "Кузнецова Светлана Федоровна": [
    {
      id: "ab_12",
      name: "12 занятий",
      price: 100,
      duration: "1 месяц",
      paymentAccount: "13-12",
    },
  ],

  "Артамонова Елизавета Вадимовна": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 65,
      duration: "1 месяц",
      paymentAccount: "14-8",
    },
    {
      id: "ab_12",
      name: "12 занятий",
      price: 100,
      duration: "1 месяц",
      paymentAccount: "14-12",
    },
    {
      id: "ab_ind",
      name: "Индивидуальное",
      price: 25,
      duration: "1 занятие",
      paymentAccount: "14-1",
    },
  ],

  "Фроленко Ирина Николаевна": [
    {
      id: "ab_12",
      name: "12 занятий",
      price: 100,
      duration: "1 месяц",
      paymentAccount: "15-12",
    },
  ],

  "Кравченко Диана Алексеевна": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 65,
      duration: "1 месяц",
      paymentAccount: "16-8",
    },
  ],

  "Кузнецова И.В.": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 65,
      duration: "1 месяц",
      paymentAccount: "12-8",
    },
  ],

  "Кузнецов Н.И.": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 65,
      duration: "1 месяц",
      paymentAccount: "11-8",
    },
  ],

  "Высоцкая А.В.": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 65,
      duration: "1 месяц",
      paymentAccount: "16-8",
    },
  ],

  "Григорян А.С.": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 75,
      duration: "1 месяц",
      paymentAccount: "17-8",
    },
    {
      id: "ab_4",
      name: "4 занятия",
      price: 40,
      duration: "1 месяц",
      paymentAccount: "17-4",
    },
  ],

  // ===== ДЗЮДО =====
  "Залецкая Анна Владимировна": [
    {
      id: "ab_4",
      name: "4 занятия",
      price: 30,
      duration: "1 месяц",
      paymentAccount: "71-4",
    },
    {
      id: "ab_8",
      name: "8 занятий",
      price: 60,
      duration: "1 месяц",
      paymentAccount: "71-8",
    },
    {
      id: "ab_12",
      name: "12 занятий",
      price: 90,
      duration: "1 месяц",
      paymentAccount: "71-12",
    },
  ],

  // ===== ВЬЕТ ВО ДАО и ЙОГА (один тренер, разные секции) =====
  "Садовский Юрий Анатольевич": [
    // Для Вьет Во Дао (sectionId: cmmx4owk10004kkcadz7hppke)
    {
      id: "ab_12",
      name: "12 занятий",
      price: 90,
      duration: "1 месяц",
      paymentAccount: "21-12",
      sectionId: "cmmx4owk10004kkcadz7hppke",
    },
    // Для Йоги (sectionId: cmmx4owj10002kkcap51u768r)
    {
      id: "ab_8",
      name: "8 занятий",
      price: 90,
      duration: "1 месяц",
      paymentAccount: "21-8",
      sectionId: "cmmx4owj10002kkcap51u768r",
    },
    {
      id: "ab_4",
      name: "4 занятия",
      price: 60,
      duration: "1 месяц",
      paymentAccount: "21-4",
      sectionId: "cmmx4owj10002kkcap51u768r",
    },
  ],

  // ===== ТАНЦЫ =====
  "Беловус Д.М.": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 50,
      duration: "1 месяц",
      paymentAccount: "51-8",
    },
    {
      id: "ab_4",
      name: "4 занятия",
      price: 35,
      duration: "1 месяц",
      paymentAccount: "51-4",
    },
  ],

  // ===== ФРИСТАЙЛ =====
  "Пакулина Ольга Викторовна": [
    {
      id: "ab_8",
      name: "8 занятий",
      price: 64,
      duration: "1 месяц",
      paymentAccount: "41-8",
    },
  ],

  // ===== ПОЖАРНО-СПАСАТЕЛЬНЫЙ СПОРТ =====
  "Медведев Сергей Михайлович": [
    {
      id: "ab_4",
      name: "4 занятия",
      price: 24,
      duration: "1 месяц",
      paymentAccount: "61-4",
    },
    {
      id: "ab_8",
      name: "8 занятий",
      price: 48,
      duration: "1 месяц",
      paymentAccount: "61-8",
    },
  ],

  // ===== СТРЕЛЬБА =====
  "Сазонов З.С.": [
    {
      id: "ab_4",
      name: "4 занятия",
      price: 30,
      duration: "1 месяц",
      paymentAccount: "81-4",
    },
    {
      id: "ab_8",
      name: "8 занятий",
      price: 45,
      duration: "1 месяц",
      paymentAccount: "81-8",
    },
  ],
};

export function getTrainerAbonements(trainerName: string): TrainerAbonement[] {
  return trainerAbonements[trainerName] || [];
}

export function getTrainerAbonementsBySection(
  trainerName: string,
  sectionId: string,
): TrainerAbonement[] {
  const abonements = trainerAbonements[trainerName] || [];
  return abonements.filter((a) => !a.sectionId || a.sectionId === sectionId);
}

export function getTrainerAbonementByPriceAndSection(
  trainerName: string,
  price: number,
  sectionId: string,
): TrainerAbonement | null {
  const abonements = trainerAbonements[trainerName] || [];
  return (
    abonements.find(
      (a) => a.price === price && (!a.sectionId || a.sectionId === sectionId),
    ) || null
  );
}

export function getTrainerAbonementByPrice(
  trainerName: string,
  price: number,
): TrainerAbonement | null {
  const abonements = trainerAbonements[trainerName] || [];
  return abonements.find((a) => a.price === price) || null;
}

export function getTrainerAbonementByName(
  trainerName: string,
  abonementName: string,
): TrainerAbonement | null {
  const abonements = trainerAbonements[trainerName];
  if (!abonements) return null;
  return abonements.find((a) => a.name === abonementName) || null;
}
