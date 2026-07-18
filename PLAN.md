# Build Plan

## Goal

A personal brand platform that turns social/search traffic into owned email subscribers. Every page earns its place by supporting at least one of: email capture, trust-building, curiosity, or identity.

## Site Structure

- `/` — homepage: who I am, why to follow, path to email capture
- `/newsletter` — dedicated email signup page (needs a rebuilt form UI)
- `/field-notes` + `/field-notes/[slug]` — short essays/notes, MDX in `src/content/field-notes/`
- `/projects` + `/projects/[slug]` — projects tracked in public, MDX in `src/content/projects/`

All routes exist and build; markup is bare after the July 2026 visual reset.

## Done (survived the reset)

- [x] Next.js 16 + TypeScript + Tailwind v4 scaffold, deployed to Vercel with custom domain
- [x] MDX pipeline (`@next/mdx`): dynamic slug pages, `generateStaticParams`, per-page metadata
- [x] Resend client (`src/lib/resend.ts`) + email capture Server Action (`src/app/email-signup-action.ts`)
- [x] Per-page `metadata` export on every route (title, description, OG, Twitter)

## To Build

### Content

- [ ] Write real Field Notes (at least 1–2 to ship non-empty)
- [ ] Write real Project pages (at least 1–2)
- [ ] Homepage copy: positioning statement, "early to an unfolding journey" feel
- [ ] Newsletter page copy: what subscribers get, why join now

### Email capture

- [ ] Rebuild the signup form UI (client component wired to the existing Server Action, success/error states)
- [ ] Place it on `/newsletter` and wherever else it earns its spot
- [ ] Add `.env.example` documenting required keys

### Structure & polish

- [ ] Navigation that fits the new design (plain links in `layout.tsx` for now)
- [ ] SEO: sitemap, robots.txt, structured data where relevant
- [ ] Favicon / logo assets (deleted in the reset)
- [ ] Performance: minimize JS, favor Server Components, check CWV

## Scope Guard

Do not build: portfolio grids, resume sections, user accounts, admin panels, CMS UIs, analytics dashboards, social login, or pages for content that doesn't exist yet.

Before adding anything, ask: does this directly support email capture, trust, or curiosity?
