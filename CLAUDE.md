# My Website

A personal brand platform that converts traffic from social media, search, and professional networks into long-term audience ownership through email capture, while documenting my growth, ideas, and entrepreneurial journey in public.

## Primary Goal

Collect emails from followers, friends, recruiters, investors, potential partners, and anyone who wants to follow my journey.

Every page and section should support at least one of: capture an email, build trust, increase curiosity, explain who I am, show momentum, create future opportunity.

Visitors should leave thinking: *"I want to keep following this person. Something interesting is unfolding here."*

## Brand Positioning

Not a portfolio, resume site, or single-product site. It positions me as a future entrepreneur, lifelong learner, ambitious builder, and transparent storyteller documenting growth in public. Visitors should feel like they are early to an unfolding journey.

## File Structure & Organization

File structure is a first-class concern. Treat it as part of the work, not cleanup for later. Every session I should leave the tree easier to navigate than I found it. The structure itself should communicate the architecture at a glance.

Rules:
- Every folder has one clear purpose
- Related things live together
- Name files for what they DO, not what they ARE (`EmailSignup.tsx`, not `Form.tsx`)
- Prefer small, focused modules over catch-all files
- Add structure only when it earns its keep — no NEW empty scaffolding beyond the agreed skeleton in Project Structure

Before creating any new file, ask:
1. Where would I naturally look for this later?
2. Does this location still make sense as the project grows?
3. Does an existing file already belong to this concern?

## Voice & Tone

First-person, transparent, ambitious without being grandiose. Specific over generic. Warm, curious, plain-spoken. No corporate jargon, no hype words ("revolutionary", "unlock", "synergy"), no buzzwords. Short sentences are fine. Honest about being early.

**Hard rule: no em dashes, en dashes, or hyphens used as punctuation anywhere in site copy, titles included.** Rewrite the sentence instead (period, comma, colon, or restructure). Hyphens inside compound words (e.g. long-distance) are fine. No exceptions.

## Scope Guard — What NOT to Build

Before adding anything, ask: does this directly support email capture, trust, or curiosity? If not, don't build it.

- No portfolio grids, resume sections, or product-specific landing pages
- No social login or user accounts — the only "signup" is the email list
- No admin panels, CMS UIs, or analytics dashboards unless explicitly requested
- No third-party widgets/scripts that hurt page speed
- Don't pre-build pages for content that doesn't exist yet
- Don't create empty folders or placeholder files just to fill out structure

## Tech Stack

- Next.js 16 (App Router) + React 19 — **has breaking changes from training data; consult `node_modules/next/dist/docs/` before assuming any API (see `AGENTS.md`, which duplicates this note for other tools; update both together)**
- TypeScript
- MDX (via `@next/mdx`) — content layer for Articles and Projects; files live in `src/content`
- Tailwind CSS v4 — CSS-first config in `src/app/globals.css` via `@theme`; **no `tailwind.config.js`**
- Vercel — deployment target
- Resend — installed; client in `src/lib/resend.ts`, server action in `src/app/email-signup-action.ts` (transactional + broadcast email)
- Supabase — *planned, not yet installed* (overkill right now, maybe later)

When wiring Supabase/Resend, install and create their clients in `src/lib/` and read keys from env vars — don't hardcode anything.

## Claude Code Model

Default model for this project: **Sonnet 4.6** (`claude-sonnet-4-6`)

## Development Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build locally
- `npm run lint` — eslint

## Project Structure

Live tree (kept accurate as the project grows):

```
my-website/
├── AGENTS.md                   # READ FIRST when touching Next.js — canonical docs in node_modules/next/dist/docs/
├── CLAUDE.md                   # this file
├── HANDOFF.md                  # session handoff — authoritative current state, read first
├── PLAN.md                     # build plan
├── README.md
├── .env                        # local secrets, gitignored
├── .env.example                # variable names only, committed
├── public/                     # static assets — empty after the reset
└── src/
    ├── mdx-components.tsx      # required by @next/mdx App Router — global MDX component overrides (empty for now)
    ├── app/                    # App Router: routes, layouts, route handlers
    │   ├── layout.tsx          # root layout — global metadata template, plain nav links
    │   ├── page.tsx            # homepage
    │   ├── globals.css         # Tailwind v4 entry (no @theme tokens yet)
    │   ├── email-signup-action.ts  # Resend server action — handles email list subscribe
    │   ├── newsletter/
    │   │   └── page.tsx        # /newsletter — email signup page (form UI to be rebuilt)
    │   ├── articles/
    │   │   ├── page.tsx        # Articles index
    │   │   └── [slug]/
    │   │       └── page.tsx    # STUB: calls notFound() unconditionally (src/content/articles/ is empty, Turbopack can't compile the dynamic MDX import against zero files) — restore MDX rendering from git history when the first article lands
    │   └── projects/
    │       ├── page.tsx        # Projects index
    │       └── [slug]/
    │           └── page.tsx    # STUB: calls notFound() unconditionally (src/content/projects/ is empty, same Turbopack constraint) — restore MDX rendering from git history when the first project lands
    ├── content/                # MDX source files (one file per article/project, filename = slug) — empty after the reset
    │   ├── articles/           # Articles — .mdx files, export metadata + default component
    │   └── projects/           # Projects — .mdx files, export metadata + default component
    ├── components/             # (removed in the reset — recreate when the new design starts)
    ├── config/                 # site-wide constants
    │   └── site.ts             # metadata, socialLinks, site-level config
    └── lib/                    # utilities + service clients
        ├── format-date.ts      # shared date formatting utility
        ├── get-articles.ts     # ArticleMetadata type + getArticleSlugs()
        ├── get-projects.ts     # ProjectMetadata type + getProjectSlugs()
        └── resend.ts           # Resend client
(config: next.config.ts, eslint.config.mjs, postcss.config.mjs, tsconfig.json, package.json)
```

