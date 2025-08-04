// Phone number utilities for consistent formatting across the application

// Standard phone number for Shah Properties
export const SHAH_PROPERTIES_PHONE = "8383815279";
export const SHAH_PROPERTIES_PHONE_WITH_COUNTRY = "+918383815279";
export const SHAH_PROPERTIES_PHONE_DISPLAY = "+91 83838 15279";

/**
 * Standardizes phone number format for analytics tracking
 * @param phoneNumber - The phone number to standardize
 * @returns Standardized phone number format
 */
export function standardizePhoneForAnalytics(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // If it's a WhatsApp number, preserve the WhatsApp prefix
  if (phoneNumber.toLowerCase().includes('whatsapp')) {
    return `WhatsApp:${SHAH_PROPERTIES_PHONE_WITH_COUNTRY}`;
  }
  
  // For Shah Properties phone number, use consistent format
  if (digitsOnly === SHAH_PROPERTIES_PHONE || 
      digitsOnly === SHAH_PROPERTIES_PHONE_WITH_COUNTRY.replace(/\D/g, '')) {
    return SHAH_PROPERTIES_PHONE_WITH_COUNTRY;
  }
  
  // For other numbers, return as is
  return phoneNumber;
}

/**
 * Gets the standardized phone number for Shah Properties
 * @returns Standardized phone number
 */
export function getShahPropertiesPhone(): string {
  return SHAH_PROPERTIES_PHONE_WITH_COUNTRY;
}

/**
 * Gets the WhatsApp link for Shah Properties
 * @returns WhatsApp phone number with prefix
 */
export function getShahPropertiesWhatsApp(): string {
  return `WhatsApp:${SHAH_PROPERTIES_PHONE_WITH_COUNTRY}`;
} 