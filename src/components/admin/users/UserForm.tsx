"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { AdminUser } from "@/types/user.types";
import { UserRole } from "@/types/auth.types";
import { USER_ROLE_LABELS } from "@/constants/users";
import styles from "./UserForm.module.scss";

interface UserFormProps {
  user: AdminUser | null;
  mode: "create" | "edit" | "view";
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  mode,
  onSubmit,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || UserRole.EDITOR,
      phone: user?.phone || "",
      position: user?.position || "",
      bio: user?.bio || "",
      isActive: user?.isActive ?? true,
    },
  });

  const isViewMode = mode === "view";

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>
            {mode === "create" && "Создать пользователя"}
            {mode === "edit" && "Редактировать пользователя"}
            {mode === "view" && "Просмотр пользователя"}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Имя *</label>
            <input
              {...register("name", { required: "Имя обязательно" })}
              disabled={isViewMode}
              placeholder="Введите имя"
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неверный формат email",
                },
              })}
              disabled={isViewMode}
              placeholder="Введите email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Роль *</label>
            <select
              {...register("role", { required: "Роль обязательна" })}
              disabled={isViewMode}
            >
              {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className={styles.error}>{errors.role.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Телефон</label>
            <input
              {...register("phone")}
              disabled={isViewMode}
              placeholder="+375 (29) 123-45-67"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Должность</label>
            <input
              {...register("position")}
              disabled={isViewMode}
              placeholder="Например: Главный редактор"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Описание</label>
            <textarea
              {...register("bio")}
              disabled={isViewMode}
              rows={4}
              placeholder="Краткая информация о пользователе"
            />
          </div>

          {mode !== "create" && (
            <div className={styles.formGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  {...register("isActive")}
                  disabled={isViewMode}
                />
                <span>Пользователь активен</span>
              </label>
            </div>
          )}

          {!isViewMode && (
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Отмена
              </button>
              <button type="submit" className={styles.submitButton}>
                {mode === "create" ? "Создать" : "Сохранить"}
              </button>
            </div>
          )}

          {isViewMode && (
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
