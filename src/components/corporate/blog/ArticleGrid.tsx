"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { EmptyState } from "@/components/corporate/EmptyState";
import { fadeUpItem } from "@/components/home/motion";
import { ArticleCard } from "./ArticleCard";
import type { BlogPost } from "@/lib/blog-data";
import "@/lib/home-fonts";

interface ArticleGridProps {
  posts: BlogPost[];
  emptyState?: { title: string; description?: string };
}

export function ArticleGrid({ posts, emptyState }: ArticleGridProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title={emptyState?.title ?? "Henüz blog yazısı yok."}
        description={emptyState?.description}
      />
    );
  }

  return (
    <AnimatedSection className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <motion.div key={post.slug} variants={fadeUpItem}>
          <ArticleCard post={post} />
        </motion.div>
      ))}
    </AnimatedSection>
  );
}
