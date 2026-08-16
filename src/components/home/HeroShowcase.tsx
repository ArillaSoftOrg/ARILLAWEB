"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import heroPerson from "../../../arilla_hero_assets/hero-person.png";
import cardBrowser from "../../../arilla_hero_assets/card-browser.png";
import cardChart from "../../../arilla_hero_assets/card-chart.png";
import cardCode from "../../../arilla_hero_assets/card-code.png";
import cardMobile from "../../../arilla_hero_assets/card-mobile.png";
import styles from "./HeroShowcase.module.css";

export default function HeroShowcase() {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const latestRef = useRef({ x: 0, y: 0 });

  function canUsePointerMotion() {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function writePointerVars() {
    frameRef.current = null;
    const element = visualRef.current;
    if (!element) return;

    element.style.setProperty("--hero-x", latestRef.current.x.toFixed(4));
    element.style.setProperty("--hero-y", latestRef.current.y.toFixed(4));
  }

  function handlePointerEnter() {
    if (!canUsePointerMotion()) return;
    rectRef.current = visualRef.current?.getBoundingClientRect() ?? null;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!canUsePointerMotion()) return;

    const rect = rectRef.current ?? visualRef.current?.getBoundingClientRect();
    if (!rect) return;

    rectRef.current = rect;
    latestRef.current = {
      x: Math.min(Math.max((event.clientX - rect.left) / rect.width - 0.5, -0.5), 0.5),
      y: Math.min(Math.max((event.clientY - rect.top) / rect.height - 0.5, -0.5), 0.5),
    };

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(writePointerVars);
    }
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    rectRef.current = null;
    latestRef.current = { x: 0, y: 0 };

    const element = visualRef.current;
    if (!element) return;

    element.style.setProperty("--hero-x", "0");
    element.style.setProperty("--hero-y", "0");
  }

  return (
    <div
      className="relative mx-auto aspect-[31/32] w-full max-w-[560px] overflow-visible sm:max-w-[600px] xl:mx-0 xl:max-w-[620px]"
      style={{
        maxHeight: "calc(100dvh - var(--header-h) - var(--bar-h, 0px) - 56px)",
      }}
    >
      <div
        ref={visualRef}
        className={styles.heroVisual}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className={styles.ambientGlow} aria-hidden="true" />

        <svg className={styles.orbitLayer} viewBox="0 0 620 640" aria-hidden="true">
          <g className={styles.orbitSpin}>
            <ellipse className={styles.orbitTrack} cx="312" cy="316" rx="236" ry="262" transform="rotate(-18 312 316)" />
            <circle className={styles.orbitDot} cx="514" cy="178" r="5" />
          </g>
          <g className={`${styles.orbitSpin} ${styles.orbitSpinReverse}`}>
            <ellipse className={`${styles.orbitTrack} ${styles.orbitTrackCyan}`} cx="312" cy="316" rx="194" ry="224" transform="rotate(18 312 316)" />
            <circle className={styles.orbitDot} cx="128" cy="412" r="4" />
          </g>
          <g className={`${styles.orbitSpin} ${styles.orbitSpinSlow}`}>
            <ellipse className={styles.orbitTrack} cx="312" cy="316" rx="266" ry="184" transform="rotate(-28 312 316)" />
            <circle className={styles.orbitDot} cx="548" cy="324" r="3.5" />
          </g>
        </svg>

        <div className={styles.personLayer}>
          <Image
            src={heroPerson}
            alt="Arilla Soft dijital çözümler görseli"
            preload
            className={styles.personImage}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 560px"
          />
        </div>

        <div className={`${styles.cardLayer} ${styles.browserLayer}`} aria-hidden="true">
          <div className={styles.floatLayer}>
            <Image src={cardBrowser} alt="" className={styles.cardImage} sizes="(max-width: 640px) 36vw, 250px" />
          </div>
        </div>

        <div className={`${styles.cardLayer} ${styles.chartLayer}`} aria-hidden="true">
          <div className={styles.floatLayer}>
            <Image src={cardChart} alt="" className={styles.cardImage} sizes="(max-width: 640px) 20vw, 135px" />
          </div>
        </div>

        <div className={`${styles.cardLayer} ${styles.codeLayer}`} aria-hidden="true">
          <div className={styles.floatLayer}>
            <Image src={cardCode} alt="" className={styles.cardImage} sizes="(max-width: 640px) 13vw, 92px" />
          </div>
        </div>

        <div className={`${styles.cardLayer} ${styles.mobileLayer}`} aria-hidden="true">
          <div className={styles.floatLayer}>
            <Image src={cardMobile} alt="" className={styles.cardImage} sizes="(max-width: 640px) 15vw, 105px" />
          </div>
        </div>
      </div>
    </div>
  );
}
