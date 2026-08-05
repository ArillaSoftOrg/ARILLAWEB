"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Monitor, Smartphone, Tablet, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Viewport = "desktop" | "tablet" | "mobile";
type Phase = "idle" | "loading" | "ready" | "failed";

const VIEWPORTS: Record<Viewport, { width: number; height: number; label: string }> = {
  desktop: { width: 1440, height: 900, label: "Masaüstü" },
  tablet: { width: 834, height: 1112, label: "Tablet" },
  mobile: { width: 390, height: 844, label: "Mobil" },
};

const VIEWPORT_ICONS = { desktop: Monitor, tablet: Tablet, mobile: Smartphone };

/** Interaction is disabled in the compact panel, so the framed site can never
 *  navigate our page away. `allow-top-navigation`, `allow-popups`, `allow-modals`
 *  and `allow-downloads` are deliberately omitted in both instances. */
const SANDBOX = "allow-scripts allow-same-origin";

/** How long to wait for the frame to load before giving up. */
const LOAD_TIMEOUT_MS = 8000;

type LivePreviewFrameProps = {
  url: string;
  label: string;
  title: string;
};

export default function LivePreviewFrame({ url, label, title }: LivePreviewFrameProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [open, setOpen] = useState(false);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [panelScale, setPanelScale] = useState(0);

  // Restore focus to the panel trigger after the modal closes. Radix's own
  // restoration targets the node it captured on open, but closing also remounts
  // the compact iframe beneath it, and focus ends up on <body> instead. Running
  // this in an effect means the DOM has already settled.
  useEffect(() => {
    if (wasOpen.current && !open) openButtonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Scale the fixed 1440x900 frame down to whatever width the panel has.
  // 1440x900 is exactly 16:10, so it fills the panel with no letterboxing.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new ResizeObserver(([entry]) => {
      setPanelScale(entry.contentRect.width / VIEWPORTS.desktop.width);
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, [phase]);

  // Give up if the frame never reports a load.
  useEffect(() => {
    if (phase !== "loading") return;
    const timer = setTimeout(() => setPhase("failed"), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleLoad = useCallback(() => {
    setPhase((current) => (current === "loading" ? "ready" : current));
  }, []);

  if (phase === "failed") {
    return <PreviewUnavailable url={url} />;
  }

  // Only ever one iframe alive: the compact frame unmounts while the modal is
  // open, so the modal's frame is the single instance loading the reference site.
  const showFrame = phase !== "idle" && !open;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
        <BrowserChrome label={label} />

        <div ref={panelRef} className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          {showFrame && panelScale > 0 && (
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <iframe
                src={url}
                title={`${title} — canlı tasarım önizlemesi`}
                sandbox={SANDBOX}
                referrerPolicy="no-referrer"
                loading="lazy"
                tabIndex={-1}
                onLoad={handleLoad}
                onError={() => setPhase("failed")}
                style={{
                  width: VIEWPORTS.desktop.width,
                  height: VIEWPORTS.desktop.height,
                  transform: `scale(${panelScale})`,
                  transformOrigin: "top left",
                  border: 0,
                }}
              />
            </div>
          )}

          {phase === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
              <p className="max-w-sm text-sm leading-6 text-slate-600">
                Bu harici referans siteyi sayfamızdan ayrılmadan inceleyebilirsiniz. Site ArillaSoft
                tarafından geliştirilmemiştir. Sayfa performansı için önizleme yalnızca siz
                istediğinizde yüklenir.
              </p>
              <Button onClick={() => setPhase("loading")}>Canlı önizlemeyi yükle</Button>
            </div>
          )}

          {phase === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80">
              <p className="text-sm font-semibold text-slate-500">Önizleme yükleniyor…</p>
            </div>
          )}

          {phase === "ready" && (
            <button
              type="button"
              ref={openButtonRef}
              onClick={() => setOpen(true)}
              aria-label="Tasarımı büyük önizlemede aç"
              className="group absolute inset-0 flex items-end justify-center bg-slate-950/0 transition hover:bg-slate-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-xl bg-slate-950/85 px-4 py-2.5 text-sm font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="h-4 w-4" /> Büyük önizlemede aç
              </span>
            </button>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="flex h-[90vh] w-full max-w-[95vw] flex-col gap-0 p-0"
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 pr-14">
            <div className="min-w-0">
              <DialogTitle className="truncate">{title}</DialogTitle>
              <DialogDescription className="mt-0.5 truncate text-xs">
                {label} — harici referans site, ArillaSoft tarafından geliştirilmemiştir
              </DialogDescription>
            </div>

            <div
              role="group"
              aria-label="Önizleme cihaz seçimi"
              className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1"
            >
              {(Object.keys(VIEWPORTS) as Viewport[]).map((key) => {
                const Icon = VIEWPORT_ICONS[key];
                const active = viewport === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setViewport(key)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      active ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {VIEWPORTS[key].label}
                  </button>
                );
              })}
            </div>
          </div>

          <ModalFrame url={url} title={title} viewport={viewport} onError={() => setPhase("failed")} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ModalFrame({
  url,
  title,
  viewport,
  onError,
}: {
  url: string;
  title: string;
  viewport: Viewport;
  onError: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const { width, height, label } = VIEWPORTS[viewport];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width: availableWidth, height: availableHeight } = entry.contentRect;
      setScale(Math.min(availableWidth / width, availableHeight / height, 1));
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [width, height]);

  return (
    <div ref={stageRef} className="flex flex-1 items-center justify-center overflow-hidden bg-slate-100 p-4">
      {scale > 0 && (
        <div style={{ width: width * scale, height: height * scale }} className="overflow-hidden">
          <iframe
            key={viewport}
            src={url}
            title={`${title} — ${label} önizlemesi`}
            sandbox={SANDBOX}
            referrerPolicy="no-referrer"
            onError={onError}
            className="bg-white shadow-xl"
            style={{
              width,
              height,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              border: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}

function BrowserChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <span className="truncate rounded-md bg-white px-3 py-1 text-xs font-semibold text-slate-500">
        {label}
      </span>
      <span className="ml-auto shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800">
        Harici site
      </span>
    </div>
  );
}

export function PreviewUnavailable({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:flex-row sm:items-center">
      <TriangleAlert className="h-6 w-6 shrink-0 text-amber-600" />
      <p className="flex-1 text-sm leading-6 text-amber-900">
        <strong>Canlı önizleme kullanılamıyor.</strong> Bu referans site, güvenlik ayarları
        nedeniyle başka sayfalara gömülmesine izin vermiyor.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800"
      >
        Yeni sekmede aç <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
