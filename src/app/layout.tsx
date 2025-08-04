import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import BackToTop from "@/components/BackToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://shahproperties.com"
  ),
  title: {
    default:
      "Shah Properties - Premium Real Estate in Dehradun | Residential Plots & Properties",
    template: "%s | Shah Properties - Dehradun Real Estate",
  },
  description:
    "Find your dream property in Dehradun with Shah Properties. Premium residential plots, commercial properties, and agricultural land in prime locations like Kalyanpur, Pondha, and Dholas. Expert real estate services since 2005. Contact Roshan Singh Shah at +91-8383815279.",
  keywords: [
    "real estate Dehradun",
    "properties Dehradun",
    "residential plots Dehradun",
    "commercial properties Dehradun",
    "agricultural land Dehradun",
    "property investment Dehradun",
    "Shimla Bypass Road properties",
    "Kalyanpur properties Dehradun",
    "Pondha properties Dehradun",
    "Dholas properties Dehradun",
    "Shah Properties Dehradun",
    "Roshan Singh Shah",
    "property dealer Dehradun",
    "MDDA approved plots",
    "RERA approved properties",
    "bank loan property Dehradun",
  ],
  authors: [{ name: "Roshan Singh Shah", url: "https://shahproperties.com" }],
  creator: "Shah Properties",
  publisher: "Shah Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://shahproperties.com",
    siteName: "Shah Properties",
    title:
      "Shah Properties - Premium Real Estate in Dehradun | Residential Plots & Properties",
    description:
      "Find your dream property in Dehradun with Shah Properties. Premium residential plots, commercial properties, and agricultural land in prime locations. Expert real estate services since 2005.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shah Properties - Premium Real Estate in Dehradun",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shah Properties - Premium Real Estate in Dehradun",
    description:
      "Find your dream property in Dehradun with Shah Properties. Premium residential plots and properties.",
    images: ["/images/og-image.jpg"],
    creator: "@shahproperties",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    yahoo: process.env.YAHOO_VERIFICATION_CODE,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://shahproperties.com",
  },
  category: "Real Estate",
  classification: "Business",
  other: {
    "geo.region": "IN-UT",
    "geo.placename": "Dehradun",
    "geo.position": "30.3165;78.0322",
    ICBM: "30.3165, 78.0322",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Shah Properties",
              alternateName: "Shah Properties Dehradun",
              description:
                "Premium real estate services in Dehradun, Uttarakhand. Specializing in residential plots, commercial properties, and agricultural land.",
              url: "https://shahproperties.com",
              telephone: "+91-8383815279",
              email: "shahproperties03@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dehradun",
                addressRegion: "Uttarakhand",
                addressCountry: "IN",
                postalCode: "248001",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 30.3165,
                longitude: 78.0322,
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Dehradun",
                },
                {
                  "@type": "City",
                  name: "Kalyanpur",
                },
                {
                  "@type": "City",
                  name: "Pondha",
                },
                {
                  "@type": "City",
                  name: "Dholas",
                },
              ],
              sameAs: ["https://www.facebook.com/share/1AnqEc5BRA/"],
              founder: {
                "@type": "Person",
                name: "Roshan Singh Shah",
                jobTitle: "Founder & CEO",
                description:
                  "Retired Indian Army professional with 32 years of service",
              },
              foundingDate: "2005",
              serviceType: [
                "Residential Property Sales",
                "Commercial Property Sales",
                "Agricultural Land Sales",
                "Property Consultation",
                "Property Valuation",
              ],
              priceRange: "₹10,000 - ₹50,000 per sq yard",
              paymentAccepted: ["Cash", "Bank Transfer", "Cheque", "Bank Loan"],
              currenciesAccepted: "INR",
            }),
          }}
        />

        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Shah Properties",
              image: "https://shahproperties.com/images/logo.png",
              description: "Premium real estate services in Dehradun",
              url: "https://shahproperties.com",
              telephone: "+91-8383815279",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dehradun",
                addressRegion: "Uttarakhand",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 30.3165,
                longitude: 78.0322,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              priceRange: "₹₹",
            }),
          }}
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/image1.jpg"
          as="image"
          type="image/jpeg"
        />

        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}

        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow pt-16">{children}</div>
            <Footer />
          </div>
          <BackToTop />
        </ErrorBoundary>
      </body>
    </html>
  );
}
