import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import FieldNotesPreview from "@/components/FieldNotesPreview";
import ProjectsPreview from "@/components/ProjectsPreview";
import EmailSignup from "@/components/EmailSignup";

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
      <FieldNotesPreview />
      <ProjectsPreview />
      <EmailSignup />
    </main>
  );
}
