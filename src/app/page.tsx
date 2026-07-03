import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import LatelySection from "@/components/LatelySection";
import FieldNotesPreview from "@/components/FieldNotesPreview";
import ProjectsPreview from "@/components/ProjectsPreview";

const description =
  "Biomedical engineer building ambitious projects in public to foster lifelong learning and a more curious future.";

export const metadata: Metadata = {
  title: "Timas Gudziunas",
  description,
  openGraph: {
    title: "Timas Gudziunas",
    description,
    url: "/",
    type: "website",
  },
  twitter: {
    title: "Timas Gudziunas",
    description,
  },
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-6 md:space-y-8">
        <LatelySection />
        <FieldNotesPreview />
        <ProjectsPreview />
      </div>
    </main>
  );
}
