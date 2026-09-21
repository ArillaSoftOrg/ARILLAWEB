"use client";

import { useMemo, useState } from "react";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { cn } from "@/lib/utils";
import type { Locale, Solution, SolutionCategory, SolutionCategoryId } from "@/lib/solutions";
import "@/lib/home-fonts";

interface SolutionsCatalogGridProps {
  solutions: Solution[];
  categories: SolutionCategory[];
  locale: Locale;
  basePath: string;
  allLabel: string;
}

export function SolutionsCatalogGrid({ solutions, categories, locale, basePath, allLabel }: SolutionsCatalogGridProps) {
  const [activeCategory, setActiveCategory] = useState<SolutionCategoryId | "all">("all");

  const filtered = useMemo(
    () => (activeCategory === "all" ? solutions : solutions.filter((s) => s.category === activeCategory)),
    [solutions, activeCategory]
  );

  const categoryNameById = useMemo(() => {
    const map = new Map<SolutionCategoryId, string>();
    categories.forEach((c) => map.set(c.id, c.name[locale]));
    return map;
  }, [categories, locale]);

  return (
    <div>
      <div role="tablist" aria-label={allLabel} className="flex flex-wrap gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={cn(
            "focus-ring-lime font-home-sans rounded-home-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
            activeCategory === "all"
              ? "border-home-primary bg-home-primary text-home-primary-foreground"
              : "border-home-border-strong bg-transparent text-home-fg hover:border-home-primary"
          )}
        >
          {allLabel}
        </button>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "focus-ring-lime font-home-sans rounded-home-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-home-primary bg-home-primary text-home-primary-foreground"
                  : "border-home-border-strong bg-transparent text-home-fg hover:border-home-primary"
              )}
            >
              {category.name[locale]}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((solution) => (
          <SolutionCard
            key={solution.id}
            solution={solution}
            locale={locale}
            basePath={basePath}
            categoryLabel={categoryNameById.get(solution.category)}
          />
        ))}
      </div>
    </div>
  );
}
