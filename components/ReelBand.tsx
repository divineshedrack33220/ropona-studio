"use client";

import Image from "next/image";
import { useShowreel } from "@/components/ShowreelProvider";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";

export function ReelBand() {
  const { open } = useShowreel();

  return (
    <section className="shell py-4 md:py-8">
      <Reveal className="rounded-feature border border-burgundy/20 bg-burgundy p-4 text-ivory md:p-7">
        <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8">
          <div className="media-frame aspect-[16/10] border-champagne/25 md:col-span-7 md:aspect-[16/9]">
            <Image
              src="/media/work-monolith.jpg"
              alt="Still from Ropona's 2026 showreel — a monolith in a desert at dusk"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col p-2 md:col-span-5 md:p-4">
            <div className="flex items-center justify-between gap-4 border-b border-champagne/20 pb-4">
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                The reel
              </span>
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-champagne/75">
                2022 — 2026
              </span>
            </div>

            <p className="mt-6 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-champagne">
              {site.showreel.duration} · Sound on recommended
            </p>
            <h2 className="serif mt-3 max-w-[16ch] text-[clamp(2rem,4vw,4rem)] leading-[1] text-ivory">
              Four years, cut to{" "}
              <em className="text-champagne">one pulse.</em>
            </h2>

            <button
              type="button"
              onClick={() => {
                open();
                track("showreel_play", { location: "reel_band" });
              }}
              className="group mt-9 flex items-center gap-4 text-left"
              aria-label="Play showreel — full screen · with sound"
              data-track="showreel_play"
              data-track-label="reel_band"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-champagne text-burgundy transition-colors duration-300 group-hover:bg-champagneLight md:h-20 md:w-20">
                <svg viewBox="0 0 14 14" className="ml-0.5 h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M2 1L13 7L2 13V1Z" fill="currentColor" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ivory">
                  Play showreel
                </span>
                <span className="mt-1 font-sans text-[0.52rem] font-medium uppercase tracking-[0.12em] text-champagne/75">
                  Full screen · with sound
                </span>
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
