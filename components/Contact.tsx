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
              10
            </span>
            <span className="h-px w-8 bg-champagne/50" />
            <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-champagne">
              Contact
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-8">
              <h2 className="serif text-[clamp(2.7rem,6vw,6.2rem)] leading-[0.98] tracking-[-0.03em] text-ivory">
                Let&apos;s discuss what{" "}
                <em className="text-champagne">we can create.</em>
              </h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:pb-3">
              <p className="max-w-sm text-sm leading-relaxed text-champagne md:ml-auto md:text-right">
                For AI video production roles, creative collaborations or project
                opportunities, share your brief or tell me about your team. I would
                welcome a conversation about how my experience can contribute to your
                next production.
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

              <Reveal delay={120} className="mt-10 border-t border-champagne/20 pt-6">
                <div className="flex items-center gap-2.5">
                  <span className="availability-dot h-1.5 w-1.5 rounded-full bg-champagne" />
                  <p className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ivory">
                    {site.availability.status}
                  </p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-champagne/75">
                  {site.availability.note}. Based in {site.location}.
                </p>
              </Reveal>

              <Reveal delay={160} className="mt-10">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                  Elsewhere
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-x-6">
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
                    Tell me about the opportunity
                  </p>
                  <p className="mt-2 text-sm text-cocoa">
                    Name, email, company, opportunity type, timeline and a short
                    message are enough to start the conversation.
                  </p>
                  <ContactForm />
                </div>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 text-[0.68rem] leading-relaxed text-champagne/75">
                  By submitting an enquiry you agree to the{" "}
                  <Link href="/privacy" className="link-line text-champagne">
                    privacy policy
                  </Link>
                  . Your details are used only to respond to your message.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
