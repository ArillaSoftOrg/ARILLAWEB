export const FAQ_PAGES: { value: string; label: string }[] = [
  { value: "global", label: "Tüm Sayfalar" },
  { value: "home", label: "Anasayfa" },
  { value: "qr-menu", label: "QR Menü" },
  { value: "randevu", label: "Randevu Sistemi" },
  { value: "klinik-randevu", label: "Klinik Randevu Sistemi" },
  { value: "kuafor-randevu", label: "Kuaför Randevu Sistemi" },
  { value: "guzellik-merkezi", label: "Güzellik Merkezi Randevu" },
  { value: "teklif-al", label: "Teklif Al" },
  { value: "iletisim", label: "İletişim" },
];

export function getPageLabel(page: string): string {
  return FAQ_PAGES.find((p) => p.value === page)?.label ?? page;
}
