"use client";

import { useAuth } from "@/contexts/AuthContext";
import StatsCards from "@/components/admin/StatsCards";
import ActivityFeed from "@/components/admin/ActivityFeed";
import { mockDashboardStats, mockActivityLogs } from "@/data/admin.data";
import { UserRole } from "@/types/auth.types";
import { Dumbbell, FileText, Users } from "lucide-react";
import "@/styles/admin/dashboard.scss";

export default function DashboardPage() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  };

  const getRoleDescription = () => {
    if (!user) return "";

    switch (user.role) {
      case UserRole.SUPER_ADMIN:
        return "У вас есть полный доступ ко всем функциям системы";
      case UserRole.ADMIN:
        return "Вы можете управлять секциями, блогом и заявками";
      default:
        return "";
    }
  };

  return (
    <>
      {/* ===== ЛИПКОЕ ПРИВЕТСТВИЕ ===== */}
      <div className="content-header-sticky">
        <h1>
          {getGreeting()}, {user?.name}!
        </h1>
        <p className="subtitle">{getRoleDescription()}</p>
      </div>

      {/* Быстрые действия */}
      <div
        className="quick-actions-section"
        style={{ gridTemplateColumns: "1fr" }}
      >
        <div className="chart-container">
          <div className="chart-header">
            <h2>Быстрые действия</h2>
            <p>Часто используемые функции</p>
          </div>
          <div
            className="quick-actions-grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            <button
              className="quick-action-btn"
              onClick={() => alert("Добавление новой секции")}
            >
              <Dumbbell size={24} className="action-icon" />
              <span>Новая секция</span>
            </button>

            <button
              className="quick-action-btn"
              onClick={() => alert("Создание новой статьи")}
            >
              <FileText size={24} className="action-icon" />
              <span>Новая статья</span>
            </button>

            {user?.role === UserRole.SUPER_ADMIN && (
              <button
                className="quick-action-btn"
                onClick={() => alert("Добавление нового администратора")}
              >
                <Users size={24} className="action-icon" />
                <span>Новый админ</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Статистика */}
      <StatsCards stats={mockDashboardStats} />

      {/* Лента активности */}
      <ActivityFeed activities={mockActivityLogs} />
    </>
  );
}
