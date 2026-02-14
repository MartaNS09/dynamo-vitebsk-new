"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { UserRole } from "@/types/auth.types";

export default function ApplicationsPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <div className="content-header">
        <h1>Заявки</h1>
        <p className="subtitle">Управление заявками на запись в секции</p>
        <div className="chart-container">
          <p>Здесь будет таблица с заявками пользователей</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
