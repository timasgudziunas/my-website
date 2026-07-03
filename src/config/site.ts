export const siteConfig = {
  name: "Timas Gudziunas",
  description: "Documenting an entrepreneurial journey in public.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/**
 * Social profiles surfaced in the nav rail. `icon` maps to an SVG in SiteNav.
 * TODO: replace placeholder hrefs with real profile URLs.
 */
export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "GitHub", href: "https://github.com/", icon: "github" },
] as const;
