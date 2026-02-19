import { UserRole } from "./auth.types";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  position?: string; // Должность
  bio?: string; // Краткое описание
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  permissions?: string[]; // Индивидуальные права (если нужно расширить роль)
}

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  position?: string;
  bio?: string;
  isActive?: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  role?: UserRole;
  phone?: string;
  position?: string;
  bio?: string;
  isActive?: boolean;
  avatar?: string;
}

export interface UserFilters {
  role?: UserRole;
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "name" | "email" | "createdAt" | "lastLogin";
  sortOrder?: "asc" | "desc";
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordDTO {
  email: string;
}

export interface InviteUserDTO {
  email: string;
  name: string;
  role: UserRole;
  message?: string;
}

// Статистика по пользователям
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: {
    [key in UserRole]?: number;
  };
  recentLogins: {
    date: string;
    count: number;
  }[];
}
