"use client";

import { useState, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const QUICK_OPTIONS = [
  { label: "Ön Görüşme Al", message: "Merhaba, ön görüşme almak istiyorum." },
  { label: "Hizmet Hakkında Bilgi", message: "Hizmetleriniz hakkında detaylı bilgi almak istiyorum." },
  { label: "Fiyat Talep Et", message: "Lütfen hizmetlerinizin fiyatlandırması hakkında bilgi veriniz." },
];

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendToWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/905422535192?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      sendToWhatsApp(message);
    }
  };

  const handleQuickOption = (text: string) => {
    sendToWhatsApp(text);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
          border: "none",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
          zIndex: 50,
          transition: "all 0.3s ease",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.35)";
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            width: "min(320px, calc(100vw - 32px))",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            boxShadow: "0 24px 56px rgba(0,0,0,0.15)",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            maxHeight: "70vh",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "#1f2937",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Arilla Soft Destek
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessage("");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#d1d5db",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#d1d5db";
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "16px 14px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: "#ffffff",
            }}
          >
            {/* Timestamp */}
            <div
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "#9ca3af",
                marginBottom: "4px",
              }}
            >
              Bugün
            </div>

            {/* Assistant bubble */}
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: "#f3f4f6",
                fontSize: "13px",
                color: "#4b5563",
                lineHeight: 1.6,
                marginBottom: "4px",
              }}
            >
              Merhaba. Ben Arilla Soft sanal destek asistanıyım. Size doğru şekilde yardımcı olabilmem için aşağıdaki seçeneklerden birini seçebilir veya mesajınızı yazabilirsiniz.
            </div>

            {/* Quick option buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {QUICK_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleQuickOption(option.message)}
                  style={{
                    padding: "9px 14px",
                    borderRadius: "20px",
                    background: "#ffffff",
                    border: "1px solid #d1d5db",
                    color: "#374151",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = "#f9fafb";
                    btn.style.borderColor = "#9ca3af";
                    btn.style.color = "#1f2937";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = "#ffffff";
                    btn.style.borderColor = "#d1d5db";
                    btn.style.color = "#374151";
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input section */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "8px",
              background: "#ffffff",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Mesajınızı yazın..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d1d5db",
                color: "#1f2937",
                fontSize: "13px",
                outline: "none",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#7c3aed";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(124,58,237,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                background: message.trim() ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "#d1d5db",
                border: "none",
                color: "white",
                cursor: message.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (message.trim()) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(124,58,237,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (message.trim()) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
