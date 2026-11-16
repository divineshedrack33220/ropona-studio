import Image from "next/image";
import Link from "next/link";
import { about, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="section border-t border-white/[0.08]">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-full w-full border border-gold/25" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-carbon">
                <Image
                  src={about.portrait}
                  alt={about.portraitAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <p className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-bone/75">
                    Ropona Benard
                  </p>
                  <p className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-bone/50">
                    Lagos
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8 hidden border-t border-white/10 pt-6 md:block">
            <dl className="flex flex-col gap-4">
              {about.credentials.map((item) => (
                <div key={item.label} className="grid grid-cols-3 gap-3">
                  <dt className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="col-span-2 text-xs leading-relaxed text-mist">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal className="flex items-center gap-3">
            <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">03</span>
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">About</span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="serif mt-6 text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.98] tracking-[-0.025em]">
              {about.headline}
            </h2>
          </Reveal>

          <div className="mt-7 flex flex-col gap-5">
            {about.story.map((paragraph, index) => (
              <Reveal key={index} delay={120 + index * 60}>
                <p className="max-w-2xl text-[0.95rem] leading-[1.85] text-mist">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-10 border-l border-gold/50 pl-6">
            <blockquote className="max-w-2xl text-lg leading-relaxed text-bone/90 md:text-xl">
              “{about.philosophy}”
            </blockquote>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <p className="eyebrow mb-4">Expertise</p>
            <ul className="grid grid-cols-1 gap-x-8 border-t border-white/10 sm:grid-cols-2">
              {about.expertise.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-white/10 py-3 text-sm text-mist"
                >
                  <span className="h-1 w-1 rotate-45 bg-gold/80" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="mt-8 md:hidden">
            <dl className="flex flex-col gap-3">
              {about.credentials.map((item) => (
                <div key={item.label} className="border-b border-white/10 pb-3">
                  <dt className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-mist">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={site.cv}
              download
              className="btn btn-outline"
              data-track="cv_download"
            >
              Download CV / bio
              <span aria-hidden="true">↓</span>
            </a>
            <Link
              href="/#contact"
              className="btn btn-ghost font-mono text-[0.6rem] uppercase tracking-[0.2em] text-goldsoft"
              data-track="cta_click"
              data-track-label="about_book_call"
            >
              Book an intro call <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>

          <Reveal delay={160} className="mt-10 flex items-center gap-4">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15 sm:h-12 sm:w-12">
              <Image
                src={about.profile}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="serif text-2xl italic text-goldsoft/90 sm:text-3xl">Ropona Benard</span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="hidden font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted sm:inline">
              {site.location}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
