"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, Shield } from "lucide-react";
import { AdminUser } from "@/types/auth.types";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "./notifications/NotificationBell";

interface AdminHeaderProps {
  user: AdminUser | null;
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function AdminHeader({ user, onMenuClick }: AdminHeaderProps) {
  const { logout } = useAuth();

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
        {/* Уведомления */}
        <NotificationBell />

        {/* Профиль пользователя - используем класс user-menu как в старых стилях */}
        <div className="user-menu">
          <div className="avatar">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || "A"}
          </div>
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
