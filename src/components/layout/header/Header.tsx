"use client";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./Header.scss";

const { Search } = Input;

// Компонент живых часов - красивые
const LiveClock = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="header__clock"
      aria-live="polite"
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

// SVG иконки
const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM5 6h1.5c.1 1.2.4 2.4.8 3.5L5.3 11.7c-.4-1.3-.7-2.6-.8-4H5zm14 12c-3.2 0-6.2-1.2-8.5-3.5l1.2-1.2c1.8 1.8 4.2 2.9 6.8 2.9h1.5c-.1-1.4-.4-2.7-.8-4l1.2-1.2c.6 1.4 1 2.9 1.2 4.4v1.6z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Добавляем ref для элементов
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const searchMobileRef = useRef<HTMLDivElement>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSearch = (value: string) => {
    console.log("Search:", value);
    if (window.innerWidth <= 768) {
      setIsSearchOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // Просто переключаем состояние меню
    setIsMenuOpen((prev) => !prev);

    // Если открываем меню, закрываем поиск
    if (!isMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Только для мобильного меню - проверяем клик вне меню и вне бургера
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        burgerRef.current &&
        !burgerRef.current.contains(target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }

      // Для мобильного поиска - проверяем клик вне поиска и вне кнопки поиска
      // НО: не закрываем если кликнули внутрь поисковой строки!
      const searchInput = document.querySelector(".header__search-input input");
      if (
        searchMobileRef.current &&
        !searchMobileRef.current.contains(target) &&
        searchToggleRef.current &&
        !searchToggleRef.current.contains(target) &&
        searchInput &&
        !searchInput.contains(target) &&
        isSearchOpen
      ) {
        setIsSearchOpen(false);
      }
    };

    // Добавляем обработчик
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen]); // Добавляем зависимости

  // Обработчик для клавиши Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      className={`header ${isScrolled ? "header--scrolled" : ""}`}
      role="banner"
      aria-label="Основная навигация"
    >
      {/* Верхний ряд с контактами - ОДНА СТРОКА, КРАСИВО */}
      <div className="header__top">
        <div className="container">
          <div className="header__contacts">
            {/* Левая часть: адрес и время работы */}
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

            {/* Правая часть: инстаграм, телефон, часы */}
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
              <Link
                href="/"
                className="header__nav-link"
                onClick={handleNavClick}
              >
                <span>О школе</span>
              </Link>
              <Link
                href="/history"
                className="header__nav-link"
                onClick={handleNavClick}
              >
                <span>Отделения</span>
              </Link>
              <Link
                href="/sports"
                className="header__nav-link"
                onClick={handleNavClick}
              >
                <span>Спортивные секции</span>
              </Link>
              <Link
                href="/coaches"
                className="header__nav-link"
                onClick={handleNavClick}
              >
                <span>Достижения</span>
              </Link>
              <Link
                href="/achievements"
                className="header__nav-link"
                onClick={handleNavClick}
              >
                <span>Абонементы</span>
              </Link>
              <Link
                href="/contacts"
                className="header__nav-link"
                onClick={handleNavClick}
              >
                <span>Прокат</span>
              </Link>
            </nav>

            {/* Поиск для десктопа */}
            <div className="header__search">
              <Search
                placeholder="Поиск..."
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                onSearch={onSearch}
                className="header__search-input"
                aria-label="Поиск по сайту"
              />
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
                <SearchOutlined aria-hidden="true" />
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
            <Link
              href="/"
              className="header__nav-link"
              onClick={handleNavClick}
            >
              <span>Главная</span>
            </Link>
            <Link
              href="/history"
              className="header__nav-link"
              onClick={handleNavClick}
            >
              <span>История</span>
            </Link>
            <Link
              href="/sports"
              className="header__nav-link"
              onClick={handleNavClick}
            >
              <span>Отделения</span>
            </Link>
            <Link
              href="/coaches"
              className="header__nav-link"
              onClick={handleNavClick}
            >
              <span>Тренеры</span>
            </Link>
            <Link
              href="/achievements"
              className="header__nav-link"
              onClick={handleNavClick}
            >
              <span>Достижения</span>
            </Link>
            <Link
              href="/contacts"
              className="header__nav-link"
              onClick={handleNavClick}
            >
              <span>Контакты</span>
            </Link>
          </nav>

          {/* Мобильный поиск */}
          <div
            ref={searchMobileRef}
            className={`header__search-mobile ${
              isSearchOpen ? "header__search-mobile--open" : ""
            }`}
            hidden={!isSearchOpen}
          >
            <Search
              placeholder="Поиск..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={onSearch}
              className="header__search-input"
              aria-label="Поиск по сайту"
              autoFocus
            />
          </div>
        </div>
      </div>
    </header>
  );
};
