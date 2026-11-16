"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function Plus({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-white/15 transition-colors duration-500 group-hover:border-gold/60">
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
    <section id="services" className="section border-t border-white/[0.08] bg-coal">
      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">04</span>
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">Services</span>
        </div>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="serif text-[clamp(2.3rem,4.7vw,4.7rem)] leading-[0.98] tracking-[-0.025em]">
              One director. <em className="text-goldsoft">Every frame</em> accounted for.
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <p className="max-w-sm text-sm leading-relaxed text-mist md:ml-auto md:text-right">
              From a blank page to a finished film. Choose the full production or
              bring me in where you need the most leverage.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={service.id} className="border-t border-white/10 last:border-b">
                <button
                  type="button"
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index);
                    track("service_toggle", { service: service.title, open: !isOpen });
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`service-${service.id}`}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[4rem_1.2fr_1fr_auto] md:gap-8 md:py-9"
                >
                  <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="serif text-[clamp(1.55rem,2.6vw,2.6rem)] leading-none text-bone transition-colors duration-500 group-hover:text-goldsoft">
                    {service.title}
                  </span>
                  <span className="hidden text-sm leading-relaxed text-mist md:block">
                    {service.summary}
                  </span>
                  <span className="justify-self-end text-mist transition-colors duration-500 group-hover:text-gold">
                    <Plus open={isOpen} />
                  </span>
                </button>

                <div
                  id={`service-${service.id}`}
                  className="grid transition-[grid-template-rows] duration-700 ease-cinema"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-8 md:pb-12 md:pl-16">
                      <p className="max-w-md text-sm leading-[1.85] text-mist md:col-span-5">
                        {service.body}
                      </p>
                      <div className="md:col-span-3">
                        <p className="eyebrow mb-3 !text-[0.55rem]">Deliverables</p>
                        <ul className="flex flex-col gap-2">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-mist"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-gold/80" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-4">
                        <p className="eyebrow mb-3 !text-[0.55rem]">Typical use</p>
                        <div className="flex flex-wrap gap-2">
                          {service.useCases.map((item) => (
                            <span
                              key={item}
                              className="border border-white/12 px-2.5 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-mist"
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
          <p className="max-w-md text-sm leading-relaxed text-mist">
            Not sure what you need? Most projects start with a 20-minute call and
            a one-paragraph brief.
          </p>
          <Link
            href="/#contact"
            className="btn btn-gold"
            data-track="cta_click"
            data-track-label="services_request_quote"
          >
            Request a quote <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
