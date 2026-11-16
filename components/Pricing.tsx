import Link from "next/link";
import { pricing } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  return (
    <section id="pricing" className="section border-t border-white/[0.08]">
      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">07</span>
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">Engagements</span>
        </div>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="serif text-[clamp(2.3rem,4.7vw,4.7rem)] leading-[0.98] tracking-[-0.025em]">
              Flexible by design. <em className="text-goldsoft">Serious</em> about outcomes.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <p className="max-w-sm text-sm leading-relaxed text-mist md:ml-auto md:text-right">
              Every project is scoped individually — no packages designed to
              upsell, no surprises. Tell me the outcome and I will quote the path.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px bg-white/10 md:mt-16 md:grid-cols-2">
          {pricing.map((model, index) => (
            <Reveal
              key={model.name}
              delay={index * 70}
              className="group relative bg-ink p-6 transition-colors duration-500 hover:bg-carbon md:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-gold">
                    {model.label}
                  </span>
                  <h3 className="serif mt-3 text-[clamp(1.7rem,2.4vw,2.4rem)] leading-none text-bone">
                    {model.name}
                  </h3>
                </div>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                  {model.detail}
                </span>
              </div>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
                {model.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5">
                {model.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-xs leading-relaxed text-mist/90"
                  >
                    <span className="mt-[0.4rem] h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/#contact"
                className="mt-7 inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 group-hover:text-goldsoft"
                data-track="cta_click"
                data-track-label={`pricing_${model.name.toLowerCase().replaceAll(" ", "_")}`}
              >
                {model.cta}
                <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-mist">
            Fixed project pricing, hourly rates, per-minute AI production,
            monthly retainers, or a combination. All quotes include a clear scope,
            timeline and revision policy.
          </p>
          <Link
            href="/#contact"
            className="btn btn-gold"
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
