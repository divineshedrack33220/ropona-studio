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
      <div className="before-after media-frame relative mx-auto aspect-ig-square w-full max-w-2xl select-none">
        <Image
          src={image}
          alt={`${title} — final graded frame`}
          fill
          sizes="(max-width: 768px) 100vw, 48rem"
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
            sizes="(max-width: 768px) 100vw, 48rem"
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-espresso/85 px-3 py-2 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-champagne">
          Ungraded
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-burgundy px-3 py-2 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-champagne">
          Final grade
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-ivory/85"
          style={{ left: `${value}%` }}
        >
          <div className="ba-handle absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/50 bg-burgundy text-ivory">
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

        <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-espresso/80 px-3 py-2 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-champagne">
          Drag to compare
        </span>
      </div>
      {note && (
        <p className="mt-4 max-w-2xl font-sans text-xs leading-relaxed text-espresso">
          {note}
        </p>
      )}
    </div>
  );
}
