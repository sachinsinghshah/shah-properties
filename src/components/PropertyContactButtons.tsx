"use client";

import { FaPhone, FaEnvelope, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { trackPhoneCall } from "./GoogleAnalytics";
import { standardizePhoneForAnalytics } from "@/lib/phoneUtils";

interface PropertyContactButtonsProps {
  property: {
    title: string;
    agent: {
      phone: string;
      email: string;
      facebook?: string;
    };
  };
}

export default function PropertyContactButtons({
  property,
}: PropertyContactButtonsProps) {
  return (
    <div className="space-y-4 mb-8">
      <a
        href={`tel:${property.agent.phone}`}
        className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        onClick={() =>
          trackPhoneCall(standardizePhoneForAnalytics(property.agent.phone))
        }
      >
        <FaPhone className="mr-3 text-lg" />
        Call Now
      </a>
      <a
        href={`https://wa.me/91${property.agent.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        onClick={() =>
          trackPhoneCall(
            standardizePhoneForAnalytics(`WhatsApp:${property.agent.phone}`)
          )
        }
      >
        <FaWhatsapp className="mr-3 text-lg" />
        WhatsApp
      </a>
      <a
        href={`mailto:${property.agent.email}?subject=Inquiry about ${property.title}`}
        className="flex items-center justify-center border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold"
      >
        <FaEnvelope className="mr-3 text-lg" />
        Send Email
      </a>
      {property.agent.facebook && (
        <a
          href={property.agent.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <FaFacebook className="mr-3 text-lg" />
          Facebook
        </a>
      )}
    </div>
  );
}
