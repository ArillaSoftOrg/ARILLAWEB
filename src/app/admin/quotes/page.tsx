'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { ChevronDown, ChevronUp, FileText, Inbox, Mail, MailOpen, Trash2 } from 'lucide-react';
import {
  deleteQuoteRequest,
  getQuoteRequests,
  setQuoteRead,
  type AdminQuoteRequest,
} from '@/lib/quote-actions';
import { BUDGET_RANGE_LABELS, PLATFORM_LABELS, PROJECT_TYPE_LABELS } from '@/lib/constants';

type Filter = 'all' | 'unread' | 'read';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function AdminQuotesPage() {
  const [items, setItems] = useState<AdminQuoteRequest[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(async () => {
    try {
      setItems(await getQuoteRequests());
      setError(null);
    } catch {
      setError('Teklif talepleri yüklenemedi.');
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      load();
    });
  }, [load]);

  const unreadCount = items.filter((i) => !i.isRead).length;
  const visible = items.filter((i) => filter === 'all' || (filter === 'unread' ? !i.isRead : i.isRead));

  function toggleRead(item: AdminQuoteRequest) {
    startTransition(async () => {
      await setQuoteRead(item.id, !item.isRead);
      await load();
    });
  }

  function remove(id: string) {
    setConfirmId(null);
    startTransition(async () => {
      await deleteQuoteRequest(id);
      await load();
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f1f5f9' }}>
          Teklif Talepleri
        </h1>
        <p className="text-sm mt-1" style={{ color: '#64748b' }}>
          {items.length} talep
          {unreadCount > 0 && ` · ${unreadCount} okunmamış`}
          {isPending && ' · Güncelleniyor...'}
        </p>
      </div>

      <div className="flex gap-1 rounded-lg p-1 w-fit" style={{ background: '#08090d', border: '1px solid rgba(0,0,0,0.05)' }}>
        {(['all', 'unread', 'read'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 text-xs rounded-md transition-all"
            style={
              filter === f
                ? { background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }
                : { color: '#64748b' }
            }
          >
            {{ all: 'Tümü', unread: 'Okunmamış', read: 'Okunmuş' }[f]}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm" style={{ color: '#ef4444' }}>
          {error}
        </p>
      )}

      {visible.length === 0 && !error ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-xl"
          style={{ background: '#111219', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <Inbox size={28} style={{ color: '#475569' }} />
          <p className="text-sm mt-3" style={{ color: '#64748b' }}>
            Teklif talebi yok.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((item) => {
            const open = expanded === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl"
                style={{
                  background: '#111219',
                  border: item.isRead ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(124,58,237,0.35)',
                }}
              >
                <button
                  onClick={() => setExpanded(open ? null : item.id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                  aria-expanded={open}
                >
                  <FileText size={18} style={{ color: item.isRead ? '#475569' : '#a78bfa' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#f1f5f9' }}>
                      {item.fullName}
                      {item.company ? ` · ${item.company}` : ''}
                    </p>
                    <p className="text-xs truncate" style={{ color: '#64748b' }}>
                      {PROJECT_TYPE_LABELS[item.projectType] ?? item.projectType} · {formatDate(item.createdAt)}
                    </p>
                  </div>
                  {open ? <ChevronUp size={16} style={{ color: '#64748b' }} /> : <ChevronDown size={16} style={{ color: '#64748b' }} />}
                </button>

                {open && (
                  <div className="px-4 pb-4 space-y-3 text-sm" style={{ color: '#94a3b8' }}>
                    <p>
                      <a href={`mailto:${item.email}`} style={{ color: '#22d3ee' }}>
                        {item.email}
                      </a>
                      {item.phone && <span> · {item.phone}</span>}
                    </p>
                    <p>
                      Bütçe: {BUDGET_RANGE_LABELS[item.budgetRange] ?? item.budgetRange} · Platform:{' '}
                      {PLATFORM_LABELS[item.targetPlatform] ?? item.targetPlatform}
                      {item.hasExistingSystem && ' · Mevcut sistem var'}
                    </p>
                    {item.deliveryExpectation && <p>Teslim beklentisi: {item.deliveryExpectation}</p>}
                    <p style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1' }}>{item.description}</p>
                    {item.integrations && <p>Entegrasyonlar: {item.integrations}</p>}

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => toggleRead(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg hover:bg-white/5"
                        style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {item.isRead ? <Mail size={13} /> : <MailOpen size={13} />}
                        {item.isRead ? 'Okunmadı yap' : 'Okundu yap'}
                      </button>
                      {confirmId === item.id ? (
                        <>
                          <button
                            onClick={() => remove(item.id)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg"
                            style={{ background: '#ef4444', color: '#fff' }}
                          >
                            Evet, sil
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-3 py-1.5 text-xs rounded-lg"
                            style={{ color: '#64748b' }}
                          >
                            Vazgeç
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setConfirmId(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg hover:bg-white/5"
                          style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }}
                        >
                          <Trash2 size={13} />
                          Sil
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
