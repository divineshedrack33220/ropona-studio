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
    <section id="process" className="section border-t border-burgundy/15">
      <div className="shell grid gap-7 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <div className="surface-card rounded-feature p-5 md:p-6">
              <Reveal className="flex items-center gap-3">
                <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-burgundy">
                  06
                </span>
                <span className="h-px w-8 bg-burgundy/50" />
                <span className="eyebrow">Process</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="serif mt-5 text-[clamp(1.9rem,3.4vw,3.4rem)] leading-[1.05] text-dark">
                  A structured workflow.{" "}
                  <em className="text-burgundy">A purposeful final frame.</em>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 text-sm leading-[1.85] text-cocoa">
                  Every production starts with a clear objective and moves through
                  creative development, generation, editing and quality control. I
                  adapt the workflow to the brief, team and delivery requirements.
                </p>
              </Reveal>
              <Reveal delay={180} className="mt-6">
                <Link
                  href="/#contact"
                  className="link-line w-fit font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-burgundy"
                  data-track="cta_click"
                  data-track-label="process_start"
                >
                  Start with a conversation <span aria-hidden="true">↗</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="relative md:col-span-8" ref={trackRef}>
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[1.3rem] top-0 w-px bg-burgundy/20"
          >
            <div
              className="w-px bg-burgundy transition-[height] duration-200 ease-out"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <ol className="flex flex-col gap-3">
            {processSteps.map((step, index) => {
              const active = index <= activeIndex;
              return (
                <li key={step.number} className="relative pl-14">
                  <span
                    className={cn(
                      "absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border font-sans text-[0.58rem] font-semibold tracking-[0.08em] transition-colors duration-500",
                      active
                        ? "border-burgundy bg-burgundy text-ivory"
                        : "border-burgundy/25 bg-champagne text-cocoa"
                    )}
                  >
                    {step.number}
                  </span>
                  <Reveal delay={40} className="surface-light rounded-card p-4 md:p-5">
                    <div className="border-b border-burgundy/15 pb-3">
                      <h3 className="serif text-[clamp(1.35rem,2vw,2rem)] leading-none text-dark">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-[1.85] text-cocoa">
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
