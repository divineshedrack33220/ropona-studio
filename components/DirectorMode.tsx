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

        <div className="mt-5 grid gap-5 md:mt-6 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="serif text-[clamp(2rem,3.8vw,3.8rem)] leading-[1.05] tracking-[-0.025em] text-dark">
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

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {directorModes.map((mode, index) => (
            <Reveal
              key={mode.title}
              delay={index * 60}
              className="surface-card rounded-feature p-5 md:p-6"
            >
              <span className="font-sans text-[0.55rem] font-semibold tracking-[0.12em] text-burgundy">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="serif mt-3 text-[clamp(1.4rem,2vw,2rem)] leading-tight text-burgundy">
                {mode.title}
              </h3>
              <p className="mt-3 text-[0.85rem] leading-[1.8] text-cocoa">{mode.body}</p>
              <p className="mt-5 border-t border-burgundy/15 pt-4 font-sans text-[0.62rem] leading-relaxed text-espresso">
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
