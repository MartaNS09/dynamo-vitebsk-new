import React, { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  User,
  UserCog,
  Crown,
  Ban,
  CheckCircle,
  Key,
} from "lucide-react";
import { AdminUser } from "@/types/user.types";
import { UserRole } from "@/types/auth.types";
import { USER_ROLE_LABELS, USER_ROLE_COLORS } from "@/constants/users";
import styles from "./UsersTable.module.scss";

interface UsersTableProps {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
  onToggleStatus: (user: AdminUser) => void;
  onResetPassword: (user: AdminUser) => void;
  currentUserRole: UserRole;
}

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return <Crown size={18} />;
    case UserRole.ADMIN:
      return <UserCog size={18} />;
    default:
      return <User size={18} />;
  }
};

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  onResetPassword,
  currentUserRole,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Никогда";
    return new Date(dateString).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canEdit = (user: AdminUser) => {
    if (currentUserRole === UserRole.SUPER_ADMIN) return true;
    if (
      currentUserRole === UserRole.ADMIN &&
      user.role !== UserRole.SUPER_ADMIN
    )
      return true;
    return false;
  };

  const canDelete = (user: AdminUser) => {
    if (
      currentUserRole === UserRole.SUPER_ADMIN &&
      user.role !== UserRole.SUPER_ADMIN
    )
      return true;
    return false;
  };

  // Функция для получения класса цвета роли
  const getRoleColorClass = (role: UserRole) => {
    const color = USER_ROLE_COLORS[role].toLowerCase();
    switch (color) {
      case "purple":
        return styles.purple;
      case "blue":
        return styles.blue;
      case "green":
        return styles.green;
      default:
        return styles.blue;
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Роль</th>
            <th>Последний вход</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th className={styles.actionsHeader}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={!user.isActive ? styles.inactive : ""}>
              <td>
                <div className={styles.userCell}>
                  <div className={styles.avatar}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                    {user.position && (
                      <div className={styles.userPosition}>{user.position}</div>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <span
                  className={`${styles.roleBadge} ${getRoleColorClass(user.role)}`}
                >
                  {getRoleIcon(user.role)}
                  {USER_ROLE_LABELS[user.role]}
                </span>
              </td>
              <td>
                <span className={styles.lastLogin}>
                  {formatDate(user.lastLogin)}
                </span>
              </td>
              <td>
                <span
                  className={`${styles.statusBadge} ${user.isActive ? styles.active : styles.inactive}`}
                >
                  {user.isActive ? (
                    <>
                      <CheckCircle size={14} />
                      Активен
                    </>
                  ) : (
                    <>
                      <Ban size={14} />
                      Неактивен
                    </>
                  )}
                </span>
              </td>
              <td>
                <span className={styles.createdAt}>
                  {formatDate(user.createdAt)}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.iconButton}
                    onClick={() => onView(user)}
                    title="Просмотр"
                  >
                    <Eye size={18} />
                  </button>

                  {canEdit(user) && (
                    <button
                      className={styles.iconButton}
                      onClick={() => onEdit(user)}
                      title="Редактировать"
                    >
                      <Pencil size={18} />
                    </button>
                  )}

                  <button
                    className={styles.iconButton}
                    onClick={() => onResetPassword(user)}
                    title="Сбросить пароль"
                  >
                    <Key size={18} />
                  </button>

                  <button
                    className={`${styles.iconButton} ${user.isActive ? styles.warning : styles.success}`}
                    onClick={() => onToggleStatus(user)}
                    title={user.isActive ? "Деактивировать" : "Активировать"}
                  >
                    {user.isActive ? (
                      <Ban size={18} />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                  </button>

                  {canDelete(user) && (
                    <button
                      className={`${styles.iconButton} ${styles.danger}`}
                      onClick={() => onDelete(user)}
                      title="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
