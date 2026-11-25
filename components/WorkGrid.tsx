"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/types";
import { categories } from "@/lib/content";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type WorkGridProps = {
  projects: Project[];
  variant?: "home" | "archive";
  showFilters?: boolean;
};

const homeSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
];

export function WorkGrid({
  projects,
  variant = "home",
  showFilters = true,
}: WorkGridProps) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.category === active);
  }, [active, projects]);

  const counts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category] =
        category === "All"
          ? projects.length
          : projects.filter((project) => project.category === category).length;
      return acc;
    }, {});
  }, [projects]);

  const availableCategories = useMemo(
    () => categories.filter((category) => counts[category] > 0),
    [counts]
  );

  return (
    <div>
      {showFilters && (
        <div className="mt-10 flex flex-wrap items-center gap-2 md:mt-14">
          {availableCategories.map((category) => {
            const count = counts[category];
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActive(category);
                  track("portfolio_filter", { filter: category });
                }}
                data-active={active === category}
                aria-pressed={active === category}
                className="filter-chip"
              >
                {category}
                <span className="ml-2 text-[0.52rem] opacity-75">{count}</span>
              </button>
            );
          })}
          <span className="ml-auto hidden font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-espresso md:inline">
            {String(filtered.length).padStart(2, "0")} projects
          </span>
        </div>
      )}

      <div
        key={active}
        className={cn(
          "mt-10 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-14 md:gap-y-20 lg:grid-cols-12",
          variant === "archive" && "lg:gap-y-24"
        )}
      >
        {filtered.map((project, index) => {
          const span =
            variant === "archive"
              ? index % 4 === 0 || index % 4 === 3
                ? "lg:col-span-7"
                : "lg:col-span-5"
              : homeSpans[index % homeSpans.length];

          return (
            <div
              key={project.slug}
              className={span}
              style={{
                animation: `floatIn 0.85s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms both`,
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 border-t border-burgundy/15 pt-10 text-sm text-espresso">
          No projects in this category yet.{" "}
          <button
            type="button"
            onClick={() => setActive("All")}
            className="link-line text-espresso"
          >
            View all work
          </button>
          .
        </p>
      )}

      {variant === "home" && (
        <div className="mt-16 flex flex-col gap-3 border-t border-burgundy/15 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-espresso">
            Selected from 40+ delivered projects
          </p>
          <Link
            href="/work"
            className="link-line font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-espresso"
            data-track="cta_click"
            data-track-label="view_all_work"
          >
            View all work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </div>
  );
}
