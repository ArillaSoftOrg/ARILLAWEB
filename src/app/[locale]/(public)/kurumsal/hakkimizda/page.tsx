import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.hakkimizda' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/kurumsal/hakkimizda`,
      languages: { tr: '/tr/kurumsal/hakkimizda', en: '/en/kurumsal/hakkimizda', 'x-default': '/tr/kurumsal/hakkimizda' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/kurumsal/hakkimizda`,
      type: 'website',
    },
  };
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#08090d] px-6 py-20 text-slate-100">
            <div className="mx-auto max-w-6xl">
                {/* Üst Alan */}
                <div className="mb-14 text-center md:text-left">
                    <p className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
                        Hakkımızda
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        Arilla Soft ile
                        <span className="block text-slate-300">
                            Dijitalde Daha Güçlü Bir Gelecek
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
                        Arilla Soft olarak işletmeler için modern, hızlı ve ölçeklenebilir
                        yazılım çözümleri geliştiriyoruz. Web sitelerinden özel yazılım
                        projelerine, dijital sistemlerden kullanıcı odaklı arayüzlere kadar
                        geniş bir alanda; güçlü, sade ve sürdürülebilir çözümler sunuyoruz.
                    </p>
                </div>

                {/* Misyon / Vizyon */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                        <h2 className="text-xl font-semibold text-white">Misyonumuz</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
                            İşletmelerin ihtiyaçlarına uygun, güvenilir ve kullanıcı dostu
                            yazılım çözümleri geliştirerek dijital dönüşüm süreçlerini
                            kolaylaştırmak ve verimliliği artırmak.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                        <h2 className="text-xl font-semibold text-white">Vizyonumuz</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
                            Teknolojiyi sadeleştirerek işletmelerin daha güçlü, daha hızlı ve
                            daha rekabetçi hale gelmesini sağlayan yenilikçi dijital çözümler
                            üretmek.
                        </p>
                    </div>
                </div>

                {/* Neden Biz */}
                <div className="mt-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white md:text-3xl">
                            Neden Arilla Soft?
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                            Sadece yazılım geliştirmiyor, işletmenizin büyümesine katkı sağlayan
                            dijital sistemler kuruyoruz.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="text-lg font-semibold text-white">Modern Yaklaşım</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                Güncel teknolojiler ve modern tasarım anlayışı ile güçlü ürünler geliştiriyoruz.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="text-lg font-semibold text-white">Güvenilir Altyapı</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                Performanslı, güvenli ve uzun vadede sürdürülebilir sistemler kuruyoruz.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="text-lg font-semibold text-white">İş Odaklı Çözümler</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                Her projeyi yalnızca teknik değil, ticari fayda açısından da değerlendiriyoruz.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                            <h3 className="text-lg font-semibold text-white">Ölçeklenebilir Yapı</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                Bugünün ihtiyacına cevap veren ve yarının büyümesine uyum sağlayan sistemler tasarlıyoruz.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Alt CTA */}
                <div className="mt-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-white md:text-3xl">
                        Projenizi birlikte hayata geçirelim
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                        İşletmeniz için modern bir web sitesi, özel yazılım çözümü veya dijital
                        dönüşüm projesi planlıyorsanız bizimle iletişime geçin.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                        <Link
                            href="/kurumsal/iletisim"
                            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                        >
                            Bizimle İletişime Geçin
                        </Link>

                        <Link
                            href="/"
                            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Projelerimizi İnceleyin
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
