"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { adminLogin } from "@/lib/admin-auth-actions";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await adminLogin(email, password);
        if (result.ok) {
            router.push("/admin");
        } else {
            setError("Email veya şifre hatalı.");
        }

        setIsLoading(false);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
            <div className="absolute inset-0" />

            <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                        <ShieldCheck className="h-7 w-7 text-blue-600" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Admin Girişi
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Arilla Soft yönetim paneline erişmek için giriş yapın.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-100 px-4">
                            <Mail className="mr-3 h-4 w-4 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Email adresinizi girin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-3 text-slate-900 outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Şifre
                        </label>
                        <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-100 px-4">
                            <Lock className="mr-3 h-4 w-4 text-slate-500" />
                            <input
                                type="password"
                                placeholder="Şifrenizi girin"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-3 text-slate-900 outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:scale-[1.01] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Kontrol ediliyor..." : "Giriş Yap"}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-500">
                    Güvenli yönetim erişimi • Arilla Soft
                </div>
            </div>
        </div>
    );
}