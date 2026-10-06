/**
 * BRAND CONFIGURATION FILE
 * ========================
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
  name: 'Pine Acres Glamping',
  shortName: 'Pine Acres',
  tagline: 'Your glamping adventure awaits.',
  description: 'Digital guest portal for Pine Acres Glamping',
  location: 'Broken Bow, Oklahoma',
  
  // Welcome page
  welcomeHeadline: 'Welcome to Pine Acres Glamping',
  welcomeSubtext: 'Select your accommodation to unlock your guest portal.',
  
  // Cabin Mode branding
  cabinModeTagline: 'a guided stay experience brought to you by',
  
  // Come Back page
  comeBackHeadline: 'Come Back Soon!',
  comeBackSubtext: 'Come back to Pine Acres.',
  discountCode: 'PINEACRES10',
  discountAmount: '10% OFF',
  bookingUrl: 'https://www.pineacresglamping.com',
  
  // Other Properties page (sister properties)
  otherPropertiesTitle: 'Our Other Properties',
  otherPropertiesDescription: 'Explore more unique stays from our family of properties. Each location offers the same quality and attention to detail you\'ve experienced at Pine Acres Glamping.',
  sisterProperties: [
    {
      name: 'Hibernation Hollow Cabins',
      description: 'Cozy cabin retreats in the Ouachita Mountains',
      url: 'https://www.hibernationhollowcabins.com',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
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
  logo: '/pine-acres-logo.png',
  
  // Cabin Mode logo
  cabinModeLogo: '/cabin-mode-logo.png',
  
  // Favicon/App icon (used in manifest.json and index.html)
  favicon: '/pine-acres-logo.png',
  appIcon192: '/pine-acres-logo.png',
  appIcon512: '/pine-acres-logo.png',
};

// ===========================================
// CONTACT INFORMATION
// ===========================================
export const CONTACT = {
  // Host info
  hostName: 'Douglas Rice',
  phone: '214-430-3956',
  email: 'doug@hibernationhollowcabins.com',
  
  // Social media
  instagram: 'https://www.instagram.com/pineacresglamping/',
  instagramHandle: '@pineacresglamping',
  facebook: 'https://www.facebook.com/pineacresglamping/',
  facebookName: 'Pine Acres Glamping',
  
  // Website
  website: 'https://www.pineacresglamping.com',
  
  // Newsletter
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
    name: "Bigfoot's Tinyhouse",
    slug: 'bigfoot',
    image: 'https://customer-assets.emergentagent.com/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/2sn67a4f_IMG_3270.JPG',
    guidebookUrl: 'https://v2.hostfully.com/bigfoot',
  },
  {
    id: '2',
    name: 'The Incredi-dome',
    slug: 'incredi-dome',
    image: 'https://customer-assets.emergentagent.com/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/hqp3ck81_IMG_3278.JPG',
    guidebookUrl: 'https://v2.hostfully.com/incredi-dome',
  },
  {
    id: '3',
    name: 'The Sereni-Dome',
    slug: 'sereni-dome',
    image: 'https://customer-assets.emergentagent.com/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/kdjw9jx5_6-web-or-mls-DJI_0284.jpg',
    guidebookUrl: 'https://hostful.ly/sereni-dome',
  },
  {
    id: '4',
    name: 'The Starview Cabin',
    slug: 'starview-cabin',
    image: 'https://customer-assets.emergentagent.com/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/ngq4mc6t_DSC_7791.jpg',
    guidebookUrl: 'https://hostful.ly/starviewcabin',
  },
];

// ===========================================
// LOCATION & WEATHER
// ===========================================
export const LOCATION = {
  // For weather API
  latitude: 34.17,
  longitude: -94.76,
  cityName: 'Hochatown',
  stateName: 'Oklahoma',
  
  // Display
  displayLocation: 'Broken Bow, Oklahoma',
};

// ===========================================
// APP METADATA (for index.html & manifest.json)
// ===========================================
export const APP_META = {
  title: 'Pine Acres Glamping Guest Portal',
  description: 'Pine Acres Glamping Guest Portal - Your guide to glamping in Broken Bow',
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
