"use client";

import { startTransition, useEffect, useState } from "react";
import { Check, ExternalLink, Inbox, Mail, Phone } from "lucide-react";
import { getDesignInquiries, markDesignInquiryRead } from "@/lib/design-inquiry-actions";

type Inquiry = Awaited<ReturnType<typeof getDesignInquiries>>[number];

export default function DesignInquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await getDesignInquiries();
    setInquiries(data);
    setLoading(false);
  }

  useEffect(() => {
    startTransition(() => {
      load();
    });
  }, []);

  async function toggleRead(inquiry: Inquiry) {
    await markDesignInquiryRead(inquiry.id, !inquiry.isRead);
    await load();
  }

  if (loading) return <p className="text-slate-500">Talepler yükleniyor...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Tasarım Talepleri</h1>
        <p className="mt-2 text-sm text-slate-500">
          {inquiries.length} talep · {inquiries.filter((item) => !item.isRead).length} okunmamış
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Inbox className="mx-auto h-9 w-9 text-slate-400" />
          <h2 className="mt-4 font-bold text-slate-900">Henüz tasarım talebi yok.</h2>
        </div>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <article
              key={inquiry.id}
              className={`rounded-2xl border bg-white p-6 shadow-sm ${inquiry.isRead ? "border-slate-200" : "border-blue-300 ring-2 ring-blue-100"}`}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-950 px-2.5 py-1 font-mono text-xs font-bold text-white">{inquiry.designCode}</span>
                    <span className="text-xs font-semibold text-blue-600">{inquiry.sector}</span>
                    {!inquiry.isRead && <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase text-blue-700">Yeni</span>}
                  </div>
                  <h2 className="mt-4 text-lg font-black text-slate-950">{inquiry.fullName} · {inquiry.company}</h2>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                    {inquiry.phone && <a href={`tel:${inquiry.phone}`} className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{inquiry.phone}</a>}
                    {inquiry.email && <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{inquiry.email}</a>}
                  </div>
                  {inquiry.message && <p className="mt-4 max-w-3xl rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{inquiry.message}</p>}
                  <p className="mt-4 text-xs text-slate-400">{new Date(inquiry.createdAt).toLocaleString("tr-TR")}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  {inquiry.project?.category && (
                    <a
                      href={`/tr/site-ornekleri/${inquiry.project.category.slug}/${inquiry.project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-700"
                    >
                      Tasarım <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => toggleRead(inquiry)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-3 text-xs font-bold text-white"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {inquiry.isRead ? "Okunmadı yap" : "Okundu"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
