'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import BrandLockup from '@/components/BrandLockup';
import Navbar from '@/components/layout/Navbar';
import styles from './BrandIntroShell.module.css';

const STORAGE_KEY = 'arilla-brand-intro:v1';
const INTRO_DURATION_MS = 1050;

type IntroState = 'idle' | 'running' | 'done';
type IntroVars = CSSProperties & {
  '--brand-intro-dx'?: string;
  '--brand-intro-dy'?: string;
};

type BrandIntroShellProps = {
  children: ReactNode;
  developerLoginOnly?: boolean;
};

export default function BrandIntroShell({
  children,
  developerLoginOnly = false,
}: BrandIntroShellProps) {
  const logoTargetRef = useRef<HTMLSpanElement>(null);
  const [introState, setIntroState] = useState<IntroState>('idle');
  const [introVars, setIntroVars] = useState<IntroVars | null>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const timeoutIds: number[] = [];
    let complete = false;

    const clearAsync = () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };

    const restoreDocument = () => {
      root.classList.remove('brand-intro-scroll-lock');
      root.removeAttribute('data-brand-intro');
    };

    const markSeen = () => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // Storage can be unavailable in private or restricted contexts.
      }
    };

    const finish = (shouldMarkSeen: boolean) => {
      if (complete) return;
      complete = true;
      clearAsync();
      if (shouldMarkSeen) markSeen();
      restoreDocument();
      setIntroState('done');
      setIntroVars(null);
    };

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') {
        finish(false);
        return () => {
          complete = true;
          clearAsync();
          restoreDocument();
        };
      }
    } catch {
      finish(false);
      return () => {
        complete = true;
        clearAsync();
        restoreDocument();
      };
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      finish(true);
      return () => {
        complete = true;
        clearAsync();
        restoreDocument();
      };
    }

    root.classList.add('brand-intro-scroll-lock');
    root.setAttribute('data-brand-intro', 'running');
    setIntroState('running');

    const measureAndRun = () => {
      if (complete) return;

      const target = logoTargetRef.current;
      if (!target) {
        finish(true);
        return;
      }

      const rect = target.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        finish(true);
        return;
      }

      const destinationX = rect.left + rect.width / 2 - window.innerWidth / 2;
      const destinationY = rect.top + rect.height / 2 - window.innerHeight / 2;

      setIntroVars({
        '--brand-intro-dx': `${destinationX}px`,
        '--brand-intro-dy': `${destinationY}px`,
      });

      markSeen();
      timeoutIds.push(window.setTimeout(() => finish(false), INTRO_DURATION_MS + 80));
    };

    measureAndRun();

    return () => {
      complete = true;
      clearAsync();
      restoreDocument();
    };
  }, []);

  const isIntroRunning = introState === 'running';
  const canRenderOverlay = isIntroRunning && introVars !== null;
  const shouldHideLogo = introState === 'running';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        brandIntroActive={shouldHideLogo}
        brandLogoRef={logoTargetRef}
        developerLoginOnly={developerLoginOnly}
      />
      <div
        className={styles.content}
        data-brand-intro-content=""
        data-brand-intro-state={isIntroRunning ? 'running' : 'ready'}
      >
        {children}
      </div>
      {canRenderOverlay && (
        <div className={styles.overlay} aria-hidden="true">
          <div className={styles.traveler} style={introVars}>
            <BrandLockup className={styles.introLockup} descriptorMode="hidden" />
          </div>
        </div>
      )}
    </div>
  );
}
