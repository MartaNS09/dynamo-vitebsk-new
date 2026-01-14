export interface RentalItem {
  id: string;
  category: "winter" | "summer";
  name: string;
  emoji: string;
  description?: string;
  priceDay: number;
  priceWeekend: number;
  priceWeek: number;
}

export const rentalItems: RentalItem[] = [
  {
    id: "w1",
    category: "winter",
    name: "Лыжи",
    emoji: "🎿",
    description: "Лыжи, палки, ботинки в комплекте",
    priceDay: 20.0,
    priceWeekend: 40.0,
    priceWeek: 60.0,
  },
  {
    id: "w2",
    category: "winter",
    name: "Тюбинг",
    emoji: "🛷",
    description: "Ватрушка для зимнего катания",
    priceDay: 20.0,
    priceWeekend: 40.0,
    priceWeek: 60.0,
  },

  {
    id: "s1",
    category: "summer",
    name: "Палатка",
    emoji: "⛺",
    description: "3-х местная, с дугами",
    priceDay: 13.0,
    priceWeekend: 25.0,
    priceWeek: 50.0,
  },
  {
    id: "s2",
    category: "summer",
    name: "Спальный мешок",
    emoji: "🛌",
    priceDay: 5.5,
    priceWeekend: 15.0,
    priceWeek: 45.0,
  },
  {
    id: "s3",
    category: "summer",
    name: "Надувная кровать",
    emoji: "🛏️",
    priceDay: 8.0,
    priceWeekend: 20.0,
    priceWeek: 40.0,
  },
  {
    id: "s4",
    category: "summer",
    name: "Насос",
    emoji: "💨",
    description: "Ножной",
    priceDay: 3.0,
    priceWeekend: 5.0,
    priceWeek: 15.0,
  },
  {
    id: "s5",
    category: "summer",
    name: "Стул складной",
    emoji: "🪑",
    priceDay: 3.0,
    priceWeekend: 7.0,
    priceWeek: 21.0,
  },
  {
    id: "s6",
    category: "summer",
    name: "Стол складной",
    emoji: "🪓",
    priceDay: 7.0,
    priceWeekend: 15.0,
    priceWeek: 45.0,
  },
  {
    id: "s7",
    category: "summer",
    name: "Гамак",
    emoji: "🌴",
    priceDay: 5.5,
    priceWeekend: 15.0,
    priceWeek: 45.0,
  },
  {
    id: "s8",
    category: "summer",
    name: "Роликовые коньки",
    emoji: "🛼",
    priceDay: 9.0,
    priceWeekend: 18.0,
    priceWeek: 54.0,
  },
  {
    id: "s9",
    category: "summer",
    name: "Защитная экипировка",
    emoji: "🛡️",
    description: "Для роликовых коньков",
    priceDay: 6.0,
    priceWeekend: 12.0,
    priceWeek: 36.0,
  },
];
