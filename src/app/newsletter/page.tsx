import type { Metadata } from "next";

const description =
  "Occasional updates from an entrepreneurial journey documented in public: project milestones, lessons learned, and ideas worth sharing. No noise.";

export const metadata: Metadata = {
  title: "Newsletter",
  description,
  openGraph: {
    title: "Newsletter | Timas Gudziunas",
    description,
    url: "/newsletter",
    type: "website",
  },
  twitter: {
    title: "Newsletter | Timas Gudziunas",
    description,
  },
};

export default function NewsletterPage() {
  return (
    <main>
      <h1>Newsletter</h1>
      <p>{description}</p>
      {/* Signup form UI removed in the reset — email-signup-action.ts + resend.ts still wired, rebuild a form here */}
    </main>
  );
}
