import type { Metadata } from "next";
import { credits } from "@/lib/content";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Credits and licensing for the typefaces, artwork and open-source software used on this site.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  return (
    <>
      <header className="shell pb-10 pt-28 md:pb-12 md:pt-36">
        <div className="surface-card rounded-feature p-6 md:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Colophon</span>
            <span className="h-px w-10 bg-burgundy/50" />
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
              Built in Lagos
            </span>
          </div>

          <h1 className="serif mt-6 max-w-4xl text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.94] tracking-[-0.035em] text-dark">
            Credits &amp; <em className="text-burgundy">craft.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cocoa">
            The imagery and films shown here are Ropona Bernard's own work or
            approved work samples. Typefaces, tools and licensing details are
            credited below.
          </p>
        </div>
      </header>

      <div className="shell pb-24">
        <div className="rounded-feature border border-burgundy/15 bg-champagne p-5 md:p-8">
          {credits.map((item, index) => (
            <div
              key={`${item.slot}-${item.title}`}
              className="grid gap-4 border-b border-burgundy/15 py-7 last:border-b-0 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-sans text-[0.55rem] font-semibold tracking-[0.12em] text-burgundy md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-3">
                <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
                  {item.slot}
                </p>
                <h2 className="serif mt-2 text-xl leading-tight text-burgundy md:text-2xl">
                  {item.title}
                </h2>
              </div>
              <div className="md:col-span-4">
                <p className="text-sm leading-relaxed text-cocoa">{item.creator}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-cocoa">
                  {item.license}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-2 md:justify-end">
                <a
                  href={item.licenseUrl}
                  className="link-line font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-burgundy hover:text-burgundySoft"
                  {...(item.licenseUrl.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  License
                </a>
                <a
                  href={item.href}
                  className="link-line font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-burgundy hover:text-burgundySoft"
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  Source
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">Imagery & samples</p>
            <p className="text-sm leading-[1.9] text-espresso">
              Project stills and preview clips are presented as approved work
              samples. Client identity remains confidential where requested, and
              individual contributions are listed on each case study.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="eyebrow mb-4">Film credits</p>
            <p className="text-sm leading-[1.9] text-espresso">
              Each case study lists the role, year and specific contribution for
              that project. For questions about image rights or credits, use the
              contact form.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
