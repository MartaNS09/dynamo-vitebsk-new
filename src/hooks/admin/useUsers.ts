"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminUser, UserFilters } from "@/types/user.types";
import { UserRole } from "@/types/auth.types";

// ВРЕМЕННЫЕ МОК-ДАННЫЕ (пока нет API)
const MOCK_USERS: AdminUser[] = [
  {
    id: "1",
    email: "admin@dynamo-vitebsk.by",
    name: "Иван Петров",
    role: UserRole.SUPER_ADMIN,
    position: "Главный администратор",
    lastLogin: "2026-02-18T10:30:00Z",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    isActive: true,
  },
  {
    id: "2",
    email: "editor@dynamo-vitebsk.by",
    name: "Анна Смирнова",
    role: UserRole.EDITOR,
    position: "Редактор контента",
    lastLogin: "2026-02-17T15:45:00Z",
    createdAt: "2025-02-15T00:00:00Z",
    updatedAt: "2025-02-15T00:00:00Z",
    isActive: true,
  },
  {
    id: "3",
    email: "inactive@dynamo-vitebsk.by",
    name: "Петр Иванов",
    role: UserRole.ADMIN,
    position: "Бывший администратор",
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-03-01T00:00:00Z",
    isActive: false,
  },
];

// Типы для данных форм
interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  position?: string;
  bio?: string;
}

interface UpdateUserData {
  name?: string;
  role?: UserRole;
  phone?: string;
  position?: string;
  bio?: string;
  isActive?: boolean;
}

interface InviteUserData {
  email: string;
  name: string;
  role: UserRole;
  message?: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
  });

  // Загрузка пользователей
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Имитация загрузки
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filtered = [...MOCK_USERS];

      // Фильтрация по роли
      if (filters.role) {
        filtered = filtered.filter((u) => u.role === filters.role);
      }

      // Фильтрация по статусу
      if (filters.isActive !== undefined) {
        filtered = filtered.filter((u) => u.isActive === filters.isActive);
      }

      // Поиск
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(search) ||
            u.email.toLowerCase().includes(search),
        );
      }

      setTotal(filtered.length);
      setUsers(filtered);
    } catch (error) {
      console.error("Ошибка загрузки пользователей:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Создание пользователя
  const createUser = async (data: CreateUserData) => {
    console.log("Создание пользователя:", data);
    await loadUsers();
  };

  // Обновление пользователя
  const updateUser = async (id: string, data: UpdateUserData) => {
    console.log("Обновление пользователя:", id, data);
    await loadUsers();
  };

  // Удаление пользователя
  const deleteUser = async (id: string) => {
    console.log("Удаление пользователя:", id);
    await loadUsers();
  };

  // Изменение статуса
  const toggleUserStatus = async (id: string, isActive: boolean) => {
    console.log("Изменение статуса:", id, isActive);
    await loadUsers();
  };

  // Приглашение пользователя
  const inviteUser = async (data: InviteUserData) => {
    console.log("Приглашение пользователя:", data);
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    total,
    filters,
    setFilters,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    inviteUser,
  };
};
