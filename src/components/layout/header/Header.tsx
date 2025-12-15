"use client";
import { useState, useEffect, useCallback } from "react";
import { HeaderTop } from "./HeaderTop/HeaderTop";
import { Logo } from "./Logo/Logo";
import { DesktopNav } from "./DesktopNav/DesktopNav";
import { Search } from "./Search/Search";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { SearchIcon } from "@/components/icons";
import "./Header.scss";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleSearch = useCallback((value: string) => {
    console.log("Search:", value);
    if (window.innerWidth <= 768) {
      setIsSearchOpen(false);
    }
  }, []);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    requestAnimationFrame(() => {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    });
  }, []);

  return (
    <header
      className={`header ${isScrolled ? "header--scrolled" : ""}`}
      role="banner"
      aria-label="Основная навигация"
    >
      <HeaderTop />

      <div className="header__main">
        <div className="container">
          <div className="header__content">
            <Logo onClick={handleNavClick} />
            <DesktopNav onNavClick={handleNavClick} />{" "}
            {/* ← ИСПОЛЬЗУЕМ СТАРЫЙ! */}
            <div className="header__search">
              <Search variant="desktop" onSearch={handleSearch} />
            </div>
            <div className="header__controls">
              <button
                className="header__search-toggle"
                onClick={handleSearchToggle}
                aria-label="Открыть поиск"
                aria-expanded={isSearchOpen}
              >
                <SearchIcon />
              </button>

              <button
                className={`header__menu-toggle ${
                  isMenuOpen ? "header__menu-toggle--active" : ""
                }`}
                onClick={handleMenuToggle}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMenuOpen}
              >
                <span className="header__menu-icon"></span>
              </button>
            </div>
          </div>

          <MobileMenu
            isOpen={isMenuOpen}
            onClose={handleNavClick}
            isSearchOpen={isSearchOpen}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </header>
  );
};
