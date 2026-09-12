# SAARTHI 🚗🌱
## Master Specifications & Development Guide

**Share the ride. Share the journey.**
*Travel together. Travel greener.*

Saarthi is an India-focused community-based intercity carpooling platform connecting people travelling between cities with private vehicle owners who have empty seats.

---

# 1. TECHNOLOGY STACK
- HTML5, CSS3, Vanilla JavaScript
- Tailwind CSS CDN + Custom `style.css`
- LocalStorage for client-side persistence (no sensitive data)
- No frameworks (React, Vue, Angular, Next.js)

---

# 2. PROJECT STRUCTURE
```text
saarthi/
├── index.html
├── style.css
├── script.js
├── saarthi.md
└── assets/
    ├── icons/
    └── logo/
```

---

# 3. BRAND IDENTITY
- **Name**: SAARTHI (A companion or guide who travels with you)
- **Tagline**: Share the ride. Share the journey.
- **Supporting**: Travel together. Travel greener.

---

# 4. DESIGN STYLE
- Modern, Minimal, Trustworthy, Sustainable, Indian, Community-oriented.
- Generous spacing, readable typography (Plus Jakarta Sans & Inter).

---

# 5. COLOR SYSTEM
```text
Primary Green:     #16A34A
Dark Green:        #14532D
Light Green:       #DCFCE7
Very Light Green:  #F0FDF4
Background:        #F7F9F7
White:             #FFFFFF
Dark Text:         #17221B
Secondary Text:    #66736B
Border:            #E3EAE5
```

---

# 6. MULTILINGUAL SUPPORT ⭐
Supports English, हिन्दी (Hindi), and मराठी (Marathi) via a centralized translation dictionary in `script.js`. All UI elements update dynamically and choice is persisted in `localStorage`.

---

# 7. MAIN NAVIGATION
- Brand Logo
- Dashboard, Find a Ride, Offer a Ride, My Trips, My Impact, Community
- Multilingual selector: `🌐 English ▼` (English, हिन्दी, मराठी)
- Notification tray with unread badge
- User profile chip & verification badge
- Mobile bottom navigation bar

---

# 8. LANDING PAGE & HOW SAARTHI WORKS
- Hero banner with CTA buttons
- 4-step workflow: 01 Search, 02 Connect, 03 Share, 04 Impact
- Popular route quick-pills (Pune → Mumbai, Delhi → Jaipur, Bangalore → Chennai, etc.)

---

# 9. DASHBOARD
- Personalized greeting: "Good Morning, Umesh 👋"
- Search card: From, To, Date, Passengers, Swap button, Find Rides button

---

# 10. EV PREFERENCE ⭐
- Prominent toggle in dashboard: "Prefer Electric Vehicles"
- When ON: Boosts EV rides with green glowing border and badges without excluding other vehicles.
- When OFF: Normal ranking across all vehicles.

---

# 11. VEHICLE TYPES
- ⚡ Electric Vehicle (EV)
- 🔋 Hybrid
- 🟢 CNG
- ⛽ Petrol
- 🚙 Diesel

---

# 12. RIDE MATCHING ALGORITHM
Conceptual Ranking:
- Route Match: 40%
- Time Match: 25%
- Sustainability: 20% (boosted to 45% when EV preference is ON)
- Driver Rating: 10%
- Price: 5%

---

# 13. MOCK RIDE DATA
Realistic Indian intercity routes (Pune ↔ Mumbai, Pune ↔ Nashik, Mumbai ↔ Surat, Delhi ↔ Jaipur, Bangalore ↔ Chennai, Ahmedabad ↔ Vadodara).

---

# 14. RIDE CARDS
Modern cards with vehicle type badge, rating, route stops, driver info with trust shield, price per seat, and "View Ride" CTA.

---

# 15. SEARCH FUNCTIONALITY
Filters by origin, destination, date, available seats, and ranking score.

---

# 16. FILTERS & SORTING
- Multi-select vehicle types (EV, Hybrid, CNG, Petrol, Diesel)
- Price slider
- Departure periods (Morning, Afternoon, Evening)
- Driver rating thresholds
- Sort options: Recommended, EVs First, Price Low-to-High, Departure Earliest, Rating Highest.

---

# 17. RIDE DETAILS MODAL
Route stop progression, driver verification badges, vehicle details, community carpool guidelines, price breakdown, and "Book a Seat" button.

---

# 18. BOOKING LIFECYCLE
Decrements available seats, records booking with unique reference ID (`BK-XXXX`), updates sustainability stats, and triggers booking success modal.

---

# 19. MY TRIPS
Tabs for [Upcoming Rides] and [Completed Journeys] with cancellation option and interactive "Rate Driver ⭐" modal.

