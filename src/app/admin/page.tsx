"use client";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Wrench,
  FolderKanban,
  Mail,
  ArrowRight,
  PenSquare,
  MailOpen,
} from "lucide-react";
import { getAdminPosts, type AdminPost } from "@/lib/blog-actions";
import {
  getDashboardData,
  type DashboardStats,
  type RecentMessage,
} from "@/lib/dashboard-actions";

const CATEGORY_META: Record<string, { color: string; bg: string; border: string }> = {
  "QR Menü": { color: "#7c3aed", bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.25)" },
  "Yazılım": { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.25)" },
  "Tasarım": { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  "Yapay Zeka": { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  "SEO": { color: "#ec4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)" },
  "Mobil": { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
  "Genel": { color: "#64748b", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.25)" },
};

type PostDisplay = {
  slug: string; emoji: string; title: string;
  category: string; categoryColor: string; categoryBg: string; categoryBorder: string;
  date: string; readTime: string;
};

function adaptPost(post: AdminPost): PostDisplay {
  const catName = post.category?.name ?? "Genel";
  const meta = CATEGORY_META[catName] ?? CATEGORY_META["Genel"];
  let emoji = "📝";
  try { emoji = JSON.parse(post.content).emoji ?? "📝"; } catch { }
  return {
    slug: post.slug,
    emoji,
    title: post.title,
    category: catName,
    categoryColor: meta.color,
    categoryBg: meta.bg,
    categoryBorder: meta.border,
    date: new Date(post.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
    readTime: `${post.readingTime} dk`,
  };
}

const quickActions = [
  {
    label: "Yeni Blog Yazısı",
    desc: "Blog yönetimine git ve yeni içerik ekle",
    href: "/admin/blog",
    icon: PenSquare,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.12)",
  },
  {
    label: "Servisler",
    desc: "Servisleri yönet ve düzenle",
    href: "/admin/services",
    icon: Wrench,
    color: "#22d3ee",
    bg: "rgba(6,182,212,0.1)",
  },
  {
    label: "İletişim Mesajları",
    desc: "Gelen mesajları görüntüle ve yanıtla",
    href: "/admin/contact",
    icon: Mail,
    color: "#a78bfa",
    bg: "rgba(124,58,237,0.12)",
  },
];

const DEFAULT_STATS: DashboardStats = {
  blogCount: 0,
  serviceCount: 0,
  projectCount: 0,
  unreadMessages: 0,
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const postsData = await getAdminPosts();
        const dashboardData = await getDashboardData();

        setPosts(postsData.map(adaptPost));
        setStats(dashboardData.stats);
        setRecentMessages(dashboardData.recentMessages);
      } catch (err) {
        setError("Veriler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const recentPosts = posts.slice(0, 4);

  const statCards = [
    {
      label: "Blog Yazıları",
      value: stats.blogCount.toString(),
      icon: FileText,
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.12)",
      border: "rgba(124,58,237,0.2)",
    },
    {
      label: "Servisler",
      value: stats.serviceCount.toString(),
      icon: Wrench,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.1)",
      border: "rgba(6,182,212,0.2)",
    },
    {
      label: "Projeler",
      value: stats.projectCount.toString(),
      icon: FolderKanban,
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.2)",
    },
    {
      label: "Okunmamış Mesaj",
      value: stats.unreadMessages.toString(),
      icon: Mail,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.2)",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-600">
        Yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            Hoş geldiniz. İçeriklerinizi buradan yönetin.
          </p>
        </div>

        <AdminLogoutButton />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl p-5"
              style={{
                background: "#ffffff",
                border: `1px solid ${stat.border}`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: stat.bg }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: "#0f172a" }}>
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: "#64748b" }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div
          className="lg:col-span-2 rounded-xl"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
          >
            <h2 className="text-base font-semibold" style={{ color: "#0f172a" }}>
              Son Blog Yazıları
            </h2>
            <Link
              href="/admin/blog"
              className="text-xs flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: "#a78bfa" }}
            >
              Tümünü gör <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
            {recentPosts.length === 0 ? (
              <p className="px-6 py-8 text-sm text-center" style={{ color: "#475569" }}>
                Henüz blog yazısı yok.
              </p>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post.slug}
                  className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,0,0,0.05)" }}
                  >
                    {post.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium leading-snug truncate"
                      style={{ color: "#0f172a" }}
                    >
                      {post.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: post.categoryBg,
                          color: post.categoryColor,
                          border: `1px solid ${post.categoryBorder}`,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {post.date}
                      </span>
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {post.readTime} okuma
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div
            className="rounded-xl"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="px-6 py-4"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
            >
              <h2 className="text-base font-semibold" style={{ color: "#0f172a" }}>
                Hızlı Erişim
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href}>
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-all"
                      style={{ border: "1px solid rgba(0,0,0,0.05)" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: action.bg }}
                      >
                        <Icon size={16} style={{ color: action.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: "#0f172a" }}>
                          {action.label}
                        </p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "#475569" }}>
                          {action.desc}
                        </p>
                      </div>
                      <ArrowRight size={14} style={{ color: "#475569" }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent contact messages */}
          <div
            className="rounded-xl flex-1"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
            >
              <h2 className="text-base font-semibold" style={{ color: "#0f172a" }}>
                Son Mesajlar
              </h2>
              <Link
                href="/admin/contact"
                className="text-xs flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: "#a78bfa" }}
              >
                Tümünü gör <ArrowRight size={12} />
              </Link>
            </div>

            <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
              {recentMessages.length === 0 ? (
                <p className="px-6 py-8 text-sm text-center" style={{ color: "#475569" }}>
                  Henüz mesaj yok.
                </p>
              ) : (
                recentMessages.map((msg) => (
                  <Link
                    key={msg.id}
                    href="/admin/contact"
                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={
                        msg.isRead
                          ? { background: "rgba(0,0,0,0.04)" }
                          : { background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }
                      }
                    >
                      {msg.isRead ? (
                        <MailOpen size={14} style={{ color: "#475569" }} />
                      ) : (
                        <Mail size={14} style={{ color: "#22d3ee" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className="text-xs font-semibold truncate"
                          style={{ color: msg.isRead ? "#9ca3af" : "#0f172a" }}
                        >
                          {msg.fullName}
                        </p>
                        {!msg.isRead && (
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "#22d3ee" }}
                          />
                        )}
                      </div>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "#475569" }}>
                        {msg.subject}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#cbd5e1" }}>
                        {new Date(msg.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
