"use client";
import { useState } from "react";
import Link from "next/link";
import { FOOTER_DESKTOP_NAV } from "@/lib/config/footer-navigation";
import { ChevronIcon } from "@/components/icons";

export const FooterNavigation = () => {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    about: false,
    info: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Навигация для десктопа */}
      <div className="footer__navigation-desktop">
        {FOOTER_DESKTOP_NAV.map((column, index) => (
          <div key={index} className="footer__column">
            <h3 className="footer__column-title">{column.title}</h3>
            <ul className="footer__links">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Навигация для мобильных (аккордеон) */}
      <div className="footer__navigation-mobile">
        {FOOTER_DESKTOP_NAV.map((column, index) => {
          const key = index === 0 ? "about" : "info";
          return (
            <div key={index} className="footer__accordion">
              <button
                className="footer__accordion-button"
                onClick={() => toggleAccordion(key)}
                aria-expanded={openAccordions[key]}
              >
                <span>{column.title}</span>
                <ChevronIcon isOpen={openAccordions[key]} />
              </button>
              <div
                className={`footer__accordion-content ${
                  openAccordions[key]
                    ? "footer__accordion-content--open"
                    : ""
                }`}
                hidden={!openAccordions[key]}
              >
                <ul className="footer__mobile-links">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