---

# 20. OFFER A RIDE (DRIVER FLOW)
Comprehensive posting form for vehicle owners with instant listing into active ride inventory.

---

# 21. MY IMPACT 🌱
Real-time counters for Shared Rides, EV Rides, Shared Distance, and Avoided CO₂e, along with visual progress bars for vehicle choices.

---

# 22. PROFILE & TRUST DOSSIER
User profile card with verification badges: Identity Verified, Phone Verified, Vehicle Verified, and Community Rated.

---

# 23. TRUST FEATURES
Visual badges prominently featured on driver profiles and ride cards.

---

# 24. COMMUNITY HUBS
Campus communities (AIT Pune / COEP), IT Parks (Hinjewadi & BKC), and Expressway Commuters clubs.

---

# 25. NOTIFICATIONS
In-app notification dropdown and floating toast notifications.

---

# 26. LOCAL STORAGE SPECIFICATION
Safe data persisted: `selectedLanguage`, `userProfile`, `rides`, `bookings`, `postedRides`, `evPreference`, `sustainabilityStats`, `identityVerificationStatus`, `vehicleVerificationStatus`.

---

# 27. RESPONSIVE DESIGN
Full mobile and desktop support with responsive grids and touch-friendly mobile bottom navigation.

---

# 28. ANIMATIONS & MICRO-INTERACTIONS
Subtle transitions, pulse dot on EV toggle, smooth card hover, and modal transitions.

---

# 29. ACCESSIBILITY
Semantic HTML5, ARIA labels, contrast ratio compliance, and focus-visible indicators.

---

# 30. UI STATES
Loading, No Results, Full Ride, Empty Trips, Booking Success.

---

# 31. CORE USER FLOW
Landing -> Search -> Prefer EV = ON -> View Ride -> Book Seat -> Booking Confirmation -> My Trips -> My Impact.

---

# 32. DRIVER FLOW
Offer a Ride -> Form Fill -> Post Ride -> View in Search.

---

# 33. PRODUCT POSITIONING
Community-based cost-sharing carpool, not a commercial taxi platform.

---

# 34. CODE MODULARITY
Clear functions for rendering, searching, filtering, translating, booking, and state handling.

---

# 35. FINAL DASHBOARD LAYOUT
Desktop grid and mobile stack layout.

---

# 36. MVP REQUIREMENTS
Fully responsive prototype with all interactive flows operational.

---

# 37. FINAL EXPERIENCE
Community + Intercity Carpooling + EV Preference + Trust + Sustainability + Multilingual Accessibility.

---

# 38. USER SIGNUP & GOVERNMENT ID VERIFICATION ⭐

Saarthi includes a secure identity-verification step during user registration because trust is a core foundation of the carpooling platform.

## 38.1 Signup Flow
```text
SIGN UP
   ↓
Basic Information (Name, Mobile, Email, Password)
   ↓
Mobile / Email OTP Verification
   ↓
Government ID Verification (Aadhaar / Driving Licence / Passport / Voter ID)
   ↓
Verification Status (🟡 Pending → 🟢 Verified / 🔴 Failed)
   ↓
SAARTHI ACCOUNT CREATED
   ↓
Dashboard
```

## 38.2 Mobile / Email OTP Verification
- 6-digit OTP input interface with resend timer.
- Simulated verification to confirm phone number ownership.

## 38.3 Government ID Verification
- User chooses between: Aadhaar, Driving Licence, Passport, Voter ID.
- Drag-and-drop / file selector supporting JPG, PNG, and PDF.
- File size validation (< 5MB) and preview card.

## 38.4 ID Verification Status
- 🟡 Verification Pending
- 🟢 Identity Verified
- 🔴 Verification Failed (with retry flow)

## 38.5 Verified Profile Badges
- 🛡️ Identity Verified
- 📱 Phone Verified
- 🚗 Vehicle Verified
- ⭐ Community Rated

## 38.6 IMPORTANT PRIVACY RULE
**DO NOT store actual government ID numbers, ID images, document scans, Aadhaar numbers, or sensitive identity information in `localStorage`.**
Only store non-sensitive status:
```javascript
localStorage.setItem("saarthi_identity_status", "verified");
```

## 38.7 Real-World Implementation Note
Production requires a secure backend with an authorized KYC provider, data encryption in transit and at rest, minimal data retention, and compliance with Indian privacy laws (DPDP Act).

## 38.8 Multilingual ID Verification
Complete English, हिन्दी, and मराठी translations across every step of registration and verification.

## 38.9 Progress Indicator
`① Account ➔ ② Mobile ➔ ③ Identity ➔ ④ Complete`

