import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CapabilityMarquee } from "@/components/CapabilityMarquee";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkGrid";
import { ReelBand } from "@/components/ReelBand";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";
import { portfolioProjects, site } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityMarquee />

      <section className="section">
        <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">01</span>
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">The practice</span>
            </div>
            <p className="mt-6 max-w-[16rem] font-mono text-[0.56rem] uppercase leading-[1.9] tracking-[0.14em] text-muted">
              Director-led. Editor-brained.
              <br />
              Built for the way films are made now.
            </p>
          </Reveal>

          <div className="md:col-span-9">
            <Reveal>
              <h2 className="serif max-w-5xl text-[clamp(2.3rem,4.6vw,4.8rem)] leading-[1.02] tracking-[-0.025em]">
                Anyone can generate a shot.
                <br />
                <em className="text-goldsoft">Very few can make you feel it.</em>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12">
              <Reveal delay={80}>
                <p className="text-[0.95rem] leading-[1.85] text-mist">
                  I&apos;m Ropona Benard — a creative director, AI filmmaker and editor
                  working where traditional post-production meets generative
                  production. I build films the way a director should: story
                  first, craft always, technology only where it serves the frame.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-[0.95rem] leading-[1.85] text-mist">
                  For brands and storytellers, that means one partner from concept
                  to final cut — a hybrid pipeline that keeps cinema-grade craft
                  while collapsing the time and cost between an idea and a
                  finished film.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 sm:grid-cols-4 md:mt-16">
              {site.stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 60}
                  className="bg-ink px-4 py-6 md:px-5 md:py-8"
                >
                  <p className="serif text-[clamp(2rem,3.2vw,3.2rem)] leading-none text-bone">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.68rem] leading-relaxed text-muted">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section border-t border-white/[0.08] bg-coal">
        <div className="shell">
          <SectionHeading
            index="02"
            label="Selected work"
            title={
              <>
                A few frames from the <em className="text-goldsoft">last four years.</em>
              </>
            }
            description="Commercials, AI films, brand worlds and edits. Each one built around a single idea — and measured by what it did for the client."
            action={{ label: "All projects", href: "/work" }}
          />
          <WorkGrid projects={portfolioProjects} />
        </div>
      </section>

      <ReelBand />

      <About />
      <Services />
      <Process />
      <Testimonials />
      <Pricing />
      <Contact />

      <section className="border-t border-white/[0.08]">
        <div className="shell flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="max-w-lg text-sm leading-relaxed text-mist">
            Prefer to talk it through? A 20-minute call is usually enough to know
            whether we should make something together.
          </p>
          <Link
            href={site.booking}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            data-track="outbound_click"
            data-track-label="footer_booking"
          >
            Book an intro call <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
