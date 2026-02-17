"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserRole } from "@/types/auth.types";
import {
  LayoutDashboard,
  Dumbbell,
  FileText,
  Users,
  BarChart3,
  Mail,
  LogOut,
  Search,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminSidebarProps {
  userRole: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  userRole,
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Панель управления",
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR],
    },
    {
      path: "/dashboard/sections",
      icon: Dumbbell,
      label: "Спортивные секции",
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR],
    },
    {
      path: "/dashboard/blog",
      icon: FileText,
      label: "Блог / Новости",
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR],
    },
    {
      path: "/dashboard/applications",
      icon: Mail,
      label: "Заявки",
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
    },
    {
      path: "/dashboard/users",
      icon: Users,
      label: "Пользователи",
      roles: [UserRole.SUPER_ADMIN],
    },
    {
      path: "/dashboard/statistics",
      icon: BarChart3,
      label: "Статистика",
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
    },
    {
      path: "/dashboard/seo",
      icon: Search,
      label: "Управление SEO",
      roles: [UserRole.SUPER_ADMIN],
    },
  ];

  // Фильтруем пункты по роли
  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <Link href="/dashboard" className="logo" onClick={onClose}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Динамо Admin</span>
        </Link>
      </div>

      <nav className="nav-menu">
        {filteredNavItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-item ${isActive(item.path) ? "active" : ""}`}
            onClick={onClose}
          >
            <item.icon className="nav-icon" size={18} />
            <span className="nav-item-text">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <LogOut size={18} />
          <span className="nav-item-text">Выйти</span>
        </button>
      </div>
    </aside>
  );
}