## 38.10 Verification Failure & Retry
Graceful error notification allowing users to retry document submission without exposing internal system details.

## 38.11 Profile Badges on Ride Cards
All community ride cards display driver verification credentials.

## 38.12 Driver Vehicle Verification
Drivers offering rides have an additional vehicle verification status step.

## 38.13 Signup Complete Screen
Celebration screen with verified badges and "Go to Dashboard" CTA.

---

# 39. UPDATED FINAL MVP REQUIREMENTS
All 38 core requirements fully tested and functional.

---

# 40. UPDATED SAARTHI VALUE PROPOSITION
**A trusted, community-based intercity carpooling platform that helps people share journeys, prioritize sustainable rides, and connect across language barriers.**

---

# 41. REAL-TIME RIDE TRACKING & SAFETY CENTER ⭐

## 41.1 Overview
Saarthi provides a privacy-conscious, real-time vehicle tracking experience allowing passengers to monitor live journey telemetry (ETA, remaining distance, landmark progress, driver verification, EV badge) while giving drivers complete control over GPS broadcasting.

## 41.2 Technology Stack
- **Mapping & Tiles**: Leaflet.js + OpenStreetMap (free, open-source, zero API keys required).
- **Client GPS**: Browser Geolocation API (`navigator.geolocation.watchPosition`).
- **Real-Time WebSocket Server**: Node.js + Express + Socket.IO (`server.js`).
- **Cloud State Adapter**: Firebase Authentication + Cloud Firestore architecture (`js/firebase-tracking.js`).
- **Dual Execution Modes**:
  - `TRACKING_MODE = "demo"`: High-fidelity simulation along the **Pune → Wakad → Lonavala → Panvel → Mumbai** expressway corridor with speed controls (1x, 2x, 5x).
  - `TRACKING_MODE = "realtime"`: Driver's live physical device GPS telemetry streamed over Socket.IO and synced to Firestore.

## 41.3 Driver Flow
`Driver → Start Trip → Location Permission → GPS Broadcasting ON → Live Trip → Pause Location Sharing → End Trip`
- **Location Control**: Driver can instantly toggle "Pause Location Sharing" for rest breaks or privacy. When paused, passenger sees privacy notification without breaking trip continuity.
- **Trip Finalization**: Driver clicks "End Trip" when reaching destination, which terminates location broadcasting, marks trip as completed, and prompts passenger rating.

## 41.4 Passenger Flow
`Booking Confirmation / My Trips → Track Ride → Interactive Live Map`
- **Live Marker**: Custom green-accented vehicle icon with animated pulse beacon and dynamic bearing angle rotation.
- **Route Polyline**: High-contrast expressway path with travelled progress shading.
- **Telemetry Bar**: Dynamic ETA (HH:MM), distance remaining (km), current highway speed (km/h), and progress percentage.
- **Driver & Vehicle Dossier**: Photo, name, rating (⭐ 4.9), verified credentials (🛡️ ID, 📱 Phone, 🚗 RC), vehicle model, EV badge, and dashcam status.

## 41.5 Safety Center
- **📤 Share Trip**: Copy encrypted tracking link or dispatch pre-formatted WhatsApp message to family/friends.
- **🛡️ Safety Information**: Verified driver credentials and community ride rules.
- **⚠️ Report Safety Concern**: Instant incident reporting with ticketing reference (`INC-XXXXXX`).
- **🚨 Emergency Assistance (SOS)**: One-tap National Emergency 112 trigger, Women Helpline 1091, and Saarthi 24/7 Safety Command Center hot-dial.

## 41.6 Privacy & Security Guardrails
- Live location is strictly isolated to authenticated passengers belonging to the specific booking (`trip:<tripId>`).
- No public or unauthenticated access to live driver coordinates.
- Location broadcasting ceases automatically once the trip is completed.
- No permanent coordinate history retention on servers after trip termination.

## 41.7 Saarthi AI Mascot Assistant
- Live state-grounded queries:
  - *"Where is my driver?"* → Reports current landmark, distance, ETA, and privacy status.
  - *"Has my driver started?"* → Reports live trip status and vehicle details.
  - *"How far is the destination?"* → Reports remaining kilometers and highway traffic conditions.
  - *"Is live tracking active?"* → Confirms encryption mode and connection health.
- Grounding Rule: The AI never hallucinates or invents a fake coordinate or location.

## 41.8 Multilingual Accessibility
All tracking telemetry, badges, driver controls, safety modals, and AI assistant dialogs are fully localized in **English**, **हिन्दी (Hindi)**, and **मराठी (Marathi)**.

