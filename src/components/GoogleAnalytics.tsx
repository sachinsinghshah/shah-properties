"use client";

import { useEffect } from "react";

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

// Declare gtag and dataLayer on window object
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  useEffect(() => {
    // Check if gtag is already loaded
    if (typeof window !== 'undefined' && (window as any).gtag) {
      return;
    }

    // Load the gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script1.onload = () => {
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_property_type': 'property_type',
          'custom_property_location': 'property_location',
          'custom_property_price': 'property_price'
        }
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
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Helper function to track property views
export const trackPropertyView = (propertyId: string, propertyTitle: string, price: number, location: string) => {
  trackEvent('view_item', 'property', propertyTitle, price);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      event_category: 'property',
      event_label: propertyTitle,
      value: price,
      custom_property_type: 'residential',
      custom_property_location: location,
      custom_property_price: price,
      items: [{
        item_id: propertyId,
        item_name: propertyTitle,
        item_category: 'property',
        price: price,
        currency: 'INR'
      }]
    });
  }
};

// Helper function to track contact form submissions
export const trackContactForm = (formType: string) => {
  trackEvent('form_submit', 'contact', formType);
};

// Helper function to track phone calls
export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent('phone_call', 'contact', phoneNumber);
};

// Helper function to track search queries
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', 'engagement', searchTerm, resultsCount);
};

// Helper function to track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
}; 