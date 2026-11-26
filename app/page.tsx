import { Hero } from "@/components/Hero";
import { CapabilityMarquee } from "@/components/CapabilityMarquee";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkGrid";
import { ReelBand } from "@/components/ReelBand";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { DirectorMode } from "@/components/DirectorMode";
import { PromptDirection } from "@/components/PromptDirection";
import { Engagements } from "@/components/Engagements";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";
import { portfolioProjects, site } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityMarquee />

      <section className="section">
        <div className="shell grid gap-7 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                01
              </span>
              <span className="h-px w-8 bg-burgundy/50" />
              <span className="eyebrow">The practice</span>
            </div>
            <p className="mt-5 max-w-[17rem] font-sans text-[0.56rem] font-medium uppercase leading-[1.8] tracking-[0.12em] text-espresso">
              Generative production.
              <br />
              Editorial craft.
              <br />
              Audience-led strategy.
            </p>
          </Reveal>

          <div className="md:col-span-9">
            <Reveal>
              <h2 className="serif max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] leading-[1.05] tracking-[-0.025em] text-dark">
                The technology creates possibilities.
                <br />
                <em className="text-burgundy">
                  The story gives them purpose.
                </em>
              </h2>
            </Reveal>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 md:mt-8">
              <Reveal delay={80} className="surface-card p-5 md:p-6">
                <p className="text-[0.95rem] leading-[1.85] text-cocoa">
                  My work sits at the intersection of generative production, video
                  editing and marketing strategy. I understand how audiences think,
                  how brands communicate and how visual decisions influence the way
                  a message is received. That perspective shapes everything I
                  produce, from a short-form commercial to a long-form documentary.
                </p>
              </Reveal>
              <Reveal delay={140} className="surface-card p-5 md:p-6">
                <p className="text-[0.95rem] leading-[1.85] text-cocoa">
                  I approach AI as a production medium, not a shortcut around
                  creative judgement. Concept development, shot design, continuity,
                  pacing, sound and finishing all contribute to the final
                  experience. The objective is not simply to generate impressive
                  imagery; it is to create a coherent film that serves the brief.
                </p>
              </Reveal>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:mt-6 sm:grid-cols-3">
              {site.stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 60}
                  className="surface-light p-4 md:p-5"
                >
                  <p className="serif text-[clamp(1.8rem,2.8vw,2.8rem)] leading-none text-burgundy">
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
                Selected films. Distinct briefs.{" "}
                <em className="text-burgundy">Deliberate creative choices.</em>
              </>
            }
            description="Explore a selection of commercial, technical and narrative productions. Each project demonstrates a different application of AI-assisted filmmaking, visual storytelling and post-production."
            action={{ label: "Explore all projects", href: "/work" }}
          />
          <WorkGrid projects={portfolioProjects} />
        </div>
      </section>

      <ReelBand />
      <About />
      <Experience />
      <Services />
      <Process />
      <DirectorMode />
      <PromptDirection />
      <Engagements />
      <Contact />
    </>
  );
}
