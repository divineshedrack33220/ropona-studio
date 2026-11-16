import type { Metadata } from "next";
import Link from "next/link";
import { WorkGrid } from "@/components/WorkGrid";
import { Reveal } from "@/components/Reveal";
import { portfolioProjects, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — AI films, commercials & edits",
  description:
    "Selected work by Ropona Benard: AI films, commercials, brand films, storytelling and cinematic editing for clients including TaskGo, Optimaviz, Cre8hive, WayBackHistory and PathForge.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="shell pb-10 pt-32 md:pb-14 md:pt-40">
        <div className="flex items-center gap-3">
          <span className="eyebrow eyebrow-gold">Work archive</span>
          <span className="h-px w-10 bg-gold/50" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
            2022 — 2026
          </span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <h1 className="serif text-[clamp(3rem,8vw,8.4rem)] leading-[0.88] tracking-[-0.04em]">
              All the <em className="text-goldsoft">frames.</em>
            </h1>
          </Reveal>
          <Reveal delay={100} className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-sm leading-relaxed text-mist md:ml-auto md:text-right">
              Four selected projects across AI film, commercials, storytelling
              and editing. The full archive — including NDA work — is available
              on request.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px border-y border-white/10 bg-white/10 sm:grid-cols-4">
          {[
            { value: "40+", label: "Films delivered" },
            { value: "12M+", label: "Organic views" },
            { value: "9", label: "Countries" },
            { value: "4+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="bg-ink px-4 py-5">
              <p className="serif text-2xl text-bone">{stat.value}</p>
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </header>

      <section className="shell pb-20 md:pb-28">
        <h2 className="sr-only">Selected projects</h2>
        <WorkGrid projects={portfolioProjects} variant="archive" />
      </section>

      <section className="border-t border-white/10 bg-coal">
        <div className="shell flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-end md:py-20">
          <div>
            <p className="eyebrow eyebrow-gold">Have something in mind?</p>
            <h2 className="serif mt-4 max-w-2xl text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[0.98]">
              The next frame could be <em className="text-goldsoft">yours.</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
              {site.availability.status} · {site.availability.note}. Tell me what
              you are making and I&apos;ll tell you how I&apos;d approach it.
            </p>
          </div>
          <Link
            href="/#contact"
            className="btn btn-gold"
            data-track="cta_click"
            data-track-label="work_archive_start"
          >
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
