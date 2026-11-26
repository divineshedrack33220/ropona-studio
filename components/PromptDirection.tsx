import { prompt } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function PromptDirection() {
  return (
    <section
      id="prompt-direction"
      className="section border-t border-burgundy/15 bg-champagne/35"
    >
      <div className="shell grid gap-7 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
              08
            </span>
            <span className="h-px w-8 bg-burgundy/50" />
            <span className="eyebrow">Prompt direction</span>
          </div>
          <h2 className="serif mt-5 text-[clamp(1.9rem,3.4vw,3.4rem)] leading-[1.05] text-dark">
            {prompt.headline}
          </h2>
        </Reveal>

        <div className="md:col-span-8">
          <Reveal delay={80} className="surface-card rounded-feature p-5 md:p-7">
            <p className="text-[0.98rem] leading-[1.9] text-cocoa">{prompt.intro}</p>
            <p className="mt-6 text-[0.98rem] leading-[1.9] text-cocoa">
              {prompt.process}
            </p>
          </Reveal>

          <Reveal delay={140} className="surface-light mt-4 rounded-feature p-5 md:p-7">
            <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
              {prompt.exampleLabel}
            </p>
            <p className="serif mt-4 text-xl leading-[1.55] text-dark md:text-2xl">
              “{prompt.example}”
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {prompt.deliverables.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 rounded-full border border-burgundy/20 bg-champagne/70 px-3.5 py-2.5"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy"
                />
                <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-espresso">
                  {item}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
