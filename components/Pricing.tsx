import Link from "next/link";
import { pricing } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  return (
    <section id="pricing" className="section border-t border-burgundy/15">
      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
            08
          </span>
          <span className="h-px w-8 bg-burgundy/50" />
          <span className="eyebrow">Engagements</span>
        </div>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="serif text-[clamp(2.3rem,4.7vw,4.7rem)] leading-[1.02] tracking-[-0.025em] text-dark">
              Flexible by design. <em className="text-burgundy">Serious</em> about
              outcomes.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <p className="max-w-sm text-sm leading-relaxed text-espresso md:ml-auto md:text-right">
              Every project is scoped individually — no packages designed to
              upsell, no surprises. Tell me the outcome and I will quote the path.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {pricing.map((model, index) => (
            <Reveal
              key={model.name}
              delay={index * 70}
              className="surface-card group p-6 transition-colors duration-500 hover:bg-champagneLight md:p-9"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                    {model.label}
                  </span>
                  <h3 className="serif mt-3 text-[clamp(1.7rem,2.4vw,2.4rem)] leading-none text-burgundy">
                    {model.name}
                  </h3>
                </div>
                <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-cocoa">
                  {model.detail}
                </span>
              </div>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-cocoa">
                {model.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-burgundy/15 pt-5">
                {model.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-xs leading-relaxed text-cocoa"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/#contact"
                className="mt-7 inline-flex items-center gap-2 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-burgundy transition-colors duration-300 group-hover:text-burgundySoft"
                data-track="cta_click"
                data-track-label={`pricing_${model.name.toLowerCase().replaceAll(" ", "_")}`}
              >
                {model.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-burgundy/15 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-espresso">
            Fixed project pricing, hourly rates, per-minute AI production,
            monthly retainers, or a combination. All quotes include a clear scope,
            timeline and revision policy.
          </p>
          <Link
            href="/#contact"
            className="btn btn-gold shrink-0"
            data-track="cta_click"
            data-track-label="pricing_request_quote"
          >
            Request a project quote <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
