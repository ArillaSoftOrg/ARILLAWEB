"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPlaceholderPrice, getPriceLabel, type Locale, type PlaceholderExtra } from "@/lib/solutions";
import "@/lib/home-fonts";

// UI-ready extras selection — purely visual state (which extras look
// "selected" and a running placeholder total). No submission, checkout, or
// payment logic is wired up; see data.ts for why these prices are placeholders.
export function ExtrasSelector({ extras, locale }: { extras: PlaceholderExtra[]; locale: Locale }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const total = extras
    .filter((extra) => selected.has(extra.id) && extra.price)
    .reduce((sum, extra) => sum + (extra.price?.amount ?? 0), 0);

  return (
    <div>
      <ul className="flex flex-col gap-2.5">
        {extras.map((extra) => {
          const isSelected = selected.has(extra.id);
          return (
            <li key={extra.id}>
              <button
                type="button"
                onClick={() => toggle(extra.id)}
                aria-pressed={isSelected}
                className={cn(
                  "focus-ring-lime font-home-sans flex w-full items-center justify-between gap-3 rounded-home-md border px-4 py-3 text-left text-sm transition-colors duration-200",
                  isSelected
                    ? "border-home-primary bg-home-primary-soft text-home-fg"
                    : "border-home-border bg-home-bg text-home-fg hover:border-home-primary"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-home-sm border",
                      isSelected ? "border-home-primary bg-home-primary" : "border-home-border-strong bg-transparent"
                    )}
                  >
                    {isSelected && <Check size={13} strokeWidth={3} className="text-home-primary-foreground" />}
                  </span>
                  {extra.label[locale]}
                </span>
                <span className="font-home-sans flex-shrink-0 text-home-text-secondary">
                  {extra.price ? `+${formatPlaceholderPrice(locale, extra.price)}` : getPriceLabel(locale, "quote", null)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {selected.size > 0 && total > 0 && (
        <p className="font-home-sans mt-4 text-sm text-home-text-secondary">
          {locale === "tr" ? "Seçili ekstralar" : "Selected extras"}:{" "}
          <span className="font-semibold text-home-fg">
            {formatPlaceholderPrice(locale, { amount: total, currency: "TRY" })}
          </span>
        </p>
      )}
    </div>
  );
}
