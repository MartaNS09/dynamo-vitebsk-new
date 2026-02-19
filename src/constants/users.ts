import { UserRole } from "@/types/auth.types";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: "Главный администратор",
  ADMIN: "Администратор",
  EDITOR: "Редактор",
};

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  SUPER_ADMIN: "purple",
  ADMIN: "blue",
  EDITOR: "green",
};

export const USER_ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  SUPER_ADMIN: "Полный доступ ко всем разделам и настройкам",
  ADMIN: "Управление контентом и заявками",
  EDITOR: "Только создание и редактирование постов и секций",
};

export const DEFAULT_USER_AVATAR = "/images/default-avatar.png";

export const USER_SORT_OPTIONS = [
  { value: "name", label: "По имени" },
  { value: "email", label: "По email" },
  { value: "createdAt", label: "По дате создания" },
  { value: "lastLogin", label: "По последнему входу" },
];

export const USER_STATUS_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "inactive", label: "Неактивные" },
];
