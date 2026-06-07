"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { BlogMediaItem, BlogPost } from "@/lib/blog-data";

function getMediaItems(post: BlogPost): BlogMediaItem[] {
  if (post.mediaItems?.length) return post.mediaItems;
  if (post.coverImage) return [{ url: post.coverImage, type: "image" }];
  return [];
}

export default function BlogMediaCard({ post }: { post: BlogPost }) {
  const mediaItems = getMediaItems(post);
  const [active, setActive] = useState(0);
  const current = mediaItems[active];
  const hasMultiple = mediaItems.length > 1;
  const cardText = current?.overlayText?.trim() || post.description;

  function showPrevious(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActive((index) => (index === 0 ? mediaItems.length - 1 : index - 1));
  }

  function showNext(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActive((index) => (index + 1) % mediaItems.length);
  }

  return (
    <Link
      href={`/kurumsal/blog/${post.slug}`}
      className="group block"
      aria-label={`${post.title} yazısını incele`}
      style={{ textDecoration: "none" }}
    >
      <article
        style={{
          background: "transparent",
          borderRadius: "18px",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: "18px",
            background: post.gradient,
            boxShadow: "0 16px 36px rgba(15,23,42,0.12)",
          }}
        >
          {current ? (
            current.type === "video" ? (
              <video
                src={current.url}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                muted
                playsInline
                loop
                autoPlay
              />
            ) : (
              <Image
                src={current.url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 25vw"
              />
            )
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "clamp(38px, 12vw, 52px)",
                fontWeight: 800,
              }}
            >
              {post.title.charAt(0)}
            </div>
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(8,9,13,0.08), transparent 38%, rgba(8,9,13,0.18))",
              pointerEvents: "none",
            }}
          />

          {hasMultiple && (
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 800,
                background: "rgba(0,0,0,0.56)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "999px",
                padding: "5px 8px",
                backdropFilter: "blur(10px)",
              }}
            >
              {active + 1}/{mediaItems.length}
            </span>
          )}

          {current?.type === "video" && (
            <span
              style={{
                position: "absolute",
                left: "10px",
                bottom: "10px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 800,
                background: "rgba(0,0,0,0.54)",
                borderRadius: "999px",
                padding: "5px 8px",
                backdropFilter: "blur(10px)",
              }}
            >
              <Play size={11} fill="currentColor" />
              Video
            </span>
          )}

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Önceki medya"
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(0,0,0,0.38)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Sonraki medya"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(0,0,0,0.38)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        <div style={{ padding: "10px 2px 0" }}>
          <p
            style={{
              color: "#334155",
              fontSize: "13px",
              lineHeight: 1.45,
              fontWeight: 500,
              margin: "0 0 8px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {cardText}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#1d4ed8",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.02em",
            }}
          >
            Detaylı İncele
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
