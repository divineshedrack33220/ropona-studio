"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";

type Consent = "granted" | "denied" | null;

export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [showBanner, setShowBanner] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID || site.analytics.gaId;

  useEffect(() => {
    const stored = window.localStorage.getItem("ropona_consent") as Consent;
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
      window.__roponaConsent = stored;
      return;
    }
    const timer = window.setTimeout(() => setShowBanner(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (consent !== "granted" || !gaId) return;
    if (document.getElementById("ga-script")) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args as unknown as Record<string, unknown>);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { anonymize_ip: true, send_page_view: true });

    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);
  }, [consent, gaId]);

  useEffect(() => {
    if (consent !== "granted") return;
    const handler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-track]"
      );
      if (!target) return;
      const label = target.dataset.trackLabel || target.textContent?.trim().slice(0, 80);
      track(target.dataset.track || "interaction", {
        label: label || "unlabelled",
        location: window.location.pathname,
      });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [consent]);

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem("ropona_consent", value);
    window.__roponaConsent = value;
    setConsent(value);
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          aria-live="polite"
          className="fixed bottom-4 left-4 z-[95] w-[calc(100%-2rem)] max-w-sm rounded-[1.5rem] border border-burgundy/20 bg-champagne p-5"
          style={{ animation: "floatIn 0.8s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
            <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
              A note on cookies
            </p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-cocoa">
            This site uses privacy-first analytics to understand which films and
            pages resonate. Nothing loads until you choose.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="btn btn-gold !px-4 !py-2.5 !text-[0.58rem]"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="btn btn-outline !px-4 !py-2.5 !text-[0.58rem]"
            >
              Essential only
            </button>
            <Link
              href="/privacy"
              className="ml-auto font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-cocoa underline-offset-4 hover:text-burgundy hover:underline"
            >
              Details
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
