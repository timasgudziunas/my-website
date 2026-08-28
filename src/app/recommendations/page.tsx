import type { Metadata } from "next";

const description = "Books, tools, and ideas I recommend.";

export const metadata: Metadata = {
  title: "Recs",
  description,
  openGraph: {
    title: "Recs | Timas Gudziunas",
    description,
    url: "/recommendations",
    type: "website",
  },
  twitter: {
    title: "Recs | Timas Gudziunas",
    description,
  },
};

export default function RecommendationsPage() {
  return (
    <main>
      <h1>Recs</h1>
      <p>Coming soon.</p>
    </main>
  );
}
