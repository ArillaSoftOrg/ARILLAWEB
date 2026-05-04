import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ALL_PRODUCTS = [
  {
    title: 'QR Menü Sistemi',
    description: 'Restoran ve kafeler için dijital QR menü çözümü.',
    href: '/sektorel-yazilimlar/qr-menu',
  },
  {
    title: 'Online Randevu Sistemi',
    description: 'İşletmeler için online randevu yönetimi ve müşteri takibi.',
    href: '/sektorel-yazilimlar/randevu-sistemi',
  },
  {
    title: 'Kuaför Randevu Sistemi',
    description: 'Kuaför ve berber salonlarına özel randevu yönetimi.',
    href: '/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi',
  },
  {
    title: 'Klinik Randevu Sistemi',
    description: 'Klinik ve sağlık kurumları için hasta randevu takibi.',
    href: '/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi',
  },
  {
    title: 'Güzellik Merkezi Randevu Sistemi',
    description: 'Spa ve güzellik merkezleri için hizmet ve terapis yönetimi.',
    href: '/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi',
  },
];

interface Props {
  currentHref: string;
}

export default function SektorelCrossLinks({ currentHref }: Props) {
  const products = ALL_PRODUCTS.filter((p) => p.href !== currentHref);

  return (
    <section
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        background: '#f8fafc',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
        <div style={{ marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '10px',
            }}
          >
            Diğer Sektörel Yazılımlar
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b' }}>
            İşletmenizin farklı ihtiyaçları için diğer çözümlerimizi inceleyin.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="flex flex-col gap-2 rounded-xl border border-black/[0.08] bg-white px-[22px] py-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(37,99,235,0.09)]"
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#0f172a',
                }}
              >
                {product.title}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                {product.description}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#2563eb',
                  marginTop: '4px',
                }}
              >
                İncele <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
