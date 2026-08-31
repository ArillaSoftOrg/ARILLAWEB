"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { BrandMark, type BrandMarkName } from "@/components/home/ui/BrandMark";
import { fadeUp, stagger } from "@/components/home/motion";
import "@/lib/home-fonts";

// Official brand marks for every marquee item (see BrandMark.tsx for
// sourcing). "Partner"-status items use the brand's own logo since the
// program-specific partner badge artwork is gated behind each partner
// portal and can't be reproduced accurately here.
const LOGO_BY_ITEM: Record<string, BrandMarkName> = {
  "Google Premier Partner": "google",
  "Meta Business Partner": "meta",
  "LinkedIn Marketing Partner": "linkedin",
  "AWS Partner": "aws",
  "WhatsApp Business": "whatsapp",
  "OpenAI": "openai",
  "Anthropic": "anthropic",
  "xAI": "xai",
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function TechMarqueeItem({ name, hidden = false }: { name: string; hidden?: boolean }) {
  const logo = LOGO_BY_ITEM[name];
  return (
    <li aria-hidden={hidden || undefined} className="flex flex-shrink-0 items-center gap-6 sm:gap-8">
      <span className="group flex items-center gap-2.5">
        {logo && (
          <BrandMark
            name={logo}
            className="h-6 w-auto flex-none opacity-80 transition duration-200 ease-home-premium group-hover:scale-[1.02] group-hover:opacity-100 sm:h-7"
          />
        )}
        <span className="font-home-sans whitespace-nowrap text-[15px] font-medium text-home-text-muted transition-colors duration-200 ease-home-premium group-hover:text-home-fg sm:text-base">
          {name}
        </span>
      </span>
      <span aria-hidden="true" className="h-1 w-1 flex-none rounded-full bg-home-primary" />
    </li>
  );
}

export default function CapabilityStrip() {
  const t = useTranslations("pages.home.sections.capabilityStrip");
  const items = t.raw("items") as string[];
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <section className="border-y border-home-border bg-home-bg py-8 sm:py-10">
      <AnimatedSection
        variants={stagger}
        className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 sm:px-6 lg:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="font-home-sans text-center text-[15px] font-medium text-home-fg sm:text-left sm:text-base"
        >
          {t("heading")}
        </motion.p>

        <motion.div variants={fadeUp} className="w-full overflow-hidden">
          {prefersReducedMotion ? (
            <ul
              className="tech-marquee-static flex w-full items-center gap-6 overflow-x-auto sm:gap-8"
            >
              {items.map((item) => (
                <TechMarqueeItem key={item} name={item} />
              ))}
            </ul>
          ) : (
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <ul
                className="tech-marquee-track flex w-max items-center gap-6 sm:gap-8"
                style={paused ? { animationPlayState: "paused" } : undefined}
                onTouchStart={() => setPaused(true)}
                onTouchEnd={() => setPaused(false)}
                onTouchCancel={() => setPaused(false)}
              >
                {items.map((item) => (
                  <TechMarqueeItem key={item} name={item} />
                ))}
                {items.map((item) => (
                  <TechMarqueeItem key={`${item}-clone`} name={item} hidden />
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
