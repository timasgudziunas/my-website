import type { Metadata } from "next";
import HomeLinkMenu, {
  type HomeLinkMenuItem,
} from "@/components/HomeLinkMenu";

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

// NOTE: /about, /recommendations, and /contact don't exist yet — those
// links 404 until their pages are built.
const homeLinkMenuItems: HomeLinkMenuItem[] = [
  {
    title: "About me",
    href: "/about",
    imgUrl:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80",
  },
  {
    title: "Articles",
    href: "/articles",
    imgUrl:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
  },
  {
    title: "Projects",
    href: "/projects",
    imgUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
  },
  {
    title: "Recommendations",
    href: "/recommendations",
    imgUrl:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80",
  },
  {
    title: "Contacts",
    href: "/contact",
    imgUrl:
      "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400&q=80",
  },
];

const defaultPreviewImgUrl =
  "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&q=80";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="sr-only">Timas Gudziunas</h1>
      <HomeLinkMenu
        items={homeLinkMenuItems}
        defaultImgUrl={defaultPreviewImgUrl}
      />
    </main>
  );
}
