import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | Timas Gudziunas",
    default: "Timas Gudziunas",
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> ·{" "}
          <Link href="/field-notes">Field Notes</Link> ·{" "}
          <Link href="/projects">Projects</Link> ·{" "}
          <Link href="/newsletter">Newsletter</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
