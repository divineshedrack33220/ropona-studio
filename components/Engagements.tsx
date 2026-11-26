import Link from "next/link";
import { engagements } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Engagements() {
  return (
    <section id="engagements" className="section border-t border-burgundy/15">
      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
            09
          </span>
          <span className="h-px w-8 bg-burgundy/50" />
          <span className="eyebrow">Opportunities</span>
        </div>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="serif text-[clamp(2.3rem,4.7vw,4.7rem)] leading-[1.02] tracking-[-0.025em] text-dark">
              Ready to contribute to{" "}
              <em className="text-burgundy">ambitious creative teams.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <p className="max-w-sm text-sm leading-relaxed text-espresso md:ml-auto md:text-right">
              I am open to opportunities that bring together storytelling, creative
              technology and professional video production. Whether contributing to
              an in-house team, collaborating with an agency or delivering a defined
              production, I bring a flexible, audience-aware approach to the work.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {engagements.map((engagement, index) => (
            <Reveal
              key={engagement.name}
              delay={index * 70}
              className="surface-card group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-champagneLight md:p-9"
            >
              <span className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                {engagement.label}
              </span>
              <h3 className="serif mt-3 text-[clamp(1.7rem,2.4vw,2.4rem)] leading-none text-burgundy">
                {engagement.name}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-cocoa">
                {engagement.description}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-burgundy/15 pt-5">
                {engagement.includes.map((item) => (
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
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
                <span className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-cocoa">
                  {engagement.detail}
                </span>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-burgundy transition-colors duration-300 group-hover:text-burgundySoft"
                  data-track="cta_click"
                  data-track-label={`engagement_${engagement.name.toLowerCase().replaceAll(" ", "_")}`}
                >
                  {engagement.cta}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
