type CategoryInput = {
  name: string;
  slug: string;
} | null;

type SiteExampleDisplayInput = {
  title: string;
  summary: string;
  designCode: string | null;
  category?: CategoryInput;
};

const TITLE_BY_SECTOR_SLUG: Record<string, string> = {
  "pet-kuaforu-pet-hizmetleri": "Pet Kuaförü",
  "kuafor-berber": "Kuaför",
  "guzellik-bakim-merkezi": "Güzellik Merkezi",
  "dis-klinigi-ozel-klinik": "Diş Kliniği",
  "restoran-kafe": "Restoran",
  "emlak-danismanligi": "Emlak",
  "otomotiv-servisi-arac-bakim": "Otomotiv",
  "mimarlik-dekorasyon-insaat": "Mimarlık",
};

const TITLE_BY_CODE_PREFIX: Record<string, string> = {
  PET: "Pet Kuaförü",
  KUA: "Kuaför",
  GUZ: "Güzellik Merkezi",
  KLI: "Diş Kliniği",
  RES: "Restoran",
  EML: "Emlak",
  OTO: "Otomotiv",
  MIM: "Mimarlık",
};

const DESCRIPTION_BY_CODE: Record<string, string> = {
  "PET-01": "Randevu taleplerini, bakım paketlerini ve güven veren hizmet anlatımını tek ekranda toparlayan pet işletmesi sunumu.",
  "PET-02": "Patili misafirler için hizmetleri, galeri alanını ve iletişim akışını sıcak ama düzenli biçimde öne çıkarır.",
  "PET-03": "Bakım öncesi-sonrası görselleri, hizmet seçenekleri ve hızlı iletişim ihtiyacına odaklanan güçlü bir pet kuaförü vitrini.",
  "KUA-01": "Saç kesimi, renklendirme ve bakım hizmetlerini randevuya yönlendiren net bir kuaför deneyimi.",
  "KUA-02": "Stil örnekleri, ekip tanıtımı ve fiyat bilgilerini zarif bir akışla sunmak isteyen salonlar için uygundur.",
  "KUA-03": "Berber ya da kuaför hizmetlerini güçlü görseller, paketler ve hızlı rezervasyon odağıyla anlatır.",
  "GUZ-01": "Bakım uygulamalarını, uzmanlığı ve rezervasyon çağrısını güven veren bir güzellik merkezi kurgusunda birleştirir.",
  "GUZ-02": "Cilt bakımı, spa ve estetik hizmetlerini sakin bir anlatımla paket ve randevu akışına bağlar.",
  "GUZ-03": "Bakım paketlerini, kampanya alanlarını ve uzman profillerini rezervasyon hedefiyle görünür kılar.",
  "KLI-01": "Tedavi hizmetleri, hekim uzmanlığı ve hasta güvenini birlikte anlatan klinik odaklı bir yapı sunar.",
  "KLI-02": "Diş kliniği hizmetlerini anlaşılır bölümler, doktor bilgileri ve randevu çağrısıyla düzenler.",
  "KLI-03": "Özel klinikler için tedavi kategorileri, hasta yorumları ve güven unsurlarını daha kurumsal bir çerçevede toplar.",
  "RES-01": "Menü, rezervasyon ve lezzet sunumunu ilk bakışta görünür kılan restoran vitrini oluşturur.",
  "RES-02": "Kafe ya da restoran atmosferini, imza ürünleri ve masa rezervasyonu akışıyla birlikte gösterir.",
  "RES-03": "Şef hikayesi, mekan görselleri ve menü seçkisini güçlü bir marka sunumuna dönüştürür.",
  "EML-01": "İlan portföyü, danışman güveni ve hızlı talep alma akışı üzerine kurulu emlak sitesi görünümü.",
  "EML-02": "Gayrimenkul portföylerini filtreleme, lokasyon ve danışman bilgisiyle keşfedilebilir hale getirir.",
  "EML-03": "Satılık-kiralık ilanları, değerleme talebini ve kurumsal emlak danışmanlığını güçlü biçimde sunar.",
  "OTO-01": "Servis randevusu, bakım paketleri ve güven veren süreç anlatımı için net bir otomotiv sitesi yapısı.",
  "OTO-02": "Detailing, bakım ve onarım hizmetlerini fiyat paketleri ve hızlı iletişimle birlikte gösterir.",
  "OTO-03": "Araç bakım uzmanlığını, yapılan işleri ve servis talep akışını daha güçlü bir görsel dille anlatır.",
  "MIM-01": "Proje portföyü, hizmet alanları ve keşif talebini kurumsal bir mimarlık sunumunda birleştirir.",
  "MIM-02": "İç mekan projeleri, süreç anlatımı ve görsel hikayeleme için dengeli bir portföy yapısı sağlar.",
  "MIM-03": "Mimarlık ve inşaat markaları için büyük proje görselleri, referanslar ve kurumsal güveni öne çıkarır.",
};

export function getSiteExamplePreviewSrc(designCode: string) {
  return `/site-example-previews/${designCode}.webp`;
}

export function getSiteExampleDisplay(project: SiteExampleDisplayInput) {
  const designCode = project.designCode ?? "";
  const category = project.category;

  return {
    title:
      (category?.slug ? TITLE_BY_SECTOR_SLUG[category.slug] : undefined) ??
      TITLE_BY_CODE_PREFIX[designCode.split("-")[0]] ??
      project.title.split("—")[0].trim(),
    description: DESCRIPTION_BY_CODE[designCode] ?? project.summary,
    previewSrc: designCode ? getSiteExamplePreviewSrc(designCode) : null,
  };
}
