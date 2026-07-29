"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DesignInquiryFormProps = {
  projectId: string;
  designCode: string;
  designTitle: string;
  sector: string;
  detailUrl: string;
};

export default function DesignInquiryForm({
  projectId,
  designCode,
  designTitle,
  sector,
  detailUrl,
}: DesignInquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const whatsappMessage = [
    "Merhaba ArillaSoft, bu tasarımı işletmeme uyarlamak istiyorum.",
    `Tasarım kodu: ${designCode}`,
    `Tasarım: ${designTitle}`,
    `Sektör: ${sector}`,
    `Bağlantı: ${detailUrl}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/905422535192?text=${encodeURIComponent(whatsappMessage)}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/design-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          company: form.get("company"),
          phone: form.get("phone"),
          email: form.get("email"),
          message: form.get("message"),
          projectId,
          designCode,
          sector,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Talep gönderilemedi.");
      setStatus("success");
      event.currentTarget.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Talep gönderilemedi.");
      setStatus("error");
    }
  }

  return (
    <div id="tasarim-talebi" className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl md:p-8">
      <span className="font-mono text-xs font-bold tracking-widest text-cyan-300">{designCode}</span>
      <h2 className="mt-2 text-2xl font-black tracking-tight">Bu tasarımı işletmenize uyarlayalım</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Kısa bilgilerinizi bırakın. Tasarımı ihtiyaçlarınıza göre nasıl uyarlayabileceğimizi birlikte netleştirelim.
      </p>

      {status === "success" ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
          <CheckCircle2 className="h-7 w-7 text-emerald-300" />
          <h3 className="mt-3 font-bold">Talebiniz alındı.</h3>
          <p className="mt-1 text-sm text-emerald-100">En kısa sürede sizinle iletişime geçeceğiz.</p>
        </div>
      ) : (
        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input name="fullName" required minLength={2} placeholder="Ad soyad *" className="border-white/15 bg-white/10 text-white placeholder:text-slate-400" />
            <Input name="company" required minLength={2} placeholder="İşletme adı *" className="border-white/15 bg-white/10 text-white placeholder:text-slate-400" />
            <Input name="phone" placeholder="Telefon" className="border-white/15 bg-white/10 text-white placeholder:text-slate-400" />
            <Input name="email" type="email" placeholder="E-posta" className="border-white/15 bg-white/10 text-white placeholder:text-slate-400" />
          </div>
          <p className="text-xs text-slate-400">Telefon veya e-posta bilgilerinden en az birini girin.</p>
          <Textarea name="message" maxLength={1000} rows={4} placeholder="İşletmeniz ve istediğiniz değişiklikler" className="border-white/15 bg-white/10 text-white placeholder:text-slate-400" />
          {status === "error" && <p className="text-sm text-rose-300">{error}</p>}
          <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-500" disabled={status === "loading"}>
            {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor...</> : "Tasarım için görüşme iste"}
          </Button>
        </form>
      )}

      <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px flex-1 bg-white/10" />
        veya
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-sm font-bold text-emerald-300 transition hover:bg-emerald-400/20"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp ile tasarım kodunu gönder
      </a>
    </div>
  );
}
