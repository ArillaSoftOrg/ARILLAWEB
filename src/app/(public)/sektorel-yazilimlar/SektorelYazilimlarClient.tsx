'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { QrCode, Clock, Smile, Stethoscope, Palette, ArrowRight, CheckCircle2 } from "lucide-react";

const products = [
  {
    title: "QR Menü Sistemi",
    description: "Restoranlar ve kafe için dijital menü çözümü. QR kod aracılığıyla müşterileriniz cep telefonlarından menünüzü görüntüleyebilir.",
    href: "/sektorel-yazilimlar/qr-menu",
    icon: QrCode,
  },
  {
    title: "Randevu Sistemi",
    description: "İşletmeniz için online randevu yönetim sistemi. Müşteri takibi, randevu planlama ve otomatik hatırlatmalar.",
    href: "/sektorel-yazilimlar/randevu-sistemi",
    icon: Clock,
  },
  {
    title: "Kuaför Randevu Sistemi",
    description: "Kuaför salonları için özel olarak geliştirilmiş randevu yönetim ve müşteri takibi sistemi.",
    href: "/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi",
    icon: Palette,
  },
  {
    title: "Klinik Randevu Sistemi",
    description: "Tıbbi kurumlar için hasta yönetimi, randevu planlama ve sigorta entegrasyonu özellikleri.",
    href: "/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi",
    icon: Stethoscope,
  },
  {
    title: "Güzellik Merkezi Randevu Sistemi",
    description: "Spa ve güzellik merkezleri için hizmet paketi yönetimi ve terapis planlama sistemi.",
    href: "/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi",
    icon: Smile,
  },
];

const benefits = [
  "Ölçeklenebilir sistemler - İşletmenizin büyümesiyle birlikte geliştirilebilir",
  "Modern teknolojiler - En güncel web ve mobil teknolojileri kullanıyoruz",
  "İşletmeye özel çözümler - Sektörünüzün özel ihtiyaçlarına göre tasarlanmış",
  "Kolay kullanım - Sezgisel arayüz ve minimum eğitim gereksinimiyle",
];

export default function SektorelYazilimlarClient() {
  return (
    <div style={{ background: "#FFFFFF" }}>
      {/* Hero Section */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(59,130,246,0.03) 100%)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <div style={{ maxWidth: "700px" }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                fontSize: "48px",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#0F172A",
                marginBottom: "16px",
              }}
            >
              Sektörünüze Özel Yazılım Çözümleri
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "24px",
              }}
            >
              İşletmelere özel geliştirilmiş dijital sistemler
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#64748B",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Farklı sektörlere özel geliştirilen yazılım çözümleri ile işletmenizin dijital dönüşümünü sağlayın.
              QR Menü sistemlerinden randevu yönetim uygulamalarına kadar tüm ihtiyaçlarınız için hazır çözümlerimiz var.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <Link
                href="/teklif-al"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#FFFFFF",
                  background: "#0F172A",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                }}
              >
                Teklif Al
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ marginBottom: "60px" }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#0F172A",
                marginBottom: "12px",
              }}
            >
              Tüm Çözümlerimiz
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#64748B",
              }}
            >
              İşletmenizin ihtiyacına uygun yazılım çözümünü seçin
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  style={{
                    padding: "32px 28px",
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "#FFFFFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(37,99,235,0.2)";
                    el.style.boxShadow = "0 12px 32px rgba(37,99,235,0.12)";
                    el.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(0,0,0,0.08)";
                    el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <Icon
                      size={40}
                      style={{
                        color: "#2563EB",
                        strokeWidth: 1.5,
                      }}
                    />
                  </div>

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#0F172A",
                      marginBottom: "12px",
                    }}
                  >
                    {product.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#64748B",
                      marginBottom: "24px",
                      lineHeight: 1.6,
                    }}
                  >
                    {product.description}
                  </p>

                  <Link
                    href={product.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#2563EB",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#1E40AF";
                      const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement;
                      if (arrow) arrow.style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#2563EB";
                      const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement;
                      if (arrow) arrow.style.transform = "translateX(0)";
                    }}
                  >
                    Detayları Gör
                    <span data-arrow="" style={{ display: "inline-flex", transition: "transform 0.2s ease" }}>
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "rgba(37,99,235,0.03)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ marginBottom: "60px" }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#0F172A",
                marginBottom: "12px",
              }}
            >
              Neden Biz?
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#64748B",
              }}
            >
              ArillaSoft olarak işletmelerin dijital dönüşümüne lider kalıyoruz
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={`benefit-${benefit}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                style={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <CheckCircle2
                    size={24}
                    style={{
                      color: "#2563EB",
                      strokeWidth: 1.5,
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              textAlign: "center",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              İşletmeniz İçin En Doğru Yazılımı Birlikte Belirleyelim
            </h2>

            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#CBD5E1",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Uzman ekibimiz sektörünüz ve işletmenizin ihtiyaçlarını anlayarak en uygun çözümü sunmak için buradayız.
            </p>

            <Link
              href="/teklif-al"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                color: "#0F172A",
                background: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
              }}
            >
              Ücretsiz Teklif Al
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
