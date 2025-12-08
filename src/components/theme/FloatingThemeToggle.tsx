
"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Switch } from "@/components/ui/Switch/Switch";
import "./FloatingThemeToggle.scss";

export const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isRTL, setIsRTL] = React.useState(false);

  React.useEffect(() => {
    // Восстанавливаем направление при загрузке
    const timer = setTimeout(() => {
      const savedDir = localStorage.getItem("dynamo-direction") as
        | "ltr"
        | "rtl"
        | null;
      if (savedDir) {
        document.documentElement.dir = savedDir;
        setIsRTL(savedDir === "rtl");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleRtlClick = React.useCallback(() => {
    if (isProcessing) return;

    setIsProcessing(true);
    const newDir = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
    setIsRTL(newDir === "rtl");

    requestAnimationFrame(() => {
      document.documentElement.dir = newDir;
      setTimeout(() => {
        localStorage.setItem("dynamo-direction", newDir);
        setIsProcessing(false);
      }, 0);
    });
  }, [isProcessing]);

  return (
    <div className="floating-theme">
      <div className="floating-theme__container">
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="floating-theme__switch"
        />

        <div className="floating-theme__divider" aria-hidden="true"></div>

        <button
          className="floating-theme__rtl"
          onClick={handleRtlClick}
          aria-label="Переключить направление текста"
          aria-pressed={isRTL}
          type="button"
          disabled={isProcessing}
        >
          ⇄
        </button>
      </div>
    </div>
  );
};
