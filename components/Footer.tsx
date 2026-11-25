"use client";

import Link from "next/link";
import { site } from "@/lib/content";
import { LocalTime } from "@/components/LocalTime";

const nav = [
  { label: "Home", href: "/#top" },
  { label: "Projects", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

const serviceLinks = [
  { label: "AI Film Production", href: "/#services" },
  { label: "AI Commercials", href: "/#services" },
  { label: "Cinematic Editing", href: "/#services" },
  { label: "Creative Direction", href: "/#services" },
];

export function Footer() {
  return (
    <footer className="border-t border-champagne/15 bg-espresso text-ivory">
      <div className="shell pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Ropona — back to home"
            >
              <span className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-ivory">
                Ropona
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-champagne"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-champagne/80">
              Cinematic AI filmmaking & professional editing for brands and
              storytellers who care how it feels.
            </p>
            <div className="mt-8 flex flex-col gap-1.5">
              <a
                href={`mailto:${site.email}`}
                className="link-line w-fit text-sm text-ivory"
              >
                {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="outbound_click"
                data-track-label="footer_whatsapp"
                className="link-line w-fit text-sm text-champagne/80"
              >
                WhatsApp
              </a>
            </div>
            <p className="mt-8 font-sans text-[0.58rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-champagne/70">
              {site.location} · <LocalTime />
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-champagne">
              Navigate
            </h3>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-champagne/80 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/work"
                  className="text-sm text-champagne/80 transition-colors hover:text-ivory"
                >
                  All work
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-champagne">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-champagne/80 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-champagne">
              Elsewhere
            </h3>
            <ul className="flex flex-col gap-3">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    data-track="outbound_click"
                    data-track-label={`footer_${social.label.toLowerCase()}`}
                    className="group flex items-center justify-between gap-4 text-sm text-champagne/80 transition-colors hover:text-ivory"
                  >
                    <span>{social.label}</span>
                    <span className="font-sans text-[0.56rem] font-medium tracking-[0.08em] text-champagne/70 transition-colors group-hover:text-champagne">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <Link
            href="/"
            aria-label="Ropona Benard — home"
            className="text-outline serif block whitespace-nowrap text-[clamp(2.5rem,17.5vw,18rem)] leading-[0.78] tracking-[-0.04em]"
          >
            Ropona Benard
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-champagne/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-champagne/70">
            © {new Date().getFullYear()} Ropona Benard. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-champagne/70">
            <Link href="/privacy" className="transition-colors hover:text-ivory">
              Privacy
            </Link>
            <Link href="/credits" className="transition-colors hover:text-ivory">
              Credits
            </Link>
            <a
              href="#main"
              className="transition-colors hover:text-ivory"
              data-track="back_to_top"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
