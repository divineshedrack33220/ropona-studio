"use client";

import Image from "next/image";
import { useShowreel } from "@/components/ShowreelProvider";
import { useVideoDuration } from "@/components/useVideoDuration";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";

export function ReelBand() {
  const { open } = useShowreel();
  const duration = useVideoDuration(site.showreel.src, site.showreel.duration);

  return (
    <section className="shell py-3 md:py-6">
      <Reveal className="rounded-panel border border-burgundy/20 bg-burgundy p-3 text-ivory md:p-5">
        <div className="grid gap-5 md:grid-cols-12 md:items-center md:gap-7">
          <div className="mx-auto w-full max-w-[18rem] md:col-span-4">
            <div className="media-frame aspect-ig-reel border-champagne/25">
              <Image
                src={site.showreel.poster}
                alt="Frame from Ropona Bernard's showreel"
                fill
                sizes="(max-width: 768px) 90vw, 18rem"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col p-1 md:col-span-8 md:p-3">
            <div className="flex items-center justify-between gap-4 border-b border-champagne/20 pb-4">
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                {site.showreel.title}
              </span>
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-champagne/75">
                {duration}
              </span>
            </div>

            <p className="mt-5 font-sans text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-champagne">
              {site.showreel.tagline}
            </p>
            <h2 className="serif mt-2 max-w-[18ch] text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.05] text-ivory">
              A cross-section of my{" "}
              <em className="text-champagne">creative work.</em>
            </h2>
            <p className="mt-4 max-w-sm text-[0.85rem] leading-relaxed text-champagne/85">
              From cinematic AI sequences and commercial visuals to technical
              explainers and documentary storytelling, this reel brings together
              the range of my production practice.
            </p>

            <button
              type="button"
              onClick={() => {
                open();
                track("showreel_play", { location: "reel_band" });
              }}
              className="group mt-6 flex items-center gap-3 text-left"
              aria-label={`Play ${site.showreel.title}`}
              data-track="showreel_play"
              data-track-label="reel_band"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-champagne text-burgundy transition-colors duration-300 group-hover:bg-champagne md:h-16 md:w-16">
                <svg viewBox="0 0 14 14" className="ml-0.5 h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M2 1L13 7L2 13V1Z" fill="currentColor" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ivory">
                  Play showreel
                </span>
                <span className="mt-1 font-sans text-[0.52rem] font-medium uppercase tracking-[0.12em] text-champagne/75">
                  {site.showreel.note}
                </span>
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
