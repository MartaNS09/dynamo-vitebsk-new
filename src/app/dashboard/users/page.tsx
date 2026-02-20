"use client";

import React, { useState } from "react";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UserForm } from "@/components/admin/users/UserForm";
import { UserFilters } from "@/components/admin/users/UserFilters";
import { InviteUserForm } from "@/components/admin/users/InviteUserForm";
import { useUsers } from "@/hooks/admin/useUsers";
import { AdminUser } from "@/types/user.types";
import { UserRole } from "@/types/auth.types";
import { UserPlus, Mail, RefreshCw } from "lucide-react";
import styles from "./page.module.scss";

export default function UsersPage() {
  const {
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
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");

  const handleView = (user: AdminUser) => {
    setSelectedUser(user);
    setMode("view");
    setIsFormOpen(true);
  };

  const handleEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setMode("edit");
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setMode("create");
    setIsFormOpen(true);
  };

  const handleInvite = () => {
    setIsInviteOpen(true);
  };

  const handleDelete = async (user: AdminUser) => {
    if (confirm(`Вы уверены, что хотите удалить пользователя ${user.name}?`)) {
      await deleteUser(user.id);
    }
  };

  const handleToggleStatus = async (user: AdminUser) => {
    await toggleUserStatus(user.id, !user.isActive);
  };

  const handleResetPassword = (user: AdminUser) => {
    // Здесь можно открыть модалку сброса пароля
    console.log("Сброс пароля для:", user);
  };

  // Строка 70 - заменён any на конкретный тип
  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    position?: string;
    bio?: string;
    isActive?: boolean;
  }) => {
    if (mode === "create") {
      await createUser(data);
    } else if (mode === "edit" && selectedUser) {
      await updateUser(selectedUser.id, data);
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  // Строка 80 - заменён any на конкретный тип
  const handleInviteSubmit = async (data: {
    email: string;
    name: string;
    role: UserRole;
    message?: string;
  }) => {
    await inviteUser(data);
    setIsInviteOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Пользователи</h1>
          <p className={styles.subtitle}>
            Управление администраторами и редакторами сайта
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.inviteButton} onClick={handleInvite}>
            <Mail size={20} />
            Пригласить
          </button>
          <button className={styles.createButton} onClick={handleCreate}>
            <UserPlus size={20} />
            Создать пользователя
          </button>
        </div>
      </div>

      <UserFilters filters={filters} onFilterChange={setFilters} />

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{total}</div>
          <div className={styles.statLabel}>Всего пользователей</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {users.filter((u) => u.isActive).length}
          </div>
          <div className={styles.statLabel}>Активных</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {users.filter((u) => !u.isActive).length}
          </div>
          <div className={styles.statLabel}>Неактивных</div>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <RefreshCw size={40} className={styles.spinner} />
        </div>
      ) : (
        <UsersTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onResetPassword={handleResetPassword}
          currentUserRole={UserRole.SUPER_ADMIN} // Замени на реальную роль из AuthContext
        />
      )}

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          mode={mode}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isInviteOpen && (
        <InviteUserForm
          onSubmit={handleInviteSubmit}
          onClose={() => setIsInviteOpen(false)}
        />
      )}
    </div>
  );
}
