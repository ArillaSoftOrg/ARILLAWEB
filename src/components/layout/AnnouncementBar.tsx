'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import type { AnnouncementConfig } from '@/lib/announcement-actions';
import { useCookieConsentContext } from '@/components/cookie/CookieConsentProvider';

// ── Type ───────────────────────────────────────────────────────────────────

interface AnnouncementBarProps {
  configs: AnnouncementConfig[];
}

// ── Constants ──────────────────────────────────────────────────────────────

const SCROLL_DURATION: Record<'slow' | 'normal' | 'fast', string> = {
  slow: '30s',
  normal: '18s',
  fast: '10s',
};

// ── Component ──────────────────────────────────────────────────────────────

export default function AnnouncementBar({ configs }: AnnouncementBarProps) {
  const pathname = usePathname();
  const { isMounted, consentRecord } = useCookieConsentContext();
  const barRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Derived on each render — pure, no state needed
  const config = selectBestConfig(configs, pathname, dismissed);

  // ── Effect 0: Clear --bar-h when no config matches ─────────────────────────

  useEffect(() => {
    if (!config) {
      document.documentElement.style.setProperty('--bar-h', '0px');
    }
  }, [config]);

  // ── Effect 1: Mount guard ──────────────────────────────────────────────────

  useEffect(() => {
    if (!isMounted) return;

    setMounted(true);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReduced);

    if (config?.dismissible && consentRecord.categories.functional) {
      const key = `announcement-dismissed-${config.text.slice(0, 20)}`;
      const wasDismissed = !!sessionStorage.getItem(key);
      setDismissed(wasDismissed);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, consentRecord.categories.functional]);

  // ── Effect 2: Visibility + CSS variable ────────────────────────────────────

  useEffect(() => {
    if (!mounted) return;

    const shouldShow = config ? computeVisibility(config, pathname, dismissed) : false;
    setVisible(shouldShow);

    if (shouldShow && barRef.current) {
      const height = barRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--bar-h', `${height}px`);
    } else {
      document.documentElement.style.setProperty('--bar-h', '0px');
    }
  }, [mounted, pathname, dismissed, config]);

  // ── Effect 3: Countdown ticker ─────────────────────────────────────────────

  useEffect(() => {
    if (!visible || !config?.countdownEnabled) {
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
    config?.countdownEnabled,
    config?.countdownMode,
    config?.startsAt,
    config?.expiresAt,
    config?.dailyResetHour,
    config?.dailyResetMinute,
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
    if (!config) return;
    if (consentRecord.categories.functional) {
      const key = `announcement-dismissed-${config.text.slice(0, 20)}`;
      sessionStorage.setItem(key, '1');
    }
    setDismissed(true);
    setVisible(false);
    document.documentElement.style.setProperty('--bar-h', '0px');
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!mounted || !visible || !config) return null;

  const useMarquee = config.scrollEnabled && !reducedMotion;

  if (useMarquee) {
    // Compose the full scrolling string: text — description — ⏱ countdown
    const scrollParts = [
      config.text,
      config.description || null,
      countdown ? `⏱ ${countdown}` : null,
    ].filter(Boolean).join(' — ');

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
        {/* Scrolling text track */}
        <div
          className="flex py-2.5 announcement-marquee-track"
          style={{ animationDuration: SCROLL_DURATION[config.scrollSpeed] }}
        >
          <span className="text-sm md:text-base font-semibold tracking-wide whitespace-nowrap px-12">
            {scrollParts}
          </span>
          <span className="text-sm md:text-base font-semibold tracking-wide whitespace-nowrap px-12" aria-hidden>
            {scrollParts}
          </span>
        </div>

        {/* Dismiss button overlay — outside scroll track */}
        {config.dismissible && (
          <div
            className="absolute right-0 top-0 h-full flex items-center pr-4 lg:pr-6 z-10"
            style={{
              background: `linear-gradient(to right, transparent, ${config.backgroundColor} 25%)`,
            }}
          >
            <button
              onClick={handleDismiss}
              aria-label="Duyuruyu kapat"
              className="p-1 rounded hover:opacity-70 flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        )}
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
          <span className="text-sm md:text-base font-semibold tracking-wide">{config.text}</span>
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
    const end = new Date(config.expiresAt!).getTime();
    const remaining = end - now;
    if (remaining <= 0) return { display: null, hide: true };
    return { display: formatMs(remaining), hide: false };
  }

  // daily mode
  if (config.expiresAt && now >= new Date(config.expiresAt).getTime()) {
    return { display: null, hide: true };
  }

  const target = nextDailyReset(config.dailyResetHour, config.dailyResetMinute, now);
  const remaining = target - now;
  return { display: formatMs(remaining), hide: false };
}

function nextDailyReset(hour: number, minute: number, now: number): number {
  const d = new Date(now);
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute, 0, 0);
  if (today.getTime() > now) return today.getTime();
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

function selectBestConfig(
  configs: AnnouncementConfig[],
  pathname: string,
  dismissed: boolean
): AnnouncementConfig | null {
  const candidates = configs
    .filter((c) => matchesRoute(pathname, c))
    .filter((c) => computeVisibility(c, pathname, dismissed));

  if (candidates.length === 0) return null;

  // Sort: priority DESC, then updatedAt DESC (ISO strings sort correctly)
  candidates.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  return candidates[0];
}
