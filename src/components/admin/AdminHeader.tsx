"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, LogOut, Menu, Shield } from "lucide-react";
import { AdminUser } from "@/types/auth.types";
import { useAuth } from "@/contexts/AuthContext";

interface AdminHeaderProps {
  user: AdminUser | null;
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function AdminHeader({
  user,
  onMenuClick,
  // sidebarOpen,
}: AdminHeaderProps) {
  const { logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getRoleName = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Супер Администратор";
      case "admin":
        return "Администратор";
      default:
        return role;
    }
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Меню"
        >
          <Menu size={20} />
        </button>

        <Link href="/dashboard" className="logo">
          <Shield className="logo-icon" size={24} />
          <span className="logo-text">Dynamo Admin</span>
        </Link>
      </div>

      <div className="header-right">
        {/* ===== КОЛОКОЛЬЧИК ===== */}
        <div className="notifications">
          {/* ТОЛЬКО ОДНА КНОПКА! */}
          <button
            className="notification-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Уведомления"
          >
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>

          {notificationsOpen && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h4>Уведомления</h4>
                <span>3 новых</span>
              </div>
              <div className="notifications-list">
                <div className="notification-item unread">
                  <div className="notification-content">
                    <p className="notification-title">Новая заявка</p>
                    <p className="notification-text">
                      Иванов Иван оставил заявку на секцию
                    </p>
                    <span className="notification-time">5 минут назад</span>
                  </div>
                </div>
                <div className="notification-item unread">
                  <div className="notification-content">
                    <p className="notification-title">Обновление контента</p>
                    <p className="notification-text">
                      Статья &quot;Новости спорта&quot; требует модерации
                    </p>
                    <span className="notification-time">1 час назад</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-content">
                    <p className="notification-title">Системное уведомление</p>
                    <p className="notification-text">
                      Резервное копирование выполнено успешно
                    </p>
                    <span className="notification-time">2 часа назад</span>
                  </div>
                </div>
              </div>
              <div className="notifications-footer">
                <button>Все уведомления</button>
              </div>
            </div>
          )}
        </div>

        {/* Профиль пользователя */}
        <div className="user-menu">
          <div className="avatar">{user?.name?.charAt(0) || "A"}</div>
          <div className="user-info">
            <span className="user-name">{user?.name || "Администратор"}</span>
            <span className="user-role">{getRoleName(user?.role || "")}</span>
          </div>
          <button className="logout-btn" onClick={logout} aria-label="Выйти">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
