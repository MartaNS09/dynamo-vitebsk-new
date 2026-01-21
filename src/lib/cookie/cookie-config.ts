const COOKIE_CONSENT_KEY = "cookie-consent-dynamo-vitebsk";
const CONSENT_DURATION_DAYS = 30; // 1 месяц
const DECLINE_DURATION_DAYS = 30; // Отказ тоже на 1 месяц

/**
 * Проверяет, есть ли действующая запись в localStorage
 */
const hasValidConsentRecord = (): boolean => {
  if (typeof window === "undefined") return false;

  const itemStr = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!itemStr) return false;

  try {
    const item = JSON.parse(itemStr);

    // Проверяем, не истек ли срок
    if (new Date(item.expires) < new Date()) {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      return false;
    }

    // Если статус "viewing_policy" - считаем, что записи нет
    if (item.status === "viewing_policy") {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      return false;
    }

    return true; // Любая действующая запись (accepted или declined)
  } catch {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    return false;
  }
};

/**
 * Нужно ли показывать баннер
 */
export const shouldShowBanner = (): boolean => {
  if (typeof window === "undefined") return false;

  // Не показываем на странице политики
  if (window.location.pathname === "/privacy") {
    return false;
  }

  // Показываем, если нет действующей записи
  return !hasValidConsentRecord();
};

/**
 * Сохраняет статус согласия
 */
export const setConsentStatus = (status: "accepted" | "declined"): void => {
  if (typeof window === "undefined") return;

  const durationDays =
    status === "accepted" ? CONSENT_DURATION_DAYS : DECLINE_DURATION_DAYS;

  const item = {
    status,
    expires: new Date(
      Date.now() + durationDays * 24 * 60 * 60 * 1000,
    ).toISOString(),
    dateSet: new Date().toISOString(),
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(item));

  window.dispatchEvent(
    new CustomEvent("cookieConsentChanged", {
      detail: item,
    }),
  );
};
