import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Shah Properties - Premium Real Estate in Dehradun",
    template: "%s | Shah Properties",
  },
  description:
    "Find your dream property in Dehradun with Shah Properties. We offer residential plots, commercial properties, and agricultural land in prime locations. Expert real estate services since 2005.",
  keywords: [
    "real estate Dehradun",
    "properties Dehradun",
    "residential plots Dehradun",
    "commercial properties",
    "agricultural land",
    "property investment",
    "Shimla Bypass Road",
    "Kalyanpur properties",
    "Shah Properties",
  ],
  authors: [{ name: "Shah Properties" }],
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
    title: "Shah Properties - Premium Real Estate in Dehradun",
    description:
      "Find your dream property in Dehradun with Shah Properties. Expert real estate services since 2005.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shah Properties - Real Estate in Dehradun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shah Properties - Premium Real Estate in Dehradun",
    description: "Find your dream property in Dehradun with Shah Properties.",
    images: ["/images/og-image.jpg"],
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
    google: process.env.GOOGLE_VERIFICATION_CODE, // Will be loaded from .env.local
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
              description: "Premium real estate services in Dehradun",
              url: "https://shahproperties.com",
              telephone: "+91-8383815279",
              email: "shahproperties03@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dehradun",
                addressRegion: "Uttarakhand",
                addressCountry: "IN",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Dehradun",
                },
                {
                  "@type": "City",
                },
              ],
              sameAs: ["https://www.facebook.com/share/1AnqEc5BRA/"],
            }),
          }}
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
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
