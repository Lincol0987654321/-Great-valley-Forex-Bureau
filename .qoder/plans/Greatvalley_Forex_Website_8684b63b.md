# Greatvalley Forex Bureau Website Plan

## Overview
Create a premium, production-ready multi-page website for Greatvalley Forex Bureau Limited with 6 HTML pages, shared CSS/JS files, and live exchange rate API integration.

## File Structure
- `index.html` - Home page with hero, services, rates
- `about.html` - Company information and history
- `services.html` - Detailed service offerings
- `rates.html` - Dedicated live rates page
- `contact.html` - Contact information and form
- `style.css` - Shared CSS with design system
- `script.js` - JavaScript for API, animations, and interactions

## Design System Implementation
- Primary color: `#0B1F3A` (deep navy)
- Accent color: `#D4AF37` (gold)
- Background: `#f5f7fa` (light grey/white)
- Font: Poppins from Google Fonts
- Glassmorphism navbar with blur effect
- Rounded corners (12px-16px)
- Spacious layout with 80px-100px section padding
- Professional typography hierarchy

## Header/Navigation
- Sticky navbar with logo on left, navigation on right
- Mobile hamburger menu (slide-in from right)
- Smooth hover underline animation for links
- Consistent across all pages

## Page-Specific Requirements

### index.html (Home)
- Full-screen hero section with background image and dark overlay
- Headline: "Secure & Reliable Forex Services"
- Subtext explaining trust and speed
- CTA button (Contact Us)
- Services section with 3 premium cards (Currency Exchange, Money Transfers, Business Forex Solutions)
- Rates preview section

### about.html
- Company history and mission
- Regulatory compliance information (Reserve Bank of Malawi)
- Team/profile section
- Trust indicators and certifications

### services.html
- Detailed service descriptions for all three services
- Service-specific features and benefits
- Visual icons for each service
- Testimonials or client logos

### rates.html
- Dedicated live exchange rates page
- Styled table with rounded edges and centered layout
- LIVE exchange rates using ExchangeRate-API
- Currency conversion: USD, GBP, EUR, ZAR → MWK
- Margin logic: BUY = rate - 20, SELL = rate + 20
- Disclaimer: "Rates are indicative and subject to change."

### contact.html
- Phone number, email, physical address (Blantyre, Malawi)
- WhatsApp button with clickable link
- Google Maps embed
- Contact form with validation
- Business hours

## API Integration
- Use ExchangeRate-API (free tier) for live currency rates
- Fetch data using JavaScript fetch API
- Convert all currencies to MWK
- Handle API errors gracefully with fallback rates
- Auto-refresh rates every 5 minutes

## Animations & Interactions
- AOS library for fade-up, fade-right, zoom-in animations
- Button hover lift effect
- Card hover animation (lift + shadow depth increase)
- Smooth transitions (0.3s ease)
- Smooth scrolling navigation

## Mobile Experience
- Fully responsive design (mobile-first approach)
- Hamburger menu with overlay background
- Touch-friendly spacing and tap targets
- Optimized font sizes for mobile
- Mobile-specific navigation behavior

## UX Details
- Professional business wording (no lorem ipsum)
- Clear call-to-actions throughout
- Trust-building elements (regulatory info, security badges)
- Clean footer with copyright and licensing information
- Proper semantic HTML5 structure

## Implementation Strategy
1. Create shared `style.css` with design system and responsive layout
2. Create shared `script.js` with AOS initialization and API functions
3. Build `index.html` as the foundation page
4. Create other HTML pages with consistent navigation and styling
5. Implement ExchangeRate-API integration in `script.js`
6. Add AOS animations to all sections
7. Test responsiveness and cross-browser compatibility
8. Final quality assurance and polish