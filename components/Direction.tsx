import Link from "next/link";
import { directorModes, engagements, prompt } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Direction() {
  return (
    <section
      id="direction"
      className="section-compact border-t border-burgundy/15"
    >
      <div className="shell">
        <Reveal className="flex items-center gap-3">
          <span className="eyebrow">Direction &amp; opportunities</span>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div id="director-mode" className="lg:col-span-5">
            <Reveal>
              <h2 className="serif max-w-xl text-[clamp(1.9rem,3.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-dark">
                The decisions behind the final frame.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 max-w-lg text-[0.95rem] leading-[1.8] text-cocoa">
                Different formats demand different production logic. I research,
                direct, prompt, generate, edit and deliver across narrative,
                commercial and performance-led projects.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {directorModes.map((mode) => (
                  <li
                    key={mode.title}
                    className="surface-light rounded-card px-3 py-2.5 text-[0.78rem] leading-snug text-cocoa"
                  >
                    <span className="font-semibold text-burgundy">
                      {mode.title}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            <div
              id="prompt-direction"
              className="surface-card rounded-card p-5 md:p-6"
            >
              <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                Prompt direction
              </p>
              <h3 className="serif mt-3 text-[clamp(1.4rem,2.2vw,2.2rem)] leading-tight text-dark">
                {prompt.headline}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-cocoa">
                {prompt.intro}
              </p>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-cocoa">
                {prompt.process}
              </p>
              <p className="mt-4 border-t border-burgundy/15 pt-3 text-[0.82rem] leading-relaxed text-espresso">
                <span className="font-semibold text-burgundy">
                  Prompt example:{" "}
                </span>
                “{prompt.example}”
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {prompt.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-burgundy/20 bg-champagne px-2.5 py-1 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-espresso"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="engagements"
              className="surface-light rounded-card p-5 md:p-6"
            >
              <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                Opportunities
              </p>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {engagements.map((engagement) => (
                  <div key={engagement.name}>
                    <p className="font-sans text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                      {engagement.label}
                    </p>
                    <h4 className="serif mt-1.5 text-lg leading-tight text-dark">
                      {engagement.name}
                    </h4>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-cocoa">
                      {engagement.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-burgundy/15 pt-3">
                <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-cocoa">
                  Roles · collaborations · defined projects
                </p>
                <Link
                  href="/#contact"
                  className="link-line font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-burgundy"
                  data-track="cta_click"
                  data-track-label="direction_discuss_opportunity"
                >
                  Discuss an opportunity <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
