// ============================================================================
// ARILLASOFT SOLUTION / PACKAGE CATALOG — TEMPORARY PLACEHOLDER DATA
// ============================================================================
//
// EVERY price, deliveryDays, revisionCount, and extra price in this file is a
// TEMPORARY, EDITABLE PLACEHOLDER. Nothing here has been verified with the
// business as a real, sellable figure — these are plausible market-style
// placeholders sized to the rough scope of each package, generated so the
// catalog UI has real numbers to render and lay out correctly.
//
// DO NOT present these values to a customer as final. DO NOT build checkout,
// invoicing, or any business logic that treats a specific amount here as
// authoritative — that logic does not exist anywhere in this codebase today.
//
// TO EDIT COMMERCIAL VALUES: everything (price, deliveryDays, revisionCount,
// includedFeatures, optionalExtras, tiers, ...) lives in this one file, in
// the SOLUTIONS array below. No UI component needs to change when you update
// a number or a feature list here — see src/components/solutions/*.tsx,
// which only render whatever this file exports.
//
// Slugs are shared between the /cozumler (tr) and /solutions (en) route
// trees — one canonical slug per solution, not translated per locale.
// ============================================================================

import type { Solution, LocalizedText, PlaceholderExtra } from "./types";

function L(tr: string, en: string): LocalizedText {
  return { tr, en };
}

const TRY = (amount: number) => ({ amount, currency: "TRY" as const });

// ---------------------------------------------------------------------------
// Shared placeholder snippet pools — reused across similar packages so the
// data stays DRY. Still fully editable: change the pool entry once, every
// package referencing it updates together.
// ---------------------------------------------------------------------------

const REQ = {
  brandAssets: L("Marka logosu ve kurumsal renkleriniz", "Your brand logo and corporate colors"),
  pageContent: L("Sayfa metinleri ve ürün/hizmet içerikleri", "Page copy and product/service content"),
  visuals: L("Ürün/hizmet görselleri veya fotoğraflar", "Product/service visuals or photos"),
  domainHosting: L(
    "Domain ve hosting erişim bilgileri (varsa)",
    "Domain and hosting access details (if you already have them)"
  ),
  businessInfo: L(
    "İşletme bilgileri (adres, çalışma saatleri, iletişim)",
    "Business details (address, hours, contact info)"
  ),
  existingAccess: L("Mevcut sistem/panel erişim bilgileri", "Access to your existing system or panel"),
  socialAccess: L("İlgili sosyal medya / Google hesap erişimleri", "Access to the relevant social media / Google accounts"),
  paymentProvider: L(
    "Kullanılacak ödeme veya kargo sağlayıcı bilgileri",
    "Details of the payment or shipping provider to use"
  ),
  productCatalog: L("Ürün/hizmet ve fiyat listesi", "Product/service and price list"),
  staffList: L("Personel ve çalışma saatleri listesi", "Staff list and working hours"),
} as const;

const DELIV = {
  liveSystem: L("Yayına alınmış, çalışır durumda site/sistem", "A live, working site/system"),
  handoverWalkthrough: L(
    "Teslim sonrası erişim bilgileri ve temel kullanım anlatımı",
    "Post-delivery access details and a basic usage walkthrough"
  ),
  responsive: L("Mobil ve masaüstü uyumlu arayüz", "A mobile and desktop responsive interface"),
  basicSeoSetup: L("Temel SEO ayarları (başlık, meta etiketleri, sitemap)", "Basic SEO setup (titles, meta tags, sitemap)"),
  writtenReport: L("Bulguları özetleyen yazılı rapor", "A written report summarizing the findings"),
} as const;

const EXTRA = {
  extraPage: (): PlaceholderExtra => ({
    id: "extra-page",
    label: L("Ek sayfa", "Additional page"),
    price: TRY(1500),
  }),
  multilang: (): PlaceholderExtra => ({
    id: "multilang",
    label: L("Çoklu dil desteği", "Multi-language support"),
    price: TRY(4900),
  }),
  copywriting: (): PlaceholderExtra => ({
    id: "copywriting",
    label: L("Profesyonel metin yazarlığı", "Professional copywriting"),
    price: TRY(3900),
  }),
  priorityDelivery: (): PlaceholderExtra => ({
    id: "priority-delivery",
    label: L("Öncelikli / hızlandırılmış teslim", "Priority / expedited delivery"),
    price: TRY(2900),
  }),
  monthlyMaintenance: (): PlaceholderExtra => ({
    id: "monthly-maintenance",
    label: L("Aylık bakım & destek paketi", "Monthly maintenance & support package"),
    price: TRY(1900),
  }),
  extraIntegration: (): PlaceholderExtra => ({
    id: "extra-integration",
    label: L("Ek sistem entegrasyonu", "Additional system integration"),
    price: TRY(6900),
  }),
} as const;

const CTA_QUOTE = L("Teklif Al", "Get a Quote");
const CTA_BOOK = L("Görüşme Planla", "Book a Call");

// ---------------------------------------------------------------------------
// WEB & COMMERCE
// ---------------------------------------------------------------------------

