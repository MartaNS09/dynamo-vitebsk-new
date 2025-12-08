"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { NAV_ITEMS, MOBILE_NAV_ITEMS } from "@/lib/config/navigation";
import {
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  InstagramIcon,
  SearchIcon,
  ClearIcon,
} from "@/components/icons";
import "./Header.scss";

// Компонент живых часов - ОКОНЧАТЕЛЬНАЯ ОПТИМИЗАЦИЯ
const LiveClock = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const updateTime = () => {
      if (!mounted) return;

      requestAnimationFrame(() => {
        if (!mounted) return;

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        setTime(`${hours}:${minutes}`);
      });
    };

    updateTime();
    // Обновляем каждую минуту - достаточно для часов
    const interval = setInterval(updateTime, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="header__clock"
      aria-live="off"
      aria-label={`Текущее время: ${time}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
      <span>{time}</span>
    </div>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const searchMobileRef = useRef<HTMLDivElement>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Оптимизированный scroll handler
  useEffect(() => {
    let ticking = false;
    let rafId: number;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const onSearch = useCallback((value: string) => {
    console.log("Search:", value);
    if (window.innerWidth <= 768) {
      setIsSearchOpen(false);
    }
  }, []);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchValue);
    },
    [searchValue, onSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    if (searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
    if (window.innerWidth <= 768) {
      setTimeout(() => setIsSearchOpen(false), 300);
    }
  }, []);

  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    requestAnimationFrame(() => {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    });
  }, []);

  // Упрощенный click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        burgerRef.current &&
        !burgerRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }

      if (
        isSearchOpen &&
        searchMobileRef.current &&
        !searchMobileRef.current.contains(target) &&
        searchToggleRef.current &&
        !searchToggleRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestAnimationFrame(() => {
          setIsMenuOpen(false);
          setIsSearchOpen(false);
        });
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isSearchOpen]);

  return (
    <header
      className={`header ${isScrolled ? "header--scrolled" : ""}`}
      role="banner"
      aria-label="Основная навигация"
    >
      {/* Верхний ряд с контактами */}
      <div className="header__top">
        <div className="container">
          <div className="header__contacts">
            <div className="header__info-left">
              <div className="header__address">
                <LocationIcon />
                <span>ул. Терешковой 16/2, Витебск</span>
              </div>
              <div className="header__hours">
                <ClockIcon />
                <span>Пн-Пт: 09:00-18:00</span>
              </div>
            </div>

            <div className="header__info-right">
              <div className="header__social">
                <a
                  href="https://instagram.com/dynamo_vitebsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header__social-link"
                  aria-label="Наш Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>

              <div className="header__phone">
                <div className="phone-icon-wrapper" title="Позвонить">
                  <PhoneIcon />
                  <div className="phone-number">
                    <a href="tel:+375333102525">+375 (33) 310-25-25</a>
                  </div>
                </div>
              </div>

              <LiveClock />
            </div>
          </div>
        </div>
      </div>

      {/* Основной ряд с навигацией */}
      <div className="header__main">
        <div className="container">
          <div className="header__content">
            {/* Логотип */}
            <Link
              href="/"
              className="header__logo"
              onClick={handleNavClick}
              aria-label="На главную страницу"
            >
              <div className="header__logo-icon" aria-hidden="true">
                Д
              </div>
              <div className="header__logo-text">
                <h1 className="header__logo-title">Динамо</h1>
                <span className="header__logo-subtitle">Витебск</span>
              </div>
            </Link>

            {/* Навигация для десктопа */}
            <nav className="header__nav" aria-label="Основное меню">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="header__nav-link"
                  onClick={handleNavClick}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Поиск для десктопа */}
            <div className="header__search">
              <form
                onSubmit={handleSearchSubmit}
                className="desktop-search-form"
              >
                <div className="desktop-search-wrapper">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="desktop-search-input"
                    aria-label="Поиск по сайту"
                  />
                  {searchValue && (
                    <button
                      type="button"
                      className="desktop-search-clear"
                      onClick={handleClearSearch}
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
            </div>

            {/* Управление для мобильных */}
            <div className="header__controls">
              <button
                ref={searchToggleRef}
                className="header__search-toggle"
                onClick={handleSearchToggle}
                aria-label="Открыть поиск"
                aria-expanded={isSearchOpen}
              >
                <SearchIcon />
              </button>

              <button
                ref={burgerRef}
                className={`header__menu-toggle ${
                  isMenuOpen ? "header__menu-toggle--active" : ""
                }`}
                onClick={handleMenuToggle}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="header__menu-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>

          {/* Мобильная навигация */}
          <nav
            ref={menuRef}
            id="mobile-menu"
            className={`header__nav-mobile ${
              isMenuOpen ? "header__nav-mobile--open" : ""
            }`}
            aria-label="Мобильное меню"
            hidden={!isMenuOpen}
          >
            {MOBILE_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header__nav-link"
                onClick={handleNavClick}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Мобильный поиск */}
          <div
            ref={searchMobileRef}
            className={`header__search-mobile ${
              isSearchOpen ? "header__search-mobile--open" : ""
            }`}
            hidden={!isSearchOpen}
          >
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <div className="search-input-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Поиск по сайту..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="mobile-search-input"
                  aria-label="Поиск по сайту"
                />
                {searchValue && (
                  <button
                    type="button"
                    className="mobile-search-clear"
                    onClick={handleClearSearch}
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
          </div>
        </div>
      </div>
    </header>
  );
};
