"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { useShowreel } from "@/components/ShowreelProvider";

type ProjectCardProps = {
  project: Project;
  index: number;
  className?: string;
  priority?: boolean;
  featured?: boolean;
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
  featured = false,
}: ProjectCardProps) {
  const { openFilm } = useShowreel();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPreview = Boolean(project.preview);
  const clientLabel =
    project.client === "Confidential" ? "Anonymised sample" : project.client;

  const playFilm = () => {
    if (!project.preview) return;
    openFilm({
      src: project.preview,
      poster: project.thumbnail,
      title: project.title,
      subtitle: project.role,
      note: `${project.year} · ${project.category} · Production & edit by Ropona Bernard`,
    });
  };

  return (
    <div
      className={`project-card group relative block w-full rounded-card border border-burgundy/15 bg-champagne p-3 transition-colors duration-500 hover:border-burgundy/35 md:p-4 ${
        featured
          ? "md:grid md:grid-cols-[minmax(0,22rem)_1fr] md:items-center md:gap-5 md:p-5"
          : ""
      } ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-panel border border-burgundy/15 bg-champagneLight ${
          featured
            ? "mx-auto aspect-ig-post w-full max-w-[26rem] md:max-w-none"
            : "aspect-ig-square"
        }`}
      >
        <Image
          src={project.thumbnail}
          alt={`${project.title} — ${project.category.toLowerCase()} still by Ropona Bernard`}
          fill
          priority={priority}
          sizes={
            featured
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 60vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className={`object-cover ${
            hasPreview
              ? ""
              : "transition-transform duration-700 ease-cinema group-hover:scale-[1.03]"
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

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="rounded-full bg-champagne px-2.5 py-1 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-burgundy">
            {project.category}
          </span>
          <span className="font-sans text-[0.52rem] font-semibold tracking-[0.12em] text-ivory">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          {hasPreview && (
            <span className="flex translate-y-2 items-center gap-1.5 rounded-full bg-burgundy px-2.5 py-1.5 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-ivory opacity-0 transition-all duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne text-burgundy">
                <PlayGlyph className="h-2 w-2" />
              </span>
              Play film
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded-full bg-espresso/85 px-2.5 py-1.5 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-champagne">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-champagne" />
            {clientLabel}
          </span>
        </div>

        {hovered && hasPreview && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/60 bg-espresso/60 text-ivory"
          >
            <PlayGlyph className="h-3 w-3" />
          </span>
        )}

        {hasPreview && (
          <button
            type="button"
            onClick={playFilm}
            aria-label={`Play film: ${project.title}`}
            data-track="film_play"
            data-track-label={project.slug}
            className="absolute inset-0 z-20 cursor-pointer rounded-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
          />
        )}
      </div>

      <div
        className={`grid grid-cols-12 items-start gap-3 px-1 pb-1 ${
          featured ? "mt-4 md:mt-0" : "mt-4"
        }`}
      >
        <div className="col-span-9">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3
              className={`serif leading-none text-burgundy transition-colors duration-500 group-hover:text-burgundySoft ${
                featured
                  ? "text-[clamp(1.6rem,2.6vw,2.4rem)]"
                  : "text-[clamp(1.35rem,2vw,1.8rem)]"
              }`}
            >
              <Link
                href={`/work/${project.slug}`}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
              >
                {project.title}
              </Link>
            </h3>
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
              {project.year}
            </span>
          </div>
          <p className="mt-1.5 max-w-md text-[0.95rem] leading-relaxed text-cocoa">
            {project.description}
          </p>

          {project.tags && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-burgundy/20 bg-champagneLight/70 px-2 py-1 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.09em] text-cocoa"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-3 flex justify-end pt-1">
          <Link
            href={`/work/${project.slug}`}
            className="flex items-center gap-1.5 text-right font-sans text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-cocoa transition-colors duration-500 group-hover:text-burgundy"
          >
            <span className="hidden sm:inline">Case study</span>
            <PlayGlyph className="project-arrow h-2.5 w-2.5 text-burgundy" />
          </Link>
        </div>
      </div>
    </div>
  );
}
