'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsentContext } from './CookieConsentProvider';

const LABELS = {
  title: 'Çerez Bildirimi',
  description:
    'Daha iyi bir deneyim sunmak için çerezler ve tarayıcı depolama kullanıyoruz. Tercihlerinizi istediğiniz zaman değiştirebilirsiniz.',
  acceptAll: 'Tümünü Kabul Et',
  rejectOptional: 'Yalnızca Zorunlu',
  preferences: 'Tercihleri Yönet',
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 60,
            padding: '12px 16px',
          }}
        >
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              background: 'rgba(10,10,10,0.97)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '14px',
              padding: '20px 24px',
              boxShadow: '0 -4px 40px rgba(0,0,0,0.7)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ flex: '1 1 280px' }}>
                <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                  {LABELS.title}
                </p>
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
                  {LABELS.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '13px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'color 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#e2e8f0')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  {LABELS.preferences}
                </button>
                <button
                  type="button"
                  onClick={rejectOptional}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#e2e8f0';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  {LABELS.rejectOptional}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '8px 20px',
                    borderRadius: '8px',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    boxShadow: '0 2px 12px rgba(124,58,237,0.4)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.6)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(124,58,237,0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
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
