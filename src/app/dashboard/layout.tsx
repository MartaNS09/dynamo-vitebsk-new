"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRole } from "@/types/auth.types";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "@/styles/admin/layout.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // 1. Проверяем авторизацию
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      // 2. Проверяем, что пользователь - администратор!
      if (user) {
        const allowedRoles = [UserRole.SUPER_ADMIN, UserRole.ADMIN];
        if (!allowedRoles.includes(user.role)) {
          router.push("/"); // Если не админ - на главную
          return;
        }
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка панели управления...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Если пользователь не админ - не показываем админку
  const allowedRoles = [UserRole.SUPER_ADMIN, UserRole.ADMIN];
  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return (
    <div className="admin-wrapper">
      <AdminHeader
        user={user}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      <div className="admin-main">
        <AdminSidebar
          userRole={user.role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div
          className={`admin-backdrop ${sidebarOpen ? "mobile-open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
