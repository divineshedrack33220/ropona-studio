"use client";

import { useEffect, useState } from "react";
import { site, testimonials } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section
      className="section relative overflow-hidden border-t border-white/[0.08] bg-coal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,169,107,0.09),transparent_65%)]" />

      <div className="shell relative">
        <Reveal className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">06</span>
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Client words</span>
          </div>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
            References available on request
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <div className="min-h-[280px] md:min-h-[340px]" aria-live="polite">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-goldsoft">
                {current.project}
              </p>
              <blockquote
                key={index}
                className="serif mt-6 max-w-4xl text-[clamp(1.6rem,3.1vw,3.1rem)] leading-[1.18] tracking-[-0.02em] text-bone"
                style={{ animation: "floatIn 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                “{current.quote}”
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 font-mono text-[0.58rem] text-gold">
                  {current.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm text-bone">{current.name}</p>
                  <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                    {current.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {testimonials.map((item, itemIndex) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`Read testimonial from ${item.name}`}
                  aria-pressed={index === itemIndex}
                  className="group py-2"
                >
                  <span
                    className={`block h-px transition-all duration-500 ${
                      index === itemIndex
                        ? "w-12 bg-gold"
                        : "w-6 bg-white/20 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-mono text-[0.52rem] tracking-[0.14em] text-muted">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setIndex(
                      (value) =>
                        (value - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-mist transition-colors hover:border-gold hover:text-gold"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setIndex((value) => (value + 1) % testimonials.length)
                  }
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-mist transition-colors hover:border-gold hover:text-gold"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <p className="eyebrow mb-5 !text-[0.55rem]">Selected clients</p>
            <ul className="flex flex-col">
              {site.clients.map((client) => (
                <li
                  key={client.name}
                  className="border-b border-white/10 py-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mist last:border-0"
                >
                  {client.name}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Direct references — including client contacts — are available on
              request for serious enquiries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
