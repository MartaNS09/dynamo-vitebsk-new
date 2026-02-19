"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { X, Mail, Send } from "lucide-react";
import { UserRole } from "@/types/auth.types";
import { USER_ROLE_LABELS } from "@/constants/users";
import styles from "./InviteUserForm.module.scss";

interface InviteUserFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export const InviteUserForm: React.FC<InviteUserFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      role: UserRole.EDITOR,
      message: "",
    },
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.titleWithIcon}>
            <Mail size={24} className={styles.icon} />
            <h2>Пригласить пользователя</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.description}>
            Пригласите нового администратора или редактора. На указанный email
            будет отправлено письмо с ссылкой для создания пароля.
          </p>

          <div className={styles.formGroup}>
            <label>Имя *</label>
            <input
              {...register("name", { required: "Имя обязательно" })}
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
              placeholder="Введите email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Роль *</label>
            <select {...register("role", { required: "Роль обязательна" })}>
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
            <label>Личное сообщение (необязательно)</label>
            <textarea
              {...register("message")}
              rows={3}
              placeholder="Напишите пару слов приглашаемому пользователю..."
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Отмена
            </button>
            <button type="submit" className={styles.submitButton}>
              <Send size={16} />
              Отправить приглашение
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
