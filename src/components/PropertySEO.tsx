"use client";

import { useEffect } from "react";

interface PropertySEOProps {
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    area: {
      value: number;
      unit: string;
    };
    type: string;
    category: string;
    images: string[];
    videoUrl?: string;
    agent: {
      name: string;
      phone: string;
      email: string;
    };
    postedDate: string;
    features: string[];
    amenities: string[];
  };
}

export default function PropertySEO({ property }: PropertySEOProps) {
  useEffect(() => {
    // Add structured data to the page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: property.title,
      description: property.description,
      image: property.images,
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "RealEstateAgent",
          name: property.agent.name,
          telephone: property.agent.phone,
          email: property.agent.email,
        },
      },
      brand: {
        "@type": "Brand",
        name: "Shah Properties",
      },
      category: property.category,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Location",
          value: property.location,
        },
        {
          "@type": "PropertyValue",
          name: "Area",
          value: `${property.area.value} ${property.area.unit}`,
        },
        {
          "@type": "PropertyValue",
          name: "Property Type",
          value: property.type,
        },
      ],
    };

    // Add RealEstateListing structured data
    const realEstateData = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.title,
      description: property.description,
      image: property.images,
      datePosted: property.postedDate,
      price: property.price,
      priceCurrency: "INR",
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location.split(",")[0],
        addressRegion: "Dehradun",
        addressCountry: "IN",
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.area.value,
        unitText: property.area.unit,
      },
      numberOfRooms: property.type === "residential" ? "3" : "1",
      realEstateAgent: {
        "@type": "RealEstateAgent",
        name: property.agent.name,
        telephone: property.agent.phone,
        email: property.agent.email,
      },
    };

    // Add LocalBusiness structured data for the agent
    const agentData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: property.agent.name,
      description: `Real estate agent at Shah Properties specializing in ${property.type} properties in ${property.location}`,
      telephone: property.agent.phone,
      email: property.agent.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "City",
        name: "Dehradun",
      },
      serviceType: "Real Estate Agent",
    };

    // Add FAQ structured data
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the price of ${property.title}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The price of this property is ${new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(property.price)}.`,
          },
        },
        {
          "@type": "Question",
          name: `Where is ${property.title} located?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `This property is located in ${property.location}, Dehradun, Uttarakhand.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the area of ${property.title}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The area of this property is ${property.area.value} ${property.area.unit}.`,
          },
        },
      ],
    };

    // Add all structured data to the page
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify([
      structuredData,
      realEstateData,
      agentData,
      faqData,
    ]);
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [property]);

  return null; // This component doesn't render anything visible
} 