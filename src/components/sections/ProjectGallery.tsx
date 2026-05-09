"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
    projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const prev = useCallback(
        (list: string[]) => setCurrent((c) => (c - 1 + list.length) % list.length),
        []
    );
    const next = useCallback(
        (list: string[]) => setCurrent((c) => (c + 1) % list.length),
        []
    );

    const prevLightbox = useCallback(
        (list: string[]) =>
            setLightbox((l) => (l === null ? null : (l - 1 + list.length) % list.length)),
        []
    );
    const nextLightbox = useCallback(
        (list: string[]) =>
            setLightbox((l) => (l === null ? null : (l + 1) % list.length)),
        []
    );

    // Keyboard navigation
    useEffect(() => {
        if (lightbox === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevLightbox(images);
            if (e.key === "ArrowRight") nextLightbox(images);
            if (e.key === "Escape") setLightbox(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightbox, images, prevLightbox, nextLightbox]);

    // Prevent body scroll when lightbox open
    useEffect(() => {
        document.body.style.overflow = lightbox !== null ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [lightbox]);

    const handleTouchStart = (x: number) => setTouchStart(x);
    const handleTouchEnd = (x: number, onPrev: () => void, onNext: () => void) => {
        if (touchStart === null) return;
        const diff = touchStart - x;
        if (Math.abs(diff) > 40) (diff > 0 ? onNext() : onPrev());
        setTouchStart(null);
    };

    if (images.length === 0) return null;

    return (
        <>
            {/* ── Slider ── */}
            <div className="space-y-3">
                {/* Main slide */}
                <div
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                    onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
                    onTouchEnd={(e) =>
                        handleTouchEnd(
                            e.changedTouches[0].clientX,
                            () => prev(images),
                            () => next(images)
                        )
                    }
                >
                    {/* Image */}
                    <div
                        className="group relative h-72 cursor-zoom-in md:h-96"
                        onClick={() => setLightbox(current)}
                    >
                        <Image
                            key={current}
                            src={images[current]}
                            alt={`${projectTitle} görsel ${current + 1}`}
                            fill
                            className="object-cover transition-opacity duration-300"
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                        {/* zoom hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <div className="rounded-full bg-black/50 p-3 backdrop-blur-sm">
                                <ZoomIn className="h-5 w-5 text-white" />
                            </div>
                        </div>
                        {/* counter */}
                        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                            {current + 1} / {images.length}
                        </div>
                    </div>

                    {/* Arrows (only when >1 image) */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prev(images); }}
                                aria-label="Önceki görsel"
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); next(images); }}
                                aria-label="Sonraki görsel"
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {images.map((img, i) => (
                            <button
                                key={`${img}-${i}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Görsel ${i + 1}`}
                                className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition ${i === current
                                    ? "border-cyan-400 ring-2 ring-cyan-400/40"
                                    : "border-white/10 opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${projectTitle} küçük görsel ${i + 1}`}
                                    width={120}
                                    height={80}
                                    className="h-full w-full object-cover"
                                    sizes="120px"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Lightbox ── */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                    onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
                    onTouchEnd={(e) =>
                        handleTouchEnd(
                            e.changedTouches[0].clientX,
                            () => prevLightbox(images),
                            () => nextLightbox(images)
                        )
                    }
                >
                    {/* Close */}
                    <button
                        className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
                        onClick={() => setLightbox(null)}
                        aria-label="Kapat"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur-sm">
                        {lightbox + 1} / {images.length}
                    </div>

                    {/* Prev arrow */}
                    {images.length > 1 && (
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); prevLightbox(images); }}
                            aria-label="Önceki görsel"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Image */}
                    <Image
                        key={lightbox}
                        src={images[lightbox]}
                        alt={`${projectTitle} görsel ${lightbox + 1}`}
                        width={1200}
                        height={800}
                        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        sizes="90vw"
                    />

                    {/* Next arrow */}
                    {images.length > 1 && (
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); nextLightbox(images); }}
                            aria-label="Sonraki görsel"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
