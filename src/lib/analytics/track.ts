export type AnalyticsEventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (
      counterId: number,
      action: "hit" | "reachGoal",
      target: string,
      params?: AnalyticsEventParams,
    ) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YM_COUNTER_ID
  ? Number(process.env.NEXT_PUBLIC_YM_COUNTER_ID)
  : 0;

export const isGaEnabled = Boolean(GA_MEASUREMENT_ID);
export const isYmEnabled = Number.isFinite(YM_COUNTER_ID) && YM_COUNTER_ID > 0;

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;

  if (isGaEnabled && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }

  if (isYmEnabled && window.ym) {
    window.ym(YM_COUNTER_ID, "hit", path);
  }
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return;

  if (isGaEnabled && window.gtag) {
    window.gtag("event", name, params);
  }

  if (isYmEnabled && window.ym) {
    window.ym(YM_COUNTER_ID, "reachGoal", name, params);
  }
}
