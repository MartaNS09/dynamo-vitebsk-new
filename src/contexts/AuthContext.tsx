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
      // Имитация запроса к API
      await new Promise((resolve) => setTimeout(resolve, 500));

      let mockUser: AdminUser | null = null;

      // Демо-авторизация по email и паролю
      if (
        credentials.email === "superadmin@dynamo-vitebsk.by" &&
        credentials.password === "AdminDynamo2024!"
      ) {
        mockUser = {
          id: "1",
          name: "Супер Администратор",
          email: "superadmin@dynamo-vitebsk.by",
          role: UserRole.SUPER_ADMIN,
          avatar: "",
          lastLogin: new Date().toISOString(),
          createdAt: "2024-01-01T00:00:00Z",
        };
      } else if (
        credentials.email === "admin@dynamo-vitebsk.by" &&
        credentials.password === "AdminDynamo2024!"
      ) {
        mockUser = {
          id: "2",
          name: "Администратор",
          email: "admin@dynamo-vitebsk.by",
          role: UserRole.ADMIN,
          avatar: "",
          lastLogin: new Date().toISOString(),
          createdAt: "2024-01-01T00:00:00Z",
        };
      } else if (
        credentials.email === "editor@dynamo-vitebsk.by" &&
        credentials.password === "AdminDynamo2024!"
      ) {
        mockUser = {
          id: "3",
          name: "Редактор",
          email: "editor@dynamo-vitebsk.by",
          role: UserRole.EDITOR,
          avatar: "",
          lastLogin: new Date().toISOString(),
          createdAt: "2024-01-01T00:00:00Z",
        };
      }

      if (!mockUser) {
        console.error("Invalid credentials for:", credentials.email);
        throw new Error("Неверный email или пароль");
      }

      console.log("Login successful:", mockUser);
      setUser(mockUser);
      localStorage.setItem("admin_user", JSON.stringify(mockUser));

      // Редирект на дашборд после успешного логина
      console.log("Redirecting to /dashboard");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Logout user:", user?.email);
    setUser(null);
    localStorage.removeItem("admin_user");
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
