# Ropona Benard — Studio Portfolio

A cinematic, conversion-focused portfolio for **Ropona Benard** — Creative Director,
AI Filmmaker & Professional Video Editor. Built with Next.js 15, TypeScript,
Tailwind CSS and a JSON content layer, so projects, services and testimonials can
be updated without touching component code.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run typecheck    # strict TypeScript check
```

Node 20+ recommended.

---

## What's included

| Route | Purpose |
| --- | --- |
| `/` | Long-form single-page experience: hero showreel, selected work, about, services, process, testimonials, engagements, contact |
| `/work` | Filterable archive of all projects |
| `/work/[slug]` | Case study: overview, challenge, direction, film player, before/after grade comparison, process, results, testimonial, credits |
| `/privacy` | GDPR / NDPR policy, cookie and analytics disclosure |
| `/credits` | Licensing and colophon |
| `/api/contact` | Validated brief endpoint (Resend-ready, throttled, honeypot on the client) |

Also included: `sitemap.xml`, `robots.txt`, JSON-LD (`Person`,
`ProfessionalService`, `WebSite`, `CreativeWork`, `BreadcrumbList`), Open Graph
and Twitter metadata, security headers, immutable caching for `/media`, and a
404 page.

### Key interactions

- **Showreel** — autoplay muted hero loop with a real sound toggle, full-screen
  modal player, keyboard focus trap, Escape to close, analytics events.
- **Hover previews** — each project card lazy-loads a silent 6-second loop on
  hover/focus (desktop only, paused when not hovered).
- **Route transitions** — each page settles in with a subtle vertical drift via
  `app/template.tsx`; removed entirely under `prefers-reduced-motion`.
- **Filterable work** — category filters with counts, animated entry, empty state.
- **Before / after grade slider** — keyboard-accessible range input comparing the
  ungraded plate to the final grade.
- **Scroll choreography** — intersection-based reveals, scroll progress rail on
  case studies, animated process timeline, minimal parallax-free motion.
- **Contact form** — inline validation, honeypot, in-memory rate limiting,
  clear success and failure states.
- **Consent-first analytics** — Google Analytics loads only after acceptance;
  CTA, form and video events are tracked via `data-track` attributes.

Accessibility: skip link, semantic landmarks, visible focus rings, labelled
controls, `aria-expanded`/`aria-pressed` states, alt text on all imagery,
`prefers-reduced-motion` support throughout.

---

## Content management

All copy and media references live in `/content` — no CMS account needed to
launch, and easy to swap for a headless CMS later.

```
content/
  site.json          # identity, contact, socials, showreel, clients, stats, tools
  projects.json      # 9 case studies — all page content derives from this
  services.json      # 7 services with deliverables and use cases
  process.json       # 7-step process timeline
  about.json         # story, philosophy, expertise, credentials
  testimonials.json  # verified client quotes
  pricing.json       # engagement models
  credits.json       # colophon entries
```

Type definitions and accessors live in `lib/types.ts` and `lib/content.ts`.

### Add a new project

1. Add stills to `public/media/` (e.g. `work-newproject.jpg`,
   `work-newproject-flat.jpg`, `work-newproject-frame-1.jpg`).
2. Add a preview loop at `public/media/film-newproject.mp4` (6s, silent, 960×540).
3. Append an object to `content/projects.json` — copy an existing entry and edit
   `slug`, `title`, `category`, copy, `results`, `gallery`, `credits`.
4. Run `npm run build`. The route, sitemap entry and archive card are generated
   automatically.

Valid categories: `AI Film`, `Commercial`, `Editing`, `Storytelling`. Update
`categories` in `lib/content.ts` if you add a new one.

### Update the showreel

Replace `public/media/showreel.mp4` (H.264/AAC, 16:9). Update the duration,
tagline and note in `content/site.json → showreel`. The hero poster is
`/media/hero.jpg`.

### Replace placeholder imagery

The current stills are original procedural light studies generated in-house
(see `/credits`). They are intentionally cinematic and license-free, designed to
be swapped one-for-one with real frames at the same paths.

### Swapping in a CMS

The content layer is deliberately narrow: `lib/content.ts` imports JSON and
exports typed arrays. Replace those imports with CMS fetches (Sanity, Contentful,
Notion, Payload) and the rest of the site keeps working. Each page uses
`generateStaticParams` for project slugs, so ISR or static builds work unchanged.

---

## Contact form delivery

The API route works out of the box (logs leads) and can deliver email with
Resend:

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO=hello@ropona.studio
CONTACT_FROM="Ropona Studio <briefs@ropona.studio>"
```

Without a key, submissions are validated, rate-limited and logged with PII
redacted — useful for staging. Swap in Postmark/SendGrid by editing
`sendWithResend()` in `app/api/contact/route.ts`.

---

## Analytics

1. Create a GA4 property.
2. Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` (or `analytics.gaId` in
   `content/site.json`).
3. Nothing loads until the visitor accepts cookies.

Events emitted: `cta_click`, `showreel_play`, `showreel_sound_toggle`,
`video_play`, `portfolio_filter`, `film_play`, `project_next`,
`service_toggle`, `form_submit`, `outbound_click`, `cv_download`.
Add tracking to any new element with `data-track="event_name"` and
`data-track-label="label"`.

---

## Deploy

### GitHub + Render (recommended)

The site runs as a Node web service, so SSR, `next/image`, API routes and
security headers all work.

1. Push this repository to GitHub (public).
2. In Render: **New → Blueprint**, pick the repo, and apply `render.yaml`.
   Or **New → Web Service** with:
   - Runtime: Node
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`
3. Set the env vars in the Render dashboard: `NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
4. Add the custom domain under **Settings → Custom Domains**.

Notes: the free instance sleeps after inactivity (first request is slow); the
Starter plan keeps it warm. `render.yaml` pins Node 22 via `package.json`
`engines`.

### Vercel

```bash
npm i -g vercel
vercel
```

Set the same environment variables in the project dashboard. `vercel.json`
pins the framework and security headers.

### Netlify

Build command `npm run build`, publish directory `.next` using the official
Next.js runtime. Set the same environment variables.

### Self-hosted

```bash
npm run build && npm start   # behind nginx/Caddy with TLS
```

Media is served from `/public/media` with immutable caching. For very large
video libraries, move files to Mux, Cloudflare Stream or Vimeo and update the
`thumbnail`/`preview`/`src` fields in content — no component changes needed.

---

## Before going live

- [ ] Replace placeholder email, phone, WhatsApp, booking link and socials in
      `content/site.json`.
- [ ] Replace the procedural stills and showreel with real project assets.
- [ ] Confirm metrics and testimonials with clients; remove any that are not
      verified.
- [ ] Add `public/ropona-cv.pdf` (a starter PDF is included — replace it).
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain (OG image and JSON-LD
      absolute URLs depend on it).
- [ ] Configure the Resend key and test a live submission.
- [ ] Add the GA4 ID and verify consent behaviour.
- [ ] Run Lighthouse on mobile and desktop; confirm LCP < 2.5s.

---

## Project structure

```
app/                  routes, metadata, sitemap, robots, API
components/           presentation and interaction (client components marked)
content/              the CMS — JSON content files
lib/                  typed content accessors, analytics, utils
public/media/         stills, preview loops, showreel, OG image
public/favicon.svg    placeholder mark, easy to swap for the final identity
```

Design system: deep ink palette (`#08080a`), bone text (`#f3efe6`), muted gold
accent (`#c9a96b`); Instrument Serif for headlines, Inter for UI, IBM Plex Mono
for labels. Tokens live in `tailwind.config.ts` and `app/globals.css`.
