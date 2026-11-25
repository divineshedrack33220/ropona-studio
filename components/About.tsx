import Image from "next/image";
import Link from "next/link";
import { about, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="section border-t border-burgundy/15">
      <div className="shell">
        <div className="rounded-feature border border-burgundy/15 bg-champagne p-6 md:p-10 lg:p-12">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Reveal>
                <div className="relative">
                  <div className="media-frame aspect-[4/5] rounded-[2rem]">
                    <Image
                      src={about.portrait}
                      alt={about.portraitAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-espresso/85 px-4 py-3 text-ivory md:inset-x-5 md:bottom-5">
                      <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.16em]">
                        Ropona Benard
                      </p>
                      <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-champagne/75">
                        Lagos
                      </p>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute -left-3 -top-3 h-24 w-24 rounded-tl-[2rem] border-l border-t border-burgundy/45 md:-left-4 md:-top-4 md:h-32 md:w-32"
                  />
                </div>
              </Reveal>

              <Reveal delay={120} className="mt-7">
                <dl className="surface-light flex flex-col gap-4 p-5 md:p-6">
                  {about.credentials.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-1 gap-1 border-b border-burgundy/10 pb-4 last:border-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-3"
                    >
                      <dt className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                        {item.label}
                      </dt>
                      <dd className="text-xs leading-relaxed text-cocoa">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal className="flex items-center gap-3">
                <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-burgundy">
                  03
                </span>
                <span className="h-px w-8 bg-burgundy/50" />
                <span className="eyebrow">About</span>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="serif mt-6 text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1] tracking-[-0.025em] text-dark">
                  {about.headline}
                </h2>
              </Reveal>

              <div className="mt-7 flex flex-col gap-5">
                {about.story.map((paragraph, index) => (
                  <Reveal key={index} delay={120 + index * 60}>
                    <p className="max-w-2xl text-[0.95rem] leading-[1.85] text-cocoa">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={120} className="mt-9 border-l-2 border-burgundy pl-6">
                <blockquote className="serif max-w-2xl text-lg leading-relaxed text-dark md:text-xl">
                  “{about.philosophy}”
                </blockquote>
              </Reveal>

              <Reveal delay={80} className="mt-10">
                <p className="eyebrow mb-4">Expertise</p>
                <ul className="grid gap-x-8 border-t border-burgundy/15 sm:grid-cols-2">
                  {about.expertise.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-burgundy/10 py-3 text-sm text-cocoa"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-burgundy"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={site.cv}
                  download
                  className="btn btn-gold"
                  data-track="cv_download"
                >
                  Download CV / bio
                  <span aria-hidden="true">↓</span>
                </a>
                <Link
                  href="/#contact"
                  className="btn btn-ghost"
                  data-track="cta_click"
                  data-track-label="about_book_call"
                >
                  Book an intro call <span aria-hidden="true">↗</span>
                </Link>
              </Reveal>

              <Reveal delay={160} className="mt-10 flex items-center gap-4">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-burgundy/25">
                  <Image
                    src={about.profile}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span className="serif text-2xl italic text-burgundy sm:text-3xl">
                  Ropona Benard
                </span>
                <span className="h-px flex-1 bg-burgundy/20" />
                <span className="hidden font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-cocoa sm:inline">
                  {site.location}
                </span>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
