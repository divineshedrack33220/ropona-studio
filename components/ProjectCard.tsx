"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { useShowreel } from "@/components/ShowreelProvider";

type ProjectCardProps = {
  project: Project;
  index: number;
  className?: string;
  priority?: boolean;
};

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 1L11 6L2 11V1Z" fill="currentColor" />
    </svg>
  );
}

export function ProjectCard({
  project,
  index,
  className = "",
  priority = false,
}: ProjectCardProps) {
  const { openFilm } = useShowreel();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPreview = Boolean(project.preview);

  const playFilm = () => {
    if (!project.preview) return;
    openFilm({
      src: project.preview,
      poster: project.thumbnail,
      title: project.title,
      subtitle: project.filmTitle,
      note: `${project.year} · ${project.category} · Directed & edited by Ropona Benard`,
    });
  };

  return (
    <div
      className={`project-card group relative block w-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      data-track="film_play"
      data-track-label={project.slug}
    >
      <div className="relative aspect-[16/10] overflow-hidden border border-white/[0.08] bg-carbon">
        <Image
          src={project.thumbnail}
          alt={`${project.title} — ${project.filmTitle}, ${project.category.toLowerCase()} project still`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 55vw"
          className={`object-cover ${
            hasPreview ? "" : "transition-transform duration-700 ease-cinema group-hover:scale-[1.03]"
          }`}
        />
        {hovered && project.preview && (
          <video
            ref={videoRef}
            className="project-media absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 [&.ready]:opacity-100"
            src={project.preview}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-hidden="true"
            onCanPlay={(event) => {
              const video = event.currentTarget;
              video.classList.add("ready");
              video.play().catch(() => undefined);
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/5 to-ink/20 opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5">
          <span className="border border-white/15 bg-ink/35 px-2.5 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-bone backdrop-blur-md">
            {project.category}
          </span>
          <span className="font-mono text-[0.56rem] tracking-[0.16em] text-bone/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
          <span className="flex translate-y-2 items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-bone opacity-0 transition-all duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/60 text-gold">
              <PlayGlyph className="h-2 w-2" />
            </span>
            Play film
          </span>
          <span className="flex items-center gap-2 border border-white/15 bg-ink/40 px-2.5 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-goldsoft backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-gold" />
            {project.outcome}
          </span>
        </div>

        {hovered && project.preview && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/25 backdrop-blur-sm">
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-bone" fill="none" aria-hidden="true">
              <path d="M2 1L11 6L2 11V1Z" fill="currentColor" />
            </svg>
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-12 items-start gap-4">
        <div className="col-span-8">
          <div className="flex items-baseline gap-3">
            <h3 className="serif text-[clamp(1.65rem,2.3vw,2.4rem)] leading-none text-bone transition-colors duration-500 group-hover:text-goldsoft">
              {project.title}
            </h3>
            <span className="hidden font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted sm:inline">
              {project.year}
            </span>
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
            {project.description}
          </p>
        </div>
        <div className="col-span-4 flex justify-end pt-1">
          <span className="flex items-center gap-1.5 text-right font-mono text-[0.55rem] uppercase tracking-[0.14em] text-mist transition-colors duration-500 group-hover:text-goldsoft">
            {project.filmTitle}
            <PlayGlyph className="h-2.5 w-2.5 text-gold/80" />
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={playFilm}
        aria-label={
          hasPreview
            ? `Play ${project.title} — ${project.filmTitle}`
            : `${project.title} — ${project.filmTitle}`
        }
        className="absolute inset-0 z-20 cursor-pointer rounded-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      />
    </div>
  );
}
