import Link from "next/link";

// Nav for the inner section pages only. The homepage ("/") lives outside
// this route group and renders without it; its link-hover menu is the nav.
export default function SiteSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        <Link href="/">Home</Link> ·{" "}
        <Link href="/articles">Articles</Link> ·{" "}
        <Link href="/projects">Projects</Link> ·{" "}
        <Link href="/newsletter">Newsletter</Link>
      </nav>
      {children}
    </>
  );
}
