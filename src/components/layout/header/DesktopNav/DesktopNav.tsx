"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/config/navigation";
import "./DesktopNav.scss";

interface DesktopNavProps {
  onNavClick?: () => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ onNavClick }) => {
  const [showSchoolMenu, setShowSchoolMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const schoolButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Рассчитываем позицию меню при открытии
  useEffect(() => {
    if (showSchoolMenu && schoolButtonRef.current) {
      const rect = schoolButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 10, // 10px ниже кнопки
        left: rect.left,
      });
    }
  }, [showSchoolMenu]);

  // Закрываем меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        schoolButtonRef.current &&
        !schoolButtonRef.current.contains(event.target as Node)
      ) {
        setShowSchoolMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Всегда переходим на главную при клике
  const handleSchoolClick = () => {
    router.push("/");
    if (onNavClick) onNavClick();
    setShowSchoolMenu(false);
  };

  // А для открытия меню только при наведении:
  const handleSchoolMouseEnter = () => {
    setShowSchoolMenu(true);
  };

  return (
    <nav className="desktop-nav" aria-label="Основная навигация">
      <ul className="desktop-nav__list">
        {NAV_ITEMS.map((item) => {
          if (item.label === "О школе") {
            return (
              <li
                key={item.href}
                className="desktop-nav__item desktop-nav__item--school"
              >
                <button
                  ref={schoolButtonRef}
                  className="desktop-nav__link desktop-nav__link--school"
                  onClick={handleSchoolClick} // Один клик = на главную
                  onMouseEnter={handleSchoolMouseEnter} // Наведение = открыть меню
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (!menuRef.current?.matches(":hover")) {
                        setShowSchoolMenu(false);
                      }
                    }, 100);
                  }}
                  aria-expanded={showSchoolMenu}
                  aria-haspopup="true"
                >
                  <span>О школе</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="desktop-nav__chevron"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showSchoolMenu && item.submenu && (
                  <div
                    ref={menuRef}
                    className="desktop-nav__school-menu"
                    style={{
                      position: "fixed",
                      top: `${menuPosition.top}px`,
                      left: `${menuPosition.left}px`,
                      zIndex: 99999,
                    }}
                    onMouseEnter={() => setShowSchoolMenu(true)}
                    onMouseLeave={() => setShowSchoolMenu(false)}
                  >
                    <div className="desktop-nav__school-menu-content">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="desktop-nav__school-menu-link"
                          onClick={() => {
                            setShowSchoolMenu(false);
                            if (onNavClick) onNavClick();
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={item.href} className="desktop-nav__item">
              <Link
                href={item.href}
                className="desktop-nav__link"
                onClick={onNavClick}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
