"use client";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./Header.scss";

const { Search } = Input;

// Красивые SVG иконки
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM5 6h1.5c.1 1.2.4 2.4.8 3.5L5.3 11.7c-.4-1.3-.7-2.6-.8-4H5zm14 12c-3.2 0-6.2-1.2-8.5-3.5l1.2-1.2c1.8 1.8 4.2 2.9 6.8 2.9h1.5c-.1-1.4-.4-2.7-.8-4l1.2-1.2c.6 1.4 1 2.9 1.2 4.4v1.6z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSearch = (value: string) => {
    console.log("Search:", value);
    // Закрываем поиск после поиска на мобилке
    if (window.innerWidth <= 768) {
      setIsSearchOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    // Если открываем поиск, закрываем меню
    if (!isSearchOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // Если открываем меню, закрываем поиск
    if (!isMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  // Закрываем меню и поиск при клике на ссылку
  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  // Закрываем при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const headerElement = document.querySelector(".header");
      if (headerElement && !headerElement.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      {/* Верхний ряд с контактами */}
      <div className="header__top">
        <div className="container">
          <div className="header__contacts">
            <div className="header__phone">
              <PhoneIcon />
              <span>+375 (212) 12-34-56</span>
            </div>
            <div className="header__social">
              <a
                href="https://instagram.com/dynamo_vitebsk"
                target="_blank"
                rel="noopener noreferrer"
                className="header__social-link"
              >
                <InstagramIcon />
                <span>dynamo_vitebsk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Основной ряд с навигацией */}
      <div className="header__main">
        <div className="container">
          <div className="header__content">
            {/* Логотип с анимацией */}
            <Link href="/" className="header__logo" onClick={handleNavClick}>
              <div className="header__logo-icon">Д</div>
              <div className="header__logo-text">
                <h1 className="header__logo-title">Динамо</h1>
                <span className="header__logo-subtitle">Витебск</span>
              </div>
            </Link>

            {/* Навигация для десктопа */}
            <nav className="header__nav">
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

            {/* Поиск для десктопа */}
            <div className="header__search">
              <Search
                placeholder="Поиск..."
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                onSearch={onSearch}
                className="header__search-input"
              />
            </div>

            {/* Управление для мобильных */}
            <div className="header__controls">
              {/* Кнопка поиска для мобильных */}
              <button
                className="header__search-toggle"
                onClick={handleSearchToggle}
                aria-label="Поиск"
              >
                <SearchOutlined />
              </button>

              {/* Бургер меню для мобильных */}
              <button
                className={`header__menu-toggle ${
                  isMenuOpen ? "header__menu-toggle--active" : ""
                }`}
                onClick={handleMenuToggle}
                aria-label="Меню"
              >
                <span className="header__menu-icon"></span>
              </button>
            </div>
          </div>

          {/* Мобильная навигация */}
          <nav
            className={`header__nav-mobile ${
              isMenuOpen ? "header__nav-mobile--open" : ""
            }`}
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
            className={`header__search-mobile ${
              isSearchOpen ? "header__search-mobile--open" : ""
            }`}
          >
            <Search
              placeholder="Поиск..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={onSearch}
              className="header__search-input"
              autoFocus
            />
          </div>
        </div>
      </div>
    </header>
  );
};
