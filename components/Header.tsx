"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", href: "/#top", index: "01" },
  { label: "Projects", href: "/#work", index: "02" },
  { label: "About", href: "/#about", index: "03" },
  { label: "Experience", href: "/#experience", index: "04" },
  { label: "Contact", href: "/#contact", index: "05" },
];

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="8"
        stroke="currentColor"
        strokeOpacity="0.55"
      />
      <path
        d="M9 24V8h6.8c3.2 0 5.2 1.8 5.2 4.6 0 2.2-1.3 3.8-3.4 4.3L23 24"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="24.5" cy="8.5" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    const target = href.split("#")[1] ?? "";
    if (pathname.startsWith("/work")) return href === "/#work";
    if (pathname !== "/") return false;
    if (!target || target === "top") {
      return hash === "" || hash === "#top";
    }
    return hash === `#${target}`;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] pt-3 md:pt-5">
        <div className="shell">
          <div className="flex h-16 items-center justify-between gap-3 rounded-full border border-burgundy/30 bg-burgundy px-3 md:h-[72px] md:px-4">
            <Link
              href="/#top"
              className="group flex min-w-0 items-center gap-2.5 rounded-full px-2 py-1"
            >
              <Mark className="h-8 w-8 shrink-0 text-champagne transition-colors duration-300 group-hover:text-ivory" />
              <span className="flex min-w-0 flex-col leading-none">
                <span className="truncate font-sans text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-ivory">
                  Ropona
                </span>
                <span className="mt-1.5 hidden truncate font-sans text-[0.5rem] font-medium uppercase tracking-[0.16em] text-champagne/75 sm:block">
                  Creative Director · Filmmaker
                </span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3.5 py-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                      active
                        ? "bg-champagne text-burgundy"
                        : "text-ivory/80 hover:bg-champagne/10 hover:text-ivory"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        active ? "bg-burgundy" : "bg-champagne/60"
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <div className="hidden items-center gap-2.5 rounded-full border border-champagne/25 px-3.5 py-2 xl:flex">
                <span className="availability-dot h-1.5 w-1.5 rounded-full bg-champagne" />
                <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-champagne">
                  {site.availability.status}
                </span>
              </div>
              <Link
                href="/#contact"
                data-track="cta_click"
                data-track-label="header_start_project"
                className="btn btn-outline hidden !px-4 !py-2.5 !text-[0.58rem] sm:inline-flex"
              >
                Start a project
              </Link>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-colors hover:bg-champagne/10 lg:hidden"
              >
                <span className="relative block h-3 w-6">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-cinema",
                      open && "translate-y-[5px] rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ease-cinema",
                      open && "-translate-y-[6px] -rotate-45"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[65] overflow-y-auto bg-burgundy transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="shell flex min-h-full flex-col pb-10 pt-28 md:pt-32">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors duration-300",
                    active
                      ? "bg-champagne text-burgundy"
                      : "text-ivory hover:bg-champagne/10"
                  )}
                  style={{
                    animation: open
                      ? `floatIn 0.6s cubic-bezier(0.16,1,0.3,1) ${100 + index * 55}ms both`
                      : undefined,
                  }}
                >
                  <span
                    className={cn(
                      "font-sans text-[0.58rem] font-semibold tracking-[0.16em]",
                      active ? "text-burgundy/60" : "text-champagne/75"
                    )}
                  >
                    {item.index}
                  </span>
                  <span className="font-sans text-[clamp(1.8rem,8vw,3rem)] font-medium leading-none tracking-[-0.03em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            className="mt-10 flex flex-col gap-6 rounded-[2rem] border border-champagne/20 bg-espresso/35 p-6"
            style={{
              animation: open
                ? "floatIn 0.6s cubic-bezier(0.16,1,0.3,1) 390ms both"
                : undefined,
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-champagne/75">
                Start a conversation
              </span>
              <a
                href={`mailto:${site.email}`}
                tabIndex={open ? 0 : -1}
                className="link-line w-fit text-lg text-ivory"
              >
                {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                className="link-line w-fit text-sm text-champagne"
              >
                WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-champagne/75 hover:text-ivory"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="availability-dot h-1.5 w-1.5 rounded-full bg-champagne" />
              <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-champagne">
                {site.availability.status} — {site.availability.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
