'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { quoteSchema, type QuoteFormValues } from '@/lib/validations/quote';
import { PROJECT_TYPE_LABELS, BUDGET_RANGE_LABELS, PLATFORM_LABELS } from '@/lib/constants';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = useTranslations('forms.quote');
  const tTypes = useTranslations('projectTypes');
  const tBudget = useTranslations('budgetRanges');
  const tPlatforms = useTranslations('platforms');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { hasExistingSystem: false },
  });

  const onSubmit = async (data: QuoteFormValues) => {
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
        <h3 className="text-lg font-semibold text-green-800 mb-2">{t('successTitle')}</h3>
        <p className="text-green-600 mb-2">{t('successBody')}</p>
        <p className="text-sm text-green-500 mb-4">{t('successEmail')}</p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          {t('newRequest')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-600">{t('error')}</p>
        </div>
      )}

      {/* Contact Information */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          {t('contactSection')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">{t('fullName')}</Label>
            <Input id="fullName" placeholder={t('fullNamePlaceholder')} {...register('fullName')} />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" type="email" placeholder="ahmet@sirket.com" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input id="phone" placeholder="+90 500 000 00 00" {...register('phone')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company">{t('company')}</Label>
            <Input id="company" placeholder={t('companyPlaceholder')} {...register('company')} />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          {t('projectSection')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>{t('projectType')}</Label>
            <Controller
              name="projectType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(PROJECT_TYPE_LABELS).map((value) => (
                      <SelectItem key={value} value={value}>{tTypes(value)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.projectType && <p className="text-xs text-red-500">{errors.projectType.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>{t('budgetRange')}</Label>
            <Controller
              name="budgetRange"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(BUDGET_RANGE_LABELS).map((value) => (
                      <SelectItem key={value} value={value}>{tBudget(value)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.budgetRange && <p className="text-xs text-red-500">{errors.budgetRange.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>{t('targetPlatform')}</Label>
            <Controller
              name="targetPlatform"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(PLATFORM_LABELS).map((value) => (
                      <SelectItem key={value} value={value}>{tPlatforms(value)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.targetPlatform && <p className="text-xs text-red-500">{errors.targetPlatform.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="deliveryExpectation">{t('delivery')}</Label>
            <Input id="deliveryExpectation" placeholder={t('deliveryPlaceholder')} {...register('deliveryExpectation')} />
          </div>
        </div>
      </div>

      {/* Project Description */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          {t('descriptionSection')}
        </h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder={t('descriptionPlaceholder')}
              {...register('description')}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="integrations">{t('integrations')}</Label>
            <Input id="integrations" placeholder={t('integrationsPlaceholder')} {...register('integrations')} />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasExistingSystem"
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              {...register('hasExistingSystem')}
            />
            <Label htmlFor="hasExistingSystem" className="font-normal cursor-pointer">
              {t('hasExistingSystem')}
            </Label>
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </Button>
    </form>
  );
}
