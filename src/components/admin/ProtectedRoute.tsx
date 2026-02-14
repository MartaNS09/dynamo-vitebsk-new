"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RoleType, RolePermissions, UserRole } from "@/types/auth.types";
import "@/styles/admin/dashboard.scss";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: RoleType;
  requiredPermission?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/admin/login");
        return;
      }

      if (user && requiredRole) {
        const userRole = user.role as RoleType;

        // Проверка роли
        if (userRole !== requiredRole && userRole !== UserRole.SUPER_ADMIN) {
          router.push("/admin/dashboard");
          return;
        }

        // Проверка конкретного разрешения
        if (requiredPermission && userRole !== UserRole.SUPER_ADMIN) {
          const permissions = RolePermissions[userRole];
          const [section, action] = requiredPermission.split(".");

          if (section && action) {
            // Проверяем разрешение с помощью type guard
            if (section === "dashboard" && permissions.dashboard) {
              // dashboard: true
              return;
            } else if (section === "settings" && permissions.settings) {
              // settings: true
              return;
            } else if (permissions[section as keyof typeof permissions]) {
              // Для объектов permissions (sections, blog, users, etc.)
              const sectionPermissions =
                permissions[section as keyof typeof permissions];
              if (
                typeof sectionPermissions === "object" &&
                sectionPermissions !== null
              ) {
                const actionPermitted = (
                  sectionPermissions as Record<string, boolean>
                )[action];
                if (!actionPermitted) {
                  router.push("/admin/dashboard");
                  return;
                }
              }
            } else {
              router.push("/admin/dashboard");
              return;
            }
          }
        }
      }
    }
  }, [
    user,
    isAuthenticated,
    isLoading,
    requiredRole,
    requiredPermission,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Проверка авторизации...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
