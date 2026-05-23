import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Timas Gudziunas",
  description:
    "Biomedical engineer building ambitious projects in public to foster lifelong learning and a more curious future.",
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <EmailSignup />
    </main>
  );
}
