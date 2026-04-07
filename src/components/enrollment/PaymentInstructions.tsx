"use client";

import { useState } from "react";
import { CreditCard, ChevronDown, ChevronUp } from "lucide-react";

interface PaymentInstructionsProps {
  trainerName?: string;
  paymentAccount?: string;
  abonementName?: string;
  abonementPrice?: number;
  instructions?: string;
}

export default function PaymentInstructions({
  trainerName,
  paymentAccount,
  abonementName,
  abonementPrice,
  instructions,
}: PaymentInstructionsProps) {
  const [isOpen, setIsOpen] = useState(true); // По умолчанию открыто

  if (!instructions) return null;

  return (
    <div
      style={{
        marginTop: "20px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          background: "#f8fafc",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "500",
          color: "#1e293b",
        }}
      >
        <CreditCard size={18} />
        <span>Инструкция по оплате через ЕРИП</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div
          style={{
            padding: "20px",
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          {trainerName && abonementName && (
            <div
              style={{
                marginBottom: "16px",
                padding: "12px 16px",
                background: "#fef3c7",
                borderRadius: "8px",
                border: "1px solid #f59e0b",
              }}
            >
              <div style={{ fontSize: "14px", color: "#92400e" }}>
                <strong>Вы выбрали:</strong> {trainerName} - {abonementName}
                {abonementPrice && ` (${abonementPrice} BYN)`}
              </div>
              {paymentAccount && (
                <div
                  style={{
                    fontSize: "16px",
                    marginTop: "8px",
                    color: "#0055b7",
                  }}
                >
                  <strong>Номер счета для оплаты: {paymentAccount}</strong>
                </div>
              )}
            </div>
          )}

          {instructions && (
            <div
              style={{
                margin: "16px 0",
                padding: "12px",
                background: "#f8fafc",
                borderRadius: "8px",
              }}
              dangerouslySetInnerHTML={{ __html: instructions }}
            />
          )}
        </div>
      )}
    </div>
  );
}
