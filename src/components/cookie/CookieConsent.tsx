"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie as CookieIcon } from "lucide-react";
import { shouldShowBanner, setConsentStatus } from "@/lib/cookie/cookie-config";
import styles from "./CookieConsent.module.scss";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  // Обработчики
  const handleDecline = useCallback(() => {
    setConsentStatus("declined");
    setIsVisible(false);
  }, []);

  const handleAccept = useCallback(() => {
    setConsentStatus("accepted");
    setIsVisible(false);
    window.dispatchEvent(new Event("cookieConsentAccepted"));
  }, []);

  const handleClose = useCallback(() => {
    setConsentStatus("declined");
    setIsVisible(false);
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handlePolicyClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/privacy";
  }, []);

  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isVisible, handleClose]);

  // Показываем баннер
  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldShowBanner()) {
        setIsVisible(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Фокус на кнопке при открытии
  useEffect(() => {
    if (isVisible && acceptButtonRef.current) {
      const timer = setTimeout(() => {
        acceptButtonRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.overlay}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Баннер */}
          <motion.div
            ref={bannerRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={styles.banner}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-description"
          >
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.icon}>
                    <CookieIcon className={styles.iconCookie} />
                  </div>
                  <div className={styles.text}>
                    <h3 id="cookie-title" className={styles.title}>
                      Файлы cookie
                    </h3>
                    <p id="cookie-description" className={styles.description}>
                      Наш сайт использует файлы cookie для улучшения
                      пользовательского опыта, сбора статистики и представления
                      персонализированных рекомендаций. Нажав «Принять», вы
                      даете согласие на обработку файлов cookie в соответствии с{" "}
                      <Link
                        href="/privacy"
                        onClick={handlePolicyClick}
                        className={styles.link}
                        aria-label="Прочитать Политику обработки файлов cookie"
                      >
                        Политикой обработки файлов cookie
                      </Link>
                      .
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className={styles.close}
                    aria-label="Закрыть уведомление о cookie"
                    type="button"
                  >
                    <X className={styles.iconClose} />
                  </button>
                </div>

                <div className={styles.actions}>
                  <button
                    ref={acceptButtonRef}
                    onClick={handleAccept}
                    className={`${styles.btn} ${styles.accept}`}
                    type="button"
                    autoFocus={isVisible}
                  >
                    Принять
                  </button>
                  <button
                    onClick={handleDecline}
                    className={`${styles.btn} ${styles.decline}`}
                    type="button"
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
