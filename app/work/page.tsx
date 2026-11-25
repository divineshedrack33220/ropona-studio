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
      <header className="shell pb-10 pt-28 md:pb-14 md:pt-36">
        <div className="surface-card rounded-feature p-6 md:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
              Work archive
            </span>
            <span className="h-px w-10 bg-burgundy/50" />
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
              2022 — 2026
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-8">
              <h1 className="serif text-[clamp(3rem,8vw,8.4rem)] leading-[0.92] tracking-[-0.04em] text-dark">
                All the <em className="text-burgundy">frames.</em>
              </h1>
            </Reveal>
            <Reveal delay={100} className="md:col-span-4 md:pb-3">
              <p className="max-w-sm text-sm leading-relaxed text-cocoa md:ml-auto md:text-right">
                Four selected projects across AI film, commercials, storytelling
                and editing. The full archive — including NDA work — is available
                on request.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "40+", label: "Films delivered" },
              { value: "12M+", label: "Organic views" },
              { value: "9", label: "Countries" },
              { value: "4+", label: "Years" },
            ].map((stat) => (
              <div key={stat.label} className="surface-light p-4 md:p-5">
                <p className="serif text-2xl leading-none text-burgundy">
                  {stat.value}
                </p>
                <p className="mt-2 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-cocoa">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="shell pb-20 md:pb-28">
        <h2 className="sr-only">Selected projects</h2>
        <WorkGrid projects={portfolioProjects} variant="archive" />
      </section>

      <section className="border-t border-burgundy/15">
        <div className="shell py-14 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 rounded-feature bg-burgundy p-7 text-ivory md:flex-row md:items-end md:p-10">
            <div>
              <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                Have something in mind?
              </p>
              <h2 className="serif mt-4 max-w-2xl text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[1]">
                The next frame could be{" "}
                <em className="text-champagne">yours.</em>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-champagne/85">
                {site.availability.status} · {site.availability.note}. Tell me what
                you are making and I&apos;ll tell you how I&apos;d approach it.
              </p>
            </div>
            <Link
              href="/#contact"
              className="btn btn-outline shrink-0"
              data-track="cta_click"
              data-track-label="work_archive_start"
            >
              Start a project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
