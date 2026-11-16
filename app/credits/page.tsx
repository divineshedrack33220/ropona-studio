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
      <header className="shell pb-12 pt-32 md:pt-40">
        <div className="flex items-center gap-3">
          <span className="eyebrow eyebrow-gold">Colophon</span>
          <span className="h-px w-10 bg-gold/50" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
            Built in Lagos
          </span>
        </div>
        <h1 className="serif mt-6 max-w-4xl text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.92] tracking-[-0.035em]">
          Credits &amp; <em className="text-goldsoft">craft.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist">
          Every still on this site is original key art, art-directed as a light
          study and designed to be swapped for real film frames as projects are
          published. Typefaces and tools are credited below.
        </p>
      </header>

      <div className="shell pb-24">
        <div className="border-t border-white/10">
          {credits.map((item, index) => (
            <div
              key={`${item.slot}-${item.title}`}
              className="grid gap-4 border-b border-white/10 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-mono text-[0.55rem] tracking-[0.14em] text-gold md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-3">
                <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                  {item.slot}
                </p>
                <h2 className="serif mt-2 text-xl leading-tight text-bone md:text-2xl">
                  {item.title}
                </h2>
              </div>
              <div className="md:col-span-4">
                <p className="text-sm leading-relaxed text-mist">{item.creator}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-muted">
                  {item.license}
                </p>
              </div>
              <div className="flex gap-4 md:col-span-2 md:justify-end">
                <a
                  href={item.licenseUrl}
                  className="link-line font-mono text-[0.52rem] uppercase tracking-[0.12em] text-mist hover:text-bone"
                  {...(item.licenseUrl.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  License
                </a>
                <a
                  href={item.href}
                  className="link-line font-mono text-[0.52rem] uppercase tracking-[0.12em] text-mist hover:text-bone"
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

        <div className="mt-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">A note on the imagery</p>
            <p className="text-sm leading-[1.9] text-mist">
              The film stills on this site are procedural light studies generated
              in-house: volumetric light, brutalist geometry, haze and 35mm grain.
              They exist so the site feels finished before final project assets
              arrive, and they carry no third-party licensing obligations.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="eyebrow mb-4">Replace with real work</p>
            <p className="text-sm leading-[1.9] text-mist">
              Project thumbnails, stills and preview loops are referenced from{" "}
              <code className="border border-white/10 bg-carbon px-1.5 py-0.5 font-mono text-[0.7rem] text-bone">
                content/projects.json
              </code>
              . Drop new files into{" "}
              <code className="border border-white/10 bg-carbon px-1.5 py-0.5 font-mono text-[0.7rem] text-bone">
                public/media
              </code>{" "}
              and update the paths — no component changes required.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
