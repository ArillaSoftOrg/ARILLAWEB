'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { teklifAlSchema, type TeklifAlFormValues } from '@/lib/validations/teklif-al';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const SOLUTION_LABELS: Record<string, string> = {
  QR_MENU: 'QR Menü Sistemi',
  RANDEVU_SISTEMI: 'Online Randevu Sistemi',
  KUAFOR_RANDEVU: 'Kuaför Randevu Sistemi',
  KLINIK_RANDEVU: 'Klinik Randevu Sistemi',
  GUZELLIK_RANDEVU: 'Güzellik Merkezi Randevu Sistemi',
  WEB_GELISTIRME: 'Web Geliştirme',
  MOBIL_UYGULAMA: 'Mobil Uygulama',
  OZEL_YAZILIM: 'Özel Yazılım',
};

export default function TeklifAlClient() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TeklifAlFormValues>({
    resolver: zodResolver(teklifAlSchema),
  });

  const onSubmit = async (data: TeklifAlFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Teklif Talebiniz Alındı!</h3>
        <p className="text-green-600 mb-2">1-2 iş günü içinde size detaylı teklif sunacağız.</p>
        <p className="text-sm text-green-500 mb-4">E-posta adresinize onay mesajı gönderildi.</p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          Yeni Teklif Talebi
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-600">Form gönderilemedi. Lütfen tekrar deneyin.</p>
        </div>
      )}

      {/* İletişim Bilgileri */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          İletişim Bilgileri
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Ad Soyad *</Label>
            <Input id="fullName" placeholder="Ahmet Yılmaz" {...register('fullName')} />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-posta *</Label>
            <Input id="email" type="email" placeholder="ahmet@sirket.com" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Telefon *</Label>
            <Input id="phone" placeholder="+90 500 000 00 00" {...register('phone')} />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company">Şirket / İşletme Adı *</Label>
            <Input id="company" placeholder="Şirket Adı" {...register('company')} />
            {errors.company && <p className="text-xs text-red-500">{errors.company.message}</p>}
          </div>
        </div>
      </div>

      {/* Çözüm Seçimi */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Çözüm Seçimi
        </h3>
        <div className="space-y-1.5">
          <Label>İlgilenilen Çözüm *</Label>
          <Controller
            name="solution"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Lütfen seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SOLUTION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.solution && <p className="text-xs text-red-500">{errors.solution.message}</p>}
        </div>
      </div>

      {/* Proje Detayları */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Proje Detayları
        </h3>
        <div className="space-y-1.5">
          <Label htmlFor="message">Proje Detayı / Mesaj *</Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Projenizin detaylarını, ihtiyaçlarınızı ve beklentilerinizi yazınız..."
            {...register('message')}
          />
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          'Teklif Talebi Gönder'
        )}
      </Button>
    </form>
  );
}
