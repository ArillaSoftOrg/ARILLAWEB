"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Wrench,
  FolderKanban,
  Lightbulb,
  Mail,
  Calendar,
  Clock,
  Settings,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Blog Management",
    href: "/admin/blog",
    icon: FileText,
    exact: false,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Wrench,
    exact: false,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    exact: false,
  },
  {
    label: "Solutions",
    href: "/admin/solutions",
    icon: Lightbulb,
    exact: false,
    disabled: true,
  },
  {
    label: "İletişim",
    href: "/admin/contact",
    icon: Mail,
    exact: false,
  },
  {
    label: "Randevular",
    href: "/admin/appointments",
    icon: Calendar,
    exact: false,
  },
  {
    label: "Müsaitlik",
    href: "/admin/availability",
    icon: Clock,
    exact: false,
  },
  {
    label: "Site Ayarları",
    href: "/admin/settings",
    icon: Settings,
    exact: false,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#f8fafc", color: "#0f172a" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          background: "#ffffff",
          borderRight: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Brand */}
        <div
          className="flex items-center gap-3 px-6 py-5"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            }}
          >
            A
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#0f172a" }}>
              ArilaSoft
            </p>
            <p className="text-xs" style={{ color: "#94a3b8" }}>
              Yönetim Paneli
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p
            className="text-xs font-semibold uppercase tracking-wider px-3 mb-3"
            style={{ color: "#cbd5e1" }}
          >
            Navigasyon
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <div key={item.href}>
                {item.disabled ? (
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-not-allowed select-none"
                    style={{ color: "#9ca3af" }}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{item.label}</span>
                    <span
                      className="ml-auto text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(0,0,0,0.04)",
                        color: "#cbd5e1",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      Yakında
                    </span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group"
                    style={
                      active
                        ? {
                          background:
                            "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.08))",
                          color: "#7c3aed",
                          border: "1px solid rgba(124,58,237,0.2)",
                        }
                        : {
                          color: "#475569",
                        }
                    }
                  >
                    <Icon
                      size={16}
                      style={active ? { color: "#7c3aed" } : undefined}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                    {active && (
                      <ChevronRight
                        size={14}
                        className="ml-auto"
                        style={{ color: "#7c3aed" }}
                      />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center gap-3 px-3 py-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-medium truncate"
                style={{ color: "#475569" }}
              >
                Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-6 py-4 lg:hidden"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#475569" }}
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            Arilla Soft Yönetim
          </span>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
