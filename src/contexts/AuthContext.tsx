"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  AdminUser,
  LoginCredentials,
  AuthContextType,
  UserRole,
} from "@/types/auth.types";
import { API_ENDPOINTS } from "@/config/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Загрузка пользователя из localStorage при монтировании
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("admin_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    console.log("Login attempt:", credentials.email);
    setIsLoading(true);

    try {
      // РЕАЛЬНЫЙ ЗАПРОС К БЕКЕНДУ
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Неверный email или пароль");
      }

      const data = await response.json();

      // Преобразуем ответ бекенда в формат AdminUser
      // На бекенде роль приходит как "ADMIN", а в типах может быть "admin"
      let userRole: UserRole;

      switch (data.user.role) {
        case "SUPER_ADMIN":
          userRole = UserRole.SUPER_ADMIN;
          break;
        case "ADMIN":
          userRole = UserRole.ADMIN;
          break;
        case "EDITOR":
          userRole = UserRole.EDITOR;
          break;
        default:
          // Если роль неизвестна, ставим EDITOR по умолчанию
          userRole = UserRole.EDITOR;
      }

      const newUser: AdminUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: userRole,
        avatar: data.user.avatar || "",
        lastLogin: new Date().toISOString(),
        createdAt: data.user.createdAt || new Date().toISOString(),
      };

      console.log("Login successful:", newUser);
      setUser(newUser);
      localStorage.setItem("admin_user", JSON.stringify(newUser));

      // Сохраняем токен для будущих запросов
      localStorage.setItem("access_token", data.access_token);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      // Показываем ошибку пользователю
      throw new Error("Неверный email или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Logout user:", user?.email);
    setUser(null);
    localStorage.removeItem("admin_user");
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
