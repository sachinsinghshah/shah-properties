// Unified Property interface for the entire application
export interface Property {
  id: string; // Changed from number to string to match data
  title: string;
  description: string;
  price: number; // Changed from string to number for calculations
  pricePerSqYard: number; // Made required since it's used throughout
  location: string;
  area: {
    value: number;
    unit: string;
  }; // Changed from string to object to match actual data structure
  type: string; // residential, commercial, agricultural
  category: string; // plot, farmland, etc.
  features: string[];
  amenities: string[];
  nearbyFacilities: {
    name: string;
    distance: string;
    type: string;
  }[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    facebook?: string;
  };
  postedDate: string;
  status: string; // available, sold, etc.
}

// Contact form interface
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Mortgage calculator interface
export interface MortgageCalculation {
  propertyValue: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Error boundary state interface
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
