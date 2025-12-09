"use client";
import { useState, useEffect } from "react";

export const LiveClock = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const updateTime = () => {
      if (!mounted) return;

      requestAnimationFrame(() => {
        if (!mounted) return;

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        setTime(`${hours}:${minutes}`);
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="header__clock"
      aria-live="off"
      aria-label={`Текущее время: ${time}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
      <span>{time}</span>
    </div>
  );
};
