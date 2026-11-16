import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; href: string };
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal className="flex items-center gap-3">
        <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">
          {index}
        </span>
        <span className="h-px w-8 bg-gold/60" />
        <span className="eyebrow">{label}</span>
      </Reveal>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-12 md:items-end">
        <Reveal delay={80} className="md:col-span-7">
          <h2 className="serif max-w-3xl text-[clamp(2.3rem,4.7vw,4.7rem)] leading-[0.98] tracking-[-0.025em]">
            {title}
          </h2>
        </Reveal>
        {(description || action) && (
          <Reveal
            delay={160}
            className="flex flex-col items-start gap-5 md:col-span-4 md:col-start-9 md:items-end md:text-right"
          >
            {description && (
              <div className="max-w-sm text-sm leading-relaxed text-mist">
                {description}
              </div>
            )}
            {action && (
              <Link
                href={action.href}
                className="link-line font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone"
              >
                {action.label} <span aria-hidden="true">↗</span>
              </Link>
            )}
          </Reveal>
        )}
      </div>
    </div>
  );
}
