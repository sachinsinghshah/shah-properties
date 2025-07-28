"use client";

import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      <Link 
        href="/" 
        className="flex items-center hover:text-emerald-600 transition-colors duration-200"
        aria-label="Go to homepage"
      >
        <FaHome className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <FaChevronRight className="w-3 h-3 text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-emerald-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Helper function to generate breadcrumbs for property pages
export function getPropertyBreadcrumbs(propertyTitle: string, propertyId: string) {
  return [
    { label: "Properties", href: "/properties" },
    { label: propertyTitle },
  ];
}

// Helper function to generate breadcrumbs for location pages
export function getLocationBreadcrumbs(location: string) {
  return [
    { label: "Properties", href: "/properties" },
    { label: location },
  ];
}

// Helper function to generate breadcrumbs for category pages
export function getCategoryBreadcrumbs(category: string) {
  return [
    { label: "Properties", href: "/properties" },
    { label: category },
  ];
} 