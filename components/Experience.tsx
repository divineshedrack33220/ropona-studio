import { about, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section id="experience" className="section border-t border-burgundy/15">
      <div className="shell">
        <Reveal className="flex items-center gap-3">
          <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
            04
          </span>
          <span className="h-px w-8 bg-burgundy/50" />
          <span className="eyebrow">Experience</span>
        </Reveal>

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <div className="surface-card h-full rounded-feature p-7 md:p-9">
              <h2 className="serif max-w-[14ch] text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] text-dark">
                Craft first. <em className="text-burgundy">Tools in service.</em>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-[1.85] text-cocoa">
                {about.credentials[1]?.value}
              </p>

              <dl className="mt-9 flex flex-col gap-6 border-l border-burgundy/25 pl-6">
                {about.credentials.map((item) => (
                  <div key={item.label}>
                    <dt className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-cocoa">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={100} className="md:col-span-7">
            <div className="surface-light h-full rounded-feature p-7 md:p-9">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-burgundy/15 pb-5">
                <h3 className="serif text-2xl text-dark md:text-3xl">Expertise</h3>
                <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                  Director · Editor · AI production
                </span>
              </div>

              <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                {about.expertise.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-burgundy/10 py-3 text-sm leading-relaxed text-cocoa"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 border-t border-burgundy/15 pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="serif text-2xl text-dark md:text-3xl">
                    Working toolkit
                  </h3>
                  <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                    {site.tools.length} tools
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {site.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-burgundy/20 bg-champagne/70 px-3 py-1.5 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-espresso"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
