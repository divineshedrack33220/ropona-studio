"use client";

import Link from "next/link";
import { site } from "@/lib/content";
import { LocalTime } from "@/components/LocalTime";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
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
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-ink">
      <div className="shell pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Ropona — back to home"
            >
              <span className="font-mono text-sm tracking-[0.32em] text-bone">
                ROPONA
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              Cinematic AI filmmaking & professional editing for brands and
              storytellers who care how it feels.
            </p>
            <div className="mt-8 flex flex-col gap-1.5">
              <a
                href={`mailto:${site.email}`}
                className="link-line w-fit text-sm text-bone"
              >
                {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="outbound_click"
                data-track-label="footer_whatsapp"
                className="link-line w-fit text-sm text-mist"
              >
                WhatsApp
              </a>
            </div>
            <p className="mt-8 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-muted">
              {site.location} · <LocalTime />
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5">Navigate</h3>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/work"
                  className="text-sm text-mist transition-colors hover:text-bone"
                >
                  All work
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5">Services</h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow mb-5">Elsewhere</h3>
            <ul className="flex flex-col gap-3">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    data-track="outbound_click"
                    data-track-label={`footer_${social.label.toLowerCase()}`}
                    className="group flex items-center justify-between gap-4 text-sm text-mist transition-colors hover:text-bone"
                  >
                    <span>{social.label}</span>
                    <span className="font-mono text-[0.56rem] tracking-[0.08em] text-muted transition-colors group-hover:text-gold">
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

        <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.08] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">
            © {new Date().getFullYear()} Ropona Benard. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">
            <Link href="/privacy" className="transition-colors hover:text-bone">
              Privacy
            </Link>
            <Link href="/credits" className="transition-colors hover:text-bone">
              Credits
            </Link>
            <a
              href="#main"
              className="transition-colors hover:text-bone"
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
