"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { ImagePlus, X, Loader2 } from "lucide-react";
import type { BlogMediaItem } from "@/lib/blog-data";

type Props =
  | {
      value: BlogMediaItem[];
      onChange: (items: BlogMediaItem[]) => void;
      mediaMode: "media";
    }
  | {
      value: string[];
      onChange: (items: string[]) => void;
      mediaMode?: "url";
    };

export default function CloudinaryGalleryUpload({ value, onChange, mediaMode = "url" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function uploadFile(file: File): Promise<BlogMediaItem | null> {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setUploadError("Lütfen yalnızca görsel veya video dosyaları seçin.");
      return null;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) throw new Error("Yükleme başarısız.");

    const data = await res.json();
    return {
      url: data.secure_url as string,
      type: isVideo ? "video" : "image",
      overlayText: "",
    };
  }

  async function handleFiles(files: FileList) {
    setUploading(true);
    setUploadError("");

    try {
      const uploads = await Promise.all(Array.from(files).map((file) => uploadFile(file)));
      const newItems = uploads.filter((item): item is BlogMediaItem => item !== null);
      if (newItems.length > 0) {
        if (mediaMode === "media") {
          (onChange as (items: BlogMediaItem[]) => void)([...(value as BlogMediaItem[]), ...newItems]);
        } else {
          (onChange as (items: string[]) => void)([...(value as string[]), ...newItems.map((item) => item.url)]);
        }
      }
    } catch {
      setUploadError("Bir veya daha fazla medya yüklenirken hata oluştu.");
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  }

  function handleRemove(index: number) {
    if (mediaMode === "media") {
      (onChange as (items: BlogMediaItem[]) => void)((value as BlogMediaItem[]).filter((_, i) => i !== index));
    } else {
      (onChange as (items: string[]) => void)((value as string[]).filter((_, i) => i !== index));
    }
  }

  function handleOverlayChange(index: number, overlayText: string) {
    if (mediaMode !== "media") return;
    (onChange as (items: BlogMediaItem[]) => void)(
      (value as BlogMediaItem[]).map((item, i) => (i === index ? { ...item, overlayText } : item))
    );
  }

  const mediaItems: BlogMediaItem[] = value.map((item) =>
    typeof item === "string" ? { url: item, type: "image", overlayText: "" } : item
  );

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        className={[
          "flex h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition",
          dragging
            ? "border-violet-500 bg-violet-500/10"
            : "border-white/10 bg-[#0b0d12] hover:border-violet-500/50 hover:bg-violet-500/5",
          uploading ? "cursor-wait" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {uploading ? (
          <>
            <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
            <p className="text-sm text-slate-400">Yükleniyor...</p>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3">
              <ImagePlus className="h-6 w-6 text-violet-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-300">
                Medyaları buraya sürükle veya <span className="text-violet-400">tıkla</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Çoklu seçim desteklenir - PNG, JPG, WEBP, MP4
              </p>
            </div>
          </>
        )}
      </div>

      {mediaItems.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {mediaItems.map((item, index) => (
            <div key={item.url + index} className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#08090d]">
              <div className="relative h-28 w-full">
                {item.type === "video" ? (
                  <video src={item.url} className="h-full w-full object-cover" muted playsInline />
                ) : (
                  <Image
                    src={item.url}
                    alt={`Galeri görseli ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
                <span className="absolute left-1 top-1 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {item.type === "video" ? "Video" : "Görsel"}
                </span>
              </div>
              {mediaMode === "media" && (
                <input
                  value={item.overlayText ?? ""}
                  onChange={(e) => handleOverlayChange(index, e.target.value)}
                  placeholder="Görsel üstü yazı"
                  className="w-full border-0 border-t border-white/10 bg-transparent px-2 py-2 text-xs text-slate-200 outline-none placeholder:text-slate-600"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/80 text-white opacity-0 transition hover:bg-rose-500 group-hover:opacity-100"
                aria-label="Medyayı kaldır"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {uploadError && <p className="text-xs text-rose-400">{uploadError}</p>}
    </div>
  );
}
