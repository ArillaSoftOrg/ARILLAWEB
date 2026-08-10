import { canBeFramed, getDesignPreview } from "@/lib/design-preview-config";
import LivePreviewFrame, { PreviewUnavailable } from "./LivePreviewFrame";

type LivePreviewSectionProps = {
  sector: string;
  design: string;
  title: string;
};

export default async function LivePreviewSection({ sector, design, title }: LivePreviewSectionProps) {
  const preview = getDesignPreview(sector, design);

  // No verified embeddable URL configured yet — render nothing so the page
  // stays exactly as it is. See src/lib/design-preview-config.ts.
  if (!preview) return null;

  const embeddable = await canBeFramed(preview.referencePreviewUrl);

  const removalRequestHref = `mailto:info@arillasoft.com?subject=${encodeURIComponent(
    `Kaldırma Talebi — ${preview.referenceTemplateName}`,
  )}`;

  return (
    <section className="mt-16">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Canlı Tasarım Önizlemesi</h2>
        <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
          Harici referans site
        </span>
      </div>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
        Aşağıdaki önizleme, bu tasarım yönüne örnek olarak seçilmiş{" "}
        <strong className="font-bold text-slate-900">harici bir web sitesidir</strong>. ArillaSoft
        tarafından geliştirilmemiştir; içerik ve tüm haklar ilgili siteye aittir. Yalnızca hangi
        tasarım yönünü tercih edebileceğiniz konusunda size fikir vermek amacıyla gösterilir.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-semibold text-slate-700">
          {preview.referenceMarketplaceUrl ? (
            <a
              href={preview.referenceMarketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-300 underline-offset-2 hover:text-blue-700 hover:decoration-blue-400"
            >
              {preview.referenceTemplateName}
            </a>
          ) : (
            preview.referenceTemplateName
          )}
        </span>
        {preview.referenceCreator && <span className="text-slate-400">— {preview.referenceCreator}</span>}
        <span className="text-slate-300">·</span>
        <span className="text-slate-500">{preview.referencePlatform}</span>
        <span className="text-slate-300">·</span>
        <a href={removalRequestHref} className="text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-slate-800">
          Kaldırma Talebi
        </a>
      </div>

      <div className="mt-6">
        {embeddable ? (
          <LivePreviewFrame
            url={preview.referencePreviewUrl}
            label={preview.referenceLabel}
            title={title}
            templateName={preview.referenceTemplateName}
            creator={preview.referenceCreator}
          />
        ) : (
          <PreviewUnavailable url={preview.referencePreviewUrl} />
        )}
      </div>
    </section>
  );
}
