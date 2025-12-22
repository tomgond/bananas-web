Bananas V2
==========

Overview
--------
- Bold, full-width portfolio for Bananas studio (branding + live illustration).
- Minimal UI on white canvas with banana-yellow accents; masonry gallery with lightbox-first browsing.
- Core pages: `index.html` (hero, featured Z-pattern, gallery switcher), `branding.html`, `conferences.html` (events), `drawing.html` (illustrations), `about.html`, `contact.html`.

Structure
---------
- Images: `images/sections/<category>/<project>/<name>-thumb.webp` and `<name>-wide.webp`.
- Data: `assets/js/main.js` exports `portfolioData` (projects per category) and `featuredProjects` (homepage Z-pattern rows). Uses relative image paths so local file viewing works.
- Styles: `assets/css/style.css` defines the Bold Studio system (white canvas, black ink, yellow highlight), masonry grid, nav underline animation, and lightbox.

Usage
-----
- Open `index.html` in a browser; category pills swap the gallery without reloading. Any thumbnail opens a full-screen lightbox.
- Category pages auto-render via `data-category` on `<body>`—no manual markup needed beyond the container with `data-gallery`.
- Mobile nav is toggled via the `Menu` button; lightbox closes on overlay click or Escape.

Extending
---------
- Add a project: drop `*-thumb.webp` and `*-wide.webp` pairs into a new `images/sections/<category>/<project>/` folder, then add an entry to `portfolioData`.
- Add a category: create the folder structure above, add a new array to `portfolioData`, and (optionally) add a pill/button or a dedicated page with `data-category="<slug>"`.
- Adjust featured: edit `featuredProjects` to control the homepage Z-pattern tiles.

Docs
----
- Full design + technical notes live in `docs/design-spec.md` (Bananas V2 specification and implementation checklist).
