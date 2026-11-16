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
      <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black">
        {!playing ? (
          <>
            <Image
              src={poster}
              alt={`${title} — film still`}
              fill
              sizes="(max-width: 1680px) 100vw, 1600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/30" />
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
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-bone/30 bg-ink/20 text-bone backdrop-blur-md transition-all duration-500 ease-cinema group-hover:scale-105 group-hover:border-gold group-hover:text-gold md:h-24 md:w-24">
                  <svg viewBox="0 0 14 14" className="ml-1 h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M2 1L13 7L2 13V1Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-bone/80">
                  Play film
                </span>
              </button>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-bone/60">
                {note ?? (src ? "Silent preview · director's cut" : "Stills preview · full film available on request")}
              </span>
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-goldsoft">
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
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            Your browser does not support embedded video.
          </video>
        ) : null}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
