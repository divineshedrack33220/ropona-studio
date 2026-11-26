"use client";

import Image from "next/image";
import Link from "next/link";
import { about, site } from "@/lib/content";
import { useShowreel } from "@/components/ShowreelProvider";
import { track } from "@/lib/analytics";
import { useVideoDuration } from "@/components/useVideoDuration";

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
      <path d="M6 1H1V6M12 1H17V6M17 12V17H12M1 12V17H6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Hero() {
  const { open } = useShowreel();
  const showreelDuration = useVideoDuration(site.showreel.src, site.showreel.duration);

  const playShowreel = (location: string, label: string) => {
    open();
    track("showreel_play", { location, label });
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-10 pt-28 md:pb-16 md:pt-36"
    >
      <div className="shell">
        <div className="grid items-stretch gap-7 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 lg:col-span-7">
            <div className="surface-card h-full rounded-feature p-7 md:p-11 lg:p-12">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <p className="eyebrow max-w-[22rem] leading-relaxed">
                  AI video editing
                  <span className="mx-2 text-burgundySoft">/</span>
                  generative filmmaking
                  <span className="mx-2 text-burgundySoft">/</span>
                  creative production
                </p>
                <p className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
                  {site.location} · available for international remote opportunities
                </p>
              </div>

              <h1 className="serif mt-10 max-w-[19ch] text-[clamp(2.5rem,5.6vw,5.6rem)] leading-[0.98] tracking-[-0.03em] text-dark md:mt-12">
                <span className="mask-line">
                  <span style={{ "--line-delay": "100ms" } as React.CSSProperties}>
                    I turn ideas
                  </span>
                </span>
                <span className="mask-line">
                  <span style={{ "--line-delay": "220ms" } as React.CSSProperties}>
                    into films, and films
                  </span>
                </span>
                <span className="mask-line">
                  <span
                    className="italic text-burgundy"
                    style={{ "--line-delay": "340ms" } as React.CSSProperties}
                  >
                    into reasons to act.
                  </span>
                </span>
              </h1>

              <div
                className="mt-9"
                style={{
                  animation: "floatIn 0.9s cubic-bezier(0.16,1,0.3,1) 560ms both",
                }}
              >
                <p className="max-w-2xl text-[0.98rem] leading-[1.8] text-cocoa md:text-lg">
                  I am Ropona Bernard, an AI video editor and creative production
                  specialist combining generative filmmaking, cinematic editing and
                  performance-led marketing. I develop films, product UGC, advertising
                  creatives and digital stories from research and concept through
                  prompting, production and final delivery.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => playShowreel("hero_cta", "hero_watch_showreel")}
                    className="btn btn-gold"
                    data-track="showreel_play"
                    data-track-label="hero_watch_showreel"
                  >
                    <PlayIcon className="h-2.5 w-2.5" />
                    Watch showreel
                  </button>
                  <Link
                    href="/#work"
                    className="btn btn-outline"
                    data-track="cta_click"
                    data-track-label="hero_view_selected_work"
                  >
                    View selected work
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="media-frame h-full min-h-[360px] md:min-h-[480px] lg:min-h-[620px]">
              <Image
                src={about.portrait}
                alt={about.portraitAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center lg:object-[center_25%]"
              />
            </div>

            <div className="absolute -top-4 right-4 rounded-full border border-burgundy/20 bg-champagneLight px-4 py-2 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy md:right-6">
              Ropona Bernard
            </div>

            <div className="absolute -bottom-5 left-4 right-4 rounded-[1.5rem] border border-champagne/25 bg-burgundy p-5 text-ivory md:-left-6 md:right-auto md:max-w-[20rem] md:p-6">
              <span className="font-sans text-[0.52rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-champagne">
                {site.role}
              </span>
              <p className="serif mt-3 text-2xl italic leading-tight text-ivory md:text-3xl">
                Every frame has a purpose.
              </p>
              <div className="mt-4 h-px w-full bg-champagne/25" />
              <p className="mt-3 font-sans text-[0.52rem] font-semibold uppercase leading-relaxed tracking-[0.12em] text-champagne/80">
                {site.availability.status} · {site.availability.note}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-[1.75rem] border border-burgundy/15 bg-champagne/55 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:mt-14 md:px-7">
          <div className="flex items-center gap-4">
            <span className="hidden h-9 w-px overflow-hidden sm:block">
              <span className="scroll-cue-line block h-full w-px" />
            </span>
            <span className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
              Scroll to explore
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => playShowreel("hero_bar", "hero_bar_showreel")}
              className="group flex items-center gap-3 text-left"
              data-track="showreel_play"
              data-track-label="hero_bar_showreel"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/30 bg-champagne text-burgundy transition-colors duration-300 group-hover:bg-burgundy group-hover:text-ivory">
                <PlayIcon className="h-2.5 w-2.5" />
              </span>
              <span className="flex flex-col">
                <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-dark">
                  {site.showreel.title}
                </span>
                <span className="font-sans text-[0.52rem] font-medium uppercase tracking-[0.12em] text-espresso">
                  {showreelDuration} · {site.showreel.note}
                </span>
              </span>
            </button>

            <span className="hidden h-5 w-px bg-burgundy/20 sm:block" />

            <button
              type="button"
              onClick={() =>
                playShowreel("hero_fullscreen", "hero_fullscreen")
              }
              aria-label="Watch showreel full screen"
              className="flex items-center gap-2 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-burgundy transition-colors hover:text-burgundySoft"
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
