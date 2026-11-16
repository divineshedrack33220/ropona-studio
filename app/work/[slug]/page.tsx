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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ropona.studio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.title} — ${project.filmTitle}`;
  return {
    title,
    description: `${project.description} ${project.role}. A ${project.category.toLowerCase()} project by Ropona Benard.`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} — Ropona Benard`,
      description: project.description,
      images: [{ url: project.thumbnail, width: 1800, height: 1125, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Ropona Benard`,
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

  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Category", value: project.category },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} — ${project.filmTitle}`,
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
        <header className="shell pb-12 pt-32 md:pt-40">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">
            <Link href="/work" className="link-line hover:text-bone">
              Work
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-mist">{project.title}</span>
          </nav>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="border border-gold/30 px-2.5 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-goldsoft">
              {project.category}
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">
              {project.year}
            </span>
            <span className="hidden h-px w-8 bg-white/20 sm:block" />
            <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
              {project.outcome}
            </span>
          </div>

          <h1 className="serif mt-7 max-w-6xl text-[clamp(3rem,7.4vw,7.6rem)] leading-[0.9] tracking-[-0.035em]">
            {project.title}
            <span className="block italic text-goldsoft">{project.filmTitle}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">
            {project.description}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-px border-y border-white/10 bg-white/10 md:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="bg-ink px-4 py-5 md:px-5 md:py-6">
                <dt className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-muted">
                  {item.label}
                </dt>
                <dd className="mt-2 text-xs leading-relaxed text-bone md:text-sm">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="shell">
          <Reveal>
            <figure>
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10 md:aspect-[21/9]">
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} — ${project.filmTitle}. A ${project.category.toLowerCase()} film by Ropona Benard.`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />
                <span className="absolute bottom-4 left-4 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-bone/70">
                  {project.filmTitle} / {project.year}
                </span>
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                <span>{project.role}</span>
                <span>{project.location}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <section className="section">
          <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <Reveal className="flex items-center gap-3">
                <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">01</span>
                <span className="h-px w-6 bg-gold/60" />
                <span className="eyebrow">Overview</span>
              </Reveal>
            </div>
            <Reveal delay={80} className="md:col-span-8">
              <p className="serif max-w-3xl text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.3] text-bone">
                {project.overview}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 md:py-24">
          <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <Reveal className="flex items-center gap-3">
                <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">02</span>
                <span className="h-px w-6 bg-gold/60" />
                <span className="eyebrow">The challenge</span>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              {paragraphs(project.challenge).map((paragraph, index) => (
                <Reveal key={index} delay={index * 60}>
                  <p className="mb-5 max-w-2xl text-[1.02rem] leading-[1.9] text-mist last:mb-0">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 md:py-24">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">03</span>
              <span className="h-px w-6 bg-gold/60" />
              <span className="eyebrow">The film</span>
            </div>
            <div className="mt-8 md:mt-10">
              <Reveal>
                <FilmPlayer
                  src={project.preview}
                  poster={project.thumbnail}
                  title={`${project.title} — ${project.filmTitle}`}
                  caption={`${project.title} / ${project.filmTitle} / ${project.year} / Directed & edited by Ropona Benard`}
                  note={project.preview ? "Preview cut · full film available on request" : "Selected stills · full film available on request"}
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 md:py-24">
          <div className="shell">
            <div className="grid gap-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <Reveal className="flex items-center gap-3">
                  <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">04</span>
                  <span className="h-px w-6 bg-gold/60" />
                  <span className="eyebrow">The direction</span>
                </Reveal>
              </div>
              <div className="md:col-span-8">
                {paragraphs(project.approach).map((paragraph, index) => (
                  <Reveal key={index} delay={index * 60}>
                    <p className="mb-5 max-w-2xl text-[1.02rem] leading-[1.9] text-mist last:mb-0">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <h2 className="sr-only">The direction</h2>
            <div className="mt-14 grid gap-px bg-white/10 md:mt-20 md:grid-cols-3">
              {project.pillars.map((pillar, index) => (
                <Reveal
                  key={pillar.title}
                  delay={index * 70}
                  className="bg-ink p-6 md:p-8"
                >
                  <span className="font-mono text-[0.55rem] tracking-[0.14em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="serif mt-4 text-2xl leading-tight text-bone">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {pillar.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {project.beforeAfter && (
          <section className="border-t border-white/10 py-16 md:py-24">
            <div className="shell">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">05</span>
                    <span className="h-px w-6 bg-gold/60" />
                    <span className="eyebrow">The grade</span>
                  </div>
                  <h2 className="serif mt-5 max-w-xl text-[clamp(1.9rem,3.4vw,3.4rem)] leading-tight">
                    From flat plate to <em className="text-goldsoft">final frame.</em>
                  </h2>
                </div>
                <p className="max-w-xs font-mono text-[0.52rem] uppercase leading-[1.8] tracking-[0.14em] text-muted">
                  Drag the handle to compare the ungraded plate with the final
                  cinematic grade.
                </p>
              </div>

              <Reveal className="mt-10">
                <BeforeAfter
                  image={project.beforeAfter.image}
                  flat={project.beforeAfter.flat}
                  note={project.beforeAfter.note}
                  title={`${project.title} — ${project.filmTitle}`}
                />
              </Reveal>
            </div>
          </section>
        )}

        <section className="border-t border-white/10 py-16 md:py-24">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">06</span>
              <span className="h-px w-6 bg-gold/60" />
              <span className="eyebrow">The process</span>
            </div>
            <h2 className="serif mt-5 max-w-2xl text-[clamp(1.9rem,3.4vw,3.4rem)] leading-tight">
              How the film was made.
            </h2>

            <div className="mt-10 grid gap-x-10 md:mt-14 md:grid-cols-2">
              {project.process.map((step, index) => (
                <Reveal
                  key={step.step}
                  delay={index * 50}
                  className="border-t border-white/10 py-6 md:py-8"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.55rem] tracking-[0.14em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="serif text-xl text-bone md:text-2xl">{step.step}</h3>
                  </div>
                  <p className="mt-3 max-w-lg pl-8 text-sm leading-[1.8] text-mist">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 md:py-24">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">07</span>
              <span className="h-px w-6 bg-gold/60" />
              <span className="eyebrow">Frames & process</span>
            </div>

            <div className="mt-8 grid gap-4 md:mt-10">
              <Reveal>
                <figure>
                  <div className="relative aspect-[21/10] overflow-hidden border border-white/10">
                    <Image
                      src={project.gallery[0]?.src ?? project.thumbnail}
                      alt={project.gallery[0]?.caption ?? project.title}
                      fill
                      sizes="(max-width: 1680px) 100vw, 1600px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                    {project.gallery[0]?.caption}
                  </figcaption>
                </figure>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {project.gallery.slice(1).map((item, index) => (
                  <Reveal key={item.src} delay={index * 70}>
                    <figure>
                      <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                        <Image
                          src={item.src}
                          alt={item.caption}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                        {item.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-coal py-16 md:py-24">
          <div className="shell">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.58rem] tracking-[0.16em] text-gold">08</span>
              <span className="h-px w-6 bg-gold/60" />
              <span className="eyebrow">The outcome</span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
              {project.results.map((result, index) => (
                <Reveal
                  key={result.label}
                  delay={index * 60}
                  className="bg-coal p-5 md:p-7"
                >
                  <p className="serif text-[clamp(2.2rem,3.8vw,3.8rem)] leading-none text-goldsoft">
                    {result.value}
                  </p>
                  <p className="mt-3 text-[0.68rem] leading-relaxed text-mist">
                    {result.label}
                  </p>
                </Reveal>
              ))}
            </div>

            {project.testimonial && (
              <Reveal className="mt-14 max-w-4xl">
                <blockquote className="serif text-[clamp(1.5rem,2.8vw,2.8rem)] leading-[1.25] text-bone">
                  “{project.testimonial.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold" />
                  <div>
                    <p className="text-sm text-bone">{project.testimonial.name}</p>
                    <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-muted">
                      {project.testimonial.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            )}

            <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="eyebrow mb-4">Credits</p>
                <ul className="flex flex-col gap-2">
                  {project.credits.map((credit) => (
                    <li key={credit} className="text-xs leading-relaxed text-mist">
                      {credit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-4">
                <p className="eyebrow mb-4">Status</p>
                <p className="text-xs leading-relaxed text-mist">
                  Delivered {project.year}. Selected metrics are reported by the
                  client or measured across public platforms. Full case study deck
                  available on request.
                </p>
              </div>
              <div className="md:col-span-4">
                <p className="eyebrow mb-4">Pipeline</p>
                <div className="flex flex-wrap gap-2">
                  {site.tools.slice(0, 8).map((tool) => (
                    <span
                      key={tool}
                      className="border border-white/10 px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.08em] text-muted"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell py-16 md:py-24">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Next project</p>
              <Link
                href={`/work/${next.slug}`}
                className="group mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2"
                data-track="project_next"
                data-track-label={next.slug}
              >
                <span className="serif text-[clamp(2.2rem,4.6vw,4.6rem)] leading-none text-bone transition-colors duration-500 group-hover:text-goldsoft">
                  {next.title}
                </span>
                <span className="serif text-[clamp(1.4rem,2.6vw,2.6rem)] italic leading-none text-muted">
                  {next.filmTitle}
                </span>
                <span className="ml-2 text-xl text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
            <Link
              href="/#contact"
              className="btn btn-gold"
              data-track="cta_click"
              data-track-label="project_footer_start"
            >
              Start a project <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-10 block overflow-hidden border border-white/10"
            aria-label={`Next project: ${next.title}`}
            tabIndex={-1}
          >
            <div className="relative aspect-[21/8]">
              <Image
                src={next.thumbnail}
                alt=""
                fill
                sizes="(max-width: 1680px) 100vw, 1600px"
                className="object-cover transition-transform duration-[1400ms] ease-cinema group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </Link>
        </section>
      </article>
    </>
  );
}
