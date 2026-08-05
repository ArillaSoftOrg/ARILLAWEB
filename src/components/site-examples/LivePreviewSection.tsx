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

  const embeddable = await canBeFramed(preview.url);

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
        tarafından geliştirilmemiştir; içerik ve tüm haklar ilgili siteye aittir. Yalnızca tasarım
        dili hakkında fikir vermek amacıyla gösterilir.
      </p>

      <div className="mt-6">
        {embeddable ? (
          <LivePreviewFrame url={preview.url} label={preview.label} title={title} />
        ) : (
          <PreviewUnavailable url={preview.url} />
        )}
      </div>
    </section>
  );
}
