# Pine Acres Glamping Guest Portal - PRD

## Product Overview
A mobile-first Progressive Web App (PWA) serving as a digital guest portal for Pine Acres Glamping, a glamping property business in Broken Bow/Hochatown, Oklahoma.

## User Personas
- **Glamping Guests**: Visitors staying at one of four properties who need quick access to guidebooks, local recommendations, and host contact info.
- **Property Owner**: Wants guests to have a seamless digital experience that encourages return visits, social sharing, and family engagement.

## Core Requirements

### Branding
- ✅ Rustic-modern glamping style
- ✅ Colors: Primary `#2F4F3E`, Secondary `#8B6A4E`, Background `#F5F3EF`
- ✅ Pine Acres Glamping logo and branding throughout

### Pages & Features

| Page | Status | Features |
|------|--------|----------|
| Welcome | ✅ | Logo, headline, Cabin Mode logo integration, Continue button |
| Cabin Selection | ✅ | 4 properties (Bigfoot's Tinyhouse, The Incredi-dome, The Sereni-Dome, The Starview Cabin), localStorage persistence |
| Dashboard | ✅ | Welcome banner with property image, 9 menu tiles with icons/subtitles, Change cabin option |
| Digital Guidebook | ✅ | Links to external Hostfully guidebook per property |
| Weather | ✅ | Live 5-day forecast from Open-Meteo API, current conditions, weather tips |
| Cabin Mode | ✅ | Nature sounds (Rain, Forest, Creek), journal with prompts & timer (5/10/15/20 min), digital detox timer (30min/1hr/2hr/4hr) with alarm, activities accordion, Cabin Mode logo |
| **Campfire Mode** | ✅ | **NEW** - Family entertainment feature with games & narrated stories |
| Come Back & Save | ✅ | Discount code, booking link |
| Join the Pine Post | ✅ | Link to Mailchimp newsletter signup |
| Our Other Properties | ✅ | Link to Hibernation Hollow sister property |
| Connect With Us | ✅ | Instagram & Facebook social buttons |
| Need Help | ✅ | Call/Text host buttons, emergency info |

### Campfire Mode Features (NEW - Apr 2026)
- **Family Games Tab**: 7 interactive games with full instructions
  - Two Truths and a Lie (3+ players)
  - One-Sentence Story Chain (2+ players)
  - 20 Questions (2+ players)
  - Would You Rather (2+ players)
  - Categories (3+ players)
  - Campfire I Spy (2+ players)
  - Name That Tune (3+ players)
- **Stories Tab**: 9 campfire stories across 3 categories
  - Family-Friendly (3 stories)
  - Scary (3 stories)
  - Local Folklore (3 stories about Oklahoma legends)
- **Audio Narration**: Web Speech API integration
  - Listen/Pause/Resume/Stop controls
  - Voice picker for different voices
- **Bottom-sheet Modal**: Stories open in mobile-friendly modal

### PWA Configuration
- ✅ manifest.json with proper icons and theme colors
- ✅ iOS meta tags for home screen install
- ✅ Standalone display mode

## Tech Stack
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Routing**: react-router-dom
- **State**: React Context API + localStorage
- **Weather API**: Open-Meteo (free, no API key required)
- **Audio Narration**: Web Speech API (SpeechSynthesis)
- **Backend**: FastAPI (available but currently unused)

## External Integrations
- Hostfully Guidebooks for property information
- Open-Meteo API for weather data
- Web Speech API for story narration (built into browsers)

## Data Files
- `/src/data/cabins.ts` - Property configuration
- `/src/data/campfire.ts` - Games and stories content

## Deployment
**Ready for Vercel deployment** - Pure React + Vite SPA

Build settings:
- Build command: `yarn build`
- Output directory: `dist`
- `vercel.json` configured for SPA routing

**Important**: No Expo/React Native dependencies - clean web stack

## Future Enhancements (Backlog)
- P2: Additional properties as business grows
- P2: Offline caching for stories (service worker)
- P3: Analytics integration
- P3: Push notifications for check-in reminders
- P3: Guest reviews/testimonials page

## Session History
- **Dec 2025**: Initial Hibernation Hollow app built with Expo
- **Dec 2025**: Migrated to React + Vite for Vercel deployment
- **Apr 2026**: Pivoted to Pine Acres Glamping branding
- **Apr 2026**: Added Weather tile with Open-Meteo integration
- **Apr 2026**: Added 4 Pine Acres properties
- **Apr 2026**: Added Cabin Mode logo integration
- **Apr 2026**: Added Campfire Mode with games and narrated stories

## Files of Reference
- `/app/frontend/src/App.tsx` - Routes configuration
- `/app/frontend/src/pages/CampfireMode.tsx` - Campfire Mode component
- `/app/frontend/src/pages/CampfireMode.css` - Campfire Mode styles
- `/app/frontend/src/data/campfire.ts` - Games and stories data
- `/app/frontend/src/pages/Dashboard.tsx` - Dashboard with all tiles
- `/app/frontend/src/pages/CabinMode.tsx` - Cabin Mode with journal & sounds
