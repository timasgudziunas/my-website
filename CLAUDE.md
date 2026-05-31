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

## Scope Guard — What NOT to Build

Before adding anything, ask: does this directly support email capture, trust, or curiosity? If not, don't build it.

- No portfolio grids, resume sections, or product-specific landing pages
- No social login or user accounts — the only "signup" is the email list
- No admin panels, CMS UIs, or analytics dashboards unless explicitly requested
- No third-party widgets/scripts that hurt page speed
- Don't pre-build pages for content that doesn't exist yet
- Don't create empty folders or placeholder files just to fill out structure

## Tech Stack

- Next.js 16 (App Router) + React 19 — **has breaking changes from training data; consult `node_modules/next/dist/docs/` before assuming any API (see `AGENTS.md`)**
- TypeScript
- MDX (via `@next/mdx` or `contentlayer`) — content layer for Field Notes (articles) and Projects; files live in `/content`
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
├── README.md
├── .env                        # local secrets (no .env.example yet — add one when Supabase/Resend land)
├── public/                     # static assets
│   ├── tg-logo-dark.png        # favicon — dark mode
│   ├── tg-logo-light.png       # favicon — light mode
│   ├── next.svg
│   └── vercel.svg
└── src/
    ├── mdx-components.tsx      # required by @next/mdx App Router — global MDX component overrides
    ├── app/                    # App Router: routes, layouts, route handlers
    │   ├── layout.tsx          # root layout — font setup, global metadata template
    │   ├── page.tsx            # homepage
    │   ├── globals.css         # Tailwind v4 entry + @theme tokens
    │   ├── email-signup-action.ts  # Resend server action — handles email list subscribe
    │   ├── field-notes/
    │   │   ├── page.tsx        # Field Notes index
    │   │   └── [slug]/
    │   │       └── page.tsx    # individual note — dynamically imports MDX from src/content/field-notes/
    │   └── projects/
    │       ├── page.tsx        # Projects index
    │       └── [slug]/
    │           └── page.tsx    # individual project — dynamically imports MDX from src/content/projects/
    ├── content/                # MDX source files (one file per note/project, filename = slug)
    │   ├── field-notes/        # Field Notes — .mdx files, export metadata + default component
    │   └── projects/           # Projects — .mdx files, export metadata + default component
    ├── components/             # reusable UI (PascalCase, one per file)
    │   ├── ui/                 # generic primitives: Button, Card, Input — empty, ready
    │   ├── EmailSignup.tsx     # email capture form (client component, calls email-signup-action)
    │   ├── FieldNoteCard.tsx   # single field note row — date, title, description
    │   ├── FieldNotesPreview.tsx # homepage section: fetches + renders latest 3 notes
    │   ├── HeroSection.tsx     # homepage hero — static text section (eyebrow, display heading, body copy)
    │   ├── ImagePlaceholder.tsx # aspect-ratio placeholder slot for images/video
    │   ├── LatelySection.tsx   # homepage section: Building, Thinking About, Reading, Current Obsession
    │   ├── ProjectCard.tsx     # single project card — cover image, timeline, tags, summary
    │   ├── ProjectsPreview.tsx # homepage section: fetches + renders latest 3 projects
    │   ├── RefreshedLabel.tsx  # "refreshed" badge/label component
    │   ├── SiteNav.tsx         # global nav — name left, links + ThemeToggle right
    │   └── ThemeToggle.tsx     # dark/light toggle button (client) — stores pref in localStorage
    ├── config/                 # site-wide constants
    │   ├── site.ts             # metadata, nav links, site-level config
    │   └── lately.ts           # data for the Lately section (Building, Reading, etc.)
    ├── lib/                    # utilities + service clients
    │   ├── format-date.ts      # shared date formatting utility
    │   ├── get-field-notes.ts  # FieldNoteMetadata type + getFieldNoteSlugs()
    │   ├── get-projects.ts     # ProjectMetadata type + getProjectSlugs()
    │   └── resend.ts           # Resend client
    └── types/                  # shared TypeScript types — empty, ready
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
- Structured sections that future essays/field-notes can slot into

## Design System

### Fonts
Three-font stack loaded via `next/font/google`, assigned as Tailwind utilities:
- **Cormorant Garamond** (`--font-cormorant`) → `font-display` — headings, section titles, large display text (weights 300/400/500, normal + italic)
- **Instrument Serif** (`--font-instrument`) → `font-body` — paragraphs, descriptions, editorial captions (weight 400, normal + italic; default body font)
- **DM Mono** (`--font-dm-mono`) → `font-mono` — nav links, eyebrow labels, tags, metadata, CTAs (weights 300/400, normal + italic)

### Color tokens
Theming wiped — `globals.css` is a blank slate (just `@import "tailwindcss"`). Color tokens, `@theme` block, and light/dark switching are being rebuilt from scratch.

### Prose
`.prose` styles to be re-added to `globals.css` once the new design system is in place. Heading overrides live in `src/mdx-components.tsx`.

## ProjectMetadata Schema

Fields available in project MDX frontmatter (`export const metadata = { ... }`):
- `title` — project name
- `summary` — one-line description (used in SEO + cards)
- `coverImage?` — path to cover image (optional; `ImagePlaceholder` renders until set)
- `timelineDisplay` — human-readable date range, e.g. `"Jan 2026 – Present"`
- `date` — ISO date string for sorting, e.g. `"2026-01-15"`
- `dateUpdated?` — ISO date of last update (optional)
- `tags` — string array, e.g. `["hardware", "biomedical"]`
- `links?` — `{ label: string; href: string }[]` — rendered as a resource list on the detail page
- `status` — `"active" | "completed" | "paused"`

## Current State

- Three-font stack still wired: Cormorant Garamond + Instrument Serif + DM Mono (via `next/font/google` in `layout.tsx`)
- Color theming wiped — `globals.css` is a blank slate, ready to rebuild
- All five routes built and styled: `/`, `/field-notes`, `/field-notes/[slug]`, `/projects`, `/projects/[slug]`
- Homepage: Hero (static text) → Intro Video placeholder → Lately section → Field Notes preview → Projects preview → Email signup
- Email capture: wired to Resend via server action (`src/app/email-signup-action.ts`)
- Placeholder content in `src/content/field-notes/hello-world.mdx` and `src/content/projects/getting-started.mdx`
- Next up: replace placeholder MDX with real content; swap `ImagePlaceholder` with actual `next/image` when photos are ready; add intro video embed