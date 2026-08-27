import fs from "fs";
import path from "path";

export type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
};

export function getArticleSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/content/articles");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
