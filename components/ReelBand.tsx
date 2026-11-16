"use client";

import Image from "next/image";
import { useShowreel } from "@/components/ShowreelProvider";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";

export function ReelBand() {
  const { open } = useShowreel();

  return (
    <section className="relative">
      <div className="shell">
        <Reveal className="relative overflow-hidden border border-white/[0.08] bg-carbon">
          <div className="relative aspect-[21/10] w-full md:aspect-[21/8]">
            <Image
              src="/media/work-monolith.jpg"
              alt="Still from Ropona's 2026 showreel — a monolith in a desert at dusk"
              fill
              sizes="(max-width: 1680px) 100vw, 1600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow text-bone/70">The reel</span>
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-bone/60">
                  2022 — 2026
                </span>
              </div>

              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-goldsoft">
                    {site.showreel.duration} · Sound on recommended
                  </p>
                  <h2 className="serif mt-3 max-w-[16ch] text-[clamp(2rem,4.2vw,4.2rem)] leading-[0.95] text-bone">
                    Four years, cut to <em className="text-goldsoft">one pulse.</em>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    open();
                    track("showreel_play", { location: "reel_band" });
                  }}
                  className="group flex items-center gap-4"
                  aria-label="Play the 2026 showreel"
                  data-track="showreel_play"
                  data-track-label="reel_band"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/30 bg-ink/20 text-bone backdrop-blur-md transition-all duration-500 ease-cinema group-hover:scale-105 group-hover:border-gold group-hover:text-gold md:h-20 md:w-20">
                    <svg viewBox="0 0 14 14" className="ml-0.5 h-4 w-4" fill="none" aria-hidden="true">
                      <path d="M2 1L13 7L2 13V1Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="text-left">
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone">
                      Play showreel
                    </span>
                    <span className="mt-1 block font-mono text-[0.52rem] uppercase tracking-[0.14em] text-mist">
                      Full screen · with sound
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
