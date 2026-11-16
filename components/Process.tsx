"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = trackRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.78;
      const end = viewport * 0.3;
      const total = rect.height + (start - end);
      const travelled = start - rect.top;
      setProgress(Math.max(0, Math.min(1, travelled / Math.max(1, total))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const activeIndex = Math.min(
    processSteps.length - 1,
    Math.floor(progress * processSteps.length)
  );

  return (
    <section id="process" className="section border-t border-white/[0.08]">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <Reveal className="flex items-center gap-3">
              <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">05</span>
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">Process</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="serif mt-6 text-[clamp(2.3rem,4.1vw,4.1rem)] leading-[0.98] tracking-[-0.025em]">
                From first brief to <em className="text-goldsoft">final frame.</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-sm text-sm leading-[1.85] text-mist">
                A clear, seven-step process built for creative trust. You always
                know what is happening, what is next, and what is expected of you.
              </p>
            </Reveal>
            <Reveal delay={180} className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-2.5 border border-white/10 px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-mist">
                  Typical timeline: 3–6 weeks
                </span>
              </div>
              <Link
                href="/#contact"
                className="link-line w-fit font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone"
                data-track="cta_click"
                data-track-label="process_start"
              >
                Start with a conversation <span aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="relative md:col-span-7 md:col-start-6" ref={trackRef}>
          <div className="absolute bottom-0 left-[1.45rem] top-0 w-px bg-white/10 md:left-[1.45rem]" aria-hidden="true">
            <div
              className="w-px bg-gold transition-[height] duration-200 ease-out"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <ol className="flex flex-col">
            {processSteps.map((step, index) => {
              const active = index <= activeIndex;
              return (
                <li key={step.number} className="relative pb-10 pl-16 last:pb-0 md:pb-14 md:pl-20">
                  <span
                    className={cn(
                      "absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border bg-ink font-mono text-[0.6rem] tracking-[0.08em] transition-colors duration-700",
                      active
                        ? "border-gold text-gold"
                        : "border-white/15 text-muted"
                    )}
                  >
                    {step.number}
                  </span>
                  <Reveal delay={40}>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-3">
                      <h3 className="serif text-[clamp(1.5rem,2.2vw,2.2rem)] leading-none text-bone">
                        {step.title}
                      </h3>
                      <span className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-[1.85] text-mist">
                      {step.body}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
