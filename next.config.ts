import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Move the dev-only indicator out of the bottom-left, where it overlaps the
  // nav rail's social icons. Dev-only; no effect on production.
  devIndicators: {
    position: "bottom-right",
  },
  async redirects() {
    return [
      {
        source: "/field-notes",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/field-notes/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
