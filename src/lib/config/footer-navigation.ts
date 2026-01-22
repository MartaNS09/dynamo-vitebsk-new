export const FOOTER_DESKTOP_NAV = [
  {
    title: "О нас",
    links: [
      { href: "/history", label: "История" },
      { href: "/administration", label: "Администрация" },
      { href: "/trainers", label: "Тренера" },
      { href: "/contacts", label: "Контакты" },
      { href: "/blog", label: "Блог" },
      { href: "/rental", label: "Прокат" },
    ],
  },
  {
    title: "Информация",
    links: [
      { href: "/", label: "Главная" },
      { href: "/departments", label: "Отделения" },
      { href: "/sports", label: "Спортивные секции" },
      { href: "/blog", label: "Блог" },
    ],
  },
];

// Мобильная навигация (таббар)
export const FOOTER_MOBILE_NAV = [
  {
    href: "/",
    label: "Главная",
    icon: "home",
  },
  {
    href: "/departments",
    label: "Отделения",
    icon: "departments",
  },
  {
    href: "/sports",
    label: "Секции",
    icon: "sections",
  },
  {
    href: "/blog",
    label: "Блог",
    icon: "blog",
  },
];

// Контакты в футере
export const FOOTER_CONTACTS = [
  {
    type: "address",
    text: "ул. Терешковой 16/2, Витебск",
    icon: "location",
  },
  {
    type: "phone",
    text: "+375 (33) 310-25-25",
    href: "tel:+375333102525",
    icon: "phone",
  },
  {
    type: "email",
    text: "vitebsksdushor@dynamo.by",
    href: "mailto:vitebsksdushor@dynamo.by",
    icon: "email",
  },
  {
    type: "hours",
    text: "Пн-Сб: 9:00-20:00",
    icon: "clock",
  },
];
