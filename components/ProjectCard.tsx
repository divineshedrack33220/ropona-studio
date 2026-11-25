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
      className={`project-card group relative block w-full rounded-feature border border-burgundy/15 bg-champagne p-4 transition-colors duration-500 hover:border-burgundy/35 md:p-5 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      data-track="film_play"
      data-track-label={project.slug}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] border border-burgundy/15 bg-champagneLight">
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

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-espresso/30 transition-opacity duration-500 group-hover:bg-espresso/20"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-5">
          <span className="rounded-full bg-champagne px-3 py-1.5 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
            {project.category}
          </span>
          <span className="font-sans text-[0.56rem] font-semibold tracking-[0.14em] text-ivory">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
          <span className="flex translate-y-2 items-center gap-2 rounded-full bg-burgundy px-3 py-2 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-ivory opacity-0 transition-all duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne text-burgundy">
              <PlayGlyph className="h-2 w-2" />
            </span>
            Play film
          </span>
          <span className="flex items-center gap-2 rounded-full bg-espresso/85 px-3 py-2 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-champagne">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
            {project.outcome}
          </span>
        </div>

        {hovered && project.preview && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/60 bg-espresso/60 text-ivory"
          >
            <PlayGlyph className="h-3 w-3" />
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-12 items-start gap-4 px-1 pb-1 md:px-2 md:pb-2">
        <div className="col-span-9">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="serif text-[clamp(1.65rem,2.3vw,2.4rem)] leading-none text-burgundy transition-colors duration-500 group-hover:text-burgundySoft">
              {project.title}
            </h3>
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
              {project.year}
            </span>
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-cocoa">
            {project.description}
          </p>

          {project.tags && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-burgundy/20 bg-champagneLight/70 px-2.5 py-1 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-cocoa"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-3 flex justify-end pt-1">
          <span className="flex items-center gap-1.5 text-right font-sans text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-cocoa transition-colors duration-500 group-hover:text-burgundy">
            <span className="hidden sm:inline">{project.filmTitle}</span>
            <PlayGlyph className="project-arrow h-2.5 w-2.5 text-burgundy" />
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
        className="absolute inset-0 z-20 cursor-pointer rounded-feature focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
      />
    </div>
  );
}
