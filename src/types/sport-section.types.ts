// export interface Abonement {
//   id: string;
//   name: string; // "Месячный абонемент"
//   description: string; // "8 занятий в месяц"
//   price: number; // 80
//   currency: "BYN" | "USD" | "EUR" | string; // ← разрешите string

//   duration: string; // "1 месяц"
//   features: string[]; // ["Группа до 10 чел", "Тренер МС"]
//   isPopular?: boolean;
// }

// // Тренер - просто фото + имя + должность
// export interface Trainer {
//   id: string;
//   name: string; // "Залецкая Анна Владимировна"
//   position: string; // "тренер-преподаватель"
//   photo?: string; // URL фото
//   description?: string; // Краткое описание (опционально)
// }

// // Основная секция
// export interface SportSection {
//   id: string;
//   slug: string; // "gymnastics", "kickboxing"
//   name: string; // "ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА"
//   shortDescription: string; // "для девочек с 3 лет"
//   fullDescription: string; // Полное HTML описание

//   // Основная информация
//   ageInfo: string; // "для девочек с 3 лет"
//   category?: string; // "Гимнастика", "Единоборства" (для фильтров)

//   // Абонементы - админ добавляет
//   abonements: Abonement[];

//   // Тренеры - можно несколько
//   trainers: Trainer[];

//   // Медиа
//   coverImage: string;
//   gallery: string[];

//   // Дополнительно (опционально)
//   schedule?: string; // "Пн, Ср, Пт 16:00-18:00"
//   location?: string; // "ул. Спортивная, 15"

//   // SEO
//   seoTitle?: string;
//   seoDescription?: string;

//   // Статус
//   isActive: boolean;
//   isFeatured?: boolean; // Выделить на главной
// }

// новый
export interface Abonement {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "BYN" | "USD" | "EUR" | string;
  duration: string;
  features: string[];
  isPopular?: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  position: string;
  photo?: string;
  description?: string;
}

export interface SportSection {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  ageInfo: string;
  category?: string;

  // Медиа
  coverImage: string;
  heroImages?: string[]; // 🔴 ДОБАВЛЕНО: массив для херо с двумя фото
  gallery: string[];

  // Списки
  abonements: Abonement[];
  trainers: Trainer[];

  // Дополнительно
  schedule?: string;
  location?: string;
  seoTitle?: string;
  seoDescription?: string;

  // Статус
  isActive: boolean;
  isFeatured?: boolean;
}
