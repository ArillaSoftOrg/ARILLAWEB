'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Calendar,
  Clock,
  Trash2,
  ChevronDown,
  ChevronUp,
  Phone,
  User,
  Inbox,
  Search,
  CheckCircle2,
} from 'lucide-react';
import {
  getAppointmentRequests,
  setAppointmentRead,
  deleteAppointmentRequest,
} from '@/lib/appointment-actions';

type Filter = 'all' | 'unread' | 'read';

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  isRead: boolean;
  createdAt: string | Date;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);
  const [isPending, startTransition] = useTransition();

  async function load() {
    const data = await getAppointmentRequests();
    setAppointments(data);
  }

  useEffect(() => {
    startTransition(() => {
      load();
    });
  }, []);

  const unreadCount = appointments.filter((a) => !a.isRead).length;

  const filtered = appointments.filter((a) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && !a.isRead) ||
      (filter === 'read' && a.isRead);
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      (a.phone?.toLowerCase().includes(q)) ||
      (a.email?.toLowerCase().includes(q)) ||
      a.service.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  function toggleExpand(id: string, isRead: boolean) {
    setExpanded((prev) => (prev === id ? null : id));
    if (!isRead) {
      startTransition(async () => {
        await setAppointmentRead(id, true);
        await load();
      });
    }
  }

  function handleToggleRead(e: React.MouseEvent, appointment: Appointment) {
    e.stopPropagation();
    startTransition(async () => {
      await setAppointmentRead(appointment.id, !appointment.isRead);
      await load();
    });
  }

  function handleDelete(e: React.MouseEvent, appointment: Appointment) {
    e.stopPropagation();
    setDeleteTarget(appointment);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    startTransition(async () => {
      await deleteAppointmentRequest(id);
      await load();
    });
  }

  const formatDate = (iso: string | Date) =>
    new Date(iso).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatAppointmentDate = (dateStr: string, timeStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ` ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Delete confirm dialog */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)' }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6"
            style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(239,68,68,0.1)' }}
            >
              <Trash2 size={20} style={{ color: '#ef4444' }} />
            </div>
            <h3 className="text-base font-semibold mb-2" style={{ color: '#0f172a' }}>
              Randevuyu Sil
            </h3>
            <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
              <span style={{ color: '#475569' }}>{deleteTarget.name}</span> adlı
              kişinin randevu talebini sileceksiniz. Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors"
                style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 text-sm font-semibold rounded-lg hover:opacity-90 transition-all"
                style={{ background: '#ef4444', color: '#fff' }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>
            Randevu Talepleri
          </h1>
          <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
            {appointments.length} randevu
            {unreadCount > 0 && (
              <span
                className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(6,182,212,0.15)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.25)' }}
              >
                {unreadCount} okunmamış
              </span>
            )}
            {isPending && <span className="ml-2">· Güncelleniyor...</span>}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
        style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: '#475569' }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İsim, telefon veya hizmet ara..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg"
            style={{
              background: '#f8fafc',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#0f172a',
              outline: 'none',
            }}
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 rounded-lg p-1" style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}>
          {(['all', 'unread', 'read'] as Filter[]).map((f) => {
            const labels: Record<Filter, string> = { all: 'Tümü', unread: 'Okunmamış', read: 'Okunmuş' };
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 text-xs rounded-md transition-all"
                style={
                  filter === f
                    ? { background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }
                    : { color: '#94a3b8' }
                }
              >
                {labels[f]}
                {f === 'unread' && unreadCount > 0 && (
                  <span
                    className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                    style={{ background: 'rgba(6,182,212,0.2)', color: '#22d3ee' }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointments list */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-xl"
          style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(0,0,0,0.04)' }}
          >
            <Inbox size={24} style={{ color: '#334155' }} />
          </div>
          <p className="text-sm font-medium" style={{ color: '#475569' }}>
            {search || filter !== 'all' ? 'Sonuç bulunamadı' : 'Henüz randevu yok'}
          </p>
          <p className="text-xs mt-1" style={{ color: '#334155' }}>
            {search || filter !== 'all'
              ? 'Arama kriterini veya filtreyi değiştirin'
              : 'Randevu talepleri burada görünecek'}
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden divide-y"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.05)',
            borderColor: 'rgba(0,0,0,0.05)',
          }}
        >
          {filtered.map((appt) => {
            const isExpanded = expanded === appt.id;
            return (
              <div
                key={appt.id}
                className="transition-colors"
                style={{ borderColor: 'rgba(0,0,0,0.04)' }}
              >
                {/* Row header — always visible */}
                <div
                  className="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-white/[0.015] transition-colors"
                  onClick={() => toggleExpand(appt.id, appt.isRead)}
                >
                  {/* Unread indicator + icon */}
                  <div className="flex flex-col items-center gap-1.5 pt-0.5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={
                        appt.isRead
                          ? { background: 'rgba(0,0,0,0.04)' }
                          : { background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }
                      }
                    >
                      {appt.isRead ? (
                        <CheckCircle2 size={16} style={{ color: '#475569' }} />
                      ) : (
                        <Calendar size={16} style={{ color: '#22d3ee' }} />
                      )}
                    </div>
                    {!appt.isRead && (
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#22d3ee' }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: appt.isRead ? '#475569' : '#0f172a' }}
                      >
                        {appt.name}
                      </span>
                      <span className="text-xs" style={{ color: '#475569' }}>
                        {appt.phone || appt.email}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs" style={{ color: '#475569' }}>
                        <Inbox size={10} />
                        {appt.service}
                      </span>
                    </div>
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: appt.isRead ? '#94a3b8' : '#cbd5e1' }}
                    >
                      {formatAppointmentDate(appt.date, appt.time)}
                    </p>
                    {!isExpanded && appt.message && (
                      <p className="mt-0.5 text-xs line-clamp-1" style={{ color: '#475569' }}>
                        {appt.message}
                      </p>
                    )}
                  </div>

                  {/* Right side: date + actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-xs" style={{ color: '#475569' }}>
                      <Clock size={11} />
                      <span className="hidden sm:inline">{formatDate(appt.createdAt)}</span>
                      <span className="sm:hidden">
                        {new Date(appt.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleToggleRead(e, appt)}
                        disabled={isPending}
                        title={appt.isRead ? 'Okunmamış işaretle' : 'Okundu işaretle'}
                        className="p-1.5 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
                        style={{ color: '#475569' }}
                      >
                        {appt.isRead ? <Calendar size={13} /> : <CheckCircle2 size={13} />}
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, appt)}
                        disabled={isPending}
                        title="Sil"
                        className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={13} />
                      </button>
                      <span style={{ color: '#334155' }}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded appointment details */}
                {isExpanded && (
                  <div
                    className="px-5 pb-5"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}
                  >
                    <div
                      className="mt-4 rounded-xl p-5 space-y-4"
                      style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}
                    >
                      {/* Meta row */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: '#94a3b8' }}>
                        <span>
                          <span className="uppercase tracking-wider mr-1" style={{ color: '#475569' }}>
                            İsim:
                          </span>
                          <span style={{ color: '#475569' }}>{appt.name}</span>
                        </span>
                        <span>
                          <span className="uppercase tracking-wider mr-1" style={{ color: '#475569' }}>
                            Tel:
                          </span>
                          {appt.phone ? (
                            <a
                              href={`tel:${appt.phone}`}
                              className="hover:text-cyan-400 transition-colors"
                              style={{ color: '#475569' }}
                            >
                              {appt.phone}
                            </a>
                          ) : (
                            <span style={{ color: '#475569' }}>{appt.email}</span>
                          )}
                        </span>
                        <span>
                          <span className="uppercase tracking-wider mr-1" style={{ color: '#475569' }}>
                            Hizmet:
                          </span>
                          <span style={{ color: '#475569' }}>{appt.service}</span>
                        </span>
                        <span>
                          <span className="uppercase tracking-wider mr-1" style={{ color: '#475569' }}>
                            Talep Tarihi:
                          </span>
                          <span style={{ color: '#475569' }}>{formatDate(appt.createdAt)}</span>
                        </span>
                      </div>

                      {/* Appointment date/time */}
                      <div
                        className="p-4 rounded-lg"
                        style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={14} style={{ color: '#a78bfa' }} />
                          <span className="text-sm font-semibold" style={{ color: '#e9d5ff' }}>
                            {formatAppointmentDate(appt.date, appt.time)}
                          </span>
                        </div>
                      </div>

                      {/* Message body */}
                      {appt.message && (
                        <p className="text-sm leading-7 whitespace-pre-line" style={{ color: '#cbd5e1' }}>
                          {appt.message}
                        </p>
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
