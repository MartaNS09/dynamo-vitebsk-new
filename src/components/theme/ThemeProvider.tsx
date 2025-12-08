"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initializeTheme = () => {
      try {
        const saved = localStorage.getItem("dynamo-theme") as Theme;
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const initialTheme = saved || (systemPrefersDark ? "dark" : "light");

        requestAnimationFrame(() => {
          setTheme(initialTheme);
          document.documentElement.setAttribute("data-theme", initialTheme);
        });
      } catch {
        // Fallback на светлую тему при ошибке
        requestAnimationFrame(() => {
          setTheme("light");
          document.documentElement.setAttribute("data-theme", "light");
        });
      }
    };

    const timer = setTimeout(initializeTheme, 1);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    requestAnimationFrame(() => {
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    });

    setTimeout(() => {
      localStorage.setItem("dynamo-theme", newTheme);
    }, 0);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
