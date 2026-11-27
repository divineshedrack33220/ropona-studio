import Image from "next/image";
import Link from "next/link";
import { about, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function About() {
  const teaser = about.story[0].replace(/[.!?]$/, "");

  return (
    <section id="about" className="section border-t border-burgundy/15">
      <div className="shell">
        <div className="rounded-panel border border-burgundy/15 bg-champagne p-5 md:p-8 lg:p-9">
          <div className="grid gap-7 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <Reveal>
                <div className="relative">
                  <div className="media-frame aspect-ig-post">
                    <Image
                      src={about.portrait}
                      alt={about.portraitAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-card bg-espresso/85 px-3 py-2 text-ivory md:inset-x-4 md:bottom-4">
                      <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.16em]">
                        Ropona Bernard
                      </p>
                      <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-champagne/75">
                        Lagos
                      </p>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 h-20 w-20 rounded-tl-panel border-l border-t border-burgundy/45 md:-left-3 md:-top-3 md:h-24 md:w-24"
                  />
                </div>
              </Reveal>

              <Reveal delay={120} className="mt-5">
                <dl className="surface-light flex flex-col gap-3 p-4 md:p-5">
                  {about.credentials.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-1 gap-1 border-b border-burgundy/10 pb-3 last:border-0 last:pb-0 sm:grid-cols-[6.5rem_1fr] sm:gap-3"
                    >
                      <dt className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                        {item.label}
                      </dt>
                      <dd className="text-[0.95rem] leading-relaxed text-cocoa">
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
                  02
                </span>
                <span className="h-px w-8 bg-burgundy/50" />
                <span className="eyebrow">About</span>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="serif mt-5 text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-dark">
                  {about.headline}
                </h2>
              </Reveal>

              <div className="mt-5 flex flex-col gap-4">
                <Reveal delay={120}>
                  <p className="max-w-2xl text-[0.95rem] leading-[1.85] text-cocoa">
                    {teaser}
                    <span aria-hidden="true">…</span>
                  </p>
                </Reveal>
                <Reveal delay={180}>
                  <Link
                    href="/about"
                    className="link-line font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-dark"
                    data-track="cta_click"
                    data-track-label="about_read_more"
                  >
                    Read more <span aria-hidden="true">↗</span>
                  </Link>
                </Reveal>
              </div>

              <Reveal delay={120} className="mt-7 border-l-2 border-burgundy pl-5">
                <blockquote className="serif max-w-2xl text-lg leading-relaxed text-dark md:text-xl">
                  “{about.philosophy}”
                </blockquote>
              </Reveal>

              <Reveal delay={80} className="mt-8">
                <p className="eyebrow mb-3">Expertise</p>
                <ul className="grid gap-x-8 border-t border-burgundy/15 sm:grid-cols-2">
                  {about.expertise.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 border-b border-burgundy/10 py-2.5 text-[0.82rem] text-cocoa"
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

              <Reveal delay={120} className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="btn btn-gold"
                  data-track="cta_click"
                  data-track-label="about_get_in_touch"
                >
                  Get in touch <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="#experience"
                  className="btn btn-ghost"
                  data-track="cta_click"
                  data-track-label="about_view_experience"
                >
                  View experience <span aria-hidden="true">↓</span>
                </Link>
              </Reveal>

              <Reveal delay={160} className="mt-8 flex items-center gap-3">
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
                  Ropona Bernard
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
