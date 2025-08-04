"use client";

import { useEffect } from "react";
import { standardizePhoneForAnalytics } from "@/lib/phoneUtils";

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

// Declare gtag and dataLayer on window object
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: GoogleAnalyticsProps) {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  useEffect(() => {
    // Check if gtag is already loaded
    if (typeof window !== "undefined" && (window as any).gtag) {
      return;
    }

    // Load the gtag script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script1.onload = () => {
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          custom_property_type: "property_type",
          custom_property_location: "property_location",
          custom_property_price: "property_price",
        },
      });
    };

    script1.onerror = (error) => {
      console.error("Failed to load Google Analytics script:", error);
    };

    document.head.appendChild(script1);

    return () => {
      // Cleanup
      if (script1.parentNode) {
        script1.parentNode.removeChild(script1);
      }
    };
  }, [GA_MEASUREMENT_ID]);

  return null; // This component doesn't render anything visible
}

// Helper function to track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Helper function to track property views
export const trackPropertyView = (
  propertyId: string,
  propertyTitle: string,
  price: number,
  location: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      event_category: "property",
      event_label: propertyTitle,
      value: price,
      custom_property_type: "residential",
      custom_property_location: location,
      custom_property_price: price,
      items: [
        {
          item_id: propertyId,
          item_name: propertyTitle,
          item_category: "property",
          price: price,
          currency: "INR",
        },
      ],
    });
  }
};

// Helper function to track contact form submissions
export const trackContactForm = (formType: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "contact_form_submit", {
      event_category: "contact",
      event_label: formType,
    });
  }
};

// Helper function to track phone calls
export const trackPhoneCall = (phoneNumber: string) => {
  const standardizedPhone = standardizePhoneForAnalytics(phoneNumber);
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_call_click", {
      event_category: "contact",
      event_label: standardizedPhone,
    });
  }
};

// Helper function to track search queries
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      event_category: "engagement",
      event_label: searchTerm,
      value: resultsCount,
    });
  }
};

// Helper function to track lead qualification
export const trackQualifyLead = (leadType: string, source: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "qualify_lead", {
      event_category: "conversion",
      event_label: leadType,
      custom_lead_source: source,
      value: 1,
    });
  }
};

// Helper function to track lead conversion closure
export const trackCloseConvertLead = (leadType: string, value: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "close_convert_lead", {
      event_category: "conversion",
      event_label: leadType,
      value: value,
    });
  }
};

// Helper function to track purchases
export const trackPurchase = (
  propertyId: string,
  propertyTitle: string,
  price: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      event_category: "ecommerce",
      event_label: propertyTitle,
      value: price,
      currency: "INR",
      items: [
        {
          item_id: propertyId,
          item_name: propertyTitle,
          item_category: "property",
          price: price,
          currency: "INR",
        },
      ],
    });
  }
};

// Helper function to track page views
export const trackPageView = (url: string, title: string) => {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  ) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
};
