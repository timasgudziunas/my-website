# HANDOFF.md — Session Handoff (updated 2026-08-27 ~22:30 UTC, supersedes all earlier versions)

> For a fresh Claude session with no memory of prior conversations: read this file first, then CLAUDE.md (rules, structure, landmines), then PLAN.md (build checklist). This file is the authoritative current state.

## Current state (as of 2026-08-27 ~22:30 UTC)

- Post-visual-reset skeleton, redesign not started. All 6 routes build (`npm run build` green as of this timestamp: 6/6 static pages, Next.js 16.2.6 Turbopack, zero TS errors).
- 4 routes render bare unstyled HTML: `/`, `/newsletter`, `/field-notes`, `/projects`. The 2 `[slug]` routes are deliberate `notFound()` stubs (empty content dirs; see landmine 1).
- No components, no design tokens, no fonts, no favicon, no media. `src/components/` does not exist. `src/content/field-notes/` and `src/content/projects/` are empty.
- Email backend wired (Resend client + `email-signup-action.ts`) but there is NO form UI, so the site currently cannot capture an email.
- Working tree clean at commit `2d85cf7` on `main`. Not yet pushed/redeployed since the reset; production Vercel deploy is from the pre-reset design.

## Just completed (this session)

- Committed the leftover cleanup pass as `2d85cf7`: dash purge in copy and metadata (title template now `%s | Timas Gudziunas`), `.env.example` added and un-gitignored, CLAUDE.md/PLAN.md/README.md refreshed to document the reset.
- Created this HANDOFF.md (repo previously had none).

## In progress

- Nothing mid-flight. Next session starts clean at "pick a design direction."

## Next steps (priority order)

1. **Design direction** — owner wants to discuss before building; use `design-distinctive-frontend` + `design-ui-interfaces` skills. Nothing is decided yet: no palette, no fonts, no aesthetic. Do not start building components before this conversation happens.
2. Rebuild email signup form UI on `/newsletter` wired to the existing Server Action (`src/app/email-signup-action.ts`), with success/error states. Verify end-to-end: test address submitted → contact visible in Resend audience.
3. Homepage + newsletter copy, then 1–2 real field notes / project pages (restoring `[slug]` MDX rendering per landmine 1).
4. Favicon/logo, sitemap, robots.txt, nav that fits the new design.

## Settled questions (do not re-litigate)

- The July 2026 full visual reset was deliberate (`reset-visual-design` skill). Do not restore old components from git history except the `[slug]` MDX plumbing noted in landmine 1.
- Supabase is deliberately not installed. Resend only.
- Title separator is `|`, not an em dash. The no-dashes-in-copy rule (CLAUDE.md Voice & Tone) is enforced sitewide, titles included.

## Where everything lives

| path | what it is |
|---|---|
| `CLAUDE.md` | rules, full project tree, landmines, current-state summary |
| `PLAN.md` | build checklist (Done / To Build) |
| `src/app/email-signup-action.ts` | Resend subscribe Server Action (working, no UI) |
| `src/lib/resend.ts` | Resend client |
| `src/config/site.ts` | site metadata, URLs, social links |
| `.env.example` | required env var names (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `NEXT_PUBLIC_SITE_URL`) |

## Operational landmines

1. **Turbopack cannot compile a dynamic MDX import against an empty content dir.** Both `[slug]` pages are `notFound()` stubs. When the first `.mdx` file lands in either content dir, restore that page's dynamic import + `generateMetadata` from its git history (pre-`de27f62`).
2. Next.js 16 has breaking changes vs training data. Consult `node_modules/next/dist/docs/` before assuming any API (see AGENTS.md).
3. Deploys: `npm run build` must pass locally before any push/deploy (`deploy-to-vercel` skill). Repo is Vercel-linked as project `my-website`.
4. `NEXT_PUBLIC_SITE_URL` is unset locally (falls back to `http://localhost:3000`); production value lives in the Vercel dashboard, if set at all. Verify before trusting absolute OG URLs in production.

## Quick health check

```powershell
git log --oneline -3; git status --short
npm run build
```
Healthy ≈ clean tree on `main` at or after `2d85cf7`, build compiles with 6/6 static pages and zero TypeScript errors.
