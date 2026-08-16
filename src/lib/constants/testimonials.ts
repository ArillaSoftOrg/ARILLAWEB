export interface Testimonial {
  id: string;
  name: string;
  company: string;
  service: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't01',
    name: 'Emre K.',
    company: 'Nova Yapı Mimarlık',
    service: 'Kurumsal Web Sitesi',
    quote:
      'Eski sitemizde içerik değiştirmek için her seferinde teknik destek almamız gerekiyordu. Yeni sitede hizmetlerimizi, referanslarımızı ve blog içeriklerini yönetebildiğimiz bir panel hazırlandı. Artık küçük güncellemeleri kendimiz yapabiliyoruz, özellikle mobil tarafta da site çok daha düzgün çalışıyor.',
    rating: 5,
  },
  {
    id: 't02',
    name: 'Selin A.',
    company: 'Liva Beauty Studio',
    service: 'Randevu Sistemi',
    quote:
      'Randevuları uzun süre WhatsApp ve telefon üzerinden takip ettik. Aynı saate iki kişiyi yazdığımız veya iptal edilen randevuyu gözden kaçırdığımız oluyordu. Şimdi müşteriler uygun saatleri sistemden görüyor, biz de tüm günün programını tek ekrandan takip ediyoruz.',
    rating: 5,
  },
  {
    id: 't03',
    name: 'Mert D.',
    company: 'Arven Teknik',
    service: 'Yönetim Paneli',
    quote:
      'Müşteri kayıtları, ödeme durumu ve yapılan işler farklı Excel dosyalarındaydı. Bizim çalışma şeklimize göre bir yönetim paneli hazırlandı ve hepsi tek yerde toplandı. Özellikle eski bir müşterinin geçmiş işlemlerine ulaşmak artık birkaç saniye sürüyor.',
    rating: 5,
  },
  {
    id: 't04',
    name: 'Zeynep T.',
    company: 'Mono İç Mimarlık',
    service: 'Özel İş Yazılımı',
    quote:
      'Hazır programlarda bizim için gereksiz onlarca ekran vardı ama ihtiyaç duyduğumuz bazı şeyler yoktu. İş akışımızı anlattık, ona göre tekliften teslimata kadar kullandığımız özel bir sistem geliştirildi. Ekibin programa uyum sağlaması da beklediğimizden kolay oldu.',
    rating: 5,
  },
  {
    id: 't05',
    name: 'Burak Y.',
    company: 'Pera Organizasyon',
    service: 'Teklif ve Müşteri Takibi',
    quote:
      'Teklifleri Word dosyası hazırlayıp PDF’e çevirerek gönderiyorduk, hangi müşteriye ne fiyat verdiğimizi sonradan bulmak zor oluyordu. Şimdi müşteri kaydının içinden teklif oluşturuyor, eski teklifleri ve durumlarını aynı ekranda görüyoruz. Özellikle tekrar fiyat isteyen müşterilerde ciddi kolaylık sağladı.',
    rating: 5,
  },
  {
    id: 't06',
    name: 'Elif N.',
    company: 'Viona Danışmanlık',
    service: 'Kurumsal Web Sitesi',
    quote:
      'Bizim için sadece güzel görünmesi değil, hizmetlerin müşteriye anlaşılır şekilde anlatılması önemliydi. Site buna göre yeniden kurgulandı, iletişim ve teklif alma adımları da sadeleştirildi. Gelen müşterilerin “hangi hizmeti veriyorsunuz?” diye tekrar sorması belirgin şekilde azaldı.',
    rating: 5,
  },
  {
    id: 't07',
    name: 'Can B.',
    company: 'Neksan Tedarik',
    service: 'API Entegrasyonu',
    quote:
      'Siparişler bir sistemde, müşteri bilgileri başka bir sistemde tutuluyordu ve verileri elle aktarıyorduk. İki taraf arasında entegrasyon kurulduktan sonra yeni kayıtlar otomatik aktarılmaya başladı. Hem aynı işi iki kez yapmıyoruz hem de yanlış bilgi girme problemi büyük ölçüde ortadan kalktı.',
    rating: 5,
  },
  {
    id: 't08',
    name: 'Ayşe G.',
    company: 'Vera Estetik Studio',
    service: 'Randevu Sistemi',
    quote:
      'En büyük problemimiz müşterilerin randevu saatini unutmasıydı. Online randevu ekranına ek olarak randevu bilgilerini ve yaklaşan randevuları takip edebildiğimiz bir yapı oluşturuldu. Gün içinde sürekli ajandaya ve mesaj geçmişine bakmak zorunda kalmıyoruz.',
    rating: 5,
  },
  {
    id: 't09',
    name: 'Oğuz E.',
    company: 'Atlas Servis Çözümleri',
    service: 'Operasyon Paneli',
    quote:
      'Gelen taleplerin hangi aşamada olduğunu ekip içinde mesajlaşarak takip ediyorduk. Panelde talebi kimin aldığı, hangi aşamada olduğu ve tamamlanıp tamamlanmadığı görülebiliyor. Sabah işe başladığımızda herkes ne yapacağını daha net görüyor.',
    rating: 5,
  },
  {
    id: 't10',
    name: 'Derya S.',
    company: 'Mavi Ofis Tasarım',
    service: 'Teknik Destek',
    quote:
      'Site yayına çıktıktan sonra birkaç yeni hizmet ekledik ve bazı sayfalarda değişiklik ihtiyacı oluştu. Projeyi baştan yaptırmak yerine mevcut yapının üzerine geliştirmeler yapıldı. Bizim için en değerli tarafı, teslimden sonra da sistemin sahipsiz kalmaması oldu.',
    rating: 5,
  },
  {
    id: 't11',
    name: 'Kerem A.',
    company: 'Rota Lojistik',
    service: 'İş Süreci Otomasyonu',
    quote:
      'Her yeni müşteri geldiğinde aynı bilgileri farklı dosyalara ve tablolara tekrar giriyorduk. Müşteri kaydı oluşturulduğunda gerekli alanların otomatik hazırlanacağı bir akış kuruldu. Tek tek bakınca küçük işlerdi ama gün sonunda ciddi zaman alıyordu.',
    rating: 5,
  },
  {
    id: 't12',
    name: 'İrem C.',
    company: 'Lumen Danışmanlık',
    service: 'CRM Sistemi',
    quote:
      'Kullandığımız hazır CRM bizim için fazla karmaşıktı ve ekip çoğu alanı zaten kullanmıyordu. Sadece ihtiyacımız olan müşteri, görüşme, teklif ve not alanlarından oluşan daha sade bir sistem geliştirildi. Yeni başlayan biri bile kısa sürede sistemi kullanabiliyor.',
    rating: 5,
  },
  {
    id: 't13',
    name: 'Tolga M.',
    company: 'Form Yapı',
    service: 'Web + Yönetim Paneli',
    quote:
      'Web sitesini yenilerken en çok önem verdiğimiz konu içerikleri daha sonra kendimizin yönetebilmesiydi. Hizmet, proje ve sık sorulan sorular bölümleri panelden düzenlenebilir hale getirildi. Artık her metin değişikliğinde geliştiriciye ulaşmamız gerekmiyor.',
    rating: 5,
  },
  {
    id: 't14',
    name: 'Melis P.',
    company: 'Noya Eğitim',
    service: 'Müşteri Portalı',
    quote:
      'Müşteriler sürekli dosya, işlem durumu ve son güncelleme için bizi arıyordu. Kendilerine ait kullanıcı hesabından süreçlerini ve paylaşılan belgeleri görebilecekleri bir portal hazırlandı. Bizim tarafımızdaki tekrar eden bilgilendirme trafiğini ciddi şekilde azalttı.',
    rating: 5,
  },
  {
    id: 't15',
    name: 'Hakan V.',
    company: 'Vektor Ticaret',
    service: 'Stok ve Sipariş Entegrasyonu',
    quote:
      'Web üzerinden gelen siparişleri daha sonra stok tarafına manuel giriyorduk. Sipariş ile stok sistemini birbirine bağladıktan sonra ürün hareketleri otomatik işlenmeye başladı. Özellikle yoğun günlerde gözden kaçan sipariş veya yanlış stok bilgisi problemi çok azaldı.',
    rating: 5,
  },
  {
    id: 't16',
    name: 'Ece R.',
    company: 'Aura Hair Studio',
    service: 'Randevu Sistemi',
    quote:
      'Birden fazla çalışan olduğu için hangi personelin hangi saatte müsait olduğunu takip etmek zorlaşıyordu. Sistem çalışan bazlı takvim ve hizmet süresine göre uygun saatleri hesaplıyor. Müşteri aradığında artık farklı ajandaları kontrol etmiyoruz.',
    rating: 5,
  },
  {
    id: 't17',
    name: 'Onur K.',
    company: 'Delta Mühendislik',
    service: 'Performans ve Bakım',
    quote:
      'Mevcut sitemizi tamamen değiştirmek istemiyorduk ama özellikle telefonda yavaş açılıyordu. Gereksiz yükler temizlendi, bazı bölümler yeniden düzenlendi ve teknik sorunlar giderildi. Aynı tasarımı koruyup daha düzgün çalışan bir yapıya geçmek bizim için daha mantıklı oldu.',
    rating: 5,
  },
  {
    id: 't18',
    name: 'Buse Ç.',
    company: 'Kent İnsan Kaynakları',
    service: 'Personel Yönetimi',
    quote:
      'İzinler, görevler ve personelle ilgili notlar farklı yerlerde tutuluyordu. Bunları tek panelde toplayıp yetkilere göre erişim verdik. Yönetici kendi alanını görüyor, çalışan da sadece kendisini ilgilendiren bilgilere ulaşabiliyor.',
    rating: 5,
  },
  {
    id: 't19',
    name: 'Serkan F.',
    company: 'ProFix Teknik Servis',
    service: 'Servis Takip Yazılımı',
    quote:
      'Müşteriden gelen cihazları kâğıda not ederek takip ediyorduk. Cihazın ne zaman geldiği, yapılan işlem, kullanılan parça ve teslim durumu için özel bir takip ekranı hazırlandı. Müşteri aradığında dosya aramak yerine kaydı açıp doğrudan bilgi verebiliyoruz.',
    rating: 5,
  },
  {
    id: 't20',
    name: 'Nazlı Ö.',
    company: 'Linea Dekorasyon',
    service: 'Web + Teklif Sistemi',
    quote:
      'Eski iletişim formundan gelen taleplerde müşterinin ne istediğini anlamak için tekrar tekrar soru sormamız gerekiyordu. Yeni sitede hizmete göre değişen bir teklif formu hazırlandı. Talep geldiğinde proje hakkında temel bilgiler zaten elimizde oluyor ve görüşmeye daha hazırlıklı başlıyoruz.',
    rating: 5,
  },
  {
    id: 't21',
    name: 'Kaan Ş.',
    company: 'Orbit Finans Danışmanlık',
    service: 'Raporlama Otomasyonu',
    quote:
      'Haftalık rapor için birkaç farklı kaynaktan veri toplayıp Excel’de birleştiriyorduk. İhtiyacımız olan bilgileri tek ekrana getiren bir raporlama bölümü yapıldı. Özellikle ay sonlarında aynı tabloları tekrar tekrar hazırlamak zorunda kalmamak büyük rahatlık oldu.',
    rating: 5,
  },
  {
    id: 't22',
    name: 'Seda L.',
    company: 'Vesta Akademi',
    service: 'Web Uygulaması',
    quote:
      'Kullanıcıların işlem yaptığı taraf ile bizim yönettiğimiz taraf birbirinden ayrıldı. Müşteri sadece kendi kayıtlarını görüyor, biz ise admin panelinden tüm süreci yönetebiliyoruz. Yetki yapısının baştan düşünülmüş olması sonradan çok işimize yaradı.',
    rating: 5,
  },
  {
    id: 't23',
    name: 'Umut A.',
    company: 'Eksen Endüstri',
    service: 'Özel İş Yazılımı',
    quote:
      'İlk versiyonda temel ihtiyacımızı çözdük, sistemi kullanmaya başladıktan sonra eksik gördüğümüz noktalar daha net ortaya çıktı. Sonrasında raporlar ve birkaç yeni iş akışı eklendi. Yazılımın tek seferlik değil, ihtiyaç oldukça geliştirilebilir olması bizim için önemliydi.',
    rating: 5,
  },
  {
    id: 't24',
    name: 'Gizem E.',
    company: 'Northa Mobilya',
    service: 'Sipariş ve Üretim Takibi',
    quote:
      'Sipariş alındıktan sonra üretimde hangi aşamada olduğunu telefonla veya ekip içi mesajlarla soruyorduk. Şimdi sipariş açıldığında aşamalar panel üzerinden güncelleniyor ve nerede beklediği görülebiliyor. Özellikle aynı anda çok sayıda iş olduğunda kontrolü kaybetmememizi sağlıyor.',
    rating: 5,
  },
];
