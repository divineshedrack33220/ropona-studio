import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(201,143,90,0.08),transparent_70%)]" />
      <div className="shell relative">
        <p className="eyebrow eyebrow-gold">Error 404</p>
        <h1 className="serif mt-6 max-w-3xl text-[clamp(3rem,9vw,9rem)] leading-[0.85] tracking-[-0.04em]">
          This frame <em className="text-goldsoft">didn&apos;t make</em> the cut.
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-mist">
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
    </section>
  );
}
