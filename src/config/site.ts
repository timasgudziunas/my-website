export const siteConfig = {
  name: "Timas Gudziunas",
  description: "Documenting an entrepreneurial journey in public.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/**
 * Social profiles for whatever nav/footer eventually renders them.
 * TODO: replace placeholder hrefs with real profile URLs.
 */
export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "GitHub", href: "https://github.com/" },
] as const;
