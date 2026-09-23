// Shared, locale-driven data source for the "Sectoral Software" / "Services" IA.
// Originally English-only; now bilingual (en/tr) so the same components render both
// /en/services + /en/sectoral-software and their /tr/hizmetler + /tr/sektorel-yazilimlar
// mirrors without duplicating any component or page.

export type Locale = 'en' | 'tr';

export interface LocalizedText {
  en: string;
  tr: string;
}

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export type SolutionKey =
  | 'website'
  | 'appointment'
  | 'management-panel'
  | 'crm'
  | 'mobile-app'
  | 'automation';

export const SOLUTION_LABELS: Record<SolutionKey, LocalizedText> = {
  website: { en: 'Website', tr: 'Web Sitesi' },
  appointment: { en: 'Appointment System', tr: 'Randevu Sistemi' },
  'management-panel': { en: 'Management Panel', tr: 'Yönetim Paneli' },
  crm: { en: 'CRM / Customer Tracking', tr: 'CRM / Müşteri Takibi' },
  'mobile-app': { en: 'Mobile Application', tr: 'Mobil Uygulama' },
  automation: { en: 'Automation / Integrations', tr: 'Otomasyon / Entegrasyonlar' },
};

export const SOLUTION_DESCRIPTIONS: Record<SolutionKey, LocalizedText> = {
  website: {
    en: 'A fast, professional website that represents your business online.',
    tr: 'İşletmenizi online ortamda temsil eden hızlı, profesyonel bir web sitesi.',
  },
  appointment: {
    en: 'Customers book time slots online, with confirmations and reminders handled automatically.',
    tr: 'Müşterileriniz online randevu alır; onay ve hatırlatmalar otomatik olarak yönetilir.',
  },
  'management-panel': {
    en: 'A back-office panel to manage staff, services, and day-to-day operations.',
    tr: 'Personel, hizmet ve günlük operasyonları yönetebileceğiniz bir yönetim paneli.',
  },
  crm: {
    en: 'Track customers, history, and follow-ups in one place.',
    tr: 'Müşterilerinizi, geçmişlerini ve takip süreçlerini tek bir yerden yönetin.',
  },
  'mobile-app': {
    en: 'A dedicated mobile app for customers or staff.',
    tr: 'Müşterileriniz veya çalışanlarınız için özel bir mobil uygulama.',
  },
  automation: {
    en: 'Connect your existing tools and automate repetitive manual work.',
    tr: 'Kullandığınız araçları birbirine bağlayın, tekrarlayan manuel işleri otomatikleştirin.',
  },
};

export type ServiceSlug =
  | 'website-web-application'
  | 'mobile-application'
  | 'game-development'
  | 'custom-software-admin-panels'
  | 'integrations-automation'
  | 'maintenance-technical-support';

export type ServiceGroup = 'digital-products' | 'software-solutions';

export interface ServiceMeta {
  /** Canonical id, also the EN URL slug under /services/[slug]. */
  slug: ServiceSlug;
  /** TR URL slug under /hizmetler/[trSlug]. */
  trSlug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  group: ServiceGroup;
}

export const SERVICES: ServiceMeta[] = [
  {
    slug: 'website-web-application',
    trSlug: 'web-sitesi-web-uygulama',
    title: { en: 'Website & Web Application', tr: 'Web Sitesi & Web Uygulama' },
    shortDescription: {
      en: 'Marketing sites, customer portals, and full web applications.',
      tr: 'Kurumsal siteler, müşteri portalları ve uçtan uca web uygulamaları.',
    },
    group: 'digital-products',
  },
  {
    slug: 'mobile-application',
    trSlug: 'mobil-uygulama',
    title: { en: 'Mobile Application', tr: 'Mobil Uygulama' },
    shortDescription: {
      en: 'Native and cross-platform apps for iOS and Android.',
      tr: 'iOS ve Android için native ve çoklu platform mobil uygulamalar.',
    },
    group: 'digital-products',
  },
  {
    slug: 'game-development',
    trSlug: 'oyun-gelistirme',
    title: { en: 'Game Development', tr: 'Oyun Geliştirme' },
    shortDescription: {
      en: '2D and 3D games and interactive experiences for web and mobile.',
      tr: 'Web ve mobil için 2D/3D oyunlar ve etkileşimli deneyimler.',
    },
    group: 'digital-products',
  },
  {
    slug: 'custom-software-admin-panels',
    trSlug: 'ozel-yazilim-yonetim-panelleri',
    title: { en: 'Custom Software & Admin Panels', tr: 'Özel Yazılım & Yönetim Panelleri' },
    shortDescription: {
      en: 'Bespoke back-office tools and management dashboards.',
      tr: 'İşletmenize özel arka ofis araçları ve yönetim panelleri.',
    },
    group: 'software-solutions',
  },
  {
    slug: 'integrations-automation',
    trSlug: 'entegrasyon-otomasyon',
    title: { en: 'Integrations & Automation', tr: 'Entegrasyon & Otomasyon' },
    shortDescription: {
      en: 'Connect your tools and automate manual workflows.',
      tr: 'Araçlarınızı birbirine bağlayın, manuel iş akışlarını otomatikleştirin.',
    },
    group: 'software-solutions',
  },
  {
    slug: 'maintenance-technical-support',
    trSlug: 'bakim-teknik-destek',
    title: { en: 'Maintenance & Technical Support', tr: 'Bakım & Teknik Destek' },
    shortDescription: {
      en: 'Ongoing updates, monitoring, and support for existing software.',
      tr: 'Mevcut yazılımlarınız için sürekli güncelleme, izleme ve destek.',
    },
    group: 'software-solutions',
  },
];

