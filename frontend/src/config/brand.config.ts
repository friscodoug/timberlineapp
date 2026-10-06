/**
 * BRAND CONFIGURATION FILE - TIMBERLINE STAYS
 * ============================================
 * 
 * To rebrand this app for a different property:
 * 1. Update all values in this file
 * 2. Replace logo files in /public folder
 * 3. Update index.html meta tags and manifest.json
 * 
 * This is the SINGLE SOURCE OF TRUTH for all brand-specific content.
 */

// ===========================================
// BRAND IDENTITY
// ===========================================
export const BRAND = {
  // Core brand info
  name: 'Timberline Stays',
  shortName: 'Timberline',
  tagline: 'Your guide to adventure.',
  description: 'Digital guest portal for Timberline Stays',
  location: 'Hochatown & Broken Bow, Oklahoma',
  
  // Welcome page
  welcomeHeadline: 'Welcome to Timberline Stays',
  welcomeSubtext: 'Select your cabin to unlock your guest portal.',
  
  // Cabin Mode branding
  cabinModeTagline: 'a guided stay experience brought to you by',
  
  // Come Back page
  comeBackHeadline: 'Come Back Soon!',
  comeBackSubtext: 'Come back to Timberline Stays.',
  discountCode: 'TIMBERLINE10',
  discountAmount: '10% OFF',
  bookingUrl: 'https://www.timberlinestays.com',
  
  // Other Properties page (sister properties)
  otherPropertiesTitle: 'Our Other Properties',
  otherPropertiesDescription: 'Explore more unique stays from our family of properties. Each location offers the same quality and attention to detail you\'ve experienced at Timberline Stays.',
  sisterProperties: [
    {
      name: 'Hibernation Hollow Cabins',
      description: 'Cozy cabin retreats including the Honeydome, Bear Hug, and Little Bear Tinyhouse',
      url: 'https://www.hibernationhollowcabins.com',
      image: 'https://customer-assets.emergentagent.com/job_9548fa8e-ba19-4435-b9f5-e400e160c6c7/artifacts/7yjce6m0_Dome%20Cover%20final.jpg',
    },
  ],
};

// ===========================================
// COLORS & THEME
// ===========================================
export const COLORS = {
  // Primary brand colors
  primary: '#2F4F3E',      // Forest green - main buttons, headers
  secondary: '#8B6A4E',    // Warm brown - accents, secondary buttons
  
  // Background colors
  background: '#F5F3EF',   // Cream/off-white - page backgrounds
  cardBackground: '#FFFFFF',
  
  // Text colors
  text: '#2B2B2B',         // Dark gray - main text
  textLight: '#64748b',    // Light gray - secondary text
  
  // Utility colors
  white: '#FFFFFF',
  lightGray: '#E8E6E2',
  success: '#4CAF50',
  error: '#E74C3C',
  warning: '#F59E0B',
  
  // Feature-specific colors
  campfireOrange: '#C25E2D',
  cabinModeGreen: '#4A7C59',
  weatherBlue: '#5A9BD5',
};

// ===========================================
// LOGOS & IMAGES
// ===========================================
export const IMAGES = {
  // Main logo (should have transparent background)
  logo: '/timberline-logo.png',
  
  // Cabin Mode logo
  cabinModeLogo: '/cabin-mode-logo.png',
  
  // Favicon/App icon (used in manifest.json and index.html)
  favicon: '/timberline-logo.png',
  appIcon192: '/timberline-logo.png',
  appIcon512: '/timberline-logo.png',
};

// ===========================================
// CONTACT INFORMATION
// ===========================================
export const CONTACT = {
  // Host info
  hostName: 'Douglas Rice',
  phone: '580-257-8371',
  email: 'doug@timberlinestays.com',
  
  // Social media (using Hibernation Hollow for now)
  instagram: 'https://www.instagram.com/hibernationhollowcabins/',
  instagramHandle: '@hibernationhollowcabins',
  facebook: 'https://www.facebook.com/hibernationhollowcabins/',
  facebookName: 'Hibernation Hollow Cabins',
  
  // Website
  website: 'https://www.timberlinestays.com',
  
  // Newsletter (using The Pine Post)
  newsletterName: 'The Pine Post',
  newsletterUrl: 'https://mailchi.mp/hibernationhollowcabins/5lrqskfq6o',
  newsletterDescription: 'Get exclusive deals, local tips, and cabin updates delivered to your inbox.',
};

// ===========================================
// PROPERTIES / CABINS
// ===========================================
export interface Property {
  id: string;
  name: string;
  slug: string;
  image: string;
  guidebookUrl: string;
}

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Rocky Creek Cabin',
    slug: 'rocky-creek',
    image: 'https://customer-assets-jt897jd0.emergentagent.net/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/5c254be4bdd87927_DJI_0771%202.webp',
    guidebookUrl: 'https://hostful.ly/rockycreek',
  },
  {
    id: '2',
    name: 'Champagne Bliss Cabin',
    slug: 'champagne-bliss',
    image: 'https://customer-assets-jt897jd0.emergentagent.net/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/1d9716c03e7d0343_DJI_0241%202.webp',
    guidebookUrl: 'https://hostful.ly/champagnebliss',
  },
];

// ===========================================
// LOCATION & WEATHER
// ===========================================
export const LOCATION = {
  // For weather API (Hochatown, OK)
  latitude: 34.17,
  longitude: -94.76,
  cityName: 'Hochatown',
  stateName: 'Oklahoma',
  
  // Display
  displayLocation: 'Hochatown & Broken Bow, Oklahoma',
};

// ===========================================
// APP METADATA (for index.html & manifest.json)
// ===========================================
export const APP_META = {
  title: 'Timberline Stays Guest Portal',
  description: 'Timberline Stays Guest Portal - Your guide to adventure in Broken Bow',
  themeColor: '#2F4F3E',
  backgroundColor: '#F5F3EF',
};


// ===========================================
// LEGACY EXPORTS (for backward compatibility)
// ===========================================
// These are exported to maintain compatibility with existing imports
// New code should import from BRAND, COLORS, IMAGES, etc. directly

export const CABINS = PROPERTIES;
export const LOGO_URL = IMAGES.logo;
export const CABIN_MODE_LOGO_URL = IMAGES.cabinModeLogo;
