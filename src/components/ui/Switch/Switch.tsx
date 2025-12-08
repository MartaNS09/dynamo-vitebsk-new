"use client";

import React from "react";
import { SunIcon, MoonIcon } from "@/components/icons/theme-icons";
import styles from "./Switch.module.scss";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
}) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <button
      className={`${styles.switch} ${checked ? styles.checked : ""} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      onClick={handleToggle}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      aria-label={
        checked ? "Переключить на светлую тему" : "Переключить на темную тему"
      }
      type="button"
    >
      <span className={styles.track}>
        <span className={styles.thumb}>
          <span className={styles.icon}>
            {checked ? <MoonIcon /> : <SunIcon />}
          </span>
        </span>
      </span>
    </button>
  );
};
