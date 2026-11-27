import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilmPlayer } from "@/components/FilmPlayer";
import { BeforeAfter } from "@/components/BeforeAfter";
import { PageProgress } from "@/components/PageProgress";
import { Reveal } from "@/components/Reveal";
import { getNextProject, getProject, projects, site } from "@/lib/content";
import { paragraphs } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ropona-studio-bldm.onrender.com";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const title = project.title;
  return {
    title,
    description: `${project.description} A ${project.category.toLowerCase()} project by Ropona Bernard.`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} — Ropona Bernard`,
      description: project.description,
      images: [{ url: project.thumbnail, width: 1800, height: 1125, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Ropona Bernard`,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const clientLabel =
    project.client === "Confidential" ? "Anonymised sample" : project.client;

  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Category", value: project.category },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: site.name, url: siteUrl },
    datePublished: project.year,
    genre: project.category,
    keywords: project.tags.join(", "),
    image: `${siteUrl}${project.thumbnail}`,
    url: `${siteUrl}/work/${project.slug}`,
    about: project.client,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/work` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteUrl}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <PageProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <article>
        <header className="shell pb-8 pt-24 md:pt-28">
          <div className="surface-card rounded-feature p-5 md:p-7 lg:p-8">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-3 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-cocoa"
            >
              <Link href="/work" className="link-line text-burgundy hover:text-burgundySoft">
                Work
              </Link>
              <span aria-hidden="true" className="text-burgundy/30">/</span>
              <span className="text-cocoa">{project.title}</span>
            </nav>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="rounded-full border border-burgundy/25 bg-champagneLight px-3 py-1.5 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                {project.category}
              </span>
              <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
                {project.year}
              </span>
              <span aria-hidden="true" className="hidden h-px w-8 bg-burgundy/25 sm:block" />
              <span className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
                {clientLabel}
              </span>
            </div>

            <h1 className="serif mt-5 max-w-6xl text-[clamp(2.6rem,5.6vw,5.6rem)] leading-[0.96] tracking-[-0.03em] text-dark">
              {project.title}
              <span className="mt-3 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                {clientLabel}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cocoa md:text-lg">
              {project.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="surface-light rounded-card p-4">
                  <dt className="font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-burgundy">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-xs leading-relaxed text-cocoa md:text-sm">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="shell">
          <Reveal>
            <figure>
              <div className="media-frame relative mx-auto aspect-ig-square w-full max-w-3xl">
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} — ${project.category.toLowerCase()} still by Ropona Bernard.`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56rem"
                  className="object-cover"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-espresso/85 px-3 py-2 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-champagne">
                  {clientLabel} / {project.year}
                </span>
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-espresso">
                <span>{project.role}</span>
                <span>{project.location}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <section className="section">
          <div className="shell grid gap-7 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-3">
              <Reveal className="flex items-center gap-3">
                <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                  01
                </span>
                <span className="h-px w-6 bg-burgundy/50" />
                <span className="eyebrow">Overview</span>
              </Reveal>
            </div>
            <Reveal delay={80} className="md:col-span-8">
              <div className="surface-card rounded-feature p-5 md:p-7">
                <p className="serif max-w-3xl text-[clamp(1.35rem,2.2vw,2.2rem)] leading-[1.35] text-dark">
                  {project.overview}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-burgundy/15 py-12 md:py-16">
          <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <Reveal className="flex items-center gap-3">
                <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                  02
                </span>
                <span className="h-px w-6 bg-burgundy/50" />
                <span className="eyebrow">The challenge</span>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              {paragraphs(project.challenge).map((paragraph, index) => (
                <Reveal key={index} delay={index * 60}>
                  <p className="mb-5 max-w-2xl text-[0.92rem] leading-[1.8] text-espresso last:mb-0">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-burgundy/15 bg-champagne/35 py-12 md:py-16">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                03
              </span>
              <span className="h-px w-6 bg-burgundy/50" />
              <span className="eyebrow">The film</span>
            </div>
            <div className="mt-8 md:mt-10">
              <Reveal>
                <FilmPlayer
                  src={project.preview}
                  poster={project.thumbnail}
                  title={project.title}
                  caption={`${project.title} / ${clientLabel} / ${project.year} / Production & edit by Ropona Bernard`}
                  note="Approved work sample"
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-burgundy/15 py-12 md:py-16">
          <div className="shell">
            <div className="grid gap-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <Reveal className="flex items-center gap-3">
                  <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                    04
                  </span>
                  <span className="h-px w-6 bg-burgundy/50" />
                  <span className="eyebrow">The direction</span>
                </Reveal>
              </div>
              <div className="md:col-span-8">
                {paragraphs(project.approach).map((paragraph, index) => (
                  <Reveal key={index} delay={index * 60}>
                    <p className="mb-5 max-w-2xl text-[0.92rem] leading-[1.8] text-espresso last:mb-0">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <h2 className="sr-only">The direction</h2>
            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
              {project.pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 70} className="surface-card p-5 md:p-6">
                  <span className="font-sans text-[0.55rem] font-semibold tracking-[0.12em] text-espresso">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="serif mt-3 text-xl leading-tight text-burgundy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">
                    {pillar.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {project.beforeAfter && (
          <section className="border-t border-burgundy/15 py-12 md:py-16">
            <div className="shell">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                      05
                    </span>
                    <span className="h-px w-6 bg-burgundy/50" />
                    <span className="eyebrow">The grade</span>
                  </div>
                  <h2 className="serif mt-5 max-w-xl text-[clamp(1.7rem,3vw,3rem)] leading-tight text-dark">
                    From flat plate to{" "}
                    <span className="text-burgundy">final frame.</span>
                  </h2>
                </div>
                <p className="max-w-xs font-sans text-[0.52rem] font-semibold uppercase leading-[1.8] tracking-[0.12em] text-espresso">
                  Drag the handle to compare the ungraded plate with the final
                  cinematic grade.
                </p>
              </div>

              <Reveal className="mt-10">
                <BeforeAfter
                  image={project.beforeAfter.image}
                  flat={project.beforeAfter.flat}
                  note={project.beforeAfter.note}
                  title={project.title}
                />
              </Reveal>
            </div>
          </section>
        )}

        <section className="border-t border-burgundy/15 py-12 md:py-16">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                06
              </span>
              <span className="h-px w-6 bg-burgundy/50" />
              <span className="eyebrow">The process</span>
            </div>
            <h2 className="serif mt-5 max-w-2xl text-[clamp(1.7rem,3vw,3rem)] leading-tight text-dark">
              How the film was made.
            </h2>

            <div className="mt-8 grid gap-x-8 md:mt-10 md:grid-cols-2">
              {project.process.map((step, index) => (
                <Reveal
                  key={step.step}
                  delay={index * 50}
                  className="border-t border-burgundy/15 py-5 md:py-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans text-[0.55rem] font-semibold tracking-[0.12em] text-espresso">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="serif text-xl text-burgundy md:text-2xl">
                      {step.step}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-lg pl-8 text-sm leading-[1.8] text-espresso">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-burgundy/15 py-12 md:py-16">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                07
              </span>
              <span className="h-px w-6 bg-burgundy/50" />
              <span className="eyebrow">Frames & process</span>
            </div>

            <div className="mt-6 grid gap-4 md:mt-8">
              <Reveal>
                <figure className="mx-auto max-w-3xl">
                  <div className="media-frame relative aspect-ig-square">
                    <Image
                      src={project.gallery[0]?.src ?? project.thumbnail}
                      alt={project.gallery[0]?.caption ?? project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 56rem"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-espresso">
                    {project.gallery[0]?.caption}
                  </figcaption>
                </figure>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {project.gallery.slice(1).map((item, index) => (
                  <Reveal key={item.src} delay={index * 70}>
                    <figure>
                      <div className="media-frame relative aspect-ig-square">
                        <Image
                          src={item.src}
                          alt={item.caption}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-espresso">
                        {item.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-burgundy/15 bg-champagne/55 py-12 md:py-16">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-espresso">
                08
              </span>
              <span className="h-px w-6 bg-burgundy/50" />
              <span className="eyebrow">Credits & delivery</span>
            </div>

            <div className="mt-8 grid gap-7 border-t border-burgundy/15 pt-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
                  Credits
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {project.credits.map((credit) => (
                    <li key={credit} className="text-xs leading-relaxed text-espresso">
                      {credit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-4">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
                  Status
                </p>
                <p className="mt-4 text-xs leading-relaxed text-espresso">
                  {project.year} · {clientLabel}
                </p>
              </div>
              <div className="md:col-span-4">
                <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-burgundy">
                  Pipeline
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Research",
                    "Prompt direction",
                    "Generative production",
                    "Editing",
                    "Sound",
                    "Finishing",
                  ].map((stage) => (
                    <span
                      key={stage}
                      className="rounded-full border border-burgundy/20 bg-champagne px-2 py-1 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-espresso"
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell py-12 md:py-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-espresso">
                Next project
              </p>
              <Link
                href={`/work/${next.slug}`}
                className="group mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2"
                data-track="project_next"
                data-track-label={next.slug}
              >
                <span className="serif text-[clamp(1.9rem,3.6vw,3.6rem)] leading-none text-burgundy transition-colors duration-500 group-hover:text-burgundySoft">
                  {next.title}
                </span>
                <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-espresso">
                  {next.category}
                </span>
                <span aria-hidden="true" className="project-arrow ml-2 text-xl text-burgundy">
                  ↗
                </span>
              </Link>
            </div>
            <Link
              href="/#contact"
              className="btn btn-gold shrink-0"
              data-track="cta_click"
              data-track-label="project_footer_contact"
            >
              Get in touch <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mx-auto mt-8 block w-full max-w-sm overflow-hidden rounded-panel border border-burgundy/20"
            aria-label={`Next project: ${next.title}`}
            tabIndex={-1}
          >
            <div className="relative aspect-ig-square">
              <Image
                src={next.thumbnail}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 24rem"
                className="object-cover transition-transform duration-[1400ms] ease-cinema group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </section>
      </article>
    </>
  );
}
