import type { Metadata } from "next";

const description = "Who I am and what I'm building toward.";

export const metadata: Metadata = {
  title: "About me",
  description,
  openGraph: {
    title: "About me | Timas Gudziunas",
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About me | Timas Gudziunas",
    description,
  },
};

export default function AboutPage() {
  return (
    <main>
      <h1>About me</h1>
      <p>Coming soon.</p>
    </main>
  );
}
