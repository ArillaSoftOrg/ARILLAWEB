import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HomeBadge } from "@/components/home/ui/HomeBadge";
import type { BlogPost } from "@/lib/blog-data";
import "@/lib/home-fonts";

interface ArticleCardProps {
  post: BlogPost;
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link
      href={`/kurumsal/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-home-lg border border-home-border bg-home-bg transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-home-border-strong hover:shadow-[0_8px_24px_rgba(16,16,16,0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-home-surface">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl" aria-hidden="true">
            {post.emoji}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <HomeBadge variant="neutral">{post.category}</HomeBadge>
          <span className="font-home-sans text-xs text-home-text-muted">{post.readTime}</span>
        </div>
        <h3 className="font-home-sans text-lg font-semibold leading-snug text-home-fg">{post.title}</h3>
        <p className="font-home-sans line-clamp-2 text-sm leading-6 text-home-text-secondary">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-home-sans text-xs text-home-text-muted">{post.date}</span>
          <span className="inline-flex items-center gap-1 font-home-sans text-sm font-medium text-home-fg transition-transform group-hover:translate-x-0.5">
            Devamını oku
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