export const SERVICE_GROUPS: { key: ServiceGroup; label: LocalizedText }[] = [
  { key: 'digital-products', label: { en: 'Digital Products', tr: 'Dijital Ürünler' } },
  { key: 'software-solutions', label: { en: 'Software Solutions', tr: 'Yazılım Çözümleri' } },
];

export function getServiceMeta(slug: ServiceSlug): ServiceMeta {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
}

/** Looks a service up by its URL slug in the given locale (EN slug or TR slug). */
export function getServiceMetaByUrlSlug(urlSlug: string, locale: Locale): ServiceMeta | undefined {
  return SERVICES.find((item) => (locale === 'en' ? item.slug === urlSlug : item.trSlug === urlSlug));
}

export type IndustryGroup = 'beauty' | 'healthcare' | 'other';

export interface IndustryFaqItem {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface IndustryMeta {
  /** Canonical id, also the EN URL slug under /sectoral-software/[slug]. */
  slug: string;
  /** TR URL slug under /sektorel-yazilimlar/[trSlug]. */
  trSlug: string;
  title: LocalizedText;
  group: IndustryGroup;
  summary: LocalizedText;
  applicableSolutions: SolutionKey[];
  relatedServiceSlugs: ServiceSlug[];
  /** ProjectCategory.slug in the existing catalog data, when a real design-example mapping exists. */
  catalogSectorSlug?: string;
  /**
   * Genuine, industry-specific FAQ — only claims about capabilities the
   * product actually has (website/appointment/management-panel/crm/
   * mobile-app/automation). Never medical/legal claims (patient records,
   * e-prescription, insurance integration, KVKK certification, payment
   * processing) unless verified elsewhere in the codebase.
   */
  faq?: IndustryFaqItem[];
  /**
   * TR-only path to a dedicated, deeper product page for this industry's
   * appointment system, when one exists (e.g. /sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi).
   * Used to send "randevu sistemi" intent to the stronger page instead of
   * competing with it — see the Phase 2 cannibalization audit.
   */
  dedicatedAppointmentPageHref?: string;
}

export const INDUSTRY_GROUPS: { key: IndustryGroup; label: LocalizedText }[] = [
  { key: 'beauty', label: { en: 'Beauty & Personal Care', tr: 'Güzellik & Kişisel Bakım' } },
  { key: 'healthcare', label: { en: 'Healthcare', tr: 'Sağlık' } },
  { key: 'other', label: { en: 'Other Industries', tr: 'Diğer Sektörler' } },
];

export const INDUSTRIES: IndustryMeta[] = [
  {
    slug: 'hair-salon-barber',
    trSlug: 'kuafor-berber',
    title: { en: 'Hair Salon & Barber', tr: 'Kuaför & Berber' },
    group: 'beauty',
    summary: {
      en: 'Booking, client history, and a professional online presence for hair salons and barbershops.',
      tr: 'Kuaför ve berber salonları için randevu, müşteri geçmişi ve profesyonel bir online varlık.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    catalogSectorSlug: 'kuafor-berber',
    dedicatedAppointmentPageHref: '/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi',
    faq: [
      {
        question: { tr: 'Kuaför randevu sistemi hangi işletme büyüklüğü için uygun?', en: 'What business size does the hair salon booking system suit?' },
        answer: {
          tr: 'Tek koltuklu bir berberden çok personelli bir salona kadar ölçeklenebilir; her personel için ayrı takvim tanımlanabilir.',
          en: 'It scales from a single-chair barbershop to a salon with many staff members; a separate calendar can be defined for each staff member.',
        },
      },
    ],
  },
  {
    slug: 'beauty-center',
    trSlug: 'guzellik-merkezi',
    title: { en: 'Beauty Center', tr: 'Güzellik Merkezi' },
    group: 'beauty',
    summary: {
      en: 'Service menus, staff scheduling, and customer retention tools for beauty centers.',
      tr: 'Güzellik merkezleri için hizmet menüleri, personel planlama ve müşteri sadakati araçları.',
    },
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['website-web-application', 'custom-software-admin-panels'],
    catalogSectorSlug: 'guzellik-bakim-merkezi',
    dedicatedAppointmentPageHref: '/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi',
    faq: [
      {
        question: { tr: 'Farklı hizmet paketlerini (cilt bakımı, masaj vb.) randevu sisteminde ayrı ayrı tanımlayabilir miyiz?', en: 'Can we define different service packages (skincare, massage, etc.) separately in the booking system?' },
        answer: {
          tr: 'Evet, her hizmeti kendi süresi ve gerekiyorsa kendi terapisti/personeliyle ayrı ayrı tanımlayabilirsiniz.',
          en: 'Yes, each service can be defined separately with its own duration and, if needed, its own therapist/staff member.',
        },
      },
    ],
  },
  {
    slug: 'spa-wellness',
    trSlug: 'spa-wellness',
    title: { en: 'Spa & Wellness', tr: 'Spa & Wellness' },
    group: 'beauty',
    summary: {
      // "Membership tracking" kept at CRM-level (contact/customer history),
      // not a dedicated membership/access-control system — that capability
      // isn't verified, so it's not implied here.
      en: 'Online booking and a professional web presence for spas and wellness studios.',
      tr: 'Spa ve wellness merkezleri için online randevu sistemi ve profesyonel bir web varlığı.',
    },
    applicableSolutions: ['website', 'appointment', 'crm'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    faq: [
      {
        question: { tr: 'Spa merkezimiz için tam bir yönetim sistemi mi, yoksa randevu sistemi mi uygun?', en: 'Do we need a full management system or just a booking system for our spa?' },
        answer: {
          tr: 'Çoğu spa/wellness işletmesi için online randevu sistemi ve profesyonel bir web sitesi temel ihtiyacı karşılar. Personel, stok veya operasyonel süreçleri kapsayan daha geniş bir yönetim paneli isterseniz, bunu özel yazılım hizmetimiz kapsamında ayrıca değerlendiririz.',
          en: 'For most spa/wellness businesses, an online booking system and a professional website cover the core need. If you want a broader management panel covering staff, inventory, or operations, we scope that separately as a custom software project.',
        },
      },
      {
        question: { tr: 'Üyelik veya paket takibi yapabiliyor muyuz?', en: 'Can we track memberships or packages?' },
        answer: {
          tr: 'CRM panelinize müşteri bazlı not ve takip alanları ekleyebiliriz; tam otomatik bir üyelik/paket kullanım sistemi ayrı bir kapsam gerektirir.',
          en: 'We can add per-customer notes and tracking fields to your CRM panel; a fully automated membership/package usage system requires separate scoping.',
        },
      },
    ],
  },
  {
    slug: 'clinic',
    trSlug: 'klinik',
    title: { en: 'Clinic', tr: 'Klinik' },
    group: 'healthcare',
    summary: {
      en: 'Patient appointment scheduling, a staff management panel, and a professional web presence for clinics.',
      tr: 'Klinikler için hasta randevu sistemi, personel yönetim paneli ve profesyonel bir web varlığı.',
    },
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'website-web-application'],
    dedicatedAppointmentPageHref: '/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi',
    faq: [
      {
        question: { tr: 'Klinik yönetim sistemi tam olarak ne sağlıyor?', en: 'What does a clinic management system actually provide?' },
        answer: {
          tr: 'Hastalarınızın online randevu alabileceği bir sistem, personel ve randevu takvimini yönetebileceğiniz bir panel ve kliniğinizi tanıtan profesyonel bir web sitesi sağlıyoruz. İhtiyacınıza göre müşteri/hasta iletişim geçmişini takip eden bir CRM katmanı da ekleyebiliriz.',
          en: 'We provide an online appointment system for your patients, a management panel for your staff and calendar, and a professional website for your clinic. A CRM layer to track patient contact history can be added if needed.',
        },
      },
      {
        question: { tr: 'Hasta kayıtlarını veya tıbbi verileri sisteme aktarabilir miyiz?', en: 'Can we import patient records or medical data into the system?' },
        answer: {
          tr: 'Sistemimiz randevu ve iletişim bilgisi takibi için tasarlanmıştır; tıbbi kayıt, reçete veya sigorta entegrasyonu gibi klinik veri yönetimi kapsam dışıdır. Bu tür ihtiyaçlarınız varsa, projeyi netleştirirken birlikte değerlendirebiliriz.',
          en: 'Our system is designed for appointment and contact tracking; clinical record-keeping, e-prescription, or insurance integration are outside its current scope. If you need these specifically, we can scope that separately.',
        },
      },
      {
        question: { tr: 'Birden fazla doktor veya birden fazla şube için kullanılabilir mi?', en: 'Can it be used for multiple doctors or multiple branches?' },
        answer: {
          tr: 'Evet, yönetim paneli birden fazla personel/doktor takvimini ve isterseniz birden fazla şubeyi destekleyecek şekilde tasarlanabilir.',
          en: 'Yes, the management panel can be designed to support multiple staff/doctor calendars and, if needed, multiple branches.',
        },
      },
    ],
  },
  {
    slug: 'dental-clinic',
    trSlug: 'dis-klinigi',
    title: { en: 'Dental Clinic', tr: 'Diş Kliniği' },
    group: 'healthcare',
    summary: {
      en: 'Appointment booking, a patient contact/CRM panel, and a professional web presence for dental practices.',
      tr: 'Diş klinikleri için randevu sistemi, hasta iletişim/CRM paneli ve profesyonel bir web varlığı.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'management-panel'],
    relatedServiceSlugs: ['website-web-application', 'custom-software-admin-panels'],
    catalogSectorSlug: 'dis-klinigi-ozel-klinik',
    faq: [
      {
        question: { tr: 'Diş kliniğim için randevu sistemi nasıl çalışır?', en: 'How does an appointment system work for my dental clinic?' },
        answer: {
          tr: 'Hastalarınız web sitenizden uygun tarih ve saati seçerek online randevu alır, siz de tüm randevuları tek bir yönetim panelinden takip edersiniz. Onay ve hatırlatmalar otomatik yönetilir.',
          en: 'Your patients pick an available date and time from your website and book online, while you track every appointment from one management panel. Confirmations and reminders are handled automatically.',
        },
      },
      {
        question: { tr: 'Tedavi geçmişi veya röntgen gibi klinik verileri sisteme kaydedebilir miyiz?', en: 'Can we store treatment history or clinical records like X-rays in the system?' },
        answer: {
          tr: 'Sistem randevu ve hasta iletişim bilgisi takibi için tasarlanmıştır; klinik tedavi kayıtları veya görüntüleme verileri kapsam dışıdır. Böyle bir ihtiyacınız varsa projeyi ayrıca birlikte netleştirebiliriz.',
          en: 'The system is built for appointment and contact tracking; clinical treatment records or imaging data are outside its current scope. If you need this, we can scope it separately.',
        },
      },
    ],
  },
  {
    slug: 'psychologist-consultant',
    trSlug: 'psikolog-danisman',
    title: { en: 'Psychologist / Consultant', tr: 'Psikolog / Danışman' },
    group: 'healthcare',
    summary: {
      en: 'A professional website and simple session scheduling for independent practitioners.',
      tr: 'Bağımsız çalışan uzmanlar için profesyonel bir web sitesi ve basit seans planlama.',
    },
    applicableSolutions: ['website', 'appointment', 'crm'],
    relatedServiceSlugs: ['website-web-application'],
    faq: [
      {
        question: { tr: 'Bağımsız çalışan bir psikolog/danışman olarak randevu sistemine ihtiyacım var mı?', en: 'As an independent psychologist/consultant, do I need an appointment system?' },
        answer: {
          tr: 'Telefon veya mesajla randevu takibi tek kişilik bir pratikte belirli bir noktaya kadar işler; danışan sayınız arttıkça online randevu sistemi çakışmaları önler ve size zaman kazandırır.',
          en: 'Tracking appointments by phone or message works up to a point for a solo practice; as your client base grows, an online booking system prevents double-booking and saves you time.',
        },
      },
      {
        question: { tr: 'Seans notlarını veya danışan geçmişini sisteme kaydedebilir miyim?', en: 'Can I store session notes or client history in the system?' },
        answer: {
          tr: 'Sistem randevu planlama ve temel iletişim/CRM takibi için tasarlanmıştır; klinik seans notu tutma kapsam dışıdır.',
          en: 'The system is designed for scheduling and basic contact/CRM tracking; clinical session note-keeping is outside its current scope.',
        },
      },
    ],
  },
  {
    slug: 'dietitian',
    trSlug: 'diyetisyen',
    title: { en: 'Dietitian', tr: 'Diyetisyen' },
    group: 'healthcare',
    summary: {
      en: 'Booking, client progress tracking, and plan delivery for dietitians and nutrition coaches.',
      tr: 'Diyetisyenler ve beslenme koçları için randevu, danışan takibi ve plan teslimi.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    faq: [
      {
        question: { tr: 'Danışanlarıma beslenme planlarını nasıl iletebilirim?', en: 'How can I deliver nutrition plans to my clients?' },
        answer: {
          tr: 'Web sitenizdeki randevu sistemi ve danışan takip paneli üzerinden süreci yönetirsiniz; dilerseniz danışanlarınıza özel bir mobil uygulama üzerinden plan teslimi de geliştirebiliriz.',
          en: 'You manage the process through your website\'s appointment system and client-tracking panel; a dedicated mobile app for plan delivery can also be built if you want that.',
        },
      },
      {
        question: { tr: 'Danışan ilerlemesini (kilo, ölçüm vb.) takip edebilir miyim?', en: 'Can I track client progress (weight, measurements, etc.)?' },
        answer: {
          tr: 'Evet, CRM panelinize danışan bazlı notlar ve takip alanları ekleyebiliriz; kapsamı ihtiyacınıza göre birlikte belirleriz.',
          en: 'Yes, we can add per-client notes and tracking fields to your CRM panel; the exact scope is defined together based on your needs.',
        },
      },
    ],
  },
  {
    slug: 'restaurant-cafe',
    trSlug: 'restoran-kafe',
    title: { en: 'Restaurant & Cafe', tr: 'Restoran & Kafe' },
    group: 'other',
    summary: {
      // "Ordering" removed — the actual QR Menu product is a digital menu
      // (self-service price/product updates), not an order-taking/POS
      // system. Don't claim capability the product doesn't have.
      en: 'Digital menus, a mobile-friendly presence, and operations tools for restaurants and cafes.',
      tr: 'Restoran ve kafeler için dijital menü, mobil uyumlu bir varlık ve operasyon araçları.',
    },
    applicableSolutions: ['website', 'mobile-app', 'management-panel', 'automation'],
    relatedServiceSlugs: ['mobile-application', 'integrations-automation'],
    catalogSectorSlug: 'restoran-kafe',
    faq: [
      {
        question: { tr: 'QR Menü sistemi bir sipariş/adisyon sistemi mi?', en: 'Is the QR Menu system an ordering/POS system?' },
        answer: {
          tr: 'Hayır. QR Menü, müşterilerinizin masadan taradığı ve anlık güncelleyebildiğiniz dijital bir menüdür — sipariş alma, adisyon veya ödeme işlemleri kapsamında değildir. Bu tür bir sipariş/POS ihtiyacınız varsa özel bir yazılım projesi olarak ayrıca değerlendirebiliriz.',
          en: 'No. QR Menu is a digital menu customers scan at the table and that you can update instantly — it does not include order-taking, POS, or payment processing. If you need an ordering/POS system specifically, we can scope that as a separate custom software project.',
        },
      },
      {
        question: { tr: 'Birden fazla şubem varsa her şube için ayrı menü yönetebilir miyim?', en: 'If I have multiple branches, can I manage a separate menu per branch?' },
        answer: {
          tr: 'Evet, yönetim paneli üzerinden her şube için ayrı menü tanımlayabilir ve merkezi olarak yönetebilirsiniz.',
          en: 'Yes, you can define a separate menu per branch through the management panel and manage them centrally.',
        },
      },
    ],
  },
  {
    slug: 'hotel-hospitality',
    trSlug: 'otel-konaklama',
    title: { en: 'Hotel & Hospitality', tr: 'Otel & Konaklama' },
    group: 'other',
    summary: {
      en: 'Booking, guest contact management, and a management panel for hospitality businesses.',
      tr: 'Konaklama işletmeleri için rezervasyon sistemi, misafir iletişim takibi ve bir yönetim paneli.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'management-panel'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
    faq: [
      {
        question: { tr: 'Rezervasyon sistemi mevcut bir channel manager veya OTA (Booking.com vb.) ile entegre olabilir mi?', en: 'Can the reservation system integrate with an existing channel manager or OTA (Booking.com, etc.)?' },
        answer: {
          tr: 'Bu, kullandığınız sisteme ve API desteğine bağlı olarak proje kapsamında ayrıca değerlendirilecek bir entegrasyon ihtiyacıdır; genel bir entegrasyon/otomasyon hizmeti olarak sunuyoruz, ancak her OTA için hazır bir bağlantı garanti etmiyoruz.',
          en: 'This depends on the system you use and its API support, and is scoped as a specific integration need within the project; we offer this as a general integration/automation service, but don\'t guarantee a pre-built connector for every OTA.',
        },
      },
      {
        question: { tr: 'Tesis operasyonlarını (oda durumu, temizlik vb.) yönetim panelinden takip edebilir miyiz?', en: 'Can we track property operations (room status, housekeeping, etc.) from the management panel?' },
        answer: {
          tr: 'Evet, yönetim paneli işletmenizin gerçek iş akışına göre tasarlanır; oda/rezervasyon durumu takibi gibi operasyonel ekranlar kapsama dahil edilebilir.',
          en: 'Yes, the management panel is designed around your business\'s real workflow; operational screens like room/reservation status tracking can be included in scope.',
        },
      },
    ],
  },
  {
    slug: 'veterinary-pet-services',
    trSlug: 'veteriner-pet-hizmetleri',
    title: { en: 'Veterinary & Pet Services', tr: 'Veteriner & Pet Hizmetleri' },
    group: 'other',
    summary: {
      en: 'Appointment scheduling and client/pet contact management for veterinary practices and pet services.',
      tr: 'Veteriner klinikleri ve pet hizmetleri için randevu sistemi ve müşteri/pet iletişim takibi.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    catalogSectorSlug: 'pet-kuaforu-pet-hizmetleri',
    faq: [
      {
        question: { tr: 'Randevu sistemi hem klinik hem pet bakım hizmetleri için uygun mu?', en: 'Does the appointment system work for both clinical and pet-care services?' },
        answer: {
          tr: 'Evet, muayene randevusu, aşı takibi hatırlatması veya pet kuaförü/bakım randevusu gibi farklı hizmet türlerini aynı takvim üzerinden yönetebilirsiniz.',
          en: 'Yes, you can manage different service types — an exam appointment, a vaccination reminder, or a pet grooming/care booking — from the same calendar.',
        },
      },
      {
        question: { tr: 'Hayvan sahiplerinin evcil hayvan bilgilerini (tür, yaş vb.) kaydedebilir miyiz?', en: 'Can we store pet details (species, age, etc.) for each owner?' },
        answer: {
          tr: 'Evet, CRM panelinize sahip bazlı evcil hayvan bilgisi alanları ekleyebiliriz; kapsamlı bir tıbbi kayıt sistemi değil, iletişim ve takip amaçlı bir yapıdır.',
          en: 'Yes, we can add owner-linked pet detail fields to your CRM panel; this is a contact/tracking structure, not a full medical record system.',
        },
      },
    ],
  },
  {
    slug: 'real-estate',
    trSlug: 'emlak',
    title: { en: 'Real Estate', tr: 'Emlak' },
    group: 'other',
    summary: {
      en: 'Listing websites, lead tracking, and CRM automation for real estate agencies and agents.',
      tr: 'Emlak ofisleri ve danışmanları için ilan siteleri, lead takibi ve CRM otomasyonu.',
    },
    applicableSolutions: ['website', 'crm', 'mobile-app', 'automation'],
    relatedServiceSlugs: ['website-web-application', 'integrations-automation'],
    catalogSectorSlug: 'emlak-danismanligi',
    faq: [
      {
        question: { tr: 'İlan/portföy yönetimi için özel bir panel geliştirebilir misiniz?', en: 'Can you build a dedicated panel for listing/portfolio management?' },
        answer: {
          tr: 'Web sitenize ilan listeleme ve lead takibi entegre edilir; kapsamlı bir portföy yönetim paneli (çoklu danışman, yetkilendirme vb.) isterseniz bunu özel yazılım hizmetimiz kapsamında ayrıca değerlendiririz.',
          en: 'Listing display and lead tracking are integrated into your website; a full portfolio management panel (multiple agents, permissions, etc.) is scoped separately as a custom software project.',
        },
      },
      {
        question: { tr: 'Gelen talepleri (lead) otomatik olarak takip edebilir miyiz?', en: 'Can we automatically track incoming leads?' },
        answer: {
          tr: 'Evet, web sitenizden gelen talepler CRM panelinize otomatik olarak düşer ve takip durumunu buradan yönetebilirsiniz.',
          en: 'Yes, inquiries from your website flow automatically into your CRM panel, where you can manage follow-up status.',
        },
      },
    ],
  },
  {
    slug: 'education-courses',
    trSlug: 'egitim-kurslar',
    title: { en: 'Education & Courses', tr: 'Eğitim & Kurslar' },
    group: 'other',
    summary: {
      // "Student management" softened — this is enrollment/contact
      // tracking (CRM + management-panel), not an academic records/LMS
      // system, which isn't a verified capability.
      en: 'Course catalogs, student enrollment tracking, and enrollment automation for schools and course providers.',
      tr: 'Okul ve kurs sağlayıcıları için kurs katalogları, öğrenci kayıt/iletişim takibi ve kayıt otomasyonu.',
    },
    applicableSolutions: ['website', 'management-panel', 'crm', 'automation'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
    faq: [
      {
        question: { tr: 'Öğrenci notlarını, devam takibini veya sınıf yönetimini (LMS) sağlayabiliyor musunuz?', en: 'Can you provide student grades, attendance tracking, or classroom management (LMS)?' },
        answer: {
          tr: 'Hayır, bu bir akademik kayıt/LMS sistemi değildir. Sunduğumuz çözüm kurs kataloğu, kayıt/iletişim takibi ve kayıt sürecinin otomasyonuna odaklanır. Kapsamlı bir LMS ihtiyacınız varsa özel bir yazılım projesi olarak ayrıca değerlendirebiliriz.',
          en: 'No, this is not an academic records/LMS system. What we offer focuses on course catalogs, enrollment/contact tracking, and automating the registration process. If you need a full LMS, we can scope that as a separate custom software project.',
        },
      },
      {
        question: { tr: 'Yeni kayıtlar otomatik olarak bildirim veya onay sürecine girebilir mi?', en: 'Can new enrollments automatically enter a notification or approval process?' },
        answer: {
          tr: 'Evet, kayıt formundan gelen başvurular otomasyon katmanı üzerinden bildirim gönderebilir veya onay akışına dahil edilebilir.',
          en: 'Yes, submissions from your enrollment form can trigger notifications or feed into an approval flow through the automation layer.',
        },
      },
    ],
  },
  {
    slug: 'sports-fitness',
    trSlug: 'spor-fitness',
    title: { en: 'Sports & Fitness', tr: 'Spor & Fitness' },
    group: 'other',
    summary: {
      // "Membership management" softened to CRM-level contact/member
      // tracking — a full membership/access-control (turnstile, payment
      // plans) system isn't a verified capability.
      en: 'Class scheduling, member contact tracking, and a mobile-friendly booking experience for gyms and studios.',
      tr: 'Spor salonları ve stüdyolar için ders planlama, üye iletişim takibi ve mobil uyumlu randevu deneyimi.',
    },
    applicableSolutions: ['website', 'appointment', 'mobile-app', 'crm'],
    relatedServiceSlugs: ['mobile-application', 'website-web-application'],
    faq: [
      {
        question: { tr: 'Üyelik paketleri, kartlı giriş veya otomatik ödeme takibi sağlıyor musunuz?', en: 'Do you provide membership packages, card-entry access, or automatic payment tracking?' },
        answer: {
          tr: 'Bu, mevcut kapsamımızın dışındadır. Sunduğumuz çözüm ders/randevu planlama ve üye iletişim takibine odaklanır. Kartlı giriş sistemi veya otomatik ödeme takibi gibi ihtiyaçlarınız varsa özel bir yazılım/entegrasyon projesi olarak ayrıca değerlendirebiliriz.',
          en: "This is outside our current scope. What we offer focuses on class/appointment scheduling and member contact tracking. If you need card-entry access or automatic payment tracking, we can scope that as a separate custom software/integration project.",
        },
      },
      {
        question: { tr: 'Üyeler ders veya seans rezervasyonunu telefonundan yapabilir mi?', en: 'Can members book a class or session from their phone?' },
        answer: {
          tr: 'Evet, randevu sistemi mobil uyumludur; isterseniz özel bir mobil uygulama da geliştirebiliriz.',
          en: "Yes, the booking system is mobile-friendly; a dedicated mobile app can also be built if you want that.",
        },
      },
    ],
  },
  {
    slug: 'automotive',
    trSlug: 'otomotiv',
    title: { en: 'Automotive', tr: 'Otomotiv' },
    group: 'other',
    summary: {
      en: 'Service booking, customer contact tracking, and a staff management panel for automotive service businesses.',
      tr: 'Oto servis işletmeleri için randevu sistemi, müşteri iletişim takibi ve personel yönetim paneli.',
    },
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'website-web-application'],
    catalogSectorSlug: 'otomotiv-servisi-arac-bakim',
    faq: [
      {
        question: { tr: 'Araç bazlı servis geçmişini (plaka, yapılan işlemler vb.) takip edebiliyor muyuz?', en: 'Can we track per-vehicle service history (plate number, work done, etc.)?' },
        answer: {
          tr: 'Standart kapsamımız randevu ve müşteri iletişim takibini içerir. Araç bazlı ayrıntılı servis geçmişi takibi isterseniz, bunu yönetim panelinize özel bir modül olarak ekleyebiliriz — proje kapsamında ayrıca netleştirilir.',
          en: 'Our standard scope covers appointment and customer contact tracking. If you want detailed per-vehicle service history tracking, we can add it to your management panel as a custom module — scoped separately within the project.',
        },
      },
      {
        question: { tr: 'Birden fazla teknisyen için randevu takvimi yönetebilir miyiz?', en: 'Can we manage an appointment calendar for multiple technicians?' },
        answer: {
          tr: 'Evet, yönetim paneli birden fazla personel/teknisyen takvimini destekleyecek şekilde tasarlanabilir.',
          en: 'Yes, the management panel can be designed to support multiple staff/technician calendars.',
        },
      },
    ],
  },
  {
    slug: 'retail',
    trSlug: 'perakende',
    title: { en: 'Retail', tr: 'Perakende' },
    group: 'other',
    summary: {
      // "Inventory-aware" removed — no verified stock/inventory-tracking
      // capability exists; management-panel is a generic back-office panel.
      en: 'Professional storefronts and a back-office management panel for retail businesses.',
      tr: 'Perakende işletmeleri için profesyonel vitrin siteleri ve bir arka ofis yönetim paneli.',
    },
    applicableSolutions: ['website', 'management-panel', 'automation', 'mobile-app'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
    faq: [
      {
        question: { tr: 'Stok takibi, POS veya fatura kesme özelliği sunuyor musunuz?', en: 'Do you offer stock tracking, POS, or invoicing functionality?' },
        answer: {
          tr: 'Hayır, standart kapsamımızda stok yönetimi, satış noktası (POS) veya faturalama bulunmuyor. Sunduğumuz çözüm profesyonel bir vitrin sitesi ve arka ofis yönetim panelidir. Stok/POS/faturalama gibi ihtiyaçlarınız varsa, mevcut sisteminizle entegrasyon veya özel bir yazılım projesi olarak ayrıca değerlendirebiliriz.',
          en: 'No, our standard scope does not include stock management, point-of-sale, or invoicing. What we offer is a professional storefront and a back-office management panel. If you need stock/POS/invoicing, we can scope an integration with your existing system, or a separate custom software project.',
        },
      },
      {
        question: { tr: 'Mevcut bir muhasebe veya stok programımızla entegre olabilir mi?', en: 'Can it integrate with an accounting or stock program we already use?' },
        answer: {
          tr: 'Kullandığınız programın API desteğine bağlı olarak bu, entegrasyon/otomasyon hizmetimiz kapsamında ayrıca değerlendirilecek bir ihtiyaçtır.',
          en: "Depending on the API support of the program you use, this is scoped as a specific need within our integration/automation service.",
        },
      },
    ],
  },
];

export function getIndustryMeta(slug: string): IndustryMeta | undefined {
  return INDUSTRIES.find((item) => item.slug === slug);
}

/** Looks an industry up by its URL slug in the given locale (EN slug or TR slug). */
export function getIndustryMetaByUrlSlug(urlSlug: string, locale: Locale): IndustryMeta | undefined {
  return INDUSTRIES.find((item) => (locale === 'en' ? item.slug === urlSlug : item.trSlug === urlSlug));
}

export function getServicesForIndustry(industry: IndustryMeta): ServiceMeta[] {
  return industry.relatedServiceSlugs.map((slug) => getServiceMeta(slug));
}

export function getIndustriesForService(serviceSlug: ServiceSlug): IndustryMeta[] {
  return INDUSTRIES.filter((industry) => industry.relatedServiceSlugs.includes(serviceSlug));
}

// --- Locale-aware href builders -------------------------------------------------
// Route segments differ by locale (EN uses English segment names, TR reuses the
// site's existing Turkish segment names), so every internal link must be built
// through these helpers rather than a hardcoded path.

export function servicesHubHref(locale: Locale): string {
  return locale === 'en' ? '/services' : '/hizmetler';
}

export function serviceHref(locale: Locale, service: ServiceMeta): string {
  return locale === 'en' ? `/services/${service.slug}` : `/hizmetler/${service.trSlug}`;
}

export function industriesHubHref(locale: Locale): string {
  return locale === 'en' ? '/sectoral-software' : '/sektorel-yazilimlar';
}

export function industryHref(locale: Locale, industry: IndustryMeta): string {
  return locale === 'en' ? `/sectoral-software/${industry.slug}` : `/sektorel-yazilimlar/${industry.trSlug}`;
}

export function designExamplesHref(locale: Locale): string {
  return locale === 'en' ? '/web-design-examples' : '/site-ornekleri';
}

// --- Nav menu builders (consumed by MegaMenuNav + MobileNavAccordion) ----------

export const CORPORATE_LINKS: { navKey: 'hakkimizda' | 'blog' | 'kariyer' | 'iletisim'; href: string }[] = [
  { navKey: 'hakkimizda', href: '/kurumsal/hakkimizda' },
  { navKey: 'blog', href: '/kurumsal/blog' },
  { navKey: 'kariyer', href: '/kurumsal/kariyer' },
  { navKey: 'iletisim', href: '/kurumsal/iletisim' },
];

export function getSectoralMenu(locale: Locale) {
  return {
    label: locale === 'en' ? 'Sectoral Software' : 'Sektörel Yazılımlar',
    groups: INDUSTRY_GROUPS.map((group) => ({
      heading: t(group.label, locale),
      items: INDUSTRIES.filter((industry) => industry.group === group.key).map((industry) => ({
        label: t(industry.title, locale),
        href: industryHref(locale, industry),
      })),
    })),
    viewAllLabel: locale === 'en' ? 'View All Sectoral Solutions' : 'Tüm Sektörel Çözümleri Gör',
    viewAllHref: industriesHubHref(locale),
    ctaLabel: locale === 'en' ? "Don't see your industry? Let's talk" : 'Sektörünüz listede yok mu? Görüşelim',
    ctaHref: '/teklif-al',
  };
}

export function getServicesMenu(locale: Locale) {
  return {
    label: locale === 'en' ? 'Services' : 'Hizmetler',
    groups: SERVICE_GROUPS.map((group) => ({
      heading: t(group.label, locale),
      items: SERVICES.filter((service) => service.group === group.key).map((service) => ({
        label: t(service.title, locale),
        href: serviceHref(locale, service),
      })),
    })),
    viewAllLabel: locale === 'en' ? 'View All Services' : 'Tüm Hizmetleri Gör',
    viewAllHref: servicesHubHref(locale),
    secondaryLabel: locale === 'en' ? 'Web Design Examples' : 'Web Tasarım Örnekleri',
    secondaryHref: designExamplesHref(locale),
  };
}
