import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactFormDark from "@/components/forms/ContactFormDark";

const contactDetails = [
    {
        icon: Mail,
        label: "E-posta",
        value: "info@arillasoft.com",
        href: "mailto:info@arillasoft.com",
    },
    {
        icon: Phone,
        label: "Telefon",
        value: "+90 (555) 000 00 00",
        href: "tel:+905550000000",
    },
    {
        icon: MapPin,
        label: "Adres",
        value: "İstanbul, Türkiye",
        href: null,
    },
    {
        icon: Clock,
        label: "Çalışma Saatleri",
        value: "Pzt – Cum, 09:00 – 18:00",
        href: null,
    },
];

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#08090d] px-6 py-20 text-slate-100">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-14 text-center">
                    <p className="mb-3 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
                        İletişim
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Bizimle İletişime Geçin
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 md:text-lg">
                        Projeniz hakkında konuşmak, fiyat teklifi almak ya da sadece merhaba
                        demek için mesaj gönderin.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-5">
                    {/* Left: contact info */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Info cards */}
                        <div className="space-y-3">
                            {contactDetails.map(({ icon: Icon, label, value, href }) => (
                                <div
                                    key={label}
                                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                                        <Icon className="h-4 w-4 text-cyan-300" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                            {label}
                                        </p>
                                        {href ? (
                                            <a
                                                href={href}
                                                className="mt-1 text-sm text-slate-200 transition hover:text-cyan-300"
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="mt-1 text-sm text-slate-200">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Decorative gradient card */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-slate-900 to-cyan-500/10 p-6">
                            <h3 className="text-base font-semibold text-white">
                                Neden Arillasoft?
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {[
                                    "Hızlı dönüş garantisi — 24 saat içinde",
                                    "Deneyimli ve uzman ekip",
                                    "Şeffaf fiyatlandırma",
                                    "Proje sonrası destek",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:col-span-3 md:p-9">
                        <h2 className="mb-6 text-xl font-semibold text-white">
                            Mesaj Gönderin
                        </h2>
                        <ContactFormDark />
                    </div>
                </div>
            </div>
        </main>
    );
}
