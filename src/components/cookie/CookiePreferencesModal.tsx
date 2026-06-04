'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { COOKIE_CATEGORIES, COOKIE_ENTRIES, type CategoryId } from '@/lib/cookie-config';
import { useCookieConsentContext } from './CookieConsentProvider';

const LABELS = {
  title: 'Çerez Tercihleri',
  description:
    'Hangi çerezlere ve tarayıcı depolama alanlarına izin vermek istediğinizi seçebilirsiniz. Zorunlu olanlar her zaman etkindir.',
  save: 'Tercihleri Kaydet',
  acceptAll: 'Tümünü Kabul Et',
  rejectOptional: 'Yalnızca Zorunlu',
  alwaysOn: 'Her zaman aktif',
  showDetails: 'Detayları göster',
  hideDetails: 'Gizle',
  noEntries: 'Bu kategori için henüz tanımlı veri yok.',
  tableHeaders: ['Ad', 'Tür', 'Alan', 'Süre', 'Açıklama'],
  typeLabels: {
    cookie: 'Çerez',
    sessionStorage: 'Oturum Depolama',
    localStorage: 'Yerel Depolama',
  } as Record<string, string>,
};

type Draft = { functional: boolean; analytics: boolean; marketing: boolean };

export function CookiePreferencesModal() {
  const {
    preferencesOpen,
    setPreferencesOpen,
    consentRecord,
    acceptAll,
    rejectOptional,
    savePreferences,
  } = useCookieConsentContext();

  const [draft, setDraft] = useState<Draft>({
    functional: consentRecord.categories.functional,
    analytics: consentRecord.categories.analytics,
    marketing: consentRecord.categories.marketing,
  });
  const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>(null);

  useEffect(() => {
    if (!preferencesOpen) return;

    setDraft({
      functional: consentRecord.categories.functional,
      analytics: consentRecord.categories.analytics,
      marketing: consentRecord.categories.marketing,
    });
  }, [preferencesOpen, consentRecord]);

  function handleSave() {
    savePreferences(draft);
    setPreferencesOpen(false);
  }

  function handleAcceptAll() {
    acceptAll();
    setPreferencesOpen(false);
  }

  function handleRejectOptional() {
    rejectOptional();
    setPreferencesOpen(false);
  }

  return (
    <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
      <DialogContent
        className="max-w-2xl overflow-y-auto p-0"
        style={{
          maxHeight: '90vh',
          background: '#0f0f0f',
          border: '1px solid rgba(124,58,237,0.25)',
          color: '#e2e8f0',
        }}
      >
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle style={{ color: '#fff', fontSize: '18px' }}>{LABELS.title}</DialogTitle>
            <DialogDescription style={{ color: '#94a3b8', marginTop: '6px' }}>
              {LABELS.description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-3 p-6">
          {COOKIE_CATEGORIES.map((cat) => {
            const isRequired = cat.required;
            const draftKey = cat.id as keyof Draft;
            const isChecked = isRequired ? true : draft[draftKey];
            const isExpanded = expandedCategory === cat.id;
            const entries = COOKIE_ENTRIES.filter((entry) => entry.category === cat.id);

            return (
              <div
                key={cat.id}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                }}
              >
                <div className="flex items-start gap-3 p-4">
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>
                        {cat.label}
                      </span>
                      {isRequired && <Lock size={12} style={{ color: '#64748b' }} />}
                    </div>
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.5 }}>
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3" style={{ flexShrink: 0, marginTop: '2px' }}>
                    {isRequired ? (
                      <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                        {LABELS.alwaysOn}
                      </span>
                    ) : (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isChecked}
                        aria-label={cat.label}
                        onClick={() => setDraft((prev) => ({ ...prev, [draftKey]: !prev[draftKey] }))}
                        style={{
                          width: '44px',
                          height: '24px',
                          borderRadius: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          background: isChecked ? '#7c3aed' : 'rgba(255,255,255,0.15)',
                          position: 'relative',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            top: '3px',
                            left: isChecked ? '22px' : '3px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: '#fff',
                            transition: 'left 0.2s',
                          }}
                        />
                      </button>
                    )}

                    {entries.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                        aria-label={isExpanded ? LABELS.hideDetails : LABELS.showDetails}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2px',
                          transition: 'color 0.15s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#94a3b8')}
                        onMouseOut={(e) => (e.currentTarget.style.color = '#64748b')}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px' }}>
                    {entries.length === 0 ? (
                      <p style={{ fontSize: '12px', color: '#64748b' }}>{LABELS.noEntries}</p>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: '#94a3b8' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                              {LABELS.tableHeaders.map((header) => (
                                <th
                                  key={header}
                                  style={{
                                    textAlign: 'left',
                                    padding: '6px 12px 6px 0',
                                    color: '#64748b',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {entries.map((entry) => (
                              <tr key={entry.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <td style={{ padding: '8px 12px 8px 0', fontFamily: 'monospace', color: '#cbd5e1', whiteSpace: 'nowrap' }}>
                                  {entry.name}
                                </td>
                                <td style={{ padding: '8px 12px 8px 0' }}>
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      padding: '2px 7px',
                                      borderRadius: '4px',
                                      background: 'rgba(124,58,237,0.2)',
                                      color: '#a78bfa',
                                      fontSize: '11px',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {LABELS.typeLabels[entry.type] ?? entry.type}
                                  </span>
                                </td>
                                <td style={{ padding: '8px 12px 8px 0', whiteSpace: 'nowrap' }}>{entry.domain}</td>
                                <td style={{ padding: '8px 12px 8px 0', whiteSpace: 'nowrap' }}>{entry.duration}</td>
                                <td style={{ padding: '8px 0' }}>{entry.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '16px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={handleRejectOptional}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#64748b',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'color 0.15s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#cbd5e1')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            {LABELS.rejectOptional}
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            style={{
              background: 'transparent',
              border: '1px solid rgba(124,58,237,0.5)',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#a78bfa',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'background 0.15s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(124,58,237,0.1)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {LABELS.acceptAll}
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              padding: '8px 20px',
              borderRadius: '8px',
              transition: 'box-shadow 0.2s, transform 0.2s',
              boxShadow: '0 2px 10px rgba(124,58,237,0.35)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(124,58,237,0.55)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(124,58,237,0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {LABELS.save}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
