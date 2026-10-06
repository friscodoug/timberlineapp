# Cabin Mode Guest Portal - Rebranding Guide

This app is designed to be easily rebranded for different cabin/glamping properties.

## Quick Start: How to Rebrand

### Step 1: Update the Brand Configuration

Open `/src/config/brand.config.ts` and update the following sections:

```typescript
// ===========================================
// BRAND IDENTITY
// ===========================================
export const BRAND = {
  name: 'Your Property Name',           // e.g., "Timberline Stays"
  shortName: 'Timberline',              // Short name for hashtags
  tagline: 'Your tagline here.',
  welcomeHeadline: 'Welcome to Timberline Stays',
  discountCode: 'TIMBERLINE10',
  // ... etc
};

// ===========================================
// COLORS & THEME
// ===========================================
export const COLORS = {
  primary: '#2F4F3E',      // Your primary brand color
  secondary: '#8B6A4E',    // Your accent color
  background: '#F5F3EF',   // Page background
  // ... etc
};

// ===========================================
// PROPERTIES / CABINS
// ===========================================
export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: "Cabin Name",
    slug: 'cabin-slug',
    image: 'https://your-image-url.jpg',
    guidebookUrl: 'https://your-guidebook-url',
  },
  // Add more properties...
];
```

### Step 2: Replace Logo Files

1. Replace `/public/pine-acres-logo.png` with your new logo (transparent background recommended)
2. Replace `/public/cabin-mode-logo.png` if you want a custom Cabin Mode logo
3. Update `IMAGES` section in `brand.config.ts` with new file paths

### Step 3: Update PWA Metadata

Update these files with your brand info:

**`/index.html`:**
- `<title>` tag
- `<meta name="description">`
- `<meta name="apple-mobile-web-app-title">`
- Favicon and apple-touch-icon links

**`/public/manifest.json`:**
- `name` and `short_name`
- `description`
- `theme_color` and `background_color`
- Icon URLs

### Step 4: Update CSS Variables (Optional)

If you need to change colors in CSS files, search for these hex codes and replace:
- `#2F4F3E` - Primary (forest green)
- `#8B6A4E` - Secondary (brown)
- `#F5F3EF` - Background (cream)

Most colors are already pulled from `brand.config.ts` via the COLORS export.

---

## File Structure

```
/src
├── config/
│   └── brand.config.ts    # ← MAIN CONFIG FILE (edit this!)
├── data/
│   ├── cabins.ts          # Re-exports from brand.config
│   └── campfire.ts        # Games & stories (customize if needed)
├── context/
│   └── CabinContext.tsx   # Property selection state
├── pages/
│   └── *.tsx              # All pages use brand.config
└── styles/
    └── theme.ts           # Re-exports COLORS from brand.config
```

---

## Deployment

This is a standard Vite + React app. Deploy to:

**Vercel (Recommended):**
1. Push to GitHub
2. Import to Vercel
3. Build command: `yarn build`
4. Output directory: `dist`

**Other platforms:** Netlify, GitHub Pages, or any static hosting.

---

## Tips

1. **Keep branding consistent** - Update ALL text in `brand.config.ts` to avoid mixed branding
2. **Test on mobile** - This is a mobile-first PWA
3. **Logo transparency** - Use transparent PNG for best results
4. **Sister properties** - Add links to related properties in `BRAND.sisterProperties`
