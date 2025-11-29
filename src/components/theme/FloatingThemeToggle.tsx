"use client";
import { Switch } from "antd";
import { useTheme } from "./ThemeProvider";
import "./FloatingThemeToggle.scss";

export const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="floating-theme">
      <div className="floating-theme__container">
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          className="floating-theme__switch"
        />
        <div className="floating-theme__divider"></div>
        <button
          className="floating-theme__rtl"
          onClick={() =>
            (document.documentElement.dir =
              document.documentElement.dir === "rtl" ? "ltr" : "rtl")
          }
          aria-label="Переключить направление текста"
        >
          ⇄
        </button>
      </div>
    </div>
  );
};
