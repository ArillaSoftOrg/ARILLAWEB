"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const homeBadgeVariants = cva(
  "font-home-sans inline-flex items-center gap-1.5 rounded-home-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        dark: "bg-home-fg text-home-text-inverse",
        lime: "bg-home-primary text-home-primary-foreground",
        neutral: "border border-home-border bg-home-surface text-home-fg",
        "on-dark": "border border-home-border-dark bg-transparent text-home-text-inverse-secondary",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface HomeBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof homeBadgeVariants> {}

function HomeBadge({ className, variant, ...props }: HomeBadgeProps) {
  return <span className={cn(homeBadgeVariants({ variant, className }))} {...props} />;
}

export { HomeBadge, homeBadgeVariants };
