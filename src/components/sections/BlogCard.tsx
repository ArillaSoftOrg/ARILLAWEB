import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string | null;
  readingTime: number;
  publishedAt?: Date | null;
  createdAt: Date;
  categoryName?: string | null;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  coverImage,
  readingTime,
  publishedAt,
  createdAt,
  categoryName,
}: BlogCardProps) {
  const displayDate = publishedAt || createdAt;

  return (
    <Link
      href={`/kurumsal/blog/${slug}`}
      className="group block bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200"
    >
      {/* Image */}
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-blue-200 text-4xl font-bold select-none">{title.charAt(0)}</div>
          </div>
        )}
        {categoryName && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="bg-white/90 text-blue-700 backdrop-blur-sm text-xs">
              {categoryName}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(displayDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime} dk okuma
          </span>
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
          Devamını Oku <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
