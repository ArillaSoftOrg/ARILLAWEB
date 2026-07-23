import type { BlogSection } from "./blog-data";

const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  return text.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function calculateReadingTimeMinutes(
  sections: BlogSection[],
  fallbackText = ""
): number {
  const text = sections
    .flatMap((section) => {
      if (section.type === "list") return section.items ?? [];
      return section.text ? [section.text] : [];
    })
    .join(" ")
    .trim();

  const wordCount = countWords(text || fallbackText);
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
