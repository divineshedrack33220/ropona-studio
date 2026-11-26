"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function Plus({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-burgundy/30 transition-colors duration-300 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-ivory",
        open && "border-burgundy bg-burgundy text-ivory"
      )}
    >
      <span className="absolute h-px w-3 bg-current" />
      <span
        className={cn(
          "absolute h-3 w-px bg-current transition-transform duration-500",
          open && "rotate-90"
        )}
      />
    </span>
  );
}

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="section border-t border-burgundy/15">
      <div className="shell">
        <div className="rounded-panel border border-burgundy/15 bg-champagne/55 p-5 md:p-7 lg:p-8">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-burgundy">
              05
            </span>
            <span className="h-px w-8 bg-burgundy/50" />
            <span className="eyebrow">Capabilities</span>
          </div>

          <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <h2 className="serif text-[clamp(2rem,3.8vw,3.8rem)] leading-[1.05] tracking-[-0.025em] text-dark">
                From creative concept to{" "}
                <em className="text-burgundy">finished production.</em>
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="max-w-sm text-sm leading-relaxed text-espresso md:ml-auto md:text-right">
                A connected production skill set combining generative technology,
                editorial craft and audience-focused creative thinking. I can
                contribute across the full workflow or integrate into an established
                production team.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 md:mt-10">
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={service.id}
                  className="border-t border-burgundy/15 last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpenIndex(isOpen ? null : index);
                      track("service_toggle", {
                        service: service.title,
                        open: !isOpen,
                      });
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`service-${service.id}`}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-5 text-left md:grid-cols-[4rem_1.2fr_1fr_auto] md:gap-6 md:py-6"
                  >
                    <span className="font-sans text-[0.6rem] font-semibold tracking-[0.12em] text-espresso">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="serif text-[clamp(1.35rem,2.2vw,2.2rem)] leading-none text-burgundy transition-colors duration-300 group-hover:text-burgundySoft">
                      {service.title}
                    </span>
                    <span className="hidden text-sm leading-relaxed text-espresso md:block">
                      {service.summary}
                    </span>
                    <span className="justify-self-end text-burgundy">
                      <Plus open={isOpen} />
                    </span>
                  </button>

                  <div
                    id={`service-${service.id}`}
                    className="grid transition-[grid-template-rows] duration-700 ease-cinema"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-5 rounded-panel bg-champagneLight/70 p-5 md:grid-cols-12 md:gap-6 md:p-6 md:ml-14">
                        <p className="max-w-md text-sm leading-[1.85] text-espresso md:col-span-5">
                          {service.body}
                        </p>
                        <div className="md:col-span-3">
                          <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                            What I do
                          </p>
                          <ul className="mt-3 flex flex-col gap-2">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-xs leading-relaxed text-espresso"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-4">
                          <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                            Output
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {service.useCases.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-burgundy/20 bg-champagne px-2.5 py-1.5 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-espresso"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm leading-relaxed text-espresso">
              For AI video production roles, creative collaborations or project
              opportunities, share the brief or tell me about your team.
            </p>
            <Link
              href="/#contact"
              className="btn btn-gold shrink-0"
              data-track="cta_click"
              data-track-label="services_get_in_touch"
            >
              Get in touch <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
