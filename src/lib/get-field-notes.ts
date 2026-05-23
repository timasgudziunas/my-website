import fs from "fs";
import path from "path";

export type FieldNoteMetadata = {
  title: string;
  description: string;
  date: string;
};

export function getFieldNoteSlugs(): string[] {
  const dir = path.join(process.cwd(), "src/content/field-notes");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
