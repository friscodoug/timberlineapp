# Hibernation Hollow Guest Portal - PRD

## Product Overview
A mobile-first Progressive Web App (PWA) serving as a digital guest portal for Hibernation Hollow Cabins, a cabin rental business in Broken Bow/Hochatown, Oklahoma.

## User Personas
- **Cabin Guests**: Visitors staying at one of three cabins who need quick access to guidebooks, local recommendations, and host contact info.
- **Property Owner**: Wants guests to have a seamless digital experience that encourages return visits and social sharing.

## Core Requirements (All Completed ✅)

### Branding
- ✅ Rustic-modern style matching hibernationhollowcabins.com
- ✅ Colors: Primary `#2F4F3E`, Secondary `#8B6A4E`, Background `#F5F3EF`

### Pages & Features

| Page | Status | Features |
|------|--------|----------|
| Welcome | ✅ | Logo, headline, Continue button |
| Cabin Selection | ✅ | 3 cabins with images (Honeydome, Bear Hug, Little Bear Tinyhouse), localStorage persistence |
| Dashboard | ✅ | Welcome banner with cabin image, 6 menu tiles with subtitles, Change cabin option |
| Digital Guidebook | ✅ | Links to external Hostfully guidebook per cabin |
| Cabin Mode | ✅ | Nature sounds (Rain, Forest, Creek), journal prompts with modal, digital detox timer (30min/1hr/2hr/4hr) with alarm, activities accordion |
| Come Back & Save | ✅ | HOLLOW10 discount code, booking link |
| Join the Pine Post | ✅ | Link to Mailchimp newsletter signup |
| Connect With Us | ✅ | Instagram & Facebook social buttons, hashtags |
| Need Help | ✅ | Call/Text host buttons, emergency info |

### PWA Configuration
- ✅ manifest.json with proper icons and theme colors
- ✅ iOS meta tags for home screen install
- ✅ Standalone display mode

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS (migrated from Expo)
- **Routing**: react-router-dom
- **State**: React Context API + localStorage
- **Backend**: FastAPI (available but currently unused)

## External Links & Integrations
- Hostfully Guidebooks: v2.hostfully.com/[cabin-slug]
- Mailchimp Newsletter: mailchi.mp/hibernationhollowcabins/...
- Instagram: instagram.com/hibernationhollowcabins/
- Facebook: facebook.com/hibernationhollowcabins/
- Booking: hibernationhollowcabins.com

## Data Structure
```typescript
// Cabin data supports adding new properties easily
interface Cabin {
  id: string;
  name: string;
  slug: string;
  image: string;
  guidebookUrl: string;
}
```

## Deployment Notes
The app is built as a standard React + Vite web application, ready for deployment on:
- Vercel (recommended - free tier with always-on)
- Netlify
- GitHub Pages

To deploy:
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build` or `yarn build`
4. Set output directory: `dist`

## Future Enhancements (Backlog)
- P2: Add new cabins (Bigfoot Tinyhouse, Incredi-Dome) - data structure already supports this
- P3: Analytics integration to track feature usage
- P3: Push notifications for check-in/check-out reminders

## Session History
- **Dec 2025**: Initial Expo/React Native build completed
- **Dec 2025**: Multiple iterations based on user feedback (cabin photos, cabin mode features, social links)
- **Dec 2025**: Full rebuild to React + Vite + Tailwind CSS for easier third-party deployment
- **Mar 2026**: Final verification and testing - all features confirmed working
