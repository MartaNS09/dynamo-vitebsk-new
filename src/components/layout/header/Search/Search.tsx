"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, ClearIcon } from "@/components/icons";

interface SearchProps {
  variant?: "desktop" | "mobile";
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onClose?: () => void;
}

export const Search: React.FC<SearchProps> = ({
  variant = "desktop",
  onSearch,
  onClear,
  onClose,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchValue.trim()) {
        // Если передан onSearch - используем его, иначе переходим на страницу поиска
        if (onSearch) {
          onSearch(searchValue);
        } else {
          router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
        }
        setSearchValue("");
        if (variant === "mobile") {
          setIsMobileOpen(false);
          if (onClose) onClose();
        }
      }
    },
    [searchValue, onSearch, router, variant, onClose],
  );

  const handleClear = useCallback(() => {
    setSearchValue("");
    if (inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }

    if (variant === "mobile" && onClear) {
      setTimeout(onClear, 300);
    }
  }, [variant, onClear]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  // Десктопная версия
  if (variant === "desktop") {
    return (
      <form onSubmit={handleSubmit} className="desktop-search-form">
        <div className="desktop-search-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={handleInputChange}
            className="desktop-search-input"
            aria-label="Поиск по сайту"
          />
          {searchValue && (
            <button
              type="button"
              className="desktop-search-clear"
              onClick={handleClear}
              aria-label="Очистить поиск"
            >
              <ClearIcon />
            </button>
          )}
          <button type="submit" className="desktop-search-button">
            <SearchIcon />
          </button>
        </div>
      </form>
    );
  }

  // Мобильная версия - с кнопкой-бургером для поиска
  if (!isMobileOpen) {
    return (
      <button
        onClick={() => setIsMobileOpen(true)}
        className="mobile-search-toggle"
        aria-label="Открыть поиск"
      >
        <SearchIcon />
      </button>
    );
  }

  // Мобильная версия - открытая форма
  return (
    <div className="mobile-search-overlay">
      <form onSubmit={handleSubmit} className="mobile-search-form">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск по сайту..."
            value={searchValue}
            onChange={handleInputChange}
            className="mobile-search-input"
            aria-label="Поиск по сайту"
            autoFocus
          />
          {searchValue && (
            <button
              type="button"
              className="mobile-search-clear"
              onClick={handleClear}
              aria-label="Очистить поиск"
            >
              <ClearIcon />
            </button>
          )}
          <button type="submit" className="mobile-search-button">
            <SearchIcon />
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          setIsMobileOpen(false);
          if (onClose) onClose();
        }}
        className="mobile-search-close"
        aria-label="Закрыть поиск"
      >
        ×
      </button>
    </div>
  );
};
