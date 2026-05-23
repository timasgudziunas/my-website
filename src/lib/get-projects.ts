import fs from "fs";
import path from "path";

export type ProjectMetadata = {
  title: string;
  description: string;
  date: string;
  status: "active" | "completed" | "paused";
};

export function getProjectSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/content/projects");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
