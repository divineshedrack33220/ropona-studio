"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterProps = {
  image: string;
  flat: string;
  note?: string;
  title: string;
};

export function BeforeAfter({ image, flat, note, title }: BeforeAfterProps) {
  const [value, setValue] = useState(52);

  return (
    <div>
      <div className="before-after relative aspect-[16/9] w-full select-none overflow-hidden border border-white/10 bg-carbon">
        <Image
          src={image}
          alt={`${title} — final graded frame`}
          fill
          sizes="(max-width: 1680px) 100vw, 1600px"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src={flat}
            alt={`${title} — ungraded camera plate`}
            fill
            sizes="(max-width: 1680px) 100vw, 1600px"
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 border border-white/15 bg-ink/50 px-2.5 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-bone backdrop-blur-md">
          Ungraded
        </span>
        <span className="pointer-events-none absolute right-4 top-4 border border-gold/30 bg-ink/50 px-2.5 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-goldsoft backdrop-blur-md">
          Final grade
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-bone/80"
          style={{ left: `${value}%` }}
        >
          <div className="ba-handle absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/50 bg-ink/70 text-bone backdrop-blur-md">
            <svg viewBox="0 0 20 12" fill="none" className="h-2.5 w-4" aria-hidden="true">
              <path d="M7 1L2 6L7 11M13 1L18 6L13 11" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label={`Compare ungraded and final grade for ${title}`}
          aria-valuetext={`${value}% ungraded`}
          className="absolute inset-0 z-20 h-full w-full"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
        <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-bone/60">
          Drag to compare
        </p>
      </div>
      {note && (
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">{note}</p>
      )}
    </div>
  );
}
