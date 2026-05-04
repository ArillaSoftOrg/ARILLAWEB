import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;
  summary: string;
  slug: string;
  coverImage?: string | null;
  technologies: string[];
  sector?: string | null;
  clientName?: string | null;
}

export default function ProjectCard({
  title,
  summary,
  slug,
  coverImage,
  technologies,
  sector,
  clientName,
}: ProjectCardProps) {
  return (
    <Link href="/" className="group block bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200">
      {/* Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        {coverImage ? (
          <Image src={coverImage} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-blue-200 text-6xl font-bold select-none">
              {title.charAt(0)}
            </div>
          </div>
        )}
        {sector && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="bg-white/90 text-blue-700 backdrop-blur-sm">
              {sector}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {clientName && (
          <p className="text-xs font-medium text-slate-400 mb-1">{clientName}</p>
        )}
        <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{summary}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-xs text-slate-400">+{technologies.length - 4}</span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
          Projeyi İncele <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
