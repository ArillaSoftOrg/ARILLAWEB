import { PrismaClient, AdminRole, ProjectType, BudgetRange, TargetPlatform } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CATALOG_EXAMPLES, CATALOG_SECTORS } from './catalog-seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed verisi yükleniyor...');

  // Admin kullanıcı
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 12);
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@arillasoft.com' },
    update: {},
    create: {
      name: 'Site Yöneticisi',
      email: process.env.ADMIN_EMAIL || 'admin@arillasoft.com',
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
    },
  });
  console.log('✅ Admin kullanıcı oluşturuldu');

  // Site ayarları
  await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Arillasoft',
      siteDescription: 'Modern yazılım çözümleri ile işletmenizi dijital geleceğe taşıyoruz.',
      contactEmail: 'iletisim@arillasoft.com',
      contactPhone: '+90 (212) 555 01 01',
      address: 'Maslak Mah. Büyükdere Cad. No:128, Sarıyer / İstanbul',
      linkedinUrl: 'https://linkedin.com/company/arillasoft',
      githubUrl: 'https://github.com/arillasoft',
      instagramUrl: 'https://instagram.com/arillasoft',
      twitterUrl: 'https://twitter.com/arillasoft',
    },
  });
  console.log('✅ Site ayarları oluşturuldu');

  // Hizmetler
  const services = [
    {
      title: 'Web Uygulama Geliştirme',
      slug: 'web-uygulama-gelistirme',
      shortDescription: 'Modern, hızlı ve ölçeklenebilir web uygulamaları geliştiriyoruz.',
      content: `React, Next.js ve Vue.js gibi modern frontend teknolojileriyle birlikte Node.js, .NET ve Python tabanlı backend sistemleri kullanarak işletmenize özel web uygulamaları geliştiriyoruz.\n\nÇözümlerimiz performans, güvenlik ve kullanıcı deneyimi odaklı tasarlanmakta; her ölçekteki işletmenin ihtiyaçlarına yanıt verecek şekilde özelleştirilmektedir.\n\nSEO dostu yapı, PWA desteği ve erişilebilirlik standartlarına uyum sağlayarak dijital varlığınızı güçlendiriyoruz.`,
      icon: 'Monitor',
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: 'Mobil Uygulama Geliştirme',
      slug: 'mobil-uygulama-gelistirme',
      shortDescription: 'iOS ve Android için native ve cross-platform mobil uygulamalar.',
      content: `React Native ve Flutter ile cross-platform mobil uygulamalar geliştirerek hem iOS hem Android platformlarında üst düzey kullanıcı deneyimi sunuyoruz.\n\nUygulama mağazası yayınlama süreçleri, push notification entegrasyonu, offline çalışma desteği ve analitik entegrasyonları dahil tam kapsamlı mobil çözümler üretiyoruz.\n\nKullanıcı davranışlarını analiz ederek sürekli iyileştirme döngüsüyle uygulamanızın başarısını maksimize ediyoruz.`,
      icon: 'Smartphone',
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: 'Özel Yazılım Geliştirme',
      slug: 'ozel-yazilim-gelistirme',
      shortDescription: 'İşletmenizin özgün ihtiyaçlarına yönelik sıfırdan yazılım geliştirme.',
      content: `Piyasadaki hazır çözümlerin yetersiz kaldığı durumlarda, işletmenizin süreçlerine ve iş akışlarına tam uyum sağlayan özel yazılımlar geliştiriyoruz.\n\nERP sistemleri, CRM platformları, üretim takip yazılımları ve diğer kurumsal uygulamalarda derin deneyimimizle iş süreçlerinizi dijitalleştiriyor ve verimliliği artırıyoruz.\n\nMicroservice mimarisi, API öncelikli tasarım ve bulut uyumlu altyapı ile geleceğe hazır çözümler sunuyoruz.`,
      icon: 'Code2',
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: 'UI/UX Tasarımı',
      slug: 'ui-ux-tasarimi',
      shortDescription: 'Kullanıcı odaklı, estetik ve işlevsel arayüz tasarımları.',
      content: `Kullanıcı araştırması, persona analizi ve wireframe çalışmalarıyla başlayıp yüksek kaliteli prototip ve nihai tasarımlarla tamamlanan UX sürecimizle işletmenize değer katıyoruz.\n\nFigma tabanlı tasarım sistemleri, komponent kütüphaneleri ve tasarım token yapılarıyla tutarlı ve sürdürülebilir bir arayüz dili oluşturuyoruz.\n\nErişilebilirlik standartlarına (WCAG 2.1) uygun, dönüşüm odaklı ve marka kimliğinizle bütünleşik tasarım çözümleri sunuyoruz.`,
      icon: 'Palette',
      isFeatured: true,
      sortOrder: 4,
    },
    {
      title: 'Backend ve API Geliştirme',
      slug: 'backend-ve-api-gelistirme',
      shortDescription: 'Güvenli, hızlı ve ölçeklenebilir backend sistemleri ve API altyapısı.',
      content: `RESTful ve GraphQL API'ler, mikro servis mimarileri ve event-driven sistemler geliştirerek uygulamalarınızın güçlü bir backend altyapısına kavuşmasını sağlıyoruz.\n\nPostgreSQL, MongoDB ve Redis gibi veri tabanı teknolojileri, JWT tabanlı kimlik doğrulama, role tabanlı yetkilendirme ve kapsamlı API güvenliği implementasyonlarını standart olarak sunuyoruz.\n\nCI/CD pipeline kurulumu, Docker konteynerizasyonu ve Kubernetes orkestrasyon desteğiyle DevOps süreçlerinizi modernize ediyoruz.`,
      icon: 'Server',
      isFeatured: false,
      sortOrder: 5,
    },
    {
      title: 'Bakım ve Teknik Destek',
      slug: 'bakim-ve-teknik-destek',
      shortDescription: 'Yazılımlarınızın sürekliliğini ve performansını güvence altına alıyoruz.',
      content: `Canlıya alınan sistemlerinizin 7/24 izlenmesi, güvenlik güncellemeleri, performans optimizasyonu ve hata düzeltmeleri kapsamında kapsamlı bakım hizmetleri sunuyoruz.\n\nSLA tabanlı destek anlaşmalarımızla kesinti sürelerini minimize ediyor, planlı bakım pencerelerinde sisteminizin güncel ve güvenli kalmasını sağlıyoruz.\n\nAylık raporlama, kullanım analizi ve teknik önerilerle sistemlerinizin uzun vadeli sağlığını güvence altına alıyoruz.`,
      icon: 'Wrench',
      isFeatured: false,
      sortOrder: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log('✅ Hizmetler oluşturuldu');

  // Çözümler
  const solutions = [
    {
      title: 'Dijital Dönüşüm',
      slug: 'dijital-donusum',
      shortDescription: 'İş süreçlerinizi dijitalleştirerek rekabet avantajı kazandırıyoruz.',
      content: `Geleneksel iş modellerini dijital dünyayla buluşturarak şirketinizin dönüşüm yolculuğuna rehberlik ediyoruz. Süreç analizi, teknoloji seçimi ve uygulama aşamalarında yanınızdayız.`,
      icon: 'Zap',
      sortOrder: 1,
    },
    {
      title: 'Operasyon Otomasyonu',
      slug: 'operasyon-otomasyonu',
      shortDescription: 'Tekrarlayan iş süreçlerini otomatize ederek verimliliği artırıyoruz.',
      content: `İnsan kaynaklarını değer yaratan işlere yönlendirmek için rutin ve tekrarlayan iş akışlarını akıllı otomasyon çözümleriyle yönetiyoruz. RPA, workflow engine ve entegrasyon platformlarıyla operasyonlarınızı dönüştürüyoruz.`,
      icon: 'Settings',
      sortOrder: 2,
    },
    {
      title: 'CRM / ERP Çözümleri',
      slug: 'crm-erp-cozumleri',
      shortDescription: 'Müşteri ilişkileri ve kurumsal kaynak yönetimini tek platformda birleştiriyoruz.',
      content: `Salesforce, HubSpot özelleştirmeleri veya tamamen sıfırdan geliştirilen CRM ve ERP sistemleriyle müşteri yönetimi, satış süreci ve kurumsal kaynakları merkezi bir platforma taşıyoruz.`,
      icon: 'Users',
      sortOrder: 3,
    },
    {
      title: 'E-Ticaret Çözümleri',
      slug: 'e-ticaret-cozumleri',
      shortDescription: 'Yüksek dönüşümlü e-ticaret platformları ve omnichannel deneyim.',
      content: `Shopify, WooCommerce, Magento entegrasyonları ya da headless e-ticaret mimarileriyle güçlü, hızlı ve dönüşüm odaklı online satış platformları kuruyoruz. Ödeme entegrasyonları, stok yönetimi ve lojistik API bağlantılarını standart olarak sunuyoruz.`,
      icon: 'ShoppingCart',
      sortOrder: 4,
    },
    {
      title: 'SaaS Ürün Geliştirme',
      slug: 'saas-urun-gelistirme',
      shortDescription: 'Fikrinizi ölçeklenebilir bir SaaS ürününe dönüştürüyoruz.',
      content: `MVP aşamasından olgunlaşmış ürüne kadar tüm SaaS geliştirme süreçlerini yönetiyoruz. Multi-tenant mimari, abonelik yönetimi, kullanım bazlı faturalandırma ve güçlü API altyapısıyla ürününüzü pazara çıkarmayı hızlandırıyoruz.`,
      icon: 'Cloud',
      sortOrder: 5,
    },
    {
      title: 'Veri ve Raporlama',
      slug: 'veri-ve-raporlama',
      shortDescription: 'Verilerinizi değerli içgörülere dönüştüren raporlama sistemleri.',
      content: `İş zekası dashboardları, veri ambarı kurulumu, ETL pipeline geliştirme ve gerçek zamanlı analitik çözümleriyle verilerinizdeki gizli potansiyeli ortaya çıkarıyoruz. Power BI, Metabase ve özel raporlama araçlarıyla karar alma süreçlerinizi güçlendiriyoruz.`,
      icon: 'BarChart3',
      sortOrder: 6,
    },
  ];

  for (const solution of solutions) {
    await prisma.solution.upsert({
      where: { slug: solution.slug },
      update: {},
      create: solution,
    });
  }
  console.log('✅ Çözümler oluşturuldu');

  // Proje kategorileri
  const projectCategories = [
    { name: 'Web Uygulaması', slug: 'web-uygulamasi' },
    { name: 'Mobil Uygulama', slug: 'mobil-uygulama' },
    { name: 'E-Ticaret', slug: 'e-ticaret' },
    { name: 'Kurumsal Yazılım', slug: 'kurumsal-yazilim' },
  ];

  for (const cat of projectCategories) {
    await prisma.projectCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const webCat = await prisma.projectCategory.findUnique({ where: { slug: 'web-uygulamasi' } });
  const mobileCat = await prisma.projectCategory.findUnique({ where: { slug: 'mobil-uygulama' } });
  const ecommerceCat = await prisma.projectCategory.findUnique({ where: { slug: 'e-ticaret' } });
  const enterpriseCat = await prisma.projectCategory.findUnique({ where: { slug: 'kurumsal-yazilim' } });

  // Projeler
  const projects = [
    {
      title: 'LogiTrack - Lojistik Yönetim Platformu',
      slug: 'logitrack-lojistik-yonetim-platformu',
      summary: 'Orta ölçekli lojistik şirketi için geliştirilen araç takip, rota optimizasyonu ve müşteri portalı içeren kapsamlı lojistik yönetim sistemi.',
      content: `LogiTrack, 200+ araçlık filosunu manuel süreçlerle yöneten bir lojistik firmasının dijital dönüşüm ihtiyacından doğmuştur.\n\nProje kapsamında gerçek zamanlı araç takip sistemi, yapay zeka destekli rota optimizasyon algoritmaları, müşteri self-servis portalı ve sürücü mobil uygulaması geliştirilmiştir.\n\nSonuçlar:\n- Yakıt maliyetlerinde %18 tasarruf\n- Teslimat sürelerinde %23 iyileşme\n- Müşteri memnuniyeti puanında 4,2'den 4,8'e yükseliş\n- Manuel operasyon işlerinde %60 azalma`,
      clientName: 'KargoExpress A.Ş.',
      sector: 'Lojistik',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Google Maps API', 'React Native'],
      resultMetrics: '%18 yakıt tasarrufu, %23 daha hızlı teslimat',
      isFeatured: true,
      published: true,
      categoryId: enterpriseCat?.id,
    },
    {
      title: 'HealthPlus - Hasta Yönetim Sistemi',
      slug: 'healthplus-hasta-yonetim-sistemi',
      summary: 'Çok şubeli özel hastane grubu için geliştirilen hasta randevu, tıbbi kayıt ve fatura yönetim sistemi.',
      content: `HealthPlus, 5 şubesi bulunan bir özel hastane grubu için tasarlanmış kapsamlı hastane yönetim bilgi sistemidir.\n\nE-Nabız entegrasyonu, KVKK uyumlu hasta veri yönetimi, online randevu sistemi, laboratuvar sonuç portalı ve entegre fatura yönetimi içermektedir.\n\nSonuçlar:\n- Randevu süreçlerinde %70 dijitalleşme\n- No-show oranında %35 düşüş\n- Hasta başına idari işlem süresi 12 dakikadan 3 dakikaya inmiş\n- Yıllık kağıt tasarruf: 50.000+ sayfa`,
      clientName: 'Medikal Group',
      sector: 'Sağlık',
      technologies: ['React', 'TypeScript', '.NET 8', 'SQL Server', 'Azure', 'HL7 FHIR'],
      resultMetrics: '%70 dijitalleşme, %35 daha az randevu iptali',
      isFeatured: true,
      published: true,
      categoryId: webCat?.id,
    },
    {
      title: 'StyleShop - Premium E-Ticaret Platformu',
      slug: 'styleshop-premium-e-ticaret-platformu',
      summary: 'Türkiye\'nin önde gelen moda markalarından biri için headless mimariyle geliştirilen yüksek performanslı e-ticaret platformu.',
      content: `StyleShop, yüksek trafik altında performans sorunları yaşayan eski e-ticaret platformunun yerine geçmek üzere headless CMS + Next.js mimarisiyle geliştirilmiştir.\n\nSayfa hızı optimizasyonu, kişiselleştirilmiş ürün önerileri, çok para birimli ödeme altyapısı ve gelişmiş filtre sistemi projenin öne çıkan özellikleridir.\n\nSonuçlar:\n- Sayfa yükleme süresi 4,2 saniyeden 0,9 saniyeye inmiş\n- Dönüşüm oranı %2,1'den %3,8'e çıkmış\n- Yıllık online gelirde %82 artış\n- Sepet terk oranı %67'den %51'e düşmüş`,
      clientName: 'ModaGroup Istanbul',
      sector: 'Moda / Perakende',
      technologies: ['Next.js', 'Shopify Headless', 'Contentful', 'Vercel', 'Stripe', 'Algolia'],
      resultMetrics: '%82 gelir artışı, 4x daha hızlı sayfa yükleme',
      isFeatured: true,
      published: true,
      categoryId: ecommerceCat?.id,
    },
    {
      title: 'FieldForce - Saha Ekibi Yönetim Uygulaması',
      slug: 'fieldforce-saha-ekibi-yonetim-uygulamasi',
      summary: 'Teknik servis şirketi için geliştirilen mobil öncelikli saha çalışanı yönetim ve iş takip uygulaması.',
      content: `FieldForce, 300 saha teknisyeniyle hizmet veren bir teknik servis şirketinin operasyonlarını dijitalleştirmek için geliştirilmiştir.\n\nOffline çalışma modu, GPS bazlı iş atama, fotoğraf ve imza onay sistemi, gerçek zamanlı raporlama ve müşteri bilgilendirme özellikleri içermektedir.\n\nSonuçlar:\n- İş tamamlama süresi günde 6 işten 8 işe çıkmış\n- Kağıt form kullanımı tamamen ortadan kalkmış\n- Müşteri onay süresi 2 günden aynı gün tamamlanmaya dönüşmüş\n- Dispatcher iş yükü %45 azalmış`,
      clientName: 'TekServis A.Ş.',
      sector: 'Teknik Servis',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase', 'Google Maps'],
      resultMetrics: '%33 daha fazla iş tamamlama, sıfır kağıt',
      isFeatured: false,
      published: true,
      categoryId: mobileCat?.id,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log('✅ Projeler oluşturuldu');

  // Sektörel site örnekleri kataloğu
  for (const sector of CATALOG_SECTORS) {
    await prisma.projectCategory.upsert({
      where: { slug: sector.slug },
      update: {
        name: sector.name,
        description: sector.description,
        sortOrder: sector.sortOrder,
        isCatalogSector: true,
      },
      create: {
        name: sector.name,
        slug: sector.slug,
        description: sector.description,
        sortOrder: sector.sortOrder,
        isCatalogSector: true,
      },
    });
  }

  const catalogCategories = await prisma.projectCategory.findMany({
    where: { slug: { in: CATALOG_SECTORS.map((sector) => sector.slug) } },
    select: { id: true, slug: true },
  });
  const catalogCategoryIds = new Map(catalogCategories.map((category) => [category.slug, category.id]));

  for (const example of CATALOG_EXAMPLES) {
    const { categorySlug, ...data } = example;
    const categoryId = catalogCategoryIds.get(categorySlug);
    if (!categoryId) continue;

    await prisma.project.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        projectUrl: data.projectUrl,
        categoryId,
      },
    });
  }
  console.log('✅ 24 sektörel site örneği oluşturuldu');

  // Blog kategorileri
  const blogCategories = [
    { name: 'Teknoloji', slug: 'teknoloji' },
    { name: 'Web Geliştirme', slug: 'web-gelistirme' },
    { name: 'Mobil', slug: 'mobil' },
    { name: 'Dijital Dönüşüm', slug: 'dijital-donusum' },
    { name: 'Kariyer', slug: 'kariyer' },
  ];

  for (const cat of blogCategories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const techCat = await prisma.blogCategory.findUnique({ where: { slug: 'teknoloji' } });
  const webDevCat = await prisma.blogCategory.findUnique({ where: { slug: 'web-gelistirme' } });
  const mobileBlogCat = await prisma.blogCategory.findUnique({ where: { slug: 'mobil' } });
  const digitalCat = await prisma.blogCategory.findUnique({ where: { slug: 'dijital-donusum' } });

  // Blog yazıları
  const blogPosts = [
    {
      title: 'Next.js 15 ile Modern Web Uygulaması Geliştirme',
      slug: 'nextjs-15-ile-modern-web-uygulamasi-gelistirme',
      excerpt: 'Next.js 15\'in getirdiği yenilikler, App Router mimarisi ve server componentlerle yüksek performanslı web uygulamaları nasıl geliştirilir?',
      content: `Next.js 15, React ekosisteminde bir kilometre taşı olmaya devam ediyor. Bu yazıda, yeni sürümle birlikte gelen özellikler ve en iyi pratikleri inceliyoruz.\n\n## App Router ve Server Components\n\nApp Router mimarisi artık olgunlaşmış durumda. Partial Prerendering, Turbopack desteği ve geliştirilmiş caching stratejileri ile uygulamalarınız hem geliştirme hem üretim ortamında çok daha hızlı çalışıyor.\n\n## Caching Stratejileri\n\nNext.js 15'te varsayılan cache davranışı değişti. Artık fetch istekleri varsayılan olarak cache edilmiyor, bu da daha tahmin edilebilir bir davranış sağlıyor.\n\n## Partial Prerendering\n\nStatik ve dinamik içeriği aynı sayfada birleştirmenin en verimli yolu olan PPR, production'da kullanıma sunuldu. Bu özellikle dashboard uygulamalarında oyun değiştirici bir yenilik.\n\n## Turbopack\n\nGeliştirme sunucusu artık varsayılan olarak Turbopack kullanıyor. Webpack'e kıyasla %57 daha hızlı başlangıç süresi ve %96 daha hızlı hot reload ile geliştirme deneyimi inanılmaz derecede iyileşti.`,
      readingTime: 8,
      published: true,
      featured: true,
      categoryId: webDevCat?.id,
      seoTitle: 'Next.js 15 Yenilikleri ve Modern Web Geliştirme | Arillasoft',
      seoDescription: 'Next.js 15 ile App Router, Partial Prerendering ve Turbopack kullanarak yüksek performanslı web uygulamaları geliştirin.',
      publishedAt: new Date('2024-11-15'),
    },
    {
      title: 'TypeScript ile Güçlü Tip Güvenliği: 2024 En İyi Pratikler',
      slug: 'typescript-ile-guclu-tip-guvenligi-2024',
      excerpt: 'TypeScript projelerinde hata oranını minimuma indiren ileri seviye tip güvenliği teknikleri ve yaygın hatalardan kaçınma yolları.',
      content: `TypeScript günümüzün en popüler programlama araçlarından biri. Ancak TypeScript'in tüm gücünü kullanmak için bazı ileri teknikleri bilmek gerekiyor.\n\n## Discriminated Unions\n\nKarmaşık durum yönetimi senaryolarında discriminated union tipleri kullanmak, runtime hatalarını derleme zamanına taşır ve kodunuzu daha güvenli hale getirir.\n\n## Template Literal Types\n\nString manipülasyonu için template literal tipler kullanarak çok daha güçlü tip kontrolleri yapabilirsiniz. Özellikle API route tanımlamaları için idealdir.\n\n## Branded Types\n\nPrimitive tipleri daha spesifik hale getiren branded types tekniği, özellikle ID'ler ve para birimleri gibi alanlarda karışıklıkları önler.\n\n## Utility Types\n\nPartial, Required, Pick, Omit ve özellikle Awaited gibi utility tipleri doğru kullanmak kod tekrarını önemli ölçüde azaltır.`,
      readingTime: 10,
      published: true,
      featured: true,
      categoryId: techCat?.id,
      seoTitle: 'TypeScript En İyi Pratikler 2024 | Arillasoft Blog',
      seoDescription: 'TypeScript ile discriminated unions, branded types ve utility types kullanarak güvenli ve bakımı kolay kod yazın.',
      publishedAt: new Date('2024-10-28'),
    },
    {
      title: 'React Native vs Flutter: 2024 Karşılaştırması',
      slug: 'react-native-vs-flutter-2024-karsilastirmasi',
      excerpt: 'Mobil uygulama geliştirmede iki güçlü rakip: React Native ve Flutter. Hangi framework projenize daha uygun?',
      content: `Cross-platform mobil geliştirme dünyasında React Native ve Flutter başı çekiyor. Her ikisinin de güçlü ve zayıf yanları var.\n\n## Performans\n\nFlutter, Dart ile native kod derleme yaparak üstün performans sunuyor. React Native ise JavaScript bridge kullanıyor ancak yeni mimari (JSI) ile bu fark önemli ölçüde kapandı.\n\n## Ekosistem ve Topluluk\n\nReact Native'in JavaScript ekosistemiyle örtüşmesi, web geliştiricilerin geçişini kolaylaştırıyor. Flutter ise Google'ın güçlü desteği ve hızla büyüyen ekosistemiyle dikkat çekiyor.\n\n## Ne Zaman Hangisini Kullanmalı?\n\nMevcut web ekibiniz React biliyorsa React Native. Yüksek animasyon performansı gerektiren uygulamalar için Flutter. Startup'lar ve hızlı MVP için her ikisi de uygun.`,
      readingTime: 7,
      published: true,
      featured: false,
      categoryId: mobileBlogCat?.id,
      seoTitle: 'React Native vs Flutter 2024 Karşılaştırması | Arillasoft',
      seoDescription: 'React Native ve Flutter arasındaki farkları keşfedin ve projenize en uygun mobil geliştirme framework\'ünü seçin.',
      publishedAt: new Date('2024-10-10'),
    },
    {
      title: 'KOBİ\'ler İçin Dijital Dönüşüm Yol Haritası',
      slug: 'kobiler-icin-dijital-donusum-yol-haritasi',
      excerpt: 'Küçük ve orta ölçekli işletmelerin dijital dönüşüm sürecinde karşılaştıkları zorluklar ve başarılı bir dönüşüm için izlenmesi gereken adımlar.',
      content: `Dijital dönüşüm artık büyük şirketlerin lüksü değil; rekabetçi kalabilmek için her ölçekteki işletmenin ihtiyacı.\n\n## 1. Aşama: Dijital Olgunluk Değerlendirmesi\n\nDönüşüm yolculuğuna başlamadan önce mevcut durumunuzu net olarak değerlendirmeniz gerekiyor. Hangi süreçler manuel? Hangi veriler toplanıyor ama kullanılmıyor?\n\n## 2. Aşama: Önceliklendirme\n\nHer şeyi aynı anda dijitalleştirmeye çalışmayın. En yüksek ROI'yi sağlayacak süreçlerden başlayın. Genellikle muhasebe, müşteri iletişimi ve envanter yönetimi iyi başlangıç noktalarıdır.\n\n## 3. Aşama: Teknoloji Seçimi\n\nTeknolojiyi süreçlere göre seçin, süreci teknolojiye göre değil. Mevcut sistemlerle entegrasyon, kullanım kolaylığı ve ölçeklenebilirlik temel kriterleriniz olsun.\n\n## 4. Aşama: Çalışan Katılımı\n\nDigital dönüşümün en kritik ancak en çok göz ardı edilen boyutu insan faktörüdür. Değişim yönetimi ve eğitim programlarına yatırım yapmadan teknik dönüşümün başarıya ulaşması çok zor.`,
      readingTime: 9,
      published: true,
      featured: false,
      categoryId: digitalCat?.id,
      seoTitle: 'KOBİ Dijital Dönüşüm Rehberi 2024 | Arillasoft',
      seoDescription: 'Küçük ve orta ölçekli işletmeler için pratik dijital dönüşüm stratejileri ve uygulama adımları.',
      publishedAt: new Date('2024-09-22'),
    },
    {
      title: 'PostgreSQL Performans Optimizasyonu: İleri Seviye Teknikler',
      slug: 'postgresql-performans-optimizasyonu-ileri-seviye',
      excerpt: 'Yavaşlayan PostgreSQL sorgularını hızlandırmak için kullanabileceğiniz pratik teknikler: indexleme stratejileri, sorgu optimizasyonu ve bağlantı havuzu yönetimi.',
      content: `PostgreSQL, doğru yapılandırıldığında inanılmaz derecede güçlü bir veri tabanıdır. Ancak yanlış konfigürasyon performans sorunlarına yol açabilir.\n\n## Index Stratejileri\n\nB-tree index'ler standart olsa da, farklı veri tipleri için farklı index türleri daha iyi performans sağlar. GIN index'ler JSON verileri ve full-text search için; BRIN index'ler zaman serisi verileri için idealdir.\n\n## EXPLAIN ANALYZE\n\nYavaş sorgularınızı anlamak için EXPLAIN ANALYZE komutunu kullanın. Sequential scan yerine index scan görmek istiyorsanız, doğru alanlar üzerinde index olduğundan emin olun.\n\n## Bağlantı Havuzu\n\nPgBouncer kullanarak bağlantı havuzlaması yapmak, özellikle yüksek trafikli uygulamalarda bellek kullanımını dramatik şekilde azaltır.\n\n## Partitioning\n\nMilyonlarca satırlık tablolar için tablo bölümlendirme (partitioning) sorgularınızı çok daha hızlı hale getirebilir.`,
      readingTime: 12,
      published: true,
      featured: false,
      categoryId: techCat?.id,
      seoTitle: 'PostgreSQL Performans Optimizasyonu | Arillasoft Blog',
      seoDescription: 'PostgreSQL index stratejileri, sorgu optimizasyonu ve bağlantı havuzu yönetimiyle veri tabanı performansını artırın.',
      publishedAt: new Date('2024-09-05'),
    },
    {
      title: 'Yazılım Geliştirmede Temiz Kod Prensipleri',
      slug: 'yazilim-gelistirmede-temiz-kod-prensipleri',
      excerpt: 'Robert C. Martin\'in Clean Code prensiplerini modern yazılım geliştirme pratikleriyle buluşturan kapsamlı rehber.',
      content: `Temiz kod yazmak, sadece çalışan kod yazmaktan çok daha fazlasıdır. Bakımı kolay, anlaşılır ve genişletilebilir kod yazmak uzun vadede hem ekibinize hem de müşterilerinize büyük değer katar.\n\n## Anlamlı İsimlendirme\n\nDeğişken, fonksiyon ve sınıf isimleri ne yaptıklarını açıkça ifade etmelidir. 'data', 'info', 'stuff' gibi belirsiz isimlerden kaçının.\n\n## Küçük Fonksiyonlar\n\nBir fonksiyon tek bir şey yapmalıdır. 20 satırı geçen fonksiyonlara şüpheyle yaklaşın. Uzun fonksiyonları daha küçük, odaklı fonksiyonlara bölün.\n\n## DRY Prensibi\n\nKod tekrarı bakım maliyetini artırır. Aynı mantığı birden fazla yerde görüyorsanız, bunu bir fonksiyon veya modüle taşıma zamanı gelmiştir.\n\n## Yorumlar\n\nİyi kod kendini anlatır. Yorumlar, neyi değil neden'i açıklamalıdır. Yanıltıcı veya eskimiş yorumlar, yorum olmamasından daha zararlıdır.`,
      readingTime: 6,
      published: true,
      featured: false,
      categoryId: techCat?.id,
      seoTitle: 'Temiz Kod Prensipleri Rehberi | Arillasoft Blog',
      seoDescription: 'Clean Code prensiplerini uygulayarak bakımı kolay, anlaşılır ve kaliteli yazılım geliştirin.',
      publishedAt: new Date('2024-08-18'),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log('✅ Blog yazıları oluşturuldu');

  // SSS
  const faqs = [
    {
      question: 'Proje geliştirme süreciniz nasıl işliyor?',
      answer: 'Projelerimizi keşif, tasarım, geliştirme, test ve lansman aşamalarında yürütüyoruz. Her aşamada sizinle düzenli toplantılar yaparak ilerlemeyi paylaşır, geri bildirimlerinizi sürece dahil ederiz. Agile metodoloji benimseyerek 2 haftalık sprint döngüleriyle çalışır, her sprint sonunda somut çıktılar sunarız.',
      category: 'Süreç',
      sortOrder: 1,
      isActive: true,
    },
    {
      question: 'Proje fiyatlandırması nasıl yapılıyor?',
      answer: 'Her proje kendine özgü olduğu için fiyatlandırmamız proje kapsamı, karmaşıklığı ve zaman çizelgesine göre belirlenir. Sabit fiyat (fixed-price) veya zaman ve materyal (time & material) olmak üzere iki farklı iş modeliyle çalışabiliriz. Detaylı gereksinim görüşmesinin ardından kapsamlı bir teklif hazırlıyoruz.',
      category: 'Fiyatlandırma',
      sortOrder: 2,
      isActive: true,
    },
    {
      question: 'Proje teslim süreleri ne kadar?',
      answer: 'Proje karmaşıklığına göre değişmekle birlikte, basit bir kurumsal web sitesi 4-6 hafta, orta karmaşıklıkta web uygulamaları 2-4 ay, kapsamlı kurumsal yazılımlar 4-8+ ay sürebilmektedir. Teklif aşamasında projenize özel bir zaman çizelgesi hazırlıyoruz ve bu süreye sadık kalmayı taahhüt ediyoruz.',
      category: 'Süreç',
      sortOrder: 3,
      isActive: true,
    },
    {
      question: 'Geliştirme sonrası destek sağlıyor musunuz?',
      answer: 'Evet, tüm projelerimizde lansman sonrası 30 günlük ücretsiz garanti desteği sunuyoruz. Bu sürenin ardından aylık bakım ve destek paketlerimiz kapsamında sistem güncellemeleri, güvenlik yamaları, performans izleme ve teknik destek hizmetlerini SLA garantisiyle devam ettiriyoruz.',
      category: 'Destek',
      sortOrder: 4,
      isActive: true,
    },
    {
      question: 'Hangi teknolojilerle çalışıyorsunuz?',
      answer: 'Frontend\'de React, Next.js, Vue.js ve Angular; backend\'de Node.js, .NET, Python ve Go; mobil\'de React Native ve Flutter kullanıyoruz. Veritabanı olarak PostgreSQL, MySQL, MongoDB ve Redis; cloud platformları olarak AWS, Azure ve Google Cloud\'da deneyimimiz bulunmaktadır. Projeniz için en uygun teknolojiyi birlikte belirleyebiliriz.',
      category: 'Teknik',
      sortOrder: 5,
      isActive: true,
    },
    {
      question: 'Kaynak kodun sahipliği kime ait?',
      answer: 'Proje tamamlandıktan ve ödeme gerçekleştikten sonra geliştirilen yazılımın kaynak kodu tamamen size aittir. Herhangi bir sınırlama koymaksızın kaynak kodun tam haklarını devrediyoruz. Kullandığımız açık kaynak kütüphaneler kendi lisanslarına tabidir.',
      category: 'Hukuki',
      sortOrder: 6,
      isActive: true,
    },
    {
      question: 'Uzaktan çalışıyor musunuz?',
      answer: 'Evet, tüm projelerimizde uzaktan çalışma modelini başarıyla uyguluyoruz. Video konferans, proje yönetim araçları ve anlık iletişim platformları aracılığıyla tüm dünyadan müşterilerle etkin bir şekilde iş birliği yapıyoruz. İstanbul\'daki müşterilerimizle isteğe bağlı yüz yüze toplantılar da gerçekleştirebiliyoruz.',
      category: 'İş Modeli',
      sortOrder: 7,
      isActive: true,
    },
    {
      question: 'Fikrim hazır olmadan proje başlatabilir miyim?',
      answer: 'Kesinlikle. Discovery (keşif) aşamamızda fikrinizi birlikte olgunlaştırıyor, teknik ve iş gereksinimleri belirliyor, rakip analizi yapıyor ve MVP kapsamını tanımlıyoruz. Bu aşama sonunda bir proje dokümantasyonu ve ilk prototip ile sürece net bir başlangıç yapmış oluyorsunuz.',
      category: 'Süreç',
      sortOrder: 8,
      isActive: true,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq }).catch(() => {});
  }
  console.log('✅ SSS oluşturuldu');

  // Ekip üyeleri
  const teamMembers = [
    {
      fullName: 'Ahmet Yılmaz',
      title: 'Kurucu & CEO',
      bio: '15 yıllık yazılım geliştirme deneyimiyle Arillasoft\'u kurdu. Daha önce Türkiye\'nin önde gelen teknoloji şirketlerinde kıdemli mühendis ve teknik direktör olarak çalıştı. Full-stack geliştirme, sistem mimarisi ve teknoloji stratejisi konularında uzman.',
      linkedinUrl: 'https://linkedin.com/in/ahmet-yilmaz',
      githubUrl: 'https://github.com/ahmetyilmaz',
      sortOrder: 1,
      isActive: true,
    },
    {
      fullName: 'Zeynep Kaya',
      title: 'Teknik Direktör & Kurucu Ortak',
      bio: 'Bilgisayar mühendisliği doktorasına sahip olan Zeynep, distributed systems ve cloud architecture konularında uzmanlaşmıştır. Google ve Amazon\'da çalıştıktan sonra Arillasoft\'a katılan Zeynep, teknik ekibin liderliğini üstlenmektedir.',
      linkedinUrl: 'https://linkedin.com/in/zeynep-kaya',
      githubUrl: 'https://github.com/zeynepkaya',
      sortOrder: 2,
      isActive: true,
    },
    {
      fullName: 'Murat Demir',
      title: 'Baş Tasarımcı & UX Direktörü',
      bio: '10 yılı aşkın UI/UX deneyimiyle kullanıcı odaklı tasarım metodolojilerini şirkete entegre etmiştir. IDEO\'dan ilham alan design thinking yaklaşımıyla her projeye kullanıcının perspektifinden yaklaşır. Apple ve Microsoft gibi global şirketlerle çalışmış.',
      linkedinUrl: 'https://linkedin.com/in/murat-demir',
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member }).catch(() => {});
  }
  console.log('✅ Ekip üyeleri oluşturuldu');

  // Referanslar / Müşteri logoları
  const partners = [
    {
      name: 'TechCorp Turkey',
      imagePath: '/images/partners/techcorp.svg',
      websiteUrl: 'https://example.com',
      sortOrder: 1,
      isActive: true,
    },
    {
      name: 'İstanbul Startup Hub',
      imagePath: '/images/partners/startup-hub.svg',
      websiteUrl: 'https://example.com',
      sortOrder: 2,
      isActive: true,
    },
    {
      name: 'Digital Ventures',
      imagePath: '/images/partners/digital-ventures.svg',
      websiteUrl: 'https://example.com',
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const partner of partners) {
    await prisma.partnerLogo.create({ data: partner }).catch(() => {});
  }
  console.log('✅ Partner logoları oluşturuldu');

  // Referans yorumları
  const testimonials = [
    {
      name: 'Ali Özkan',
      company: 'KargoExpress A.Ş.',
      title: 'Genel Müdür',
      quote: 'Arillasoft ile çalışmak, lojistik operasyonlarımızı kökten dönüştürdü. Geliştirdikleri sistem sayesinde hem maliyetlerimizi düşürdük hem de müşteri memnuniyetimizi önemli ölçüde artırdık. Teknik ekibin uzmanlığı ve iletişim kalitesi beklentilerimizin çok üzerindeydi.',
      sortOrder: 1,
      isActive: true,
    },
    {
      name: 'Dr. Fatma Şahin',
      company: 'Medikal Group',
      title: 'Bilgi Teknolojileri Müdürü',
      quote: 'Sağlık sektöründeki veri güvenliği gereksinimlerimizi tam olarak anlayan ve KVKK uyumlu bir sistem geliştiren Arillasoft ekibine minnettarız. Proje zamanında teslim edildi, bütçe aşımı yaşanmadı ve destek süreçleri kusursuz işliyor.',
      sortOrder: 2,
      isActive: true,
    },
    {
      name: 'Burak Yıldız',
      company: 'ModaGroup Istanbul',
      title: 'E-Ticaret Direktörü',
      quote: 'Headless e-ticaret mimarisine geçiş kararımızı doğru danışmanlıkla verebildik. Sayfa hızı ve dönüşüm oranındaki iyileşmeler, yatırımımızın karşılığını ilk çeyrekte aldığımızı gösterdi. Uzun vadeli bir teknoloji ortağı bulduğumuzu düşünüyorum.',
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial }).catch(() => {});
  }
  console.log('✅ Referans yorumları oluşturuldu');

  console.log('\n🎉 Tüm seed verileri başarıyla yüklendi!');
  console.log('📧 Admin giriş: admin@arillasoft.com / Admin123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
