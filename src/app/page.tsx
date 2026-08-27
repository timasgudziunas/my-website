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

const homeLinkMenuItems: HomeLinkMenuItem[] = [
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
    title: "Newsletter",
    href: "/newsletter",
    imgUrl:
      "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400&q=80",
  },
];

const defaultPreviewImgUrl =
  "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&q=80";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="p-20 pb-0 max-md:p-5 max-md:pb-0">
        <h1 className="text-2xl font-medium">Timas Gudziunas</h1>
        <p className="mt-2 max-w-xl text-neutral-500">{description}</p>
      </div>
      <div className="flex flex-1 items-center">
        <HomeLinkMenu
          items={homeLinkMenuItems}
          defaultImgUrl={defaultPreviewImgUrl}
        />
      </div>
    </main>
  );
}
