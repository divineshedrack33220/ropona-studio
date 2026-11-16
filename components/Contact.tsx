import Link from "next/link";
import { site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { LocalTime } from "@/components/LocalTime";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
      <path d="M3 13L13 3M5 3H13V11" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="section relative overflow-hidden border-t border-white/[0.08] bg-coal"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(201,169,107,0.1),transparent_62%)]" />

      <div className="shell relative">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">08</span>
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">Start a project</span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <h2 className="serif text-[clamp(2.8rem,6.4vw,6.6rem)] leading-[0.94] tracking-[-0.03em]">
              Let&apos;s make something <em className="text-goldsoft">that lasts.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-sm leading-relaxed text-mist md:ml-auto md:text-right">
              A film, a campaign, a world. Send a paragraph — no deck required —
              and I&apos;ll come back within one working day.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col md:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 border-b border-white/15 pb-4 text-lg text-bone transition-colors hover:text-goldsoft md:text-2xl"
                data-track="outbound_click"
                data-track-label="contact_email"
              >
                {site.email}
                <Arrow />
              </a>
            </Reveal>

            <Reveal delay={80} className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="eyebrow mb-3">WhatsApp</p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-sm text-mist hover:text-bone"
                  data-track="outbound_click"
                  data-track-label="contact_whatsapp"
                >
                  Message directly
                </a>
                <p className="mt-2 font-mono text-[0.52rem] tracking-[0.1em] text-muted">
                  {site.phone}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Book a call</p>
                <a
                  href={site.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-sm text-mist hover:text-bone"
                  data-track="outbound_click"
                  data-track-label="contact_booking"
                >
                  20-minute intro
                </a>
                <p className="mt-2 font-mono text-[0.52rem] tracking-[0.1em] text-muted">
                  Calendly / Cal.com
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-10 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2.5">
                <span className="availability-dot h-1.5 w-1.5 rounded-full bg-gold" />
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-bone">
                  {site.availability.status} · {site.availability.note}
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {site.responseTime} Based in {site.location}, working across the
                US, UK, Canada, Australia, UAE and Africa.
              </p>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="grid grid-cols-2 gap-x-6">
                {site.socials.map((social) => (
                  <li key={social.label} className="border-b border-white/10">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between py-2.5 text-sm text-mist transition-colors hover:text-bone"
                      data-track="outbound_click"
                      data-track-label={`contact_${social.label.toLowerCase()}`}
                    >
                      {social.label}
                      <span className="font-mono text-[0.5rem] tracking-[0.08em] text-muted transition-colors group-hover:text-gold">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="mt-auto hidden pt-12 md:block">
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                {site.location} · <LocalTime />
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={80}>
              <div className="border border-white/10 bg-ink/70 p-6 backdrop-blur-sm md:p-8">
                <p className="eyebrow eyebrow-gold">Project brief</p>
                <p className="mt-2 text-sm text-mist">
                  Tell me what you are making, who it is for, and when it needs to
                  exist.
                </p>
                <ContactForm />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-[0.68rem] leading-relaxed text-muted">
                By submitting a brief you agree to the{" "}
                <Link href="/privacy" className="link-line text-mist">
                  privacy policy
                </Link>
                . Your details are never shared or added to a mailing list.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
