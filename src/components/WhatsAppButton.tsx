"use client";

import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  floating?: boolean;
  propertyTitle?: string;
}

export default function WhatsAppButton({
  phoneNumber = "918383815279",
  message = "Hi, I'm interested in properties in Dehradun",
  className = "",
  floating = false,
  propertyTitle,
}: WhatsAppButtonProps) {
  // Create custom message based on context
  const customMessage = propertyTitle
    ? `Hi, I'm interested in "${propertyTitle}". Can you provide more details?`
    : message;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    customMessage
  )}`;

  // Handle WhatsApp click for analytics
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: propertyTitle || "general_inquiry",
      });
    }
  };

  if (floating) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 animate-bounce"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-xl" />
      <span>WhatsApp</span>
    </a>
  );
}

