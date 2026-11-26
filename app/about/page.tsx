import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Explore Ropona Bernard’s creative journey from marketing and audience strategy into AI video editing, generative filmmaking and creative production.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <>
      <header className="shell pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="surface-card rounded-feature p-5 md:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">About</span>
            <span className="h-px w-10 bg-burgundy/50" />
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
              Ropona Bernard
            </span>
          </div>

          <h1 className="serif mt-5 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-dark">
            {about.headline}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cocoa">
            {site.role}
          </p>
        </div>
      </header>

      <div className="shell grid gap-8 pb-16 md:grid-cols-12 md:gap-6">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <div className="media-frame aspect-ig-post">
              <Image
                src={about.portrait}
                alt={about.portraitAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 32vw"
                className="object-cover"
              />
            </div>

            <dl className="surface-light mt-5 flex flex-col gap-3 p-4 md:p-5">
              {about.credentials.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 gap-1 border-b border-burgundy/10 pb-3 last:border-0 last:pb-0 sm:grid-cols-[6rem_1fr] sm:gap-3"
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
          </div>
        </aside>

        <div className="md:col-span-8">
          <div className="surface-card rounded-feature p-5 md:p-7">
            <div className="flex items-baseline gap-4 border-b border-burgundy/15 pb-5">
              <span className="font-sans text-[0.55rem] font-semibold tracking-[0.14em] text-burgundy">
                01
              </span>
              <h2 className="serif text-2xl leading-tight text-dark md:text-3xl">
                The journey
              </h2>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {about.story.map((paragraph, index) => (
                <Reveal key={index} delay={index * 40}>
                  <p className="text-sm leading-[1.95] text-cocoa md:text-[0.95rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Reveal className="rounded-card border border-burgundy/15 bg-champagne p-5 md:p-6">
              <p className="eyebrow">Philosophy</p>
              <blockquote className="serif mt-5 text-xl leading-relaxed text-dark md:text-2xl">
                “{about.philosophy}”
              </blockquote>
            </Reveal>

            <Reveal delay={80} className="surface-light rounded-card p-5 md:p-6">
              <p className="eyebrow">Expertise</p>
              <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
                {about.expertise.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-burgundy/10 py-3 text-xs leading-relaxed text-cocoa last:border-b-0 sm:last:border-b"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-card border border-champagne/20 bg-burgundy p-5 text-ivory md:p-6">
            <Link
              href="/#experience"
              className="btn btn-outline"
              data-track="cta_click"
              data-track-label="about_page_view_experience"
            >
              View experience <span aria-hidden="true">↓</span>
            </Link>
            <Link
              href="/#contact"
              className="btn btn-outline"
              data-track="cta_click"
              data-track-label="about_page_get_in_touch"
            >
              Get in touch <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/"
              className="link-line font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-champagne hover:text-ivory"
            >
              Back to home
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
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
            <span className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-espresso">
              {site.location}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
