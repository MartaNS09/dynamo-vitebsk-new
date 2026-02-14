"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LoginCredentials } from "@/types/auth.types";
import { Mail, Lock, Shield, Eye, EyeOff } from "lucide-react";
import "@/styles/admin/login.scss";

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(credentials);
      router.push("/dashboard");
    } catch (err) {
      setError("Неверный email или пароль");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для заполнения демо-данных
  const fillDemoCredentials = (email: string) => {
    setCredentials({
      email: email,
      password: "AdminDynamo2024!",
      remember: true,
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <Shield className="logo-icon" />
              <span className="logo-text">Dynamo Admin</span>
            </div>
            <h1>Панель управления</h1>
            <p>Войдите для управления контентом сайта</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <div className="input-wrapper password-wrapper">
                <Lock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="remember-forgot">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="remember"
                  checked={credentials.remember}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      remember: e.target.checked,
                    })
                  }
                  disabled={isLoading}
                />
                <label htmlFor="remember">Запомнить меня</label>
              </div>
              <button
                type="button"
                className="forgot-link"
                onClick={() =>
                  alert("Функция восстановления пароля в разработке")
                }
              >
                Забыли пароль?
              </button>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Вход...
                </>
              ) : (
                "Войти"
              )}
            </button>

            {/* Демо-доступы для локального тестирования */}
            {/* <div className="demo-credentials">
              <p className="demo-title">Демо-доступы:</p>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-btn"
                  onClick={() =>
                    fillDemoCredentials("superadmin@dynamo-vitebsk.by")
                  }
                >
                  Супер-админ
                </button>
                <button
                  type="button"
                  className="demo-btn"
                  onClick={() => fillDemoCredentials("admin@dynamo-vitebsk.by")}
                >
                  Администратор
                </button>
                <button
                  type="button"
                  className="demo-btn"
                  onClick={() =>
                    fillDemoCredentials("editor@dynamo-vitebsk.by")
                  }
                >
                  Редактор
                </button>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
