import { experience, site } from "@/lib/content";
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

        <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-5">
            <div className="surface-card h-full rounded-feature p-5 md:p-7">
              <h2 className="serif max-w-[16ch] text-[clamp(1.9rem,3.4vw,3.4rem)] leading-[1.05] text-dark">
                Creative production across{" "}
                <em className="text-burgundy">brands, industries and formats.</em>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-[1.85] text-cocoa">
                My experience spans commercial marketing, technical communication,
                property promotion and long-form digital storytelling.
              </p>

              <dl className="mt-7 flex flex-col gap-5 border-l border-burgundy/25 pl-5">
                {experience.map((item) => (
                  <div key={`${item.organization}-${item.role}`}>
                    <dt className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                      {item.organization}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-cocoa">
                      <span className="font-medium text-espresso">{item.role}</span>
                      {item.meta && (
                        <span className="mt-1 block font-sans text-[0.52rem] uppercase tracking-[0.1em] text-cocoa">
                          {item.meta}
                        </span>
                      )}
                      <span className="mt-2 block">{item.description}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={100} className="md:col-span-7">
            <div className="surface-light h-full rounded-feature p-5 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-burgundy/15 pb-5">
                <h3 className="serif text-2xl text-dark md:text-3xl">
                  Capabilities
                </h3>
                <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                  Concept to finished production
                </span>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-[1.85] text-cocoa">
                A connected production skill set combining generative technology,
                editorial craft and audience-focused creative thinking. I can
                contribute across the full workflow or integrate into an established
                production team.
              </p>

              <div className="mt-7 border-t border-burgundy/15 pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="serif text-2xl text-dark md:text-3xl">
                    Working toolkit
                  </h3>
                  <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                    By production function
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-5">
                  {site.toolGroups.map((group) => (
                    <div key={group.label}>
                      <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                        {group.label}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {group.items.map((tool) => (
                          <li
                            key={`${group.label}-${tool}`}
                            className="rounded-full border border-burgundy/20 bg-champagne/70 px-3 py-1.5 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-espresso"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
