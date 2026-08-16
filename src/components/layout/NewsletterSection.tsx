'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
      // Integration point: POST /api/newsletter — route not yet implemented.
      // Once a newsletter backend exists, this call will start working as-is.
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
    <section
      style={{
        position: 'relative',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.07), transparent 45%), radial-gradient(circle at 100% 100%, rgba(139,92,246,0.08), transparent 45%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}
        className="px-5 sm:px-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <div className="lg:max-w-md">
            <h2 className="text-role-section-heading">{t('title')}</h2>
            <p className="text-role-body-lg" style={{ marginTop: '14px' }}>
              {t('description')}
            </p>
          </div>

          <div className="w-full lg:flex-1 lg:max-w-lg">
            {status === 'success' ? (
              <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                <p className="text-sm text-green-700">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {status === 'error' && (
                  <div className="mb-3 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                    <p className="text-sm text-red-600">{t('error')}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder={t('emailPlaceholder')}
                      className={cn(
                        'h-12 w-full rounded-lg border-slate-200 bg-white px-4 text-base shadow-sm',
                        'focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2'
                      )}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex h-12 w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-6 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none text-role-button"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}
                  >
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
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
