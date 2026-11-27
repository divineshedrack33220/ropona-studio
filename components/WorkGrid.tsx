"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/types";
import { categories } from "@/lib/content";
import { track } from "@/lib/analytics";

type WorkGridProps = {
  projects: Project[];
  variant?: "home" | "archive";
  showFilters?: boolean;
};

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

  const hasFeatured = variant === "home" && active === "All";
  const featured = hasFeatured ? filtered[0] : undefined;
  const remaining = hasFeatured ? filtered.slice(1) : filtered;

  const animation = (index: number) => ({
    animation: `floatIn 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms both`,
  });

  return (
    <div>
      {showFilters && (
        <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8">
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

      {featured && (
        <div className="mt-6 md:mt-8" style={animation(0)}>
          <ProjectCard project={featured} index={0} priority featured />
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 ${
          featured ? "mt-5" : "mt-6 md:mt-8"
        } ${featured ? "" : "lg:grid-cols-3"}`}
      >
        {remaining.map((project, index) => (
          <div key={project.slug} style={animation(featured ? index + 1 : index)}>
            <ProjectCard
              project={project}
              index={featured ? index + 1 : index}
              priority={!featured && index === 0}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 border-t border-burgundy/15 pt-6 text-sm text-espresso">
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
    </div>
  );
}
