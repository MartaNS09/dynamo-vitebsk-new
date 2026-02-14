"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { UserRole } from "@/types/auth.types";

export default function SeoPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.SUPER_ADMIN}>
      <div className="content-header">
        <h1>SEO настройки</h1>
        <p className="subtitle">Управление мета-тегами и SEO оптимизацией</p>
        <div className="chart-container">
          <p>Настройки SEO доступны только Супер Администратору</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
