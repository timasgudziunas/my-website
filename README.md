# My Website

Personal brand site for Timas Gudziunas. It documents an entrepreneurial journey in public and converts traffic from social media, search, and professional networks into an owned email audience.

This is not a portfolio, resume site, or single product site.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (CSS first config, no `tailwind.config.js`)
- MDX content layer for Field Notes and Projects (`src/content/`)
- Resend for email capture
- Vercel for deployment

## Development

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # eslint
```

Copy `.env.example` to `.env` and fill in real values before running locally.

## Docs

The real documentation lives in `CLAUDE.md` (architecture, conventions, current state) and `PLAN.md` (build plan and what is left to build). Read those first, this file is just an entry point.

## Current state

Post visual reset. All theming, components, and media were deliberately deleted in July 2026 to restart the design from scratch. Routes are bare unstyled HTML while the redesign is pending. See `CLAUDE.md` for the full picture.
