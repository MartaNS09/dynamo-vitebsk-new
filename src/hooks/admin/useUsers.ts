"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminUser, UserFilters } from "@/types/user.types";
import { UserRole } from "@/types/auth.types";
import {
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  getUsers,
  inviteUser as apiInviteUser,
  updateUser as apiUpdateUser,
} from "@/lib/api/users";

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
      const loaded = await getUsers();
      let filtered = [...loaded];

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
    await apiCreateUser({
      ...data,
      password: "Admin123456!",
    });
    await loadUsers();
  };

  // Обновление пользователя
  const updateUser = async (id: string, data: UpdateUserData) => {
    await apiUpdateUser(id, data);
    await loadUsers();
  };

  // Удаление пользователя
  const deleteUser = async (id: string) => {
    await apiDeleteUser(id);
    await loadUsers();
  };

  // Изменение статуса
  const toggleUserStatus = async (id: string, isActive: boolean) => {
    await apiUpdateUser(id, { isActive });
    await loadUsers();
  };

  // Приглашение пользователя
  const inviteUser = async (data: InviteUserData) => {
    const invited = await apiInviteUser(data);
    if (typeof window !== "undefined") {
      window.alert(
        `Пользователь приглашен.\nВременный пароль: ${invited.tempPassword}`,
      );
    }
    await loadUsers();
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
