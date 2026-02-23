import { SeoPage } from "@/types/seo.types";
import { SeoFormData } from "@/types/seo.types"; // <-- ДОБАВЬ ЭТОТ ИМПОРТ!

export const SEO_PAGES: SeoPage[] = [
  // Главные страницы
  { id: "home", name: "Главная страница", path: "/", group: "main" },
  { id: "about", name: "О школе", path: "/about", group: "main" },
  { id: "history", name: "История", path: "/history", group: "main" },
  {
    id: "trainers",
    name: "Тренерский состав",
    path: "/trainers",
    group: "main",
  },
  { id: "contacts", name: "Контакты", path: "/contacts", group: "main" },

  // Секции и спорт
  { id: "sports", name: "Все секции", path: "/sports", group: "sections" },
  {
    id: "sports-single",
    name: "Страница секции",
    path: "/sports/[slug]",
    group: "sections",
  },
  {
    id: "departments",
    name: "Отделения",
    path: "/departments",
    group: "sections",
  },
  {
    id: "departments-single",
    name: "Страница отделения",
    path: "/departments/[slug]",
    group: "sections",
  },

  // Блог
  { id: "blog", name: "Блог / Новости", path: "/blog", group: "blog" },
  {
    id: "blog-single",
    name: "Статья блога",
    path: "/blog/[slug]",
    group: "blog",
  },

  // Информационные страницы
  {
    id: "enrollment",
    name: "Запись в секции",
    path: "/enrollment",
    group: "info",
  },
  { id: "rental", name: "Аренда", path: "/rental", group: "info" },
  {
    id: "privacy",
    name: "Политика конфиденциальности",
    path: "/privacy",
    group: "info",
  },

  // Системные
  { id: "login", name: "Вход в админку", path: "/login", group: "system" },
  { id: "404", name: "Страница 404", path: "/404", group: "system" },
];

export const SEO_GROUPS = [
  { id: "main", name: "Основные страницы" },
  { id: "sections", name: "Секции и спорт" },
  { id: "blog", name: "Блог" },
  { id: "info", name: "Информационные" },
  { id: "system", name: "Системные" },
];

export const ROBOTS_OPTIONS = [
  { value: "index, follow", label: "Индексировать, следить" },
  { value: "noindex, follow", label: "Не индексировать, следить" },
  { value: "index, nofollow", label: "Индексировать, не следить" },
  { value: "noindex, nofollow", label: "Не индексировать, не следить" },
];

export const DEFAULT_SEO: Record<string, Partial<SeoFormData>> = {
  home: {
    title: "Динамо Витебск | Спортивная школа олимпийского резерва",
    description:
      "Официальный сайт СДЮШОР Динамо Витебск. Спортивные секции для детей и подростков, профессиональные тренеры, участие в соревнованиях.",
    keywords:
      "Динамо Витебск, спортивная школа, секции для детей, спорт Витебск",
  },
  about: {
    title: "О школе | Динамо Витебск",
    description:
      "История и достижения спортивной школы Динамо Витебск. Наши тренеры и воспитанники.",
    keywords: "история Динамо Витебск, достижения, тренеры",
  },
};

export const SEO_VALIDATION = {
  titleMaxLength: 70,
  descriptionMaxLength: 160,
  keywordsMaxLength: 200,
};
