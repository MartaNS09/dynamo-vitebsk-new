"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { UserRole } from "@/types/auth.types";

export default function SettingsPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.SUPER_ADMIN}>
      <div className="content-header">
        <h1>Настройки системы</h1>
        <p className="subtitle">Настройки сайта и параметры системы</p>
        <div className="chart-container">
          <p>Системные настройки доступны только Супер Администратору</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
