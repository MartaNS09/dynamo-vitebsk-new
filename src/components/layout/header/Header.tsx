"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeaderTop } from "./HeaderTop/HeaderTop";
import { Logo } from "./Logo/Logo";
import { DesktopNav } from "./DesktopNav/DesktopNav";
import { Search } from "./Search/Search";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { SearchIcon } from "@/components/icons";
import "./Header.scss";

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId: number;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      console.log("Search:", value);
      if (value && value.trim()) {
        router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      }
      if (window.innerWidth <= 768) {
        setIsSearchOpen(false);
      }
    },
    [router],
  );

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    if (isSearchOpen) setIsSearchOpen(false);
  }, [isSearchOpen]);

  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
  }, [isMenuOpen]);

  const handleNavClick = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <HeaderTop />
      <div className="header__main">
        <div className="container">
          <div className="header__content">
            <Logo onClick={handleNavClick} />
            <DesktopNav onNavClick={handleNavClick} />
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
                aria-label="Меню"
                aria-expanded={isMenuOpen}
              >
                <span className="header__menu-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onNavClick={handleNavClick} />
      {isSearchOpen && (
        <div className="header__search-mobile header__search-mobile--open">
          <Search
            variant="mobile"
            onSearch={handleSearch}
            onClear={() => setIsSearchOpen(false)}
          />
        </div>
      )}
    </header>
  );
};
