"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const homeButtonVariants = cva(
  "font-home-sans inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-home-full px-6 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        dark: "bg-home-fg text-home-text-inverse hover:bg-home-surface-dark-elevated",
        lime: "bg-home-primary text-home-primary-foreground hover:bg-home-primary-hover active:bg-home-primary-active",
        secondary: "border border-home-border-strong bg-transparent text-home-fg hover:bg-home-surface",
        ghost: "bg-transparent text-home-fg hover:bg-home-surface",
        // Ink default / lime hover+focus — the "strong primary action" treatment
        // (design.md core interaction rule). Additive only: `dark` keeps its
        // existing dark-elevated hover for non-Hero consumers (e.g. Pricing's
        // accent-card CTA, where a lime hover would vanish on a lime card).
        primary:
          "bg-home-fg text-home-text-inverse hover:bg-home-primary hover:text-home-primary-foreground focus-visible:bg-home-primary focus-visible:text-home-primary-foreground",
        outline:
          "border border-home-border-strong bg-transparent text-home-fg hover:border-home-primary hover:bg-home-primary hover:text-home-primary-foreground focus-visible:border-home-primary focus-visible:bg-home-primary focus-visible:text-home-primary-foreground",
      },
      onDark: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "secondary",
        onDark: true,
        class: "border-home-border-dark text-home-text-inverse hover:bg-home-surface-dark-raised",
      },
      {
        variant: "ghost",
        onDark: true,
        class: "text-home-text-inverse hover:bg-home-surface-dark-raised",
      },
    ],
    defaultVariants: {
      variant: "dark",
      onDark: false,
    },
  }
);

export interface HomeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof homeButtonVariants> {
  asChild?: boolean;
}

const HomeButton = React.forwardRef<HTMLButtonElement, HomeButtonProps>(
  ({ className, variant, onDark, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(homeButtonVariants({ variant, onDark, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
HomeButton.displayName = "HomeButton";

export { HomeButton, homeButtonVariants };