const webCommerce: Solution[] = [
  {
    id: "kurumsal-web-sitesi",
    slug: "kurumsal-web-sitesi",
    category: "web-commerce",
    title: L("Kurumsal Web Sitesi", "Corporate Website"),
    shortDescription: L(
      "Markanızı doğru yansıtan, hızlı ve yönetilebilir kurumsal web sitesi.",
      "A fast, manageable corporate website that represents your brand well."
    ),
    pricingType: "startingAt",
    price: TRY(24900),
    deliveryDays: 15,
    revisionCount: 2,
    featured: true,
    includedFeatures: [
      L("Özel tasarım, şablon değil", "Custom design, not a template"),
      L("5–8 sayfa arası kurumsal yapı", "Roughly 5–8 corporate pages"),
      L("Mobil ve masaüstü uyumlu arayüz", "Mobile and desktop responsive interface"),
      L("İletişim formu ve harita entegrasyonu", "Contact form and map integration"),
      L("Temel SEO altyapısı", "Basic SEO foundation"),
    ],
    optionalExtras: [EXTRA.extraPage(), EXTRA.multilang(), EXTRA.copywriting(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.brandAssets, REQ.pageContent, REQ.visuals, REQ.domainHosting],
    suitableFor: [
      L("Kurumsal kimliğini dijitalde güçlendirmek isteyen işletmeler", "Businesses that want to strengthen their brand online"),
      L("Halihazırda eski/şablon bir sitesi olanlar", "Companies replacing an old or template-based site"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("İhtiyaç ve marka yönünü netleştiriyoruz.", "We clarify your needs and brand direction.") },
      { title: L("Tasarım", "Design"), description: L("Sayfa taslaklarını ve görsel dili tasarlıyoruz.", "We design the page layouts and visual language.") },
      { title: L("Geliştirme", "Development"), description: L("Onaylanan tasarımı responsive olarak kodluyoruz.", "We build the approved design as a responsive site.") },
      { title: L("Yayın", "Launch"), description: L("Test edip yayına alıyoruz.", "We test it and take it live.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.basicSeoSetup, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Kaç sayfa dahil?", "How many pages are included?"),
        answer: L("Paket 5–8 sayfa arası bir kurumsal yapıyı kapsar; ek sayfalar seçilebilir bir ekstra.", "The package covers roughly 5–8 corporate pages; extra pages are a selectable add-on."),
      },
      {
        question: L("İçerik yazımı dahil mi?", "Is copywriting included?"),
        answer: L("Hayır, sayfa metinlerini siz sağlarsınız; profesyonel metin yazarlığı ekstra olarak eklenebilir.", "No, you supply the page copy; professional copywriting can be added as an extra."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "wordpress-web-sitesi",
    slug: "wordpress-web-sitesi",
    category: "web-commerce",
    title: L("WordPress Web Sitesi", "WordPress Website"),
    shortDescription: L(
      "İçeriğinizi kendiniz yönetebileceğiniz, WordPress tabanlı web sitesi.",
      "A WordPress-based website you can manage and update yourself."
    ),
    pricingType: "startingAt",
    price: TRY(17900),
    deliveryDays: 10,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("WordPress kurulumu ve tema özelleştirmesi", "WordPress setup and theme customization"),
      L("Kendi kendine içerik yönetimi", "Self-service content management"),
      L("Mobil uyumlu tasarım", "Mobile-responsive design"),
      L("Temel güvenlik ve yedekleme ayarları", "Basic security and backup configuration"),
    ],
    optionalExtras: [EXTRA.extraPage(), EXTRA.multilang(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.brandAssets, REQ.pageContent, REQ.domainHosting],
    suitableFor: [
      L("İçeriğini sık güncelleyecek küçük/orta işletmeler", "Small/mid businesses that will update content often"),
      L("Blog ile birlikte kurumsal varlık isteyenler", "Anyone who wants a corporate presence plus a blog"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Site yapısını ve tema yönünü belirliyoruz.", "We define the site structure and theme direction.") },
      { title: L("Kurulum", "Setup"), description: L("WordPress'i kurup temayı özelleştiriyoruz.", "We install WordPress and customize the theme.") },
      { title: L("İçerik", "Content"), description: L("Sağladığınız içerikleri sayfalara yerleştiriyoruz.", "We place your content into the pages.") },
      { title: L("Yayın", "Launch"), description: L("Test edip yayına alıyoruz.", "We test it and take it live.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.basicSeoSetup, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("WordPress kullanmayı bilmiyorum, sorun olur mu?", "I don't know WordPress — is that a problem?"),
        answer: L("Teslimde temel kullanım anlatımı yapılır; içerik güncellemesi kolay bir panel üzerinden yürür.", "We walk you through the basics at delivery; content updates happen through a simple panel."),
      },
      {
        question: L("Eklenti/tema lisansları dahil mi?", "Are plugin/theme licenses included?"),
        answer: L("Kapsam dahilindeki temel eklentiler dahildir; premium eklenti ihtiyaçları proje bazında ayrıca değerlendirilir.", "Core plugins within scope are included; premium plugin needs are assessed per project."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "e-ticaret-sitesi",
    slug: "e-ticaret-sitesi",
    category: "web-commerce",
    title: L("E-Ticaret Sitesi", "E-Commerce Website"),
    shortDescription: L(
      "Ürünlerinizi online satışa hazır hale getiren, ödeme ve kargo entegreli e-ticaret sitesi.",
      "An e-commerce site with payment and shipping integrations, ready to sell your products online."
    ),
    pricingType: "startingAt",
    price: TRY(44900),
    deliveryDays: 25,
    revisionCount: 2,
    featured: true,
    includedFeatures: [
      L("Ürün kataloğu ve kategori yönetimi", "Product catalog and category management"),
      L("Sepet ve ödeme akışı", "Cart and checkout flow"),
      L("Ödeme sağlayıcı entegrasyonu", "Payment provider integration"),
      L("Kargo/teslimat entegrasyonu", "Shipping/delivery integration"),
      L("Sipariş ve stok yönetim paneli", "Order and stock management panel"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.multilang(), EXTRA.priorityDelivery(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.brandAssets, REQ.productCatalog, REQ.visuals, REQ.paymentProvider],
    suitableFor: [
      L("Fiziksel ürünlerini online satmak isteyen işletmeler", "Businesses that want to sell physical products online"),
      L("Mevcut mağazasını dijitale taşıyanlar", "Companies moving an existing store online"),
    ],
    process: [
      { title: L("Keşif & Kapsam", "Discovery & Scope"), description: L("Ürün yapınızı ve ihtiyaç duyduğunuz entegrasyonları belirliyoruz.", "We map your product structure and the integrations you need.") },
      { title: L("Tasarım", "Design"), description: L("Mağaza deneyimini ve arayüzü tasarlıyoruz.", "We design the store experience and interface.") },
      { title: L("Geliştirme & Entegrasyon", "Development & Integration"), description: L("Ödeme, kargo ve stok akışlarını kuruyoruz.", "We build out payment, shipping, and stock flows.") },
      { title: L("Test & Yayın", "Testing & Launch"), description: L("Sipariş akışını uçtan uca test edip yayına alıyoruz.", "We test the order flow end to end and launch.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.basicSeoSetup, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Hangi ödeme sağlayıcılarıyla çalışılıyor?", "Which payment providers can this work with?"),
        answer: L("Türkiye'de yaygın kullanılan sağlayıcılarla entegrasyon mümkündür; tercih ettiğiniz sağlayıcıyı görüşmede paylaşabilirsiniz.", "Integration is possible with the commonly used providers in Turkey; you can share your preferred provider during the call."),
      },
      {
        question: L("Ürün sayısı fiyatı etkiler mi?", "Does the number of products affect the price?"),
        answer: L("Başlangıç fiyatı orta ölçekli bir katalog için geçerlidir; çok büyük kataloglar veya özel akışlar kapsam görüşmesiyle netleşir.", "The starting price assumes a mid-sized catalog; very large catalogs or custom flows are scoped in the discovery call."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "landing-page",
    slug: "landing-page",
    category: "web-commerce",
    title: L("Landing Page", "Landing Page"),
    shortDescription: L(
      "Tek bir kampanya, ürün veya hizmet için dönüşüm odaklı tek sayfa.",
      "A single, conversion-focused page for one campaign, product, or service."
    ),
    pricingType: "startingAt",
    price: TRY(9900),
    deliveryDays: 7,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Tek sayfa, dönüşüm odaklı yapı", "A single page, structured for conversion"),
      L("Form veya CTA entegrasyonu", "Form or CTA integration"),
      L("Mobil uyumlu tasarım", "Mobile-responsive design"),
      L("Temel analytics kurulumu", "Basic analytics setup"),
    ],
    optionalExtras: [EXTRA.copywriting(), EXTRA.priorityDelivery(), EXTRA.multilang()],
    requirementsFromCustomer: [REQ.brandAssets, REQ.pageContent, REQ.visuals],
    suitableFor: [
      L("Bir kampanya veya lansmanı hızlıca yayına almak isteyenler", "Anyone launching a campaign or product quickly"),
      L("Reklam trafiğini tek bir sayfaya yönlendirmek isteyenler", "Businesses sending ad traffic to a focused page"),
    ],
    process: [
      { title: L("Kapsam", "Scope"), description: L("Sayfanın amacını ve dönüşüm hedefini netleştiriyoruz.", "We clarify the page's goal and conversion target.") },
      { title: L("Tasarım & Geliştirme", "Design & Build"), description: L("Sayfayı tasarlayıp kodluyoruz.", "We design and build the page.") },
      { title: L("Yayın", "Launch"), description: L("Test edip yayına alıyoruz.", "We test it and launch.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Formdaki başvurular nereye düşer?", "Where do form submissions go?"),
        answer: L("E-posta veya WhatsApp'a yönlendirme gibi bir hedef birlikte belirlenir.", "We agree on a destination together, such as email or WhatsApp forwarding."),
      },
      {
        question: L("Reklam yönetimi de dahil mi?", "Does this include running the ads?"),
        answer: L("Hayır, bu paket sayfanın kendisini kapsar; reklam yönetimi kapsam dışıdır.", "No, this package covers the page itself; ad management is out of scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "ozel-web-uygulamasi",
    slug: "ozel-web-uygulamasi",
    category: "web-commerce",
    title: L("Özel Web Uygulaması", "Custom Web Application"),
    shortDescription: L(
      "Standart bir şablona sığmayan, ihtiyacınıza özel geliştirilen web uygulaması.",
      "A custom-built web application for needs that don't fit a standard template."
    ),
    pricingType: "quote",
    price: null,
    deliveryDays: null,
    revisionCount: null,
    featured: false,
    includedFeatures: [
      L("İhtiyaca özel mimari ve teknoloji seçimi", "Architecture and technology chosen for your needs"),
      L("Özel iş mantığı ve akışlar", "Custom business logic and flows"),
      L("Gerekli üçüncü parti entegrasyonlar", "Any required third-party integrations"),
      L("Kullanıcı yönetimi ve yetkilendirme", "User management and permissions"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.pageContent, REQ.existingAccess],
    suitableFor: [
      L("Standart paketlerin karşılamadığı özel süreçleri olan işletmeler", "Businesses with custom processes standard packages don't cover"),
      L("Kendi iç sistemini dijitalleştirmek isteyenler", "Companies digitizing an internal system"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("İşletmenizi ve problemi anlıyoruz.", "We understand your business and the problem.") },
      { title: L("Kapsam", "Scope"), description: L("Kapsamı ve sınırları netleştiriyoruz.", "We define the scope and boundaries.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi aşamalı olarak geliştiriyoruz.", "We build the system in stages.") },
      { title: L("Yayın & Destek", "Launch & Support"), description: L("Yayına alıp geliştirmeye devam ediyoruz.", "We launch it and keep improving it.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Fiyat neden belirtilmemiş?", "Why isn't a price listed?"),
        answer: L("Kapsam projeden projeye çok değiştiği için fiyat, keşif görüşmesi sonrası netleşir.", "Scope varies a lot from project to project, so pricing is set after the discovery call."),
      },
      {
        question: L("Süreç ne kadar sürer?", "How long does this take?"),
        answer: L("Süre kapsam netleştikten sonra birlikte planlanır.", "Timeline is planned together once the scope is clear."),
      },
    ],
    ctaLabel: CTA_BOOK,
    isPlaceholder: true,
  },
];

// ---------------------------------------------------------------------------
// SEO & GEO
// ---------------------------------------------------------------------------

const seoGeo: Solution[] = [
  {
    id: "turkce-forumlarda-marka-tanitimi",
    slug: "turkce-forumlarda-marka-tanitimi",
    category: "seo-geo",
    title: L("Türkçe Forumlarda Marka Tanıtımı", "Turkish Forum Brand Outreach"),
    shortDescription: L(
      "Markanızın Türkçe forum ve topluluk platformlarında organik biçimde görünür olmasını sağlıyoruz.",
      "We make your brand organically visible across Turkish forums and community platforms."
    ),
    pricingType: "startingAt",
    price: TRY(6900),
    deliveryDays: 5,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("Uygun forum/platform tespiti", "Identifying the right forums/platforms"),
      L("Organik ton ile içerik ve yanıt planı", "A content and reply plan in an organic tone"),
      L("Aylık paylaşım/etkileşim takvimi", "A monthly posting/engagement calendar"),
      L("Basit performans özeti", "A simple performance summary"),
    ],
    optionalExtras: [EXTRA.copywriting(), EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.productCatalog],
    suitableFor: [
      L("Marka bilinirliğini organik yollarla artırmak isteyenler", "Businesses that want to build awareness organically"),
      L("Niş bir topluluğa hitap eden markalar", "Brands that speak to a specific niche community"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Marka tonunu ve hedef platformları belirliyoruz.", "We define the brand tone and target platforms.") },
      { title: L("Plan", "Plan"), description: L("Aylık içerik/etkileşim planını hazırlıyoruz.", "We prepare the monthly content/engagement plan.") },
      { title: L("Yürütme", "Execution"), description: L("Planı organik biçimde uyguluyoruz.", "We carry out the plan organically.") },
      { title: L("Raporlama", "Reporting"), description: L("Sonuçları özetleyip paylaşıyoruz.", "We summarize and share the results.") },
    ],
    deliverables: [DELIV.writtenReport],
    faq: [
      {
        question: L("Bu hizmet aylık mı tek seferlik mi?", "Is this a one-time or ongoing service?"),
        answer: L("Gösterilen fiyat aylık bir başlangıç kapsamı için geçerlidir; devam süresi birlikte planlanır.", "The price shown is for a monthly starting scope; ongoing duration is planned together."),
      },
      {
        question: L("Hangi forumlar kullanılıyor?", "Which forums are used?"),
        answer: L("Sektörünüze ve hedef kitlenize uygun platformlar keşif aşamasında belirlenir.", "The platforms are chosen in the discovery phase based on your sector and audience."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "organik-seo",
    slug: "organik-seo",
    category: "seo-geo",
    title: L("Organik SEO", "Organic SEO"),
    shortDescription: L(
      "Arama motorlarında organik sıralamanızı iyileştiren, kapsamı ihtiyacınıza göre büyüyen SEO paketi.",
      "An SEO package that improves your organic search rankings, scaled to your needs."
    ),
    pricingType: "startingAt",
    price: TRY(5900),
    deliveryDays: 5,
    revisionCount: 1,
    featured: true,
    includedFeatures: [
      L("Anahtar kelime araştırması", "Keyword research"),
      L("Sayfa içi (on-page) SEO iyileştirmeleri", "On-page SEO improvements"),
      L("Teknik SEO temel kontrolleri", "Basic technical SEO checks"),
      L("Aylık ilerleme özeti", "A monthly progress summary"),
    ],
    optionalExtras: [EXTRA.copywriting(), EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.domainHosting, REQ.businessInfo],
    suitableFor: [
      L("Organik trafiğini büyütmek isteyen her işletme", "Any business that wants to grow organic traffic"),
      L("Google'da rakiplerinin gerisinde kalanlar", "Businesses falling behind competitors on Google"),
    ],
    process: [
      { title: L("Denetim", "Audit"), description: L("Mevcut durumu ve fırsatları tespit ediyoruz.", "We assess the current state and opportunities.") },
      { title: L("Plan", "Plan"), description: L("Anahtar kelime ve içerik planını çıkarıyoruz.", "We build the keyword and content plan.") },
      { title: L("Uygulama", "Implementation"), description: L("On-page ve teknik iyileştirmeleri uyguluyoruz.", "We apply on-page and technical improvements.") },
      { title: L("Takip", "Tracking"), description: L("Sıralama ve trafiği aylık takip ediyoruz.", "We track rankings and traffic monthly.") },
    ],
    deliverables: [DELIV.writtenReport, DELIV.basicSeoSetup],
    faq: [
      {
        question: L("Sonuçları ne zaman görürüm?", "When will I see results?"),
        answer: L("SEO doğası gereği kademeli ilerler; ilk gözle görülür etkiler genellikle birkaç ay içinde oluşur.", "SEO is inherently gradual; the first visible effects usually build up over a few months."),
      },
      {
        question: L("Hangi paket bana uygun?", "Which tier is right for me?"),
        answer: L("Temel, Standart ve Pro seçenekleri arasındaki fark kapsam ve içerik hacmidir; karşılaştırmayı aşağıda bulabilirsiniz.", "The difference between Temel, Standart, and Pro is scope and content volume — see the comparison below."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    tiers: [
      {
        id: "temel",
        name: L("Temel", "Basic"),
        shortDescription: L("Küçük siteler için giriş seviyesi SEO takibi.", "Entry-level SEO for smaller sites."),
        pricingType: "startingAt",
        price: TRY(5900),
        deliveryDays: 5,
        revisionCount: 1,
        includedFeatures: [
          L("Anahtar kelime araştırması (temel)", "Keyword research (basic)"),
          L("On-page SEO — ana sayfalar", "On-page SEO — core pages"),
          L("Aylık özet rapor", "Monthly summary report"),
        ],
      },
      {
        id: "standart",
        name: L("Standart", "Standard"),
        shortDescription: L("Büyüyen içerik hacmi olan siteler için.", "For sites with a growing content footprint."),
        pricingType: "startingAt",
        price: TRY(11900),
        deliveryDays: 7,
        revisionCount: 2,
        includedFeatures: [
          L("Anahtar kelime araştırması (genişletilmiş)", "Keyword research (expanded)"),
          L("On-page SEO — tüm sayfalar", "On-page SEO — all pages"),
          L("Teknik SEO denetimi", "Technical SEO audit"),
          L("Aylık detaylı rapor", "Monthly detailed report"),
        ],
      },
      {
        id: "pro",
        name: L("Pro", "Pro"),
        shortDescription: L("Rekabetin yoğun olduğu sektörler için genişletilmiş kapsam.", "Expanded scope for highly competitive sectors."),
        pricingType: "startingAt",
        price: TRY(19900),
        deliveryDays: 10,
        revisionCount: 3,
        includedFeatures: [
          L("Anahtar kelime ve rakip analizi", "Keyword and competitor analysis"),
          L("Kapsamlı on-page + teknik SEO", "Comprehensive on-page + technical SEO"),
          L("İçerik önerileri ve takvimi", "Content recommendations and calendar"),
          L("Aylık detaylı rapor + görüşme", "Monthly detailed report + review call"),
        ],
      },
    ],
    isPlaceholder: true,
  },
  {
    id: "teknik-seo-denetimi",
    slug: "teknik-seo-denetimi",
    category: "seo-geo",
    title: L("Teknik SEO Denetimi", "Technical SEO Audit"),
    shortDescription: L(
      "Sitenizin teknik SEO sağlığını ortaya koyan, önceliklendirilmiş bulgu raporu.",
      "A prioritized findings report covering your site's technical SEO health."
    ),
    pricingType: "fixed",
    price: TRY(7900),
    deliveryDays: 5,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("Site hızı ve Core Web Vitals kontrolü", "Site speed and Core Web Vitals check"),
      L("Crawl/indexleme sorunları taraması", "Crawl/indexing issue scan"),
      L("Mobil uyumluluk kontrolü", "Mobile-friendliness check"),
      L("Önceliklendirilmiş aksiyon listesi", "A prioritized action list"),
    ],
    optionalExtras: [EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.domainHosting, REQ.existingAccess],
    suitableFor: [
      L("SEO sorununun kaynağını netleştirmek isteyenler", "Anyone who wants to pinpoint the source of an SEO problem"),
      L("Yeni bir siteye geçmeden önce sağlık kontrolü isteyenler", "Businesses wanting a health check before a site migration"),
    ],
    process: [
      { title: L("Tarama", "Scan"), description: L("Siteyi teknik olarak tarıyoruz.", "We run a technical scan of the site.") },
      { title: L("Analiz", "Analysis"), description: L("Bulguları önceliklendiriyoruz.", "We prioritize the findings.") },
      { title: L("Rapor", "Report"), description: L("Bulguları ve önerileri raporluyoruz.", "We report the findings and recommendations.") },
    ],
    deliverables: [DELIV.writtenReport],
    faq: [
      {
        question: L("Bulunan sorunları siz mi düzeltiyorsunuz?", "Do you fix the issues you find?"),
        answer: L("Bu paket denetim ve raporu kapsar; düzeltme çalışması ayrı bir kapsam olarak teklif edilir.", "This package covers the audit and report; fixes are quoted as a separate scope."),
      },
      {
        question: L("Rapor ne kadar teknik?", "How technical is the report?"),
        answer: L("Hem teknik ekiplerin hem de teknik olmayan karar vericilerin anlayabileceği şekilde hazırlanır.", "It's written so both technical teams and non-technical decision-makers can follow it."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "google-business-profile-lokal-seo",
    slug: "google-business-profile-lokal-seo",
    category: "seo-geo",
    title: L("Google Business Profile & Lokal SEO", "Google Business Profile & Local SEO"),
    shortDescription: L(
      "Yerel aramalarda ve Google Haritalar'da bulunabilirliğinizi artırıyoruz.",
      "We improve how findable you are in local search and Google Maps."
    ),
    pricingType: "startingAt",
    price: TRY(4900),
    deliveryDays: 5,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("Google Business Profile kurulumu/optimizasyonu", "Google Business Profile setup/optimization"),
      L("Kategori ve bilgi optimizasyonu", "Category and business info optimization"),
      L("Yerel anahtar kelime uyumu", "Local keyword alignment"),
      L("Temel yorum yönetimi rehberi", "A basic review-management guide"),
    ],
    optionalExtras: [EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.socialAccess],
    suitableFor: [
      L("Fiziksel mekanı olan işletmeler", "Businesses with a physical location"),
      L("'Yakınımda' aramalarında görünmek isteyenler", "Businesses that want to appear in \"near me\" searches"),
    ],
    process: [
      { title: L("Kurulum", "Setup"), description: L("Profili kurup/optimize ediyoruz.", "We set up or optimize the profile.") },
      { title: L("Optimizasyon", "Optimization"), description: L("Kategori, açıklama ve bilgileri optimize ediyoruz.", "We optimize the category, description, and info.") },
      { title: L("Takip", "Follow-up"), description: L("İlk sonuçları birlikte gözden geçiriyoruz.", "We review the initial results together.") },
    ],
    deliverables: [DELIV.writtenReport],
    faq: [
      {
        question: L("Birden fazla şubem var, kapsar mı?", "I have multiple locations — is that covered?"),
        answer: L("Başlangıç fiyatı tek konum içindir; çoklu şube kapsamı ayrıca değerlendirilir.", "The starting price covers a single location; multi-location scope is assessed separately."),
      },
      {
        question: L("Yorumları siz mi yanıtlıyorsunuz?", "Do you respond to reviews for us?"),
        answer: L("Bu paket kurulum ve optimizasyonu kapsar; devam eden yorum yönetimi ayrı bir kapsam olabilir.", "This package covers setup and optimization; ongoing review management can be a separate scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "geo-ai-arama-optimizasyonu",
    slug: "geo-ai-arama-optimizasyonu",
    category: "seo-geo",
    title: L("GEO / AI Search Optimization", "GEO / AI Search Optimization"),
    shortDescription: L(
      "İçeriğinizin yapay zekâ destekli arama ve cevap sistemleri tarafından doğru anlaşılmasını sağlıyoruz.",
      "We help AI-powered search and answer systems understand your content accurately."
    ),
    pricingType: "startingAt",
    price: TRY(8900),
    deliveryDays: 7,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("İçerik yapısı ve netlik denetimi", "Content structure and clarity review"),
      L("Yapılandırılmış veri (schema) önerileri", "Structured data (schema) recommendations"),
      L("Soru-cevap odaklı içerik önerileri", "Q&A-oriented content recommendations"),
      L("Uygulama önceliklendirme listesi", "A prioritized implementation list"),
    ],
    optionalExtras: [EXTRA.copywriting()],
    requirementsFromCustomer: [REQ.domainHosting, REQ.pageContent],
    suitableFor: [
      L("AI arama sonuçlarında görünmek isteyen markalar", "Brands that want visibility in AI search results"),
      L("İçerik ağırlıklı web siteleri", "Content-heavy websites"),
    ],
    process: [
      { title: L("Denetim", "Audit"), description: L("Mevcut içerik yapısını değerlendiriyoruz.", "We assess the current content structure.") },
      { title: L("Öneri", "Recommendations"), description: L("Yapılandırılmış veri ve içerik önerilerini hazırlıyoruz.", "We prepare structured data and content recommendations.") },
      { title: L("Uygulama Desteği", "Implementation Support"), description: L("Uygulamayı birlikte önceliklendiriyoruz.", "We prioritize implementation together.") },
    ],
    deliverables: [DELIV.writtenReport],
    faq: [
      {
        question: L("GEO, SEO'nun yerini mi alıyor?", "Does GEO replace SEO?"),
        answer: L("Hayır, geleneksel SEO'yu tamamlayan ayrı bir görünürlük katmanıdır.", "No, it's a separate visibility layer that complements traditional SEO."),
      },
      {
        question: L("Sonuçlar ölçülebilir mi?", "Can results be measured?"),
        answer: L("Bu alan hâlâ olgunlaşıyor; ölçüm yöntemleri projeye göre birlikte belirlenir.", "This space is still maturing; measurement approaches are agreed on a per-project basis."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "analytics-conversion-tracking",
    slug: "analytics-conversion-tracking",
    category: "seo-geo",
    title: L("Analytics & Conversion Tracking", "Analytics & Conversion Tracking"),
    shortDescription: L(
      "Ziyaretçi davranışını ve dönüşümlerinizi doğru şekilde ölçen analitik kurulumu.",
      "An analytics setup that accurately measures visitor behavior and your conversions."
    ),
    pricingType: "fixed",
    price: TRY(5900),
    deliveryDays: 5,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("Analytics kurulumu", "Analytics setup"),
      L("Dönüşüm/hedef takibi kurulumu", "Conversion/goal tracking setup"),
      L("Etiket yönetimi (tag manager) kurulumu", "Tag manager setup"),
      L("Temel gösterge paneli", "A basic reporting dashboard"),
    ],
    optionalExtras: [EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.domainHosting, REQ.socialAccess],
    suitableFor: [
      L("Reklam veya SEO yatırımının etkisini ölçmek isteyenler", "Anyone measuring the impact of ad or SEO spend"),
      L("Veriye dayalı karar almak isteyen işletmeler", "Businesses that want to make data-driven decisions"),
    ],
    process: [
      { title: L("Kurulum", "Setup"), description: L("Analytics ve etiket yöneticisini kuruyoruz.", "We set up analytics and the tag manager.") },
      { title: L("Hedef Tanımı", "Goal Definition"), description: L("Sizin için önemli dönüşümleri tanımlıyoruz.", "We define the conversions that matter to you.") },
      { title: L("Doğrulama", "Verification"), description: L("Takibin doğru çalıştığını test ediyoruz.", "We test that tracking works correctly.") },
    ],
    deliverables: [DELIV.writtenReport],
    faq: [
      {
        question: L("Hangi analytics aracı kullanılıyor?", "Which analytics tool is used?"),
        answer: L("Genellikle yaygın kullanılan ücretsiz araçlarla kurulum yapılır; tercihiniz varsa görüşmede paylaşabilirsiniz.", "Setup is usually done with commonly used free tools; share your preference in the call if you have one."),
      },
      {
        question: L("Mevcut kurulumu devralabilir misiniz?", "Can you take over an existing setup?"),
        answer: L("Evet, mevcut kurulumu denetleyip gerekli düzeltmeleri kapsam dahilinde yapabiliriz.", "Yes, we can review the existing setup and make the necessary fixes within scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
];

// ---------------------------------------------------------------------------
// BUSINESS SYSTEMS
// ---------------------------------------------------------------------------

const businessSystems: Solution[] = [
  {
    id: "online-randevu-sistemi",
    slug: "online-randevu-sistemi",
    category: "business-systems",
    title: L("Online Randevu Sistemi", "Online Appointment System"),
    shortDescription: L(
      "Müşterilerinizin uygun saatleri görüp online randevu alabildiği sistem.",
      "A system where customers can see available times and book appointments online."
    ),
    pricingType: "startingAt",
    price: TRY(29900),
    deliveryDays: 20,
    revisionCount: 2,
    featured: true,
    includedFeatures: [
      L("Online randevu alma ekranı", "Online booking screen"),
      L("Çalışma saatleri ve müsaitlik yönetimi", "Working hours and availability management"),
      L("Randevu hatırlatma bildirimleri", "Appointment reminder notifications"),
      L("Personel/hizmet bazlı planlama", "Staff/service-based scheduling"),
      L("Yönetim paneli", "Admin panel"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.staffList, REQ.brandAssets],
    suitableFor: [
      L("Randevu ile çalışan hizmet işletmeleri", "Appointment-based service businesses"),
      L("Telefonla randevu yükünü azaltmak isteyenler", "Businesses wanting to reduce phone-booking load"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Randevu akışınızı ve kurallarınızı anlıyoruz.", "We understand your booking flow and rules.") },
      { title: L("Kapsam", "Scope"), description: L("Personel/hizmet yapısını netleştiriyoruz.", "We define the staff/service structure.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi geliştirip test ediyoruz.", "We build and test the system.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp panel kullanımını anlatıyoruz.", "We launch it and walk you through the panel.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Birden fazla personel/şube destekleniyor mu?", "Does it support multiple staff/locations?"),
        answer: L("Evet, kapsam görüşmesinde personel ve şube sayısına göre netleştirilir.", "Yes, this is scoped based on your number of staff and locations during the discovery call."),
      },
      {
        question: L("Hatırlatmalar SMS mi, WhatsApp mı?", "Are reminders sent by SMS or WhatsApp?"),
        answer: L("Kanal tercihiniz kapsam görüşmesinde belirlenir; WhatsApp entegrasyonu ayrı bir paket olarak da eklenebilir.", "Your preferred channel is agreed during scoping; WhatsApp integration can also be added as a separate package."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "rezervasyon-sistemi",
    slug: "rezervasyon-sistemi",
    category: "business-systems",
    title: L("Rezervasyon Sistemi", "Reservation System"),
    shortDescription: L(
      "Masa, oda veya kapasite bazlı rezervasyonları online yönetmenizi sağlayan sistem.",
      "A system for managing table-, room-, or capacity-based reservations online."
    ),
    pricingType: "startingAt",
    price: TRY(34900),
    deliveryDays: 22,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Online rezervasyon ekranı", "Online reservation screen"),
      L("Kapasite/müsaitlik yönetimi", "Capacity/availability management"),
      L("Rezervasyon onay/iptal akışı", "Reservation confirmation/cancellation flow"),
      L("Yönetim paneli", "Admin panel"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.brandAssets],
    suitableFor: [
      L("Restoran, otel ve etkinlik mekânları", "Restaurants, hotels, and event venues"),
      L("Kapasite yönetimi kritik olan işletmeler", "Businesses where capacity management is critical"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Rezervasyon kurallarınızı ve kapasitenizi anlıyoruz.", "We understand your reservation rules and capacity.") },
      { title: L("Kapsam", "Scope"), description: L("Akışı ve istisnaları netleştiriyoruz.", "We define the flow and edge cases.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi geliştirip test ediyoruz.", "We build and test the system.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp kullanımını anlatıyoruz.", "We launch it and walk you through usage.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Fazla rezervasyon (overbooking) önleniyor mu?", "Does it prevent overbooking?"),
        answer: L("Evet, kapasite kuralları sistemde tanımlanarak fazla rezervasyon engellenir.", "Yes, capacity rules are configured in the system to prevent overbooking."),
      },
      {
        question: L("Ödeme/depozito alınabiliyor mu?", "Can it collect payment/deposits?"),
        answer: L("Ödeme entegrasyonu ayrı bir kapsam olarak eklenebilir.", "Payment integration can be added as a separate scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "musteri-yonetim-sistemi",
    slug: "musteri-yonetim-sistemi",
    category: "business-systems",
    title: L("Müşteri Yönetim Sistemi", "Customer Management System"),
    shortDescription: L(
      "Müşteri kayıtlarınızı, iletişim geçmişinizi ve satış sürecinizi tek yerde topladığınız sistem.",
      "A system that brings your customer records, contact history, and sales process into one place."
    ),
    pricingType: "startingAt",
    price: TRY(44900),
    deliveryDays: 25,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Müşteri kayıt ve segmentasyon", "Customer records and segmentation"),
      L("İletişim geçmişi takibi", "Contact history tracking"),
      L("Satış/süreç aşamaları (pipeline)", "Sales/process pipeline stages"),
      L("Kullanıcı rolleri ve yetkilendirme", "User roles and permissions"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.existingAccess],
    suitableFor: [
      L("Satış ekibi olan işletmeler", "Businesses with a sales team"),
      L("Müşteri verisini dağınık tablolardan toplamak isteyenler", "Companies consolidating customer data out of scattered spreadsheets"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Satış/süreç akışınızı anlıyoruz.", "We understand your sales/process flow.") },
      { title: L("Kapsam", "Scope"), description: L("Alanları ve rolleri netleştiriyoruz.", "We define the fields and roles.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi geliştirip test ediyoruz.", "We build and test the system.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp ekibinize kullanımını anlatıyoruz.", "We launch it and train your team on it.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Mevcut Excel verimi aktarabilir misiniz?", "Can you migrate my existing spreadsheet data?"),
        answer: L("Evet, veri aktarımı kapsam görüşmesinde planlanır.", "Yes, data migration is planned during the scoping call."),
      },
      {
        question: L("Kaç kullanıcı dahil?", "How many users are included?"),
        answer: L("Başlangıç kapsamı küçük bir ekip içindir; kullanıcı sayısı ihtiyaca göre birlikte netleştirilir.", "The starting scope covers a small team; user count is finalized together based on your needs."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "admin-panel-dashboard",
    slug: "admin-panel-dashboard",
    category: "business-systems",
    title: L("Admin Panel / Dashboard", "Admin Panel / Dashboard"),
    shortDescription: L(
      "Verilerinizi ve işletme süreçlerinizi tek ekrandan yönetmenizi sağlayan özel panel.",
      "A custom panel that lets you manage your data and business processes from one screen."
    ),
    pricingType: "startingAt",
    price: TRY(24900),
    deliveryDays: 18,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Veri listeleme, filtreleme ve arama", "Data listing, filtering, and search"),
      L("Özet gösterge (dashboard) ekranları", "Summary dashboard screens"),
      L("Kullanıcı rolleri ve yetkilendirme", "User roles and permissions"),
      L("Temel raporlama görünümleri", "Basic reporting views"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.existingAccess, REQ.businessInfo],
    suitableFor: [
      L("Verisini şu an dağınık şekilde yöneten işletmeler", "Businesses currently managing data in a scattered way"),
      L("İç ekipler için özel bir yönetim aracı isteyenler", "Teams that want a custom internal management tool"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Yönetilecek veriyi ve süreçleri anlıyoruz.", "We understand the data and processes to manage.") },
      { title: L("Kapsam", "Scope"), description: L("Ekranları ve rolleri netleştiriyoruz.", "We define the screens and roles.") },
      { title: L("Geliştirme", "Development"), description: L("Paneli geliştirip test ediyoruz.", "We build and test the panel.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp kullanımını anlatıyoruz.", "We launch it and walk you through usage.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Mevcut veritabanımıza bağlanabilir mi?", "Can it connect to our existing database?"),
        answer: L("Genellikle evet; erişim ve yapı kapsam görüşmesinde değerlendirilir.", "Usually yes; access and structure are assessed during the scoping call."),
      },
      {
        question: L("Mobil uygulama olarak da kullanılabilir mi?", "Can this be used as a mobile app too?"),
        answer: L("Panel responsive olarak mobil tarayıcıdan kullanılabilir; ayrı bir mobil uygulama kapsam dışıdır.", "The panel is responsive and usable from a mobile browser; a separate native mobile app is out of scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "ozel-is-sistemi",
    slug: "ozel-is-sistemi",
    category: "business-systems",
    title: L("Özel İş Sistemi", "Custom Business System"),
    shortDescription: L(
      "İşletmenize özgü süreçleri uçtan uca dijitalleştiren, tamamen özel geliştirilen sistem.",
      "A fully custom-built system that digitizes your business's own processes end to end."
    ),
    pricingType: "quote",
    price: null,
    deliveryDays: null,
    revisionCount: null,
    featured: false,
    includedFeatures: [
      L("Uçtan uca süreç analizi ve tasarımı", "End-to-end process analysis and design"),
      L("Özel iş mantığı ve otomasyonlar", "Custom business logic and automations"),
      L("Gerekli sistem entegrasyonları", "Required system integrations"),
      L("Rol bazlı erişim ve raporlama", "Role-based access and reporting"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.existingAccess],
    suitableFor: [
      L("Kendine özgü, karmaşık iş süreçleri olan işletmeler", "Businesses with their own complex processes"),
      L("Birden fazla sistemi tek yapıda birleştirmek isteyenler", "Companies wanting to unify multiple systems into one"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Süreçlerinizi ve problemi derinlemesine anlıyoruz.", "We deeply understand your processes and the problem.") },
      { title: L("Kapsam", "Scope"), description: L("Kapsamı ve fazları birlikte planlıyoruz.", "We plan the scope and phases together.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi aşamalı olarak geliştiriyoruz.", "We build the system in stages.") },
      { title: L("Yayın & Destek", "Launch & Support"), description: L("Yayına alıp geliştirmeye devam ediyoruz.", "We launch it and keep improving it.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Ne kadar sürede tamamlanır?", "How long does it take?"),
        answer: L("Süre kapsam netleştikten sonra fazlar halinde planlanır.", "Timeline is planned in phases once the scope is clear."),
      },
      {
        question: L("Aşamalı olarak mı, tek seferde mi teslim edilir?", "Is it delivered in phases or all at once?"),
        answer: L("Genellikle önceliklendirilmiş fazlar halinde ilerlenir, böylece erken değer elde edersiniz.", "We usually proceed in prioritized phases so you get value early."),
      },
    ],
    ctaLabel: CTA_BOOK,
    isPlaceholder: true,
  },
];

// ---------------------------------------------------------------------------
// AUTOMATION & INTEGRATIONS
// ---------------------------------------------------------------------------

const automationIntegrations: Solution[] = [
  {
    id: "whatsapp-business-entegrasyonu",
    slug: "whatsapp-business-entegrasyonu",
    category: "automation-integrations",
    title: L("WhatsApp Business Entegrasyonu", "WhatsApp Business Integration"),
    shortDescription: L(
      "Sipariş, randevu veya destek bildirimlerinizi WhatsApp üzerinden otomatikleştiriyoruz.",
      "We automate your order, appointment, or support notifications through WhatsApp."
    ),
    pricingType: "startingAt",
    price: TRY(9900),
    deliveryDays: 7,
    revisionCount: 1,
    featured: true,
    includedFeatures: [
      L("WhatsApp Business API bağlantısı", "WhatsApp Business API connection"),
      L("Otomatik bildirim şablonları", "Automated notification templates"),
      L("Sipariş/randevu durumuna göre tetikleme", "Triggers based on order/appointment status"),
      L("Temel raporlama", "Basic reporting"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.existingAccess, REQ.businessInfo],
    suitableFor: [
      L("Müşteri iletişimini WhatsApp üzerinden yürütenler", "Businesses that communicate with customers via WhatsApp"),
      L("Manuel bildirim gönderimini azaltmak isteyenler", "Anyone reducing manual notification work"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Bildirim ihtiyacınızı ve akışınızı anlıyoruz.", "We understand your notification needs and flow.") },
      { title: L("Bağlantı", "Connection"), description: L("WhatsApp Business API bağlantısını kuruyoruz.", "We set up the WhatsApp Business API connection.") },
      { title: L("Otomasyon", "Automation"), description: L("Tetikleyicileri ve şablonları yapılandırıyoruz.", "We configure the triggers and templates.") },
      { title: L("Test & Yayın", "Testing & Launch"), description: L("Uçtan uca test edip yayına alıyoruz.", "We test end to end and go live.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Kendi WhatsApp numaramı kullanabilir miyim?", "Can I use my own WhatsApp number?"),
        answer: L("Evet, mevcut numaranız WhatsApp Business API'ye uygun şekilde bağlanabilir.", "Yes, your existing number can be connected via the WhatsApp Business API."),
      },
      {
        question: L("Hangi sistemlerle entegre olur?", "Which systems can this integrate with?"),
        answer: L("Web siteniz, randevu/rezervasyon sisteminiz veya e-ticaret altyapınızla entegre edilebilir.", "It can integrate with your website, appointment/reservation system, or e-commerce setup."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "odeme-kargo-entegrasyonu",
    slug: "odeme-kargo-entegrasyonu",
    category: "automation-integrations",
    title: L("Ödeme & Kargo Entegrasyonu", "Payment & Shipping Integration"),
    shortDescription: L(
      "Mevcut sitenize veya sisteminize ödeme ve kargo sağlayıcı bağlantısı kuruyoruz.",
      "We connect a payment and shipping provider to your existing site or system."
    ),
    pricingType: "startingAt",
    price: TRY(12900),
    deliveryDays: 10,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("Ödeme sağlayıcı entegrasyonu", "Payment provider integration"),
      L("Kargo/teslimat sağlayıcı entegrasyonu", "Shipping/delivery provider integration"),
      L("Sipariş durumu senkronizasyonu", "Order status synchronization"),
      L("Test ödemesi ve doğrulama", "Test payment and verification"),
    ],
    optionalExtras: [EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.paymentProvider, REQ.existingAccess],
    suitableFor: [
      L("Mevcut sitesine ödeme/kargo eklemek isteyenler", "Businesses adding payment/shipping to an existing site"),
      L("Sağlayıcı değiştirmek isteyenler", "Anyone switching providers"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Mevcut sistemi ve sağlayıcı tercihinizi anlıyoruz.", "We understand your existing system and provider preference.") },
      { title: L("Entegrasyon", "Integration"), description: L("Ödeme/kargo bağlantısını kuruyoruz.", "We set up the payment/shipping connection.") },
      { title: L("Test", "Testing"), description: L("Test işlemleriyle doğruluyoruz.", "We verify it with test transactions.") },
      { title: L("Yayın", "Launch"), description: L("Canlıya alıyoruz.", "We take it live.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Hangi sağlayıcılarla çalışıyorsunuz?", "Which providers do you work with?"),
        answer: L("Türkiye'de yaygın kullanılan sağlayıcılarla entegrasyon mümkündür.", "Integration is possible with the commonly used providers in Turkey."),
      },
      {
        question: L("Sitem farklı bir teknolojide, sorun olur mu?", "My site uses a different tech stack — is that a problem?"),
        answer: L("Çoğu durumda hayır; uyumluluk kapsam görüşmesinde kontrol edilir.", "In most cases no; compatibility is checked during the scoping call."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "api-webhook-otomasyonu",
    slug: "api-webhook-otomasyonu",
    category: "automation-integrations",
    title: L("API / Webhook Otomasyonu", "API / Webhook Automation"),
    shortDescription: L(
      "Farklı sistemler arasında veri akışını otomatikleştiren API ve webhook bağlantıları kuruyoruz.",
      "We build API and webhook connections that automate data flow between different systems."
    ),
    pricingType: "startingAt",
    price: TRY(14900),
    deliveryDays: 10,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("İhtiyaç analizine göre akış tasarımı", "Flow design based on your needs analysis"),
      L("API bağlantısı ve veri eşleme", "API connection and data mapping"),
      L("Webhook tetikleyicileri", "Webhook triggers"),
      L("Hata yönetimi ve loglama", "Error handling and logging"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.existingAccess],
    suitableFor: [
      L("Birden fazla aracı birbirine bağlamak isteyenler", "Businesses connecting multiple tools together"),
      L("Tekrarlayan manuel işleri otomatikleştirmek isteyenler", "Anyone automating repetitive manual work"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Bağlanacak sistemleri ve veri akışını anlıyoruz.", "We understand the systems and data flow involved.") },
      { title: L("Tasarım", "Design"), description: L("Akışı ve veri eşlemesini tasarlıyoruz.", "We design the flow and data mapping.") },
      { title: L("Geliştirme", "Development"), description: L("Bağlantıyı kurup test ediyoruz.", "We build and test the connection.") },
      { title: L("Yayın", "Launch"), description: L("Canlıya alıp izliyoruz.", "We launch it and monitor it.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Hangi sistemler bağlanabilir?", "Which systems can be connected?"),
        answer: L("Açık bir API'ye veya webhook desteğine sahip çoğu sistem bağlanabilir.", "Most systems with an open API or webhook support can be connected."),
      },
      {
        question: L("Hata durumunda ne olur?", "What happens if something fails?"),
        answer: L("Hata yönetimi ve temel bildirim mekanizması kapsam dahilindedir.", "Error handling and a basic notification mechanism are included in scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "crm-entegrasyonu",
    slug: "crm-entegrasyonu",
    category: "automation-integrations",
    title: L("CRM Entegrasyonu", "CRM Integration"),
    shortDescription: L(
      "Web siteniz veya sisteminizden gelen talepleri kullandığınız CRM'e otomatik aktarıyoruz.",
      "We automatically push leads from your website or system into the CRM you already use."
    ),
    pricingType: "startingAt",
    price: TRY(12900),
    deliveryDays: 10,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("CRM bağlantısı ve alan eşleme", "CRM connection and field mapping"),
      L("Form/talep verisinin otomatik aktarımı", "Automatic transfer of form/lead data"),
      L("Temel doğrulama ve hata bildirimi", "Basic validation and error notification"),
      L("Test ve doğrulama", "Testing and verification"),
    ],
    optionalExtras: [EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.existingAccess],
    suitableFor: [
      L("Bir CRM kullanan ve talepleri otomatikleştirmek isteyen işletmeler", "Businesses using a CRM that want to automate lead entry"),
      L("Manuel veri girişini azaltmak isteyenler", "Anyone reducing manual data entry"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Kullandığınız CRM'i ve veri akışını anlıyoruz.", "We understand your CRM and data flow.") },
      { title: L("Eşleme", "Mapping"), description: L("Alan eşlemesini tasarlıyoruz.", "We design the field mapping.") },
      { title: L("Entegrasyon", "Integration"), description: L("Bağlantıyı kurup test ediyoruz.", "We build and test the connection.") },
      { title: L("Yayın", "Launch"), description: L("Canlıya alıyoruz.", "We take it live.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Hangi CRM'lerle çalışıyorsunuz?", "Which CRMs do you work with?"),
        answer: L("Açık bir API sunan çoğu yaygın CRM ile entegrasyon mümkündür.", "Integration is possible with most popular CRMs that expose an open API."),
      },
      {
        question: L("CRM'im yoksa ne olur?", "What if I don't have a CRM yet?"),
        answer: L("İhtiyacınıza uygun bir CRM seçimi konusunda da yönlendirme yapabiliriz.", "We can also help you choose a CRM that fits your needs."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "e-posta-bildirim-otomasyonu",
    slug: "e-posta-bildirim-otomasyonu",
    category: "automation-integrations",
    title: L("E-posta / Bildirim Otomasyonu", "Email / Notification Automation"),
    shortDescription: L(
      "Sipariş, randevu veya form sonrası otomatik e-posta ve bildirim akışları kuruyoruz.",
      "We build automated email and notification flows for orders, appointments, or form submissions."
    ),
    pricingType: "startingAt",
    price: TRY(8900),
    deliveryDays: 7,
    revisionCount: 1,
    featured: false,
    includedFeatures: [
      L("Otomatik e-posta şablonları", "Automated email templates"),
      L("Tetikleyici bazlı gönderim (sipariş, form, randevu)", "Trigger-based sending (order, form, appointment)"),
      L("Gönderim durumu takibi", "Delivery status tracking"),
      L("Test ve doğrulama", "Testing and verification"),
    ],
    optionalExtras: [EXTRA.copywriting(), EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.existingAccess, REQ.brandAssets],
    suitableFor: [
      L("Manuel bilgilendirme e-postası gönderenler", "Anyone currently sending notification emails manually"),
      L("Müşteri iletişimini standartlaştırmak isteyenler", "Businesses standardizing their customer communication"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Hangi olaylarda bildirim gerektiğini belirliyoruz.", "We identify which events need a notification.") },
      { title: L("Şablon", "Templates"), description: L("E-posta şablonlarını tasarlıyoruz.", "We design the email templates.") },
      { title: L("Otomasyon", "Automation"), description: L("Tetikleyicileri bağlıyoruz.", "We wire up the triggers.") },
      { title: L("Test & Yayın", "Testing & Launch"), description: L("Test edip canlıya alıyoruz.", "We test it and take it live.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("E-postalar spam'e düşer mi?", "Will the emails end up in spam?"),
        answer: L("Teslim edilebilirliği artıran temel yapılandırmalar (SPF/DKIM vb.) kapsam dahilindedir.", "Basic deliverability configuration (SPF/DKIM, etc.) is included in scope."),
      },
      {
        question: L("SMS bildirimi de ekleyebilir misiniz?", "Can SMS notifications be added too?"),
        answer: L("Evet, SMS kanalı ek bir kapsam olarak eklenebilir.", "Yes, SMS can be added as an additional scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
];

// ---------------------------------------------------------------------------
// SECTOR SOLUTIONS
// ---------------------------------------------------------------------------

const sectorSolutions: Solution[] = [
  {
    id: "qr-menu",
    slug: "qr-menu",
    category: "sector-solutions",
    title: L("QR Menü", "QR Menu"),
    shortDescription: L(
      "Restoran ve kafeler için anında güncellenebilen dijital QR menü sistemi.",
      "A digital QR menu system for restaurants and cafés that updates instantly."
    ),
    pricingType: "fixed",
    price: TRY(3900),
    deliveryDays: 5,
    revisionCount: 1,
    featured: true,
    includedFeatures: [
      L("Dijital menü sayfası", "A digital menu page"),
      L("QR kod oluşturma", "QR code generation"),
      L("Kendi kendine ürün/fiyat güncelleme", "Self-service product/price updates"),
      L("Kategori ve görsel desteği", "Category and image support"),
    ],
    optionalExtras: [EXTRA.multilang(), EXTRA.priorityDelivery()],
    requirementsFromCustomer: [REQ.productCatalog, REQ.visuals, REQ.brandAssets],
    suitableFor: [
      L("Restoran, kafe ve barlar", "Restaurants, cafés, and bars"),
      L("Menüsünü sık güncelleyen işletmeler", "Businesses that update their menu often"),
    ],
    process: [
      { title: L("Kurulum", "Setup"), description: L("Menü yapısını ve kategorileri kuruyoruz.", "We set up the menu structure and categories.") },
      { title: L("İçerik", "Content"), description: L("Ürün, fiyat ve görselleri yerleştiriyoruz.", "We add the products, prices, and images.") },
      { title: L("Yayın", "Launch"), description: L("QR kodu oluşturup yayına alıyoruz.", "We generate the QR code and go live.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Fiyatları kendim güncelleyebilir miyim?", "Can I update prices myself?"),
        answer: L("Evet, basit bir panel üzerinden ürün ve fiyatları kendiniz güncelleyebilirsiniz.", "Yes, you can update products and prices yourself through a simple panel."),
      },
      {
        question: L("Basic/Standard/Pro arasındaki fark ne?", "What's the difference between Basic/Standard/Pro?"),
        answer: L("Fark kapsanan özellik sayısı ve özelleştirme seviyesidir; karşılaştırmayı aşağıda bulabilirsiniz.", "The difference is the number of features covered and the level of customization — see the comparison below."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    tiers: [
      {
        id: "basic",
        name: L("Basic", "Basic"),
        shortDescription: L("Tek dil, sabit tasarımlı temel dijital menü.", "A single-language digital menu with a fixed design."),
        pricingType: "fixed",
        price: TRY(3900),
        deliveryDays: 5,
        revisionCount: 1,
        includedFeatures: [
          L("Dijital menü + QR kod", "Digital menu + QR code"),
          L("Tek dil", "Single language"),
          L("Standart tasarım şablonu", "Standard design template"),
        ],
      },
      {
        id: "standard",
        name: L("Standard", "Standard"),
        shortDescription: L("Marka renklerine uyarlanmış, çok kategorili menü.", "A multi-category menu adapted to your brand colors."),
        pricingType: "fixed",
        price: TRY(6900),
        deliveryDays: 7,
        revisionCount: 2,
        includedFeatures: [
          L("Dijital menü + QR kod", "Digital menu + QR code"),
          L("Marka renklerine uyarlama", "Adapted to your brand colors"),
          L("Sınırsız kategori", "Unlimited categories"),
          L("Temel analytics (görüntülenme)", "Basic analytics (views)"),
        ],
      },
      {
        id: "pro",
        name: L("Pro", "Pro"),
        shortDescription: L("Çoklu dil ve özel tasarımlı gelişmiş menü deneyimi.", "An advanced menu experience with multi-language and custom design."),
        pricingType: "fixed",
        price: TRY(10900),
        deliveryDays: 10,
        revisionCount: 2,
        includedFeatures: [
          L("Dijital menü + QR kod", "Digital menu + QR code"),
          L("Çoklu dil desteği", "Multi-language support"),
          L("Tamamen özel tasarım", "Fully custom design"),
          L("Öne çıkan ürün / kampanya alanı", "Featured item / promotion area"),
        ],
      },
    ],
    isPlaceholder: true,
  },
  {
    id: "klinik-dijital-sistemi",
    slug: "klinik-dijital-sistemi",
    category: "sector-solutions",
    title: L("Klinik Dijital Sistemi", "Clinic Digital System"),
    shortDescription: L(
      "Klinikler için randevu, hasta kaydı ve iletişimi bir araya getiren dijital sistem.",
      "A digital system that brings appointments, patient records, and communication together for clinics."
    ),
    pricingType: "startingAt",
    price: TRY(39900),
    deliveryDays: 21,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Online randevu alma", "Online appointment booking"),
      L("Hasta kaydı ve geçmiş takibi", "Patient records and history tracking"),
      L("Hatırlatma bildirimleri", "Reminder notifications"),
      L("Personel/uzman bazlı planlama", "Doctor/specialist-based scheduling"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.staffList, REQ.brandAssets],
    suitableFor: [
      L("Klinik ve muayenehaneler", "Clinics and private practices"),
      L("Randevu ve hasta takibini dijitalleştirmek isteyenler", "Practices digitizing appointments and patient tracking"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Klinik akışınızı ve gizlilik gereksinimlerinizi anlıyoruz.", "We understand your clinic flow and privacy requirements.") },
      { title: L("Kapsam", "Scope"), description: L("Uzman ve hizmet yapısını netleştiriyoruz.", "We define the specialist and service structure.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi geliştirip test ediyoruz.", "We build and test the system.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp ekibinize kullanımını anlatıyoruz.", "We launch it and train your team on it.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Hasta verileri güvenli mi tutuluyor?", "Is patient data kept secure?"),
        answer: L("Erişim kontrolü ve temel veri güvenliği önlemleri kapsam dahilindedir; sektöre özel uyumluluk ihtiyaçları ayrıca değerlendirilir.", "Access control and basic data-security measures are included; sector-specific compliance needs are assessed separately."),
      },
      {
        question: L("Birden fazla uzman desteklenir mi?", "Does it support multiple specialists?"),
        answer: L("Evet, uzman sayısına göre kapsam görüşmesinde netleştirilir.", "Yes, this is scoped based on the number of specialists during the discovery call."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "kuafor-guzellik-sistemi",
    slug: "kuafor-guzellik-sistemi",
    category: "sector-solutions",
    title: L("Kuaför / Güzellik Sistemi", "Salon / Beauty System"),
    shortDescription: L(
      "Kuaför ve güzellik merkezleri için randevu, hizmet ve personel yönetimini birleştiren sistem.",
      "A system that unifies appointments, services, and staff management for salons and beauty centers."
    ),
    pricingType: "startingAt",
    price: TRY(29900),
    deliveryDays: 18,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Online randevu alma", "Online appointment booking"),
      L("Hizmet ve personel bazlı planlama", "Service and staff-based scheduling"),
      L("Randevu hatırlatma bildirimleri", "Appointment reminder notifications"),
      L("Yönetim paneli", "Admin panel"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.staffList, REQ.brandAssets],
    suitableFor: [
      L("Kuaför, berber ve güzellik merkezleri", "Salons, barbershops, and beauty centers"),
      L("Telefonla randevu yükünü azaltmak isteyenler", "Businesses wanting to reduce phone-booking load"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Hizmet ve personel yapınızı anlıyoruz.", "We understand your service and staff structure.") },
      { title: L("Kapsam", "Scope"), description: L("Randevu kurallarını netleştiriyoruz.", "We define the booking rules.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi geliştirip test ediyoruz.", "We build and test the system.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp kullanımını anlatıyoruz.", "We launch it and walk you through usage.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Müşteriler favori personelini seçebilir mi?", "Can customers pick their preferred stylist?"),
        answer: L("Evet, personel bazlı randevu seçimi standart kapsamdadır.", "Yes, staff-based booking selection is part of the standard scope."),
      },
      {
        question: L("Birden fazla şube desteklenir mi?", "Does it support multiple branches?"),
        answer: L("Şube sayısına göre kapsam görüşmesinde netleştirilir.", "This is scoped based on the number of branches during the discovery call."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "otel-rezervasyon-yonetim-sistemi",
    slug: "otel-rezervasyon-yonetim-sistemi",
    category: "sector-solutions",
    title: L("Otel Rezervasyon & Yönetim Sistemi", "Hotel Reservation & Management System"),
    shortDescription: L(
      "Oda müsaitliğini, rezervasyonları ve operasyonu tek yerden yönetmenizi sağlayan sistem.",
      "A system for managing room availability, reservations, and operations in one place."
    ),
    pricingType: "startingAt",
    price: TRY(49900),
    deliveryDays: 28,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Online oda rezervasyonu", "Online room reservations"),
      L("Oda tipi ve müsaitlik yönetimi", "Room type and availability management"),
      L("Rezervasyon onay/iptal akışı", "Reservation confirmation/cancellation flow"),
      L("Yönetim paneli", "Admin panel"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.businessInfo, REQ.visuals, REQ.brandAssets],
    suitableFor: [
      L("Butik oteller ve pansiyonlar", "Boutique hotels and guesthouses"),
      L("Kanal yöneticisi karmaşıklığına ihtiyaç duymayan işletmeler", "Businesses that don't need full channel-manager complexity"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Oda yapınızı ve rezervasyon kurallarınızı anlıyoruz.", "We understand your room structure and reservation rules.") },
      { title: L("Kapsam", "Scope"), description: L("Fiyatlandırma ve müsaitlik mantığını netleştiriyoruz.", "We define the pricing and availability logic.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi geliştirip test ediyoruz.", "We build and test the system.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp ekibinize kullanımını anlatıyoruz.", "We launch it and train your team on it.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Booking.com gibi platformlarla senkronize olur mu?", "Does it sync with platforms like Booking.com?"),
        answer: L("Bu, ayrı bir kanal yöneticisi entegrasyonu olarak ek kapsamda değerlendirilir.", "This is assessed as a separate channel-manager integration, as additional scope."),
      },
      {
        question: L("Ödeme alma dahil mi?", "Is payment collection included?"),
        answer: L("Ödeme entegrasyonu ayrı bir kapsam olarak eklenebilir.", "Payment integration can be added as a separate scope."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
  {
    id: "restoran-kafe-dijital-cozumu",
    slug: "restoran-kafe-dijital-cozumu",
    category: "sector-solutions",
    title: L("Restoran / Kafe Dijital Çözümü", "Restaurant / Café Digital Solution"),
    shortDescription: L(
      "QR menü, masa siparişi ve rezervasyonu bir araya getiren restoran/kafe çözümü.",
      "A restaurant/café solution that brings QR menu, table ordering, and reservations together."
    ),
    pricingType: "startingAt",
    price: TRY(27900),
    deliveryDays: 16,
    revisionCount: 2,
    featured: false,
    includedFeatures: [
      L("Dijital QR menü", "Digital QR menu"),
      L("Masa bazlı sipariş akışı", "Table-based ordering flow"),
      L("Rezervasyon ekranı", "Reservation screen"),
      L("Yönetim paneli", "Admin panel"),
    ],
    optionalExtras: [EXTRA.extraIntegration(), EXTRA.priorityDelivery(), EXTRA.monthlyMaintenance()],
    requirementsFromCustomer: [REQ.productCatalog, REQ.visuals, REQ.brandAssets],
    suitableFor: [
      L("Restoran ve kafeler", "Restaurants and cafés"),
      L("Menü, sipariş ve rezervasyonu tek sistemde toplamak isteyenler", "Businesses wanting menu, ordering, and reservations in one system"),
    ],
    process: [
      { title: L("Keşif", "Discovery"), description: L("Menü ve sipariş akışınızı anlıyoruz.", "We understand your menu and ordering flow.") },
      { title: L("Kapsam", "Scope"), description: L("Masa ve rezervasyon yapısını netleştiriyoruz.", "We define the table and reservation structure.") },
      { title: L("Geliştirme", "Development"), description: L("Sistemi geliştirip test ediyoruz.", "We build and test the system.") },
      { title: L("Yayın & Eğitim", "Launch & Training"), description: L("Yayına alıp ekibinize kullanımını anlatıyoruz.", "We launch it and train your team on it.") },
    ],
    deliverables: [DELIV.liveSystem, DELIV.responsive, DELIV.handoverWalkthrough],
    faq: [
      {
        question: L("Mutfak ekranına sipariş düşüyor mu?", "Do orders show up on a kitchen screen?"),
        answer: L("Bu, ihtiyaç halinde ek kapsam olarak eklenebilecek bir özelliktir.", "This is a feature that can be added as additional scope if needed."),
      },
      {
        question: L("Sadece QR menü de alabilir miyim?", "Can I just get the QR menu on its own?"),
        answer: L("Evet, QR Menü paketi ayrı olarak da sunulmaktadır.", "Yes, the QR Menu package is also available on its own."),
      },
    ],
    ctaLabel: CTA_QUOTE,
    isPlaceholder: true,
  },
];

export const SOLUTIONS: Solution[] = [
  ...webCommerce,
  ...seoGeo,
  ...businessSystems,
  ...automationIntegrations,
  ...sectorSolutions,
];
