"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const homeCardVariants = cva("rounded-home-lg", {
  variants: {
    surface: {
      light: "border border-home-border bg-home-bg",
      neutral: "border border-transparent bg-home-surface",
      dark: "border border-home-border-dark bg-home-surface-dark-raised text-home-text-inverse",
      accent: "border border-transparent bg-home-primary text-home-primary-foreground",
    },
    padding: {
      none: "",
      sm: "p-5",
      md: "p-6 sm:p-8",
    },
  },
  defaultVariants: {
    surface: "light",
    padding: "md",
  },
});

export interface HomeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof homeCardVariants> {}

const HomeCard = React.forwardRef<HTMLDivElement, HomeCardProps>(
  ({ className, surface, padding, ...props }, ref) => (
    <div ref={ref} className={cn(homeCardVariants({ surface, padding, className }))} {...props} />
  )
);
HomeCard.displayName = "HomeCard";

export { HomeCard, homeCardVariants };
