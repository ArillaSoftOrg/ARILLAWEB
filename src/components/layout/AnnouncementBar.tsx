'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import type { AnnouncementConfig } from '@/lib/announcement-actions';

// ── Type ───────────────────────────────────────────────────────────────────

interface AnnouncementBarProps {
  config: AnnouncementConfig;
}

// ── Constants ──────────────────────────────────────────────────────────────

const SCROLL_DURATION: Record<'slow' | 'normal' | 'fast', string> = {
  slow: '30s',
  normal: '18s',
  fast: '10s',
};

// ── Component ──────────────────────────────────────────────────────────────

export default function AnnouncementBar({ config }: AnnouncementBarProps) {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // ── Effect 1: Mount guard ──────────────────────────────────────────────────

  useEffect(() => {
    setMounted(true);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReduced);

    if (config.dismissible) {
      const key = `announcement-dismissed-${config.text.slice(0, 20)}`;
      const wasDismissed = !!sessionStorage.getItem(key);
      setDismissed(wasDismissed);
    }
  }, [config.dismissible, config.text]);

  // ── Effect 2: Visibility + CSS variable ────────────────────────────────────

  useEffect(() => {
    if (!mounted) return;

    const shouldShow = computeVisibility(config, pathname, dismissed);
    setVisible(shouldShow);

    if (shouldShow && barRef.current) {
      const height = barRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--bar-h', `${height}px`);
    } else {
      document.documentElement.style.setProperty('--bar-h', '0px');
    }
  }, [mounted, pathname, dismissed, config.enabled, config.startsAt, config.expiresAt, config.countdownMode, config.countdownEnabled, config.targetMode, config.targetRoutes]);

  // ── Effect 3: Countdown ticker ─────────────────────────────────────────────

  useEffect(() => {
    if (!visible || !config.countdownEnabled) {
      setCountdown(null);
      return;
    }

    const tick = () => {
      const { display, hide } = computeCountdown(config, Date.now());
      if (hide) {
        setVisible(false);
        document.documentElement.style.setProperty('--bar-h', '0px');
        setCountdown(null);
      } else {
        setCountdown(display);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [
    visible,
    config.countdownEnabled,
    config.countdownMode,
    config.startsAt,
    config.expiresAt,
    config.dailyResetHour,
    config.dailyResetMinute,
  ]);

  // ── Effect 4: ResizeObserver ───────────────────────────────────────────────

  useEffect(() => {
    if (!visible || !barRef.current || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => {
      const height = barRef.current?.getBoundingClientRect().height ?? 0;
      document.documentElement.style.setProperty('--bar-h', `${height}px`);
    });

    ro.observe(barRef.current);
    return () => ro.disconnect();
  }, [visible]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleDismiss = () => {
    const key = `announcement-dismissed-${config.text.slice(0, 20)}`;
    sessionStorage.setItem(key, '1');
    setDismissed(true);
    setVisible(false);
    document.documentElement.style.setProperty('--bar-h', '0px');
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!mounted || !visible) return null;

  const useMarquee = config.scrollEnabled && !reducedMotion;

  if (useMarquee) {
    // Marquee layout
    return (
      <div
        ref={barRef}
        role="banner"
        aria-live="polite"
        className="top-14 lg:top-[92px] z-40 left-0 right-0 w-full overflow-hidden"
        style={{
          position: 'fixed',
          backgroundColor: config.backgroundColor,
          color: config.textColor,
        }}
      >
        {/* Fixed right-side: countdown + dismiss */}
        {(countdown || config.dismissible) && (
          <div
            className="absolute right-0 top-0 h-full flex items-center gap-2 pr-4 lg:pr-6 z-10"
            style={{
              background: `linear-gradient(to right, transparent, ${config.backgroundColor} 25%)`,
            }}
          >
            {countdown && (
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded whitespace-nowrap"
                style={{ background: 'rgba(0,0,0,0.2)' }}
              >
                Kalan Süre: {countdown}
              </span>
            )}
            {config.dismissible && (
              <button
                onClick={handleDismiss}
                aria-label="Duyuruyu kapat"
                className="p-1 rounded hover:opacity-70 flex-shrink-0"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}

        {/* Scrolling text track */}
        <div
          className="flex py-2.5 announcement-marquee-track"
          style={{ animationDuration: SCROLL_DURATION[config.scrollSpeed] }}
        >
          <span className="text-sm font-semibold whitespace-nowrap px-12">
            {config.text}
            {config.description && (
              <span className="ml-4 text-xs opacity-80">{config.description}</span>
            )}
          </span>
          <span className="text-sm font-semibold whitespace-nowrap px-12" aria-hidden>
            {config.text}
            {config.description && (
              <span className="ml-4 text-xs opacity-80">{config.description}</span>
            )}
          </span>
        </div>
      </div>
    );
  }

  // Static layout
  return (
    <div
      ref={barRef}
      role="banner"
      aria-live="polite"
      className="top-14 lg:top-[92px] z-40 left-0 right-0 w-full"
      style={{
        position: 'fixed',
        backgroundColor: config.backgroundColor,
        color: config.textColor,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14 py-2.5 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3">
        <div className="flex items-center gap-2 text-center">
          <span className="text-sm font-semibold">{config.text}</span>
          {config.description && (
            <span className="text-xs opacity-80">{config.description}</span>
          )}
        </div>
        {countdown && (
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded whitespace-nowrap"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            Kalan Süre: {countdown}
          </span>
        )}
        {config.dismissible && (
          <button
            onClick={handleDismiss}
            aria-label="Duyuruyu kapat"
            className="lg:absolute lg:right-4 mt-1 lg:mt-0 p-1 rounded hover:opacity-70 flex-shrink-0"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Helper Functions ───────────────────────────────────────────────────────

function matchesRoute(pathname: string, config: AnnouncementConfig): boolean {
  switch (config.targetMode) {
    case 'all':
      return true;
    case 'sectoral':
      return pathname === '/sektorel-yazilimlar' || pathname.startsWith('/sektorel-yazilimlar/');
    case 'selected':
      return config.targetRoutes.some(
        (r) => pathname === r || pathname.startsWith(r + '/')
      );
    case 'exclude':
      return !config.targetRoutes.some(
        (r) => pathname === r || pathname.startsWith(r + '/')
      );
    default:
      return false;
  }
}

function computeVisibility(config: AnnouncementConfig, pathname: string, dismissed: boolean): boolean {
  if (!config.enabled || dismissed) return false;

  const now = Date.now();

  // startsAt guard (both modes)
  if (config.startsAt && now < new Date(config.startsAt).getTime()) return false;

  // fixed mode: hide after expiresAt
  if (
    config.countdownMode === 'fixed' &&
    config.countdownEnabled &&
    config.expiresAt
  ) {
    if (now >= new Date(config.expiresAt).getTime()) return false;
  }

  // daily mode: hide after final expiresAt (if set)
  if (config.countdownMode === 'daily' && config.expiresAt) {
    if (now >= new Date(config.expiresAt).getTime()) return false;
  }

  return matchesRoute(pathname, config);
}

function computeCountdown(
  config: AnnouncementConfig,
  now: number
): { display: string | null; hide: boolean } {
  if (!config.countdownEnabled) return { display: null, hide: false };

  // startsAt guard — applies to both modes
  if (config.startsAt && now < new Date(config.startsAt).getTime()) {
    return { display: null, hide: true };
  }

  if (config.countdownMode === 'fixed') {
    // expiresAt is required in fixed mode (enforced by Zod)
    const end = new Date(config.expiresAt!).getTime();
    const remaining = end - now;
    if (remaining <= 0) return { display: null, hide: true };
    return { display: formatMs(remaining), hide: false };
  }

  // daily mode
  if (config.expiresAt && now >= new Date(config.expiresAt).getTime()) {
    return { display: null, hide: true };
  }

  // Calculate next reset time in visitor's local timezone
  const target = nextDailyReset(config.dailyResetHour, config.dailyResetMinute, now);
  const remaining = target - now;
  return { display: formatMs(remaining), hide: false };
}

function nextDailyReset(hour: number, minute: number, now: number): number {
  const d = new Date(now);
  // Build today's reset time in local timezone
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute, 0, 0);
  if (today.getTime() > now) return today.getTime();
  // Reset already passed today — return tomorrow's
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getTime();
}

function formatMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
