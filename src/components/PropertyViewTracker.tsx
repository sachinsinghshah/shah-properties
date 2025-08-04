"use client";

import { useEffect } from "react";
import { trackPropertyView } from "./GoogleAnalytics";

interface PropertyViewTrackerProps {
  propertyId: string;
  propertyTitle: string;
  price: number;
  location: string;
}

export default function PropertyViewTracker({
  propertyId,
  propertyTitle,
  price,
  location,
}: PropertyViewTrackerProps) {
  useEffect(() => {
    // Track property view when component mounts
    trackPropertyView(propertyId, propertyTitle, price, location);
  }, [propertyId, propertyTitle, price, location]);

  return null; // This component doesn't render anything
} 