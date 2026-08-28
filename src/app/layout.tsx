import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SiteIntro from "@/components/SiteIntro";

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
        <SiteIntro />
        {children}
      </body>
    </html>
  );
}
