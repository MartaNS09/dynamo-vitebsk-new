"use client";
import { LiveClock } from "./LiveClock";
import {
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  InstagramIcon,
} from "@/components/icons";

export const HeaderTop = () => {
  return (
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
  );
};
