"use client";

import Image from "next/image";
import Link from "next/link";
import { about, site } from "@/lib/content";
import { useShowreel } from "@/components/ShowreelProvider";
import { track } from "@/lib/analytics";

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 1.5L14 8L3 14.5V1.5Z" fill="currentColor" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M6 1H1V6M12 1H17V6M17 12V17H12M1 12V17H6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Hero() {
  const { open } = useShowreel();

  return (
    <section className="relative flex min-h-[680px] flex-col justify-end overflow-hidden pb-0 pt-24 h-[100svh]">
      <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[44%] xl:w-[45%]">
        <Image
          src={about.portrait}
          alt={about.portraitAlt}
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-center lg:object-[center_28%]"
        />
      </div>

      {/* Cinematic grade: keeps the portrait readable without flattening it */}
      {/* Mobile: bottom-weighted so the headline sits on ink */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/10 lg:hidden" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink/80 via-ink/20 to-transparent lg:hidden" />

      {/* Desktop: solid ink on the left, portrait kept clear on the right */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#08080a_0%,#08080a_42%,rgba(8,8,10,0.9)_49%,rgba(8,8,10,0.5)_56%,rgba(8,8,10,0.08)_66%,transparent_76%)] lg:block" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_top,#08080a_0%,rgba(8,8,10,0.75)_8%,rgba(8,8,10,0.15)_24%,transparent_42%)] lg:block" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_bottom,rgba(8,8,10,0.6)_0%,rgba(8,8,10,0.08)_14%,transparent_28%)] lg:block" />

      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_35%,transparent_0%,rgba(8,8,10,0.12)_60%,rgba(8,8,10,0.5)_100%)]" />

      <div className="shell relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-6 pt-6 md:pt-10">
          <p className="eyebrow max-w-[15rem] leading-relaxed">
            Independent creative director
            <span className="mx-2 text-gold">/</span>
            AI filmmaker
          </p>
          <p className="hidden font-mono text-[0.58rem] uppercase tracking-[0.18em] text-mist lg:block">
            {site.location} — worldwide
          </p>
        </div>

        <div className="mt-auto pb-8 md:pb-10">
          <h1 className="serif max-w-[15ch] text-[clamp(2.85rem,7.1vw,7.3rem)] leading-[0.92] tracking-[-0.025em] text-bone">
            <span className="mask-line">
              <span style={{ "--line-delay": "120ms" } as React.CSSProperties}>
                Cinematic AI
              </span>
            </span>
            <span className="mask-line">
              <span style={{ "--line-delay": "260ms" } as React.CSSProperties}>
                filmmaking <em className="text-goldsoft">&amp;</em>
              </span>
            </span>
            <span className="mask-line">
              <span
                className="italic text-goldsoft"
                style={{ "--line-delay": "400ms" } as React.CSSProperties}
              >
                professional editing.
              </span>
            </span>
          </h1>

          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
            <div
              className="md:col-span-6 lg:col-span-7"
              style={{ animation: "floatIn 1s cubic-bezier(0.16,1,0.3,1) 650ms both" }}
            >
              <p className="max-w-md text-[0.98rem] leading-relaxed text-mist md:text-lg">
                I turn ideas into visually compelling stories — from concept to
                final cut, with the taste of a director and the discipline of an
                editor.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    open();
                    track("showreel_play", { location: "hero_cta" });
                  }}
                  className="btn btn-gold"
                  data-track="showreel_play"
                  data-track-label="hero_view_showreel"
                >
                  <PlayIcon className="h-2.5 w-2.5" />
                  View showreel
                </button>
                <Link
                  href="/#contact"
                  className="btn btn-outline"
                  data-track="cta_click"
                  data-track-label="hero_start_project"
                >
                  Start a project
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="mt-8 hidden lg:block">
                <p className="eyebrow mb-3">Selected clients</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {site.clients.slice(0, 4).map((client) => (
                    <li key={client.name} className="text-sm text-mist/90">
                      {client.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="hidden md:col-span-4 md:col-start-9 md:block lg:hidden"
              style={{ animation: "floatIn 1s cubic-bezier(0.16,1,0.3,1) 800ms both" }}
            >
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-muted">
                Selected clients
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {site.clients.slice(0, 4).map((client) => (
                  <li key={client.name} className="text-sm text-mist/90">
                    {client.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-4 md:py-5">
          <div className="flex items-center gap-4">
            <span className="hidden h-10 w-px overflow-hidden bg-white/20 sm:block">
              <span className="scroll-cue-line block h-full w-px bg-gold" />
            </span>
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-mist">
              Scroll to explore
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => {
                open();
                track("showreel_play", { location: "hero_bar" });
              }}
              className="group flex items-center gap-3 text-left"
              data-track="showreel_play"
              data-track-label="hero_bar_showreel"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-bone transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                <PlayIcon className="h-2 w-2" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-bone">
                  {site.showreel.title}
                </span>
                <span className="font-mono text-[0.52rem] tracking-[0.12em] text-muted">
                  {site.showreel.duration} · {site.showreel.note}
                </span>
              </span>
            </button>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <button
              type="button"
              onClick={() => {
                open();
                track("showreel_play", { location: "hero_fullscreen" });
              }}
              aria-label="Watch showreel full screen"
              className="flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-mist transition-colors hover:text-bone"
            >
              <FullscreenIcon />
              <span className="hidden sm:inline">Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
