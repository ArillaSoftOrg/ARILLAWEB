"use client";

import { useEffect, useRef, useState } from "react";

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

// Hero visual: renders /public/MOTION.mp4 (the previous photo composition,
// HeroShowcase, was removed; restore it from git history if ever needed).
export default function HeroMotionVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      video.currentTime = 0;
    } else {
      video.play().catch(() => {});
    }
  }, [prefersReducedMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[560px] sm:max-w-[600px] lg:max-w-[700px] xl:max-w-[780px]">
      <video
        ref={videoRef}
        src="/MOTION.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        style={{ maxHeight: "calc(100dvh - var(--header-h) - var(--bar-h, 0px) - 56px)" }}
        className="pointer-events-none block h-auto w-full select-none rounded-home-lg object-contain"
      />
    </div>
  );
}
