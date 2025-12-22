Bananas V2 — Design & Technical Specification
=============================================

Overview
--------
- Goal: Rebuild Bananas as a high-impact, full-width digital gallery. Minimal interface, massive imagery, and banana-yellow accents that pop on white.
- Visual Style: “Bold Studio.” Stark white canvas, off-black ink, geometric headings, and purposeful yellow highlights.
- Core Principle: The UI must recede; the work dominates via oversized imagery, masonry grids, and a lightbox-first experience.

Design System
-------------
- Palette: Canvas `#FFFFFF`, Ink `#111111`, Highlight `#FFD700`, Light Grey `#F4F4F4`, Border `#E6E6E6`.
- Typography: Headings use heavy geometric sans (`Sora`/`Oswald`/`Inter Tight`, 700–800). Body uses clean sans (`Inter`/`Roboto`, 300–600).
- Grid: Desktop 12-column fluid grid with 4vw margins and 20px gutters. Mobile collapses to single-column.
- Motion: Underlines slide in on hover for nav. Gallery zoom on hover. Lightbox fades in, closes via overlay click or Escape.

Page Architecture
-----------------
- Global Navigation (sticky): Text logo on the left (“Bananas”), links on the right: Branding | Events | Illustrations | About | Contact. Thick yellow underline on hover/active via `::after`.
- Homepage:
  - Hero: Split layout. Text left (“Branding & Live Illustration that keeps the room awake.”), full-width hero image right with yellow drop-shadow block.
  - Featured (Z-pattern): Alternating rows—image left/text right then text left/image right. Outlined CTA plus “Open lightbox” buttons for quick previews.
  - Gallery Switcher: Pill buttons for Branding / Events / Illustrations. Clicking swaps the masonry grid without page reload.
  - Contact Summary: Info cards for services and contact call-to-action.
- Category Pages: Dedicated pages for Branding, Events, and Illustrations reusing the same masonry grid + lightbox. Pages are declared with `data-page="category"` and `data-category="<slug>"` so JS auto-loads the correct data.
- Project Detail Overlay: Clicking any thumbnail opens a full-screen modal. Title at top, vertically stacked `*-wide.webp` images below at 100% modal width.

Directory & Data Model
----------------------
- Image convention: `/images/sections/<category>/<project>/<name>-thumb.webp` for grid tiles and `/images/sections/<category>/<project>/<name>-wide.webp` for lightbox slides.
- Data object (in `assets/js/main.js`):
  ```js
  const portfolioData = {
    branding: [{ id, title, description, images: ['main', ...] }],
    events: [{ ... }],
    illustrations: [{ id: 'gallery', ... }]
  };
  ```
  - `images` holds basenames only; JS appends `-thumb.webp` and `-wide.webp`.
  - Optional `cover` can override the first image for thumbnail selection.
- Gallery logic:
  - `loadCategory(categoryName)` clears `.gallery-grid` and injects `.gallery-item` cards, pulling the first (or `cover`) image as the thumbnail.
  - `openLightbox(category, project)` renders all `images` in wide format inside the modal.
- Featured logic: `featuredProjects` array defines the Z-pattern rows (category, projectId, image, copy).

CSS Highlights
--------------
- Base: White canvas, black ink, yellow highlights. Sticky header with blurred backdrop and sliding underline.
- Hero: 12-col grid with oversized type and banana-yellow box shadow on the hero image.
- Featured (Z-pattern):
  ```css
  .featured-row { display:flex; align-items:center; gap:5%; }
  .featured-row:nth-child(odd) { flex-direction:row-reverse; }
  .featured-media img { box-shadow:18px 18px 0 #FFD700; }
  ```
- Masonry (pure CSS columns):
  ```css
  .gallery-grid { column-count:3; column-gap:20px; }
  .gallery-item { break-inside:avoid; position:relative; margin-bottom:20px; }
  .gallery-item .overlay { background:rgba(0,0,0,0.55); opacity:0; transition:.22s; }
  .gallery-item:hover img { transform:scale(1.03); }
  .gallery-item:hover .overlay { opacity:1; }
  @media (max-width:768px){ .gallery-grid{ column-count:1; } }
  ```
- Lightbox: Full-screen modal (`#lightbox-modal`) with scrollable stack of `.lightbox-img` at 100% width.

Implementation Notes
--------------------
- Fonts loaded via Google: `Sora` (headings) and `Inter` (body).
- JS uses dataset attributes to detect the page type and initial category; homepage pills swap categories instantly.
- Mobile: nav collapses behind a `Menu` toggle; masonry drops to a single column.
- Relative image paths (`images/sections/...`) allow local file viewing without a server root.

Next Steps & Extensibility
--------------------------
- Add a new category by creating `/images/sections/<new>/project/` folders, adding a data array entry in `portfolioData`, and (optionally) adding a pill on the homepage.
- Expand `featuredProjects` for more Z-pattern rows.
- For digital/social kits, replicate the same naming convention and add a `digital` category (see `digital.html` helper notes).
