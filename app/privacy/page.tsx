import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description:
    "How Ropona Benard (Ropona Studio) handles enquiry data, analytics consent, cookies and your rights under GDPR and the NDPR.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "What this policy covers",
    body: [
      "This policy explains what happens to information you share with Ropona Benard (Ropona Studio) through this website — project briefs, emails, WhatsApp messages and analytics data — and the choices you have over it.",
      "It applies to ropona.studio and any subdomain of it. It does not cover third-party platforms you reach from this site, such as YouTube, Vimeo or Instagram, which have their own policies.",
    ],
  },
  {
    title: "Information collected",
    body: [
      "When you submit a project brief, I receive the name, email address, company, service interest, budget range, timeline and message you choose to provide. That information is used solely to respond to your enquiry and, if we work together, to deliver the project.",
      "Basic technical information — such as page views, referral source and approximate region — is collected only if you accept analytics cookies. Nothing is collected before you make that choice.",
    ],
  },
  {
    title: "Legal basis",
    body: [
      "Enquiry data is processed on the basis of legitimate interest and, where required, your consent: you are asking to be contacted about a project. Analytics data is processed on the basis of your explicit consent, which you can withdraw at any time.",
      "Where the GDPR applies, Ropona Benard (Ropona Studio) acts as the data controller. Where the Nigeria Data Protection Regulation applies, the same commitments apply.",
    ],
  },
  {
    title: "Cookies and analytics",
    body: [
      "This site does not set advertising cookies or sell data. Analytics is loaded only after you select “Accept all” in the cookie notice, at which point a first-party Google Analytics tag records page views and interaction events such as showreel plays and CTA clicks.",
      "If you select “Essential only”, no analytics script is loaded. You can change your choice at any time by clearing this site's local storage in your browser settings; the notice will appear again on your next visit.",
    ],
  },
  {
    title: "Retention and sharing",
    body: [
      "Project enquiries are kept for as long as needed to respond and, if a project proceeds, for the duration of the engagement plus the period required for tax and contractual records. Briefs that do not lead to work are deleted within twelve months.",
      "Your information is never sold or added to a mailing list without your explicit request. It is shared only with service providers strictly necessary to operate the site and respond to you — for example an email delivery provider or hosting provider — each bound by their own data protection terms.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask for a copy of the information held about you, request correction, request deletion, or object to processing. Write to hello@ropona.studio and you will receive a response within 30 days.",
      "If you believe your information has been handled improperly, you may complain to your local supervisory authority — for example the ICO in the United Kingdom or the Nigeria Data Protection Commission.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="shell pb-10 pt-28 md:pb-12 md:pt-36">
        <div className="surface-card rounded-feature p-6 md:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Legal</span>
            <span className="h-px w-10 bg-burgundy/50" />
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
              Updated November 2026
            </span>
          </div>

          <h1 className="serif mt-6 max-w-4xl text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.94] tracking-[-0.035em] text-dark">
            Privacy &amp; <em className="text-burgundy">cookies.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cocoa">
            Short version: your brief is used to reply to you, analytics only runs
            with your permission, and nothing is sold. The details are below.
          </p>
        </div>
      </header>

      <div className="shell grid gap-12 pb-24 md:grid-cols-12 md:gap-8">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-32">
            <div className="surface-light rounded-[1.5rem] p-6">
              <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
                On this page
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${index + 1}`}
                      className="link-line font-sans text-[0.58rem] font-semibold uppercase leading-relaxed tracking-[0.1em] text-cocoa hover:text-burgundy"
                    >
                      {String(index + 1).padStart(2, "0")} · {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-burgundy/15 pt-5">
              <p className="text-xs leading-relaxed text-espresso">
                Questions about this policy?{" "}
                <a href={`mailto:${site.email}`} className="link-line text-espresso">
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </aside>

        <div className="md:col-span-8 md:col-start-5">
          <div className="flex flex-col gap-6">
            {sections.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`}>
                <div className="surface-card rounded-[1.5rem] p-6 md:p-8">
                  <div className="flex items-baseline gap-4 border-b border-burgundy/15 pb-4">
                    <span className="font-sans text-[0.55rem] font-semibold tracking-[0.14em] text-burgundy">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="serif text-2xl leading-tight text-dark md:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-5 max-w-2xl text-sm leading-[1.9] text-cocoa"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-feature border border-champagne/20 bg-burgundy p-6 text-ivory md:p-8">
            <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-champagne">
              Contact
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-champagne/90">
              Ropona Benard · Ropona Studio · {site.location}. For any privacy request, email{" "}
              <a href={`mailto:${site.email}`} className="link-line text-ivory">
                {site.email}
              </a>
              . Replies within one working day.
            </p>
            <Link
              href="/#contact"
              className="btn btn-outline mt-6"
              data-track="cta_click"
              data-track-label="privacy_contact"
            >
              Start a project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
