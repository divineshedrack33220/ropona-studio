"use client";

import Image from "next/image";
import { useState } from "react";
import { track } from "@/lib/analytics";

type FilmPlayerProps = {
  src?: string;
  poster: string;
  title: string;
  caption?: string;
  note?: string;
};

export function FilmPlayer({ src, poster, title, caption, note }: FilmPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <div className="media-frame relative mx-auto aspect-ig-square w-full max-w-2xl">
        {!playing ? (
          <>
            <Image
              src={poster}
              alt={`${title} — film still`}
              fill
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-espresso/35" />
            {src && (
              <button
                type="button"
                onClick={() => {
                  setPlaying(true);
                  track("video_play", { video: title, location: "project_film" });
                }}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-5"
                aria-label={`Play ${title}`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-ivory transition-colors duration-300 group-hover:bg-burgundySoft md:h-20 md:w-20">
                  <svg viewBox="0 0 14 14" className="ml-1 h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M2 1L13 7L2 13V1Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="rounded-full bg-champagne px-4 py-2 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                  Play film
                </span>
              </button>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
              <span className="rounded-full bg-espresso/80 px-3 py-2 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-champagne">
                {note ?? (src ? "Silent preview · director's cut" : "Stills preview · full film available on request")}
              </span>
              <span className="rounded-full bg-burgundy px-3 py-2 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-champagne">
                {title}
              </span>
            </div>
          </>
        ) : src ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="h-full w-full bg-burgundy object-contain"
          >
            Your browser does not support embedded video.
          </video>
        ) : null}
      </div>
      {caption && (
        <figcaption className="mt-3 font-sans text-[0.54rem] font-medium uppercase tracking-[0.12em] text-espresso">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
