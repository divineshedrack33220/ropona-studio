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
      className="section border-t border-burgundy/15"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="shell">
        <div className="rounded-feature border border-champagne/20 bg-burgundy p-6 text-ivory md:p-10 lg:p-12">
          <Reveal className="flex flex-col items-start justify-between gap-4 border-b border-champagne/20 pb-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-champagne">
                07
              </span>
              <span className="h-px w-8 bg-champagne/50" />
              <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-champagne">
                Client words
              </span>
            </div>
            <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-champagne/75">
              References available on request
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <div className="min-h-[280px] md:min-h-[340px]" aria-live="polite">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                  {current.project}
                </p>
                <blockquote
                  key={index}
                  className="serif mt-6 max-w-4xl text-[clamp(1.6rem,3.1vw,3.1rem)] leading-[1.2] tracking-[-0.02em] text-ivory"
                  style={{
                    animation: "floatIn 0.7s cubic-bezier(0.16,1,0.3,1) both",
                  }}
                >
                  “{current.quote}”
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 font-sans text-[0.58rem] font-semibold text-champagne">
                    {current.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm text-ivory">{current.name}</p>
                    <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-champagne/75">
                      {current.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
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
                      aria-hidden="true"
                      className={`block h-1 rounded-full transition-all duration-500 ${
                        index === itemIndex
                          ? "w-12 bg-champagne"
                          : "w-6 bg-champagne/30 group-hover:bg-champagne/60"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-sans text-[0.52rem] font-semibold tracking-[0.14em] text-champagne/75">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/35 text-champagne transition-colors hover:bg-champagne hover:text-burgundy"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setIndex((value) => (value + 1) % testimonials.length)
                    }
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/35 text-champagne transition-colors hover:bg-champagne hover:text-burgundy"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="surface-light h-full rounded-[1.75rem] p-6">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
                  Selected clients
                </p>
                <ul className="mt-4 flex flex-col">
                  {site.clients.map((client) => (
                    <li
                      key={client.name}
                      className="border-b border-burgundy/10 py-3 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cocoa last:border-0"
                    >
                      {client.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-cocoa">
                  Direct references — including client contacts — are available on
                  request for serious enquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
