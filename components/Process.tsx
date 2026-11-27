"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = trackRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.82;
      const end = viewport * 0.34;
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
    <section id="process" className="section-compact border-t border-burgundy/15">
      <div className="shell grid gap-6 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <Reveal className="flex items-center gap-3">
            <span className="eyebrow">Process</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="serif mt-4 text-[clamp(1.9rem,3.4vw,3.4rem)] leading-[1.05] text-dark">
              A structured workflow.{" "}
              <span className="text-burgundy">A purposeful final frame.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-md text-[0.95rem] leading-[1.8] text-cocoa">
              Every production starts with a clear objective and moves through
              creative development, generation, editing and quality control. I
              adapt the workflow to the brief, team and delivery requirements.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <div
            aria-hidden="true"
            className="h-1 w-full overflow-hidden rounded-full bg-burgundy/15"
          >
            <div
              className="h-full rounded-full bg-burgundy transition-[width] duration-200 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <ol ref={trackRef} className="mt-5 grid gap-3 sm:grid-cols-2">
            {processSteps.map((step, index) => {
              const active = index <= activeIndex;
              return (
                <li key={step.number}>
                  <Reveal delay={40} className="surface-light h-full rounded-card p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-sans text-[0.55rem] font-semibold tracking-[0.08em] transition-colors duration-500",
                          active
                            ? "border-burgundy bg-burgundy text-ivory"
                            : "border-burgundy/25 bg-champagne text-cocoa"
                        )}
                      >
                        {step.number}
                      </span>
                      <h3 className="serif text-[1.15rem] leading-tight text-dark">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[0.9rem] leading-[1.7] text-cocoa">
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
