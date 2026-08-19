'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsentContext } from './CookieConsentProvider';
import styles from './CookieBanner.module.css';

const LABELS = {
  description: 'Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz.',
  acceptAll: 'Tümünü Kabul Et',
  rejectOptional: 'Tümünü Reddet',
  preferences: 'Tercihleri Göster',
};

export function CookieBanner() {
  const { isMounted, consentRecord, acceptAll, rejectOptional, setPreferencesOpen } =
    useCookieConsentContext();

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {!consentRecord.hasDecided && (
        <motion.div
          key="cookie-banner"
          className={styles.wrapper}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-live="polite"
          aria-label="Çerez bildirimi"
        >
          <div className={styles.bar}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.content}>
              <div className={styles.message}>
                <span className={styles.icon} aria-hidden="true">
                  🍪
                </span>
                <p className={styles.text}>{LABELS.description}</p>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => setPreferencesOpen(true)}
                >
                  {LABELS.preferences}
                </button>
                <button type="button" className={styles.rejectBtn} onClick={rejectOptional}>
                  {LABELS.rejectOptional}
                </button>
                <button type="button" className={styles.primaryBtn} onClick={acceptAll}>
                  {LABELS.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