## Conventions

- **Server Components by default.** Add `"use client"` only when interactivity actually requires it (forms, hooks, browser APIs).
- Tailwind for all styling — no CSS modules, no styled-components, no inline `<style>` blocks.
- TypeScript everywhere; avoid `any` without a reason.
- **Naming:**
  - React components: `PascalCase`, one per file, filename matches the default export (`HeroSection.tsx`, `Button.tsx`)
  - Folders, route segments, non-component files: `kebab-case` (`src/lib/`, `format-currency.ts`, `email-signup-action.ts`)
  - **Be specific, not generic.** No catch-all names like `utils.ts`, `helpers.ts`, `data.ts`, `misc.ts` — split into purpose-named files so the filename tells me what's inside without opening it
  - Functions describe what they do: `validateEmailAddress(email)`, not `validate(x)`
  - Variables describe what they hold: `activeUsers`, not `data` or `temp`
  - Booleans use `is`/`has`/`can` prefix: `isLoading`, `hasPermission`, `canEdit`
  - **Don't:** numbered or versioned files (`component-1.tsx`, `page-v2.tsx`), abbreviations (`usr-prf.tsx`), or folders whose only file is `index.ts` — name the files
- Keep components small and composable; lift state only when shared.
- Avoid new dependencies unless they clearly pay for their weight.

## SEO Requirements

Every page must be indexable and shareable:
- Semantic HTML and clear heading hierarchy
- Per-page `metadata` export (title, description, OG/Twitter)
- Clean, descriptive URLs
- Ship as little JS as possible — favor Server Components and static rendering
- Structured sections that future essays/articles can slot into

## ProjectMetadata Schema

Fields available in project MDX frontmatter (`export const metadata = { ... }`):
- `title` — project name
- `summary` — one-line description (used in SEO + cards)
- `coverImage?` — path to cover image (optional)
- `timelineDisplay` — human-readable date range, e.g. `"Jan 2026 to Present"`
- `date` — ISO date string for sorting, e.g. `"2026-01-15"`
- `dateUpdated?` — ISO date of last update (optional)
- `tags` — string array, e.g. `["hardware", "biomedical"]`
- `links?` — `{ label: string; href: string }[]` — rendered as a resource list on the detail page
- `status` — `"active" | "completed" | "paused"`

## ArticleMetadata Schema

(Articles was named "Field Notes" until 2026-08-27; pre-rename git history uses field-notes paths.)

Fields available in article MDX frontmatter (`export const metadata = { ... }`), per `src/lib/get-articles.ts`:
- `title` — article title
- `description` — one-line summary (used in SEO + cards)
- `date` — ISO date string for sorting, e.g. `"2026-01-15"`

## Landmines

- **Turbopack cannot compile a dynamic MDX import against an empty content directory.** `src/app/articles/[slug]/page.tsx` and `src/app/projects/[slug]/page.tsx` are currently stubs that call `notFound()` unconditionally because `src/content/articles/` and `src/content/projects/` are empty — see the NOTE comments in those files. When the first content file lands for either, restore the original dynamic MDX import + `generateMetadata` from that file's git history before writing real pages against it.

## Deployment & Env

- Repo is Vercel-linked (project `my-website`). Deploy flow: `npm run build` must pass locally first, then push/deploy per the `deploy-to-vercel` skill.
- Env vars (see `.env.example` for names):
  - `RESEND_API_KEY` — from the Resend dashboard
  - `RESEND_AUDIENCE_ID` — from the Resend audience
  - `NEXT_PUBLIC_SITE_URL` — production URL, needed for `metadataBase`; currently only set in the Vercel dashboard if at all. Unset locally, it falls back to `http://localhost:3000` (see `src/config/site.ts`).
- To verify email capture end-to-end once the signup form exists: submit a test address through the form, then confirm the contact appears in the Resend audience.

## Current State

**Current state lives in `HANDOFF.md`** (authoritative, refreshed every session — read it at session start before doing anything else). This file keeps only the timeless context:

**Full visual reset (July 2026).** All theming, components, and media were deliberately deleted (via the `reset-visual-design` skill) to restart the design from scratch. The working skeleton survived: all six routes build, MDX pipeline intact, email capture backend wired (Resend client + `email-signup-action.ts`) with no form UI. The reset was deliberate — don't restore old components from git history except the `[slug]` MDX plumbing (see Landmines).
