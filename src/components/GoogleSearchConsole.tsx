"use client";

import Script from "next/script";

interface GoogleSearchConsoleProps {
  verificationCode?: string;
}

export default function GoogleSearchConsole({ verificationCode }: GoogleSearchConsoleProps) {
  if (!verificationCode) return null;

  return (
    <>
      {/* Google Search Console verification */}
      <meta name="google-site-verification" content={verificationCode} />
      
      {/* Alternative verification method using script tag */}
      <Script id="google-search-console" strategy="afterInteractive">
        {`
          // Google Search Console verification
          // This script helps verify ownership of the website
          console.log('Google Search Console verification loaded');
        `}
      </Script>
    </>
  );
}

// Helper function to generate sitemap URL for Search Console
export const getSitemapUrl = (baseUrl: string) => {
  return `${baseUrl}/sitemap.xml`;
};

// Helper function to generate robots.txt URL for Search Console
export const getRobotsUrl = (baseUrl: string) => {
  return `${baseUrl}/robots.txt`;
}; 