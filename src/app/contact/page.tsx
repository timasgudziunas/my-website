import type { Metadata } from "next";

const description = "How to reach me.";

export const metadata: Metadata = {
  title: "Contacts",
  description,
  openGraph: {
    title: "Contacts | Timas Gudziunas",
    description,
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contacts | Timas Gudziunas",
    description,
  },
};

export default function ContactPage() {
  return (
    <main>
      <h1>Contacts</h1>
      <p>Coming soon.</p>
    </main>
  );
}
