import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] items-center pb-16 pt-32 md:pt-40">
      <div className="grid w-full gap-8 md:grid-cols-12 md:items-center md:gap-10">
        <div className="relative md:col-span-7">
          <div className="surface-card rounded-feature p-7 md:p-11">
            <p className="eyebrow">Error 404</p>
            <h1 className="serif mt-6 max-w-3xl text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em] text-dark">
              This frame <em className="text-burgundy">didn&apos;t make</em> the cut.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cocoa">
              The page you were looking for has moved, been renamed, or never existed.
              The work, however, is very much still here.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/work" className="btn btn-gold">
                View the work <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/" className="btn btn-outline">
                Back to home
              </Link>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-tr-[2rem] border-b border-r border-burgundy/30 md:-bottom-6 md:-right-6 md:h-48 md:w-48"
          />
        </div>

        <div className="md:col-span-5">
          <div className="rounded-feature border border-champagne/20 bg-burgundy p-7 text-ivory md:p-9">
            <div className="flex items-center gap-3 border-b border-champagne/20 pb-5">
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                404
              </span>
              <span className="h-px w-8 bg-champagne/50" />
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                Missed frame
              </span>
            </div>
            <p className="serif mt-7 text-[clamp(1.6rem,2.8vw,2.8rem)] leading-[1.25] text-ivory">
              Every cut has an outtake. This page is one of them.
            </p>
            <p className="mt-6 text-xs leading-relaxed text-champagne/80">
              The showreel, the selected projects and the way to get in touch are all
              still exactly where you left them.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/work" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="link-line font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-champagne hover:text-ivory"
                >
                  {item.label} <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
