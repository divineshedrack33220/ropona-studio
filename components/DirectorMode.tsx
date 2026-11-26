import { directorModes } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function DirectorMode() {
  return (
    <section id="director-mode" className="section border-t border-burgundy/15">
      <div className="shell">
        <Reveal className="flex items-center gap-3">
          <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
            07
          </span>
          <span className="h-px w-8 bg-burgundy/50" />
          <span className="eyebrow">Director mode</span>
        </Reveal>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="serif text-[clamp(2.3rem,4.6vw,4.6rem)] leading-[1.02] tracking-[-0.025em] text-dark">
              The decisions behind the{" "}
              <em className="text-burgundy">final frame.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <p className="max-w-sm text-sm leading-relaxed text-espresso md:ml-auto md:text-right">
              Different formats demand different production logic. Explore how I
              research, direct, prompt, generate, edit and deliver work across
              narrative, commercial and performance-led projects.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {directorModes.map((mode, index) => (
            <Reveal
              key={mode.title}
              delay={index * 60}
              className="surface-card rounded-feature p-6 md:p-8"
            >
              <span className="font-sans text-[0.55rem] font-semibold tracking-[0.12em] text-burgundy">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="serif mt-4 text-[clamp(1.6rem,2.3vw,2.3rem)] leading-tight text-burgundy">
                {mode.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.85] text-cocoa">{mode.body}</p>
              <p className="mt-6 border-t border-burgundy/15 pt-5 font-sans text-[0.68rem] leading-relaxed text-espresso">
                <span className="font-semibold uppercase tracking-[0.12em] text-burgundy">
                  Deliverables:{" "}
                </span>
                {mode.deliverables}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
