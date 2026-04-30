"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Hizmetler", href: "/services" },
    { label: "Projeler", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
                transition: "box-shadow 0.3s ease",
            }}
        >
            <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
                <div className="flex items-center h-14 lg:h-[92px]">

                    {/* Logo */}
                    <div style={{ flex: 1 }}>
                        <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", gap: "12px" }}>
                            <img
                                src="/logoarilla.png"
                                alt="Arilla Soft"
                                className="h-10 lg:h-[56px] w-auto flex-shrink-0"
                            />
                            <span
                                className="text-[15px] tracking-[0.20em] lg:text-[22px] lg:tracking-[0.18em]"
                                style={{
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "#0F172A",
                                    userSelect: "none",
                                }}
                            >
                                ARILLA{" "}
                                <span style={{ color: "#64748B", fontWeight: 500 }}>SOFT</span>
                            </span>
                        </Link>
                    </div>

                    {/* Nav links — center */}
                    <nav
                        className="hidden lg:flex items-center"
                        style={{ gap: "2px" }}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onMouseEnter={() => setHoveredTab(link.href)}
                                    style={{
                                        position: "relative",
                                        padding: "8px 14px",
                                        paddingBottom: "10px",
                                        borderRadius: "7px",
                                        fontSize: "15px",
                                        fontWeight: isActive ? 600 : 500,
                                        color: isActive
                                            ? "#1E40AF"
                                            : hoveredTab === link.href
                                            ? "#3B82F6"
                                            : "#334155",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                        whiteSpace: "nowrap",
                                        background: isActive ? "rgba(37,99,235,0.06)" : "transparent",
                                    }}
                                >
                                    {hoveredTab === link.href && (
                                        <motion.span
                                            layoutId="hover-pill"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "7px",
                                                background: "rgba(37,99,235,0.10)",
                                                zIndex: 0,
                                            }}
                                        />
                                    )}
                                    <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-underline"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            style={{
                                                position: "absolute",
                                                bottom: "4px",
                                                left: "14px",
                                                right: "14px",
                                                height: "2px",
                                                borderRadius: "1px",
                                                background: "#2563EB",
                                                zIndex: 1,
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA + mobile toggle — right */}
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
                        <Link
                            href="/iletisim"
                            className="hidden lg:inline-flex items-center"
                            style={{
                                gap: "6px",
                                padding: "10px 24px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textDecoration: "none",
                                color: "#FFFFFF",
                                background: "#0F172A",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.2), 0 0 0 1.5px #2563EB";
                                const arrow = e.currentTarget.querySelector("[data-arrow]") as HTMLElement;
                                if (arrow) arrow.style.transform = "translateX(3px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.15)";
                                const arrow = e.currentTarget.querySelector("[data-arrow]") as HTMLElement;
                                if (arrow) arrow.style.transform = "translateX(0)";
                            }}
                        >
                            Teklif Al{" "}
                            <span data-arrow="" style={{ display: "inline-flex", transition: "transform 0.2s ease" }}>
                                <ArrowRight size={14} />
                            </span>
                        </Link>

                        <button
                            className="flex items-center justify-center lg:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                background: "transparent",
                                border: "none",
                                padding: "6px",
                                color: "#334155",
                                cursor: "pointer",
                            }}
                            aria-label="Menüyü aç/kapat"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        left: "12px",
                        right: "12px",
                        zIndex: 100,
                        background: "#FFFFFF",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "16px",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                        padding: "12px",
                    }}
                    className="lg:hidden top-14"
                >
                    <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        padding: "10px 14px",
                                        borderRadius: "8px",
                                        fontSize: "15px",
                                        fontWeight: isActive ? 600 : 500,
                                        color: isActive ? "#1E40AF" : "#334155",
                                        background: isActive ? "rgba(37,99,235,0.08)" : "transparent",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/iletisim"
                            onClick={() => setIsOpen(false)}
                            style={{
                                marginTop: "8px",
                                padding: "11px 20px",
                                borderRadius: "8px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: "15px",
                                textDecoration: "none",
                                color: "#FFFFFF",
                                background: "#0F172A",
                            }}
                        >
                            Teklif Al
                        </Link>
                    </nav>
                </motion.div>
            )}
        </header>
    );
}
