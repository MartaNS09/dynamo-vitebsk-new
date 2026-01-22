"use client";
import Link from "next/link";
import { FOOTER_MOBILE_NAV } from "@/lib/config/footer-navigation";

export const MobileTabBar = () => {
  return (
    <nav className="footer__mobile-nav" aria-label="Мобильная навигация">
      {FOOTER_MOBILE_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="footer__mobile-nav-item"
        >
          <div
            className={`footer__mobile-nav-icon footer__mobile-nav-icon--${item.icon}`}
          >
            {item.icon === "home" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L5 9V21H9V14H15V21H19V9L22 7L12 2Z"
                  stroke="url(#home-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="home-gradient"
                    x1="2"
                    y1="2"
                    x2="22"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF6B6B" />
                    <stop offset="1" stopColor="#FF8E53" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {item.icon === "departments" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 19V9L12 3L2 9V19H5V11H19V19H22Z"
                  stroke="url(#departments-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V16H15V22"
                  stroke="url(#departments-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="departments-gradient"
                    x1="2"
                    y1="3"
                    x2="22"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4ECDC4" />
                    <stop offset="1" stopColor="#44A08D" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {item.icon === "sections" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  stroke="url(#sections-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1="3"
                  x2="8"
                  y2="21"
                  stroke="url(#sections-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="3"
                  x2="16"
                  y2="21"
                  stroke="url(#sections-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="3"
                  y1="8"
                  x2="21"
                  y2="8"
                  stroke="url(#sections-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="3"
                  y1="16"
                  x2="21"
                  y2="16"
                  stroke="url(#sections-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="sections-gradient"
                    x1="3"
                    y1="3"
                    x2="21"
                    y2="21"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#9D50BB" />
                    <stop offset="1" stopColor="#6E48AA" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {item.icon === "blog" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
                  stroke="url(#blog-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7H17V9H7V7Z"
                  stroke="url(#blog-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 11H17V13H7V11Z"
                  stroke="url(#blog-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 15H14V17H7V15Z"
                  stroke="url(#blog-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="blog-gradient"
                    x1="3"
                    y1="3"
                    x2="21"
                    y2="21"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#06D6A0" />
                    <stop offset="1" stopColor="#04A777" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
