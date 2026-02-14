"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { UserRole } from "@/types/auth.types";

export default function UsersPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.SUPER_ADMIN}>
      <div className="content-header">
        <h1>Пользователи</h1>
        <p className="subtitle">Управление администраторами и редакторами</p>
        <div className="chart-container">
          <p>Страница доступна только Супер Администратору</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
