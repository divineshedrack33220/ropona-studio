import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CapabilityMarquee } from "@/components/CapabilityMarquee";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkGrid";
import { ReelBand } from "@/components/ReelBand";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
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
              <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                01
              </span>
              <span className="h-px w-8 bg-burgundy/50" />
              <span className="eyebrow">The practice</span>
            </div>
            <p className="mt-6 max-w-[17rem] font-sans text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.12em] text-espresso">
              Director-led. Editor-brained.
              <br />
              Built for the way films are made now.
            </p>
          </Reveal>

          <div className="md:col-span-9">
            <Reveal>
              <h2 className="serif max-w-5xl text-[clamp(2.2rem,4.5vw,4.6rem)] leading-[1.04] tracking-[-0.025em] text-dark">
                Anyone can generate a shot.
                <br />
                <em className="text-burgundy">
                  Very few can make you feel it.
                </em>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12">
              <Reveal delay={80} className="surface-card p-6 md:p-7">
                <p className="text-[0.95rem] leading-[1.85] text-cocoa">
                  I&apos;m Ropona Benard — a creative director, AI filmmaker and editor
                  working where traditional post-production meets generative
                  production. I build films the way a director should: story
                  first, craft always, technology only where it serves the frame.
                </p>
              </Reveal>
              <Reveal delay={140} className="surface-card p-6 md:p-7">
                <p className="text-[0.95rem] leading-[1.85] text-cocoa">
                  For brands and storytellers, that means one partner from concept
                  to final cut — a hybrid pipeline that keeps cinema-grade craft
                  while collapsing the time and cost between an idea and a
                  finished film.
                </p>
              </Reveal>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:mt-8 lg:grid-cols-4">
              {site.stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 60}
                  className="surface-light p-5 md:p-6"
                >
                  <p className="serif text-[clamp(2rem,3.2vw,3.2rem)] leading-none text-burgundy">
                    {stat.value}
                  </p>
                  <p className="mt-3 font-sans text-[0.65rem] font-medium leading-relaxed text-cocoa">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="work"
        className="section border-t border-burgundy/15 bg-champagne/35"
      >
        <div className="shell">
          <SectionHeading
            index="02"
            label="Selected work"
            title={
              <>
                A few frames from the{" "}
                <em className="text-burgundy">last four years.</em>
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
      <Experience />
      <Services />
      <Process />
      <Testimonials />
      <Pricing />
      <Contact />

      <section className="border-t border-burgundy/15">
        <div className="shell py-12 md:py-16">
          <div className="flex flex-col items-start justify-between gap-7 rounded-feature bg-burgundy p-7 text-ivory md:flex-row md:items-center md:p-10">
            <p className="max-w-xl text-base leading-relaxed text-champagne">
              Prefer to talk it through? A 20-minute call is usually enough to know
              whether we should make something together.
            </p>
            <Link
              href={site.booking}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline shrink-0"
              data-track="outbound_click"
              data-track-label="footer_booking"
            >
              Book an intro call <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
