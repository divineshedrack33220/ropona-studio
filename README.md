# Ropona Bernard — Portfolio

A portfolio for **Ropona Bernard** — AI Video Editor, Generative AI Filmmaker &
Creative Production Specialist. Built with Next.js 15, TypeScript, Tailwind CSS
and a JSON content layer, so projects and copy can be updated without touching
component code.

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
| `/` | Single-page experience: hero, selected work, about, experience, capabilities, process, director mode, prompt direction, opportunities, contact |
| `/work` | Filterable archive of approved projects |
| `/work/[slug]` | Case study: overview, challenge, film player, direction, grade comparison, process and credits |
| `/privacy` | GDPR / NDPR policy, cookie and analytics disclosure |
| `/credits` | Licensing and colophon |
| `/api/contact` | Validated brief endpoint (Resend-ready, throttled, honeypot on the client) |

Also included: `sitemap.xml`, `robots.txt`, JSON-LD (`Person`, `WebSite`,
`CreativeWork`, `BreadcrumbList`), Open Graph
and Twitter metadata, security headers, immutable caching for `/media`, and a
404 page.

### Key interactions

- **Showreel** — muted-by-default modal player with real sound toggle, fullscreen
  control, keyboard focus trap, Escape to close and analytics events; runtime is
  read from video metadata.
- **Hover previews** — each project card lazy-loads a silent preview loop on
  hover/focus and removes it when not hovered.
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
  site.json           # identity, contact, socials, showreel, stats, tool groups
  projects.json       # 3 approved case studies — page content derives from this
  services.json       # capabilities with deliverables and outputs
  process.json        # 7-step process timeline
  about.json          # story, philosophy, expertise, credentials
  experience.json     # professional background
  director-modes.json # production disciplines
  prompt.json         # prompt direction copy
  engagements.json    # opportunity types
  credits.json        # colophon entries
```

Type definitions and accessors live in `lib/types.ts` and `lib/content.ts`.

### Add a new project

1. Add stills to `public/media/` (e.g. `work-newproject.jpg`,
   `work-newproject-flat.jpg`, `work-newproject-frame-1.jpg`).
2. Add a preview loop at `public/media/film-newproject.mp4` (6s, silent, 960×540).
3. Append an object to `content/projects.json` — copy an existing entry and edit
   `slug`, `title`, `client`, `category`, copy, `gallery`, `credits`.
4. Run `npm run build`. The route, sitemap entry and archive card are generated
   automatically.

Valid categories: `AI Film`, `Commercial`, `Editing`, `Explainer`,
`Documentary`, `Storytelling`. Update `categories` in `lib/content.ts` if you
add a new one.

### Update the showreel

Replace `public/media/showreel.mp4` (H.264/AAC, 16:9) and its poster. The
displayed runtime is read from the video metadata; `duration` in
`content/site.json → showreel` is only the fallback before metadata loads.

### Update imagery

Project stills and preview clips are presented as approved work samples. Replace
or approve media before publishing, and keep confidential client identity out of
filenames, thumbnails, embeds and metadata.

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
CONTACT_TO=Bernardrops@gmail.com
CONTACT_FROM="Ropona Bernard <onboarding@resend.dev>"
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
`service_toggle`, `form_submit`, `outbound_click`.
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
video libraries, move files to a video host and update the
`thumbnail`/`preview`/`src` fields in content — no component changes needed.

---

## Before going live

- [ ] Verify the contact email and LinkedIn URL in `content/site.json`.
- [ ] Replace or approve stills, showreel and project media before publishing.
- [ ] Keep only approved work samples and anonymised client references.
- [ ] Add an AI-focused CV only when a current version is supplied.
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

Design system: burgundy & champagne editorial palette — taupe canvas (`#A08C71`),
burgundy (`#601E21`), champagne surfaces (`#D9C9AD` / `#E5D7BD`), espresso
(`#36130F`) and ivory text (`#F2E8D5`), with cocoa (`#6B4F3B`) for secondary copy
on champagne. Instrument Serif for headlines, Inter for body and labels. Tokens
live in `tailwind.config.ts` and `app/globals.css`.
