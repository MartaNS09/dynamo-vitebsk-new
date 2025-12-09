"use client";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/config/navigation";

interface DesktopNavProps {
  onNavClick?: () => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ onNavClick }) => {
  return (
    <nav className="header__nav" aria-label="Основное меню">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="header__nav-link"
          onClick={onNavClick}
        >
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
