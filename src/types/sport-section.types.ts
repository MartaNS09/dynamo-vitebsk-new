export interface Abonement {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "BYN" | "USD" | "EUR" | string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  // paymentAccount?: string; // ← ДОБАВИТЬ ЭТУ СТРОКУ
}

export interface Trainer {
  id: string;
  name: string;
  position: string;
  photo?: string;
  description?: string;
  // paymentAccount?: string; // ← ДОБАВИТЬ ЭТУ СТРОКУ
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
  heroImages?: string[];
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
