export const CATALOG_SECTORS = [
  {
    name: "Pet Kuaförü ve Pet Hizmetleri",
    slug: "pet-kuaforu-pet-hizmetleri",
    description: "Pet kuaförü, veteriner, pet oteli ve bakım işletmeleri için güven veren site örnekleri.",
    sortOrder: 1,
    codePrefix: "PET",
    features: ["Online randevu talebi", "Hizmet ve paketler", "Öncesi / sonrası galerisi", "WhatsApp iletişimi"],
    pages: ["Ana Sayfa", "Hizmetler", "Galeri", "Hakkımızda", "İletişim"],
  },
  {
    name: "Kuaför ve Berber",
    slug: "kuafor-berber",
    description: "Kadın kuaförü, berber ve saç tasarım stüdyoları için randevu odaklı tasarımlar.",
    sortOrder: 2,
    codePrefix: "KUA",
    features: ["Online randevu", "Uzman ekibi", "Fiyat listesi", "Instagram galerisi"],
    pages: ["Ana Sayfa", "Hizmetler", "Ekibimiz", "Fiyatlar", "Randevu"],
  },
  {
    name: "Güzellik ve Bakım Merkezi",
    slug: "guzellik-bakim-merkezi",
    description: "Güzellik salonu, spa ve bakım merkezleri için premium ve dönüşüm odaklı örnekler.",
    sortOrder: 3,
    codePrefix: "GUZ",
    features: ["Bakım paketleri", "Uzman profilleri", "Kampanya alanı", "Randevu formu"],
    pages: ["Ana Sayfa", "Uygulamalar", "Paketler", "Uzmanlar", "Randevu"],
  },
  {
    name: "Diş Kliniği ve Özel Klinik",
    slug: "dis-klinigi-ozel-klinik",
    description: "Diş hekimi ve özel klinikler için uzmanlığı ve güveni öne çıkaran site örnekleri.",
    sortOrder: 4,
    codePrefix: "KLI",
    features: ["Doktor profilleri", "Tedavi anlatımları", "Hasta yorumları", "Randevu talebi"],
    pages: ["Ana Sayfa", "Tedaviler", "Hekimlerimiz", "Klinik", "Randevu"],
  },
  {
    name: "Restoran ve Kafe",
    slug: "restoran-kafe",
    description: "Restoran, kafe ve butik yeme-içme markaları için menü ve rezervasyon odaklı tasarımlar.",
    sortOrder: 5,
    codePrefix: "RES",
    features: ["Dijital menü", "Masa rezervasyonu", "Şube bilgileri", "Mekân galerisi"],
    pages: ["Ana Sayfa", "Menü", "Hikâyemiz", "Galeri", "Rezervasyon"],
  },
  {
    name: "Emlak Danışmanlığı",
    slug: "emlak-danismanligi",
    description: "Emlak ofisi ve gayrimenkul danışmanları için portföyü öne çıkaran modern örnekler.",
    sortOrder: 6,
    codePrefix: "EML",
    features: ["İlan filtreleme", "Danışman profilleri", "Harita görünümü", "Değerleme talebi"],
    pages: ["Ana Sayfa", "Portföy", "Danışmanlarımız", "Hakkımızda", "İletişim"],
  },
  {
    name: "Otomotiv Servisi ve Araç Bakım",
    slug: "otomotiv-servisi-arac-bakim",
    description: "Oto servis, detailing ve araç bakım işletmeleri için güçlü ve hızlı tasarımlar.",
    sortOrder: 7,
    codePrefix: "OTO",
    features: ["Servis randevusu", "Hizmet paketleri", "Araç teslim süreci", "Konum ve yol tarifi"],
    pages: ["Ana Sayfa", "Hizmetler", "Paketler", "Çalışmalarımız", "Randevu"],
  },
  {
    name: "Mimarlık, Dekorasyon ve İnşaat",
    slug: "mimarlik-dekorasyon-insaat",
    description: "Mimarlık ofisi, iç mimarlık ve inşaat firmaları için proje odaklı seçkin tasarımlar.",
    sortOrder: 8,
    codePrefix: "MIM",
    features: ["Proje portföyü", "Hizmet alanları", "Süreç anlatımı", "Keşif talebi"],
    pages: ["Ana Sayfa", "Projeler", "Hizmetler", "Stüdyo", "İletişim"],
  },
] as const;

const STYLE_VARIANTS = [
  {
    suffix: "01",
    kind: "LIVE_DEMO" as const,
    label: "Modern Dönüşüm",
    tags: ["Modern", "Güven Veren", "Dönüşüm Odaklı"],
    summary: "Net hizmet anlatımı, güçlü çağrı alanları ve mobil öncelikli yapısıyla işletmeye uyarlanabilen çalışan demo.",
  },
  {
    suffix: "02",
    kind: "DESIGN_CONCEPT" as const,
    label: "Sade Editoryal",
    tags: ["Minimal", "Editoryal", "Ferahlık"],
    summary: "Büyük tipografi, dengeli boşluklar ve seçkin görsel kullanımıyla hazırlanan özgün tasarım konsepti.",
  },
  {
    suffix: "03",
    kind: "DESIGN_CONCEPT" as const,
    label: "Premium Koyu",
    tags: ["Premium", "Koyu Tema", "Cesur"],
    summary: "Güçlü kontrast, premium detaylar ve etkileyici sunum alanlarıyla hazırlanan özgün tasarım konsepti.",
  },
] as const;

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const CATALOG_EXAMPLES = CATALOG_SECTORS.flatMap((sector) =>
  STYLE_VARIANTS.map((style, styleIndex) => {
    const designCode = `${sector.codePrefix}-${style.suffix}`;
    const title = `${sector.name.split(" ve ")[0]} — ${style.label}`;
    const slug = `${slugify(sector.name.split(" ve ")[0])}-${slugify(style.label)}`;

    return {
      categorySlug: sector.slug,
      title,
      slug,
      summary: style.summary,
      content:
        "Bu başlangıç tasarımı birebir hazır şablon olarak satılmaz. Marka kimliği, içerik yapısı, hizmetler ve ihtiyaç duyulan işlevler işletmenize göre yeniden ele alınır.",
      kind: style.kind,
      designCode,
      sector: sector.name,
      styleTags: [...style.tags],
      recommendedPages: [...sector.pages],
      featureHighlights: [...sector.features],
      customizationNote:
        "Renkler, yazı karakterleri, fotoğraflar, sayfa yapısı, formlar ve işlevler markanıza ve çalışma şeklinize göre değiştirilebilir.",
      technologies: ["Next.js", "Mobil Uyumlu", "SEO Altyapısı"],
      projectUrl: style.kind === "LIVE_DEMO" ? `/tr/demo-siteler/${slug}` : null,
      sortOrder: sector.sortOrder * 10 + styleIndex,
      isFeatured: styleIndex === 0,
      published: true,
    };
  }),
);
