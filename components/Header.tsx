"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Work", href: "/#work", index: "01" },
  { label: "About", href: "/#about", index: "02" },
  { label: "Services", href: "/#services", index: "03" },
  { label: "Process", href: "/#process", index: "04" },
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
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeOpacity="0.45"
      />
      <path
        d="M9 24V8h6.8c3.2 0 5.2 1.8 5.2 4.6 0 2.2-1.3 3.8-3.4 4.3L23 24"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="24.5" cy="8.5" r="1.6" fill="#c98f5a" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-700",
          scrolled || open
            ? "border-b border-white/[0.08] bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-6 md:h-[88px]">
          <Link href="/" className="group flex items-center gap-3">
            <Mark className="h-8 w-8 text-bone transition-colors duration-500 group-hover:text-gold" />
            <span className="flex flex-col leading-none">
              <span className="font-mono text-[0.82rem] tracking-[0.32em] text-bone">
                ROPONA
              </span>
              <span className="mt-1.5 hidden font-mono text-[0.52rem] uppercase tracking-[0.2em] text-muted sm:block">
                Creative Director · Filmmaker
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist transition-colors duration-300 hover:text-bone"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-500 ease-cinema group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2.5 border border-white/10 px-3.5 py-2 xl:flex">
              <span className="availability-dot h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-mist">
                {site.availability.status}
              </span>
            </div>
            <Link
              href="/#contact"
              data-track="cta_click"
              data-track-label="header_start_project"
              className="btn btn-gold hidden !py-3 sm:inline-flex"
            >
              Start a project
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-6 bg-bone transition-transform duration-500 ease-cinema",
                    open && "translate-y-[5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-6 bg-bone transition-transform duration-500 ease-cinema",
                    open && "-translate-y-[6px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[65] flex flex-col bg-ink transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="shell flex flex-1 flex-col justify-center pb-10 pt-28">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                tabIndex={open ? 0 : -1}
                className="group flex items-baseline gap-5 border-b border-white/[0.07] py-4"
                style={{
                  animation: open
                    ? `floatIn 0.7s cubic-bezier(0.16,1,0.3,1) ${120 + index * 60}ms both`
                    : undefined,
                }}
              >
                <span className="font-mono text-[0.6rem] text-gold">
                  {item.index}
                </span>
                <span className="serif text-[clamp(2.4rem,9vw,3.6rem)] leading-none text-bone transition-colors duration-300 group-hover:text-goldsoft">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className="mt-10 flex flex-col gap-6"
            style={{
              animation: open
                ? "floatIn 0.7s cubic-bezier(0.16,1,0.3,1) 450ms both"
                : undefined,
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="eyebrow eyebrow-gold">Start a conversation</span>
              <a
                href={`mailto:${site.email}`}
                tabIndex={open ? 0 : -1}
                className="link-line w-fit text-lg text-bone"
              >
                {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                className="link-line w-fit text-sm text-mist"
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
                  className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-mist hover:text-bone"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="availability-dot h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-mist">
                {site.availability.status} — {site.availability.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
