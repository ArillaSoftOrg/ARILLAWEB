'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HomeButton } from '@/components/home/ui/HomeButton';
import '@/lib/home-fonts';
import { newsletterSchema, type NewsletterFormValues } from '@/lib/validations/newsletter';
import { CheckCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function NewsletterSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = useTranslations('forms.newsletter');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
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

  return (
    <section className="bg-home-surface-warm py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="lg:max-w-md">
            <h2 className="font-home-sans text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-home-fg sm:text-[34px]">
              {t('title')}
            </h2>
            <p className="font-home-sans mt-3.5 text-[17px] leading-7 text-home-text-secondary">{t('description')}</p>
          </div>

          <div className="w-full lg:max-w-lg lg:flex-1">
            {status === 'success' ? (
              <div className="flex items-center gap-3 rounded-home-lg border border-home-border bg-home-bg p-4">
                <CheckCircle className="h-5 w-5 shrink-0 text-home-fg" aria-hidden="true" />
                <p className="font-home-sans text-sm text-home-fg">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {status === 'error' && (
                  <div className="mb-3 flex items-center gap-3 rounded-home-md border border-red-200 bg-red-50 p-3">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                    <p className="text-sm text-red-600">{t('error')}</p>
                  </div>
                )}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder={t('emailPlaceholder')}
                      className={cn(
                        'font-home-sans h-12 w-full rounded-home-full border-home-border-strong bg-home-bg px-5 text-base',
                        'focus-visible:ring-2 focus-visible:ring-home-primary focus-visible:ring-offset-2'
                      )}
                      {...register('email')}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  <HomeButton type="submit" variant="primary" disabled={status === 'loading'} className="h-12 w-full sm:w-auto">
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        {t('submit')} <ArrowRight size={16} />
                      </>
                    )}
                  </HomeButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
