"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Africa/Lagos",
      }).format(new Date());
      setTime(`${formatted} WAT`);
    };
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span suppressHydrationWarning aria-label="Local time in Lagos">
      {time || "—"}
    </span>
  );
}
