# Build Plan

## Goal

A personal brand platform that turns social/search traffic into owned email subscribers. Every page earns its place by supporting at least one of: email capture, trust-building, curiosity, or identity.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** — CSS-first config via `@theme` in `globals.css`, no `tailwind.config.js`
- **MDX** — for Field Notes and Project pages (content as code, co-located with components)
- **Supabase** — email storage (not yet installed)
- **Resend** — transactional + broadcast email (not yet installed)
- **Vercel** — deployment target with custom domain

---

## Phases

### Phase 1 — Scaffold

- [x] Initialize Next.js + TypeScript + Tailwind v4
- [x] Configure MDX (`@next/mdx`) — `next.config.ts`, `src/mdx-components.tsx`, placeholder content
- [ ] Deploy to Vercel, connect custom domain
- [ ] Verify Tailwind v4 `@theme` tokens are wired correctly

### Phase 2 — Homepage

- [ ] Hero section with positioning statement ("early to an unfolding journey" feel)
- [ ] Navigation (minimal — no nav until there are pages to link to)
- [ ] Intro video embed (lazy-loaded, no third-party scripts that hurt CWV)
- [ ] Email capture CTA (static form UI first, wired in Phase 4)

### Phase 3 — Content

- [ ] Field Notes index page (`/field-notes`) + individual note pages (`/field-notes/[slug]`)
- [ ] Projects index page (`/projects`) + individual project pages (`/projects/[slug]`)
- [ ] Populate with initial content (at least 1–2 of each to ship non-empty)
- [ ] Per-page `metadata` export on every route (title, description, OG, Twitter)

### Phase 4 — Email

- [ ] Install and configure Supabase client (`src/lib/supabase.ts`)
- [ ] Install and configure Resend client (`src/lib/resend.ts`)
- [ ] Server Action for email capture (`src/app/email-signup-action.ts`)
- [ ] Wire form to action with success/error state (client component)
- [ ] Add `.env.example` once keys are known

### Phase 5 — Polish

- [ ] SEO: sitemap, robots.txt, structured data where relevant
- [ ] Mobile responsiveness pass across all pages
- [ ] Typography and reading experience (line length, spacing, font scale)
- [ ] Performance audit: minimize JS, favor Server Components, check CWV
- [ ] Lighthouse / Vercel analytics baseline

---

## Scope Guard

Do not build: portfolio grids, resume sections, user accounts, admin panels, CMS UIs, analytics dashboards, social login, or pages for content that doesn't exist yet.

Before adding anything, ask: does this directly support email capture, trust, or curiosity?
