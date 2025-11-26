Mor Ben-Dror Portfolio – Grotesca-Style Black & Yellow
=====================================================

Overview
--------
- Goal: Rebuild Mor Ben-Dror’s “Bananas” portfolio as a bold, black-and-yellow, self-hosted site inspired by Grotesca Design. Keep content/imagery from the Wix site; modernize layout, responsiveness, and micro-interactions.
- Structure: Multi-page (or routed SPA) with six top-level destinations: Home, Conferences, Branding, Drawing, Digital, About Me, Contact.
- Vibe: High contrast, playful but clean; banana branding visible via logo and accent motifs.

Brand System
------------
- Palette: Primary black `#000000`; banana yellow (extract from logo, temp `#FFD300`); white `#FFFFFF` for legibility. Use CSS variables for consistency.
- Typography: Grotesque-style sans for headings (e.g., Montserrat Black/ExtraBold); clean sans for body (e.g., Open Sans/Helvetica/Arial). High-contrast text (yellow/white on black, black on yellow).
- Logo: Banana mark from original site (Wix asset “Bananas.png”, export as `images/banana-logo.png`). Use in header and favicon.

Navigation & Layout
-------------------
- Persistent, sticky header (black bg, yellow links). Logo left, menu right. Desktop horizontal; mobile collapses to stacked links or hamburger toggle.
- Links: Home, Conferences, Branding, Drawing, Digital, About Me, Contact. Logo links to Home.
- Responsive rules: maintain generous spacing; ensure touch targets on mobile.

Homepage – Portfolio Grid
-------------------------
- Grid: CSS Grid `repeat(auto-fit, minmax(250px, 1fr))`, gap ~15px, padding ~20px. Adjust min width via media queries for small screens.
- Tiles: Square “cubes” using `object-fit: cover` to enforce 1:1; wrap each image in a link to category anchor or lightbox.
- Hover/tap: Subtle lift/zoom + black→yellow overlay.
  - Base: img transition on transform; pseudo-element overlay with transition.
  - Hover example:
    - `img { transition: transform .3s ease; }`
    - `.portfolio-item::after { background: rgba(0,0,0,.2); transition: background .3s ease; }`
    - `.portfolio-item:hover::after { background: rgba(255,211,0,.3); }`
    - `.portfolio-item:hover img { transform: translateY(-5px) scale(1.02); }`
- Optional: box-shadow on hover; `pointer-events: none` on overlay if needed.

Category Pages (Conferences, Branding, Drawing, Digital)
--------------------------------------------------------
- Template: Title + reuse of grid styles for filtered works. Optional figcaptions or lightbox. Keep hover behavior consistent with Home.
- Content: Populate with corresponding projects/images from original site (Conferences live sketches; Branding logos/identities; Drawing illustrations; Digital web/social work).

About Me
--------
- Layout: Single-column or split portrait + copy. Consider yellow hero/banner with black heading; body on dark/neutral for readability.
- Content: Bio, Bananas studio story, services; include portrait or self-illustration. Optional low-opacity banana motif or border in yellow.

Contact
-------
- Content: Email (mailto), optional phone/city, social links (Instagram, Behance, Facebook).
- Form (simple): Name, Email, Message, Submit. Default to `mailto:` action or integrate service later (Formspree/EmailJS).
- Styling: Yellow labels/borders, dark inputs, white text; yellow CTA button with black text, lighter yellow on hover.

Page Transitions
----------------
- Simple fade between pages: add `fade-out` class on link click, delay navigation by ~0.4–0.5s; optional initial fade-in on load.
- Consider View Transition API later for richer motion if browser support allows.

Assets & Preparation
--------------------
- Download from Wix: banana logo (Bananas.png) and all portfolio images per category; save to `images/` with descriptive names. Create square thumbnails; keep high-res originals for lightbox if used. Add accurate `alt` text.
- Optimize images; enable `loading="lazy"` for below-fold items. Add favicon (logo).

Tech & Implementation Notes
---------------------------
- Can ship as static HTML/CSS/JS (fast, simple) or SPA (React/Vue + router). If SPA, map routes to same URL structure and reuse grid components; use transition wrappers.
- Shared styles: global CSS with variables for colors, spacing, and typography. Consider SCSS but not required.
- Accessibility: High contrast, focus states for links/buttons, semantic nav/header/main/footer, labeled form fields.
- Performance: Use optimized assets, avoid oversized images, keep transitions short (<0.6s).

Suggested Next Steps
--------------------
1) Extract brand yellow from logo and lock palette variables.  
2) Gather and optimize all images; create thumbnails.  
3) Build shared header/footer + base styles; implement Home grid and hover effects.  
4) Create category pages with filtered content; add About and Contact layouts.  
5) Add fade transitions script; test responsiveness and accessibility across desktop/mobile.  
6) Wire contact CTA (mailto or service) and generate favicon.
