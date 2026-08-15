import { canBeFramed, getDesignPreview } from "@/lib/design-preview-config";
import { SECTION_EYEBROWS } from "@/lib/site-example-constants";
import Eyebrow from "./primitives/Eyebrow";
import LivePreviewFrame, { PreviewUnavailable } from "./LivePreviewFrame";

type LivePreviewSectionProps = {
  sector: string;
  design: string;
  title: string;
  accent?: string;
};

export default async function LivePreviewSection({ sector, design, title, accent }: LivePreviewSectionProps) {
  const preview = getDesignPreview(sector, design);

  // No verified embeddable URL configured yet - render nothing so the page
  // stays exactly as it is. See src/lib/design-preview-config.ts.
  if (!preview) return null;

  const embeddable = await canBeFramed(preview.referencePreviewUrl);

  return (
    <section id="onizleme" className="mt-20 scroll-mt-28 border-t border-black/10 pt-14">
      <Eyebrow label={SECTION_EYEBROWS.preview} accent={accent} />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h2 className="text-[34px] font-extrabold tracking-[-0.03em] text-[#0B1220] sm:text-[44px]">
          Canlı Tasarım Önizlemesi
        </h2>
        <span className="rounded-[7px] border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
          Harici referans site
        </span>
      </div>
      <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#39415A]">
        Aşağıdaki önizleme, bu tasarım yönüne örnek olarak seçilmiş{" "}
        <strong className="font-bold text-[#0B1220]">harici bir web sitesidir</strong>. ArillaSoft tarafından
        geliştirilmemiştir; içerik ve tüm haklar ilgili siteye aittir. Yalnızca hangi tasarım yönünü tercih
        edebileceğiniz konusunda size fikir vermek amacıyla gösterilir.
      </p>

      <div className="mx-auto mt-6 w-full max-w-[1500px]">
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
