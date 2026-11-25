import Link from "next/link";
import { site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { LocalTime } from "@/components/LocalTime";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
      <path d="M3 13L13 3M5 3H13V11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section border-t border-burgundy/15">
      <div className="shell">
        <div className="rounded-feature border border-champagne/20 bg-burgundy p-6 text-ivory md:p-10 lg:p-12">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-champagne">
              09
            </span>
            <span className="h-px w-8 bg-champagne/50" />
            <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-champagne">
              Start a project
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-8">
              <h2 className="serif text-[clamp(2.7rem,6vw,6.2rem)] leading-[0.98] tracking-[-0.03em] text-ivory">
                Let&apos;s make something{" "}
                <em className="text-champagne">that lasts.</em>
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:pb-3">
              <p className="max-w-sm text-sm leading-relaxed text-champagne md:ml-auto md:text-right">
                A film, a campaign, a world. Send a paragraph — no deck required —
                and I&apos;ll come back within one working day.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-9 md:grid-cols-12 md:gap-8">
            <div className="flex flex-col md:col-span-5">
              <Reveal>
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="group mt-3 flex items-center gap-3 border-b border-champagne/25 pb-4 text-lg text-ivory transition-colors hover:text-champagne md:text-2xl"
                  data-track="outbound_click"
                  data-track-label="contact_email"
                >
                  {site.email}
                  <Arrow />
                </a>
              </Reveal>

              <Reveal delay={80} className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                    WhatsApp
                  </p>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line mt-3 block w-fit text-sm text-ivory"
                    data-track="outbound_click"
                    data-track-label="contact_whatsapp"
                  >
                    Message directly
                  </a>
                  <p className="mt-2 font-sans text-[0.52rem] font-medium tracking-[0.1em] text-champagne/75">
                    {site.phone}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                    Book a call
                  </p>
                  <a
                    href={site.booking}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line mt-3 block w-fit text-sm text-ivory"
                    data-track="outbound_click"
                    data-track-label="contact_booking"
                  >
                    20-minute intro
                  </a>
                  <p className="mt-2 font-sans text-[0.52rem] font-medium tracking-[0.1em] text-champagne/75">
                    Calendly / Cal.com
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120} className="mt-10 border-t border-champagne/20 pt-6">
                <div className="flex items-center gap-2.5">
                  <span className="availability-dot h-1.5 w-1.5 rounded-full bg-champagne" />
                  <p className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ivory">
                    {site.availability.status} · {site.availability.note}
                  </p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-champagne/75">
                  {site.responseTime} Based in {site.location}, working across the
                  US, UK, Canada, Australia, UAE and Africa.
                </p>
              </Reveal>

              <Reveal delay={160} className="mt-10">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                  Elsewhere
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-6">
                  {site.socials.map((social) => (
                    <li key={social.label} className="border-b border-champagne/20">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between py-2.5 text-sm text-ivory transition-colors hover:text-champagne"
                        data-track="outbound_click"
                        data-track-label={`contact_${social.label.toLowerCase()}`}
                      >
                        {social.label}
                        <span className="font-sans text-[0.5rem] font-medium tracking-[0.08em] text-champagne/75 transition-colors group-hover:text-champagne">
                          {social.handle}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className="mt-auto hidden pt-12 md:block">
                <p className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-champagne/75">
                  {site.location} · <LocalTime />
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal delay={80}>
                <div className="rounded-[1.75rem] border border-burgundy/15 bg-champagne p-6 md:p-8">
                  <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
                    Project brief
                  </p>
                  <p className="mt-2 text-sm text-cocoa">
                    Tell me what you are making, who it is for, and when it needs to
                    exist.
                  </p>
                  <ContactForm />
                </div>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 text-[0.68rem] leading-relaxed text-champagne/75">
                  By submitting a brief you agree to the{" "}
                  <Link href="/privacy" className="link-line text-champagne">
                    privacy policy
                  </Link>
                  . Your details are never shared or added to a mailing list.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
