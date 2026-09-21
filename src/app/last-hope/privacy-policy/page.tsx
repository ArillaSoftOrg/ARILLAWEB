import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Last Hope – Gizlilik Politikası | ArillaSoft',
  description: 'Last Hope mobil oyununun gizlilik politikası.',
  alternates: {
    canonical: `${SITE_URL}/last-hope/privacy-policy`,
  },
};

export default function LastHopePrivacyPolicyPage() {
  return (
    <main
      style={{
        background: 'var(--paper, #FBFAF7)',
        color: 'var(--type-body, #3E382D)',
        minHeight: '100vh',
      }}
    >
      <article
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 32px)',
          fontFamily: 'var(--font-body, sans-serif)',
          lineHeight: 1.75,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display, serif)',
            color: 'var(--ink, #14110D)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            marginBottom: '8px',
            lineHeight: 1.2,
          }}
        >
          Last Hope – Gizlilik Politikası
        </h1>

        <p
          style={{
            color: 'var(--type-label, #6E6759)',
            fontSize: '14px',
            marginBottom: '40px',
          }}
        >
          Son güncelleme: 21 Eylül 2026
        </p>

        <p>
          Bu Gizlilik Politikası, ArillaSoft tarafından sunulan <strong>Last Hope</strong> mobil
          oyununun kullanıcı verilerini nasıl ele aldığını açıklamaktadır.
        </p>

        <h2 style={sectionHeadingStyle}>1. Toplanan Bilgiler</h2>
        <p>Last Hope, kullanıcılarından doğrudan kişisel bilgi talep etmez.</p>
        <p>Uygulama içerisinde:</p>
        <ul style={listStyle}>
          <li>Kullanıcı hesabı oluşturulmaz.</li>
          <li>Ad, soyad, e-posta adresi veya telefon numarası istenmez.</li>
          <li>Konum bilgisi toplanmaz.</li>
          <li>Kişiler, fotoğraflar veya diğer kişisel dosyalara erişilmez.</li>
          <li>Ödeme veya finansal bilgi doğrudan uygulama tarafından toplanmaz.</li>
        </ul>

        <h2 style={sectionHeadingStyle}>2. Oyun Verileri</h2>
        <p>
          Oyun ilerlemesi, tercihler ve oyunla ilgili bazı bilgiler cihaz üzerinde yerel olarak
          saklanabilir.
        </p>
        <p>
          Bu veriler yalnızca oyunun çalışması ve kullanıcının oyun ilerlemesinin korunması
          amacıyla kullanılır.
        </p>
        <p>Yerel olarak saklanan bu bilgiler geliştiriciye gönderilmez.</p>

        <h2 style={sectionHeadingStyle}>3. Üçüncü Taraflarla Veri Paylaşımı</h2>
        <p>
          Last Hope tarafından kişisel kullanıcı verileri toplanmadığından, bu tür bilgiler
          üçüncü taraflarla satılmaz veya paylaşılmaz.
        </p>
        <p>
          Google Play gibi uygulamanın dağıtımını sağlayan platformlar, kendi hizmetlerini
          sunabilmek amacıyla belirli teknik bilgileri kendi gizlilik politikalarına uygun
          şekilde işleyebilir.
        </p>

        <h2 style={sectionHeadingStyle}>4. Çocukların Gizliliği</h2>
        <p>Last Hope, çocuklardan bilerek kişisel bilgi toplamaz.</p>
        <p>
          Herhangi bir kişisel bilginin yanlışlıkla toplandığı tespit edilirse, söz konusu
          bilginin silinmesi için gerekli işlemler gerçekleştirilir.
        </p>

        <h2 style={sectionHeadingStyle}>5. Veri Güvenliği</h2>
        <p>
          Uygulamanın doğrudan kişisel veri toplamaması, kullanıcıların kişisel bilgilerinin
          uygulama tarafından saklanması veya işlenmesi riskini önemli ölçüde azaltmaktadır.
        </p>

        <h2 style={sectionHeadingStyle}>6. Gizlilik Politikasındaki Değişiklikler</h2>
        <p>
          Bu Gizlilik Politikası, uygulamada veya yasal gerekliliklerde meydana gelebilecek
          değişikliklere bağlı olarak güncellenebilir.
        </p>
        <p>Güncel sürüm bu sayfa üzerinden yayımlanacaktır.</p>

        <h2 style={sectionHeadingStyle}>7. İletişim</h2>
        <p>
          Bu Gizlilik Politikası ile ilgili sorularınız için ArillaSoft ile şirketin kamuya açık
          iletişim kanalları üzerinden iletişime geçebilirsiniz.
        </p>

        <p style={{ marginTop: '24px' }}>
          <strong>Geliştirici:</strong> ArillaSoft
          <br />
          <strong>Uygulama:</strong> Last Hope
          <br />
          <strong>Android paket adı:</strong>{' '}
          <code
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              background: 'var(--paper-alt, #F5F2EA)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.9em',
            }}
          >
            com.arilla.royaldecisions
          </code>
        </p>
      </article>
    </main>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display, serif)',
  color: 'var(--ink, #14110D)',
  fontSize: 'clamp(20px, 2.6vw, 24px)',
  fontWeight: 700,
  marginTop: '40px',
  marginBottom: '12px',
  lineHeight: 1.3,
};

const listStyle: React.CSSProperties = {
  paddingLeft: '20px',
  margin: '12px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};
