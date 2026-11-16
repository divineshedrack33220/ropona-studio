export type TrackParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    __roponaConsent?: "granted" | "denied";
  }
}

/**
 * Fire an analytics event. Events are only sent when analytics consent has
 * been granted and a Google Analytics ID is configured.
 *
 * Every CTA on the site also carries `data-track` attributes, handled by the
 * delegated listener in components/Analytics.tsx — so new buttons are tracked
 * without extra wiring.
 */
export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  if (window.__roponaConsent !== "granted") return;
  const payload = { ...params, page_path: window.location.pathname };
  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event, ...payload });
  }
}

export function trackCta(label: string, location: string) {
  track("cta_click", { cta: label, location });
}
