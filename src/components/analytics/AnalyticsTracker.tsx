"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, trackPageView } from "@/lib/analytics/track";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const query =
      typeof window !== "undefined" ? window.location.search.slice(1) : "";
    const fullPath = query ? `${pathname}?${query}` : pathname;
    trackPageView(fullPath);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href^='tel:']") as HTMLAnchorElement | null;
      if (link) {
        trackEvent("phone_click", { phone: link.getAttribute("href") || "" });
        return;
      }

      const enrollmentLink = target?.closest(
        "a[href*='/enrollment']",
      ) as HTMLAnchorElement | null;
      if (enrollmentLink) {
        trackEvent("enrollment_cta_click", {
          href: enrollmentLink.getAttribute("href") || "/enrollment",
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
