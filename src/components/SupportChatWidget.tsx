"use client";

import { useState, useRef, useEffect, type RefObject } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useCookieConsentContext } from '@/components/cookie/CookieConsentProvider';

const AUTO_TRIGGERED_KEY = 'support-chat-auto-triggered';
const INTERACTED_KEY = 'support-chat-interacted';
const DISMISSED_KEY = 'support-chat-dismissed';
const DWELL_MS = 1800;
const TEASER_AUTO_HIDE_MS = 8000;
const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';
// audio.volume caps at 1 — this drives loudness above that via a GainNode instead.
// Single tunable knob: lower to 2.0 / 1.5 if the sound ever distorts/clips.
const NOTIFICATION_GAIN = 3.0;

interface SupportChatWidgetProps {
  triggerRef?: RefObject<HTMLDivElement | null>;
}

export default function SupportChatWidget({ triggerRef }: SupportChatWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showTeaser, setShowTeaser] = useState(false);
  const [attentionPulse, setAttentionPulse] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('chat');
  const { consentRecord } = useCookieConsentContext();

  const hasAutoTriggeredRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const hasDismissedRef = useRef(false);
  const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const teaserHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);
  const notificationGraphRef = useRef<{ context: AudioContext; gainNode: GainNode } | null>(null);

  const isSectionInView = useInView(triggerRef ?? fallbackRef, { amount: 0.4 });

  const quickOptions = [
    { label: t('consultationLabel'), message: t('consultationMsg') },
    { label: t('infoLabel'), message: t('infoMsg') },
    { label: t('priceLabel'), message: t('priceMsg') },
  ];

  const sendToWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/905422535192?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      sendToWhatsApp(message);
    }
  };

  // Hydrate session-scoped guard flags once on mount.
  useEffect(() => {
    hasAutoTriggeredRef.current = sessionStorage.getItem(AUTO_TRIGGERED_KEY) === '1';
    hasInteractedRef.current = sessionStorage.getItem(INTERACTED_KEY) === '1';
    hasDismissedRef.current = sessionStorage.getItem(DISMISSED_KEY) === '1';
  }, []);

  // Same prefers-reduced-motion pattern already used in HomeClient.tsx's SiteExamplesPreviewSection.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const playNotificationSound = () => {
    // Browser autoplay policy blocks sound with no prior user interaction — check
    // proactively instead of relying solely on the play() rejection. This never
    // blocks the chat widget itself from opening; it only decides whether to
    // attempt playback.
    const hasUserActivation = typeof navigator !== 'undefined' && navigator.userActivation?.hasBeenActive === true;

    if (!hasUserActivation) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[SupportChatWidget] Notification sound skipped — no prior user interaction (browser autoplay policy).');
      }
      return;
    }

    try {
      if (!notificationAudioRef.current) {
        notificationAudioRef.current = new Audio('/sounds/chat-notification.wav');
      }
      const audio = notificationAudioRef.current;
      audio.volume = 1; // uncapped loudness now comes from the GainNode below, not this.

      // Build the audio -> gainNode -> destination graph once and reuse it —
      // createMediaElementSource() can only be called a single time per element.
      if (!notificationGraphRef.current) {
        const AudioContextCtor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextCtor) {
          const context = new AudioContextCtor();
          const source = context.createMediaElementSource(audio);
          const gainNode = context.createGain();
          gainNode.gain.value = NOTIFICATION_GAIN;
          source.connect(gainNode).connect(context.destination);
          notificationGraphRef.current = { context, gainNode };
        }
      }

      if (notificationGraphRef.current?.context.state === 'suspended') {
        notificationGraphRef.current.context.resume().catch(() => {});
      }

      audio.currentTime = 0;
      audio.play().catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          console.debug('[SupportChatWidget] Notification sound playback failed:', err);
        }
      });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[SupportChatWidget] Notification sound unavailable:', err);
      }
    }
  };

  const fireAutoTrigger = () => {
    hasAutoTriggeredRef.current = true;
    sessionStorage.setItem(AUTO_TRIGGERED_KEY, '1');

    // Cookie banner renders at z-index 60, above the panel (40) — avoid opening under it.
    if (!consentRecord.hasDecided) return;

    const isDesktop = window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

    setAttentionPulse(true);
    playNotificationSound();

    if (isDesktop) {
      setTimeout(() => {
        setAttentionPulse(false);
        setIsOpen(true);
      }, 400);
    } else {
      setShowTeaser(true);
      setTimeout(() => setAttentionPulse(false), 700);
      teaserHideTimerRef.current = setTimeout(() => {
        setShowTeaser(false);
      }, TEASER_AUTO_HIDE_MS);
    }
  };

  // Dwell-time: only auto-trigger once the "How It Works" section has stayed in view.
  useEffect(() => {
    if (!triggerRef || isOpen) return;

    if (!isSectionInView) {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
      return;
    }

    if (hasAutoTriggeredRef.current || hasInteractedRef.current || hasDismissedRef.current) return;

    dwellTimerRef.current = setTimeout(() => {
      fireAutoTrigger();
    }, DWELL_MS);

    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSectionInView, isOpen]);

  // Escape closes an open panel, mirroring the explicit X-close dismissal.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hasDismissedRef.current = true;
        sessionStorage.setItem(DISMISSED_KEY, '1');
        setIsOpen(false);
        setMessage("");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeTeaser = () => {
    setShowTeaser(false);
    if (teaserHideTimerRef.current) {
      clearTimeout(teaserHideTimerRef.current);
      teaserHideTimerRef.current = null;
    }
  };

  const markInteracted = () => {
    hasInteractedRef.current = true;
    sessionStorage.setItem(INTERACTED_KEY, '1');
  };

  const handleToggleClick = () => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    if (!isOpen) {
      markInteracted();
      if (showTeaser) closeTeaser();
    }
    setIsOpen(!isOpen);
  };

  const handleCloseClick = () => {
    hasDismissedRef.current = true;
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setIsOpen(false);
    setMessage("");
  };

  const handleTeaserClick = () => {
    closeTeaser();
    markInteracted();
    setIsOpen(true);
  };

  return (
    <>
      {/* Unread badge — mirrors the mobile teaser's visibility */}
      {showTeaser && (
        <span
          aria-hidden="true"
          style={{
            position: "fixed",
            bottom: "62px",
            right: "14px",
            minWidth: "18px",
            height: "18px",
            borderRadius: "999px",
            background: "#ef4444",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 51,
            pointerEvents: "none",
          }}
        >
          1
        </span>
      )}

      {/* Mobile teaser bubble */}
      {showTeaser && !isOpen && (
        <button
          type="button"
          aria-label={t('teaserAriaLabel')}
          onClick={handleTeaserClick}
          style={{
            position: "fixed",
            bottom: "82px",
            right: "20px",
            maxWidth: "min(260px, calc(100vw - 40px))",
            textAlign: "left",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            padding: "12px 14px",
            zIndex: 45,
            cursor: "pointer",
            fontSize: "13px",
            lineHeight: 1.5,
            color: "#1f2937",
          }}
        >
          {t('teaserText')}
        </button>
      )}

      {/* Floating button */}
      <button
        onClick={handleToggleClick}
        aria-label={t('toggleAriaLabel')}
        className={!reducedMotion && attentionPulse ? "support-chat-attention" : undefined}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
          border: "none",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
          zIndex: 50,
          transition: "all 0.3s ease",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.35)";
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            width: "min(320px, calc(100vw - 32px))",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            boxShadow: "0 24px 56px rgba(0,0,0,0.15)",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            maxHeight: "70vh",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "#1f2937",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>
              {t('title')}
            </h3>
            <button
              onClick={handleCloseClick}
              aria-label={t('closeAriaLabel')}
              style={{
                background: "transparent",
                border: "none",
                color: "#d1d5db",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#d1d5db"; }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "16px 14px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: "#ffffff",
            }}
          >
            <div style={{ textAlign: "center", fontSize: "11px", color: "#9ca3af", marginBottom: "4px" }}>
              {t('today')}
            </div>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: "#f3f4f6",
                fontSize: "13px",
                color: "#4b5563",
                lineHeight: 1.6,
                marginBottom: "4px",
              }}
            >
              {t('greeting')}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {quickOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => sendToWhatsApp(option.message)}
                  style={{
                    padding: "9px 14px",
                    borderRadius: "20px",
                    background: "#ffffff",
                    border: "1px solid #d1d5db",
                    color: "#374151",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = "#f9fafb";
                    btn.style.borderColor = "#9ca3af";
                    btn.style.color = "#1f2937";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = "#ffffff";
                    btn.style.borderColor = "#d1d5db";
                    btn.style.color = "#374151";
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input section */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "8px",
              background: "#ffffff",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder={t('messagePlaceholder')}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d1d5db",
                color: "#1f2937",
                fontSize: "13px",
                outline: "none",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#7c3aed";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(124,58,237,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                background: message.trim() ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "#d1d5db",
                border: "none",
                color: "white",
                cursor: message.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (message.trim()) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(124,58,237,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (message.trim()) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
